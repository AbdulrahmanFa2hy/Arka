import { ShieldCheck } from 'lucide-react';

interface OrderSummaryProps {
  total: number;
  onSubmit: () => void;
}

export function OrderSummary({ total, onSubmit }: OrderSummaryProps) {
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
        onClick={onSubmit}
        className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg
                 hover:bg-blue-600 transform transition-all duration-200
                 hover:scale-[1.02] active:scale-[0.98] shadow-lg
                 hover:shadow-blue-500/25 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-offset-2"
      >
        Confirm Order
      </button>

      <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
        <ShieldCheck className="h-4 w-4 mr-2" />
        Secure Checkout
      </div>
    </div>
  );
}
