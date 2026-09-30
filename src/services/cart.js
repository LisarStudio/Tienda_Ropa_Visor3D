export const SHIPPING_PER_ORDER = 149; // $149 MXN Envío estándar a todo México
export const FREE_SHIPPING_THRESHOLD = 1499; // Envío gratis a partir de $1,499 MXN

export function calculateOrderTotals(items = [], discountPercent = 0) {
  if (!Array.isArray(items)) {
    return { subtotal: 0, discountAmount: 0, shipping: 0, total: 0 };
  }

  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    const mod = Number(item.selectedVariant?.priceModifier) || 0;
    return sum + (price + mod) * qty;
  }, 0);

  const discountAmount = Math.round(subtotal * Math.min(100, Math.max(0, discountPercent)) / 100);
  const shipping = items.length > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PER_ORDER) : 0;
  return {
    subtotal,
    discountAmount,
    shipping,
    total: Math.max(0, subtotal - discountAmount) + shipping
  };
}

export function restoreCart(savedItems, products = []) {
  if (!Array.isArray(savedItems)) return [];
  return savedItems.filter(item => item && (item.price || item.name));
}
