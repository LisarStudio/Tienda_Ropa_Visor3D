import React from 'react';
import { MessageCircle } from 'lucide-react';
import { clientData } from '../data/clientData';
import './WhatsAppWidget.css';

export function WhatsAppWidget() {
  const brand = clientData.brand;
  return (
    <a
      href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola Daniela Atelier, me gustaría consultar por una prenda a medida.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="¿Necesitas Asesoría en Tallas?"
      title="¿Necesitas Asesoría en Tallas?"
    >
      <span className="whatsapp-widget-icon"><MessageCircle size={24} /></span>
      <span className="whatsapp-widget-label">¿Asesoría en Tallas?</span>
    </a>
  );
}
