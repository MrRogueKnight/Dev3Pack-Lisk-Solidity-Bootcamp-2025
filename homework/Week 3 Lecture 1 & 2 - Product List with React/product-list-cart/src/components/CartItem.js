import React from 'react';

const CartItem = ({ item, onRemoveFromCart, onUpdateQuantity }) => {
  const handleIncreaseQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    onUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={handleDecreaseQuantity}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDecreaseQuantity();
              }
            }}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={handleIncreaseQuantity}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleIncreaseQuantity();
              }
            }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          className="remove-btn"
          onClick={handleRemove}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRemove();
            }
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem; 