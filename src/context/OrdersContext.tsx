import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Order, OrderPayload } from '../types';
import {
  fetchOrdersApi,
  getOrderByIdApi,
  createOrderApi,
} from '../services/ordersService';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<Order>;
  createOrder: (payload: OrderPayload) => Promise<Order>;
}

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchOrdersApi();
      const data = res.data?.data ?? res.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrderById = useCallback(async (id: string): Promise<Order> => {
    const res = await getOrderByIdApi(id);
    return res.data.data;
  }, []);

  const createOrder = useCallback(async (payload: OrderPayload): Promise<Order> => {
    const res = await createOrderApi(payload);
    const newOrder = res.data?.data ?? res.data;
    if (newOrder && typeof newOrder === 'object' && '_id' in newOrder) {
      setOrders((prev) => [newOrder as Order, ...prev]);
    }
    return newOrder as Order;
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        getOrderById,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders(): OrdersContextType {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
