import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Lightbulb, RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RAGIndicator } from '../../components/common/RAGIndicator';
import { scorecards } from '../../mocks/scorecards';
import type { Department, RAGStatus } from '../../types';

const DEPARTMENTS: Department[] = ['Overall', 'Sales', 'Service', 'Used'];

function deriveRAG(score: number): RAGStatus {
  if (score >= 100) return 'Green';
  if (score >= 75) return 'Amber';
  return 'Red';
}

export function ScorecardView() {
  const { brand } = useParams<{ brand: string }>();
  const navigate = useNavigate();
  const [activeDept, setActiveDept] = useState<Department>('Overall');
  const [whatIfMode, setWhatIfMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, number>>({});

  const scorecard = scorecards.find((s) => s.brand === brand);

  if (!scorecard) {
    return (
      <div className="text-center py-20">
        <p className="text-vwfs-text/50">Scorecard not found for brand: {brand}</p>
        <button onClick={() => navigate('/scorecards')} className="text-vwfs-accent text-sm hover:underline mt-2">
          Back to Scorecards
        </button>
      </div>
    );
  }

  const filteredKPIs = useMemo(() => {
    if (activeDept === 'Overall') return scorecard.kpi_results;
    return scorecard.kpi_results.filter((k) => k.department === activeDept);
  }, [activeDept, scorecard]);

  // Compute what-if scores
  const computedKPIs = useMemo(() => {
    return filteredKPIs.map((kpi) => {
      const overrideVal = overrides[kpi.kpi_id];
      if (overrideVal !== undefined) {
        const newScore = kpi.unit === 'days'
          ? Math.min(100, Math.round((kpi.target / overrideVal) * 100))
          : Math.min(100, Math.round((overrideVal / kpi.target) * 100));
        return { ...kpi, raw_result: overrideVal, score_achieved: newScore, rag_status: deriveRAG(newScore) };
      }
      return kpi;
    });
  }, [filteredKPIs, overrides]);

  const projectedOverall = useMemo(() => {
    const allKPIs = scorecard.kpi_results.map((kpi) => {
      const overrideVal = overrides[kpi.kpi_id];
      if (overrideVal !== undefined) {
        const newScore = kpi.unit === 'days'
          ? Math.min(100, Math.round((kpi.target / overrideVal) * 100))
          : Math.min(100, Math.round((overrideVal / kpi.target) * 100));
        return { ...kpi, score_achieved: newScore };
      }
      return kpi;
    });
    const totalWeight = allKPIs.reduce((s, k) => s + k.weighting, 0);
    return Math.round(allKPIs.reduce((s, k) => s + k.score_achieved * k.weighting, 0) / totalWeight);
  }, [scorecard, overrides]);

  const originalOverall = scorecard.overall_score;
  const scoreDelta = projectedOverall - originalOverall;
  const hasOverrides = Object.keys(overrides).length > 0;

  function handleOverride(kpiId: string, val: string) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setOverrides((prev) => ({ ...prev, [kpiId]: num }));
    }
  }

  function resetOverrides() {
    setOverrides({});
  }

  function formatVal(value: number, unit: string): string {
    if (unit === '%') return `${value.toFixed(1)}%`;
    if (unit === '£') return `£${value.toLocaleString()}`;
    if (unit === 'ratio') return value.toFixed(2);
    if (unit === 'hrs') return `${value.toFixed(1)} hrs`;
    if (unit === 'days') return `${value.toFixed(0)} days`;
    return value.toFixed(1);
  }

  const trendIcon = (t: string) => {
    if (t === 'up') return <TrendingUp size={14} className="text-vwfs-success" />;
    if (t === 'down') return <TrendingDown size={14} className="text-vwfs-error" />;
    return <Minus size={14} className="text-vwfs-surface-dark" />;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/scorecards')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Scorecards
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vwfs-brand">
            {scorecard.retailer_name} - {brand}
          </h1>
          <p className="text-sm text-vwfs-text/60">
            {scorecard.period_label} | Rank #{scorecard.overall_rank} of {scorecard.total_retailers}
          </p>
        </div>

        {/* What-If Toggle */}
        <div className="flex items-center gap-3">
          {whatIfMode && hasOverrides && (
            <button
              onClick={resetOverrides}
              className="btn-secondary flex items-center gap-1.5 text-xs"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
          <button
            onClick={() => setWhatIfMode(!whatIfMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
              whatIfMode
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200'
                : 'bg-vwfs-surface text-vwfs-text hover:bg-vwfs-surface-dark/20'
            }`}
          >
            <Lightbulb size={18} className={whatIfMode ? 'animate-pulse' : ''} />
            {whatIfMode ? 'What-If Mode ON' : 'What-If Mode'}
          </button>
        </div>
      </div>

      {/* Projected Score Panel (visible when what-if mode is on) */}
      {whatIfMode && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-amber-800 mb-1">Projected Score</h3>
              <p className="text-xs text-amber-700/70">
                Edit the result values in the table below to see projected impact
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-amber-700/50">Original</p>
                <p className="text-3xl font-bold text-vwfs-text/40">{originalOverall}</p>
              </div>
              <div className="text-2xl text-amber-600 font-bold">&rarr;</div>
              <div className="text-center">
                <p className="text-xs text-amber-700/50">Projected</p>
                <p className="text-3xl font-bold text-vwfs-brand">{projectedOverall}</p>
              </div>
              <div className={`text-center px-4 py-2 rounded-lg ${scoreDelta > 0 ? 'bg-vwfs-success/20' : scoreDelta < 0 ? 'bg-vwfs-error/20' : 'bg-gray-100'}`}>
                <p className="text-xs text-vwfs-text/50">Change</p>
                <p className={`text-2xl font-bold ${scoreDelta > 0 ? 'text-vwfs-success' : scoreDelta < 0 ? 'text-vwfs-error' : 'text-vwfs-text/40'}`}>
                  {scoreDelta > 0 ? '+' : ''}{scoreDelta}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Department Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveDept(dept)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeDept === dept
                ? 'border-vwfs-accent text-vwfs-brand'
                : 'border-transparent text-vwfs-text/50 hover:text-vwfs-text hover:border-gray-300'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* KPI Data Grid - SHOWPIECE */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-vwfs-brand">
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">KPI</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Dept</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">RAG</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  {whatIfMode ? 'Result (editable)' : 'Result'}
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Target</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Weight</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Trend</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">National</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">Top 25%</th>
              </tr>
            </thead>
            <tbody>
              {computedKPIs.map((kpi, idx) => {
                const isOverridden = overrides[kpi.kpi_id] !== undefined;
                return (
                  <tr
                    key={kpi.kpi_id}
                    className={`border-b border-gray-100 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-vwfs-surface/30'
                    } ${isOverridden ? 'bg-amber-50' : ''} hover:bg-vwfs-accent-light/10`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-vwfs-brand text-xs">{kpi.kpi_name}</span>
                      <span className="block text-[10px] text-vwfs-text/40 font-mono">{kpi.kpi_code}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-vwfs-text/60">{kpi.department}</td>
                    <td className="px-4 py-3 text-center">
                      <RAGIndicator status={kpi.rag_status} showLabel size="sm" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {whatIfMode ? (
                        <input
                          type="number"
                          step="0.1"
                          defaultValue={kpi.raw_result}
                          onChange={(e) => handleOverride(kpi.kpi_id, e.target.value)}
                          className={`w-24 text-right text-xs font-mono border rounded px-2 py-1 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none ${
                            isOverridden ? 'border-amber-400 bg-amber-50' : 'border-gray-300'
                          }`}
                        />
                      ) : (
                        <span className="font-semibold">{formatVal(kpi.raw_result, kpi.unit)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-vwfs-text/60">
                      {formatVal(kpi.target, kpi.unit)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-bold text-sm ${
                        kpi.score_achieved >= 100 ? 'text-vwfs-success' :
                        kpi.score_achieved >= 75 ? 'text-amber-600' : 'text-vwfs-error'
                      }`}>
                        {kpi.score_achieved}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-vwfs-text/50">{kpi.weighting}%</td>
                    <td className="px-4 py-3 text-center">{trendIcon(kpi.trend)}</td>
                    <td className="px-4 py-3 text-right text-xs">
                      <span className="font-semibold">{kpi.rank}</span>
                      <span className="text-vwfs-text/40">/{kpi.total_ranked}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-vwfs-text/50">
                      {formatVal(kpi.benchmark_national, kpi.unit)}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-vwfs-text/50">
                      {formatVal(kpi.benchmark_top25, kpi.unit)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-vwfs-surface border-t border-gray-200">
          <span className="text-xs text-vwfs-text/60">
            Showing {computedKPIs.length} KPIs for {activeDept}
          </span>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-vwfs-text/50">
              Overall: <span className="font-bold text-vwfs-brand text-sm">{whatIfMode ? projectedOverall : originalOverall}</span>
            </span>
            <span className="text-vwfs-text/50">
              Rank: <span className="font-bold text-vwfs-brand">#{scorecard.overall_rank}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
