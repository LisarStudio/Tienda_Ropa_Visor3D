import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import './ProductDetailModal.css';

import { formatPrice } from '../utils/currency';

export function ProductDetailModal({ product, onClose, onAddToCart, onBuyNowFlow, onCustomizeClick }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'S');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) return null;

  const isCustom = product.is3DCustomizable;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, { name: `Talla ${selectedSize}`, size: selectedSize });
  };

  const handleBuyNow = () => {
    onBuyNowFlow(product, quantity, { name: `Talla ${selectedSize}`, size: selectedSize });
  };

  const handleGoToCustomizer = () => {
    onClose();
    if (onCustomizeClick) {
      onCustomizeClick(product);
    } else {
      const el = document.getElementById('personaliza-tu-prenda');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fashion-modal-overlay" onClick={onClose}>
      <div className="fashion-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-label="Cerrar modal"
          className="modal-close-icon-btn"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="fashion-modal-grid">
          {/* Left Column: Image & Gallery */}
          <div className="modal-gallery-col">
            <div className="modal-main-image-box">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="modal-main-img"
              />
              {isCustom && (
                <div className="modal-3d-floating-badge">
                  <Sparkles size={14} />
                  <span>Modelo Personalizable 3D</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="modal-thumbnails-row">
                {[product.image, ...product.gallery.filter(g => g !== product.image)].map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`thumb-btn ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Guarantee */}
            <div className="modal-atelier-guarantee">
              <ShieldCheck size={20} className="guarantee-icon" />
              <div>
                <strong>Confección 100% Mexicana de Autor</strong>
                <span>Terminaciones de alta costura, forro suave y telas de primera calidad.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Customizer Actions */}
          <div className="modal-info-col">
            <div className="modal-category-badge">{product.category}</div>
            <h2 className="modal-product-title">{product.name}</h2>

            <div className="modal-price-row">
              <span className="modal-current-price">{formatPrice(product.price * quantity)}</span>
              {product.originalPrice && (
                <span className="modal-original-price">{formatPrice(product.originalPrice * quantity)}</span>
              )}
            </div>

            <p className="modal-description-text">{product.description}</p>

            {/* 3D Customizer Highlight Box */}
            {isCustom && (
              <div className="modal-customizer-cta-box">
                <div className="cta-box-text">
                  <div className="cta-box-title">
                    <Sparkles size={16} />
                    <span>¿Quieres elegir otro color, largo o tirantes?</span>
                  </div>
                  <p>Prueba este modelo con nuestro visor 3D interactivo y más de 40 telas.</p>
                </div>
                <button
                  type="button"
                  className="open-3d-btn"
                  onClick={handleGoToCustomizer}
                >
                  <span>Abrir Taller 3D</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="modal-sizes-group">
                <div className="sizes-header">
                  <span className="sizes-label">Seleccionar Talla:</span>
                  <a href="#faq" onClick={() => { onClose(); const el = document.getElementById('faq'); if (el) el.scrollIntoView(); }} className="size-guide-link">
                    <Ruler size={13} /> Guía de medidas
                  </a>
                </div>

                <div className="modal-sizes-pills">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`size-pill ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="modal-qty-group">
              <span className="qty-label">Cantidad:</span>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="stepper-btn"
                >
                  -
                </button>
                <span className="stepper-val">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="stepper-btn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Features list */}
            {product.features && (
              <div className="modal-features-list">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="feature-row">
                    <Check size={14} className="feat-check-icon" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-action-buttons">
              <button
                type="button"
                className="modal-add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Añadir a mi Carrito</span>
              </button>
              <button
                type="button"
                className="modal-buy-now-btn"
                onClick={handleBuyNow}
              >
                <span>Comprar Ahora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
