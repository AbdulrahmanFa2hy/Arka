import React from 'react';
import { Product } from '../types';

interface SearchComponentProps {
  searchQuery: string;
  filteredProducts: Product[];
  suggestions: Product[];
}

export default function SearchComponent({ searchQuery, filteredProducts, suggestions }: SearchComponentProps) {
  if (!searchQuery || filteredProducts.length > 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="text-center py-4">
        <p className="text-gray-500 text-lg">No items match your search "{searchQuery}"</p>
        {suggestions.length > 0 && (
          <p className="text-gray-400 text-sm mt-2">Here are some similar items you might be interested in:</p>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md py-4 sm:p-4">
          <ul className="space-y-2 ">
            {suggestions.map(product => (
              <li key={product.id} className="hover:bg-gray-50 p-2 rounded">
                <a href={`/product/${product.id}`} className="flex items-center">
                  <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover rounded" />
                  <div className="ml-3">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">{product.category.name}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 