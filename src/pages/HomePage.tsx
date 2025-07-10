import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { fetchProducts, fetchFilteredProducts, Product, FilterParams } from '../services/api';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SearchComponent from '../components/SearchComponent';

export default function HomePage() {
  const { searchQuery } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply search filter whenever searchQuery changes
  useEffect(() => {
    if (products.length > 0) {
      const searchFiltered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchFiltered);
    }
  }, [searchQuery, products]);

  const handleFilterChange = async (filters: FilterParams) => {
    if (Object.keys(filters).length === 0) {
      // No filters applied, show all products with search filter
      const searchFiltered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(searchFiltered);
    } else {
      // Apply filters
      try {
        setLoading(true);
        const filteredData = await fetchFilteredProducts(filters);
        const searchFiltered = filteredData.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(searchFiltered);
      } catch (error) {
        console.error('Error applying filters:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSimilarityScore = (text: string, search: string): number => {
    text = text.toLowerCase();
    search = search.toLowerCase();
    let score = 0;
    let lastFoundIndex = -1;
    
    for (const char of search) {
      const index = text.indexOf(char, lastFoundIndex + 1);
      if (index !== -1) {
        score++;
        lastFoundIndex = index;
      }
    }
    return score;
  };

  const suggestions = searchQuery ? products
    .filter(product => !filteredProducts.includes(product))
    .map(product => ({
      ...product,
      similarity: Math.max(
        getSimilarityScore(product.title, searchQuery),
        getSimilarityScore(product.description, searchQuery),
        getSimilarityScore(product.category.name, searchQuery)
      )
    }))
    .filter(product => product.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-8xl mx-auto px-2 sm:px-4 py-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <ProductFilters 
              onFilterChange={handleFilterChange}
              isVisible={filtersVisible}
              onToggle={() => setFiltersVisible(!filtersVisible)}
            />
            
            {/* Products Grid */}
            <div className="flex-1">
              <LoadingSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-8xl mx-auto px-2 sm:px-4 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <ProductFilters 
            onFilterChange={handleFilterChange}
            isVisible={filtersVisible}
            onToggle={() => setFiltersVisible(!filtersVisible)}
          />
          
          {/* Products Grid */}
          <div className="flex-1">
            <SearchComponent 
              searchQuery={searchQuery}
              filteredProducts={filteredProducts}
              suggestions={suggestions}
            />
            <ProductGrid 
              products={filteredProducts}
              searchQuery={searchQuery}
              suggestions={suggestions}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 