import { useState } from 'react';
import './Topbar.css';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-neutral">
      <div className="content-wrapper">
        <div className="rounded-0 py-2 topbar">
          <div className="inner-box d-flex">
            <div>
              <span className="topbar-shield">🛡️</span>
            </div>

            <div className="d-flex flex-sm-row flex-column gap-sm-0 gap-2 align-items-start mx-2">
              <span className="title">
                متجر إلكتروني موثوق — تسوق بأمان وثقة
              </span>

              <span
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: 'pointer' }}
                aria-expanded={isOpen}
              >
                <div className="mx-lg-2 mx-0 d-flex">
                  <span className="fw-normal px-1 check">كيف تتحقق؟</span>
                  <span
                    className={`transition-icon${isOpen ? ' rotate-180' : ''}`}
                    style={{ display: 'inline-block', fontSize: 14 }}
                  >
                    ▾
                  </span>
                </div>
              </span>
            </div>
          </div>

          <div className="footer-parent">
            <div
              className={`topbar-footer border-0 pb-4 px-1${isOpen ? ' show' : ''}`}
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <div className="row">
                {/* Secure Payment */}
                <div className="col-md-6 d-flex mt-4 mx-0 px-2">
                  <div className="topbar-link">
                    <span style={{ fontSize: 20 }}>🔒</span>
                  </div>
                  <div className="header-title mx-3">
                    <div className="topbar-title">
                      <span>المدفوعات تُجرى عبر بوابات آمنة ومشفرة بـ</span>{' '}
                      <span className="text-success">SSL / HTTPS</span>
                    </div>
                    <p className="mb-0 primary-color">
                      جميع المعاملات المالية على هذا المتجر محمية بتشفير من أعلى المستويات لضمان أمان بياناتك.
                    </p>
                  </div>
                </div>

                {/* Verified Seller */}
                <div className="col-md-6 d-flex mt-4 mx-0 px-2">
                  <div className="topbar-link">
                    <span style={{ fontSize: 20 }}>✅</span>
                  </div>
                  <div className="header-title mx-3">
                    <div className="topbar-title">
                      <span>متجر معتمد ومسجل رسمياً</span>
                    </div>
                    <p className="mb-0 primary-color">
                      تحقق من شعار الاعتماد وتفاصيل التسجيل في أسفل الصفحة للتأكد من موثوقية المتجر.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="col-12 text-muted small banner-footer d-flex align-items-center">
                  <span style={{ fontSize: 20, marginLeft: 8 }}>🏪</span>
                  <span className="mx-2">متجر إلكتروني معتمد — رقم السجل التجاري:</span>
                  <strong className="mx-1">1234567890</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

