import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, X, Calendar } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { retailers } from '../../mocks/retailers';

const VISIT_TYPES = [
  'Performance Review',
  'Quarterly Business Review',
  'Ad-Hoc',
  'Follow-Up',
  'Annual Review',
];

const AGENDA_TEMPLATES: Record<string, string[]> = {
  'Performance Review': [
    'Welcome & objectives',
    'Scorecard review',
    'KPI deep-dive',
    'Action plan progress',
    'Next steps & close',
  ],
  'Quarterly Business Review': [
    'Executive summary',
    'Financial performance',
    'Operational KPIs',
    'Customer satisfaction',
    'Market trends',
    'Action planning',
    'Close & next QBR date',
  ],
  'Ad-Hoc': ['Agenda item 1'],
  'Follow-Up': [
    'Previous action review',
    'Progress update',
    'Blockers & support needed',
    'Updated actions',
  ],
  'Annual Review': [
    'Year in review',
    'Performance highlights',
    'Areas for improvement',
    'Strategic objectives for next year',
    'Investment & development plans',
    'Close',
  ],
};

interface AgendaEntry {
  title: string;
  duration: number;
}

export function VisitCreate() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const [retailerId, setRetailerId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [visitType, setVisitType] = useState(VISIT_TYPES[0]);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [attendeeInput, setAttendeeInput] = useState('');
  const [agendaItems, setAgendaItems] = useState<AgendaEntry[]>(
    AGENDA_TEMPLATES[VISIT_TYPES[0]].map((t) => ({ title: t, duration: 15 })),
  );

  function handleVisitTypeChange(type: string) {
    setVisitType(type);
    const template = AGENDA_TEMPLATES[type] || ['Agenda item'];
    setAgendaItems(template.map((t) => ({ title: t, duration: 15 })));
  }

  function addAttendee() {
    if (attendeeInput.trim()) {
      setAttendees((prev) => [...prev, attendeeInput.trim()]);
      setAttendeeInput('');
    }
  }

  function removeAttendee(i: number) {
    setAttendees((prev) => prev.filter((_, idx) => idx !== i));
  }

  function addAgendaItem() {
    setAgendaItems((prev) => [...prev, { title: '', duration: 15 }]);
  }

  function removeAgendaItem(i: number) {
    setAgendaItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateAgendaItem(i: number, field: 'title' | 'duration', value: string) {
    setAgendaItems((prev) =>
      prev.map((item, idx) =>
        idx === i
          ? { ...item, [field]: field === 'duration' ? parseInt(value) || 0 : value }
          : item,
      ),
    );
  }

  function handleSchedule() {
    addToast({ type: 'success', message: 'Visit scheduled successfully' });
    navigate('/visits');
  }

  const totalDuration = agendaItems.reduce((s, a) => s + a.duration, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/visits')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Visits
      </button>

      <h1 className="text-2xl font-bold text-vwfs-brand">Schedule New Visit</h1>

      {/* Retailer / Date / Time / Type */}
      <div className="card space-y-4">
        <h2 className="text-sm font-bold text-vwfs-brand">Visit Details</h2>

        <div>
          <label className="block text-sm font-medium text-vwfs-text mb-1.5">Retailer</label>
          <select
            value={retailerId}
            onChange={(e) => setRetailerId(e.target.value)}
            className="input-field"
          >
            <option value="">Select a retailer...</option>
            {retailers.filter((r) => r.active).map((r) => (
              <option key={r.id} value={r.id}>{r.name} ({r.code})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-vwfs-text mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-vwfs-text mb-1.5">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-vwfs-text mb-1.5">Visit Type</label>
          <select
            value={visitType}
            onChange={(e) => handleVisitTypeChange(e.target.value)}
            className="input-field"
          >
            {VISIT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendees */}
      <div className="card space-y-4">
        <h2 className="text-sm font-bold text-vwfs-brand">Attendees</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={attendeeInput}
            onChange={(e) => setAttendeeInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAttendee()}
            placeholder="Enter attendee name..."
            className="input-field flex-1"
          />
          <button onClick={addAttendee} className="btn-secondary flex items-center gap-1">
            <Plus size={14} /> Add
          </button>
        </div>
        {attendees.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attendees.map((a, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-vwfs-surface px-3 py-1.5 rounded-full text-xs font-medium text-vwfs-brand"
              >
                {a}
                <button onClick={() => removeAttendee(i)} className="text-vwfs-text/40 hover:text-vwfs-error">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Agenda */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-vwfs-brand">Agenda</h2>
          <span className="text-xs text-vwfs-text/50">
            Total: {totalDuration} mins ({(totalDuration / 60).toFixed(1)} hrs)
          </span>
        </div>

        <div className="space-y-2">
          {agendaItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-vwfs-text/40 w-6 text-right">{i + 1}.</span>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateAgendaItem(i, 'title', e.target.value)}
                className="input-field flex-1 text-sm"
                placeholder="Agenda item title..."
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={item.duration}
                  onChange={(e) => updateAgendaItem(i, 'duration', e.target.value)}
                  className="input-field w-16 text-sm text-center"
                  min="5"
                  step="5"
                />
                <span className="text-xs text-vwfs-text/40">min</span>
              </div>
              <button
                onClick={() => removeAgendaItem(i)}
                className="text-vwfs-text/30 hover:text-vwfs-error p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addAgendaItem}
          className="text-xs text-vwfs-accent hover:underline flex items-center gap-1"
        >
          <Plus size={12} /> Add agenda item
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/visits')} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={handleSchedule}
          disabled={!retailerId || !date}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Calendar size={16} /> Schedule Visit
        </button>
      </div>
    </div>
  );
}
