import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { marginRecords } from '../../mocks';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RAGIndicator } from '../../components/common/RAGIndicator';
import { useAppStore } from '../../stores/appStore';
import { useRole } from '../../hooks';
import { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export function MarginDetail() {
  const { id } = useParams();
  const { addToast } = useAppStore();
  const { isHeadOffice } = useRole();
  const record = marginRecords.find(m => m.id === id) ?? marginRecords[0];
  const [appealOpen, setAppealOpen] = useState(false);
  const [appealReason, setAppealReason] = useState('');
  const calc = record.bonus_calculation;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/margin" className="text-vwfs-text/40 hover:text-vwfs-brand"><ArrowLeft size={20} /></Link>
          <div>
            <h2 className="text-[30px] font-bold text-vwfs-brand">{record.retailer_name}</h2>
            <p className="text-sm text-vwfs-text/60">{record.retailer_code} &middot; {record.brand} &middot; {record.period}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={record.gateway_status} />
          {!record.appeal_submitted && record.gateway_status !== 'Pass' && (
            <button className="btn-secondary" onClick={() => setAppealOpen(true)}>Submit Appeal</button>
          )}
          {record.appeal_submitted && <StatusBadge status={`Appeal: ${record.appeal_status}`} />}
        </div>
      </div>

      {/* Gateway Conditions */}
      <div>
        <h3 className="text-[18px] font-bold text-vwfs-brand mb-4">Gateway Conditions</h3>
        <div className="grid grid-cols-3 gap-4">
          {record.gateway_conditions.map(gc => (
            <div key={gc.id} className={`card border-l-4 ${gc.passed ? 'border-vwfs-success' : 'border-vwfs-error'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-vwfs-brand">{gc.condition_name}</h4>
                {gc.passed ? <CheckCircle size={20} className="text-vwfs-success" /> : <XCircle size={20} className="text-vwfs-error" />}
              </div>
              <p className="text-xs text-vwfs-text/60 mb-3">{gc.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-vwfs-text/70">Required: <strong>{gc.target}</strong></span>
                <span className={gc.passed ? 'text-vwfs-success font-semibold' : 'text-vwfs-error font-semibold'}>Actual: {gc.actual}</span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${gc.passed ? 'bg-vwfs-success' : 'bg-vwfs-error'}`}
                  style={{ width: `${Math.min(100, (parseFloat(gc.actual) / parseFloat(gc.target)) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Results */}
      <div className="card">
        <h3 className="text-[18px] font-bold text-vwfs-brand mb-4">KPI Results</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-vwfs-brand text-white">
              <th className="px-4 py-2 text-left">KPI</th>
              <th className="px-4 py-2 text-right">Target</th>
              <th className="px-4 py-2 text-right">Actual</th>
              <th className="px-4 py-2 text-right">Achievement</th>
              <th className="px-4 py-2 text-center">RAG</th>
            </tr>
          </thead>
          <tbody>
            {record.kpi_results.map((kpi, i) => (
              <tr key={kpi.kpi_id} className={i % 2 === 0 ? 'bg-white' : 'bg-vwfs-surface/50'}>
                <td className="px-4 py-2 font-medium">{kpi.kpi_name}</td>
                <td className="px-4 py-2 text-right">{kpi.target}{kpi.unit === '%' ? '%' : ''}</td>
                <td className="px-4 py-2 text-right font-semibold">{kpi.actual}{kpi.unit === '%' ? '%' : ''}</td>
                <td className="px-4 py-2 text-right">
                  <span className={kpi.achievement_percentage >= 100 ? 'text-vwfs-success' : kpi.achievement_percentage >= 75 ? 'text-yellow-600' : 'text-vwfs-error'}>
                    {kpi.achievement_percentage.toFixed(0)}%
                  </span>
                </td>
                <td className="px-4 py-2 text-center"><RAGIndicator status={kpi.rag_status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bonus Calculation */}
      <div className="card">
        <h3 className="text-[18px] font-bold text-vwfs-brand mb-4">Bonus Calculation</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-xs text-vwfs-text/60 uppercase mb-1">Qualification</p>
            <StatusBadge status={calc.qualification_status} />
          </div>
          <div className="text-center">
            <p className="text-xs text-vwfs-text/60 uppercase mb-1">Bonus Rate</p>
            <p className="text-2xl font-bold text-vwfs-brand">{calc.bonus_percentage.toFixed(1)}%</p>
            <p className="text-xs text-vwfs-text/50">of {calc.max_bonus_percentage}% max</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-vwfs-text/60 uppercase mb-1">Full Year Bonus</p>
            <p className="text-2xl font-bold text-vwfs-brand">£{calc.full_year_bonus.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-vwfs-text/60 uppercase mb-1">Monthly Accrual</p>
            <p className="text-2xl font-bold text-vwfs-accent">£{calc.monthly_accrual.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-sm text-center">
          <div><span className="text-vwfs-text/60">YTD Paid:</span> <strong>£{calc.ytd_paid.toLocaleString()}</strong></div>
          <div><span className="text-vwfs-text/60">YTD Accrued:</span> <strong>£{calc.ytd_accrued.toLocaleString()}</strong></div>
          <div><span className="text-vwfs-text/60">Variance:</span> <strong className={calc.variance >= 0 ? 'text-vwfs-success' : 'text-vwfs-error'}>£{calc.variance.toLocaleString()}</strong></div>
        </div>
      </div>

      {/* Override Section (Head Office only) */}
      {isHeadOffice && (
        <div className="card border-2 border-dashed border-vwfs-warning">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-vwfs-warning" />
            <h3 className="text-sm font-bold text-vwfs-brand">Head Office Override</h3>
          </div>
          <div className="flex items-center gap-4">
            <select className="input-field text-sm w-48">
              <option>Pass</option>
              <option>Fail</option>
              <option>Partial</option>
            </select>
            <input className="input-field text-sm flex-1" placeholder="Override reason..." />
            <button className="btn-primary text-sm" onClick={() => addToast({ type: 'success', message: 'Override applied' })}>Apply Override</button>
          </div>
        </div>
      )}

      {/* Appeal Modal */}
      <Modal open={appealOpen} onClose={() => setAppealOpen(false)} title="Submit Appeal" footer={
        <>
          <button className="btn-secondary" onClick={() => setAppealOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { setAppealOpen(false); addToast({ type: 'success', message: 'Appeal submitted successfully' }); }}>Submit Appeal</button>
        </>
      }>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-vwfs-text mb-1">Reason for Appeal</label>
            <textarea className="input-field" rows={4} value={appealReason} onChange={e => setAppealReason(e.target.value)} placeholder="Describe why you believe this decision should be reviewed..." />
          </div>
        </div>
      </Modal>
    </div>
  );
}
