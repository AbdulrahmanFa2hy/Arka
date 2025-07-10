import React, { useState, useEffect } from 'react';
import { Filter, X, Search, Tag } from 'lucide-react';
import { Category, FilterParams } from '../services/api';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterParams) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export default function ProductFilters({ onFilterChange, isVisible, onToggle }: ProductFiltersProps) {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [exactPrice, setExactPrice] = useState('');
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
    
    if (exactPrice && !isNaN(parseFloat(exactPrice))) {
      filters.price = parseFloat(exactPrice);
    }

    onFilterChange(filters);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setExactPrice('');
    onFilterChange({});
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, exactPrice]);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-blue-700 transition-colors"
      >
        <Filter className="h-6 w-6" />
      </button>

      {/* Mobile Filter Sidebar */}
      <div className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden
        ${isVisible ? 'block' : 'hidden'}
      `}>
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-500" />
                Filters
              </h2>
              <button onClick={onToggle} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  Categories
                </h3>
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                        className="mr-3 text-blue-500"
                      />
                      <span className="font-medium">All Categories</span>
                    </label>
                    {categoriesWithProducts.map((category) => (
                      <label key={category.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                          className="mr-3 text-blue-500"
                        />
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Exact Price */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Search className="h-4 w-4 mr-2 text-gray-500" />
                  Price Filter
                </h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter exact price..."
                    value={exactPrice}
                    onChange={(e) => setExactPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {exactPrice && (
                    <button
                      onClick={() => setExactPrice('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {exactPrice && (
                  <p className="mt-2 text-sm text-gray-500">
                    Showing products with price: ${exactPrice}
                  </p>
                )}
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-500" />
          Filters
        </h2>
        
        <div className="space-y-6">
          {/* Categories */}
          <div>
           
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="mr-3 text-blue-500"
                  />
                  <span className="font-medium">All Categories</span>
                </label>
                {categoriesWithProducts.map((category) => (
                  <label key={category.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="mr-3 text-blue-500"
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Exact Price */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              Price Filter
            </h3>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter exact price..."
                value={exactPrice}
                onChange={(e) => setExactPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {exactPrice && (
                <button
                  onClick={() => setExactPrice('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {exactPrice && (
              <p className="mt-2 text-sm text-gray-500">
                Showing products with price: ${exactPrice}
              </p>
            )}
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
} 