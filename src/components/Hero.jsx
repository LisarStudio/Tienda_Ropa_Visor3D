import React from 'react';
import { ArrowRight, Sparkles, Scissors, Heart, ShieldCheck, Play } from 'lucide-react';
import { clientData, getAssetUrl } from '../data/clientData';
import './Hero.css';

export function Hero({ onCustomizeClick, onExploreClick }) {
  const brand = clientData.brand;
  const heroPattern = getAssetUrl('assets/patterns/l9.png');

  return (
    <section className="atelier-hero-section">
      {/* Soft Ambient Background Elements */}
      <div className="hero-ambient-glow" />

      <div className="container hero-grid-wrapper">
        {/* Left Column: Editorial Headline & Value Proposition */}
        <div className="hero-text-col">
          <div className="hero-eyebrow-pill">
            <Sparkles size={14} className="eyebrow-icon" />
            <span>HANDMADE • CHIC • FEMININE</span>
          </div>

          <h1 className="hero-main-title">
            Prendas de Autor & <span className="title-highlight">Diseño 3D en Vivo</span>
          </h1>

          <p className="hero-description-lead">
            Bienvenida al atelier de <strong>{brand.name}</strong>. Confeccionamos prendas femeninas exclusivas hechas a mano. Explora nuestro catálogo listo para vestir o crea tu propio top strapless personalizado en tiempo real en nuestro visor 3D.
          </p>

          <div className="hero-feature-points">
            <div className="feature-point-item">
              <div className="point-icon-box"><Scissors size={18} /></div>
              <div>
                <strong>Confección Artesanal a Medida</strong>
                <span>Tallas estándar XS-XL o ajuste exacto a tus medidas en cm.</span>
              </div>
            </div>
            <div className="feature-point-item">
              <div className="point-icon-box"><Sparkles size={18} /></div>
              <div>
                <strong>Simulación 3D con Más de 40 Telas</strong>
                <span>Prueba cortes, tirantes, bufanda skinny y telas con visualización 360°.</span>
              </div>
            </div>
          </div>

          <div className="hero-cta-button-row">
            <button
              type="button"
              className="btn-primary hero-btn-main"
              onClick={onCustomizeClick}
            >
              <Sparkles size={18} />
              <span>Personaliza tu prenda en 3D</span>
            </button>
            <button
              type="button"
              className="btn-secondary hero-btn-sub"
              onClick={onExploreClick}
            >
              <span>Ver Catálogo</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual-col">
          <div className="hero-visual-card">
            <div className="hero-card-image-wrapper">
              <img
                src={heroPattern}
                alt="Daniela Atelier Fashion Preview"
                className="hero-card-img"
              />
              <div className="hero-card-badge-3d">
                <Sparkles size={16} />
                <span>3D INTERACTIVE STUDIO</span>
              </div>
            </div>

            <div className="hero-card-footer-info">
              <div className="card-footer-text">
                <h4>Top Strapless Signature</h4>
                <p>Fit Pegado o Suelto • Confección a mano</p>
              </div>
              <button
                type="button"
                className="card-quick-try-btn"
                onClick={onCustomizeClick}
              >
                <span>Probar en 3D</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
