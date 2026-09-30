import React, { useMemo } from 'react';
import { Hero } from './Hero';
import { CustomizerSection } from './Customizer3D/CustomizerSection';
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import { FAQSection } from './FAQSection';
import { clientData, getAssetUrl } from '../data/clientData';
import { Sparkles, Scissors, Heart, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import './HomePage.css';

export function HomePage({
  onSelectProduct,
  activeCategory = 'todos',
  onSelectCategory,
  searchQuery = '',
  sortBy = 'featured',
  onSortChange,
  onAddToCart
}) {
  const brand = clientData.brand;
  const allProducts = clientData.products;

  // Filter and Sort Catalog Products
  const displayedProducts = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (activeCategory && activeCategory !== 'todos' && activeCategory !== 'all') {
      list = list.filter(p =>
        p.category === activeCategory ||
        p.categorySlugs?.includes(activeCategory)
      );
    }

    // Search filter
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allProducts, activeCategory, searchQuery, sortBy]);

  const scrollToCustomizer = () => {
    const el = document.getElementById('personaliza-tu-prenda');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="brand-homepage-container" id="inicio">
      {/* 1. Hero Section */}
      <Hero
        onCustomizeClick={scrollToCustomizer}
        onExploreClick={scrollToCatalog}
      />

      {/* 2. Value Proposition Pillars */}
      <section className="atelier-pillars-banner">
        <div className="container pillars-grid">
          <div className="pillar-item">
            <div className="pillar-icon-wrap"><Scissors size={22} /></div>
            <div>
              <strong>Confección 100% a Mano</strong>
              <p>Cada pieza es cortada y confeccionada artesanalmente en nuestro taller.</p>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon-wrap"><Sparkles size={22} /></div>
            <div>
              <strong>Diseño 3D en Tiempo Real</strong>
              <p>Visualiza combinaciones de cortes, tirantes y más de 40 telas en 360°.</p>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon-wrap"><Heart size={22} /></div>
            <div>
              <strong>Tallas Estándar & A Medida</strong>
              <p>Desde XS a XL o ajustada a tus centímetros de busto y cintura.</p>
            </div>
          </div>
          <div className="pillar-item">
            <div className="pillar-icon-wrap"><Truck size={22} /></div>
            <div>
              <strong>Envíos a Todo el País</strong>
              <p>Despacho seguro y seguimiento personalizado de tu pedido.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 3D Customizer Interactive Studio (Star Feature) */}
      <CustomizerSection onAddToCart={onAddToCart} />

      {/* 4. Ready-to-Wear Catalog */}
      <section className="container ready-to-wear-section">
        <CategoryFilter
          categories={clientData.categories}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          sortBy={sortBy}
          onSortChange={onSortChange}
          totalItems={displayedProducts.length}
        />

        <ProductGrid
          products={displayedProducts}
          category={activeCategory}
          onSelectProduct={onSelectProduct}
          onCustomizeClick={scrollToCustomizer}
        />
      </section>

      {/* 5. Brand Identity & Atelier Spotlight */}
      <section className="atelier-story-section">
        <div className="container story-grid">
          <div className="story-content-col">
            <span className="story-eyebrow">LA FILOSOFÍA DEL ATELIER</span>
            <h2 className="story-title">Handmade • Chic • Feminine</h2>
            <p className="story-paragraph">
              En <strong>Daniela Atelier</strong> creemos en una moda femenina consciente, donde la tecnología 3D se une con la alta costura tradicional. Cada top, vestido o falda se diseña pensando en realzar la belleza y seguridad de cada mujer con telas exclusivas y calces perfectos.
            </p>
            <div className="story-brand-badge-row">
              <span className="story-pill">Taller en Chile</span>
              <span className="story-pill">Textiles de Alta Calidad</span>
              <span className="story-pill">Atención Personalizada</span>
            </div>
            <button
              type="button"
              className="btn-primary story-cta"
              onClick={scrollToCustomizer}
            >
              <Sparkles size={16} />
              <span>Crear mi propio diseño</span>
            </button>
          </div>

          <div className="story-visual-col">
            <div className="story-image-mosaic">
              <img
                src={getAssetUrl('assets/patterns/l7.png')}
                alt="Atelier Moodboard"
                className="mosaic-main-img"
              />
              <img
                src={getAssetUrl('assets/patterns/l1.png')}
                alt="Atelier Fashion Detail"
                className="mosaic-floating-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ & Size Guide Section */}
      <FAQSection />
    </main>
  );
}
