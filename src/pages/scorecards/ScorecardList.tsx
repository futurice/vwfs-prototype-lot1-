import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandSummaries } from '../../mocks/scorecards';
import type { ScorecardPeriod } from '../../types';

const PERIODS: ScorecardPeriod[] = ['Monthly', 'Quarterly', 'YTD', 'HY1', 'HY2'];

const brandColors: Record<string, string> = {
  VWPC: 'from-blue-600 to-blue-800',
  VWCV: 'from-blue-500 to-indigo-700',
  AUDI: 'from-gray-700 to-black',
  SKODA: 'from-green-600 to-emerald-800',
  SEAT: 'from-orange-500 to-red-600',
  CUPRA: 'from-amber-600 to-yellow-800',
};

export function ScorecardList() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<ScorecardPeriod>('Monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vwfs-brand">Balanced Scorecards</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">
            Performance scorecards by brand - click a brand to view detailed KPIs
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-vwfs-surface rounded-lg p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                period === p
                  ? 'bg-vwfs-brand text-white'
                  : 'text-vwfs-text/60 hover:text-vwfs-brand hover:bg-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {brandSummaries.map((brand) => (
          <div
            key={brand.code}
            onClick={() => navigate(`/scorecards/${brand.code}`)}
            className="card-hover group cursor-pointer overflow-hidden"
          >
            {/* Brand Header */}
            <div
              className={`bg-gradient-to-r ${brandColors[brand.code] || 'from-gray-500 to-gray-700'} -mx-5 -mt-5 px-5 py-4 mb-4`}
            >
              <h3 className="text-lg font-bold text-white">{brand.name}</h3>
              <p className="text-xs text-white/70">{brand.code}</p>
            </div>

            {/* Score & Rank */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs text-vwfs-text/50">Overall Score</p>
                <p className="text-4xl font-bold text-vwfs-brand">{brand.overallScore}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-vwfs-text/50">Rank</p>
                <p className="text-2xl font-bold text-vwfs-brand">
                  #{brand.rank}
                  <span className="text-sm text-vwfs-text/40 font-normal">
                    /{brand.totalRetailers}
                  </span>
                </p>
              </div>
            </div>

            {/* RAG Summary Bar */}
            <div className="flex gap-1 mb-3 h-2 rounded-full overflow-hidden">
              <div
                className="bg-vwfs-success rounded-full"
                style={{ flex: brand.greenCount }}
              />
              <div
                className="bg-vwfs-warning rounded-full"
                style={{ flex: brand.amberCount }}
              />
              <div
                className="bg-vwfs-error rounded-full"
                style={{ flex: brand.redCount }}
              />
            </div>

            {/* RAG Counts */}
            <div className="flex justify-between text-xs text-vwfs-text/60">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-vwfs-success" /> {brand.greenCount} Green
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-vwfs-warning" /> {brand.amberCount} Amber
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-vwfs-error" /> {brand.redCount} Red
              </span>
            </div>

            {/* Below Target */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-vwfs-text/50">
                {brand.kpisBelowTarget} KPIs below target
              </span>
              <span className="text-xs font-semibold text-vwfs-accent group-hover:underline">
                View Scorecard
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
