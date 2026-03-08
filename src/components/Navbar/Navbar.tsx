import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCategories } from '../../context/CategoriesContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { categories, fetchCategories } = useCategories();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setOffcanvasOpen(false);
    navigate('/auth/login');
  };

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
            <NavLink to="/cart" className="text-decoration-none default-color mx-2 nav-font-size" aria-label="Cart" style={{ position: 'relative' }}>
              🛒 <span style={{ fontSize: 13 }}>السلة</span>
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -10,
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </NavLink>

            {/* Account dropdown */}
            <div ref={accountRef} style={{ position: 'relative' }}>
              <button
                className="btn p-0 border-0 d-flex align-items-center gap-1 default-color nav-font-size"
                onClick={() => setAccountOpen((prev) => !prev)}
                aria-label="Account"
                style={{ background: 'none', cursor: 'pointer' }}
              >
                👤 <span style={{ fontSize: 13 }}>{user?.name || 'حسابي'}</span>
                <span style={{ fontSize: 10, marginTop: 2 }}>▾</span>
              </button>
              {accountOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    minWidth: 200,
                    zIndex: 1050,
                    padding: '16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 6 }}>👤</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{user?.name}</div>
                  <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 4 }}>{user?.email}</div>
                  <div style={{ color: '#9ca3af', fontSize: 12, marginBottom: 12 }}>{user?.role}</div>
                  <Link
                    to="/orders"
                    onClick={() => setAccountOpen(false)}
                    className="btn btn-sm w-100 mb-2"
                    style={{
                      background: '#1b8354',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600,
                      padding: '6px 0',
                      textDecoration: 'none',
                    }}
                  >
                    📦 طلباتي
                  </Link>
                  <button
                    className="btn btn-sm w-100"
                    onClick={handleLogout}
                    style={{
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 600,
                      padding: '6px 0',
                    }}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
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
                        {categories.slice(0, Math.ceil(categories.length / 2)).map((cat) => (
                          <li key={cat._id}>
                            <Link className="dropdown-item nav-font-size" to={`/products?category=${cat._id}`}>
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                      <div className="col-12 col-lg-6 p-0 mt-4">
                        {categories.slice(Math.ceil(categories.length / 2)).map((cat) => (
                          <li key={cat._id}>
                            <Link className="dropdown-item nav-font-size" to={`/products?category=${cat._id}`}>
                              {cat.name}
                            </Link>
                          </li>
                        ))}
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
                {categories.map((cat) => (
                  <Link key={cat._id} className="fw-semibold text-decoration-none ms-3" to={`/products?category=${cat._id}`} onClick={() => setOffcanvasOpen(false)}>{cat.name}</Link>
                ))}
                <Link className="fw-semibold text-decoration-none ms-3" to="/products" onClick={() => setOffcanvasOpen(false)}>جميع المنتجات</Link>
              </div>
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
                🛒 السلة {totalItems > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: 11, borderRadius: '50%', padding: '2px 7px', marginInlineStart: 6 }}>{totalItems}</span>}
              </Link>
            </div>
            {/* Orders (mobile) */}
            <div className="nav__item" aria-expanded="false">
              <Link className="nav__btn fw-semibold default-color text-decoration-none" to="/orders" onClick={() => setOffcanvasOpen(false)}>
                📦 طلباتي
              </Link>
            </div>
            {/* User info + logout (mobile) */}
            <div className="nav__item" aria-expanded="false" style={{ borderTop: '1px solid #e5e7eb', paddingTop: 12, marginTop: 8 }}>
              <div style={{ padding: '8px 0' }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>👤 {user?.name}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>{user?.email}</div>
                <div style={{ color: '#9ca3af', fontSize: 12 }}>{user?.role}</div>
              </div>
              <button
                className="nav__btn fw-semibold text-decoration-none btn p-0 w-100 text-start"
                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}
                onClick={handleLogout}
              >
                🚪 تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

