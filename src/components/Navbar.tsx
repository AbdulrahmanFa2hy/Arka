import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import CartSidebar from './CartSidebar';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { cartItems, setSearchQuery } = useCart();
  const location = useLocation();
  const [localSearch, setLocalSearch] = useState('');
  const debouncedSearch = useDebounce(localSearch, 300);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <>
      <nav className="bg-white shadow-lg sticky w-full top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Arka
              </Link>
            </div>
            
            {isHomePage && (
              <div className="flex flex-1 justify-center px-2 sm:px-4 lg:px-8">
                <div className="relative w-full max-w-lg">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            <div className="flex items-center">
              <div className="relative">
                <button onClick={() => setIsCartOpen(!isCartOpen)}>
                  <ShoppingCart className="h-6 w-6 cursor-pointer" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}