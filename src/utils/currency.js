// Mexican Currency Formatter Utility
export function formatPrice(amount, includeCode = true) {
  const val = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);

  return includeCode ? `${formatted} MXN` : formatted;
}

export function formatMXN(amount) {
  return formatPrice(amount, true);
}
