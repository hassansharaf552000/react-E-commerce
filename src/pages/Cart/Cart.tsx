import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import type { ShippingAddress } from '../../types';
import fallbackImg from '../../assets/shopping.webp';

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [address, setAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handlePlaceOrder = async () => {
    setOrderError(null);
    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      setOrderError('يرجى ملء جميع حقول العنوان');
      return;
    }
    setPlacing(true);
    try {
      await createOrder({
        items: items.map((i) => ({ product: i.product._id, quantity: i.quantity })),
        shippingAddress: address,
      });
      clearCart();
      navigate('/orders');
    } catch (err: unknown) {
      setOrderError(err instanceof Error ? err.message : 'حدث خطأ أثناء إتمام الطلب');
    } finally {
      setPlacing(false);
    }
  };

  /* ---- EMPTY CART ---- */
  if (items.length === 0) {
    return (
      <div className="content-wrapper" style={{ paddingBlock: 40 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 24 }}>🛒 سلة التسوق</h2>
        <div
          className="text-center"
          style={{
            padding: '60px 20px',
            background: '#f9fafb',
            borderRadius: 16,
            border: '1px dashed #d2d6db',
          }}
        >
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <h4 style={{ fontWeight: 700, color: '#161616', marginBottom: 8 }}>سلتك فارغة</h4>
          <p style={{ color: '#384250', marginBottom: 24 }}>
            أضف منتجات إلى سلتك لتتمكن من إتمام عملية الشراء
          </p>
          <Link
            to="/products"
            className="dga-primary-btn"
            style={{ borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}
          >
            تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  /* ---- CART WITH ITEMS ---- */
  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 24 }}>🛒 سلة التسوق ({totalItems} منتج)</h2>

      <div className="row g-4">
        {/* ---- Items list ---- */}
        <div className="col-12 col-lg-8">
          {items.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="card mb-3 p-3"
              style={{ borderRadius: 14, border: '1px solid #e5e7eb' }}
            >
              <div className="d-flex gap-3 align-items-start">
                {/* Image */}
                <div
                  style={{
                    width: 100,
                    height: 100,
                    flexShrink: 0,
                    borderRadius: 12,
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {product.images?.[0] && product.images[0] !== 'string' ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = fallbackImg;
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 36, opacity: 0.4 }}>📦</span>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h6 style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{product.name}</h6>
                  <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 8 }}>
                    {product.description?.slice(0, 80)}
                  </p>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    {/* Quantity controls */}
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: '1px solid #d1d5db',
                          fontWeight: 700,
                          fontSize: 16,
                          padding: 0,
                        }}
                        onClick={() => updateQuantity(product._id, quantity - 1)}
                      >
                        −
                      </button>
                      <span style={{ fontWeight: 600, minWidth: 24, textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        className="btn btn-sm"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: '1px solid #d1d5db',
                          fontWeight: 700,
                          fontSize: 16,
                          padding: 0,
                        }}
                        disabled={quantity >= product.stock}
                        onClick={() => updateQuantity(product._id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className="btn btn-sm"
                      style={{ color: '#ef4444', fontWeight: 600, fontSize: 13 }}
                      onClick={() => removeFromCart(product._id)}
                    >
                      🗑️ حذف
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'end', flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, color: '#1b8354', fontSize: 17 }}>
                    {(product.price * quantity).toFixed(2)} ر.س
                  </div>
                  {quantity > 1 && (
                    <div style={{ color: '#9ca3af', fontSize: 12 }}>{product.price} × {quantity}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Summary sidebar ---- */}
        <div className="col-12 col-lg-4">
          <div
            className="card p-4"
            style={{
              borderRadius: 16,
              border: '1px solid #e5e7eb',
              position: 'sticky',
              top: 20,
            }}
          >
            <h5 style={{ fontWeight: 700, marginBottom: 16 }}>ملخص الطلب</h5>
            <div className="d-flex justify-content-between mb-2" style={{ fontSize: 14 }}>
              <span style={{ color: '#6b7280' }}>عدد المنتجات</span>
              <span style={{ fontWeight: 600 }}>{totalItems}</span>
            </div>
            <div
              className="d-flex justify-content-between mb-3 pb-3"
              style={{ borderBottom: '1px solid #f3f4f6', fontSize: 14 }}
            >
              <span style={{ color: '#6b7280' }}>المجموع الفرعي</span>
              <span style={{ fontWeight: 600 }}>{totalPrice.toFixed(2)} ر.س</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span style={{ fontWeight: 700, fontSize: 16 }}>الإجمالي</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: '#1b8354' }}>
                {totalPrice.toFixed(2)} ر.س
              </span>
            </div>

            {!checkoutOpen ? (
              <button
                className="dga-primary-btn w-100"
                style={{ borderRadius: 10, padding: 12, fontWeight: 700, fontSize: 15 }}
                onClick={() => setCheckoutOpen(true)}
              >
                إتمام الشراء
              </button>
            ) : (
              <>
                <h6 style={{ fontWeight: 700, marginBottom: 12 }}>عنوان الشحن</h6>
                {(
                  [
                    { key: 'street', label: 'الشارع' },
                    { key: 'city', label: 'المدينة' },
                    { key: 'state', label: 'المنطقة' },
                    { key: 'zipCode', label: 'الرمز البريدي' },
                    { key: 'country', label: 'الدولة' },
                  ] as { key: keyof ShippingAddress; label: string }[]
                ).map(({ key, label }) => (
                  <input
                    key={key}
                    className="form-control mb-2"
                    placeholder={label}
                    value={address[key]}
                    onChange={(e) => setAddress((prev) => ({ ...prev, [key]: e.target.value }))}
                    style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px' }}
                  />
                ))}
                {orderError && (
                  <p style={{ color: '#ef4444', fontSize: 13, marginTop: 4 }}>{orderError}</p>
                )}
                <button
                  className="dga-primary-btn w-100 mt-3"
                  style={{
                    borderRadius: 10,
                    padding: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    opacity: placing ? 0.6 : 1,
                  }}
                  disabled={placing}
                  onClick={handlePlaceOrder}
                >
                  {placing ? 'جارٍ تأكيد الطلب...' : 'تأكيد الطلب'}
                </button>
                <button
                  className="btn w-100 mt-2"
                  style={{ fontSize: 13, color: '#6b7280' }}
                  onClick={() => setCheckoutOpen(false)}
                >
                  العودة
                </button>
              </>
            )}

            <button
              className="btn w-100 mt-3"
              style={{ color: '#ef4444', fontWeight: 600, fontSize: 13 }}
              onClick={clearCart}
            >
              🗑️ تفريغ السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
