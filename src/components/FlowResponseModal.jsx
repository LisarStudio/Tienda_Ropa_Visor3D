import React from 'react';
import { CheckCircle2, ShieldCheck, Copy, Store, Building, CreditCard, MessageCircle, X } from 'lucide-react';
import { clientData } from '../data/clientData';
import { formatPrice } from '../utils/currency';

export function FlowResponseModal({ paymentDetails, onClose }) {
  if (!paymentDetails) return null;

  const brand = clientData.brand;
  const isOxxo = paymentDetails.paymentMethod === 'oxxo';
  const isSpei = paymentDetails.paymentMethod === 'spei';
  const isMercadoPago = paymentDetails.paymentMethod === 'mercadopago';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('¡Copiado al portapapeles!');
  };

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div
        className="checkout-modal-card"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '2rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#ecfdf5',
            border: '2px solid #059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <CheckCircle2 size={38} color="#059669" />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4a1e1b', margin: '0 0 0.4rem 0', fontFamily: 'var(--font-serif)' }}>
            {isOxxo ? '¡Ficha de Pago OXXO Pay Generada!' : isSpei ? '¡Orden Registrada para Pago SPEI!' : '¡Pedido Confirmado con Éxito!'}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            Gracias por comprar en <strong>{brand.name}</strong>. Tu orden está siendo preparada artesanalmente.
          </p>
        </div>

        {/* Specific Payment Instructions for Mexico */}
        {isOxxo && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Store size={20} />
              <span>Instrucciones para pagar en OXXO</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#78350f', margin: '0 0 0.8rem 0' }}>
              Acude a cualquier tienda OXXO de la República Mexicana y dile al cajero que realizarás un pago de servicio con la siguiente referencia:
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px dashed #d97706', padding: '0.75rem 1rem', borderRadius: '8px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Referencia OXXO Pay:</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '2px', color: '#1f2937', fontFamily: 'monospace' }}>
                  9324 {Math.floor(1000 + Math.random() * 9000)} {Math.floor(1000 + Math.random() * 9000)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('9324884920194821')}
                style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#92400e', fontWeight: 600 }}
              >
                <Copy size={14} /> Copiar
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#92400e', margin: '0.6rem 0 0 0' }}>
              * El pago se acreditará de inmediato. La comisión del cajero OXXO es de $15 MXN.
            </p>
          </div>
        )}

        {isSpei && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Building size={20} />
              <span>Datos de Transferencia Bancaria SPEI</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#166534' }}>
              <div><strong>Banco Destino:</strong> BBVA México / STP</div>
              <div><strong>Beneficiario:</strong> Ninna Wear</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px dashed #22c55e', padding: '0.6rem 0.8rem', borderRadius: '6px', marginTop: '0.3rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#15803d' }}>CLABE Interbancaria (18 dígitos):</span>
                  <div style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem', color: '#0f172a' }}>646180112400982341</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('646180112400982341')}
                  style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '0.3rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', color: '#166534', fontWeight: 600 }}
                >
                  <Copy size={12} /> Copiar CLABE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div style={{
          background: '#faf4d433',
          border: '1px solid #eedec0',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.88rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ebd8b7', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#78350f' }}>Número de Orden:</span>
            <strong style={{ color: '#4a1e1b', letterSpacing: '0.5px' }}>{paymentDetails.orderId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: '#6b7280' }}>Cliente:</span>
            <span style={{ fontWeight: 600, color: '#1f2937' }}>{paymentDetails.customer?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: '#6b7280' }}>Destino en México:</span>
            <span style={{ color: '#1f2937' }}>{paymentDetails.customer?.city}, {paymentDetails.customer?.state}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: '#6b7280' }}>Método:</span>
            <span style={{ fontWeight: 600, color: '#4a1e1b', textTransform: 'capitalize' }}>{paymentDetails.paymentMethod}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ebd8b7', paddingTop: '0.6rem', marginTop: '0.4rem', fontSize: '1.05rem', fontWeight: 800, color: '#4a1e1b' }}>
            <span>Total:</span>
            <span>{formatPrice(paymentDetails.totalAmount)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.85rem',
              borderRadius: '9999px',
              border: 'none',
              background: '#4a1e1b',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(74, 30, 27, 0.2)'
            }}
          >
            Seguir Explorando la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}
