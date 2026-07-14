import AccountList from "../components/account/AccountList";

export default function AccountPage() {
  return (
    <div className="users-page">
      <div className="page-header">
        <h2>Manajemen Produk</h2>
        <p>Tambah, ubah, atau hapus data produk di sini.</p>
      </div>
      <AccountList />

      <style>{`
        .page-header {
          margin-bottom: 20px;
        }
        .page-header h2 {
          font-size: 20px;
          margin-bottom: 4px;
        }
        .page-header p {
          color: var(--color-text-muted);
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
