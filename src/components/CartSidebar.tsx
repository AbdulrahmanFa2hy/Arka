import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <div 
            className={`fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white shadow-2xl transform transition-all duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } z-[51] flex flex-col`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center">
                <ShoppingBag className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-400">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="group bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all duration-200">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img 
                            src={item.images[0]} 
                            alt={item.title} 
                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          />
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0 pl-1">
                          <h3 className="font-semibold text-gray-800 truncate mb-1">{item.title}</h3>
                          <div className="flex gap-5 py-2">
                          <p className="text-lg font-bold text-blue-600">${item.price}</p>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="p-1.5 hover:bg-white rounded-lg transition-colors border border-gray-200"
                            >
                              <Minus className="h-6 w-6 text-gray-600" />
                            </button>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="p-1.5 hover:bg-white rounded-lg transition-colors border border-gray-200"
                            >
                              <Plus className="h-6 w-6 text-gray-600" />
                            </button>
                          </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group-hover:opacity-100 opacity-0"
                        >
                          <Trash2 className="h-6 w-6 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 pb-2 bg-gray-50">
                <div className="space-y-4">
                  <div className="">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Pay on Delivery</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      navigate('/checkout');
                      onClose();
                    }}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
