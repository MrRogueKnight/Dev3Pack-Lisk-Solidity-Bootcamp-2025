# Product List with Cart - React Application

A modern, responsive React application that demonstrates a product listing with shopping cart functionality. Built as part of the Lisk Solidity Bootcamp 2025 Week 3 assignment.

## Features

### Core Functionality

- **Product Display**: Dynamic product grid with images, descriptions, and pricing
- **Shopping Cart**: Add, remove, and update quantities of items
- **Order Confirmation**: Modal dialog for order confirmation
- **Reset Functionality**: Start new order option to clear cart

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support
- **Hover & Focus States**: Interactive elements with visual feedback
- **Loading States**: Smooth loading experience while fetching data

### Technical Features

- **Dynamic Data Loading**: Products loaded from JSON file
- **State Management**: React hooks for cart and product state
- **Component Architecture**: Modular, reusable components
- **Accessibility**: ARIA labels, semantic HTML, and keyboard support

## Project Structure

```
src/
├── components/
│   ├── ProductList.js      # Main product grid container
│   ├── ProductCard.js      # Individual product display
│   ├── Cart.js            # Shopping cart sidebar
│   ├── CartItem.js        # Individual cart item
│   └── ConfirmationModal.js # Order confirmation dialog
├── App.js                 # Main application component
├── App.css               # Application styles
├── index.js              # Application entry point
└── index.css             # Global styles

public/
├── index.html            # HTML template
└── data.json             # Product data
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:

   ```bash
   cd "homework/Week 3 Lecture 1 & 2 - Product List with React/product-list-cart"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Usage

### Adding Products to Cart

1. Browse the product grid
2. Click "Add to Cart" on any product
3. Products can be added multiple times to increase quantity

### Managing Cart

1. View cart items in the sidebar
2. Use +/- buttons to adjust quantities
3. Click "Remove" to delete items
4. See total price and item count in real-time

### Completing Orders

1. Click "Confirm Order" when ready to checkout
2. Review order details in the confirmation modal
3. Choose "Start New Order" to clear cart and continue shopping
4. Or click "Close" to keep current cart

### Keyboard Navigation

- Use Tab to navigate between interactive elements
- Press Enter or Space to activate buttons
- Press Escape to close modals
- All functionality accessible via keyboard

## Customization

### Adding New Products

Edit `public/data.json` to add new products:

```json
{
  "id": 7,
  "name": "New Product",
  "price": 29.99,
  "image": "product-image-url",
  "category": "Category",
  "description": "Product description"
}
```

### Styling

- Modify `src/App.css` for visual changes
- Responsive breakpoints: 1024px, 768px, 480px
- Color scheme uses CSS custom properties for easy theming

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

This application follows WCAG 2.1 guidelines:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader compatibility

## Performance

- Lazy loading of images
- Optimized bundle size
- Efficient state management
- Responsive images
- Minimal re-renders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Lisk Solidity Bootcamp 2025 curriculum.

## Acknowledgments

- Frontend Mentor for the original challenge design
- React team for the excellent framework
- Unsplash for product images
- Victoria Adedayo (Vickish) for the assignment guidance
