import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/appStore';
import type { Action, ActionPlan } from '../../types';

// Inline action plan data
const plan: ActionPlan = {
  id: 'plan-001',
  plan_id: 'AP-2026-001',
  title: 'Q1 Sales Improvement Plan',
  objective: 'Improve new vehicle sales penetration and finance take-up across the South region with targeted training, process improvements and marketing support.',
  brand: 'VWPC',
  retailer_id: 'ret-001',
  retailer_name: 'Volkswagen Milton Keynes',
  owner_id: 'usr-003',
  owner_name: 'Emily Chen',
  start_date: '2026-01-01',
  end_date: '2026-03-31',
  created_date: '2025-12-15',
  updated_date: '2026-02-28',
  status: 'Active',
  progress_percentage: 62,
  total_actions: 8,
  completed_actions: 5,
  overdue_actions: 1,
  linked_kpis: ['SAL-01', 'SAL-02'],
  actions: [],
};

const planActions: Action[] = [
  { id: 'act-001', action_id: 'ACT-001', plan_id: 'plan-001', title: 'Conduct finance penetration training for sales team', description: 'Organise and deliver training sessions covering PCP/HP/lease products', category: 'Training', status: 'In Progress', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-03-15', priority: 'High', created_date: '2026-01-05', updated_date: '2026-02-28', comments: [], status_history: [], attachments: [] },
  { id: 'act-002', action_id: 'ACT-002', plan_id: 'plan-001', title: 'Review demo vehicle stock allocation', description: 'Ensure demo fleet covers key models', category: 'Operations', status: 'Completed', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-004', assigned_to_name: 'Richard Thompson', due_date: '2026-02-15', completed_date: '2026-02-12', priority: 'Medium', created_date: '2026-01-05', updated_date: '2026-02-12', comments: [], status_history: [], attachments: [] },
  { id: 'act-003', action_id: 'ACT-003', plan_id: 'plan-001', title: 'Launch local marketing campaign for ID.4', description: 'Targeted digital marketing in Thames Valley area', category: 'Marketing', status: 'Completed', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-02-01', completed_date: '2026-01-30', priority: 'High', created_date: '2026-01-05', updated_date: '2026-01-30', comments: [], status_history: [], attachments: [] },
  { id: 'act-004', action_id: 'ACT-004', plan_id: 'plan-001', title: 'Implement follow-up process for test drive leads', description: 'Set up CRM workflow for 48-hour follow-up', category: 'Process', status: 'Completed', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-01-31', completed_date: '2026-01-28', priority: 'Medium', created_date: '2026-01-05', updated_date: '2026-01-28', comments: [], status_history: [], attachments: [] },
  { id: 'act-005', action_id: 'ACT-005', plan_id: 'plan-001', title: 'Monthly sales performance review meeting', description: 'Structured review of sales KPIs with area manager', category: 'Review', status: 'Completed', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-003', assigned_to_name: 'Emily Chen', due_date: '2026-02-28', completed_date: '2026-02-28', priority: 'Medium', created_date: '2026-01-05', updated_date: '2026-02-28', comments: [], status_history: [], attachments: [] },
  { id: 'act-006', action_id: 'ACT-006', plan_id: 'plan-001', title: 'Arrange customer experience mystery shop', description: 'Commission third party mystery shop assessment', category: 'Quality', status: 'Overdue', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-02-20', priority: 'High', created_date: '2026-01-10', updated_date: '2026-02-28', comments: [], status_history: [], attachments: [] },
  { id: 'act-007', action_id: 'ACT-007', plan_id: 'plan-001', title: 'Benchmark against top 25% dealers', description: 'Analyse what top-performing dealers are doing differently', category: 'Analysis', status: 'Open', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-004', assigned_to_name: 'Richard Thompson', due_date: '2026-03-20', priority: 'Low', created_date: '2026-01-15', updated_date: '2026-01-15', comments: [], status_history: [], attachments: [] },
  { id: 'act-008', action_id: 'ACT-008', plan_id: 'plan-001', title: 'Review part-exchange pricing vs market', description: 'Ensure competitive PX valuations to close deals', category: 'Pricing', status: 'Completed', owner_id: 'usr-003', owner_name: 'Emily Chen', assigned_to: 'usr-001', assigned_to_name: 'Sarah Mitchell', due_date: '2026-02-10', completed_date: '2026-02-08', priority: 'Medium', created_date: '2026-01-05', updated_date: '2026-02-08', comments: [], status_history: [], attachments: [] },
];

const priorityColors: Record<string, string> = {
  Critical: 'border-l-vwfs-error',
  High: 'border-l-orange-500',
  Medium: 'border-l-vwfs-accent',
  Low: 'border-l-gray-300',
};

export function ActionPlanDetail() {
  useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/actions')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Action Centre
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-vwfs-text/40 mb-1">{plan.plan_id}</p>
          <h1 className="text-2xl font-bold text-vwfs-brand">{plan.title}</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">{plan.retailer_name} | {plan.brand}</p>
        </div>
        <StatusBadge status={plan.status} />
      </div>

      {/* Objective */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-2">Objective</h3>
        <p className="text-sm text-vwfs-text leading-relaxed">{plan.objective}</p>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-vwfs-brand">Progress</h3>
          <span className="text-lg font-bold text-vwfs-brand">{plan.progress_percentage}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-vwfs-accent to-vwfs-success rounded-full transition-all"
            style={{ width: `${plan.progress_percentage}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-vwfs-brand">{plan.total_actions}</p>
            <p className="text-[10px] text-vwfs-text/50">Total</p>
          </div>
          <div>
            <p className="text-xl font-bold text-vwfs-success">{plan.completed_actions}</p>
            <p className="text-[10px] text-vwfs-text/50">Completed</p>
          </div>
          <div>
            <p className="text-xl font-bold text-vwfs-accent">{plan.total_actions - plan.completed_actions - plan.overdue_actions}</p>
            <p className="text-[10px] text-vwfs-text/50">In Progress</p>
          </div>
          <div>
            <p className="text-xl font-bold text-vwfs-error">{plan.overdue_actions}</p>
            <p className="text-[10px] text-vwfs-text/50">Overdue</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-vwfs-surface rounded-lg p-3">
          <p className="text-xs text-vwfs-text/50">Owner</p>
          <p className="text-sm font-semibold text-vwfs-brand">{plan.owner_name}</p>
        </div>
        <div className="bg-vwfs-surface rounded-lg p-3">
          <p className="text-xs text-vwfs-text/50">Start Date</p>
          <p className="text-sm font-semibold text-vwfs-brand">{new Date(plan.start_date).toLocaleDateString('en-GB')}</p>
        </div>
        <div className="bg-vwfs-surface rounded-lg p-3">
          <p className="text-xs text-vwfs-text/50">End Date</p>
          <p className="text-sm font-semibold text-vwfs-brand">{new Date(plan.end_date).toLocaleDateString('en-GB')}</p>
        </div>
        <div className="bg-vwfs-surface rounded-lg p-3">
          <p className="text-xs text-vwfs-text/50">Linked KPIs</p>
          <p className="text-sm font-semibold text-vwfs-brand">{plan.linked_kpis.join(', ')}</p>
        </div>
      </div>

      {/* Actions List */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-vwfs-brand">Actions</h2>
        <button
          className="btn-primary flex items-center gap-1.5 text-sm"
          onClick={() => addToast({ type: 'info', message: 'New action form would open here' })}
        >
          <Plus size={14} /> Add Action
        </button>
      </div>

      <div className="space-y-3">
        {planActions.map((action) => (
          <Link
            key={action.id}
            to={`/actions/${action.id}`}
            className={`card-hover flex items-start gap-4 border-l-4 ${priorityColors[action.priority] || 'border-l-gray-300'}`}
          >
            <div className="mt-0.5">
              {action.status === 'Completed' ? (
                <CheckCircle size={20} className="text-vwfs-success" />
              ) : action.status === 'Overdue' ? (
                <AlertTriangle size={20} className="text-vwfs-error" />
              ) : (
                <Clock size={20} className="text-vwfs-text/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-vwfs-text/40">{action.action_id}</span>
                <StatusBadge status={action.status} size="sm" />
              </div>
              <h4 className="text-sm font-semibold text-vwfs-brand">{action.title}</h4>
              <p className="text-xs text-vwfs-text/50 mt-1">
                {action.assigned_to_name} | Due: {new Date(action.due_date).toLocaleDateString('en-GB')}
                {action.completed_date && ` | Completed: ${new Date(action.completed_date).toLocaleDateString('en-GB')}`}
              </p>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              action.priority === 'Critical' ? 'bg-vwfs-error/10 text-vwfs-error' :
              action.priority === 'High' ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-vwfs-text/50'
            }`}>
              {action.priority}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
