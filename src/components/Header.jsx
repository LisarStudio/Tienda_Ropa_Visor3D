import React, { useRef, useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, Sparkles, ChevronDown, Heart } from 'lucide-react';
import { clientData } from '../data/clientData';
import './Header.css';

export function Header({ cartCount, onOpenCart, onSelectCategory, searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef(null);
  const brand = clientData.brand;

  const toggleSearch = () => {
    setSearchOpen(open => !open);
    if (!searchOpen) {
      setTimeout(() => searchInput.current?.focus(), 100);
    }
  };

  const handleNavClick = (sectionId, categorySlug = null) => {
    setMobileMenuOpen(false);
    if (categorySlug && onSelectCategory) {
      onSelectCategory(categorySlug);
    }
    window.location.hash = ['best-sellers', 'new-in'].includes(categorySlug) ? categorySlug : sectionId;
  };

  return (
    <header className="brand-header">
      {/* Top Luxury Announcement Bar */}
      <div className="brand-announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-text-wrap">
            <span className="announcement-highlight">✨ ENVÍOS A TODO MÉXICO</span>
            <span className="announcement-dot">•</span>
            <span>MERCADO PAGO HASTA 6 MSI & OXXO</span>
            <span className="announcement-dot">•</span>
            <span className="desktop-inline">HECHO A MANO EN ATELIER</span>
          </div>
          <div className="topbar-right-links desktop-only">
            <a href="#faq" onClick={() => handleNavClick('faq')}>Guía de Tallas & FAQ</a>
            <span className="announcement-dot">•</span>
            <a href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              WhatsApp Concierge: {brand.whatsappFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="brand-main-header">
        <div className="container header-grid-row">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo & Tagline */}
          <a href="#inicio" className="brand-logo-link" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={brand.logo}
              alt={brand.name}
              className="brand-logo-img"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links">
            <button
              type="button"
              className="nav-link-item highlight-customizer"
              onClick={() => handleNavClick('personaliza-tu-prenda')}
            >
              <Sparkles size={14} className="sparkle-gold" />
              <span>Personaliza tu prenda</span>
            </button>
            <button
              type="button"
              className="nav-link-item"
              onClick={() => handleNavClick('catalogo-section', 'todos')}
            >
              Catálogo
            </button>
            <button
              type="button"
              className="nav-link-item"
              onClick={() => handleNavClick('catalogo-section', 'best-sellers')}
            >
              Best Sellers
            </button>
            <button
              type="button"
              className="nav-link-item"
              onClick={() => handleNavClick('catalogo-section', 'new-in')}
            >
              New In
            </button>
            <button
              type="button"
              className="nav-link-item"
              onClick={() => handleNavClick('faq')}
            >
              FAQ
            </button>
          </nav>

          {/* Actions: Search & Cart */}
          <div className="header-actions-group">
            {/* Desktop Search Bar */}
            <form
              className="search-form-bar desktop-only"
              onSubmit={(e) => {
                e.preventDefault();
                handleNavClick('catalogo-section');
              }}
            >
              <input
                ref={searchInput}
                type="search"
                placeholder="Buscar prenda o tela..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-icon-btn" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              className="mobile-search-btn mobile-only"
              onClick={toggleSearch}
              aria-label="Buscar"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="cart-trigger-btn"
              onClick={onOpenCart}
              aria-label={`Carrito de compras (${cartCount} productos)`}
            >
              <div className="cart-icon-stack">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge-count">{cartCount}</span>
                )}
              </div>
              <span className="cart-label-text desktop-only">Bolsa</span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {searchOpen && (
          <div className="mobile-search-dropdown-bar mobile-only">
            <div className="container mobile-search-inner">
              <div className="mobile-search-input-wrap">
                <Search size={18} className="search-icon-inside" />
                <input
                  ref={searchInput}
                  type="search"
                  placeholder="Buscar prendas, sedas, colores..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="mobile-search-input"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => onSearchChange('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="btn-search-go"
                onClick={() => {
                  setSearchOpen(false);
                  handleNavClick('catalogo-section');
                }}
              >
                Ver
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <button
            type="button"
            className="mobile-nav-item primary-custom"
            onClick={() => handleNavClick('personaliza-tu-prenda')}
          >
            <Sparkles size={18} />
            <span>Personaliza tu prenda en 3D</span>
          </button>

          <div className="mobile-section-divider">CATEGORÍAS</div>
          {clientData.categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="mobile-nav-item"
              onClick={() => handleNavClick('catalogo-section', c.slug)}
            >
              <span>{c.name}</span>
            </button>
          ))}

          <div className="mobile-section-divider">INFORMACIÓN</div>
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => handleNavClick('faq')}
          >
            Guía de Tallas & Cuidados
          </button>

          <div className="mobile-drawer-footer">
            <a
              href={`https://wa.me/${brand.whatsapp.replace('+', '')}`}
              className="mobile-wa-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir Asesoría por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
