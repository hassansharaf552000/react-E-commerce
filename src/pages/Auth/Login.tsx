import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div
      className="content-wrapper d-flex align-items-center justify-content-center"
      style={{ paddingBlock: 60 }}
    >
      <div
        className="card p-4 p-md-5"
        style={{ width: '100%', maxWidth: 480, borderRadius: 16 }}
      >
        <div className="text-center mb-4">
          <span style={{ fontSize: 36 }}>👤</span>
          <h2 style={{ fontWeight: 700, marginTop: 8, marginBottom: 4 }}>تسجيل الدخول</h2>
          <p style={{ color: '#384250', fontSize: 14 }}>أهلاً بعودتك إلى MyStore</p>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="loginEmail">البريد الإلكتروني</label>
            <input id="loginEmail" type="email" className="form-control" placeholder="example@email.com" required />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword">كلمة المرور</label>
            <input id="loginPassword" type="password" className="form-control" placeholder="أدخل كلمة المرور" required />
          </div>
          <button type="submit" className="dga-primary-btn w-100" style={{ borderRadius: 8 }}>
            دخول
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ fontSize: 14, color: '#384250' }}>
          ليس لديك حساب؟{' '}
          <Link to="/auth/register" style={{ color: '#1b8354', fontWeight: 600 }}>
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
