import { useNavigate } from 'react-router-dom';
import type { BrandCode } from '../../types';

interface BrandTile {
  code: BrandCode;
  name: string;
  totalKPIs: number;
  green: number;
  amber: number;
  red: number;
  avgScore: number;
}

const brandTiles: BrandTile[] = [
  { code: 'VWPC', name: 'Volkswagen Passenger Cars', totalKPIs: 24, green: 14, amber: 6, red: 4, avgScore: 78 },
  { code: 'VWCV', name: 'Volkswagen Commercial Vehicles', totalKPIs: 18, green: 12, amber: 4, red: 2, avgScore: 82 },
  { code: 'AUDI', name: 'Audi', totalKPIs: 22, green: 16, amber: 4, red: 2, avgScore: 85 },
  { code: 'SKODA', name: 'Skoda', totalKPIs: 20, green: 10, amber: 6, red: 4, avgScore: 71 },
  { code: 'SEAT', name: 'SEAT', totalKPIs: 16, green: 9, amber: 4, red: 3, avgScore: 76 },
  { code: 'CUPRA', name: 'CUPRA', totalKPIs: 14, green: 11, amber: 2, red: 1, avgScore: 88 },
];

const brandGradients: Record<string, string> = {
  VWPC: 'from-blue-600 to-blue-800',
  VWCV: 'from-blue-500 to-indigo-700',
  AUDI: 'from-gray-700 to-black',
  SKODA: 'from-green-600 to-emerald-800',
  SEAT: 'from-orange-500 to-red-600',
  CUPRA: 'from-amber-600 to-yellow-800',
};

export function DashboardLanding() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-vwfs-brand">Performance Dashboards</h1>
        <p className="text-sm text-vwfs-text/60 mt-1">
          Select a brand to view detailed KPI performance dashboards
        </p>
      </div>

      {/* Brand Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {brandTiles.map((brand) => {
          return (
            <div
              key={brand.code}
              onClick={() => navigate(`/dashboards/${brand.code}`)}
              className="card-hover group cursor-pointer overflow-hidden"
            >
              {/* Brand bar */}
              <div
                className={`bg-gradient-to-r ${brandGradients[brand.code]} -mx-5 -mt-5 px-5 py-4 mb-4`}
              >
                <h3 className="text-lg font-bold text-white">{brand.name}</h3>
                <p className="text-xs text-white/70">{brand.totalKPIs} KPIs tracked</p>
              </div>

              {/* Average Score */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-vwfs-text/50">Avg. Achievement</p>
                  <p className="text-3xl font-bold text-vwfs-brand">{brand.avgScore}%</p>
                </div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  brand.avgScore >= 80 ? 'bg-vwfs-success' : brand.avgScore >= 65 ? 'bg-vwfs-warning text-vwfs-text' : 'bg-vwfs-error'
                }`}>
                  {brand.avgScore >= 80 ? 'A' : brand.avgScore >= 65 ? 'B' : 'C'}
                </div>
              </div>

              {/* RAG bar */}
              <div className="flex gap-0.5 h-3 rounded-full overflow-hidden mb-3">
                <div className="bg-vwfs-success" style={{ flex: brand.green }} />
                <div className="bg-vwfs-warning" style={{ flex: brand.amber }} />
                <div className="bg-vwfs-error" style={{ flex: brand.red }} />
              </div>

              {/* RAG Legend */}
              <div className="flex justify-between text-xs text-vwfs-text/60 mb-3">
                <span>{brand.green} Green</span>
                <span>{brand.amber} Amber</span>
                <span>{brand.red} Red</span>
              </div>

              <div className="pt-3 border-t border-gray-100 text-right">
                <span className="text-xs font-semibold text-vwfs-accent group-hover:underline">
                  View Dashboard
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
