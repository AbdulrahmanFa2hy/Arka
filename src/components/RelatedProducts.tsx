import { Product } from '../types';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

interface RelatedProductsProps {
  currentProduct: Product;
  limit?: number;
  title?: string;
}

export default function RelatedProducts({ 
  currentProduct, 
  limit = 4,
  title = "Related Products"
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await fetchProducts();
        const filtered = allProducts
          .filter(p => p.category.id === currentProduct.category.id && p.id !== currentProduct.id)
          .slice(0, limit);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error loading related products:', error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, [currentProduct, limit]);

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </section>
  );
}
