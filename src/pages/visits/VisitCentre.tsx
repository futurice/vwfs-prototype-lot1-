import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Calendar as CalIcon, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { Visit, VisitStatus } from '../../types';

// Generate inline visit data
const mockVisits: Visit[] = [
  { id: 'vis-001', visit_id: 'VIS-2026-001', visit_date: '2026-03-05', visit_time: '10:00', duration_minutes: 120, retailer_id: 'ret-001', retailer_name: 'Volkswagen Milton Keynes', retailer_code: 'RET001', visit_type: 'Performance Review', status: 'Scheduled', created_by: 'usr-003', created_by_name: 'Emily Chen', attendees: [{ user_id: 'usr-003', user_name: 'Emily Chen', role: 'area_manager', confirmed: true }, { user_id: 'usr-001', user_name: 'Sarah Mitchell', role: 'retailer', confirmed: true }], agenda_items: [], linked_actions: [], attachments: [], created_date: '2026-02-20', updated_date: '2026-02-25' },
  { id: 'vis-002', visit_id: 'VIS-2026-002', visit_date: '2026-03-08', visit_time: '14:00', duration_minutes: 90, retailer_id: 'ret-003', retailer_name: 'Volkswagen Leeds', retailer_code: 'RET003', visit_type: 'Quarterly Business Review', status: 'Scheduled', created_by: 'usr-013', created_by_name: 'Natalie Wright', attendees: [{ user_id: 'usr-013', user_name: 'Natalie Wright', role: 'area_manager', confirmed: true }], agenda_items: [], linked_actions: [], attachments: [], created_date: '2026-02-18', updated_date: '2026-02-18' },
  { id: 'vis-003', visit_id: 'VIS-2026-003', visit_date: '2026-03-12', visit_time: '09:30', duration_minutes: 60, retailer_id: 'ret-015', retailer_name: 'SEAT Maidstone', retailer_code: 'RET015', visit_type: 'Follow-Up', status: 'Scheduled', created_by: 'usr-007', created_by_name: 'Priya Patel', attendees: [{ user_id: 'usr-007', user_name: 'Priya Patel', role: 'area_manager', confirmed: true }], agenda_items: [], linked_actions: [], attachments: [], created_date: '2026-02-25', updated_date: '2026-02-25' },
  { id: 'vis-004', visit_id: 'VIS-2026-004', visit_date: '2026-03-15', visit_time: '11:00', duration_minutes: 120, retailer_id: 'ret-024', retailer_name: 'SKODA Cheltenham', retailer_code: 'RET024', visit_type: 'Performance Review', status: 'Draft', created_by: 'usr-006', created_by_name: 'David Williams', attendees: [], agenda_items: [], linked_actions: [], attachments: [], created_date: '2026-03-01', updated_date: '2026-03-01' },
  { id: 'vis-005', visit_id: 'VIS-2026-005', visit_date: '2026-02-15', visit_time: '10:00', duration_minutes: 120, retailer_id: 'ret-004', retailer_name: 'Volkswagen Birmingham', retailer_code: 'RET004', visit_type: 'Performance Review', status: 'Completed', created_by: 'usr-003', created_by_name: 'Emily Chen', attendees: [], agenda_items: [], outcomes: 'Positive meeting. Finance penetration showing improvement.', linked_actions: ['act-001'], attachments: [], created_date: '2026-02-01', updated_date: '2026-02-15' },
  { id: 'vis-006', visit_id: 'VIS-2026-006', visit_date: '2026-02-28', visit_time: '14:00', duration_minutes: 90, retailer_id: 'ret-031', retailer_name: 'Audi Reading', retailer_code: 'RET031', visit_type: 'Quarterly Business Review', status: 'Completed', created_by: 'usr-010', created_by_name: 'Mark Johnson', attendees: [], agenda_items: [], outcomes: 'CSI programme review. Good progress on customer experience.', linked_actions: [], attachments: [], created_date: '2026-02-10', updated_date: '2026-02-28' },
  { id: 'vis-007', visit_id: 'VIS-2026-007', visit_date: '2026-02-20', visit_time: '09:00', duration_minutes: 60, retailer_id: 'ret-025', retailer_name: 'SKODA Sheffield', retailer_code: 'RET025', visit_type: 'Ad-Hoc', status: 'Overdue', created_by: 'usr-013', created_by_name: 'Natalie Wright', attendees: [], agenda_items: [], linked_actions: [], attachments: [], created_date: '2026-02-05', updated_date: '2026-02-20' },
];

const STATUS_COUNTS: { status: VisitStatus; color: string }[] = [
  { status: 'Draft', color: 'bg-gray-200' },
  { status: 'Scheduled', color: 'bg-vwfs-accent-light' },
  { status: 'Completed', color: 'bg-vwfs-success' },
  { status: 'Overdue', color: 'bg-vwfs-error' },
  { status: 'Cancelled', color: 'bg-gray-400' },
];

export function VisitCentre() {
  const navigate = useNavigate();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockVisits.forEach((v) => { counts[v.status] = (counts[v.status] || 0) + 1; });
    return counts;
  }, []);

  // Calendar grid for March 2026
  const calendarDays = useMemo(() => {
    const year = 2026;
    const month = 2; // March (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startPad = firstDay === 0 ? 6 : firstDay - 1; // Monday start

    const days: (number | null)[] = [];
    for (let i = 0; i < startPad; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, []);

  function getVisitsForDay(day: number): Visit[] {
    return mockVisits.filter((v) => {
      const d = new Date(v.visit_date);
      return d.getDate() === day && d.getMonth() === 2 && d.getFullYear() === 2026;
    });
  }

  const upcomingVisits = mockVisits
    .filter((v) => v.status === 'Scheduled')
    .sort((a, b) => new Date(a.visit_date).getTime() - new Date(b.visit_date).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vwfs-brand">Visit Reporting</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">Schedule and manage retailer performance visits</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-vwfs-surface rounded-lg p-1">
            <button
              onClick={() => setView('calendar')}
              className={`p-2 rounded-md transition-colors ${view === 'calendar' ? 'bg-vwfs-brand text-white' : 'text-vwfs-text/50'}`}
            >
              <CalIcon size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${view === 'list' ? 'bg-vwfs-brand text-white' : 'text-vwfs-text/50'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button onClick={() => navigate('/visits/new')} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> New Visit
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {STATUS_COUNTS.map(({ status, color }) => (
          <div key={status} className="card text-center">
            <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-vwfs-brand">{statusCounts[status] || 0}</p>
            <p className="text-[10px] text-vwfs-text/50">{status}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar / List */}
        <div className="lg:col-span-3">
          {view === 'calendar' ? (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-vwfs-brand">March 2026</h3>
                <div className="flex gap-1">
                  <button className="p-1 rounded hover:bg-gray-100"><ChevronLeft size={16} /></button>
                  <button className="p-1 rounded hover:bg-gray-100"><ChevronRight size={16} /></button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-px mb-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-vwfs-text/50 py-2">{d}</div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                {calendarDays.map((day, i) => {
                  const visits = day ? getVisitsForDay(day) : [];
                  const isToday = day === 2;
                  return (
                    <div
                      key={i}
                      className={`min-h-[80px] bg-white p-1.5 ${
                        day ? '' : 'bg-gray-50'
                      } ${isToday ? 'ring-2 ring-inset ring-vwfs-accent' : ''}`}
                    >
                      {day && (
                        <>
                          <span className={`text-xs font-semibold ${isToday ? 'text-vwfs-accent' : 'text-vwfs-text/60'}`}>
                            {day}
                          </span>
                          {visits.map((v) => (
                            <Link
                              key={v.id}
                              to={`/visits/${v.id}`}
                              className={`block mt-0.5 text-[9px] font-medium truncate rounded px-1 py-0.5 ${
                                v.status === 'Completed' ? 'bg-vwfs-success/20 text-vwfs-success' :
                                v.status === 'Overdue' ? 'bg-vwfs-error/20 text-vwfs-error' :
                                'bg-vwfs-accent-light/20 text-vwfs-brand'
                              }`}
                            >
                              {v.visit_time} {v.retailer_name.split(' ').slice(-1)[0]}
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {mockVisits.map((v) => (
                <Link
                  key={v.id}
                  to={`/visits/${v.id}`}
                  className="card-hover flex items-center gap-4"
                >
                  <div className="text-center w-14 shrink-0">
                    <p className="text-xs text-vwfs-text/40">
                      {new Date(v.visit_date).toLocaleDateString('en-GB', { month: 'short' })}
                    </p>
                    <p className="text-2xl font-bold text-vwfs-brand">
                      {new Date(v.visit_date).getDate()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-vwfs-brand">{v.retailer_name}</h4>
                    <p className="text-xs text-vwfs-text/50">
                      {v.visit_time} | {v.visit_type} | {v.duration_minutes} mins
                    </p>
                  </div>
                  <StatusBadge status={v.status} size="sm" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Upcoming */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">Upcoming Visits</h3>
            {upcomingVisits.length === 0 ? (
              <p className="text-xs text-vwfs-text/40">No upcoming visits</p>
            ) : (
              <div className="space-y-3">
                {upcomingVisits.map((v) => (
                  <Link
                    key={v.id}
                    to={`/visits/${v.id}`}
                    className="block bg-vwfs-surface rounded-lg p-3 hover:bg-vwfs-surface-dark/10 transition-colors"
                  >
                    <p className="text-xs font-bold text-vwfs-brand">{v.retailer_name}</p>
                    <p className="text-[10px] text-vwfs-text/50 mt-0.5">
                      {new Date(v.visit_date).toLocaleDateString('en-GB')} at {v.visit_time}
                    </p>
                    <p className="text-[10px] text-vwfs-text/40">{v.visit_type}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
