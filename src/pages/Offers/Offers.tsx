export default function Offers() {
  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 8 }}>العروض الحصرية 🎉</h2>
      <p style={{ color: '#384250', marginBottom: 32 }}>اكتشف أفضل العروض والخصومات المتاحة الآن</p>

      <div className="row g-4">
        {[
          { title: 'خصم 30% على الإلكترونيات', expires: '31/03/2026', emoji: '📱' },
          { title: 'اشترِ 2 واحصل على 1 مجاناً — الملابس', expires: '15/03/2026', emoji: '👕' },
          { title: 'شحن مجاني لجميع الطلبات فوق 200 ر.س', expires: '30/04/2026', emoji: '🚚' },
        ].map((offer) => (
          <div key={offer.title} className="col-12 col-lg-4">
            <div
              className="card p-4 h-100"
              style={{ borderRadius: 16, borderLeft: '4px solid #1b8354' }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{offer.emoji}</div>
              <h5 style={{ fontWeight: 700, color: '#161616' }}>{offer.title}</h5>
              <p style={{ color: '#384250', fontSize: 14 }}>ينتهي في: {offer.expires}</p>
              <button className="dga-primary-btn mt-auto" style={{ borderRadius: 8 }}>
                تسوق الآن
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
