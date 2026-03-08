import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product, ProductPayload, ProductsQueryParams } from '../types';
import {
  fetchProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from '../services/productsService';

interface ProductsContextType {
  products: Product[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: ProductsQueryParams) => Promise<void>;
  getProductById: (id: string) => Promise<Product>;
  createProduct: (payload: ProductPayload) => Promise<Product>;
  updateProduct: (id: string, payload: ProductPayload) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params?: ProductsQueryParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProductsApi(params);
      setProducts(res.data.data);
      setTotalCount(res.data.count);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id: string): Promise<Product> => {
    const res = await getProductByIdApi(id);
    return res.data.data;
  }, []);

  const createProduct = useCallback(async (payload: ProductPayload): Promise<Product> => {
    const res = await createProductApi(payload);
    const newProduct = res.data.data;
    setProducts((prev) => [newProduct, ...prev]);
    setTotalCount((prev) => prev + 1);
    return newProduct;
  }, []);

  const updateProduct = useCallback(async (id: string, payload: ProductPayload): Promise<Product> => {
    const res = await updateProductApi(id, payload);
    const updated = res.data.data;
    setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    await deleteProductApi(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
    setTotalCount((prev) => prev - 1);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        totalCount,
        loading,
        error,
        fetchProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextType {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
