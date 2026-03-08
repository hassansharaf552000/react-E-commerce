import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Last updated bar */}
      <div className="margin-bottom-16 content-wrapper" style={{ fontSize: 14, color: '#161616', lineHeight: '20px' }}>
        <span>تاريخ آخر تحديث: </span>
        <span>{new Date().toLocaleDateString('ar-SA')}</span>
      </div>

      <footer className="site-footer" aria-label="Site footer">
        <div className="content-wrapper">
          <div className="row align-items-start g-4">

            {/* Quick Links */}
            <div className="col-lg-3 col-12">
              <p className="fw-medium pb-2 mb-2 footer-border">روابط سريعة</p>
              <ul className="d-flex flex-column gap-2 p-0" style={{ listStyle: 'none' }}>
                <li><Link to="/" className="text-white text-decoration-none footer-list">الرئيسية</Link></li>
                <li><Link to="/products" className="text-white text-decoration-none footer-list">المنتجات</Link></li>
                <li><Link to="/about" className="text-white text-decoration-none footer-list">من نحن</Link></li>
                <li><Link to="/contact" className="text-white text-decoration-none footer-list">اتصل بنا</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="col-lg-3 col-12">
              <p className="fw-medium pb-2 mb-2 footer-border">خدمة العملاء</p>
              <ul className="d-flex flex-column gap-2 p-0" style={{ listStyle: 'none' }}>
                <li>دعم المبيعات والخدمة</li>
                <li>
                  <a className="text-white text-decoration-none footer-list" href="tel:+966112345678">
                    +966 11 234 5678
                  </a>
                </li>
                <li>الاثنين – الجمعة: 9:00 – 20:00</li>
                <li>السبت: 9:00 – 15:00</li>
                <li>
                  <span>بريد إلكتروني: </span>
                  <a className="text-white text-decoration-none footer-list" href="mailto:support@mystore.sa">
                    support@mystore.sa
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="col-lg-3 col-12">
              <p className="fw-medium pb-2 mb-2 footer-border">العنوان</p>
              <ul className="d-flex flex-column gap-2 p-0" style={{ listStyle: 'none' }}>
                <li>
                  <a
                    className="text-white text-decoration-none footer-list"
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    المملكة العربية السعودية، الرياض، 11564
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & App */}
            <div className="col-lg-3 col-12">
              <div>
                <p className="fw-medium pb-2 mb-2 footer-border">تابعونا على</p>
                <div className="d-flex align-items-center gap-2 social mb-3">
                  <div className="d-flex align-items-center justify-content-center padding-social cursor-pointer">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                      <span style={{ fontSize: 20, color: '#fff' }}>📸</span>
                    </a>
                  </div>
                  <div className="d-flex align-items-center justify-content-center padding-social cursor-pointer">
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter">
                      <span style={{ fontSize: 20, color: '#fff' }}>𝕏</span>
                    </a>
                  </div>
                  <div className="d-flex align-items-center justify-content-center padding-social cursor-pointer">
                    <a href="https://snapchat.com" target="_blank" rel="noreferrer" aria-label="Snapchat">
                      <span style={{ fontSize: 20, color: '#fff' }}>👻</span>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <p className="fw-medium pb-2 mb-2 footer-border mt-3 mt-md-0">
                  حمّل تطبيقنا
                </p>
                <div className="d-flex align-items-center gap-2">
                  <a href="https://play.google.com" target="_blank" rel="noreferrer">
                    <span
                      className="text-white border rounded px-2 py-1"
                      style={{ fontSize: 12, whiteSpace: 'nowrap' }}
                    >
                      ▶ Google Play
                    </span>
                  </a>
                  <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                    <span
                      className="text-white border rounded px-2 py-1"
                      style={{ fontSize: 12, whiteSpace: 'nowrap' }}
                    >
                       App Store
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="d-flex flex-lg-row flex-column justify-content-between align-items-lg-center align-items-start footer-rights gap-4 mt-4 fs-14">
            <div className="d-flex flex-column align-items-center order-1 order-lg-0 wfull">
              <p className="fw-semibold my-2">
                جميع الحقوق محفوظة لـ MyStore {year} ©
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 gap-lg-3">
              <span className="fw-bold" style={{ fontSize: 18, color: '#fff', letterSpacing: 1 }}>
                🛒 MyStore
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

