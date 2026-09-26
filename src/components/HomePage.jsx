import React, { useState, useMemo } from 'react';
import { Flower2, LayoutGrid, List, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';
import { clientData } from '../data/clientData';
import { productRepository } from '../services/productRepository';
import { ProductCard } from './ProductCard';
import './HomePage.css';

const allProducts = clientData.products;

const categoryCollections = [
  { slug: 'funebres', name: 'Catálogo completo', count: allProducts.length, image: allProducts[0]?.image },
  { slug: 'coronas', name: 'Coronas', count: allProducts.filter(p => p.originalCategorySlugs.includes('coronas')).length, id: 'legacy-1326' },
  { slug: 'arreglos', name: 'Arreglos', count: allProducts.filter(p => p.originalCategorySlugs.includes('arreglos')).length, id: 'legacy-797' },
  { slug: 'ofrendas-florales', name: 'Ofrendas florales', count: allProducts.filter(p => p.originalCategorySlugs.includes('ofrendas-florales')).length, id: 'legacy-878' },
  { slug: 'cubre-urnas', name: 'Cubre urnas', count: allProducts.filter(p => p.originalCategorySlugs.includes('cubre-urnas')).length, id: 'legacy-800' },
  { slug: 'ramos', name: 'Ramos', count: allProducts.filter(p => p.originalCategorySlugs.includes('ramos')).length, id: 'legacy-881' },
].map(c => ({
  ...c,
  image: c.image || allProducts.find(p => p.id === c.id)?.image || allProducts[0].image
}));

export function HomePage({
  onSelectProduct,
  activeCategory: externalCategory,
  onSelectCategory: externalSelectCategory,
  searchQuery = '',
  sortBy: externalSortBy,
  onSortChange: externalSortChange,
  catalogView: externalView,
  onViewChange: externalViewChange
}) {
  const brand = productRepository.getBrandInfo();
  const [internalCategory, setInternalCategory] = useState('funebres');
  const [internalSortBy, setInternalSortBy] = useState('featured');
  const [internalView, setInternalView] = useState('grid');

  const activeCategory = externalCategory !== undefined ? externalCategory : internalCategory;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const view = externalView !== undefined ? externalView : internalView;

  const handleCategoryChange = (slug) => {
    if (externalSelectCategory) {
      externalSelectCategory(slug);
    } else {
      setInternalCategory(slug);
    }
  };

  const handleSortChange = (val) => {
    if (externalSortChange) {
      externalSortChange(val);
    } else {
      setInternalSortBy(val);
    }
  };

  const handleViewChange = (v) => {
    if (externalViewChange) {
      externalViewChange(v);
    } else {
      setInternalView(v);
    }
  };

  // Filtrar y ordenar productos para mostrar todos los correspondientes
  const displayedProducts = useMemo(() => {
    let list = [...allProducts];

    // Filtrar por categoría
    if (activeCategory && activeCategory !== 'funebres') {
      list = list.filter(p => p.originalCategorySlugs.includes(activeCategory));
    }

    // Filtrar por búsqueda si existe
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q)
      );
    }

    // Ordenar
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const activeCategoryObj = categoryCollections.find(c => c.slug === activeCategory) || categoryCollections[0];

  return (
    <main className="home-page" id="inicio">
      <div className="home-wrap">
        {/* 1. Banner de bienvenida con Logo Oficial Centrado y Grande */}
        <section className="home-welcome home-welcome-brand">
          <div className="home-brand-emblem-wrap">
            <img
              src={brand.logo}
              alt={brand.name}
              className="home-brand-main-logo"
              width="680"
              height="245"
            />
          </div>
          <p className="home-eyebrow">FLORES QUE EXPRESAN CARIÑO, RESPETO Y COMPAÑÍA</p>
          <h1>Floristería en Santiago <span>Un homenaje hecho con flores</span></h1>
        </section>

        {/* 2. Barra de Categorías Circulares Interactivas */}
        <nav className="home-collections" aria-label="Colecciones de flores">
          {categoryCollections.map(c => {
            const isSelected = activeCategory === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                className={`home-category-bubble${isSelected ? ' is-active' : ''}`}
                onClick={() => handleCategoryChange(c.slug)}
                aria-pressed={isSelected}
              >
                <span className="home-category-image">
                  <img src={c.image} alt={c.name} width="150" height="150" loading="lazy" />
                </span>
                <strong>{c.name}</strong>
                <span>{c.count} productos</span>
              </button>
            );
          })}
        </nav>

        {/* 3. Catálogo Completo Fusionado en Portada (TODOS los productos disponibles directamente) */}
        <section className="home-section home-complete-catalog" id="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-header-bar">
            <div>
              <div className="catalog-badge-row">
                <span className="catalog-pill">
                  <Sparkles size={14} /> {activeCategoryObj.name}
                </span>
                <span className="catalog-count-pill">
                  {displayedProducts.length} productos disponibles
                </span>
              </div>
              <h2 id="catalog-title">
                {activeCategory === 'funebres' ? 'Catálogo Completo de Arreglos y Coronas Fúnebres' : activeCategoryObj.name}
              </h2>
              <p className="catalog-subtitle">
                Despacho express 24/7 a todos los velatorios, iglesias y domicilios de Santiago. Cinta o tarjeta de condolencia incluida.
              </p>
            </div>

            {/* Controles de ordenamiento y vista */}
            <div className="catalog-controls">
              <div className="catalog-sort-box">
                <label htmlFor="home-sort">Ordenar:</label>
                <select
                  id="home-sort"
                  value={sortBy}
                  onChange={e => handleSortChange(e.target.value)}
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="title">Nombre A-Z</option>
                </select>
              </div>

              <div className="catalog-view-toggle">
                <button
                  type="button"
                  aria-label="Ver en cuadrícula"
                  className={view === 'grid' ? 'is-active' : ''}
                  onClick={() => handleViewChange('grid')}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Ver en lista"
                  className={view === 'list' ? 'is-active' : ''}
                  onClick={() => handleViewChange('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Cuadrícula con TODOS los productos */}
          {displayedProducts.length > 0 ? (
            <div className={`catalog-products-container view-${view}`}>
              {displayedProducts.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                  priority={index < 4}
                />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-notice">
              <p>No se encontraron productos en esta categoría o con la búsqueda actual.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => handleCategoryChange('funebres')}
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </section>

        {/* 4. Ventajas del Servicio */}
        <section className="home-features-banner">
          <div className="feature-item">
            <Clock size={28} className="feature-icon" />
            <div>
              <strong>Despacho Express 24/7</strong>
              <small>Entrega puntual en cualquier funeraria o velatorio de Santiago</small>
            </div>
          </div>
          <div className="feature-item">
            <Heart size={28} className="feature-icon" />
            <div>
              <strong>Cinta o Tarjeta Incluida</strong>
              <small>Mensaje de condolencias personalizado sin costo adicional</small>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={28} className="feature-icon" />
            <div>
              <strong>Pago Seguro Flow / Webpay</strong>
              <small>Tarjetas de débito, crédito y transferencia bancaria</small>
            </div>
          </div>
        </section>

        {/* 5. Preguntas Frecuentes */}
        <section className="home-faq home-section">
          <p className="home-eyebrow">INFORMACIÓN DE COMPRA Y SERVICIO</p>
          <h2>Preguntas frecuentes</h2>
          <details open>
            <summary>¿En cuánto tiempo se realiza la entrega?</summary>
            <p>Confeccionamos y despachamos en un plazo promedio de 2 a 4 horas a funerarias, iglesias y velatorios en todo Santiago (Sendero, Parque del Recuerdo, Cementerio General, San Sebastián, etc.).</p>
          </details>
          <details>
            <summary>¿Cómo añado el mensaje de la tarjeta o cinta?</summary>
            <p>Al hacer clic en "Comprar ahora" o al ir al Carrito, completarás un formulario de 3 preguntas clave: (1) ¿A quién entrega?, (2) Dirección o Velatorio, y (3) Texto de la tarjeta/cinta.</p>
          </details>
          <details>
            <summary>¿Qué medios de pago aceptan?</summary>
            <p>Aceptamos Webpay Plus, tarjetas de crédito, débito Redcompra y transferencias electrónicas a través de la pasarela segura Flow.cl.</p>
          </details>
        </section>

        {/* 6. Pie de Cierre */}
        <section className="home-closing">
          <Flower2 size={36} />
          <div>
            <h2>Corona de Flores Santiago</h2>
            <p>Floristería especializada en coronas fúnebres, arreglos y condolencias 24/7.</p>
          </div>
          <a href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="home-whatsapp-cta">
            WhatsApp {brand.whatsappFormatted}
          </a>
        </section>
      </div>
    </main>
  );
}
