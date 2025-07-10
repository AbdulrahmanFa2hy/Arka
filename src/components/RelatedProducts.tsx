import { Product } from '../types';
import ProductCard from './ProductCard';
import { products } from '../data/products';

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
  const relatedProducts = products
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, limit);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
