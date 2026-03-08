import axiosInstance from './axiosInstance';
import type { SubCategory, SubCategoryPayload, ApiListResponse } from '../types';

export const fetchSubCategoriesApi = () =>
  axiosInstance.get<ApiListResponse<SubCategory>>('/api/subcategories');

export const getSubCategoryByIdApi = (id: string) =>
  axiosInstance.get<{ success: boolean; data: SubCategory }>(`/api/subcategories/${id}`);

export const createSubCategoryApi = (payload: SubCategoryPayload) =>
  axiosInstance.post<{ success: boolean; data: SubCategory }>('/api/subcategories', payload);

export const updateSubCategoryApi = (id: string, payload: SubCategoryPayload) =>
  axiosInstance.put<{ success: boolean; data: SubCategory }>(`/api/subcategories/${id}`, payload);

export const deleteSubCategoryApi = (id: string) =>
  axiosInstance.delete(`/api/subcategories/${id}`);
