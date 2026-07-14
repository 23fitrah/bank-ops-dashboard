import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Kembali ke Dashboard
      </Link>

      <style>{`
        .notfound-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
        }
        .notfound-page h1 {
          font-size: 64px;
          color: var(--color-accent);
        }
        .notfound-page p {
          color: var(--color-text-muted);
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
