export default function Cart() {
  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 24 }}>🛒 سلة التسوق</h2>
      <div
        className="text-center"
        style={{
          padding: '60px 20px',
          background: '#f9fafb',
          borderRadius: 16,
          border: '1px dashed #d2d6db',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h4 style={{ fontWeight: 700, color: '#161616', marginBottom: 8 }}>سلتك فارغة</h4>
        <p style={{ color: '#384250', marginBottom: 24 }}>
          أضف منتجات إلى سلتك لتتمكن من إتمام عملية الشراء
        </p>
        <a href="/products" className="dga-primary-btn" style={{ borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>
          تصفح المنتجات
        </a>
      </div>
    </div>
  );
}
