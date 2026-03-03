import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { KPITile } from '../../components/common/KPITile';
import { scorecards } from '../../mocks/scorecards';
import type { RAGStatus, KPI } from '../../types';

const CATEGORIES = ['All', 'Sales', 'Service', 'Used'] as const;

// Build KPIs from scorecard data
function buildKPIsFromScorecard(brand: string): KPI[] {
  const sc = scorecards.find((s) => s.brand === brand);
  if (!sc) return [];

  return sc.kpi_results.map((kr) => ({
    id: kr.kpi_id,
    kpi_code: kr.kpi_code,
    kpi_name: kr.kpi_name,
    brand: sc.brand,
    category: kr.department,
    department: kr.department,
    current_value: kr.raw_result,
    target_value: kr.target,
    previous_value: kr.r12_trend.length > 1 ? kr.r12_trend[kr.r12_trend.length - 2] : kr.raw_result,
    rag_status: kr.rag_status,
    trend: kr.trend,
    unit: kr.unit === '£' ? 'currency' : kr.unit === '%' ? 'percentage' : kr.unit,
    format: kr.unit === '£' ? 'currency' as const : kr.unit === '%' ? 'percentage' as const : 'number' as const,
    history: kr.r12_trend.map((v, i) => ({
      month: `M${i + 1}`,
      value: v,
      target: kr.target,
    })),
    benchmark_national: kr.benchmark_national,
    benchmark_top25: kr.benchmark_top25,
    rank: kr.rank,
    total_ranked: kr.total_ranked,
    rag_thresholds: { red_below: 75, amber_below: 100, green_above: 100 },
  }));
}

export function BrandDashboard() {
  const { brand } = useParams<{ brand: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const kpis = useMemo(() => buildKPIsFromScorecard(brand || ''), [brand]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return kpis;
    return kpis.filter((k) => k.department === activeCategory);
  }, [kpis, activeCategory]);

  // Summary counts
  const ragCounts = useMemo(() => {
    const counts: Record<RAGStatus, number> = { Green: 0, Amber: 0, Red: 0 };
    filtered.forEach((k) => { counts[k.rag_status]++; });
    return counts;
  }, [filtered]);

  if (kpis.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-vwfs-text/50">No dashboard data for brand: {brand}</p>
        <button onClick={() => navigate('/dashboards')} className="text-vwfs-accent text-sm hover:underline mt-2">
          Back to Dashboards
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/dashboards')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Dashboards
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-vwfs-brand">{brand} Performance Dashboard</h1>
        <p className="text-sm text-vwfs-text/60 mt-1">
          Click any KPI tile to drill into detailed analytics
        </p>
      </div>

      {/* Summary Bar */}
      <div className="flex items-center gap-4 bg-vwfs-surface rounded-lg p-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-vwfs-success" />
            <span className="text-sm font-semibold text-vwfs-brand">{ragCounts.Green}</span>
            <span className="text-xs text-vwfs-text/50">Green</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-vwfs-warning" />
            <span className="text-sm font-semibold text-vwfs-brand">{ragCounts.Amber}</span>
            <span className="text-xs text-vwfs-text/50">Amber</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-vwfs-error" />
            <span className="text-sm font-semibold text-vwfs-brand">{ragCounts.Red}</span>
            <span className="text-xs text-vwfs-text/50">Red</span>
          </div>
        </div>
        <span className="text-xs text-vwfs-text/50">
          {filtered.length} KPIs displayed
        </span>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-vwfs-brand text-white'
                : 'bg-white text-vwfs-text/60 border border-gray-200 hover:border-vwfs-brand/40 hover:text-vwfs-brand'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* KPI Tile Grid - SHOWPIECE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((kpi) => {
          const achievement = kpi.unit === 'days'
            ? Math.min(100, Math.round((kpi.target_value / kpi.current_value) * 100))
            : Math.min(100, Math.round((kpi.current_value / kpi.target_value) * 100));

          return (
            <KPITile
              key={kpi.id}
              name={kpi.kpi_name}
              value={kpi.current_value}
              unit={kpi.unit === 'currency' ? '£' : kpi.unit === 'percentage' ? '%' : kpi.unit}
              target={kpi.target_value}
              achievement={achievement}
              ragStatus={kpi.rag_status}
              trend={kpi.trend}
              sparklineData={kpi.history.map((h) => h.value)}
              onClick={() => navigate(`/dashboards/${brand}/${kpi.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
