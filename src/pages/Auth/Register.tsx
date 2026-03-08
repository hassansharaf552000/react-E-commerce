import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { RegisterValues } from '../../types';
import './Auth.css';

const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .required('الاسم الكامل مطلوب'),
  email: Yup.string()
    .email('البريد الإلكتروني غير صحيح')
    .required('البريد الإلكتروني مطلوب'),
  password: Yup.string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .required('كلمة المرور مطلوبة'),
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik<RegisterValues>({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      try {
        await register(values);
        navigate('/');
      } catch (err: unknown) {
        const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
        const message =
          axiosErr?.response?.data?.message ||
          axiosErr?.message ||
          'حدث خطأ، يرجى المحاولة مرة أخرى';
        setApiError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <Link to="/" className="auth-brand">
          <div className="auth-brand-logo">M</div>
          <span className="auth-brand-name">MyStore</span>
        </Link>
        <div className="auth-divider" />

        {/* Heading */}
        <div className="auth-heading">
          <div className="auth-icon">📝</div>
          <h2>إنشاء حساب جديد</h2>
          <p>انضم إلى MyStore واستمتع بأفضل العروض</p>
        </div>

        {apiError && (
          <div className="alert alert-danger" role="alert" style={{ borderRadius: 8, fontSize: 14 }}>
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="name">الاسم الكامل</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? 'is-invalid' : ''
              }`}
              placeholder="أدخل اسمك الكامل"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? 'is-invalid' : ''
              }`}
              placeholder="example@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="password">كلمة المرور</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? 'is-invalid' : ''
              }`}
              placeholder="8 أحرف على الأقل"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
          </button>
        </form>

        <p className="auth-footer-link">
          لديك حساب بالفعل؟{' '}
          <Link to="/auth/login">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
