import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Tag, CreditCard, Sparkles, MessageCircle } from 'lucide-react';
import { calculateOrderTotals } from '../services/cart';
import { clientData, getAssetUrl } from '../data/clientData';
import './CartDrawer.css';

import { formatPrice } from '../utils/currency';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const summary = calculateOrderTotals(cartItems, discountPercent);
  const { subtotal, discountAmount, shipping, total } = summary;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'DANIELA10' || couponCode.toUpperCase() === 'ATELIER10' || couponCode.toUpperCase() === 'MEXICO10') {
      setDiscountPercent(10);
      setCouponMessage('¡Cupón 10% Descuento Aplicado!');
    } else {
      setCouponMessage('Cupón no válido (Prueba: MEXICO10)');
    }
  };

  const generateWhatsAppOrderText = () => {
    let text = `¡Hola Daniela Atelier México! Me gustaría encargar las siguientes prendas de mi carrito:\n\n`;
    cartItems.forEach((item, i) => {
      text += `${i + 1}. *${item.name}* (Cant: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
      if (item.customConfig) {
        const c = item.customConfig;
        text += `   • Fit: ${c.fit} | Estilo: ${c.style} | Largo: ${c.length}\n`;
        text += `   • Tela: ${c.fabric} | Color: ${c.color}\n`;
        if (c.withStraps) text += `   • Con Tirantes a tono\n`;
        if (c.withScarf) text += `   • Con Bufanda Skinny a juego\n`;
        text += `   • Talla: ${c.size}\n`;
        if (c.customMeasurements?.bust) {
          text += `   • Medidas: Busto ${c.customMeasurements.bust}, Cintura ${c.customMeasurements.waist}\n`;
        }
      } else if (item.selectedVariant) {
        text += `   • Talla/Opción: ${item.selectedVariant.name}\n`;
      }
      text += `\n`;
    });
    text += `*Total estimado:* ${formatPrice(total)}\n¿Me podrían confirmar disponibilidad y tiempos de confección en México? ¡Muchas gracias!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-label="Carrito de compras" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div className="cart-drawer-card slide-in-right" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="drawer-header-title-box">
            <ShoppingBag size={22} className="drawer-bag-icon" />
            <div>
              <h3>Bolsa de Compras</h3>
              <p>{cartItems.length} {cartItems.length === 1 ? 'prenda' : 'prendas'} en total</p>
            </div>
          </div>
          <button aria-label="Cerrar carrito" onClick={onClose} className="drawer-close-btn">
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-drawer-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={52} className="empty-cart-icon" />
              <h4>Tu bolsa está vacía</h4>
              <p>Explora nuestro catálogo de autor o diseña tu top en el taller 3D.</p>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const itemPrice = item.price;
              const isCustom = item.isCustom3D;
              return (
                <div key={`${item.id}-${idx}`} className="cart-item-row">
                  <img
                    src={item.image || getAssetUrl('assets/patterns/l1.png')}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-title-row">
                      <h4>{item.name}</h4>
                      {isCustom && (
                        <span className="cart-custom-badge">
                          <Sparkles size={11} /> 3D Custom
                        </span>
                      )}
                    </div>

                    {/* Breakdown for custom 3D orders */}
                    {item.customConfig ? (
                      <div className="cart-custom-specs">
                        <span>{item.customConfig.fabric} ({item.customConfig.color})</span>
                        <span>{item.customConfig.fit} • {item.customConfig.style} • {item.customConfig.length}</span>
                        {item.customConfig.withStraps && <span>+ Tirantes a tono</span>}
                        {item.customConfig.withScarf && <span>+ Bufanda skinny</span>}
                        <span>Talla: {item.customConfig.size}</span>
                      </div>
                    ) : item.selectedVariant ? (
                      <span className="cart-item-variant">{item.selectedVariant.name}</span>
                    ) : null}

                    <span className="cart-item-price">
                      {formatCLP(itemPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(idx)}
                      className="cart-remove-btn"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="cart-stepper">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
              <div className="coupon-input-wrap">
                <Tag size={15} className="coupon-icon" />
                <input
                  type="text"
                  placeholder="Cupón (Ej: DANIELA10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
              </div>
              <button type="submit" className="coupon-apply-btn">
                Aplicar
              </button>
            </form>
            {couponMessage && (
              <span className={`coupon-msg ${discountPercent > 0 ? 'success' : 'error'}`}>
                {couponMessage}
              </span>
            )}

            {/* Calculations Breakdown */}
            <div className="cart-totals-breakdown">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="total-row">
                <span>Envío express México:</span>
                <span>{shipping === 0 ? <strong style={{ color: '#059669' }}>¡GRATIS!</strong> : formatPrice(shipping)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="total-row discount">
                  <span>Descuento ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Total a Pagar:</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="cart-drawer-cta-stack">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout(summary);
                }}
                className="cart-checkout-btn primary"
              >
                <CreditCard size={18} />
                <span>Pagar Pedido ({formatPrice(total)})</span>
              </button>

              <a
                href={`https://wa.me/${clientData.brand.whatsapp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppOrderText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cart-checkout-btn whatsapp"
              >
                <MessageCircle size={18} />
                <span>Pedir por WhatsApp Directo</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
