import axiosInstance from './axiosInstance';
import type { AuthResponse, LoginValues, RegisterValues } from '../types';

export const loginApi = (data: LoginValues) =>
  axiosInstance.post<AuthResponse>('/api/auth/login', data);

export const registerApi = (data: RegisterValues) =>
  axiosInstance.post<AuthResponse>('/api/auth/register', data);
