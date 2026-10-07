// 3D Customizer configuration and official data mappings from client specifications

export const FIT_OPTIONS = [
  {
    id: 'pegado',
    name: 'Fit pegado',
    subtitle: 'Ajuste ceñido y esculpido',
    description: 'Diseño anatómico de alta compresión. Compatible exclusivamente con telas con stretch para un calce perfecto.',
    badge: 'Telas Stretch',
    icon: 'Sparkles'
  },
  {
    id: 'suelto',
    name: 'Fit suelto',
    subtitle: 'Caída holgada y fluida',
    description: 'Corte vaporoso y elegante con libertad de movimiento. Compatible con todas las telas (con y sin stretch).',
    badge: 'Todas las telas',
    icon: 'Feather'
  }
];

export const STYLE_OPTIONS = [
  {
    id: 'regular',
    name: 'Regular',
    description: 'Corte recto strapless limpio y minimalista',
    allowedFits: ['pegado', 'suelto']
  },
  {
    id: 'asimetrico',
    name: 'Asimétrico',
    description: 'Corte en ángulo con silueta vanguardista',
    allowedFits: ['pegado', 'suelto']
  },
  {
    id: 'fruncido',
    name: 'Fruncido',
    description: 'Drapeado texturizado con fruncido artesanal',
    allowedFits: ['pegado']
  },
  {
    id: 'asimetrico_fruncido',
    name: 'Asimétrico Fruncido',
    description: 'Unión de silueta asimétrica y drapeado fruncido',
    allowedFits: ['pegado']
  }
];

export const LENGTH_OPTIONS = [
  {
    id: 'crop',
    name: 'Crop',
    description: 'Largo sobre el ombligo / cintura alta'
  },
  {
    id: 'regular',
    name: 'Regular',
    description: 'Largo clásico a la altura de la cadera alta'
  },
  {
    id: 'largo',
    name: 'Largo',
    description: 'Largo extendido para fajar o lucir completo'
  }
];

export const ACCESSORY_OPTIONS = [
  {
    id: 'tirantes',
    name: 'Tirantes',
    subtitle: 'Tirantes finos a juego',
    description: 'Tirantes delicados confeccionados en la misma tela y color seleccionado.',
    price: 120, // $120 MXN
    glbFile: 'tirantes.glb',
    icon: 'Scissors'
  },
  {
    id: 'bufanda',
    name: 'Bufanda',
    subtitle: 'Bufanda a juego en misma tela',
    description: 'Accesorio parisino confeccionado en la misma tela elegida. No disponible en Mezclilla, Lentejuelas ni Bordado.',
    price: 190, // $190 MXN
    glbFile: 'bufanda.glb',
    icon: 'Sparkles',
    incompatibleFabrics: ['mezclilla', 'lentejuelas', 'bordado']
  }
];

export const FABRIC_GROUPS = [
  {
    id: 'stretch',
    name: 'Telas con Stretch',
    description: 'Telas elastizadas ideales para fit pegado y suelto',
    isStretch: true,
    fabrics: [
      {
        id: 'algodon',
        name: 'Algodón Premium',
        description: 'Suave, transpirable y elástico',
        colors: [
          { id: 'blanco', name: 'Blanco Puro', hex: '#f8fafc', border: '#cbd5e1' },
          { id: 'negro', name: 'Negro Intenso', hex: '#18181b' },
          { id: 'rojo', name: 'Rojo Carmesí', hex: '#dc2626' },
          { id: 'amarillo', name: 'Amarillo Vainilla', hex: '#fef08a' },
          { id: 'beige', name: 'Beige Arena', hex: '#e2d5c3' },
          { id: 'cafe', name: 'Café Espresso', hex: '#4a1e1b' },
          { id: 'rosa', name: 'Rosa Pastel', hex: '#f1b6c7' },
          { id: 'azul cielo', name: 'Azul Cielo', hex: '#93c5fd' },
          { id: 'azul marino', name: 'Azul Marino', hex: '#1e3a8a' },
          { id: 'vino', name: 'Vino Borgoña', hex: '#7f1d1d' }
        ]
      },
      {
        id: 'mesh fl',
        name: 'Mesh Floral',
        description: 'Malla translúcida con estampado floral',
        colors: [
          { id: 'mesh fl negro', name: 'Mesh Floral Negro', hex: '#27272a', pattern: 'floral' },
          { id: 'mesh fl cafe', name: 'Mesh Floral Café', hex: '#582d27', pattern: 'floral' }
        ]
      },
      {
        id: 'rib rayas',
        name: 'Rib Acanalado Rayas',
        description: 'Punto acanalado con líneas finas',
        colors: [
          { id: 'rayas amarillo', name: 'Rayas Amarillo', hex: '#fde047', pattern: 'stripes' },
          { id: 'rayas rosa', name: 'Rayas Rosa', hex: '#f472b6', pattern: 'stripes' },
          { id: 'rayas cafe', name: 'Rayas Café', hex: '#4a1e1b', pattern: 'stripes' },
          { id: 'rayas azul', name: 'Rayas Azul', hex: '#3b82f6', pattern: 'stripes' }
        ]
      },
      {
        id: 'mesh',
        name: 'Mesh Sheer',
        description: 'Malla fina semitransparente',
        colors: [
          { id: 'mesh vino', name: 'Mesh Vino', hex: '#831843' },
          { id: 'mesh negro', name: 'Mesh Negro', hex: '#09090b' },
          { id: 'mesh blanco', name: 'Mesh Blanco', hex: '#f1f5f9' },
          { id: 'mesh cafe', name: 'Mesh Café', hex: '#451a03' },
          { id: 'mesh leopardo', name: 'Mesh Animal Print Leopardo', hex: '#ca8a04', pattern: 'leopard' }
        ]
      },
      {
        id: 'encaje',
        name: 'Encaje Romántico',
        description: 'Encaje floral con transparencias',
        colors: [
          { id: 'encaje blanco', name: 'Encaje Blanco Nupcial', hex: '#ffffff', pattern: 'lace', border: '#cbd5e1' },
          { id: 'encaje negro', name: 'Encaje Negro Gótico', hex: '#171717', pattern: 'lace' }
        ]
      },
      {
        id: 'raya',
        name: 'Rayas Candy',
        description: 'Rayas audaces de contraste',
        colors: [
          { id: 'rayas rojo', name: 'Rayas Rojo Candy', hex: '#ef4444', pattern: 'stripes' }
        ]
      },
      {
        id: 'lentejuelas',
        name: 'Lentejuelas Party Glam',
        description: 'Brillo deslumbrante de alta costura (No compatible con bufanda)',
        noScarf: true,
        colors: [
          { id: 'lentejuelas blanco', name: 'Lentejuelas Blanco Perlado', hex: '#f8fafc', sparkle: true, border: '#cbd5e1' },
          { id: 'lentejuelas negro', name: 'Lentejuelas Negro Onyx', hex: '#0f172a', sparkle: true },
          { id: 'lentejuelas rojo', name: 'Lentejuelas Rojo Rubí', hex: '#b91c1c', sparkle: true },
          { id: 'lentejuelas rosa', name: 'Lentejuelas Rosa Champagne', hex: '#ec4899', sparkle: true },
          { id: 'lentejuelas plateado', name: 'Lentejuelas Plata Diamante', hex: '#94a3b8', sparkle: true },
          { id: 'lentejuelas azul', name: 'Lentejuelas Azul Eléctrico', hex: '#2563eb', sparkle: true }
        ]
      },
      {
        id: 'brillos',
        name: 'Brillos / Lúrex',
        description: 'Tejido brillante con destellos metálicos',
        colors: [
          { id: 'brillos vino', name: 'Brillos Vino Borgoña', hex: '#701a75', sparkle: true },
          { id: 'brillos cafe', name: 'Brillos Café Bronce', hex: '#78350f', sparkle: true }
        ]
      }
    ]
  },
  {
    id: 'no_stretch',
    name: 'Telas sin Stretch',
    description: 'Telas estructuradas de corte relajado (Disponibles solo con Fit Suelto)',
    isStretch: false,
    fabrics: [
      {
        id: 'polka',
        name: 'Polka Dots (Lunares)',
        description: 'Estampado retro chic atemporal',
        colors: [
          { id: 'polka blanco', name: 'Polka Blanco & Negro', hex: '#f8fafc', pattern: 'polka', border: '#cbd5e1' },
          { id: 'polka azul', name: 'Polka Azul Marino', hex: '#1e40af', pattern: 'polka' }
        ]
      },
      {
        id: 'cuadros',
        name: 'Cuadros Vichy & Tartán',
        description: 'Geometría clásica con vibra europea',
        colors: [
          { id: 'cuadros verde', name: 'Cuadros Verde Oliva', hex: '#3f6212', pattern: 'plaid' },
          { id: 'cuadros azul', name: 'Cuadros Azul Francés', hex: '#1d4ed8', pattern: 'plaid' },
          { id: 'cuadros cafe', name: 'Cuadros Café Vintage', hex: '#78350f', pattern: 'plaid' }
        ]
      },
      {
        id: 'bordado',
        name: 'Bordado Artesanal',
        description: 'Detalle bordado de relieve botánico (No compatible con bufanda)',
        noScarf: true,
        colors: [
          { id: 'bordado negro', name: 'Bordado Negro', hex: '#18181b', pattern: 'embroidery' },
          { id: 'bordado cafe', name: 'Bordado Café Cacao', hex: '#451a03', pattern: 'embroidery' },
          { id: 'bordado blanco', name: 'Bordado Blanco Puro', hex: '#ffffff', pattern: 'embroidery', border: '#cbd5e1' }
        ]
      },
      {
        id: 'stripes',
        name: 'Stripes / Rayas Verticales',
        description: 'Rayas verticales que estilizan la figura',
        colors: [
          { id: 'stripes verde', name: 'Stripes Verde Menta', hex: '#059669', pattern: 'stripes' },
          { id: 'stripes rosa', name: 'Stripes Rosa Pastel', hex: '#f43f5e', pattern: 'stripes' },
          { id: 'stripes azul', name: 'Stripes Azul Marino', hex: '#1e3a8a', pattern: 'stripes' },
          { id: 'stripes negro', name: 'Stripes Negro', hex: '#09090b', pattern: 'stripes' }
        ]
      },
      {
        id: 'flores',
        name: 'Flores Románticas',
        description: 'Micro flores sobre fondo blanco marfil',
        colors: [
          { id: 'flores blanco', name: 'Flores Blanco Primavera', hex: '#fdf2f8', pattern: 'floral', border: '#cbd5e1' }
        ]
      },
      {
        id: 'mezclilla',
        name: 'Mezclilla Denim',
        description: 'Denim estructurado informal chic (No compatible con bufanda)',
        noScarf: true,
        colors: [
          { id: 'mezclilla', name: 'Denim Azul Clásico', hex: '#3b82f6', pattern: 'denim' }
        ]
      },
      {
        id: 'satin',
        name: 'Satín Sedoso',
        description: 'Acabado satinado suave de caída etérea',
        colors: [
          { id: 'satin rosa', name: 'Satín Rosa Seda', hex: '#f43f5e', sheen: true },
          { id: 'satin blanco', name: 'Satín Blanco Nácar', hex: '#fdf4ff', sheen: true, border: '#cbd5e1' },
          { id: 'satin negro', name: 'Satín Negro Ébano', hex: '#171717', sheen: true }
        ]
      }
    ]
  }
];

export const SIZES = [
  { id: 'XS', name: 'XS (32-34)', bust: '78-82 cm', waist: '58-62 cm' },
  { id: 'S', name: 'S (36)', bust: '83-87 cm', waist: '63-67 cm' },
  { id: 'M', name: 'M (38)', bust: '88-92 cm', waist: '68-72 cm' },
  { id: 'L', name: 'L (40)', bust: '93-97 cm', waist: '73-77 cm' },
  { id: 'XL', name: 'XL (42)', bust: '98-103 cm', waist: '78-83 cm' },
  { id: 'custom', name: 'Medidas Personalizadas', bust: 'A tu medida', waist: 'A tu medida' }
];

// Helper to determine the exact GLB file for a given configuration
export function getModelFileName(fit, style, length) {
  if (fit === 'suelto') {
    const s = style === 'asimetrico' || style === 'asimetrico_fruncido' ? 'asimetrico' : 'regular';
    if (s === 'asimetrico') {
      if (length === 'crop') return 'suelto_asimetrico_crop.glb';
      if (length === 'largo') return 'suelto_asimetrico_largo.glb';
      return 'suelto_asimetrico_regular.glb';
    } else {
      if (length === 'crop') return 'suelto_crop.glb';
      if (length === 'largo') return 'suelto_largo.glb';
      return 'suelto_regular.glb';
    }
  } else {
    // Fit pegado
    if (style === 'asimetrico_fruncido') {
      if (length === 'crop') return 'asimetrico_fruncido_crop.glb';
      if (length === 'largo') return 'asimetrico_fruncido_largo.glb';
      return 'asimetrico_fruncido_regular.glb';
    } else if (style === 'fruncido') {
      if (length === 'crop') return 'fruncido_crop.glb';
      if (length === 'largo') return 'fruncido_largo.glb';
      return 'fruncido_regular.glb';
    } else if (style === 'asimetrico') {
      if (length === 'crop') return 'asimetrico_crop.glb';
      if (length === 'largo') return 'asimetrico_largo.glb';
      return 'regular_asimetrico.glb';
    } else {
      if (length === 'crop') return 'crop.glb';
      if (length === 'largo') return 'largo.glb';
      return 'regular.glb';
    }
  }
}

// Names verified against the identical material definitions in regular.glb.
const CROP_VARIANTS = ["Blanco","Negro","Rojo","Amarillo","Beige","Cafe","Rosa","Azul cielo","Azul marino","vino","Mesh fl negro","Mesh fl cafe","rayas amarillo","rayas rosa","Rayas cafe","Rayas azul","Mesh vino","Mesh negro","Mesh Blanco","Mesh cafe","Encaje blanco","Encaje negro","Mesh leopardo","Rayas rojo","Lentejuelas blanco","Lentejuelas negro","lentejuelas rojo","lentejuelas rosa","lentejuelas plateado","lentejuelas azul marino","brillos vino","Brillos cafe"];
export function normalizeVariantName(value) {
 return (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/_/g, ' ').replace(/\brays\b/g, 'rayas').replace(/\braya\b/g, 'rayas').replace(/amrillo/g, 'amarillo').replace(/boradado/g, 'bordado').replace(/mezcilla|mezclila/g, 'mezclilla').replace(/lentejuelqs/g, 'lentejuelas').replace(/\blentejuela\b/g, 'lentejuelas').replace(/negrp/g, 'negro').replace(/plateada/g, 'plateado').replace(/\bbeie\b/g, 'beige').replace(/polks/g, 'polka').replace(/lentejuels/g, 'lentejuelas').replace(/lentejuelas azul marino/g, 'lentejuelas azul').replace(/\s+/g, ' ').trim();
}
export function matchVariantName(target, variants = []) {
 const normalized = normalizeVariantName(target);
 const exact = variants.find(v => normalizeVariantName(v) === normalized);
 if (exact) return exact;
 // This export has 32 unnamed colorways, with verified material order.
 if (variants.length === 32 && variants[0] === 'Default Colorway' && variants.slice(1).every((v,i) => v === 'Colorway ' + (i+1))) {
  const index = CROP_VARIANTS.findIndex(v => normalizeVariantName(v) === normalized);
  return index < 0 ? null : variants[index];
 }
 return null;
}

// Calculates dynamic price based on selections (MXN)
export function calculateCustomizerPrice(config) {
  let basePrice = 799; // Base Strapless Top en MXN ($799 MXN)
  if (config.style === 'asimetrico_fruncido') basePrice += 150;
  else if (config.style === 'fruncido') basePrice += 100;
  else if (config.style === 'asimetrico') basePrice += 80;

  if (config.length === 'largo') basePrice += 80;

  if (config.withStraps) basePrice += 120; // Tirantes +$120 MXN
  if (config.withScarf) basePrice += 190;  // Bufanda +$190 MXN

  if (config.fabricId === 'lentejuelas' || config.fabricId === 'satin' || config.fabricId === 'encaje' || config.fabricId === 'bordado') {
    basePrice += 150;
  }

  return basePrice;
}

// Keep original variant IDs while presenting the client's fabric families.
const fabricNames = {algodon:'Algodón',mesh:'Mesh','rib rayas':'Rayas',encaje:'Encaje',lentejuelas:'Lentejuelas',brillos:'Brillos',polka:'Polka dots',cuadros:'Cuadros',bordado:'Bordado',stripes:'Rayas verticales',mezclilla:'Mezclilla denim',satin:'Satín'};
for (const group of FABRIC_GROUPS) {
 for (const [sourceId, targetId] of [['mesh fl','mesh'],['raya','rib rayas'],['flores','bordado']]) {
  const source = group.fabrics.find(f=>f.id===sourceId);
  const target = group.fabrics.find(f=>f.id===targetId);
  if (source && target) { target.colors.push(...source.colors); group.fabrics=group.fabrics.filter(f=>f!==source); }
 }
 for (const fabric of group.fabrics) {
  fabric.name = fabricNames[fabric.id] || fabric.name;
  for (const color of fabric.colors) {
   const words = color.id.replace(/^(mesh fl|mesh|rayas|encaje|lentejuelas|brillos|polka|cuadros|bordado|stripes|flores|satin)\s*/, '').replace('mezclilla','azul').replace('cafe','café');
   color.name = words.charAt(0).toUpperCase()+words.slice(1);
   color.swatch = 'assets/swatches/'+encodeURIComponent(color.id)+'.png';
  }
 }
}
