// ============================================================================
// VWFS Performance Platform - KPI Tile (Dashboard Card)
// ============================================================================

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { RAGStatus, Trend } from '../../types';

interface KPITileProps {
  name: string;
  value: number;
  unit: string;
  target: number;
  achievement: number;
  ragStatus: RAGStatus;
  trend: Trend;
  sparklineData?: number[];
  onClick?: () => void;
}

const ragTopBarColors: Record<RAGStatus, string> = {
  Red: 'bg-vwfs-error',
  Amber: 'bg-vwfs-warning',
  Green: 'bg-vwfs-success',
};

const trendConfig: Record<Trend, { icon: React.ReactNode; color: string }> = {
  up: { icon: <TrendingUp size={16} />, color: 'text-vwfs-success' },
  down: { icon: <TrendingDown size={16} />, color: 'text-vwfs-error' },
  stable: { icon: <Minus size={16} />, color: 'text-vwfs-surface-dark' },
};

function formatValue(value: number, unit: string): string {
  if (unit === '%') return `${value.toFixed(1)}%`;
  if (unit === 'GBP' || unit === '£') return `£${value.toLocaleString()}`;
  if (unit === 'ratio') return value.toFixed(2);
  return value.toLocaleString();
}

export function KPITile({
  name,
  value,
  unit,
  target,
  achievement,
  ragStatus,
  trend,
  sparklineData,
  onClick,
}: KPITileProps) {
  const { icon: trendIcon, color: trendColor } = trendConfig[trend];

  const chartData = (sparklineData ?? []).map((v, i) => ({ idx: i, val: v }));

  return (
    <div
      onClick={onClick}
      className="card-hover relative overflow-hidden w-full max-w-[280px] min-h-[200px] flex flex-col group"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
    >
      {/* RAG top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${ragTopBarColors[ragStatus]}`} />

      {/* Content */}
      <div className="flex-1 pt-4">
        {/* KPI Name */}
        <h4 className="text-sm font-bold text-vwfs-brand leading-tight mb-3 line-clamp-2">
          {name}
        </h4>

        {/* Value + Trend */}
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-vwfs-brand leading-none">
            {formatValue(value, unit)}
          </span>
          <span className={`flex items-center gap-0.5 ${trendColor}`}>{trendIcon}</span>
        </div>

        {/* Target + Achievement */}
        <div className="flex items-center justify-between text-xs text-vwfs-text/60 mb-3">
          <span>Target: {formatValue(target, unit)}</span>
          <span>Achievement: {achievement.toFixed(0)}%</span>
        </div>

        {/* Sparkline */}
        {chartData.length > 0 && (
          <div className="h-[40px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke="#A8ADB3"
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Hover tooltip */}
      {onClick && (
        <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-[10px] font-medium text-vwfs-text/50 bg-white/90 px-2 py-0.5 rounded">
            Click for details
          </span>
        </div>
      )}
    </div>
  );
}

export default KPITile;
