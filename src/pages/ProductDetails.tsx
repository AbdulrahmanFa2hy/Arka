import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import RelatedProducts from '../components/RelatedProducts';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Image */}
          <div className="lg:w-2/5"> {/* Changed from lg:w-1/2 to lg:w-2/5 */}
            <div className="sticky top-24 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-white border-2 border-blue-500">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Add more thumbnails as needed */}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              {/* Breadcrumb */}
              <nav className="mb-4">
                <ol className="flex text-sm text-gray-500">
                  <li><a href="/" className="hover:text-blue-500">Home</a></li>
                  <li className="mx-2">/</li>
                  <li><a href="/" className="hover:text-blue-500">{product.category}</a></li>
                </ol>
              </nav>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl
                         font-medium tracking-wide
                         hover:bg-blue-700 transition-all duration-200
                         transform hover:scale-[1.02] active:scale-[0.98]
                         disabled:bg-gray-300 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-blue-500/25"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products with enhanced styling */}
        <div className="mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </div>
    </div>
  );
}
