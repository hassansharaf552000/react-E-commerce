import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom main-navbar p-0 fw-medium content-wrapper">
        <div className="w-100 align-items-center d-flex content-wrapper justify-content-between">

          {/* Logo */}
          <NavLink className="navbar-brand order-1 py-2 mx-0" to="/" aria-label="Logo">
            <span className="brand-name fw-bold" style={{ fontSize: 22, color: '#1b8354', letterSpacing: 1 }}>
              🛒 MyStore
            </span>
          </NavLink>

          {/* Toggler (mobile) */}
          <button
            className="navbar-toggler border-0 px-0"
            type="button"
            onClick={() => setOffcanvasOpen(true)}
            aria-label="Open menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Icons (desktop) */}
          <div className="top-icons d-none d-lg-flex align-items-center gap-4 ms-auto order-lg-3">
            <NavLink to="/cart" className="text-decoration-none default-color mx-2 nav-font-size" aria-label="Cart">
              🛒 <span style={{ fontSize: 13 }}>السلة</span>
            </NavLink>
            <NavLink to="/auth/login" className="text-decoration-none default-color mx-2 nav-font-size" aria-label="Account">
              👤 <span style={{ fontSize: 13 }}>حسابي</span>
            </NavLink>
          </div>

          {/* Menu (desktop) */}
          <div className="collapse navbar-collapse order-lg-2 mx-2">
            <ul className="navbar-nav mb-2 mb-lg-0 ps-1">

              {/* Home */}
              <li className="nav-item">
                <NavLink className="nav-link p-navbar nav-font-size" to="/" end data-page="home">
                  الرئيسية
                </NavLink>
              </li>

              {/* Products (Dropdown) */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle p-navbar nav-font-size"
                  href="#"
                  id="megaProducts"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-page="products"
                >
                  المنتجات
                </a>
                <div
                  className="dropdown-menu mega-menu dropdown-menu-end p-0 border-0"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                  aria-labelledby="megaProducts"
                >
                  <div className="mega-inner p-4">
                    <ul className="list-unstyled mega-list row g-4 px-5">
                      <div className="col-12 col-lg-6 p-0 mt-4">
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products?category=electronics">
                            الإلكترونيات
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products?category=clothing">
                            الملابس
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products?category=home">
                            المنزل والمطبخ
                          </Link>
                        </li>
                      </div>
                      <div className="col-12 col-lg-6 p-0 mt-4">
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products?category=beauty">
                            العناية والجمال
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products?category=sports">
                            الرياضة
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item nav-font-size" to="/products">
                            جميع المنتجات
                          </Link>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>

              {/* Offers */}
              <li className="nav-item">
                <NavLink className="nav-link p-navbar nav-font-size" to="/offers" data-page="offers">
                  العروض
                </NavLink>
              </li>

              {/* About */}
              <li className="nav-item">
                <NavLink className="nav-link p-navbar nav-font-size" to="/about" data-page="about">
                  من نحن
                </NavLink>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <NavLink className="nav-link p-navbar nav-font-size" to="/contact" data-page="contact">
                  اتصل بنا
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== Offcanvas (mobile) ===== */}
      {offcanvasOpen && (
        <div
          className="offcanvas-backdrop-custom"
          onClick={() => setOffcanvasOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)', zIndex: 1040,
          }}
        />
      )}
      <div
        className={`offcanvas offcanvas-end w-100${offcanvasOpen ? ' show' : ''}`}
        style={{
          visibility: offcanvasOpen ? 'visible' : 'hidden',
          zIndex: 1045,
          transition: 'transform 0.3s ease',
        }}
        tabIndex={-1}
        id="mainMenu"
        aria-labelledby="mainMenuLabel"
      >
        <div className="offcanvas-header">
          <div>
            <span className="fw-bold" style={{ fontSize: 20, color: '#1b8354' }}>🛒 MyStore</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button type="button" className="btn p-0" onClick={() => setOffcanvasOpen(false)}>
              ✕
            </button>
          </div>
        </div>

        <div className="offcanvas-body">
          <div className="nav">
            {/* Home */}
            <div className="nav__item" aria-expanded="false">
              <Link
                className="nav__btn fw-semibold default-color text-decoration-none"
                to="/"
                onClick={() => setOffcanvasOpen(false)}
              >
                الرئيسية
              </Link>
            </div>

            {/* Products submenu */}
            <div className="nav__item fw-semibold" aria-expanded={openSubmenu === 'products' ? 'true' : 'false'}>
              <button
                className="nav__btn default-color fw-semibold d-flex justify-content-between"
                type="button"
                onClick={() => toggleSubmenu('products')}
              >
                <span>المنتجات</span>
                <span
                  className={`transition-icon${openSubmenu === 'products' ? ' rotate-180' : ''}`}
                  style={{ display: 'inline-block' }}
                >▾</span>
              </button>
              <div className={`collapse submenu${openSubmenu === 'products' ? ' show' : ''}`}>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products?category=electronics" onClick={() => setOffcanvasOpen(false)}>الإلكترونيات</Link>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products?category=clothing" onClick={() => setOffcanvasOpen(false)}>الملابس</Link>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products?category=home" onClick={() => setOffcanvasOpen(false)}>المنزل والمطبخ</Link>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products?category=beauty" onClick={() => setOffcanvasOpen(false)}>العناية والجمال</Link>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products?category=sports" onClick={() => setOffcanvasOpen(false)}>الرياضة</Link>
                <Link className="fw-semibold text-decoration-none ms-3" to="/products" onClick={() => setOffcanvasOpen(false)}>جميع المنتجات</Link>
              </div>
            </div>

            {/* Offers */}
            <div className="nav__item" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/offers" onClick={() => setOffcanvasOpen(false)}>
                العروض
              </Link>
            </div>

            {/* About */}
            <div className="nav__item" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/about" onClick={() => setOffcanvasOpen(false)}>
                من نحن
              </Link>
            </div>

            {/* Contact */}
            <div className="nav__item fw-semibold" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/contact" onClick={() => setOffcanvasOpen(false)}>
                اتصل بنا
              </Link>
            </div>

            {/* Auth / Cart */}
            <div className="nav__item" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/cart" onClick={() => setOffcanvasOpen(false)}>
                🛒 السلة
              </Link>
            </div>
            <div className="nav__item" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/auth/login" onClick={() => setOffcanvasOpen(false)}>
                👤 تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

