import { AuthProvider } from './AuthContext';
import { CategoriesProvider } from './CategoriesContext';
import { SubCategoriesProvider } from './SubCategoriesContext';
import { ProductsProvider } from './ProductsContext';
import { OrdersProvider } from './OrdersContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <SubCategoriesProvider>
          <ProductsProvider>
            <OrdersProvider>
              {children}
            </OrdersProvider>
          </ProductsProvider>
        </SubCategoriesProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
};
