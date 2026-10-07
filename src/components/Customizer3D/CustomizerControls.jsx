import React, { useState } from 'react';
import {
  FIT_OPTIONS,
  STYLE_OPTIONS,
  LENGTH_OPTIONS,
  ACCESSORY_OPTIONS,
  FABRIC_GROUPS,
  SIZES,
  getModelFileName, matchVariantName,
  calculateCustomizerPrice
} from '../../data/customizerData';
import {
  Sparkles,
  Scissors,
  Check,
  Layers,
  HelpCircle,
  ShoppingBag,
  MessageCircle,
  Ruler,
  Info,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { MODEL_VARIANTS } from '../../data/modelVariants';
import { getAssetUrl } from '../../data/clientData';
import { formatPrice } from '../../utils/currency';
import './CustomizerControls.css';

export function CustomizerControls({
  fit,
  setFit,
  style,
  setStyle,
  length,
  setLength,
  withStraps,
  setWithStraps,
  withScarf,
  setWithScarf,
  selectedFabricId,
  setSelectedFabricId,
  selectedColorId,
  setSelectedColorId,
  size,
  setSize,
  customMeasurements,
  setCustomMeasurements,
  onAddToCart,
  onOpenIncompatibilityModal
}) {
  const [activeTab, setActiveTab] = useState('fit');
  const [availabilityNotice, setAvailabilityNotice] = useState('');
  const selectCut = (nextStyle, nextLength) => {
    const names = MODEL_VARIANTS[getModelFileName(fit, nextStyle, nextLength)] || [];
    if (!matchVariantName(selectedColorId, names)) {
      setSelectedFabricId('algodon'); setSelectedColorId('blanco');
      setAvailabilityNotice('La tela elegida no está disponible en este corte. Se seleccionó Algodón blanco.');
    } else setAvailabilityNotice('');
    setStyle(nextStyle); setLength(nextLength);
  };

  const availableVariants = MODEL_VARIANTS[getModelFileName(fit, style, length)] || [];
  const currentPrice = calculateCustomizerPrice({
    fit,
    style,
    length,
    withStraps,
    withScarf,
    fabricId: selectedFabricId,
    colorId: selectedColorId
  });

  // Find active fabric and color objects
  let activeFabricObj = null;
  let activeColorObj = null;
  for (const group of FABRIC_GROUPS) {
    for (const fab of group.fabrics) {
      if (fab.id === selectedFabricId) {
        activeFabricObj = fab;
        activeColorObj = fab.colors.find(c => c.id === selectedColorId) || fab.colors[0];
        break;
      }
    }
  }

  // Handle Fit selection
  const handleSelectFit = (newFit) => {
    setFit(newFit);
    // If switching to fit suelto and style is fruncido (pegado only), reset to regular
    if (newFit === 'suelto' && (style === 'fruncido' || style === 'asimetrico_fruncido')) {
      setStyle(style === 'asimetrico_fruncido' ? 'asimetrico' : 'regular');
    }
    // If switching to fit pegado and currently on a non-stretch fabric, auto-switch to algodon
    if (newFit === 'pegado') {
      const nonStretchGroup = FABRIC_GROUPS.find(g => !g.isStretch);
      const isCurrentlyNonStretch = nonStretchGroup?.fabrics.some(f => f.id === selectedFabricId);
      if (isCurrentlyNonStretch) {
        setSelectedFabricId('algodon');
        setSelectedColorId('blanco');
      }
    }
  };

  // Handle Scarf toggle with compatibility check
  const handleToggleScarf = () => {
    const nextScarfState = !withScarf;
    if (nextScarfState) {
      // Check if current fabric is incompatible (mezclilla, lentejuelas, bordado)
      if (activeFabricObj?.noScarf) {
        onOpenIncompatibilityModal(activeFabricObj.name);
        return;
      }
    }
    setWithScarf(nextScarfState);
  };

  // Handle Fabric selection with rules
  const handleSelectFabric = (fabric, group) => {
    if (fit === 'pegado' && !group.isStretch) {
      return; // Disabled
    }
    if (withScarf && fabric.noScarf) {
      return; // Disabled
    }
    setSelectedFabricId(fabric.id);
    setSelectedColorId(fabric.colors[0]?.id || 'blanco');
  };

  const tabs = [
    { id: 'fit', label: '1. Ajuste', icon: 'Sparkles' },
    { id: 'style', label: '2. Estilo', icon: 'Scissors' },
    { id: 'length', label: '3. Largo', icon: 'Layers' },
    { id: 'accessories', label: '4. Accesorios', icon: 'Sparkles' },
    { id: 'fabrics', label: '5. Tela & Color', icon: 'Layers' },
    { id: 'size', label: '6. Talla', icon: 'Ruler' }
  ];

  return (
    <div className="customizer-controls-panel">
      {/* Category Tabs Header */}
      <div className="customizer-tabs-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content Body */}
      <div className="customizer-tab-body">
        {availabilityNotice && <p role="status">{availabilityNotice}</p>}
        {/* TAB 1: FIT */}
        {activeTab === 'fit' && (
          <div className="tab-pane animate-fadeIn">


            <div className="options-grid-2">
              {FIT_OPTIONS.map((f) => {
                const isSelected = fit === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectFit(f.id)}
                  >
                    <div className="card-top">
                      <span className="card-badge">{f.badge}</span>
                      {isSelected && <span className="card-check"><Check size={14} /></span>}
                    </div>
                    <div className="card-title">{f.name}</div>


                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STYLE */}
        {activeTab === 'style' && (
          <div className="tab-pane animate-fadeIn">


            <div className="options-grid-2">
              {STYLE_OPTIONS.map((s) => {
                const isAllowed = s.allowedFits.includes(fit);
                const isSelected = style === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!isAllowed}
                    className={`option-card ${isSelected ? 'selected' : ''} ${!isAllowed ? 'disabled' : ''}`}
                    onClick={() => isAllowed && selectCut(s.id, length)}
                  >
                    <div className="card-top">
                      {!isAllowed ? (
                        <span className="card-badge disabled-badge">Requiere Fit Pegado</span>
                      ) : (
                        <span className="card-badge">Strapless</span>
                      )}
                      {isSelected && <span className="card-check"><Check size={14} /></span>}
                    </div>
                    <div className="card-title">{s.name}</div>

                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LENGTH */}
        {activeTab === 'length' && (
          <div className="tab-pane animate-fadeIn">


            <div className="options-grid-3">
              {LENGTH_OPTIONS.map((l) => {
                const isSelected = length === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => selectCut(style, l.id)}
                  >
                    <div className="card-top">
                      {isSelected && <span className="card-check"><Check size={14} /></span>}
                    </div>
                    <div className="card-title">{l.name}</div>

                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ACCESSORIES */}
        {activeTab === 'accessories' && (
          <div className="tab-pane animate-fadeIn">


            <div className="accessories-list">
              {/* Tirantes */}
              <div className={`accessory-item ${withStraps ? 'active' : ''}`}>
                <div className="accessory-info">
                  <div className="accessory-title">
                    <span>Tirantes</span>
                    <span className="accessory-price">+{formatPrice(120)}</span>
                  </div>

                </div>
                <button
                  type="button"
                  className={`toggle-accessory-btn ${withStraps ? 'active' : ''}`}
                  onClick={() => setWithStraps(!withStraps)}
                >
                  {withStraps ? 'Quitar' : 'Agregar'}
                </button>
              </div>

              {/* Bufanda */}
              <div className={`accessory-item ${withScarf ? 'active' : ''}`}>
                <div className="accessory-info">
                  <div className="accessory-title">
                    <span>Bufanda</span>
                    <span className="accessory-price">+{formatPrice(190)}</span>
                  </div>

                </div>
                <button
                  type="button"
                  className={`toggle-accessory-btn ${withScarf ? 'active' : ''}`}
                  onClick={handleToggleScarf}
                >
                  {withScarf ? 'Quitar' : 'Agregar'}
                </button>
              </div>
            </div>


          </div>
        )}

        {/* TAB 5: FABRICS & COLORS */}
        {activeTab === 'fabrics' && (
          <div className="tab-pane animate-fadeIn">


            {FABRIC_GROUPS.map((group) => {
              const isGroupDisabled = fit === 'pegado' && !group.isStretch;
              return (
                <div key={group.id} className={`fabric-group-section ${isGroupDisabled ? 'group-disabled' : ''}`}>
                  <div className="fabric-group-header">
                    <span className="fabric-group-title">{group.name}</span>
                    {isGroupDisabled && (
                      <span className="fabric-group-badge warning">
                        <ShieldAlert size={12} /> Requiere Fit Suelto
                      </span>
                    )}
                  </div>

                  <div className="fabrics-pill-list">
                    {group.fabrics.map((fabric) => {
                      const isFabSelected = selectedFabricId === fabric.id;
                      const isNoScarfBlocked = withScarf && fabric.noScarf;
                      const isDisabled = isGroupDisabled || isNoScarfBlocked;

                      return (
                        <div key={fabric.id} className="fabric-picker-block">
                          <button
                            type="button"
                            disabled={isDisabled}
                            className={`fabric-pill-btn ${isFabSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                            onClick={() => handleSelectFabric(fabric, group)}
                          >
                            <span>{fabric.name}</span>
                            {isNoScarfBlocked && (
                              <span className="incompatible-tag">No bufanda</span>
                            )}
                          </button>

                          {/* Color Swatches if this fabric is selected */}
                          {isFabSelected && !isDisabled && (
                            <div className="color-swatches-row animate-fadeIn">
                              {fabric.colors.map((c) => {
                                const isColorSelected = selectedColorId === c.id;
                                return (
                                  <button
                                    key={c.id}
                                    type="button"
                                    className={`swatch-btn ${isColorSelected ? 'active' : ''}`}
                                    style={{
                                      backgroundColor: c.hex,
                                      backgroundImage: c.pattern || c.sparkle || c.sheen ? `url("${getAssetUrl(c.swatch)}")` : undefined,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      borderColor: c.border || (isColorSelected ? '#4a1e1b' : 'rgba(0,0,0,0.15)')
                                    }}
                                    onClick={() => setSelectedColorId(c.id)}
                                    disabled={!matchVariantName(c.id, availableVariants)}
                                    title={matchVariantName(c.id, availableVariants) ? c.name : c.name + ' — no disponible en este corte'}
                                    aria-label={c.name}
                                    aria-pressed={isColorSelected}
                                  >
                                    {isColorSelected && (
                                      <Check
                                        size={12}
                                        color={['#ffffff', '#f8fafc', '#fdf4ff', '#fef08a', '#faf4d4'].includes(c.hex.toLowerCase()) ? '#4a1e1b' : '#ffffff'}
                                      />
                                    )}
                                  </button>
                                );
                              })}
                              <span className="active-color-name">
                                {activeColorObj?.name || selectedColorId}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 6: SIZE */}
        {activeTab === 'size' && (
          <div className="tab-pane animate-fadeIn">


            <div className="sizes-grid">
              {SIZES.map((s) => {
                const isSelected = size === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`size-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSize(s.id)}
                  >
                    <div className="size-name">{s.name}</div>
                    <div className="size-detail">Busto: {s.bust}</div>
                    <div className="size-detail">Cintura: {s.waist}</div>
                  </button>
                );
              })}
            </div>

            {size === 'custom' && (
              <div className="custom-measurements-inputs animate-fadeIn">
                <div className="input-group">
                  <label>Contorno de Busto (cm):</label>
                  <input
                    type="text"
                    placeholder="Ej. 86 cm"
                    value={customMeasurements?.bust || ''}
                    onChange={(e) => setCustomMeasurements({ ...customMeasurements, bust: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Contorno de Cintura (cm):</label>
                  <input
                    type="text"
                    placeholder="Ej. 65 cm"
                    value={customMeasurements?.waist || ''}
                    onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label>Notas adicionales de confección:</label>
                  <input
                    type="text"
                    placeholder="Ej. Altura o detalles especiales"
                    value={customMeasurements?.notes || ''}
                    onChange={(e) => setCustomMeasurements({ ...customMeasurements, notes: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary & Price Footer */}
      <div className="customizer-footer-bar">
        <div className="price-and-config-summary">
          <div className="config-line">
            <strong>Top Strapless</strong> • {fit === 'pegado' ? 'Pegado' : 'Suelto'} • {STYLE_OPTIONS.find(option => option.id === style)?.name} • {LENGTH_OPTIONS.find(option => option.id === length)?.name}
            {withStraps ? ' + Tirantes' : ''}
            {withScarf ? ' + Bufanda' : ''}
          </div>
          <div className="fabric-line">
            Tela: {activeFabricObj?.name || selectedFabricId} ({activeColorObj?.name || selectedColorId}) • Talla: {size}
          </div>
          <div className="price-display">
            <span className="price-label">Total Confección:</span>
            <span className="price-value">{formatPrice(currentPrice)}</span>
          </div>
        </div>

        <div className="customizer-cta-group">
          <button
            type="button"
            className="add-custom-to-cart-btn"
            onClick={() => {
              onAddToCart({
                id: `custom-top-${Date.now()}`,
                name: `Top Strapless Personalizado (${fit} - ${style})`,
                price: currentPrice,
                isCustom3D: true,
                image: getAssetUrl('assets/patterns/l1.png'),
                customConfig: {
                  fit,
                  style,
                  length,
                  withStraps,
                  withScarf,
                  fabric: activeFabricObj?.name || selectedFabricId,
                  color: activeColorObj?.name || selectedColorId,
                  size,
                  customMeasurements
                }
              });
            }}
          >
            <ShoppingBag size={18} />
            Añadir a mi Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
