import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CheckoutPage from './pages/CheckoutPage';
import { products } from './data/products';
import { useCart } from './context/CartContext';
import ProductDetails from './pages/ProductDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartSidebar from './components/CartSidebar';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { searchQuery } = useCart();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        getSimilarityScore(product.name, searchQuery),
        getSimilarityScore(product.description, searchQuery),
        getSimilarityScore(product.category, searchQuery)
      )
    }))
    .filter(product => product.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery && filteredProducts.length === 0 && (
          <div className="mb-8">
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No items match your search "{searchQuery}"</p>
              {suggestions.length > 0 && (
                <p className="text-gray-400 text-sm mt-2">Here are some similar items you might be interested in:</p>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-md sm:p-4">
                <ul className="space-y-2">
                  {suggestions.map(product => (
                    <li key={product.id} className="hover:bg-gray-50 p-2 rounded">
                      <a href={`/product/${product.id}`} className="flex items-center">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        <div className="ml-3">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <CartSidebar 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
          />
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;