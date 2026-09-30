import React from 'react';
import { clientData } from '../data/clientData';
import { Mail, Phone, MapPin, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import './Footer.css';

export function Footer({ onSelectCategory }) {
  const brand = clientData.brand;

  return (
    <footer className="brand-footer">
      <div className="container footer-main-grid">
        {/* Brand Col */}
        <div className="footer-brand-col">
          <div className="footer-logo-box">
            <img
              src={brand.logoLight || brand.logo}
              alt={brand.name}
              className="footer-logo-img"
            />
            <span className="footer-tagline-text">{brand.tagline}</span>
          </div>

          <p className="footer-about-text">
            Atelier de moda de autor especializado en prendas hechas a mano con dedicación artesanal y personalización interactiva en 3D en tiempo real.
          </p>

          <div className="footer-trust-badge">
            <Sparkles size={16} />
            <span>Taller de confección en Ciudad de México • Envíos a todo México</span>
          </div>
        </div>

        {/* Links Col */}
        <div className="footer-links-col">
          <h4>Colecciones Atelier</h4>
          <a href="#personaliza-tu-prenda" onClick={() => { const el = document.getElementById('personaliza-tu-prenda'); if (el) el.scrollIntoView(); }}>
            Personaliza tu prenda 3D
          </a>
          {clientData.categories.map((c) => (
            <a
              key={c.id}
              href="#catalogo-section"
              onClick={() => onSelectCategory && onSelectCategory(c.slug)}
            >
              {c.name}
            </a>
          ))}
        </div>

        {/* Contact & Hours */}
        <div className="footer-contact-col">
          <h4>Atención & Asesoría</h4>
          <div className="contact-item">
            <Phone size={16} className="contact-icon" />
            <a href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              WhatsApp: {brand.whatsappFormatted}
            </a>
          </div>
          <div className="contact-item">
            <Mail size={16} className="contact-icon" />
            <a href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </div>
          <div className="contact-item">
            <MapPin size={16} className="contact-icon" />
            <span>{brand.address}</span>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="container sub-footer-row">
        <div>
          © {new Date().getFullYear()} {brand.name} Atelier. Todos los derechos reservados.
        </div>
        <div className="sub-footer-credits">
          <span>Handmade with</span> <Heart size={14} className="heart-icon" /> <span>• Con tecnología 3D por Lisar Studio</span>
        </div>
      </div>
    </footer>
  );
}
