import React, { useState, useEffect } from 'react';
import './catalog.css';
import { HomePage } from './components/HomePage';
import { AccountSection } from './components/AccountSection';
import { catalogMaxPrice, clientData } from './data/clientData';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { Home, ChevronRight } from 'lucide-react';
import { ProductGrid, CatalogViewToggle } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlowResponseModal } from './components/FlowResponseModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { productRepository } from './services/productRepository';
import { calculateOrderTotals, restoreCart } from './services/cart';

export default function App() {
  const getPage = () => window.location.hash === '#mi-cuenta' ? 'account' : window.location.hash.startsWith('#catalog') ? 'catalog' : 'home';
  const [page, setPage] = useState(getPage);
  useEffect(() => {
    const onHashChange = () => {
      const nextPage = getPage();
      setPage(prev => {
        if (prev !== nextPage) {
          window.scrollTo(0, 0);
        }
        return nextPage;
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const [products, setProducts] = useState([]);
  const [_categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('funebres');
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogView, setCatalogView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(catalogMaxPrice);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState(() => calculateOrderTotals([]));
  const [flowResponseData, setFlowResponseData] = useState(null);

  // Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('corona_cart');
      return saved ? restoreCart(JSON.parse(saved), clientData.products) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('corona_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cartItems]);

  // Load Products & Categories
  useEffect(() => {
    let cancelled = false;
    async function loadCatalog() {
      setLoading(true);
      const [prodsList, catsList] = await Promise.all([
        productRepository.getProducts({ category: activeCategory, searchQuery, sortBy }),
        productRepository.getCategories()
      ]);
      const filteredByPrice = prodsList.filter(p => p.price <= priceRange);
      if (cancelled) return;
      setProducts(filteredByPrice);
      setCategories(catsList);
      setLoading(false);
    }
    loadCatalog();
    return () => { cancelled = true; };
  }, [activeCategory, searchQuery, sortBy, priceRange]);

  // Cart operations
  const handleAddToCart = (product, quantity = 1, variant = null) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.selectedVariant?.name === variant?.name);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], quantity: updated[existingIdx].quantity + quantity };
        return updated;
      }
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
    setIsCartOpen(true);
    if (selectedProduct) setSelectedProduct(null);
  };

  const handleBuyNowFlow = (product, quantity = 1, variant = null) => {
    const orderItems = [{ ...product, quantity, selectedVariant: variant }];
    setCartItems([{ ...product, quantity, selectedVariant: variant }]);
    if (selectedProduct) setSelectedProduct(null);
    setCheckoutSummary(calculateOrderTotals(orderItems));
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = (summary) => {
    setCheckoutSummary(summary);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setFlowResponseData(paymentDetails);
  };

  const browseCatalog = ({ category = 'funebres', priceRange: maxPrice = catalogMaxPrice } = {}) => {
    setActiveCategory(category);
    setPriceRange(maxPrice);
    setSearchQuery('');
    window.location.hash = 'catalog-section';
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`store-app store-page-${page}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#1e293b' }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={category => browseCatalog({ category })}
        searchQuery={searchQuery}
        onSearchChange={query => { setSearchQuery(query); setActiveCategory('funebres'); setPriceRange(catalogMaxPrice); window.location.hash = 'catalog-section'; }}
      />

      {page === 'account' ? (
        <AccountSection />
      ) : (
        <HomePage
          onSelectProduct={setSelectedProduct}
          activeCategory={activeCategory}
          onSelectCategory={category => browseCatalog({ category })}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          catalogView={catalogView}
          onViewChange={setCatalogView}
          onAddToCart={(p) => handleAddToCart(p, 1, p.variants?.[0] || null)}
        />
      )}

      {/* Footer */}
      <Footer onSelectCategory={category => browseCatalog({ category })} />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNowFlow={handleBuyNowFlow}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={checkoutSummary.total}
        orderSummary={checkoutSummary}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {flowResponseData && (
        <FlowResponseModal
          paymentDetails={flowResponseData}
          onClose={() => setFlowResponseData(null)}
        />
      )}
    </div>
  );
}
