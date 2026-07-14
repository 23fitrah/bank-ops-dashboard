export default function Loading({ label = "Memuat..." }) {
  return (
    <div className="loading-wrap">
      <div className="loading-spinner" />
      <p>{label}</p>
      <style>{`
        .loading-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 60px 20px;
          color: var(--color-text-muted);
          font-size: 14px;
        }
        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--color-border);
          border-top-color: var(--color-accent);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
