import axiosInstance from './axiosInstance';
import type { Category, CategoryPayload, ApiListResponse } from '../types';

export const fetchCategoriesApi = () =>
  axiosInstance.get<ApiListResponse<Category>>('/api/categories');

export const getCategoryByIdApi = (id: string) =>
  axiosInstance.get<{ success: boolean; data: Category }>(`/api/categories/${id}`);

export const createCategoryApi = (payload: CategoryPayload) =>
  axiosInstance.post<{ success: boolean; data: Category }>('/api/categories', payload);

export const updateCategoryApi = (id: string, payload: CategoryPayload) =>
  axiosInstance.put<{ success: boolean; data: Category }>(`/api/categories/${id}`, payload);

export const deleteCategoryApi = (id: string) =>
  axiosInstance.delete(`/api/categories/${id}`);
