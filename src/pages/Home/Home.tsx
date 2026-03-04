export default function Home() {
  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, color: '#161616', marginBottom: 16 }}>
        مرحباً بك في MyStore 🛒
      </h1>
      <p style={{ fontSize: 18, color: '#384250', marginBottom: 32 }}>
        اكتشف أفضل المنتجات بأسعار لا تُقاوم
      </p>

      <div className="row g-4">
        {['الإلكترونيات', 'الملابس', 'المنزل والمطبخ', 'العناية والجمال'].map((cat) => (
          <div key={cat} className="col-6 col-lg-3">
            <div
              className="card h-100 text-center p-4"
              style={{ cursor: 'pointer', borderRadius: 16 }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛍️</div>
              <h5 style={{ fontWeight: 700, color: '#161616' }}>{cat}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
