import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Category, FilterParams } from '../services/api';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterParams) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export default function ProductFilters({ onFilterChange, isVisible, onToggle }: ProductFiltersProps) {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        if (response.ok) {
          const data = await response.json();
          
          // Check which categories have products
          const categoriesWithProductsData = await Promise.all(
            data.map(async (category: Category) => {
              try {
                const productsResponse = await fetch(`https://api.escuelajs.co/api/v1/categories/${category.id}/products`);
                if (productsResponse.ok) {
                  const products = await productsResponse.json();
                  return products.length > 0 ? category : null;
                }
              } catch (error) {
                console.error(`Error checking products for category ${category.id}:`, error);
              }
              return null;
            })
          );
          
          setCategoriesWithProducts(categoriesWithProductsData.filter(Boolean));
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleFilterChange = () => {
    const filters: FilterParams = {};
    
    if (selectedCategory !== '') {
      filters.categoryId = selectedCategory as number;
    }
    
    // Only apply price range filter if both min and max have values
    if (priceRange.min && priceRange.max) {
      filters.price_min = parseFloat(priceRange.min);
      filters.price_max = parseFloat(priceRange.max);
    }

    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    onFilterChange({});
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, priceRange]);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-40"
      >
        <Filter className="h-6 w-6" />
      </button>

      {/* Filter Sidebar */}
      <div className={`
        fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden
        ${isVisible ? 'block' : 'hidden'}
      `}>
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                        className="mr-2"
                      />
                      <span>All Categories</span>
                    </label>
                    {categoriesWithProducts.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                          className="mr-2"
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      placeholder="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {priceRange.min && !priceRange.max && (
                    <p className="text-sm text-gray-500">Please enter both min and max price</p>
                  )}
                  {!priceRange.min && priceRange.max && (
                    <p className="text-sm text-gray-500">Please enter both min and max price</p>
                  )}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="mr-2"
                  />
                  <span>All Categories</span>
                </label>
                {categoriesWithProducts.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="mr-2"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {priceRange.min && !priceRange.max && (
                <p className="text-sm text-gray-500">Please enter both min and max price</p>
              )}
              {!priceRange.min && priceRange.max && (
                <p className="text-sm text-gray-500">Please enter both min and max price</p>
              )}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
} 