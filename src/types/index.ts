export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

// Categories
export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryPayload {
  name: string;
  description?: string;
}

// Sub-categories
export interface SubCategory {
  _id: string;
  name: string;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubCategoryPayload {
  name: string;
  description?: string;
  category: string;
}

// Products
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string | null;
  subCategory: { _id: string; name: string } | null;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  subCategory?: string;
  images?: string[];
}

export interface ProductsQueryParams {
  search?: string;
  category?: string;
  subCategory?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Orders
export interface OrderItem {
  product: string;
  quantity: number;
  price?: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPayload {
  items: { product: string; quantity: number }[];
  shippingAddress: ShippingAddress;
}

// Generic API list response
export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}
