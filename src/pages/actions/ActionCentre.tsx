import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import { Plus, CheckCircle, Clock, AlertTriangle, XCircle, Eye, Pencil, Timer } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { Action, ActionPlan, ActionStatus } from '../../types';

// Generate inline action plan and action data
const actionPlans: ActionPlan[] = [
  {
    id: 'plan-001', plan_id: 'AP-2026-001', title: 'Q1 Sales Improvement Plan', objective: 'Improve new vehicle sales penetration and finance take-up across the South region',
    brand: 'VWPC', retailer_id: 'ret-001', retailer_name: 'Volkswagen Milton Keynes', owner_id: 'usr-003', owner_name: 'Emily Chen',
    start_date: '2026-01-01', end_date: '2026-03-31', created_date: '2025-12-15', updated_date: '2026-02-28',
    status: 'Active', actions: [], progress_percentage: 62, total_actions: 8, completed_actions: 5, overdue_actions: 1, linked_kpis: ['SAL-01', 'SAL-02'],
  },
  {
    id: 'plan-002', plan_id: 'AP-2026-002', title: 'Service Retention Drive', objective: 'Increase service plan penetration and workshop loading to hit Q1 targets',
    brand: 'VWPC', retailer_id: 'ret-003', retailer_name: 'Volkswagen Leeds', owner_id: 'usr-013', owner_name: 'Natalie Wright',
    start_date: '2026-01-15', end_date: '2026-04-15', created_date: '2026-01-10', updated_date: '2026-02-25',
    status: 'Active', actions: [], progress_percentage: 45, total_actions: 6, completed_actions: 3, overdue_actions: 0, linked_kpis: ['SER-01', 'SER-04'],
  },
  {
    id: 'plan-003', plan_id: 'AP-2026-003', title: 'Used Vehicle Stock Turn', objective: 'Reduce days in stock for used vehicles and improve used-to-new ratio',
    brand: 'SKODA', retailer_id: 'ret-024', retailer_name: 'SKODA Cheltenham', owner_id: 'usr-006', owner_name: 'David Williams',
    start_date: '2026-02-01', end_date: '2026-05-31', created_date: '2026-01-28', updated_date: '2026-02-20',
    status: 'Active', actions: [], progress_percentage: 25, total_actions: 10, completed_actions: 2, overdue_actions: 2, linked_kpis: ['USE-01', 'USE-03'],
  },
  {
    id: 'plan-004', plan_id: 'AP-2025-012', title: 'CSI Improvement Programme', objective: 'Address customer satisfaction issues and improve CSI scores',
    brand: 'AUDI', retailer_id: 'ret-031', retailer_name: 'Audi Reading', owner_id: 'usr-010', owner_name: 'Mark Johnson',
    start_date: '2025-10-01', end_date: '2026-01-31', created_date: '2025-09-20', updated_date: '2026-01-31',
    status: 'Completed', actions: [], progress_percentage: 100, total_actions: 5, completed_actions: 5, overdue_actions: 0, linked_kpis: ['SAL-03'],
  },
];

const recentActions: Action[] = [
  { id: 'act-001', action_id: 'ACT-001', plan_id: 'plan-001', title: 'Conduct finance penetration training', description: '', category: 'Training', status: 'In Progress', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-03-15', kpi_link: 'SAL-02', kpi_name: 'Finance Penetration', created_date: '2026-01-05', updated_date: '2026-02-28', priority: 'High', comments: [], status_history: [], attachments: [] },
  { id: 'act-002', action_id: 'ACT-002', plan_id: 'plan-001', title: 'Review demo vehicle stock allocation', description: '', category: 'Operations', status: 'Open', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-004', assigned_to_name: 'Richard Thompson', due_date: '2026-03-10', created_date: '2026-01-05', updated_date: '2026-02-20', priority: 'Medium', comments: [], status_history: [], attachments: [] },
  { id: 'act-003', action_id: 'ACT-003', plan_id: 'plan-002', title: 'Launch service plan awareness campaign', description: '', category: 'Marketing', status: 'Completed', owner_id: 'usr-013', owner_name: 'Natalie Wright', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-02-28', completed_date: '2026-02-25', created_date: '2026-01-15', updated_date: '2026-02-25', priority: 'High', comments: [], status_history: [], attachments: [] },
  { id: 'act-004', action_id: 'ACT-004', plan_id: 'plan-003', title: 'Review pricing strategy for aged stock', description: '', category: 'Pricing', status: 'Overdue', owner_id: 'usr-006', owner_name: 'David Williams', assigned_to: 'usr-009', assigned_to_name: 'Hannah Roberts', due_date: '2026-02-15', created_date: '2026-02-01', updated_date: '2026-02-28', priority: 'Critical', comments: [], status_history: [], attachments: [] },
  { id: 'act-005', action_id: 'ACT-005', plan_id: 'plan-001', title: 'Monthly sales performance review meeting', description: '', category: 'Review', status: 'For Review', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-003', assigned_to_name: 'Emily Chen', due_date: '2026-03-05', created_date: '2026-01-05', updated_date: '2026-03-01', priority: 'Medium', comments: [], status_history: [], attachments: [] },
  { id: 'act-006', action_id: 'ACT-006', plan_id: 'plan-003', title: 'Set up weekly stock review cadence', description: '', category: 'Process', status: 'Draft', owner_id: 'usr-006', owner_name: 'David Williams', assigned_to: 'usr-009', assigned_to_name: 'Hannah Roberts', due_date: '2026-03-20', created_date: '2026-02-20', updated_date: '2026-02-20', priority: 'Low', comments: [], status_history: [], attachments: [] },
  { id: 'act-007', action_id: 'ACT-007', plan_id: 'plan-002', title: 'Competitor service pricing analysis', description: '', category: 'Analysis', status: 'Failed', owner_id: 'usr-013', owner_name: 'Natalie Wright', assigned_to: 'usr-018', assigned_to_name: 'Tom Anderson', due_date: '2026-02-10', created_date: '2026-01-15', updated_date: '2026-02-12', priority: 'Medium', comments: [], status_history: [], attachments: [] },
];

const STATUS_ICONS: Record<ActionStatus, React.ReactNode> = {
  Draft: <Pencil size={14} />,
  Open: <Clock size={14} />,
  'In Progress': <Timer size={14} />,
  'For Review': <Eye size={14} />,
  Completed: <CheckCircle size={14} />,
  Failed: <XCircle size={14} />,
  Overdue: <AlertTriangle size={14} />,
};

export function ActionCentre() {
  const navigate = useNavigate();

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    recentActions.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  }, []);

  const columns: ColumnDef<Action, unknown>[] = [
    {
      accessorKey: 'action_id',
      header: 'ID',
      cell: (info) => <span className="font-mono text-xs font-semibold text-vwfs-brand">{info.getValue() as string}</span>,
      size: 90,
    },
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'assigned_to_name', header: 'Assigned To', size: 140 },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: (info) => {
        const p = info.getValue() as string;
        const colors: Record<string, string> = { Critical: 'text-vwfs-error font-bold', High: 'text-orange-600 font-semibold', Medium: 'text-vwfs-text', Low: 'text-vwfs-text/50' };
        return <span className={`text-xs ${colors[p] || ''}`}>{p}</span>;
      },
      size: 80,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue() as string} size="sm" />,
      size: 110,
    },
    {
      accessorKey: 'due_date',
      header: 'Due Date',
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString('en-GB'),
      size: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vwfs-brand">Action Centre</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">Manage action plans and track progress</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/actions/plans/plan-001')}>
          <Plus size={16} /> New Action Plan
        </button>
      </div>

      {/* Status Count Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {(['Draft', 'Open', 'In Progress', 'For Review', 'Completed', 'Failed', 'Overdue'] as ActionStatus[]).map((status) => (
          <div key={status} className="card text-center">
            <div className="flex justify-center mb-2 text-vwfs-brand">
              {STATUS_ICONS[status]}
            </div>
            <p className="text-2xl font-bold text-vwfs-brand">{statusCounts[status] || 0}</p>
            <p className="text-[10px] text-vwfs-text/50 mt-0.5">{status}</p>
          </div>
        ))}
      </div>

      {/* Action Plans */}
      <div>
        <h2 className="text-lg font-bold text-vwfs-brand mb-3">Action Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {actionPlans.map((plan) => (
            <Link
              key={plan.id}
              to={`/actions/plans/${plan.id}`}
              className="card-hover"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono text-vwfs-text/40">{plan.plan_id}</p>
                  <h3 className="text-sm font-bold text-vwfs-brand">{plan.title}</h3>
                </div>
                <StatusBadge status={plan.status} size="sm" />
              </div>
              <p className="text-xs text-vwfs-text/60 mb-3">{plan.retailer_name} | {plan.brand}</p>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-vwfs-text/50">Progress</span>
                  <span className="font-semibold text-vwfs-brand">{plan.progress_percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      plan.progress_percentage >= 80 ? 'bg-vwfs-success' :
                      plan.progress_percentage >= 40 ? 'bg-vwfs-accent' : 'bg-vwfs-warning'
                    }`}
                    style={{ width: `${plan.progress_percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-vwfs-text/50">
                <span>{plan.completed_actions}/{plan.total_actions} actions</span>
                {plan.overdue_actions > 0 && (
                  <span className="text-vwfs-error font-semibold">{plan.overdue_actions} overdue</span>
                )}
                <span className="ml-auto">{plan.owner_name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      <div>
        <h2 className="text-lg font-bold text-vwfs-brand mb-3">Recent Actions</h2>
        <DataTable
          data={recentActions}
          columns={columns}
          onRowClick={(row) => navigate(`/actions/${row.id}`)}
          searchable
          exportable
          pageSize={7}
        />
      </div>
    </div>
  );
}
