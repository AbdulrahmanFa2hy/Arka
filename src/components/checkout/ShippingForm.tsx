import React from 'react';
import { Package, AlertCircle } from 'lucide-react';
import { FormData } from '../../types/checkout';

interface ShippingFormProps {
  formData: FormData;
  estimatedShipping: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: { [key: string]: string };
  touched?: { [key: string]: boolean };
}

export function ShippingForm({ formData, estimatedShipping, handleChange, errors = {}, touched = {} }: ShippingFormProps) {
  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isFieldValid = (fieldName: string) => {
    return touched[fieldName] && !errors[fieldName];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Package className="h-6 w-6 text-blue-500 mr-3" />
        <h2 className="text-xl font-semibold">Shipping Details</h2>
      </div>

      <div className="space-y-6">
        {['email', 'name', 'address', 'city', 'country'].map((field) => {
          const fieldError = getFieldError(field);
          const isValid = isFieldValid(field);
          
          return (
            <div key={field} className="relative">
              <input
                id={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                required
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                placeholder=" "
                className={`block w-full px-4 py-3 text-gray-900 bg-gray-50 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white peer transition-colors ${
                  fieldError 
                    ? 'border-red-300 focus:ring-red-500' 
                    : isValid 
                    ? 'border-green-300 focus:ring-green-500' 
                    : 'border-gray-200'
                }`}
              />
              <label
                htmlFor={field}
                className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1 transition-colors ${
                  fieldError 
                    ? 'text-red-500 bg-gray-50 peer-focus:text-red-500 peer-focus:bg-white' 
                    : isValid 
                    ? 'text-green-600 bg-gray-50 peer-focus:text-green-600 peer-focus:bg-white' 
                    : 'text-gray-500 bg-gray-50 peer-focus:text-blue-500 peer-focus:bg-white'
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              
              {fieldError && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldError}
                </div>
              )}
              
              {field === 'country' && formData.country && !fieldError && (
                <p className="mt-2 text-sm text-gray-600">
                  Estimated delivery time: {estimatedShipping}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
