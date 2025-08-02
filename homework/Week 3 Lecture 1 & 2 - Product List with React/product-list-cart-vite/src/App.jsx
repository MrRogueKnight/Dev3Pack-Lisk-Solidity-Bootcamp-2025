import React, { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import OrderConfirmed from './components/OrderConfirmed'
import './App.css'
import productsData from './data.json'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [showOrderConfirmed, setShowOrderConfirmed] = useState(false)

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowOrderConfirmed(true);
    setCartItems([]);
  }

  const handleBackToShop = () => {
    setShowOrderConfirmed(false);
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Desserts</h1>
        <div className="main-content">
          {showOrderConfirmed ? (
            <OrderConfirmed onBackToShop={handleBackToShop} />
          ) : (
            <>
              <ProductList 
                products={productsData} 
                onAddToCart={addToCart}
                cartItems={cartItems}
              />
              <Cart 
                items={cartItems}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateQuantity}
                totalPrice={getTotalPrice()}
                totalItems={getTotalItems()}
                onConfirmOrder={handleConfirmOrder}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
