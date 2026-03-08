import { AuthProvider } from './AuthContext';
import { CategoriesProvider } from './CategoriesContext';
import { SubCategoriesProvider } from './SubCategoriesContext';
import { ProductsProvider } from './ProductsContext';
import { OrdersProvider } from './OrdersContext';
import { CartProvider } from './CartContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <SubCategoriesProvider>
          <ProductsProvider>
            <OrdersProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </OrdersProvider>
          </ProductsProvider>
        </SubCategoriesProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
};
