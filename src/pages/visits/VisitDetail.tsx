import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Paperclip, CheckCircle } from 'lucide-react';
import { visits } from '../../mocks';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/appStore';
import { useState } from 'react';

export function VisitDetail() {
  const { id } = useParams();
  const { addToast } = useAppStore();
  const visit = visits.find(v => v.id === id) ?? visits[0];
  const [notes, setNotes] = useState(visit.summary_notes ?? '');
  const [outcomes, setOutcomes] = useState(visit.outcomes ?? '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/visits" className="text-vwfs-text/40 hover:text-vwfs-brand transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-[30px] font-bold text-vwfs-brand">{visit.retailer_name}</h2>
            <p className="text-sm text-vwfs-text/60">
              {visit.visit_id} &middot; {new Date(visit.visit_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={visit.status} />
          {visit.status !== 'Completed' && (
            <button className="btn-primary" onClick={() => addToast({ type: 'success', message: 'Report generated successfully' })}>
              Generate Report
            </button>
          )}
        </div>
      </div>

      {/* Info Row */}
      <div className="card flex items-center gap-8 text-sm">
        <div className="flex items-center gap-2 text-vwfs-text">
          <Clock size={16} className="text-vwfs-brand" />
          <span>{visit.visit_time} &middot; {visit.duration_minutes} mins</span>
        </div>
        <div className="flex items-center gap-2 text-vwfs-text">
          <MapPin size={16} className="text-vwfs-brand" />
          <span>{visit.retailer_name}</span>
        </div>
        <div className="flex items-center gap-2 text-vwfs-text">
          <Users size={16} className="text-vwfs-brand" />
          <span>{visit.attendees.map(a => a.user_name).join(', ')}</span>
        </div>
        <div className="flex items-center gap-2 text-vwfs-text">
          <span className="text-xs uppercase font-semibold text-vwfs-brand">{visit.visit_type}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Agenda Section - 2 cols */}
        <div className="col-span-2 space-y-4">
          <div className="card">
            <h3 className="text-[18px] font-bold text-vwfs-brand mb-4">Agenda Items</h3>
            <div className="space-y-4">
              {visit.agenda_items.map((item, i) => (
                <div key={item.id} className="border border-gray-100 rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-vwfs-brand text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-vwfs-brand text-sm">{item.title}</h4>
                    </div>
                    <span className="text-xs text-vwfs-text/50">{item.duration_minutes} mins</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-vwfs-text/70 mb-2 ml-10">{item.description}</p>
                  )}
                  <div className="ml-10">
                    <textarea
                      className="input-field text-sm"
                      rows={2}
                      placeholder="Discussion notes..."
                      defaultValue={item.notes ?? ''}
                      readOnly={visit.status === 'Completed'}
                    />
                  </div>
                  {item.completed && (
                    <div className="ml-10 mt-1 flex items-center gap-1 text-vwfs-success text-xs">
                      <CheckCircle size={12} /> Completed
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="card">
            <h3 className="text-[18px] font-bold text-vwfs-brand mb-4">Outcomes & Summary</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-vwfs-text mb-1">Summary Notes</label>
                <textarea
                  className="input-field text-sm"
                  rows={4}
                  placeholder="Enter visit summary..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-vwfs-text mb-1">Key Outcomes</label>
                <textarea
                  className="input-field text-sm"
                  rows={3}
                  placeholder="Key decisions and outcomes..."
                  value={outcomes}
                  onChange={e => setOutcomes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Linked Actions */}
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">Linked Actions</h3>
            {visit.linked_actions.length > 0 ? (
              <div className="space-y-2">
                {visit.linked_actions.map((id, i) => (
                  <Link key={i} to={`/actions/${id}`} className="block text-sm text-vwfs-brand hover:underline">
                    Action #{id.slice(0, 8)}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-vwfs-text/50">No linked actions</p>
            )}
            <button
              className="btn-secondary text-xs mt-3 w-full"
              onClick={() => addToast({ type: 'info', message: 'Action linking modal would open here' })}
            >
              Link Action
            </button>
          </div>

          {/* Attachments */}
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">Attachments</h3>
            {visit.attachments.length > 0 ? (
              <div className="space-y-2">
                {visit.attachments.map(a => (
                  <div key={a.id} className="flex items-center gap-2 text-sm text-vwfs-text">
                    <Paperclip size={14} />
                    <span>{a.filename}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-vwfs-text/50">No attachments</p>
            )}
          </div>

          {/* Complete Button */}
          {visit.status !== 'Completed' && (
            <button
              className="btn-primary w-full"
              onClick={() => addToast({ type: 'success', message: 'Visit marked as completed' })}
            >
              Complete Visit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
