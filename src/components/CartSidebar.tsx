import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      decreaseQuantity(item.id);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div 
            className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } z-[51] flex flex-col`}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 mt-2">Your Cart</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center p-3 sm:p-4 border rounded-lg">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />
                      <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{item.title}</h3>
                        <p className="text-gray-600 text-sm">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t p-4 sm:p-6">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    navigate('/checkout');
                    onClose();
                  }}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Checkout 
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
