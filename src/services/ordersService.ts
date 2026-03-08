import axiosInstance from './axiosInstance';
import type { Order, OrderPayload, ApiListResponse } from '../types';

export const fetchOrdersApi = () =>
  axiosInstance.get<ApiListResponse<Order>>('/api/orders');

export const getOrderByIdApi = (id: string) =>
  axiosInstance.get<{ success: boolean; data: Order }>(`/api/orders/${id}`);

export const createOrderApi = (payload: OrderPayload) =>
  axiosInstance.post<{ success: boolean; data: Order }>('/api/orders', payload);
