import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title}`, {
      duration: 2000,
      position: 'top-center',
    
    });
  };

  // Truncate description for card display
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (variant === 'compact') {
    return (
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="animate-fade-in bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
                   hover:shadow-lg hover:scale-[1.02] flex flex-col h-full cursor-pointer
                   border border-gray-100"
      >
        <div className="relative h-32 overflow-hidden group">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 
                       group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 
                        transition-all duration-300"/>
        </div>
        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{product.title}</h3>
          <p className="text-xs text-gray-600 flex-1 leading-relaxed line-clamp-2">
            {truncateDescription(product.description, 60)}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="animate-fade-in bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 
                 hover:shadow-2xl hover:scale-[1.02] flex flex-col h-full cursor-pointer
                 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden group">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                      transition-all duration-300"/>
      </div>
      <div className="p-3 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-1 leading-relaxed">
          {truncateDescription(product.description, 120)}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg 
                     transition-all duration-300 transform
                     hover:bg-blue-700 hover:shadow-lg
                     active:scale-95 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}