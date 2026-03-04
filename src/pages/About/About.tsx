export default function About() {
  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 16 }}>من نحن</h2>
      <p style={{ color: '#1f2a37', fontSize: 18, lineHeight: '30px', marginBottom: 24 }}>
        MyStore هو متجر إلكتروني سعودي رائد يقدم أفضل المنتجات من مختلف الفئات بأسعار تنافسية وجودة عالية.
        نسعى دائماً لتقديم تجربة تسوق سهلة وآمنة لعملائنا في جميع أنحاء المملكة العربية السعودية.
      </p>

      <div className="row g-4 margin-top-24">
        {[
          { label: 'سنوات الخبرة', value: '10+', emoji: '🏆' },
          { label: 'منتج متاح', value: '5,000+', emoji: '📦' },
          { label: 'عميل سعيد', value: '100,000+', emoji: '😊' },
        ].map((stat) => (
          <div key={stat.label} className="col-4 text-center">
            <div style={{ fontSize: 36 }}>{stat.emoji}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#1b8354' }}>{stat.value}</div>
            <div style={{ color: '#384250' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
