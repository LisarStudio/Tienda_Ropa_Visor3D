export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = (typeof window !== 'undefined' && window.__CDF_ASSET_BASE__) || import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return cleanBase + cleanPath;
};

export const clientData = {
  brand: {
    name: "Ninna Wear",
    studioName: "Lisar Studio",
    tagline: "Handmade • Chic • Feminine",
    subtagline: "Prendas de autor hechas a mano en México y personalizables en 3D en tiempo real.",
    domain: "daniela-atelier.mx",
    country: "México",
    logo: getAssetUrl("assets/brand/logo_cafe-rosa.png"),
    logoYellow: getAssetUrl("assets/brand/logo_cafe-amarillo.png"),
    logoLight: getAssetUrl("assets/brand/logo_rosa-amarillo.png"),
    logoCafe: getAssetUrl("assets/brand/logo_cafe.png"),
    isotipo: getAssetUrl("assets/brand/isotipo_cafe.png"),
    isotipoRosa: getAssetUrl("assets/brand/isotipo_rosa.png"),
    isotipoAmarillo: getAssetUrl("assets/brand/isotipo_amarillo.png"),
    whatsapp: "+525546509718",
    whatsappFormatted: "+52 55 4650 9718",
    email: "contacto@daniela-atelier.mx",
    address: "Colonia Roma Norte, Cuauhtémoc, Ciudad de México (CDMX) • Envíos express a todo México",
    currency: "MXN",
    currencySymbol: "$",
    shippingCost: 149,
    freeShippingMin: 1499,
    colors: {
      cafe: "#4a1e1b",
      rosa: "#f1b6c7",
      amarillo: "#faf4d4",
      dark: "#2c1210",
      lightBg: "#fffdf9"
    }
  },
  mexicoPaymentMethods: [
    { id: 'mercadopago', name: 'Mercado Pago', badge: 'Tarjetas, Débito & Hasta 6 MSI', icon: 'CreditCard' },
    { id: 'oxxo', name: 'OXXO Pay', badge: 'Pago en efectivo en +20,000 tiendas OXXO', icon: 'Store' },
    { id: 'spei', name: 'Transferencia SPEI', badge: 'Acreditación instantánea 24/7 (CLABE)', icon: 'Building' },
    { id: 'paypal', name: 'PayPal México', badge: 'Protección al comprador', icon: 'ShieldCheck' },
    { id: 'whatsapp', name: 'Asesoría & Pedido WhatsApp', badge: 'Atención personalizada CDMX', icon: 'MessageCircle' }
  ],
  flowConfig: {
    sandboxUrl: 'https://sandbox.flow.cl/api',
    liveUrl: 'https://www.flow.cl/api'
  },
  categories: [
    { id: 'todos', name: 'Todos los productos', slug: 'todos', icon: 'Grid' },
    { id: 'tops', name: 'Tops Strapless & 3D', slug: 'tops', icon: 'Sparkles' },
    { id: 'bottoms', name: 'Faldas & Pantalones', slug: 'bottoms', icon: 'Scissors' },
    { id: 'vestidos', name: 'Vestidos de Autor', slug: 'vestidos', icon: 'Feather' },
    { id: 'accesorios', name: 'Bufandas & Complementos', slug: 'accesorios', icon: 'Sparkles' },
    { id: 'new-in', name: 'New In', slug: 'new-in', icon: 'Flame' },
    { id: 'best-sellers', name: 'Best Sellers', slug: 'best-sellers', icon: 'Star' }
  ],
  products: [
    {
      id: 'top-strapless-custom',
      name: 'Top Strapless de Autor (Personalizable 3D)',
      category: 'tops',
      categorySlugs: ['tops', 'best-sellers', 'new-in', 'todos'],
      price: 799,
      originalPrice: 949,
      image: getAssetUrl('assets/patterns/l1.png'),
      gallery: [
        getAssetUrl('assets/patterns/l1.png'),
        getAssetUrl('assets/patterns/l2.png'),
        getAssetUrl('assets/patterns/l3.png')
      ],
      badge: 'Personalizable 3D',
      is3DCustomizable: true,
      description: 'Nuestra pieza icónica strapless hecha a mano. Elige el ajuste (Pegado o Suelto), estilo de corte (Regular, Asimétrico, Fruncido, Asimétrico Fruncido), largo (Crop, Regular, Largo), agrega tirantes finos o bufanda skinny a juego, y selecciona entre más de 40 combinaciones de telas y colores exclusivas en el visor 3D.',
      features: [
        'Confeccionado artesanalmente a mano en nuestro taller',
        'Visualización 3D interactiva en 360° con cambio de tela en tiempo real',
        'Tirantes finos y bufanda skinny a juego opcionales',
        'Tallas estándar mexicanas (XS a XL) o confección a tus medidas exactas de busto y cintura'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)', 'A Medida']
    },
    {
      id: 'top-asimetrico-drapeado',
      name: 'Top Asimétrico Fruncido Rosa Chic',
      category: 'tops',
      categorySlugs: ['tops', 'best-sellers', 'todos'],
      price: 949,
      originalPrice: 1099,
      image: getAssetUrl('assets/patterns/l9.png'),
      gallery: [
        getAssetUrl('assets/patterns/l9.png'),
        getAssetUrl('assets/patterns/l8.png')
      ],
      badge: 'Best Seller',
      is3DCustomizable: true,
      description: 'Top con corte diagonal asimétrico y drapeado fruncido en los laterales para un calce esculpido. Confeccionado en tela stretch suave de caída impecable.',
      features: [
        'Corte asimétrico vanguardista de hombro descubierto',
        'Textura fruncida que estiliza el torso',
        'Disponible en visor 3D para probar más colores y texturas'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    },
    {
      id: 'top-suelto-vichy',
      name: 'Top Suelto Cuadros Café Vintage',
      category: 'tops',
      categorySlugs: ['tops', 'new-in', 'todos'],
      price: 849,
      image: getAssetUrl('assets/patterns/l5.png'),
      gallery: [
        getAssetUrl('assets/patterns/l5.png'),
        getAssetUrl('assets/patterns/l4.png')
      ],
      badge: 'New In',
      is3DCustomizable: true,
      description: 'Diseño relajado en tela sin stretch con patrón de cuadros vintage europeo. Ideal para combinar con bottoms de cintura alta o denim.',
      features: [
        'Fit suelto con movimiento etéreo y vaporoso',
        'Tejido estructurado de máxima durabilidad',
        'Diseño personalizable en el visor 3D'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    },
    {
      id: 'top-crop-lentejuelas',
      name: 'Top Crop Lentejuelas Onyx Glam',
      category: 'tops',
      categorySlugs: ['tops', 'new-in', 'todos'],
      price: 1099,
      originalPrice: 1299,
      image: getAssetUrl('assets/patterns/l3.png'),
      gallery: [
        getAssetUrl('assets/patterns/l3.png'),
        getAssetUrl('assets/patterns/l7.png')
      ],
      badge: 'Edición Glamour',
      is3DCustomizable: true,
      description: 'Brillo deslumbrante confeccionado en lentejuelas de alta densidad sobre base elastizada. Perfecto para ocasiones especiales, cócteles y salidas de noche.',
      features: [
        'Lentejuelas cosidas a mano de alta resistencia',
        'Forro interior suave hipoalergénico para máxima comodidad',
        'Pruébalo en el visor 3D con tirantes finos'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)']
    },
    {
      id: 'top-asimetrico-mesh-floral',
      name: 'Top Asimétrico Mesh Floral Café',
      category: 'tops',
      categorySlugs: ['tops', 'new-in', 'todos'],
      price: 899,
      image: getAssetUrl('assets/patterns/l8.png'),
      gallery: [
        getAssetUrl('assets/patterns/l8.png'),
        getAssetUrl('assets/patterns/l9.png')
      ],
      badge: 'Tendencia 2026',
      is3DCustomizable: true,
      description: 'Malla floral translúcida con forro anatómico. Una prenda romántica y sugerente inspirada en la alta costura contemporánea.',
      features: [
        'Malla stretch ultra suave al contacto con la piel',
        'Estampado botánico sutil en tonos tierra y café cacao',
        'Personalizable en el visor 3D'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    },
    {
      id: 'bufanda-skinny-couture',
      name: 'Bufanda Skinny Couture a Juego',
      category: 'accesorios',
      categorySlugs: ['accesorios', 'best-sellers', 'todos'],
      price: 249,
      image: getAssetUrl('assets/patterns/l7.png'),
      gallery: [
        getAssetUrl('assets/patterns/l7.png'),
        getAssetUrl('assets/patterns/l6.png')
      ],
      badge: 'Accesorio Chic',
      description: 'Bufanda delgada estilo parisino confeccionada a mano en la misma tela y color de tu top favorito. El toque definitivo de distinción.',
      features: [
        'Largo de 180 cm para múltiples amarres (nudo francés, lazo o suelta)',
        'Acabados con dobladillo invisible hecho a mano',
        'Compatible con tops de algodón, satín, rib y encaje'
      ],
      sizes: ['Unitalla']
    },
    {
      id: 'vestido-slip-satin',
      name: 'Vestido Slip Dress Satín Rosa Nácar',
      category: 'vestidos',
      categorySlugs: ['vestidos', 'best-sellers', 'todos'],
      price: 1499,
      originalPrice: 1799,
      image: getAssetUrl('assets/patterns/l6.png'),
      gallery: [
        getAssetUrl('assets/patterns/l6.png'),
        getAssetUrl('assets/patterns/l1.png')
      ],
      badge: 'Favorito Chic',
      description: 'Vestido midi en satín sedoso de tacto líquido. Corte al bies con escote sutil y tirantes regulables para una silueta femenina sofisticada.',
      features: [
        'Satín de brillo nacarado premium importado',
        'Corte al bies que acompaña el movimiento natural',
        'Hecho a mano en nuestro taller de costura'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    },
    {
      id: 'vestido-maxi-encaje',
      name: 'Vestido Strapless Maxi Encaje Romántico',
      category: 'vestidos',
      categorySlugs: ['vestidos', 'new-in', 'todos'],
      price: 1699,
      image: getAssetUrl('assets/patterns/l2.png'),
      gallery: [
        getAssetUrl('assets/patterns/l2.png'),
        getAssetUrl('assets/patterns/l8.png')
      ],
      badge: 'Alta Costura',
      description: 'Silueta maxi strapless con superposición de encaje floral bordado y forro a tono. Una declaración de feminidad atemporal para eventos inolvidables.',
      features: [
        'Encaje delicado con detalle festoneado artesanal',
        'Estructura interna reforzada tipo corsetería para calce seguro',
        'Confección a medida disponible'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)']
    },
    {
      id: 'falda-midi-satinada',
      name: 'Falda Midi Satinada Café Espresso',
      category: 'bottoms',
      categorySlugs: ['bottoms', 'best-sellers', 'todos'],
      price: 999,
      image: getAssetUrl('assets/patterns/l7.png'),
      gallery: [
        getAssetUrl('assets/patterns/l7.png'),
        getAssetUrl('assets/patterns/l3.png')
      ],
      badge: 'Básico Esencial',
      description: 'Falda midi de pretina elástica oculta y caída fluida. Combina a la perfección con todos nuestros tops personalizados strapless.',
      features: [
        'Tejido fluido con reflejo satinado suave',
        'Largo midi elegante y versátil',
        'Cintura elástica invisible de máximo confort'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    },
    {
      id: 'pantalon-palazzo-lino',
      name: 'Pantalón Palazzo Algodón Crema Vainilla',
      category: 'bottoms',
      categorySlugs: ['bottoms', 'new-in', 'todos'],
      price: 1199,
      image: getAssetUrl('assets/patterns/l4.png'),
      gallery: [
        getAssetUrl('assets/patterns/l4.png'),
        getAssetUrl('assets/patterns/l2.png')
      ],
      badge: 'New In',
      description: 'Pantalón ancho palazzo de tiro alto con pinzas delanteras y caída estructurada. La pieza perfecta para un look chic relajado.',
      features: [
        'Tiro alto estilizador con bolsillos laterales funcionales',
        'Caída amplia con terminaciones de sastrería fina',
        'Hecho a mano en México'
      ],
      sizes: ['XS (30)', 'S (32)', 'M (34)', 'L (36)', 'XL (38)']
    }
  ]
};

export const catalogMaxPrice = Math.ceil(Math.max(...clientData.products.map(p => p.price)) / 100) * 100;
export const catalogMinPrice = Math.floor(Math.min(...clientData.products.map(p => p.price)) / 100) * 100;
