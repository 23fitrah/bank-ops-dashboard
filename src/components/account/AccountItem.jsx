import { Pencil, Trash2 } from "lucide-react";

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function AccountItem({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td>{item.Name}</td>
      <td>{item.Category || "-"}</td>
      <td>{formatRupiah(item.Price)}</td>
      <td>
        <span className={`badge ${item.Stock <= 5 ? "badge-warning" : "badge-ok"}`}>
          {item.Stock} unit
        </span>
      </td>
      <td>
        <div className="row-actions">
          <button className="icon-btn" onClick={() => onEdit(item)} title="Edit">
            <Pencil size={16} />
          </button>
          <button className="icon-btn icon-btn-danger" onClick={() => onDelete(item)} title="Hapus">
            <Trash2 size={16} />
          </button>
        </div>
      </td>

      <style>{`
        .badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }
        .badge-ok {
          background: var(--color-accent-soft);
          color: var(--color-accent);
        }
        .badge-warning {
          background: #fef3e0;
          color: var(--color-warning);
        }
        .row-actions {
          display: flex;
          gap: 6px;
        }
        .icon-btn {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 6px;
          color: var(--color-text-muted);
        }
        .icon-btn:hover {
          background: #f0f2f5;
        }
        .icon-btn-danger:hover {
          background: var(--color-danger-soft);
          color: var(--color-danger);
          border-color: transparent;
        }
      `}</style>
    </tr>
  );
}
