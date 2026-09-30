import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getAssetUrl } from '../../data/clientData';
import { getModelFileName, matchVariantName } from '../../data/customizerData';
import { RotateCw, ZoomIn, ZoomOut, Camera, Eye, RefreshCw, Sparkles } from 'lucide-react';
import './CustomizerViewer.css';

export function CustomizerViewer({
  fit = 'pegado',
  style = 'regular',
  length = 'crop',
  withStraps = false,
  withScarf = false,
  selectedFabricId = 'algodon',
  selectedColorId = 'rosa',
  onCaptureSnapshot
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activePreset, setActivePreset] = useState('front');

  // Loaded 3D models storage
  const modelsRef = useRef({
    avatar: null,
    top: null,
    straps: null,
    scarf: null
  });

  // Cached raw GLTFs for variant switching
  const gltfCacheRef = useRef({});

  // Helper to switch variant on a GLTF model
  const applyVariantToGltf = useCallback((gltfData, targetColorName) => {
    if (!gltfData || !gltfData.scene) return;
    const variants = gltfData.userData?.variants || [];
    const matched = matchVariantName(targetColorName, variants);

    // If KHR_materials_variants extension parser is available
    if (gltfData.functions?.selectVariant) {
      try {
        gltfData.functions.selectVariant(gltfData.scene, matched);
        return;
      } catch (e) {
        console.warn('GLTF selectVariant error, falling back to manual mapping:', e);
      }
    }

    // Manual variant application across all primitives
    const variantIndex = variants.indexOf(matched);
    if (variantIndex === -1 && variants.length > 0) return;

    gltfData.scene.traverse((node) => {
      if (node.isMesh && node.userData?.gltfExtensions?.KHR_materials_variants) {
        const mappings = node.userData.gltfExtensions.KHR_materials_variants.mappings || [];
        const match = mappings.find(m => m.variants && m.variants.includes(variantIndex >= 0 ? variantIndex : 0));
        if (match && gltfData.parser?.cache?.resources?.material) {
          const mat = gltfData.parser.cache.resources.material[match.material];
          if (mat) {
            node.material = mat;
            node.material.needsUpdate = true;
          }
        }
      }
    });
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 560;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Background gradient / subtle lighting
    scene.background = new THREE.Color(0xfbf8f3);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 1.4);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 0.6;
    controls.maxDistance = 2.4;
    controls.target.set(0, 1.25, 0); // Focus on upper torso / top
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't flip below floor
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ee, 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    scene.add(keyLight);

    // Fill Light (Soft warm pink fill)
    const fillLight = new THREE.DirectionalLight(0xfce7f3, 1.2);
    fillLight.position.set(-2.5, 2, 1.5);
    scene.add(fillLight);

    // Back / Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Ground Soft Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update autoRotate flag on controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
      controlsRef.current.autoRotateSpeed = 2.0;
    }
  }, [autoRotate]);

  // Load GLTF Model Helper with caching
  const loadGltf = useCallback(async (url) => {
    if (gltfCacheRef.current[url]) {
      return gltfCacheRef.current[url];
    }
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          gltfCacheRef.current[url] = gltf;
          resolve(gltf);
        },
        (xhr) => {
          if (xhr.lengthComputable && xhr.total > 0) {
            setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (error) => {
          console.error('Error loading GLTF model:', url, error);
          reject(error);
        }
      );
    });
  }, []);

  // Load Avatar Base (Mannequin) once
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let isMounted = true;
    const avatarUrl = getAssetUrl('assets/models/avatar_base.glb');

    loadGltf(avatarUrl)
      .then((gltf) => {
        if (!isMounted) return;
        if (modelsRef.current.avatar) {
          scene.remove(modelsRef.current.avatar);
        }
        const avatarScene = gltf.scene.clone();
        avatarScene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material) {
              node.material.roughness = 0.7;
              node.material.metalness = 0.05;
            }
          }
        });
        scene.add(avatarScene);
        modelsRef.current.avatar = avatarScene;
      })
      .catch((err) => console.warn('Could not load avatar base:', err));

    return () => {
      isMounted = false;
    };
  }, [loadGltf]);

  // Update Top Model whenever Fit, Style, or Length changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let isMounted = true;
    setLoading(true);

    const topFileName = getModelFileName(fit, style, length);
    const topUrl = getAssetUrl(`assets/models/${topFileName}`);

    loadGltf(topUrl)
      .then((gltf) => {
        if (!isMounted) return;
        if (modelsRef.current.top) {
          scene.remove(modelsRef.current.top);
        }

        const topScene = gltf.scene;
        topScene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.add(topScene);
        modelsRef.current.top = topScene;

        applyVariantToGltf(gltf, selectedColorId);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading top model:', err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fit, style, length, loadGltf, applyVariantToGltf, selectedColorId]);

  // Update Straps (Tirantes) model
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let isMounted = true;

    if (!withStraps) {
      if (modelsRef.current.straps) {
        scene.remove(modelsRef.current.straps);
        modelsRef.current.straps = null;
      }
      return;
    }

    const strapsUrl = getAssetUrl('assets/models/tirantes.glb');
    loadGltf(strapsUrl)
      .then((gltf) => {
        if (!isMounted) return;
        if (modelsRef.current.straps) {
          scene.remove(modelsRef.current.straps);
        }

        const strapsScene = gltf.scene;
        strapsScene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.add(strapsScene);
        modelsRef.current.straps = strapsScene;

        applyVariantToGltf(gltf, selectedColorId);
      })
      .catch((err) => console.error('Error loading straps model:', err));

    return () => {
      isMounted = false;
    };
  }, [withStraps, loadGltf, applyVariantToGltf, selectedColorId]);

  // Update Scarf (Bufanda) model
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let isMounted = true;

    if (!withScarf) {
      if (modelsRef.current.scarf) {
        scene.remove(modelsRef.current.scarf);
        modelsRef.current.scarf = null;
      }
      return;
    }

    const scarfUrl = getAssetUrl('assets/models/bufanda.glb');
    loadGltf(scarfUrl)
      .then((gltf) => {
        if (!isMounted) return;
        if (modelsRef.current.scarf) {
          scene.remove(modelsRef.current.scarf);
        }

        const scarfScene = gltf.scene;
        scarfScene.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.add(scarfScene);
        modelsRef.current.scarf = scarfScene;

        applyVariantToGltf(gltf, selectedColorId);
      })
      .catch((err) => console.error('Error loading scarf model:', err));

    return () => {
      isMounted = false;
    };
  }, [withScarf, loadGltf, applyVariantToGltf, selectedColorId]);

  // Sync Color Variant Across all active pieces whenever color changes
  useEffect(() => {
    const topFileName = getModelFileName(fit, style, length);
    const topGltf = gltfCacheRef.current[getAssetUrl(`assets/models/${topFileName}`)];
    if (topGltf) {
      applyVariantToGltf(topGltf, selectedColorId);
    }

    if (withStraps) {
      const strapsGltf = gltfCacheRef.current[getAssetUrl('assets/models/tirantes.glb')];
      if (strapsGltf) {
        applyVariantToGltf(strapsGltf, selectedColorId);
      }
    }

    if (withScarf) {
      const scarfGltf = gltfCacheRef.current[getAssetUrl('assets/models/bufanda.glb')];
      if (scarfGltf) {
        applyVariantToGltf(scarfGltf, selectedColorId);
      }
    }
  }, [selectedColorId, fit, style, length, withStraps, withScarf, applyVariantToGltf]);

  // Camera presets
  const setCameraPreset = (preset) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    setActivePreset(preset);

    if (preset === 'front') {
      camera.position.set(0, 1.35, 1.35);
      controls.target.set(0, 1.25, 0);
    } else if (preset === 'angle') {
      camera.position.set(0.9, 1.35, 1.0);
      controls.target.set(0, 1.25, 0);
    } else if (preset === 'back') {
      camera.position.set(0, 1.35, -1.35);
      controls.target.set(0, 1.25, 0);
    } else if (preset === 'full') {
      camera.position.set(0, 1.15, 2.0);
      controls.target.set(0, 0.95, 0);
    } else if (preset === 'close') {
      camera.position.set(0, 1.38, 0.85);
      controls.target.set(0, 1.32, 0);
    }
    controls.update();
  };

  // Zoom helpers
  const handleZoom = (direction) => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    const factor = direction === 'in' ? 0.85 : 1.15;
    camera.position.multiplyScalar(factor);
    controlsRef.current?.update();
  };

  // Reset view
  const handleReset = () => {
    setCameraPreset('front');
    setAutoRotate(false);
  };

  // Capture high-res snapshot
  const handleSnapshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    if (onCaptureSnapshot) {
      onCaptureSnapshot(dataUrl);
    } else {
      const link = document.createElement('a');
      link.download = `daniela-top-custom-${fit}-${style}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="customizer-viewer-container">
      {/* 3D WebGL Canvas Target */}
      <div ref={containerRef} className="customizer-canvas-target" />

      {/* Loading Overlay */}
      {loading && (
        <div className="customizer-loading-overlay">
          <div className="customizer-spinner">
            <RefreshCw className="animate-spin" size={32} />
          </div>
          <div className="customizer-loading-text">
            <span>Cargando modelo 3D...</span>
            <div className="customizer-progress-bar">
              <div className="customizer-progress-fill" style={{ width: `${loadProgress || 60}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Top Brand Watermark */}
      <div className="customizer-watermark">
        <span className="watermark-badge">
          <Sparkles size={13} className="inline-icon" /> VISOR 3D REAL-TIME
        </span>
        <span className="watermark-brand">DANIELA • ATELIER</span>
      </div>

      {/* Floating Camera Presets Bar */}
      <div className="customizer-presets-bar">
        <button
          type="button"
          className={`preset-btn ${activePreset === 'front' ? 'active' : ''}`}
          onClick={() => setCameraPreset('front')}
          title="Vista Frontal"
        >
          Frontal
        </button>
        <button
          type="button"
          className={`preset-btn ${activePreset === 'angle' ? 'active' : ''}`}
          onClick={() => setCameraPreset('angle')}
          title="Vista 45°"
        >
          45°
        </button>
        <button
          type="button"
          className={`preset-btn ${activePreset === 'back' ? 'active' : ''}`}
          onClick={() => setCameraPreset('back')}
          title="Espalda"
        >
          Espalda
        </button>
        <button
          type="button"
          className={`preset-btn ${activePreset === 'close' ? 'active' : ''}`}
          onClick={() => setCameraPreset('close')}
          title="Detalle"
        >
          Detalle
        </button>
        <button
          type="button"
          className={`preset-btn ${activePreset === 'full' ? 'active' : ''}`}
          onClick={() => setCameraPreset('full')}
          title="Look Completo"
        >
          Completo
        </button>
      </div>

      {/* Right Floating Quick Controls */}
      <div className="customizer-floating-tools">
        <button
          type="button"
          className={`tool-icon-btn ${autoRotate ? 'active' : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title="Giro Automático 360°"
        >
          <RotateCw size={18} className={autoRotate ? 'spin-slow' : ''} />
        </button>
        <button
          type="button"
          className="tool-icon-btn"
          onClick={() => handleZoom('in')}
          title="Acercar (Zoom +)"
        >
          <ZoomIn size={18} />
        </button>
        <button
          type="button"
          className="tool-icon-btn"
          onClick={() => handleZoom('out')}
          title="Alejar (Zoom -)"
        >
          <ZoomOut size={18} />
        </button>
        <button
          type="button"
          className="tool-icon-btn"
          onClick={handleReset}
          title="Restablecer Vista"
        >
          <Eye size={18} />
        </button>
        <button
          type="button"
          className="tool-icon-btn highlight"
          onClick={handleSnapshot}
          title="Guardar Foto / Snapshot"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* Interactive Helper Hint */}
      <div className="customizer-drag-hint">
        <span>Arastra para rotar en 360° • Pellizca o rueda para hacer zoom</span>
      </div>
    </div>
  );
}
