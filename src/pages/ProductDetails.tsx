import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import RelatedProducts from '../components/RelatedProducts';
import { useEffect, useState } from 'react';
import { fetchProduct, Product } from '../services/api';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        const productData = await fetchProduct(Number(id));
        setProduct(productData);
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
        duration: 2000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
          borderRadius: '8px',
          fontSize: '14px',
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Image */}
          <div className="lg:w-2/5">
            <div className="sticky top-24 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden bg-white border-2 cursor-pointer transition-all duration-200 ${
                        selectedImage === index 
                          ? 'border-blue-500 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.title} ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white rounded-2xl px-2 py-4 sm:p-8 shadow-sm border border-gray-100">
              {/* Breadcrumb */}
              <nav className="mb-4">
                <ol className="flex text-sm text-gray-500">
                  <li><a href="/" className="hover:text-blue-500">Home</a></li>
                  <li className="mx-2">/</li>
                  <li><a href="/" className="hover:text-blue-500">{product.category.name}</a></li>
                </ol>
              </nav>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                  In Stock
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl
                         font-medium tracking-wide
                         hover:bg-blue-700 transition-all duration-200
                         transform hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-blue-500/25"
              >
                Add to Cart
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
