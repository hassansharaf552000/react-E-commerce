import { useSearchParams } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: 1, name: 'سماعات لاسلكية', price: 299, category: 'electronics' },
  { id: 2, name: 'قميص قطني', price: 89, category: 'clothing' },
  { id: 3, name: 'طقم أواني', price: 199, category: 'home' },
  { id: 4, name: 'كريم مرطب', price: 59, category: 'beauty' },
  { id: 5, name: 'حذاء رياضي', price: 349, category: 'sports' },
  { id: 6, name: 'ساعة ذكية', price: 799, category: 'electronics' },
];

export default function Products() {
  const [params] = useSearchParams();
  const category = params.get('category');

  const filtered = category
    ? MOCK_PRODUCTS.filter((p) => p.category === category)
    : MOCK_PRODUCTS;

  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 24 }}>
        {category ? `فئة: ${category}` : 'جميع المنتجات'}
      </h2>

      <div className="row g-4">
        {filtered.map((product) => (
          <div key={product.id} className="col-6 col-lg-4">
            <div className="card h-100 p-3" style={{ borderRadius: 16 }}>
              <div
                style={{
                  height: 160,
                  background: '#f3f4f6',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                  marginBottom: 12,
                }}
              >
                🛍️
              </div>
              <h5 style={{ fontWeight: 700, color: '#161616' }}>{product.name}</h5>
              <p style={{ color: '#1b8354', fontWeight: 600, fontSize: 18 }}>
                {product.price} ر.س
              </p>
              <button
                className="dga-primary-btn w-100 mt-auto"
                style={{ borderRadius: 8 }}
              >
                أضف إلى السلة
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: '#384250', fontSize: 16 }}>لا توجد منتجات في هذه الفئة حالياً.</p>
        )}
      </div>
    </div>
  );
}
