import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { SubCategory, SubCategoryPayload } from '../types';
import {
  fetchSubCategoriesApi,
  getSubCategoryByIdApi,
  createSubCategoryApi,
  updateSubCategoryApi,
  deleteSubCategoryApi,
} from '../services/subCategoriesService';

interface SubCategoriesContextType {
  subCategories: SubCategory[];
  loading: boolean;
  error: string | null;
  fetchSubCategories: () => Promise<void>;
  getSubCategoryById: (id: string) => Promise<SubCategory>;
  createSubCategory: (payload: SubCategoryPayload) => Promise<SubCategory>;
  updateSubCategory: (id: string, payload: SubCategoryPayload) => Promise<SubCategory>;
  deleteSubCategory: (id: string) => Promise<void>;
}

const SubCategoriesContext = createContext<SubCategoriesContextType | null>(null);

export function SubCategoriesProvider({ children }: { children: ReactNode }) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSubCategoriesApi();
      setSubCategories(res.data.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubCategoryById = useCallback(async (id: string): Promise<SubCategory> => {
    const res = await getSubCategoryByIdApi(id);
    return res.data.data;
  }, []);

  const createSubCategory = useCallback(async (payload: SubCategoryPayload): Promise<SubCategory> => {
    const res = await createSubCategoryApi(payload);
    const newSubCategory = res.data.data;
    setSubCategories((prev) => [newSubCategory, ...prev]);
    return newSubCategory;
  }, []);

  const updateSubCategory = useCallback(async (id: string, payload: SubCategoryPayload): Promise<SubCategory> => {
    const res = await updateSubCategoryApi(id, payload);
    const updated = res.data.data;
    setSubCategories((prev) => prev.map((sc) => (sc._id === id ? updated : sc)));
    return updated;
  }, []);

  const deleteSubCategory = useCallback(async (id: string): Promise<void> => {
    await deleteSubCategoryApi(id);
    setSubCategories((prev) => prev.filter((sc) => sc._id !== id));
  }, []);

  return (
    <SubCategoriesContext.Provider
      value={{
        subCategories,
        loading,
        error,
        fetchSubCategories,
        getSubCategoryById,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
      }}
    >
      {children}
    </SubCategoriesContext.Provider>
  );
}

export function useSubCategories(): SubCategoriesContextType {
  const context = useContext(SubCategoriesContext);
  if (!context) {
    throw new Error('useSubCategories must be used within a SubCategoriesProvider');
  }
  return context;
}
