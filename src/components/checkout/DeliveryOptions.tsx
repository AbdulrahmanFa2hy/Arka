import { Truck } from 'lucide-react';

interface DeliveryOptionsProps {
  estimatedShipping: string;
}

export function DeliveryOptions({ estimatedShipping }: DeliveryOptionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Truck className="h-6 w-6 text-blue-500 mr-3" />
        <h2 className="text-xl font-semibold">Delivery Options</h2>
      </div>

      <div className="space-y-4">
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
          <input
            type="radio"
            name="delivery"
            className="text-blue-500"
            defaultChecked
          />
          <span className="ml-3">
            <span className="block font-medium text-gray-900">
              Standard Delivery
            </span>
            <span className="block text-sm text-gray-500">
              {estimatedShipping}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
