# Product List with Cart - React Application

A modern, responsive React application built with Vite that allows users to browse a curated list of dessert products and manage a shopping cart in real time. Designed for educational purposes as part of a React development course, this project demonstrates best practices in React component structure, state management with hooks, and responsive design. Users can add or remove items from the cart, adjust quantities, and experience a clean, mobile-friendly UI with smooth interactions. The app is an ideal starting point for learning about e-commerce interfaces and modern frontend development workflows.

## Features

- **Product Display**: Grid layout showcasing dessert products with images, names, categories, and prices
- **Shopping Cart**: Fully functional cart with add/remove items, quantity controls, and total calculation
- **Responsive Design**: Mobile-first approach with responsive layouts for all screen sizes
- **Modern UI**: Clean, professional design with smooth animations and hover effects
- **Carbon Neutral Delivery**: Environmental consciousness messaging

## Technologies Used

- **React 18**: Modern React with hooks for state management
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with CSS variables and modern layout techniques
- **JavaScript ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
cd product-list-cart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── ProductList.jsx     # Main product grid component
│   ├── ProductCard.jsx     # Individual product card
│   ├── Cart.jsx           # Shopping cart component
│   ├── CartItem.jsx       # Individual cart item
│   └── *.css             # Component-specific styles
├── data.json             # Product data
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## Features in Detail

### Product Management
- Dynamic product loading from JSON data
- Product images with fallback placeholders
- Category and pricing information
- Add to cart functionality with visual feedback

### Cart Functionality
- Add items to cart with quantity tracking
- Remove items from cart
- Update item quantities with +/- controls
- Real-time total calculation
- Empty cart state with friendly messaging
- Order confirmation button

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Sticky cart sidebar on desktop
- Optimized touch targets for mobile

## License

This project is created for educational purposes as part of a React development course.
