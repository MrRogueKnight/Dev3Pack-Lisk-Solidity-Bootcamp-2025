import React from 'react'
import CartItem from './CartItem'
import './Cart.css'

const Cart = ({ items, onRemoveItem, onUpdateQuantity, totalPrice, totalItems, onConfirmOrder }) => {
  const isEmpty = items.length === 0

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart ({totalItems})</h2>
      
      {isEmpty ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🍰</div>
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          
          <div className="cart-total">
            <div className="total-row">
              <span>Order Total</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="carbon-neutral">
            <span className="tree-icon">🌳</span>
            <span>This is a <strong>carbon-neutral</strong> delivery</span>
          </div>

          <button className="confirm-order-btn" onClick={onConfirmOrder}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
