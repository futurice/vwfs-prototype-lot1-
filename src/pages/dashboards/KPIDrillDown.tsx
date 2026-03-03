import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, BarChart3, TrendingUp, Table2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { ChartWrapper } from '../../components/common/ChartWrapper';
import { RAGIndicator } from '../../components/common/RAGIndicator';
import { DataTable } from '../../components/common/DataTable';
import { scorecards } from '../../mocks/scorecards';
import type { RAGStatus } from '../../types';

type ChartType = 'bar' | 'line' | 'area';

export function KPIDrillDown() {
  const { brand, kpiId } = useParams<{ brand: string; kpiId: string }>();
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<ChartType>('line');

  const sc = scorecards.find((s) => s.brand === brand);
  const kpi = sc?.kpi_results.find((k) => k.kpi_id === kpiId);

  if (!kpi || !sc) {
    return (
      <div className="text-center py-20">
        <p className="text-vwfs-text/50">KPI not found</p>
        <button onClick={() => navigate(`/dashboards/${brand}`)} className="text-vwfs-accent text-sm hover:underline mt-2">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

  const chartData = kpi.r12_trend.map((val, i) => ({
    month: months[i],
    value: Math.round(val * 100) / 100,
    target: kpi.target,
    national: kpi.benchmark_national,
    top25: kpi.benchmark_top25,
  }));

  // Simulated retailer breakdown table
  const retailerBreakdown = useMemo(() => {
    const retailers = [
      'Volkswagen Milton Keynes', 'Volkswagen Watford', 'Volkswagen Leeds',
      'Volkswagen Birmingham', 'Volkswagen Bristol', 'Volkswagen Manchester',
      'Volkswagen Guildford', 'Volkswagen Norwich',
    ];
    return retailers.map((name, i) => {
      const val = kpi.raw_result + (i - 4) * (kpi.target * 0.05);
      const pct = Math.min(100, Math.round((val / kpi.target) * 100));
      const rag: RAGStatus = pct >= 100 ? 'Green' : pct >= 75 ? 'Amber' : 'Red';
      return {
        retailer: name,
        value: Math.round(val * 100) / 100,
        target: kpi.target,
        achievement: pct,
        rag,
        rank: i + 1,
      };
    });
  }, [kpi]);

  const tableColumns: ColumnDef<typeof retailerBreakdown[0], unknown>[] = [
    { accessorKey: 'rank', header: '#', size: 50 },
    { accessorKey: 'retailer', header: 'Retailer' },
    {
      accessorKey: 'value',
      header: 'Result',
      cell: (info) => <span className="font-semibold">{info.getValue() as number}</span>,
    },
    { accessorKey: 'target', header: 'Target' },
    {
      accessorKey: 'achievement',
      header: 'Achievement',
      cell: (info) => {
        const val = info.getValue() as number;
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${val >= 100 ? 'bg-vwfs-success' : val >= 75 ? 'bg-vwfs-warning' : 'bg-vwfs-error'}`}
                style={{ width: `${Math.min(100, val)}%` }}
              />
            </div>
            <span className="text-xs">{val}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'rag',
      header: 'RAG',
      cell: (info) => <RAGIndicator status={info.getValue() as RAGStatus} showLabel size="sm" />,
    },
  ];

  function formatVal(v: number): string {
    if (kpi!.unit === '%') return `${v.toFixed(1)}%`;
    if (kpi!.unit === '£') return `£${v.toLocaleString()}`;
    return String(v);
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(`/dashboards/${brand}`)}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to {brand} Dashboard
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-vwfs-text/40 font-mono mb-1">{kpi.kpi_code}</p>
          <h1 className="text-2xl font-bold text-vwfs-brand">{kpi.kpi_name}</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">{kpi.department} | {brand}</p>
        </div>
        <RAGIndicator status={kpi.rag_status} showLabel size="lg" />
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-xs text-vwfs-text/50">Current Value</p>
          <p className="text-2xl font-bold text-vwfs-brand">{formatVal(kpi.raw_result)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-vwfs-text/50">Target</p>
          <p className="text-2xl font-bold text-vwfs-brand">{formatVal(kpi.target)}</p>
        </div>
        <div className="card">
          <p className="text-xs text-vwfs-text/50">Score</p>
          <p className={`text-2xl font-bold ${kpi.score_achieved >= 100 ? 'text-vwfs-success' : kpi.score_achieved >= 75 ? 'text-amber-600' : 'text-vwfs-error'}`}>
            {kpi.score_achieved}
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-vwfs-text/50">Rank</p>
          <p className="text-2xl font-bold text-vwfs-brand">
            #{kpi.rank}<span className="text-sm text-vwfs-text/40 font-normal">/{kpi.total_ranked}</span>
          </p>
        </div>
      </div>

      {/* Chart Type Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-vwfs-brand">12-Month Trend</h2>
        <div className="flex gap-1 bg-vwfs-surface rounded-lg p-1">
          {([
            { type: 'line' as ChartType, icon: TrendingUp },
            { type: 'bar' as ChartType, icon: BarChart3 },
            { type: 'area' as ChartType, icon: Table2 },
          ]).map(({ type, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`p-2 rounded-md transition-colors ${
                chartType === type ? 'bg-vwfs-brand text-white' : 'text-vwfs-text/50 hover:bg-white'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ChartWrapper
        type={chartType}
        data={chartData}
        xKey="month"
        yKeys={['value', 'target', 'national', 'top25']}
        height={350}
      />

      {/* Retailer Breakdown */}
      <div>
        <h2 className="text-lg font-bold text-vwfs-brand mb-4">Retailer Breakdown</h2>
        <DataTable
          data={retailerBreakdown}
          columns={tableColumns}
          searchable
          exportable
          pageSize={8}
        />
      </div>

      {/* Linked Actions */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-3">Linked Actions</h3>
        <div className="space-y-2">
          {[
            { id: 'act-001', title: 'Increase demo utilisation across South region', status: 'In Progress' },
            { id: 'act-002', title: 'Finance penetration training programme', status: 'Open' },
          ].map((action) => (
            <Link
              key={action.id}
              to={`/actions/${action.id}`}
              className="flex items-center justify-between bg-vwfs-surface rounded-lg px-4 py-2.5 hover:bg-vwfs-surface-dark/10 transition-colors"
            >
              <span className="text-sm text-vwfs-brand font-medium">{action.title}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                action.status === 'In Progress'
                  ? 'bg-vwfs-warning/30 text-vwfs-text'
                  : 'bg-vwfs-accent-light/30 text-vwfs-brand'
              }`}>
                {action.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
