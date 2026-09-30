import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { Header } from './components/Header';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlowResponseModal } from './components/FlowResponseModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { clientData } from './data/clientData';
import { calculateOrderTotals, restoreCart } from './services/cart';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSummary, setCheckoutSummary] = useState(() => calculateOrderTotals([]));
  const [flowResponseData, setFlowResponseData] = useState(null);

  // Cart Items State with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('daniela_atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daniela_atelier_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product, quantity = 1, variant = null) => {
    setCartItems(prev => {
      // If custom 3D item, append as unique configured item
      if (product.isCustom3D) {
        return [...prev, { ...product, quantity }];
      }

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
    setCartItems(prev => [...prev, ...orderItems]);
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

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="store-app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#2c1210' }}>
      {/* Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Home Content */}
      <HomePage
        onSelectProduct={setSelectedProduct}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} />

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
