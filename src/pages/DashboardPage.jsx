import { useEffect, useState } from "react";
import { Package, Layers, AlertTriangle, BanknoteX, BanknoteArrowUp, UserStar, Landmark} from "lucide-react";
import { getProducts } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/common/Loading";

export default function DashboardPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.payload))
      .finally(() => setLoading(false));
  }, []);
  const totalSuccess="92.353.032"
  const totalFailed = "12"//products.reduce((sum, p) => sum + p.Stock, 0);
  const totalAcct = "450.000"//products.filter((p) => p.Stock <= 5).length;
  const totalNostro = "35"//new Set(products.map((p) => p.Category).filter(Boolean)).size;

  if (loading) return <Loading label="Memuat ringkasan..." />;

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <h2>Halo, {user?.name || "Admin"} 👋</h2>
        <p>Berikut ringkasan kamu hari ini.</p>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon stat-icon-accent">
            <BanknoteArrowUp size={20} />
          </div>
          <div>
            <p className="stat-label">Total Transfer Sukses</p>
            <h3>{totalSuccess}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon stat-icon-danger">
            <BanknoteX size={20} />
          </div>
          <div>
            <p className="stat-label">Total Transfer Gagal</p>
            <h3>{totalFailed}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon stat-icon-warning">
            <UserStar size={20} />
          </div>
          <div>
            <p className="stat-label">Total Rekening Tabungan</p>
            <h3>{totalAcct}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon stat-icon-accent">
            <Landmark size={20} />
          </div>
          <div>
            <p className="stat-label">Total Rekening Nostro</p>
            <h3>{totalNostro}</h3>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-welcome {
          margin-bottom: 20px;
        }
        .dashboard-welcome h2 {
          font-size: 20px;
          margin-bottom: 4px;
        }
        .dashboard-welcome p {
          color: var(--color-text-muted);
          font-size: 14px;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .stat-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-icon-accent {
          background: var(--color-accent-soft);
          color: var(--color-accent);
        }
        .stat-icon-warning {
          background: #fef3e0;
          color: var(--color-warning);
        }
        .stat-icon-danger {
          background: #fee0e6;
          color: var(--color-danger);
        }
        .stat-icon-purple {
          background: #ece9fe;
          color: #6d5bd0;
        }
        .stat-label {
          font-size: 12px;
          color: var(--color-text-muted);
          margin-bottom: 2px;
        }
        .stat-card h3 {
          font-size: 22px;
        }
      `}</style>
    </div>
  );
}
