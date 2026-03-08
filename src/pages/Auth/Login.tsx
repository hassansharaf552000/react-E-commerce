import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { LoginValues } from '../../types';
import './Auth.css';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('البريد الإلكتروني غير صحيح')
    .required('البريد الإلكتروني مطلوب'),
  password: Yup.string()
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .required('كلمة المرور مطلوبة'),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik<LoginValues>({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      try {
        await login(values);
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
          <div className="auth-icon">👤</div>
          <h2>تسجيل الدخول</h2>
          <p>أهلاً بعودتك، سعداء بك مجدداً</p>
        </div>

        {apiError && (
          <div className="alert alert-danger" role="alert" style={{ borderRadius: 8, fontSize: 14 }}>
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
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
              placeholder="أدخل كلمة المرور"
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
            {formik.isSubmitting ? 'جارٍ الدخول...' : 'دخول'}
          </button>
        </form>

        <p className="auth-footer-link">
          ليس لديك حساب؟{' '}
          <Link to="/auth/register">إنشاء حساب جديد</Link>
        </p>
      </div>
    </div>
  );
}
