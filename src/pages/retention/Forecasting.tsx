import { useState, useMemo } from 'react';
import { ChartWrapper } from '../../components/common/ChartWrapper';
import { useAppStore } from '../../stores/appStore';

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

function generateForecastData(targetPct: number) {
  return months.map((month, i) => {
    const predicted = Math.floor(80 + Math.random() * 40);
    const target = Math.floor(predicted * (targetPct / 100));
    const isPast = i < 8; // first 8 months are "past"
    const actual = isPast ? Math.floor(target * (0.85 + Math.random() * 0.3)) : 0;
    return {
      month,
      predicted,
      target,
      actual: isPast ? actual : null as number | null,
      variance: isPast ? actual - target : null as number | null,
      pctAchieved: isPast ? Math.round((actual / target) * 100) : null as number | null,
    };
  });
}

export function Forecasting() {
  const { addToast } = useAppStore();
  const [tab, setTab] = useState<'new' | 'used'>('new');
  const [targetPct, setTargetPct] = useState(75);
  const [editTarget, setEditTarget] = useState('75');

  const data = useMemo(() => generateForecastData(targetPct), [targetPct]);

  const chartData = data.map(d => ({
    month: d.month,
    Predicted: d.predicted,
    Target: d.target,
    Actual: d.actual ?? undefined,
  }));

  const totals = useMemo(() => ({
    predicted: data.reduce((s, d) => s + d.predicted, 0),
    target: data.reduce((s, d) => s + d.target, 0),
    actual: data.filter(d => d.actual !== null).reduce((s, d) => s + (d.actual ?? 0), 0),
  }), [data]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Forecasting & Growth Tracker</h2>
        <div className="flex items-center gap-3">
          <button className="btn-secondary text-sm" onClick={() => { setTargetPct(75); setEditTarget('75'); }}>Reset</button>
          <button className="btn-primary text-sm" onClick={() => addToast({ type: 'success', message: 'Forecast saved' })}>Save Forecast</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4">
        <div className="flex bg-white rounded border border-gray-200">
          {(['new', 'used'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 text-sm font-semibold transition-colors ${
                tab === t ? 'bg-vwfs-brand text-white' : 'text-vwfs-text hover:bg-gray-50'
              }`}
            >
              {t === 'new' ? 'New Vehicles' : 'Used Vehicles'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm font-semibold text-vwfs-text">Target %:</label>
          <input
            type="number"
            className="input-field w-20 text-sm text-center"
            value={editTarget}
            onChange={e => setEditTarget(e.target.value)}
          />
          <button
            className="btn-secondary text-xs"
            onClick={() => {
              const val = parseInt(editTarget);
              if (val > 0 && val <= 100) setTargetPct(val);
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Monthly Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-vwfs-brand text-white">
              <th className="px-3 py-2 text-left">Month</th>
              <th className="px-3 py-2 text-right">Predicted Endings</th>
              <th className="px-3 py-2 text-right">Target Renewals</th>
              <th className="px-3 py-2 text-right">Actual Renewals</th>
              <th className="px-3 py-2 text-right">Variance</th>
              <th className="px-3 py-2 text-right">% Achieved</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.month} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-vwfs-surface/50'}`}>
                <td className="px-3 py-2 font-medium">{row.month} {i < 9 ? '2025' : '2026'}</td>
                <td className="px-3 py-2 text-right">{row.predicted}</td>
                <td className="px-3 py-2 text-right font-medium">{row.target}</td>
                <td className="px-3 py-2 text-right">
                  {row.actual !== null ? (
                    <span className="font-semibold">{row.actual}</span>
                  ) : (
                    <input type="number" className="input-field text-sm w-20 text-right py-1 px-2" placeholder="—" />
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  {row.variance !== null ? (
                    <span className={row.variance >= 0 ? 'text-vwfs-success font-semibold' : 'text-vwfs-error font-semibold'}>
                      {row.variance >= 0 ? '+' : ''}{row.variance}
                    </span>
                  ) : <span className="text-vwfs-text/30">—</span>}
                </td>
                <td className="px-3 py-2 text-right">
                  {row.pctAchieved !== null ? (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      row.pctAchieved >= 100 ? 'bg-vwfs-success/20 text-vwfs-success'
                      : row.pctAchieved >= 80 ? 'bg-vwfs-warning/30 text-yellow-700'
                      : 'bg-vwfs-error/20 text-vwfs-error'
                    }`}>
                      {row.pctAchieved}%
                    </span>
                  ) : <span className="text-vwfs-text/30">—</span>}
                </td>
              </tr>
            ))}
            {/* Totals */}
            <tr className="bg-gray-100 font-bold">
              <td className="px-3 py-2">Total</td>
              <td className="px-3 py-2 text-right">{totals.predicted}</td>
              <td className="px-3 py-2 text-right">{totals.target}</td>
              <td className="px-3 py-2 text-right">{totals.actual}</td>
              <td className="px-3 py-2 text-right">
                <span className={totals.actual - totals.target >= 0 ? 'text-vwfs-success' : 'text-vwfs-error'}>
                  {totals.actual - totals.target >= 0 ? '+' : ''}{totals.actual - totals.target}
                </span>
              </td>
              <td className="px-3 py-2 text-right">{totals.target > 0 ? Math.round((totals.actual / totals.target) * 100) : 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Trend Chart */}
      <ChartWrapper
        type="line"
        data={chartData}
        xKey="month"
        yKeys={['Predicted', 'Target', 'Actual']}
        title="Predicted vs Target vs Actual"
        height={300}
        colors={['#A8ADB3', '#004666', '#05CE9F']}
      />
    </div>
  );
}
