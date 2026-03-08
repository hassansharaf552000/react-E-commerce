import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useCategories } from '../../context/CategoriesContext';
import { useSubCategories } from '../../context/SubCategoriesContext';
import { useCart } from '../../context/CartContext';
import fallbackImg from '../../assets/shopping.webp';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const categoryId = params.get('category');
  const subCategoryId = params.get('subCategory');
  const search = params.get('search') || '';

  const { products, totalCount, fetchProducts, loading, error } = useProducts();
  const { categories, fetchCategories } = useCategories();
  const { subCategories, fetchSubCategories } = useSubCategories();
  const { addToCart, items: cartItems } = useCart();

  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(search);
  const limit = 12;

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    fetchProducts({
      ...(categoryId && { category: categoryId }),
      ...(subCategoryId && { subCategory: subCategoryId }),
      ...(search && { search }),
      page,
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  }, [fetchProducts, categoryId, subCategoryId, search, page]);

  const activeCategoryName = categoryId
    ? categories.find((c) => c._id === categoryId)?.name
    : null;

  const filteredSubCategories = categoryId
    ? subCategories.filter((sc) => sc.category === categoryId)
    : [];

  const totalPages = Math.ceil(totalCount / limit);

  const handleSearch = () => {
    const p = new URLSearchParams(params);
    if (searchInput.trim()) p.set('search', searchInput.trim());
    else p.delete('search');
    p.delete('category');
    p.delete('subCategory');
    setParams(p);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    const p = new URLSearchParams(params);
    if (value) {
      p.set('category', value);
    } else {
      p.delete('category');
    }
    p.delete('subCategory');
    p.delete('search');
    setParams(p);
    setPage(1);
  };

  const handleSubCategoryChange = (value: string) => {
    const p = new URLSearchParams(params);
    if (value) {
      p.set('subCategory', value);
    } else {
      p.delete('subCategory');
    }
    p.delete('search');
    setParams(p);
    setPage(1);
  };

  const clearAllFilters = () => {
    setParams({});
    setSearchInput('');
    setPage(1);
  };

  const hasActiveFilters = categoryId || subCategoryId || search;

  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 4, fontSize: 28, color: '#161616' }}>
          {search
            ? `نتائج البحث: "${search}"`
            : activeCategoryName
              ? activeCategoryName
              : 'جميع المنتجات'}
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 0, fontSize: 15 }}>
          {totalCount} منتج {activeCategoryName ? `في ${activeCategoryName}` : 'متوفر'}
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 28,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div className="row g-3 align-items-end">
          {/* Search */}
          <div className="col-12 col-md-4">
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>
              بحث
            </label>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="ابحث عن منتج..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  borderRadius: 10,
                  border: '1px solid #d1d5db',
                  padding: '10px 14px',
                  fontSize: 14,
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  background: '#1b8354',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontSize: 14,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                🔍
              </button>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-6 col-md-3">
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>
              الفئة
            </label>
            <select
              className="form-select"
              value={categoryId || ''}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{
                borderRadius: 10,
                border: '1px solid #d1d5db',
                padding: '10px 14px',
                fontSize: 14,
                color: categoryId ? '#161616' : '#9ca3af',
                cursor: 'pointer',
              }}
            >
              <option value="">جميع الفئات</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SubCategory Dropdown */}
          <div className="col-6 col-md-3">
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, display: 'block' }}>
              الفئة الفرعية
            </label>
            <select
              className="form-select"
              value={subCategoryId || ''}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              disabled={!categoryId || filteredSubCategories.length === 0}
              style={{
                borderRadius: 10,
                border: '1px solid #d1d5db',
                padding: '10px 14px',
                fontSize: 14,
                color: subCategoryId ? '#161616' : '#9ca3af',
                cursor: categoryId ? 'pointer' : 'not-allowed',
                opacity: !categoryId ? 0.6 : 1,
              }}
            >
              <option value="">
                {!categoryId ? 'اختر فئة أولاً' : 'جميع الفئات الفرعية'}
              </option>
              {filteredSubCategories.map((sc) => (
                <option key={sc._id} value={sc._id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="col-12 col-md-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  background: 'transparent',
                  border: '1px solid #ef4444',
                  color: '#ef4444',
                  borderRadius: 10,
                  padding: '10px 16px',
                  fontSize: 14,
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 600,
                }}
              >
                ✕ مسح الفلاتر
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="d-flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
            {activeCategoryName && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#ecfdf5',
                  color: '#065f46',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                الفئة: {activeCategoryName}
                <button
                  onClick={() => handleCategoryChange('')}
                  style={{
                    background: 'none', border: 'none', color: '#065f46',
                    cursor: 'pointer', padding: 0, fontSize: 14, lineHeight: 1,
                  }}
                >✕</button>
              </span>
            )}
            {subCategoryId && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#eff6ff',
                  color: '#1e40af',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                الفرعية: {subCategories.find((sc) => sc._id === subCategoryId)?.name}
                <button
                  onClick={() => handleSubCategoryChange('')}
                  style={{
                    background: 'none', border: 'none', color: '#1e40af',
                    cursor: 'pointer', padding: 0, fontSize: 14, lineHeight: 1,
                  }}
                >✕</button>
              </span>
            )}
            {search && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#fef3c7',
                  color: '#92400e',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                بحث: {search}
                <button
                  onClick={() => {
                    const p = new URLSearchParams(params);
                    p.delete('search');
                    setParams(p);
                    setSearchInput('');
                    setPage(1);
                  }}
                  style={{
                    background: 'none', border: 'none', color: '#92400e',
                    cursor: 'pointer', padding: 0, fontSize: 14, lineHeight: 1,
                  }}
                >✕</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: '#1b8354', width: 48, height: 48 }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#6b7280', marginTop: 16 }}>جاري تحميل المنتجات...</p>
        </div>
      ) : error ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
          <p style={{ color: 'red', fontSize: 16 }}>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
          <h4 style={{ fontWeight: 700, color: '#161616', marginBottom: 8 }}>لا توجد منتجات</h4>
          <p style={{ color: '#6b7280', marginBottom: 20 }}>جرّب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
          <button onClick={clearAllFilters} className="dga-primary-btn" style={{ borderRadius: 10 }}>
            عرض جميع المنتجات
          </button>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product._id} className="col-6 col-lg-3">
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: 200,
                      background: 'linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {product.images?.[0] && product.images[0] !== 'string' ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          padding: 12,
                        }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImg; }}
                      />
                    ) : (
                      <span style={{ fontSize: 56, opacity: 0.4 }}>📦</span>
                    )}
                    {/* Stock Badge */}
                    {product.stock === 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: '#ef4444',
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 8,
                        }}
                      >
                        نفد المخزون
                      </span>
                    )}
                    {product.stock > 0 && product.stock <= 10 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: '#f59e0b',
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 8,
                        }}
                      >
                        كمية محدودة
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '16px 16px 20px' }}>
                    {/* SubCategory Tag */}
                    {product.subCategory && (
                      <span
                        style={{
                          display: 'inline-block',
                          background: '#ecfdf5',
                          color: '#059669',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 20,
                          marginBottom: 8,
                        }}
                      >
                        {product.subCategory.name}
                      </span>
                    )}

                    <h6
                      style={{
                        fontWeight: 700,
                        color: '#161616',
                        fontSize: 14,
                        marginBottom: 6,
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.name}
                    </h6>

                    <p
                      style={{
                        color: '#6b7280',
                        fontSize: 12,
                        marginBottom: 12,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </p>

                    {/* Price Row */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span style={{ color: '#1b8354', fontWeight: 700, fontSize: 18 }}>
                        {product.price} <span style={{ fontSize: 13 }}>ر.س</span>
                      </span>
                      {product.stock > 0 && (
                        <span style={{ color: '#9ca3af', fontSize: 12 }}>
                          متبقي {product.stock}
                        </span>
                      )}
                    </div>

                    <button
                      className="dga-primary-btn w-100"
                      style={{
                        borderRadius: 10,
                        padding: '10px',
                        fontSize: 14,
                        fontWeight: 600,
                        opacity: product.stock === 0 ? 0.5 : 1,
                      }}
                      disabled={product.stock === 0}
                      onClick={() => addToCart(product)}
                    >
                      {product.stock === 0
                        ? 'غير متوفر'
                        : cartItems.some((ci) => ci.product._id === product._id)
                          ? '✓ في السلة — أضف المزيد'
                          : '🛒 أضف إلى السلة'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="d-flex justify-content-center align-items-center gap-2 mt-5"
              style={{ paddingBottom: 20 }}
            >
              <button
                className="btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                style={{
                  borderRadius: 10,
                  border: '1px solid #d1d5db',
                  padding: '8px 20px',
                  fontWeight: 600,
                  color: page <= 1 ? '#d1d5db' : '#374151',
                }}
              >
                ← السابق
              </button>
              <div className="d-flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: pageNum === page ? 'none' : '1px solid #e5e7eb',
                        background: pageNum === page ? '#1b8354' : '#fff',
                        color: pageNum === page ? '#fff' : '#374151',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: 14,
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                className="btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                style={{
                  borderRadius: 10,
                  border: '1px solid #d1d5db',
                  padding: '8px 20px',
                  fontWeight: 600,
                  color: page >= totalPages ? '#d1d5db' : '#374151',
                }}
              >
                التالي →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
