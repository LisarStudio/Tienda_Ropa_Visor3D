import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Lock, Building, Mail, Phone, User, MapPin, Store, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { clientData } from '../data/clientData';
import { formatPrice } from '../utils/currency';
import './CheckoutModal.css';

const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'Ciudad de México (CDMX)', 'Coahuila', 'Colima', 'Durango', 'Estado de México (Edomex)', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco',
  'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, orderSummary, onPaymentSuccess }) {
  const brand = clientData.brand;
  const [paymentMethod, setPaymentMethod] = useState('mercadopago');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    colonia: '',
    city: '',
    state: 'Ciudad de México (CDMX)',
    zipCode: '',
    references: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitCheckout = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.phone || !formData.street || !formData.colonia || !formData.city || !formData.zipCode) {
      setErrorMsg('Por favor completa todos los campos requeridos para el envío en México.');
      return;
    }

    setIsProcessing(true);

    const orderId = 'DA-MX-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

    setTimeout(() => {
      setIsProcessing(false);

      if (paymentMethod === 'whatsapp') {
        const fullAddress = `${formData.street} #${formData.exteriorNumber}${formData.interiorNumber ? ' Int. ' + formData.interiorNumber : ''}, Col. ${formData.colonia}, CP ${formData.zipCode}, ${formData.city}, ${formData.state}`;
        const itemsList = cartItems.map(item => {
          if (item.isCustom3D) {
            return `• ${item.quantity}x Top Strapless 3D (${item.customDetails?.fitName}, ${item.customDetails?.styleName}, ${item.customDetails?.lengthName}, Tela: ${item.customDetails?.fabricName} - ${item.customDetails?.colorName}) - ${formatPrice(item.price * item.quantity)}`;
          }
          return `• ${item.quantity}x ${item.name} (${item.selectedSize || 'Estándar'}) - ${formatPrice(item.price * item.quantity)}`;
        }).join('\n');

        const text = `🌸 *NUEVO PEDIDO DANIELA ATELIER MÉXICO*\n\n` +
          `*Orden:* #${orderId}\n` +
          `*Cliente:* ${formData.name}\n` +
          `*Teléfono:* ${formData.phone}\n` +
          `*Email:* ${formData.email}\n` +
          `*Dirección de Envío:* ${fullAddress}\n` +
          `*Referencias:* ${formData.references || 'Ninguna'}\n\n` +
          `*Prendas Solicitadas:*\n${itemsList}\n\n` +
          `*Subtotal:* ${formatPrice(orderSummary?.subtotal || totalAmount)}\n` +
          `*Envío:* ${orderSummary?.shipping === 0 ? '¡GRATIS!' : formatPrice(orderSummary?.shipping || 149)}\n` +
          `*TOTAL A PAGAR:* ${formatPrice(totalAmount)}\n` +
          `*Método de Pago:* ${paymentMethod.toUpperCase()}`;

        const waUrl = `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
      }

      onPaymentSuccess({
        orderId,
        orderDate,
        paymentMethod,
        customer: formData,
        totalAmount,
        orderSummary,
        cartItems
      });
    }, 900);
  };

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-title">
            <ShieldCheck size={24} className="icon-shield" />
            <div>
              <h3>Finalizar Compra • Daniela Atelier México</h3>
              <p>Envío seguro a todo México con FedEx, DHL y Estafeta</p>
            </div>
          </div>
          <button type="button" className="checkout-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="checkout-error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form className="checkout-modal-body" onSubmit={handleSubmitCheckout}>
          {/* Left: Customer & Delivery Information */}
          <div className="checkout-section-box">
            <h4 className="section-title">
              <User size={18} />
              1. Datos de Contacto y Envío en México
            </h4>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Nombre y Apellidos *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ej. Daniela González"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Correo Electrónico *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="daniela@ejemplo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Teléfono Celular (10 dígitos) *</label>
                <div className="phone-input-wrap">
                  <span className="phone-flag">🇲🇽 +52</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="55 1234 5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Código Postal (CP) *</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  maxLength={5}
                  placeholder="06700"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group span-2">
                <label>Calle *</label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="Ej. Av. Álvaro Obregón"
                  value={formData.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Núm. Ext. *</label>
                <input
                  type="text"
                  name="exteriorNumber"
                  required
                  placeholder="150"
                  value={formData.exteriorNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>Núm. Int. (Opcional)</label>
                <input
                  type="text"
                  name="interiorNumber"
                  placeholder="Depto 4B"
                  value={formData.interiorNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Colonia *</label>
                <input
                  type="text"
                  name="colonia"
                  required
                  placeholder="Roma Norte"
                  value={formData.colonia}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Ciudad / Alcaldía *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Cuauhtémoc"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Estado de la República *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  {MEXICAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Referencias de Entrega</label>
                <input
                  type="text"
                  name="references"
                  placeholder="Entre calle X y calle Y, portón café"
                  value={formData.references}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Middle: Payment Methods in Mexico */}
          <div className="checkout-section-box">
            <h4 className="section-title">
              <CreditCard size={18} />
              2. Método de Pago en México
            </h4>

            <div className="payment-options-grid">
              {/* Mercado Pago */}
              <label className={`payment-method-card ${paymentMethod === 'mercadopago' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mercadopago"
                  checked={paymentMethod === 'mercadopago'}
                  onChange={() => setPaymentMethod('mercadopago')}
                />
                <div className="method-info">
                  <div className="method-header">
                    <strong>Mercado Pago México</strong>
                    <span className="method-pill popular">Más Popular</span>
                  </div>
                  <p>Tarjetas de Crédito y Débito (Visa, Mastercard, AMEX) con hasta 6 Meses Sin Intereses.</p>
                </div>
              </label>

              {/* OXXO Pay */}
              <label className={`payment-method-card ${paymentMethod === 'oxxo' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="oxxo"
                  checked={paymentMethod === 'oxxo'}
                  onChange={() => setPaymentMethod('oxxo')}
                />
                <div className="method-info">
                  <div className="method-header">
                    <strong>OXXO Pay</strong>
                    <span className="method-pill">Efectivo</span>
                  </div>
                  <p>Paga en efectivo en cualquiera de las más de 20,000 tiendas OXXO de México.</p>
                </div>
              </label>

              {/* SPEI */}
              <label className={`payment-method-card ${paymentMethod === 'spei' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="spei"
                  checked={paymentMethod === 'spei'}
                  onChange={() => setPaymentMethod('spei')}
                />
                <div className="method-info">
                  <div className="method-header">
                    <strong>Transferencia SPEI</strong>
                    <span className="method-pill">Instantáneo</span>
                  </div>
                  <p>Transferencia bancaria interbancaria (CLABE 18 dígitos) sin comisiones extra.</p>
                </div>
              </label>

              {/* WhatsApp Asesora */}
              <label className={`payment-method-card ${paymentMethod === 'whatsapp' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="whatsapp"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={() => setPaymentMethod('whatsapp')}
                />
                <div className="method-info">
                  <div className="method-header">
                    <strong>WhatsApp Directo con Taller</strong>
                    <span className="method-pill personal">Atención Personal</span>
                  </div>
                  <p>Finaliza y coordina medidas con nuestra asesora en Ciudad de México vía WhatsApp.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="checkout-summary-footer">
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} prendas):</span>
                <span>{formatPrice(orderSummary?.subtotal || totalAmount)}</span>
              </div>
              <div className="summary-row">
                <span>Envío express a México:</span>
                <span>{orderSummary?.shipping === 0 ? <strong className="free-shipping-text">¡GRATIS!</strong> : formatPrice(orderSummary?.shipping || 149)}</span>
              </div>
              {orderSummary?.discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Descuento aplicado:</span>
                  <span>-{formatPrice(orderSummary.discountAmount)}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <strong>Total a Pagar:</strong>
                <strong className="total-amount-display">{formatPrice(totalAmount)}</strong>
              </div>
            </div>

            <div className="checkout-action-row">
              <button
                type="submit"
                className="checkout-submit-button"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="btn-loading-content">
                    <span className="spinner-mini"></span> Procesando Orden...
                  </span>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Confirmar y Pagar {formatPrice(totalAmount)}</span>
                  </>
                )}
              </button>
            </div>

            <div className="security-badges-row">
              <span>🔒 Pago 100% Cifrado SSL de 256 bits</span>
              <span>🇲🇽 Garantía de Ajuste y Confección Mexicana</span>
              <span>📦 Envío Asegurado por FedEx / DHL</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
