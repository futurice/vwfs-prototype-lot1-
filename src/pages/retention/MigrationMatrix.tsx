import { useState, useMemo } from 'react';
import { Modal } from '../../components/common/Modal';

const vwModels = ['Golf', 'Polo', 'Tiguan', 'T-Roc', 'ID.3', 'ID.4', 'Passat', 'T-Cross'];
const skodaModels = ['Octavia', 'Fabia', 'Superb', 'Karoq', 'Kodiaq', 'Kamiq', 'Enyaq', 'Scala'];
const seatModels = ['Leon', 'Ibiza', 'Ateca', 'Arona', 'Tarraco', 'Formentor', 'Born'];
const audiModels = ['A3', 'A4', 'Q3', 'Q5', 'A1', 'Q2', 'e-tron', 'Q8'];

type BrandOption = 'VW' | 'SKODA' | 'SEAT' | 'AUDI';

const brandModels: Record<BrandOption, string[]> = {
  VW: vwModels,
  SKODA: skodaModels,
  SEAT: seatModels,
  AUDI: audiModels,
};

function generateMatrix(models: string[]) {
  const data: Record<string, Record<string, number>> = {};
  models.forEach(from => {
    data[from] = {};
    models.forEach(to => {
      data[from][to] = from === to
        ? Math.floor(20 + Math.random() * 60)
        : Math.floor(Math.random() * 18);
    });
    data[from]['Lost'] = Math.floor(2 + Math.random() * 12);
  });
  return data;
}

function getHeatColor(value: number, max: number): string {
  if (value === 0) return 'bg-white';
  const intensity = value / max;
  if (intensity > 0.7) return 'bg-vwfs-brand text-white';
  if (intensity > 0.5) return 'bg-vwfs-brand/70 text-white';
  if (intensity > 0.3) return 'bg-vwfs-brand/40 text-white';
  if (intensity > 0.15) return 'bg-vwfs-accent-light/50';
  return 'bg-vwfs-accent-light/20';
}

export function MigrationMatrix() {
  const [brand, setBrand] = useState<BrandOption>('VW');
  const [selectedCell, setSelectedCell] = useState<{ from: string; to: string } | null>(null);
  const models = brandModels[brand];

  const matrix = useMemo(() => generateMatrix(models), [models]);
  const allColumns = [...models, 'Lost'];

  const maxVal = useMemo(() => {
    let max = 0;
    Object.values(matrix).forEach(row => {
      Object.values(row).forEach(v => { if (v > max) max = v; });
    });
    return max;
  }, [matrix]);

  const totalRow = useMemo(() => {
    const totals: Record<string, number> = {};
    allColumns.forEach(col => {
      totals[col] = models.reduce((s, from) => s + (matrix[from]?.[col] ?? 0), 0);
    });
    return totals;
  }, [matrix, models, allColumns]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Model Migration Matrix</h2>
        <div className="flex items-center gap-3">
          {(Object.keys(brandModels) as BrandOption[]).map(b => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                brand === b ? 'bg-vwfs-brand text-white' : 'bg-white text-vwfs-text border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="card flex items-center gap-4 text-xs">
        <span className="font-semibold text-vwfs-text">Colour intensity = migration volume</span>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-vwfs-accent-light/20 border border-gray-200" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-vwfs-brand/40" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-vwfs-brand" />
          <span>High</span>
        </div>
        <div className="ml-4 flex items-center gap-1">
          <span className="w-6 h-4 border-2 border-vwfs-accent" />
          <span>Same model (diagonal)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-vwfs-error/20 border border-vwfs-error/30" />
          <span>Lost to competitor</span>
        </div>
      </div>

      {/* Matrix */}
      <div className="card overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="px-3 py-2 bg-vwfs-brand text-white text-left sticky left-0 z-10 min-w-[120px]">
                Original ↓ / Renewal →
              </th>
              {allColumns.map(col => (
                <th
                  key={col}
                  className={`px-3 py-2 text-center font-semibold min-w-[80px] ${
                    col === 'Lost' ? 'bg-vwfs-error/10 text-vwfs-error' : 'bg-vwfs-brand text-white'
                  }`}
                >
                  {col}
                </th>
              ))}
              <th className="px-3 py-2 bg-vwfs-brand text-white text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {models.map(from => {
              const rowTotal = allColumns.reduce((s, col) => s + (matrix[from]?.[col] ?? 0), 0);
              return (
                <tr key={from} className="border-b border-gray-100">
                  <td className="px-3 py-2 font-semibold text-vwfs-brand bg-white sticky left-0 z-10">
                    {from}
                  </td>
                  {allColumns.map(to => {
                    const val = matrix[from]?.[to] ?? 0;
                    const isDiagonal = from === to;
                    const isLost = to === 'Lost';
                    const pct = rowTotal > 0 ? ((val / rowTotal) * 100).toFixed(0) : '0';
                    return (
                      <td
                        key={to}
                        onClick={() => val > 0 && setSelectedCell({ from, to })}
                        className={`px-3 py-2 text-center cursor-pointer transition-all hover:ring-2 hover:ring-vwfs-accent hover:z-10 ${
                          isLost ? 'bg-vwfs-error/10' : getHeatColor(val, maxVal)
                        } ${isDiagonal ? 'ring-2 ring-vwfs-accent ring-inset' : ''}`}
                      >
                        <div className="font-semibold">{val}</div>
                        <div className="text-[10px] opacity-60">{pct}%</div>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-center font-bold bg-gray-50">{rowTotal}</td>
                </tr>
              );
            })}
            {/* Totals row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-3 py-2 sticky left-0 z-10 bg-gray-100">Total</td>
              {allColumns.map(col => (
                <td key={col} className="px-3 py-2 text-center">{totalRow[col]}</td>
              ))}
              <td className="px-3 py-2 text-center font-bold">
                {Object.values(totalRow).reduce((s, v) => s + v, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Drill-down Modal */}
      <Modal
        open={!!selectedCell}
        onClose={() => setSelectedCell(null)}
        title={selectedCell ? `${selectedCell.from} → ${selectedCell.to === 'Lost' ? 'Lost to Competitor' : selectedCell.to}` : ''}
        size="lg"
      >
        {selectedCell && (
          <div>
            <p className="text-sm text-vwfs-text/60 mb-4">
              {matrix[selectedCell.from]?.[selectedCell.to] ?? 0} customers migrated from {selectedCell.from} to {selectedCell.to === 'Lost' ? 'competitor brands' : selectedCell.to}
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-vwfs-surface">
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Contract</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.min(matrix[selectedCell.from]?.[selectedCell.to] ?? 0, 8) }, (_, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="px-3 py-2">{['J. Smith', 'M. Johnson', 'S. Williams', 'A. Brown', 'R. Jones', 'K. Taylor', 'L. Davies', 'P. Wilson'][i]}</td>
                    <td className="px-3 py-2 text-vwfs-text/70">VWF-{String(200000 + i).slice(1)}</td>
                    <td className="px-3 py-2 text-vwfs-text/70">{new Date(2026, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB')}</td>
                    <td className="px-3 py-2"><span className="text-xs font-semibold text-vwfs-success">Renewed</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
}
