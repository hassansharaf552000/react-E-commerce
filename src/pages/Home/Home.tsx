import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/CategoriesContext';
import { useProducts } from '../../context/ProductsContext';
import fallbackImg from '../../assets/shopping.webp';

export default function Home() {
  const { categories, fetchCategories, loading: catLoading } = useCategories();
  const { products, fetchProducts, loading: prodLoading } = useProducts();

  useEffect(() => {
    fetchCategories();
    fetchProducts({ limit: 8, sortBy: 'createdAt', sortOrder: 'desc' });
  }, [fetchCategories, fetchProducts]);

  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, color: '#161616', marginBottom: 16 }}>
        مرحباً بك في MyStore 🛒
      </h1>
      <p style={{ fontSize: 18, color: '#384250', marginBottom: 32 }}>
        اكتشف أفضل المنتجات بأسعار لا تُقاوم
      </p>

      {/* Categories */}
      <h3 style={{ fontWeight: 700, marginBottom: 16 }}>الفئات</h3>
      {catLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="row g-4 mb-5">
          {categories.slice(0, 8).map((cat) => (
            <div key={cat._id} className="col-6 col-lg-3">
              <Link to={`/products?category=${cat._id}`} style={{ textDecoration: 'none' }}>
                <div
                  className="card h-100 text-center p-4"
                  style={{ cursor: 'pointer', borderRadius: 16 }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🛍️</div>
                  <h5 style={{ fontWeight: 700, color: '#161616' }}>{cat.name}</h5>
                  {cat.description && (
                    <p style={{ color: '#384250', fontSize: 13, margin: 0 }}>{cat.description}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Featured Products */}
      <h3 style={{ fontWeight: 700, marginBottom: 16 }}>أحدث المنتجات</h3>
      {prodLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="row g-4">
          {products.slice(0, 8).map((product) => (
            <div key={product._id} className="col-6 col-lg-3">
              <div className="card h-100 p-3" style={{ borderRadius: 16 }}>
                <div
                  style={{
                    height: 160,
                    background: '#f3f4f6',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginBottom: 12,
                  }}
                >
                  {product.images?.[0] && product.images[0] !== 'string' ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImg; }}
                    />
                  ) : (
                    <span style={{ fontSize: 48 }}>🛍️</span>
                  )}
                </div>
                <h5 style={{ fontWeight: 700, color: '#161616', fontSize: 15 }}>{product.name}</h5>
                <p style={{ color: '#1b8354', fontWeight: 600, fontSize: 18 }}>
                  {product.price} ر.س
                </p>
                <Link
                  to={`/products?search=${product.name}`}
                  className="dga-primary-btn w-100 mt-auto text-center"
                  style={{ borderRadius: 8, textDecoration: 'none' }}
                >
                  عرض المنتج
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
