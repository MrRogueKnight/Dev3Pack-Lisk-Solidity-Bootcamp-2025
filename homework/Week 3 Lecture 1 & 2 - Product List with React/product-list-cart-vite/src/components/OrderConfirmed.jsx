import React from 'react';
import './OrderConfirmed.css';

const OrderConfirmed = ({ onBackToShop }) => (
  <div className="order-confirmed-outer">
    <div className="order-confirmed-screen">
      <div className="order-confirmed-icon">🎉</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button className="back-to-shop-btn" onClick={onBackToShop}>
        Back to Shop
      </button>
    </div>
  </div>
);

export default OrderConfirmed;
