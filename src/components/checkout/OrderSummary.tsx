import { ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface OrderSummaryProps {
  total: number;
  onSubmit: () => void;
  formData: {
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
  };
}

export function OrderSummary({ total, onSubmit, formData }: OrderSummaryProps) {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const isFormValid = () => {
    return formData.email && formData.name && formData.address && formData.city && formData.country;
  };

  const handleConfirmOrder = async () => {
    if (!isFormValid()) {
      toast.error('Please fill in all shipping details before confirming your order.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '16px',
        },
        icon: '❌',
      });
      return;
    }

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit();
      clearCart();
      
      toast.success('Order confirmed successfully!', {
        duration: 6000,
        position: 'top-center',
        
      });
      
      navigate('/');
    } catch {
      toast.error('Failed to confirm order. Please try again.', {
        duration: 6000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '16px',
        },
        icon: '❌',
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Pay on Delivery</p>
        </div>
      </div>

      <button
        onClick={handleConfirmOrder}
        disabled={!isFormValid()}
        className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg
                 hover:bg-blue-600 transform transition-all duration-200
                 hover:scale-[1.02] active:scale-[0.98] shadow-lg
                 hover:shadow-blue-500/25 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 
                 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isFormValid() ? 'Confirm Order' : 'Fill Shipping Details'}
      </button>

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <ShieldCheck className="h-4 w-4 mr-2" />
        Secure Checkout
      </div>
    </div>
  );
}
