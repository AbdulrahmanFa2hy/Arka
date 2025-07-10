const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface FilterParams {
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  categorySlug?: string;
  limit?: number;
  offset?: number;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch filtered products
export const fetchFilteredProducts = async (filters: FilterParams): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.title) params.append('title', filters.title);
    if (filters.price) params.append('price', filters.price.toString());
    if (filters.price_min) params.append('price_min', filters.price_min.toString());
    if (filters.price_max) params.append('price_max', filters.price_max.toString());
    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.categorySlug) params.append('categorySlug', filters.categorySlug);
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());

    const url = `${API_BASE_URL}/products${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch filtered products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    return [];
  }
};

// Fetch a single product by ID
export const fetchProduct = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}; 