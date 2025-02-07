import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Truck, CreditCard, Package, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  onBack?: () => void;
}

const shippingTimes: { [key: string]: string } = {
  'United States': '3-5 business days',
  'Canada': '5-7 business days',
  'United Kingdom': '7-10 business days',
  'Australia': '10-14 business days',
  'Default': '7-14 business days'
};

export default function Checkout({ onBack }: CheckoutProps) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    country: '',
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedShipping = shippingTimes[formData.country] || shippingTimes.Default;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order processing here
    alert('Order placed successfully! You will pay on delivery.');
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm fixed top-0 w-full z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">1</div>
              <span className="text-blue-500 font-medium">Details</span>
            </div>
            <div className="h-1 w-16 bg-gray-200" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">2</div>
              <span className="text-gray-500">Payment</span>
            </div>
            <div className="h-1 w-16 bg-gray-200" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">3</div>
              <span className="text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Shopping
        </button>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Main Form */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">Shipping Details</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1">
                    Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1">
                    City
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder=" "
                    className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1">
                    Country
                  </label>
                  {formData.country && (
                    <p className="mt-2 text-sm text-gray-600">
                      Estimated delivery time: {estimatedShipping}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Delivery Options Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-6">
                <Truck className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">Delivery Options</h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <input type="radio" name="delivery" className="text-blue-500" defaultChecked />
                  <span className="ml-3">
                    <span className="block font-medium text-gray-900">Standard Delivery</span>
                    <span className="block text-sm text-gray-500">{estimatedShipping}</span>
                  </span>
                </label>
                {/* Add more delivery options if needed */}
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="md:col-span-2">
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
                type="submit"
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
          </div>
        </div>
      </div>
    </div>
  );
}