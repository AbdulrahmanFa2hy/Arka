import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="animate-fade-in bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 
                 hover:shadow-2xl hover:scale-[1.02] flex flex-col h-full cursor-pointer
                 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                      transition-all duration-300"/>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-1 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {product.stock > 0 ? (
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
          ) : (
            <button
              className="bg-gray-400 text-white px-6 py-2.5 rounded-lg 
                       transition-all duration-300 transform
                       cursor-not-allowed"
              disabled
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}