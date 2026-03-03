import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Play, CheckCircle, Eye, RotateCcw } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/appStore';
import type { Action, ActionStatus } from '../../types';

const mockAction: Action = {
  id: 'act-001',
  action_id: 'ACT-001',
  plan_id: 'plan-001',
  title: 'Conduct finance penetration training for sales team',
  description: 'Organise and deliver training sessions covering PCP, HP and lease products. The training should include role-play scenarios, objection handling techniques and an overview of current customer finance offers. Target all front-line sales executives.',
  category: 'Training',
  status: 'In Progress',
  owner_id: 'usr-003',
  owner_name: 'Emily Chen',
  assigned_to: 'usr-001',
  assigned_to_name: 'Sarah Mitchell',
  due_date: '2026-03-15',
  kpi_link: 'SAL-02',
  kpi_name: 'Finance Penetration',
  created_date: '2026-01-05',
  updated_date: '2026-02-28',
  priority: 'High',
  comments: [
    { id: 'ac-1', author_id: 'usr-003', author_name: 'Emily Chen', content: 'Please schedule the first training session for week commencing 10th February.', created_date: '2026-01-10T09:00:00Z' },
    { id: 'ac-2', author_id: 'usr-001', author_name: 'Sarah Mitchell', content: 'First session completed on 12th Feb with 8 attendees. Very positive feedback. Second session booked for 26th Feb.', created_date: '2026-02-14T16:30:00Z' },
    { id: 'ac-3', author_id: 'usr-003', author_name: 'Emily Chen', content: 'Great progress. Let me know how the second session goes and we can plan the final refresher for March.', created_date: '2026-02-15T10:00:00Z' },
  ],
  status_history: [
    { status: 'Draft', changed_by: 'usr-003', changed_by_name: 'Emily Chen', changed_date: '2026-01-05T09:00:00Z', notes: 'Action created as part of Q1 Sales Improvement Plan' },
    { status: 'Open', changed_by: 'usr-003', changed_by_name: 'Emily Chen', changed_date: '2026-01-08T10:30:00Z', notes: 'Assigned to Sarah Mitchell' },
    { status: 'In Progress', changed_by: 'usr-001', changed_by_name: 'Sarah Mitchell', changed_date: '2026-02-10T09:00:00Z', notes: 'First training session being prepared' },
  ],
  attachments: [],
  smart_suggestions: [
    'Schedule a third follow-up session by end of March to reinforce learnings',
    'Include F&I manager in next session for specialist product knowledge',
    'Request finance penetration report for the month following training to measure impact',
  ],
};

const WORKFLOW_TRANSITIONS: Record<ActionStatus, { label: string; icon: React.ReactNode; next: ActionStatus; style: string }[]> = {
  Draft: [{ label: 'Open', icon: <Play size={14} />, next: 'Open', style: 'btn-primary' }],
  Open: [{ label: 'Start Progress', icon: <Play size={14} />, next: 'In Progress', style: 'btn-primary' }],
  'In Progress': [
    { label: 'Submit for Review', icon: <Eye size={14} />, next: 'For Review', style: 'btn-primary' },
    { label: 'Mark Complete', icon: <CheckCircle size={14} />, next: 'Completed', style: 'bg-vwfs-success text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors' },
  ],
  'For Review': [
    { label: 'Approve & Complete', icon: <CheckCircle size={14} />, next: 'Completed', style: 'bg-vwfs-success text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors' },
    { label: 'Return for Changes', icon: <RotateCcw size={14} />, next: 'In Progress', style: 'btn-secondary' },
  ],
  Completed: [],
  Failed: [{ label: 'Reopen', icon: <RotateCcw size={14} />, next: 'Open', style: 'btn-secondary' }],
  Overdue: [
    { label: 'Start Progress', icon: <Play size={14} />, next: 'In Progress', style: 'btn-primary' },
    { label: 'Mark Complete', icon: <CheckCircle size={14} />, next: 'Completed', style: 'bg-vwfs-success text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors' },
  ],
};

export function ActionDetail() {
  useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [newComment, setNewComment] = useState('');

  const action = mockAction;
  const transitions = WORKFLOW_TRANSITIONS[action.status] || [];

  function handleTransition(next: ActionStatus) {
    addToast({ type: 'success', message: `Action moved to ${next}` });
  }

  function handleAddComment() {
    if (newComment.trim()) {
      addToast({ type: 'success', message: 'Comment added' });
      setNewComment('');
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
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
          <p className="text-xs font-mono text-vwfs-text/40 mb-1">{action.action_id}</p>
          <h1 className="text-xl font-bold text-vwfs-brand">{action.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={action.status} />
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              action.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-vwfs-text/50'
            }`}>
              {action.priority}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {transitions.map((t) => (
            <button
              key={t.next}
              onClick={() => handleTransition(t.next)}
              className={`flex items-center gap-1.5 ${t.style}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Owner', value: action.owner_name },
          { label: 'Assigned To', value: action.assigned_to_name },
          { label: 'Category', value: action.category },
          { label: 'Due Date', value: new Date(action.due_date).toLocaleDateString('en-GB') },
          { label: 'Created', value: new Date(action.created_date).toLocaleDateString('en-GB') },
          { label: 'Linked KPI', value: action.kpi_name || 'None' },
        ].map((item) => (
          <div key={item.label} className="bg-vwfs-surface rounded-lg p-3">
            <p className="text-xs text-vwfs-text/50 mb-0.5">{item.label}</p>
            <p className="text-sm font-semibold text-vwfs-brand">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-2">Description</h3>
        <p className="text-sm text-vwfs-text leading-relaxed">{action.description}</p>
      </div>

      {/* Smart Suggestions */}
      {action.smart_suggestions && action.smart_suggestions.length > 0 && (
        <div className="bg-vwfs-accent-light/10 border border-vwfs-accent-light/30 rounded-lg p-4">
          <h3 className="text-sm font-bold text-vwfs-brand mb-2">Smart Suggestions</h3>
          <ul className="space-y-1.5">
            {action.smart_suggestions.map((s, i) => (
              <li key={i} className="text-xs text-vwfs-text flex items-start gap-2">
                <span className="text-vwfs-accent mt-0.5">&#8226;</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comments */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-3">
          Comments ({action.comments.length})
        </h3>
        <div className="space-y-4 mb-4">
          {action.comments.map((c) => (
            <div key={c.id} className="border-l-2 border-vwfs-accent-light pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-vwfs-brand">{c.author_name}</span>
                <span className="text-xs text-vwfs-text/40">
                  {new Date(c.created_date).toLocaleDateString('en-GB')}
                </span>
              </div>
              <p className="text-sm text-vwfs-text leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            className="input-field flex-1 resize-none"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="btn-primary self-end flex items-center gap-1 disabled:opacity-50"
          >
            <Send size={14} /> Send
          </button>
        </div>
      </div>

      {/* Status History */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-3">Status History</h3>
        <div className="space-y-3">
          {action.status_history.map((entry, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-vwfs-brand mt-1.5 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={entry.status} size="sm" />
                  <span className="text-xs text-vwfs-text/40">
                    {new Date(entry.changed_date).toLocaleDateString('en-GB')}
                  </span>
                </div>
                <p className="text-xs text-vwfs-text/60 mt-0.5">by {entry.changed_by_name}</p>
                {entry.notes && <p className="text-xs text-vwfs-text/50 italic mt-0.5">{entry.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
