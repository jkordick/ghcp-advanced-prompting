/**
 * Price utility functions for the ecommerce application
 */

/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Calculate discounted price
 * @param {number} originalPrice - Original price
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} Discounted price
 */
export const getDiscountedPrice = (originalPrice, discountPercent) => {
  const discount = originalPrice * (discountPercent / 100);
  return originalPrice - discount;
};

/**
 * Calculate tax amount
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate (0-1)
 * @returns {number} Tax amount
 */
export const calculateTax = (price, taxRate) => {
  return price * taxRate;
};