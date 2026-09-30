import React from 'react';
import { Sparkles, ShoppingBag, Eye, Heart } from 'lucide-react';
import './ProductCard.css';

import { formatPrice } from '../utils/currency';

export function ProductCard({ product, onSelectProduct, onCustomizeClick }) {
  const isCustom = product.is3DCustomizable;

  const handleCustomizeAction = (e) => {
    e.stopPropagation();
    if (onCustomizeClick) {
      onCustomizeClick(product);
    } else {
      const el = document.getElementById('personaliza-tu-prenda');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="fashion-product-card">
      {/* Product Image Wrapper */}
      <div className="card-image-box" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="card-main-img"
          loading="lazy"
        />

        {/* Badges */}
        <div className="card-badges-stack">
          {product.badge && (
            <span className={`fashion-badge ${isCustom ? 'badge-custom-3d' : 'badge-regular'}`}>
              {isCustom && <Sparkles size={12} />}
              {product.badge}
            </span>
          )}
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="card-hover-actions">
          {isCustom ? (
            <button
              type="button"
              className="quick-action-pill btn-custom-3d"
              onClick={handleCustomizeAction}
            >
              <Sparkles size={14} />
              <span>Personalizar en 3D</span>
            </button>
          ) : (
            <button
              type="button"
              className="quick-action-pill view-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
            >
              <Eye size={14} />
              <span>Ver Detalle</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="card-details-box">
        <div className="card-category-tag">{product.category}</div>
        <h3 className="card-product-title" onClick={() => onSelectProduct(product)}>
          {product.name}
        </h3>
        
        <div className="card-price-row">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="card-footer-buttons">
          {isCustom ? (
            <button
              type="button"
              className="card-btn-primary"
              onClick={handleCustomizeAction}
            >
              <Sparkles size={15} />
              <span>Personalizar en 3D</span>
            </button>
          ) : (
            <button
              type="button"
              className="card-btn-outline"
              onClick={() => onSelectProduct(product)}
            >
              <ShoppingBag size={15} />
              <span>Ver Prenda</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
