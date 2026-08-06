import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <button className="navbar-menu-btn" onClick={onMenuClick} aria-label="Buka menu">
        <Menu size={20} />
      </button>

      <div className="navbar-title">
        <h1>Dashboard</h1>
      </div>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <span className="navbar-user-name">{user?.email || "User"}</span>
          <span className="navbar-user-role">{user?.role || "member"}</span>
        </div>
        <div className="navbar-avatar">
          <User size={18} />
        </div>
        <button className="navbar-logout" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>

      <style>{`
        .navbar {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 24px;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .navbar-menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-text);
        }
        .navbar-title h1 {
          font-size: 16px;
          font-weight: 700;
        }
        .navbar-user {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .navbar-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1.3;
        }
        .navbar-user-name {
          font-size: 13px;
          font-weight: 600;
        }
        .navbar-user-role {
          font-size: 11px;
          color: var(--color-text-muted);
          text-transform: capitalize;
        }
        .navbar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-accent-soft);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .navbar-logout {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 8px;
          color: var(--color-text-muted);
        }
        .navbar-logout:hover {
          background: var(--color-danger-soft);
          color: var(--color-danger);
          border-color: transparent;
        }

        @media (max-width: 900px) {
          .navbar-menu-btn {
            display: block;
          }
          .navbar-user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
