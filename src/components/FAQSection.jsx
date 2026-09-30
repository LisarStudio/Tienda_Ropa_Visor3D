import React, { useState } from 'react';
import { Ruler, Sparkles, ChevronDown, ChevronUp, Scissors, HeartHandshake, Truck, ShieldCheck } from 'lucide-react';
import './FAQSection.css';

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: '¿Cómo funciona la personalización 3D en tiempo real?',
      a: 'Nuestro atelier cuenta con un configurador 3D interactivo oficial. Puedes rotar el modelo en 360°, elegir el ajuste (Pegado o Suelto), la silueta (Regular, Asimétrico, Fruncido, Asimétrico Fruncido), el largo, agregar tirantes o bufanda skinny y previsualizar más de 40 combinaciones de telas y colores al instante antes de comprar.'
    },
    {
      q: '¿Qué métodos de pago aceptan en México?',
      a: 'Aceptamos los métodos más seguros y populares de México: Mercado Pago (tarjetas de crédito/débito y hasta 6 Meses Sin Intereses), pago en efectivo en cualquier tienda OXXO de la República (OXXO Pay), transferencias interbancarias SPEI instantáneas (CLABE), PayPal y coordinación directa vía WhatsApp.'
    },
    {
      q: '¿Qué diferencia hay entre telas con stretch y sin stretch?',
      a: 'Las telas con stretch (Algodón, Mesh, Encaje, Lentejuelas, Brillos) contienen elastano para amoldarse al cuerpo, por lo que son las únicas compatibles con nuestro Fit Pegado. Las telas sin stretch (Polka dots, Cuadros vichy, Bordados, Mezclilla, Satín) tienen caída fluida y estructurada, ideales para el Fit Suelto.'
    },
    {
      q: '¿Por qué la bufanda no está disponible en mezclilla, lentejuelas ni bordado?',
      a: 'Debido a la densidad de la mezclilla, la rigidez de las lentejuelas y el relieve del bordado, la bufanda skinny de alta costura requiere tejidos suaves y maleables (algodón, satín, mesh, rib) para lograr una caída estética y cómoda alrededor del cuello.'
    },
    {
      q: '¿Puedo encargar una prenda con mis medidas exactas?',
      a: '¡Por supuesto! En el selector de tallas puedes elegir la opción "A Medida" e ingresar tu contorno de busto y cintura en centímetros. Cada pieza será cortada y confeccionada a mano exclusivamente para ti en nuestro taller.'
    },
    {
      q: '¿Cuáles son los tiempos de confección y envío en México?',
      a: 'Las prendas de catálogo estándar se despachan en 24 a 48 horas hábiles. Las prendas personalizadas en 3D requieren de 3 a 5 días hábiles de confección artesanal. Realizamos envíos express asegurados a toda la República Mexicana por FedEx, DHL y Estafeta (con envío gratis en compras a partir de $1,499 MXN).'
    }
  ];

  return (
    <section id="faq" className="brand-faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="faq-section-header">
          <span className="faq-badge">ATELIER & GUÍA</span>
          <h2 className="faq-title">Guía de Tallas & Preguntas Frecuentes</h2>
          <p className="faq-subtitle">
            Todo lo que necesitas saber sobre nuestra confección artesanal, medidas y cuidado de prendas.
          </p>
        </div>

        {/* 2-Column Grid: Left Size Guide, Right FAQs Accordion */}
        <div className="faq-grid-layout">
          {/* Left Column: Size Guide Table */}
          <div className="size-guide-card">
            <div className="size-card-header">
              <div className="size-icon-circle">
                <Ruler size={22} />
              </div>
              <div>
                <h3 className="size-card-title">Tabla de Medidas Corporales</h3>
                <p className="size-card-sub">Medidas en centímetros (cm)</p>
              </div>
            </div>

            <div className="size-table-responsive">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Talla</th>
                    <th>Busto</th>
                    <th>Cintura</th>
                    <th>Equivalencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS</strong></td>
                    <td>78 - 82 cm</td>
                    <td>58 - 62 cm</td>
                    <td>32 - 34</td>
                  </tr>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>83 - 87 cm</td>
                    <td>63 - 67 cm</td>
                    <td>36</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>88 - 92 cm</td>
                    <td>68 - 72 cm</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>93 - 97 cm</td>
                    <td>73 - 77 cm</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>98 - 103 cm</td>
                    <td>78 - 83 cm</td>
                    <td>42</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="measuring-tips-box">
              <div className="tip-row">
                <Scissors size={16} className="tip-icon" />
                <div>
                  <strong>¿Cómo medirte?</strong>
                  <p>Mide el contorno de tu busto por la parte más prominente y la cintura en la parte más estrecha sobre el ombligo con la cinta métrica relajada.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="faq-accordion-card">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item-row ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane animate-fadeIn">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
