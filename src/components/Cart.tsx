import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center gap-4 py-4 border-b">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
        <button 
          onClick={onCheckout}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}