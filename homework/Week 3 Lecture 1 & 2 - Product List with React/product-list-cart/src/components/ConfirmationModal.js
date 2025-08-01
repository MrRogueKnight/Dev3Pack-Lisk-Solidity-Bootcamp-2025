import React, { useEffect } from 'react';

const ConfirmationModal = ({ onClose, onStartNewOrder, totalPrice }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title">Order Confirmed!</h2>
        <p>Thank you for your order!</p>
        <p>Total amount: <strong>${totalPrice.toFixed(2)}</strong></p>
        <p>Your order has been successfully placed.</p>
        
        <div className="modal-actions">
          <button 
            className="start-new-order-btn"
            onClick={onStartNewOrder}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onStartNewOrder();
              }
            }}
          >
            Start New Order
          </button>
          <button 
            className="close-modal-btn"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClose();
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 