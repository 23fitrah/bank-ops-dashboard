import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="layout-main">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .layout {
          display: flex;
          min-height: 100vh;
        }
        .layout-main {
          flex: 1;
          margin-left: 240px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .layout-content {
          padding: 24px;
          flex: 1;
        }
        @media (max-width: 900px) {
          .layout-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
