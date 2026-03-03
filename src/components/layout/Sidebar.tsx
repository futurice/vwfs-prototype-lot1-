// ============================================================================
// VWFS Performance Platform - Sidebar Navigation
// ============================================================================

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Gift,
  Award,
  BarChart3,
  ClipboardList,
  Calendar,
  Calculator,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

interface NavItem {
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: <LayoutDashboard size={20} /> },
  {
    label: 'Bonus',
    icon: <Gift size={20} />,
    children: [
      { label: 'Enquiries', path: '/bonus/enquiries' },
      { label: 'Exceptions', path: '/bonus/exceptions' },
    ],
  },
  { label: 'Scorecards', path: '/scorecards', icon: <Award size={20} /> },
  { label: 'Dashboards', path: '/dashboards', icon: <BarChart3 size={20} /> },
  { label: 'Actions', path: '/actions', icon: <ClipboardList size={20} /> },
  { label: 'Visits', path: '/visits', icon: <Calendar size={20} /> },
  { label: 'Margin Tool', path: '/margin', icon: <Calculator size={20} /> },
  { label: 'Retention', path: '/retention', icon: <Users size={20} /> },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Bonus: false,
  });

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const linkClasses = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-r-md transition-colors ${
      isActive
        ? 'bg-white/10 text-vwfs-accent-light border-l-[3px] border-vwfs-accent-light'
        : 'text-white/80 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent'
    }`;

  return (
    <aside
      className={`fixed top-10 left-0 bottom-0 bg-vwfs-brand flex flex-col z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!sidebarCollapsed && (
          <div>
            <span className="text-white font-bold text-xl tracking-wide">VWFS</span>
            <span className="block text-white/60 text-xs mt-0.5">Performance Platform</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white/60 hover:text-white p-1 rounded transition-colors"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {navItems.map((item) => {
          // Expandable group
          if (item.children) {
            const isExpanded = expandedGroups[item.label];
            const childPaths = item.children.map((c) => c.path);
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors border-l-[3px] border-transparent ${
                    sidebarCollapsed ? 'justify-center' : ''
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </>
                  )}
                </button>
                {isExpanded && !sidebarCollapsed && (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) => linkClasses(isActive)}
                      >
                        <span className="w-5 flex justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </span>
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
                {/* Collapsed: show first child as link */}
                {sidebarCollapsed && (
                  <NavLink
                    to={childPaths[0]}
                    className={({ isActive }) =>
                      `flex justify-center py-1 text-white/40 hover:text-white transition-colors ${
                        isActive ? 'text-vwfs-accent-light' : ''
                      }`
                    }
                    title={item.label}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  </NavLink>
                )}
              </div>
            );
          }

          // Single link
          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === '/'}
              className={({ isActive }) =>
                sidebarCollapsed
                  ? `flex justify-center py-2.5 transition-colors ${
                      isActive
                        ? 'text-vwfs-accent-light border-l-[3px] border-vwfs-accent-light bg-white/10'
                        : 'text-white/80 hover:text-white border-l-[3px] border-transparent'
                    }`
                  : linkClasses(isActive)
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="px-4 py-3 border-t border-white/10 text-white/40 text-xs">
          v1.0.0 Prototype
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
