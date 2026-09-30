import React from 'react';
import { AlertCircle, X, Check, Sparkles } from 'lucide-react';
import './IncompatibilityModal.css';

export function IncompatibilityModal({
  isOpen,
  title = 'Incompatibilidad de opciones',
  message,
  fabricName,
  onKeepFabric,
  onChangeFabricAndAddScarf,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="incompatibility-modal-overlay">
      <div className="incompatibility-modal-card">
        <button type="button" className="incompatibility-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="incompatibility-icon-wrapper">
          <AlertCircle size={32} />
        </div>

        <h3 className="incompatibility-title">{title}</h3>
        
        <p className="incompatibility-message">
          {message || (
            <>
              La tela <strong>{fabricName}</strong> no es compatible con la opción de <strong>bufanda</strong> debido a las características de confección del tejido.
            </>
          )}
        </p>

        <div className="incompatibility-actions">
          <button
            type="button"
            className="incompatibility-btn secondary"
            onClick={onKeepFabric}
          >
            Mantener tela (Sin bufanda)
          </button>
          <button
            type="button"
            className="incompatibility-btn primary"
            onClick={onChangeFabricAndAddScarf}
          >
            <Sparkles size={16} />
            Cambiar tela y agregar bufanda
          </button>
        </div>
      </div>
    </div>
  );
}
