import { NavLink ,useLocation} from "react-router-dom";
import { useState } from "react"
import { LayoutDashboard, Package, X, ChevronDown, User, MonitorDot, UserRoundSearch, List, Banknote } from "lucide-react";
import logo from "../../assets/img/logo-dashboard.png";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard ,},
  { to: "/products", label: "Transfer Uang", icon: Banknote },
  {
    label: "Account",
    icon: User,
    children: [
      { to: "/products", label: " Inquiry Account" , icon: UserRoundSearch},
      { to: "/account", label: " List Account", icon:List},
    ],
  },
    { to: "/", label: "Log Monitoring", icon: MonitorDot },

];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isParentActive = (children) =>
    children?.some((child) => location.pathname === child.to);
  return (
    <>
      {/* Overlay untuk mobile */}
      {open && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
             <img src={logo} alt="Logo" width={30} height={30}/>
            <span className="sidebar-logo-text">AdminPanel</span>
          </div>
          <button className="sidebar-close" onClick={onClose} aria-label="Tutup menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
              const Icon = item.icon

              if (!item.children) {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
                    onClick={onClose}
                  >
                  <Icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                ) 
              }

              const expanded = openMenus[item.label] || isParentActive(item.children);

            return (
              <div key={item.label} className="sidebar-group">
                <button
                  className={`sidebar-link sidebar-parent ${isParentActive(item.children) ? "sidebar-link-active" : ""}`}
                  onClick={() => toggleMenu(item.label)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`sidebar-chevron ${expanded ? "sidebar-chevron-open" : ""}`}
                  />
                </button>

                <div className={`sidebar-submenu ${expanded ? "sidebar-submenu-open" : ""}`}>
                  {item.children.map((child) => {
                    const Icon= child.icon

                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) => `sidebar-sublink ${isActive ? "sidebar-sublink-active" : ""}`}
                        onClick={onClose}
                      >
                        <Icon size={12} />
                        <span>{child.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              </div>
            );
          })}

        </nav>

        <div className="sidebar-footer">
          <p>Dashboard v1.0</p>
        </div>
      </aside>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 240px;
          background: var(--color-sidebar);
          color: var(--color-text-inverse);
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 700;
          color: #fff;
        }
        .sidebar-logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
        }
        .sidebar-close {
          display: none;
          background: transparent;
          border: none;
          color: var(--color-text-inverse);
        }
        .sidebar-nav {
          flex: 1;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #aab3c5;
          transition: all 0.15s ease;
        }
        .sidebar-link:hover {
          background: var(--color-sidebar-active);
          color: #fff;
        }
        .sidebar-link-active {
          background: var(--color-accent);
          color: #fff;
        }
        .sidebar-footer {
          padding: 16px 20px;
          font-size: 12px;
          color: #6b7686;
          border-top: 1px solid #1b2436;
        }
        .sidebar-overlay {
          display: none;
        }

        .sidebar-parent {
          width: 100%;
          background: transparent;
          border: none;
          justify-content: flex-start;
        }

        .sidebar-chevron {
          margin-left: auto;
          transition: transform 0.2s ease;
        }
        .sidebar-chevron-open {
          transform: rotate(180deg);
        }

        .sidebar-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .sidebar-submenu-open {
          max-height: 300px;
        }

        .sidebar-sublink {
          padding: 8px 14px 8px 44px;
          font-size: 13px;
          color: #8b93a5;
          border-radius: 8px;
        }
        .sidebar-sublink:hover {
          background: var(--color-sidebar-active);
          color: #fff;
        }
        .sidebar-sublink-active {
          color: var(--color-accent);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .sidebar {
            transform: translateX(-100%);
          }
          .sidebar-open {
            transform: translateX(0);
          }
          .sidebar-close {
            display: block;
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 40;
          }
        }
          
      `}</style>
    </>
  );
}
