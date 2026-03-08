import axiosInstance from './axiosInstance';
import type { Product, ProductPayload, ProductsQueryParams, ApiListResponse } from '../types';

export const fetchProductsApi = (params?: ProductsQueryParams) =>
  axiosInstance.get<ApiListResponse<Product>>('/api/products', { params });

export const getProductByIdApi = (id: string) =>
  axiosInstance.get<{ success: boolean; data: Product }>(`/api/products/${id}`);

export const createProductApi = (payload: ProductPayload) =>
  axiosInstance.post<{ success: boolean; data: Product }>('/api/products', payload);

export const updateProductApi = (id: string, payload: ProductPayload) =>
  axiosInstance.put<{ success: boolean; data: Product }>(`/api/products/${id}`, payload);

export const deleteProductApi = (id: string) =>
  axiosInstance.delete(`/api/products/${id}`);
