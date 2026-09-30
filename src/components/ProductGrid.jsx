import React from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles, LayoutGrid, List } from 'lucide-react';
import './ProductGrid.css';

export function ProductGrid({
  products,
  category = 'todos',
  onSelectProduct,
  onCustomizeClick
}) {
  return (
    <section id="catalogo-section" className="fashion-catalog-section">
      <div className="catalog-header-intro">
        <span className="catalog-eyebrow">COLECCIÓN ATELIER</span>
        <h2 className="catalog-heading">Catálogo de Prendas Exclusivas</h2>
        <p className="catalog-subtext">
          Prendas listas para vestir y diseños personalizables en 3D confeccionados con dedicación artesanal.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="fashion-products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onCustomizeClick={onCustomizeClick}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-empty-state">
          <p>No se encontraron prendas con los filtros seleccionados.</p>
        </div>
      )}
    </section>
  );
}
