import React, { useState } from 'react';
import { CustomizerViewer } from './CustomizerViewer';
import { CustomizerControls } from './CustomizerControls';
import { IncompatibilityModal } from './IncompatibilityModal';
import { Sparkles, Layers, ShieldCheck, Heart, Share2, Check } from 'lucide-react';
import './CustomizerSection.css';

export function CustomizerSection({ onAddToCart }) {
  // State for 3D Customizer
  const [fit, setFit] = useState('pegado');
  const [style, setStyle] = useState('regular');
  const [length, setLength] = useState('crop');
  const [withStraps, setWithStraps] = useState(false);
  const [withScarf, setWithScarf] = useState(false);
  const [selectedFabricId, setSelectedFabricId] = useState('algodon');
  const [selectedColorId, setSelectedColorId] = useState('rosa');
  const [size, setSize] = useState('S');
  const [customMeasurements, setCustomMeasurements] = useState({ bust: '', waist: '', notes: '' });

  // Conflict / Incompatibility modal state
  const [isIncompatibleModalOpen, setIsIncompatibleModalOpen] = useState(false);
  const [incompatibleFabricName, setIncompatibleFabricName] = useState('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenIncompatibilityModal = (fabricName) => {
    setIncompatibleFabricName(fabricName);
    setIsIncompatibleModalOpen(true);
  };

  const handleKeepFabricWithoutScarf = () => {
    setIsIncompatibleModalOpen(false);
    setWithScarf(false);
  };

  const handleChangeFabricAndAddScarf = () => {
    setIsIncompatibleModalOpen(false);
    // Switch to compatible stretch fabric
    setSelectedFabricId('algodon');
    setSelectedColorId('rosa');
    setWithScarf(true);
    showToast('Se cambió la tela a Algodón Rosa y se agregó la bufanda.');
  };

  const handleAddToCartWrapper = (customItem) => {
    if (onAddToCart) {
      onAddToCart(customItem);
      showToast('¡Prenda personalizada añadida al carrito exitosamente!');
    }
  };

  return (
    <section id="personaliza-tu-prenda" className="customizer-section-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="customizer-toast animate-slideDown">
          <Check size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Description */}
      <div className="customizer-section-header">
        <div className="section-badge-wrapper">
          <span className="section-eyebrow-badge">
            <Sparkles size={14} /> TALLER DE DISEÑO 3D EN TIEMPO REAL
          </span>
        </div>
        <h2 className="section-title">Personaliza tu Top Strapless</h2>
        <p className="section-description">
          Elige silueta, largo, accesorios y explora más de 40 opciones de telas exclusivas con visualización tridimensional interactiva y confección a tu medida exacta.
        </p>
      </div>

      {/* Main 2-Column Customizer Layout */}
      <div className="customizer-grid-layout">
        {/* Left: 3D Viewport */}
        <div className="customizer-col-viewer">
          <CustomizerViewer
            fit={fit}
            style={style}
            length={length}
            withStraps={withStraps}
            withScarf={withScarf}
            selectedFabricId={selectedFabricId}
            selectedColorId={selectedColorId}
          />
        </div>

        {/* Right: Interactive Configuration Controls */}
        <div className="customizer-col-controls">
          <CustomizerControls
            fit={fit}
            setFit={setFit}
            style={style}
            setStyle={setStyle}
            length={length}
            setLength={setLength}
            withStraps={withStraps}
            setWithStraps={setWithStraps}
            withScarf={withScarf}
            setWithScarf={setWithScarf}
            selectedFabricId={selectedFabricId}
            setSelectedFabricId={setSelectedFabricId}
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            size={size}
            setSize={setSize}
            customMeasurements={customMeasurements}
            setCustomMeasurements={setCustomMeasurements}
            onAddToCart={handleAddToCartWrapper}
            onOpenIncompatibilityModal={handleOpenIncompatibilityModal}
          />
        </div>
      </div>

      {/* Incompatibility Modal */}
      <IncompatibilityModal
        isOpen={isIncompatibleModalOpen}
        fabricName={incompatibleFabricName}
        onClose={() => setIsIncompatibleModalOpen(false)}
        onKeepFabric={handleKeepFabricWithoutScarf}
        onChangeFabricAndAddScarf={handleChangeFabricAndAddScarf}
      />
    </section>
  );
}
