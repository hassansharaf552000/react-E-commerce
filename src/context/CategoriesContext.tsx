import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Category, CategoryPayload } from '../types';
import {
  fetchCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '../services/categoriesService';

interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<Category>;
  createCategory: (payload: CategoryPayload) => Promise<Category>;
  updateCategory: (id: string, payload: CategoryPayload) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchCategoriesApi();
      setCategories(res.data.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback(async (id: string): Promise<Category> => {
    const res = await getCategoryByIdApi(id);
    return res.data.data;
  }, []);

  const createCategory = useCallback(async (payload: CategoryPayload): Promise<Category> => {
    const res = await createCategoryApi(payload);
    const newCategory = res.data.data;
    setCategories((prev) => [newCategory, ...prev]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(async (id: string, payload: CategoryPayload): Promise<Category> => {
    const res = await updateCategoryApi(id, payload);
    const updated = res.data.data;
    setCategories((prev) => prev.map((c) => (c._id === id ? updated : c)));
    return updated;
  }, []);

  const deleteCategory = useCallback(async (id: string): Promise<void> => {
    await deleteCategoryApi(id);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories(): CategoriesContextType {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}
