import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetails from './pages/ProductDetails';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartSidebar from './components/CartSidebar';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <CartSidebar 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
          />
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;