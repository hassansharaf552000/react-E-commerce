import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div
      className="content-wrapper d-flex flex-column align-items-center justify-content-center text-center"
      style={{ paddingBlock: 80 }}
    >
      <div style={{ fontSize: 80 }}>🔍</div>
      <h1 style={{ fontSize: 48, fontWeight: 700, color: '#161616', margin: '16px 0 8px' }}>404</h1>
      <p style={{ fontSize: 18, color: '#384250', marginBottom: 32 }}>
        عذراً، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <Link to="/" className="dga-primary-btn" style={{ borderRadius: 8, textDecoration: 'none' }}>
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}

