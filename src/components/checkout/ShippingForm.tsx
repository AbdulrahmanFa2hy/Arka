import React from 'react';
import { Package } from 'lucide-react';
import { FormData } from '../../types/checkout';

interface ShippingFormProps {
  formData: FormData;
  estimatedShipping: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ShippingForm({ formData, estimatedShipping, handleChange }: ShippingFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-blue-500 mr-3" />
        <h2 className="text-xl font-semibold">Shipping Details</h2>
      </div>

      <div className="space-y-6">
        {['email', 'name', 'address', 'city', 'country'].map((field) => (
          <div key={field} className="relative">
            <input
              id={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              required
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              placeholder=" "
              className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer"
            />
            <label
              htmlFor={field}
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:bg-white left-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === 'country' && formData.country && (
              <p className="mt-2 text-sm text-gray-600">
                Estimated delivery time: {estimatedShipping}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
