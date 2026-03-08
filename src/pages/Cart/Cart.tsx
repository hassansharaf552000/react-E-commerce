import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext';

export default function Cart() {
  const { orders, fetchOrders, loading, error } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 24 }}>🛒 سلة التسوق</h2>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : orders.length === 0 ? (
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
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="card mb-3 p-4"
              style={{ borderRadius: 16 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 style={{ fontWeight: 700, marginBottom: 4 }}>
                    طلب #{order._id.slice(-6)}
                  </h5>
                  <small style={{ color: '#384250' }}>
                    {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                  </small>
                </div>
                <span
                  style={{
                    background:
                      order.status === 'pending'
                        ? '#fff3cd'
                        : order.status === 'delivered'
                          ? '#d4edda'
                          : '#f8d7da',
                    color:
                      order.status === 'pending'
                        ? '#856404'
                        : order.status === 'delivered'
                          ? '#155724'
                          : '#721c24',
                    padding: '4px 12px',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {order.status === 'pending'
                    ? 'قيد الانتظار'
                    : order.status === 'delivered'
                      ? 'تم التوصيل'
                      : order.status}
                </span>
              </div>

              <div className="mb-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="d-flex justify-content-between py-1"
                    style={{ borderBottom: '1px solid #f3f4f6' }}
                  >
                    <span>المنتج: {item.product}</span>
                    <span>الكمية: {item.quantity}</span>
                    {item.price != null && <span>{item.price} ر.س</span>}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span style={{ fontWeight: 700 }}>الإجمالي:</span>
                <span style={{ fontWeight: 700, color: '#1b8354', fontSize: 18 }}>
                  {order.totalAmount} ر.س
                </span>
              </div>

              <div className="mt-2" style={{ fontSize: 13, color: '#384250' }}>
                <p className="mb-0">
                  العنوان: {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
