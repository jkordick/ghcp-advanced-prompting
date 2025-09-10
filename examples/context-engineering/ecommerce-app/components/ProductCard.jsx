import React from 'react';
import { formatPrice, getDiscountedPrice } from '../utils/priceUtils';

/**
 * Product card component for displaying product information
 * @param {Object} product - Product object with id, name, price, image, etc.
 */
const ProductCard = ({ product, onAddToCart, showDiscount = false }) => {
  const { id, name, price, image, originalPrice, inStock } = product;

  const handleAddToCart = () => {
    if (inStock) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      
      {/* Try adding a price formatting function here */}
      {/* Notice how Copilot suggests currency formatting based on existing imports */}
      
    </div>
  );
};

export default ProductCard;