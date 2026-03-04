import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="content-wrapper" style={{ paddingBlock: 40 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 8 }}>اتصل بنا</h2>
      <p style={{ color: '#384250', marginBottom: 32 }}>يسعدنا سماع رأيك أو الإجابة عن استفساراتك</p>

      {sent ? (
        <div className="alert alert-success" role="alert">
          تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
          <div className="mb-3">
            <label htmlFor="name">الاسم الكامل</label>
            <input id="name" type="text" className="form-control" placeholder="أدخل اسمك" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input id="email" type="email" className="form-control" placeholder="example@email.com" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message">الرسالة</label>
            <textarea id="message" className="form-control" rows={5} placeholder="اكتب رسالتك هنا..." required />
          </div>
          <button type="submit" className="dga-primary-btn" style={{ borderRadius: 8 }}>
            إرسال الرسالة
          </button>
        </form>
      )}
    </div>
  );
}
