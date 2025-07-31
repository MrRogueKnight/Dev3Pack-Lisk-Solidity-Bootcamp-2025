import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, onRemoveFromCart, onUpdateQuantity, onConfirmOrder, totalPrice }) => {
  const handleConfirmOrder = () => {
    if (cart.length > 0) {
      onConfirmOrder();
    }
  };

  return (
    <aside className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="confirm-order-btn"
              onClick={handleConfirmOrder}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleConfirmOrder();
                }
              }}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart; 