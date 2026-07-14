import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAccount } from "../../hooks/useAccount";
import UserItem from "./AccountItem";
import UserForm from "./AccountForm";
import Loading from "../common/Loading";

export default function AccountList() {
  const { items, loading, error,  page,
    limit,
    search,
    totalPages,
    totalItems,
    setLimit,
    setSearch,
    goToPage, 
    addItem, 
    editItem, 
    removeItem 
  } = useAccount();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [query, setQuery] = useState("");
  const [deletingItem, setDeletingItem] = useState(null);

  const filtered = items.filter((item) =>
    item.Name.toLowerCase().includes(query.toLowerCase())
  );

  const openCreateForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    if (editingItem) {
      await editItem(editingItem.Id, data);
    } else {
      await addItem(data);
    }
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;
    await removeItem(deletingItem.Id);
    setDeletingItem(null);
  };

  const startRow = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endRow = Math.min(page * limit, totalItems);

  return (
    <div className="user-list">
      <div className="user-list-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder="Cari produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={openCreateForm}>
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      <div className="card table-card">
        {loading ? (
          <Loading label="Memuat data produk..." />
        ) : error ? (
          <p className="empty-state">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">Belum ada produk. Klik "Tambah Produk" untuk mulai.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th><b>Nama</b></th>
                <th><b>Kategori</b></th>
                <th><b>Harga</b></th>
                <th><b>Stok</b></th>
                <th><b>Aksi</b></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <UserItem
                  key={item.Id}
                  item={item}
                  onEdit={openEditForm}
                  onDelete={setDeletingItem}
                />
              ))}
            </tbody>
          </table>
        )}
        {/*{!loading && !error && totalItems > 0  */}
        {true && (
          <div className="pagination-bar">
            <div className="pagination-info">
              <span>
                Menampilkan {startRow}-{endRow} dari {totalItems} produk
              </span>
              <select
                className="pagination-limit"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={5}>5 / halaman</option>
                <option value={10}>10 / halaman</option>
                <option value={25}>25 / halaman</option>
                <option value={50}>50 / halaman</option>
              </select>
            </div>

            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft size={16} />
              </button>

              <span className="pagination-page">
                Halaman {page} dari {totalPages}
              </span>

              <button
                className="pagination-btn"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <UserForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {deletingItem && (
        <div className="modal-overlay" onClick={() => setDeletingItem(null)}>
          <div className="confirm-panel" onClick={(e) => e.stopPropagation()}>
            <h3>Hapus produk?</h3>
            <p>
              Yakin ingin menghapus <strong>{deletingItem.Name}</strong>? Aksi ini tidak bisa dibatalkan.
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setDeletingItem(null)}>
                Batal
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .user-list-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--color-text-muted);
          min-width: 220px;
        }
        .search-box input {
          border: none;
          outline: none;
          font-size: 14px;
          width: 100%;
        }
        .table-card {
          overflow-x: auto;
        }
        .empty-state {
          padding: 40px 20px;
          text-align: center;
          color: var(--color-text-muted);
          font-size: 14px;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 20, 30, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
        }
        .confirm-panel {
          background: #fff;
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 380px;
          width: 100%;
        }
        .confirm-panel p {
          font-size: 14px;
          color: var(--color-text-muted);
          margin: 8px 0 20px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
          
      .pagination-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-top: 1px solid var(--color-border);
          flex-wrap: wrap;
        }

        .pagination-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--color-text-muted);
        }
        .pagination-limit {
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 5px 8px;
          font-size: 13px;
          color: var(--color-text);
          outline: none;
        }
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
          .pagination-page {
          font-size: 13px;
          color: var(--color-text-muted);
          white-space: nowrap;
        }
        .pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          background: #fff;
          color: var(--color-text);
        }
        .pagination-btn:hover:not(:disabled) {
          background: #f0f2f5;
        }
        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
