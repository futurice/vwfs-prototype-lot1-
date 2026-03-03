import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Target, Users, BarChart3, ArrowRight } from 'lucide-react';
import { retentionSummaries } from '../../mocks';
import { ChartWrapper } from '../../components/common/ChartWrapper';
import { useMemo } from 'react';

export function RetentionSummary() {
  const summaries = retentionSummaries;

  const avgRenewal = useMemo(() => summaries.reduce((s, r) => s + r.percentage_renewed, 0) / summaries.length, [summaries]);
  const totalVolume = useMemo(() => summaries.reduce((s, r) => s + r.renewal_volume, 0), [summaries]);
  const avgRank = useMemo(() => Math.round(summaries.reduce((s, r) => s + r.rank, 0) / summaries.length), [summaries]);
  const avgGap = useMemo(() => summaries.reduce((s, r) => s + r.gap_to_target, 0) / summaries.length, [summaries]);

  const brandData = useMemo(() => {
    const brands: Record<string, { sum: number; count: number }> = {};
    summaries.forEach(s => {
      if (!brands[s.brand]) brands[s.brand] = { sum: 0, count: 0 };
      brands[s.brand].sum += s.percentage_renewed;
      brands[s.brand].count++;
    });
    return Object.entries(brands).map(([brand, d]) => ({ brand, rate: Math.round(d.sum / d.count * 10) / 10 }));
  }, [summaries]);

  const top10 = useMemo(() => [...summaries].sort((a, b) => b.percentage_renewed - a.percentage_renewed).slice(0, 10), [summaries]);
  const bottom10 = useMemo(() => [...summaries].sort((a, b) => a.percentage_renewed - b.percentage_renewed).slice(0, 10), [summaries]);

  const trendData = useMemo(() => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    return months.map((m) => ({
      month: m,
      rate: Math.round((avgRenewal + (Math.random() - 0.5) * 8) * 10) / 10,
    }));
  }, [avgRenewal]);

  const headerStats = [
    { label: '% Renewed', value: `${avgRenewal.toFixed(1)}%`, icon: <Target size={24} />, color: avgRenewal >= 70 ? 'text-vwfs-success' : 'text-vwfs-error' },
    { label: 'Renewal Volume', value: totalVolume.toLocaleString(), icon: <Users size={24} />, color: 'text-vwfs-brand' },
    { label: 'Avg Rank', value: `#${avgRank}`, icon: <BarChart3 size={24} />, color: 'text-vwfs-brand' },
    { label: 'Gap to Target', value: `${avgGap >= 0 ? '+' : ''}${avgGap.toFixed(1)}%`, icon: avgGap >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />, color: avgGap >= 0 ? 'text-vwfs-success' : 'text-vwfs-error' },
  ];

  const links = [
    { label: 'Renewal Reporting', path: '/retention/renewals', desc: 'Detailed renewal data by retailer' },
    { label: 'Model Migration', path: '/retention/migration', desc: 'Vehicle migration patterns' },
    { label: 'Forecasting', path: '/retention/forecast', desc: 'Growth tracker & targets' },
    { label: 'Appeals', path: '/retention/appeals', desc: 'Manage retention appeals' },
    { label: 'Customer Consent', path: '/retention/consent', desc: 'Consent metrics & trends' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-[30px] font-bold text-vwfs-brand">Retailer Retention Portal</h2>

      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        {headerStats.map(s => (
          <div key={s.label} className="card text-center">
            <div className={`${s.color} flex justify-center mb-2`}>{s.icon}</div>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-vwfs-text/60 uppercase tracking-wide mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        <ChartWrapper type="bar" data={brandData} xKey="brand" yKeys={['rate']} title="Renewal Rate by Brand" height={250} />
        <ChartWrapper type="line" data={trendData} xKey="month" yKeys={['rate']} title="6-Month Trend" height={250} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top 10 */}
        <div className="card">
          <h3 className="text-sm font-bold text-vwfs-brand mb-3">Top 10 Retailers</h3>
          <div className="space-y-2">
            {top10.map((r, i) => (
              <div key={r.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-vwfs-success text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="flex-1 truncate">{r.retailer_name}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-vwfs-success h-2 rounded-full" style={{ width: `${r.percentage_renewed}%` }} />
                </div>
                <span className="font-semibold text-vwfs-success w-12 text-right">{r.percentage_renewed.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 10 */}
        <div className="card">
          <h3 className="text-sm font-bold text-vwfs-brand mb-3">Bottom 10 Retailers</h3>
          <div className="space-y-2">
            {bottom10.map((r, i) => (
              <div key={r.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-vwfs-error text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="flex-1 truncate">{r.retailer_name}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-vwfs-error h-2 rounded-full" style={{ width: `${r.percentage_renewed}%` }} />
                </div>
                <span className="font-semibold text-vwfs-error w-12 text-right">{r.percentage_renewed.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-5 gap-4">
        {links.map(l => (
          <Link key={l.path} to={l.path} className="card-hover group">
            <h4 className="text-sm font-bold text-vwfs-brand mb-1">{l.label}</h4>
            <p className="text-xs text-vwfs-text/60 mb-2">{l.desc}</p>
            <span className="text-xs text-vwfs-accent font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
