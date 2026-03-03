// ============================================================================
// VWFS Performance Platform - App Shell Layout
// ============================================================================

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { DevToolbar } from '../common/DevToolbar';
import { Toast } from '../common/Toast';
import { useAppStore } from '../../stores/appStore';

export function AppShell() {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-vwfs-surface">
      {/* Dev Toolbar - fixed at very top */}
      <DevToolbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main area offset by sidebar width + dev toolbar */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-[260px]'
        } mt-10`}
      >
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-6 min-h-[calc(100vh-104px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}

export default AppShell;
