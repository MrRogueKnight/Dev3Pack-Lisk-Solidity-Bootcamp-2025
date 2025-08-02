import React from 'react'
import './ProductCard.css'

const ProductCard = ({ product, onAddToCart, cartItems }) => {
  const cartItem = cartItems.find(item => item.id === product.id)
  const isInCart = !!cartItem

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    onAddToCart(product)
  }

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            // Fallback to a placeholder if image doesn't load
            e.target.src = `https://via.placeholder.com/300x200/f5f5f5/999999?text=${encodeURIComponent(product.name)}`
          }}
        />
      </div>
      <button 
        className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
        onClick={handleAddToCart}
      >
        <span className="cart-icon">🛒</span>
        <span>Add to Cart</span>
      </button>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard
