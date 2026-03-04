import { Link } from 'react-router-dom';

export default function Register() {
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
          <span style={{ fontSize: 36 }}>📝</span>
          <h2 style={{ fontWeight: 700, marginTop: 8, marginBottom: 4 }}>إنشاء حساب جديد</h2>
          <p style={{ color: '#384250', fontSize: 14 }}>انضم إلى MyStore واستمتع بأفضل العروض</p>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="regName">الاسم الكامل</label>
            <input id="regName" type="text" className="form-control" placeholder="أدخل اسمك الكامل" required />
          </div>
          <div className="mb-3">
            <label htmlFor="regEmail">البريد الإلكتروني</label>
            <input id="regEmail" type="email" className="form-control" placeholder="example@email.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="regPhone">رقم الجوال</label>
            <input id="regPhone" type="tel" className="form-control" placeholder="05xxxxxxxx" required />
          </div>
          <div className="mb-4">
            <label htmlFor="regPassword">كلمة المرور</label>
            <input id="regPassword" type="password" className="form-control" placeholder="8 أحرف على الأقل" required />
          </div>
          <button type="submit" className="dga-primary-btn w-100" style={{ borderRadius: 8 }}>
            إنشاء الحساب
          </button>
        </form>

        <p className="text-center mt-3 mb-0" style={{ fontSize: 14, color: '#384250' }}>
          لديك حساب بالفعل؟{' '}
          <Link to="/auth/login" style={{ color: '#1b8354', fontWeight: 600 }}>
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
