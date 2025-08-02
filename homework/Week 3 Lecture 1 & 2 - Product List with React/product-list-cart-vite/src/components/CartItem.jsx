import React from 'react'
import './CartItem.css'

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    onUpdateQuantity(item.id, item.quantity - 1)
  }

  const handleRemove = () => {
    onRemove(item.id)
  }

  return (
    <div className="cart-item">
      <div className="item-image">
        <img 
          src={item.image} 
          alt={item.name}
          className="cart-item-image"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/60x60/f5f5f5/999999?text=${encodeURIComponent(item.name.split(' ')[0])}`
          }}
        />
      </div>
      <div className="item-info">
        <h4 className="item-name">{item.name}</h4>
        <div className="item-details">
          <span className="item-quantity">{item.quantity}x</span>
          <span className="item-price">@ ${item.price.toFixed(2)}</span>
          <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <div className="item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn decrement"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn increment"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          className="remove-btn"
          onClick={handleRemove}
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default CartItem
