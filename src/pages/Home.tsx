import { Link } from 'react-router-dom';
import {
  Gift,
  Award,
  BarChart3,
  ClipboardList,
  Calendar,
  Calculator,
  Users,
  LayoutDashboard,
} from 'lucide-react';

const modules = [
  {
    name: 'Home',
    description: 'Overview of platform activity and key notifications.',
    icon: LayoutDashboard,
    to: '/',
    color: 'from-vwfs-brand to-vwfs-brand/80',
  },
  {
    name: 'Bonus Enquiries & Exceptions',
    description: 'Submit, track and manage bonus enquiries and exception approval workflows.',
    icon: Gift,
    to: '/bonus/enquiries',
    color: 'from-vwfs-accent to-emerald-600',
  },
  {
    name: 'Balanced Scorecards',
    description: 'View retailer scorecards across brands with what-if scenario modelling.',
    icon: Award,
    to: '/scorecards',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Performance Dashboards',
    description: 'Interactive KPI dashboards with drill-down analytics by brand and retailer.',
    icon: BarChart3,
    to: '/dashboards',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    name: 'Action Centre',
    description: 'Manage action plans and individual actions linked to KPI performance.',
    icon: ClipboardList,
    to: '/actions',
    color: 'from-purple-600 to-violet-700',
  },
  {
    name: 'Visit Reporting',
    description: 'Schedule, document and follow up on retailer performance visits.',
    icon: Calendar,
    to: '/visits',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Margin Tool',
    description: 'Gateway qualification, bonus calculation and margin analysis by retailer.',
    icon: Calculator,
    to: '/margin',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    name: 'Retention Portal',
    description: 'Renewal reporting, migration matrix, forecasting and customer consent tracking.',
    icon: Users,
    to: '/retention',
    color: 'from-slate-600 to-gray-800',
  },
];

export function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-vwfs-brand to-vwfs-brand/90 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">VWFS Performance Platform</h1>
        <p className="text-white/80 text-lg max-w-2xl">
          The unified hub for retailer performance management across Volkswagen Financial Services. Select a module below to get started.
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.name}
              to={mod.to}
              className="card-hover group flex flex-col h-full"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-vwfs-brand mb-1.5 leading-tight">
                {mod.name}
              </h3>
              <p className="text-xs text-vwfs-text/70 leading-relaxed flex-1">
                {mod.description}
              </p>
              <span className="mt-3 text-xs font-semibold text-vwfs-accent group-hover:underline">
                Open module
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open Enquiries', value: '23', change: '+3 this week' },
          { label: 'Pending Exceptions', value: '8', change: '2 awaiting your approval' },
          { label: 'Overdue Actions', value: '12', change: 'Across 5 retailers' },
          { label: 'Upcoming Visits', value: '6', change: 'Next 7 days' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-xs text-vwfs-text/60 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-vwfs-brand">{stat.value}</p>
            <p className="text-[11px] text-vwfs-text/50 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
