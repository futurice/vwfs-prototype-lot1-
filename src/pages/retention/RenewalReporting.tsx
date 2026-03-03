import { useState, useMemo } from 'react';
import { retentionSummaries } from '../../mocks';
import { DataTable } from '../../components/common/DataTable';
import { type ColumnDef } from '@tanstack/react-table';
import type { RetentionSummary } from '../../types';

const periods = ['Rolling 3m', 'Rolling 6m', 'YTD', 'QTD'];

export function RenewalReporting() {
  const [period, setPeriod] = useState('YTD');
  const data = retentionSummaries;

  const nationalAvg = useMemo(() => data.reduce((s, r) => s + r.percentage_renewed, 0) / data.length, [data]);
  const top25 = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.percentage_renewed - a.percentage_renewed);
    const top = sorted.slice(0, Math.ceil(sorted.length * 0.25));
    return top.reduce((s, r) => s + r.percentage_renewed, 0) / top.length;
  }, [data]);

  const columns: ColumnDef<RetentionSummary>[] = [
    { accessorKey: 'retailer_name', header: 'Retailer', cell: info => <span className="font-medium text-vwfs-brand">{info.getValue() as string}</span> },
    { accessorKey: 'brand', header: 'Brand', cell: info => <span className="text-xs font-bold bg-vwfs-brand text-white px-1.5 py-0.5 rounded">{info.getValue() as string}</span> },
    {
      accessorKey: 'percentage_renewed',
      header: '% Renewed',
      cell: info => {
        const val = info.getValue() as number;
        const bg = val >= 75 ? 'bg-vwfs-success/20 text-vwfs-success' : val >= 65 ? 'bg-vwfs-warning/30 text-yellow-700' : 'bg-vwfs-error/20 text-vwfs-error';
        return <span className={`px-2 py-0.5 rounded font-semibold text-sm ${bg}`}>{val.toFixed(1)}%</span>;
      },
    },
    { accessorKey: 'renewal_volume', header: 'Volume', cell: info => (info.getValue() as number).toLocaleString() },
    { accessorKey: 'ended_volume', header: 'Ended', cell: info => (info.getValue() as number).toLocaleString() },
    {
      id: 'vs_national',
      header: 'vs National',
      cell: ({ row }) => {
        const diff = row.original.percentage_renewed - nationalAvg;
        return <span className={diff >= 0 ? 'text-vwfs-success font-semibold' : 'text-vwfs-error font-semibold'}>{diff >= 0 ? '+' : ''}{diff.toFixed(1)}%</span>;
      },
    },
    {
      id: 'vs_top25',
      header: 'vs Top 25%',
      cell: ({ row }) => {
        const diff = row.original.percentage_renewed - top25;
        return <span className={diff >= 0 ? 'text-vwfs-success font-semibold' : 'text-vwfs-error font-semibold'}>{diff >= 0 ? '+' : ''}{diff.toFixed(1)}%</span>;
      },
    },
    { accessorKey: 'rank', header: 'Rank', cell: info => <span className="font-medium">#{info.getValue() as number}</span> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Renewal Reporting</h2>
        <div className="flex items-center gap-2">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                period === p ? 'bg-vwfs-accent text-white' : 'bg-white text-vwfs-text border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="card flex items-center gap-8 text-sm">
        <span>National Average: <strong className="text-vwfs-brand">{nationalAvg.toFixed(1)}%</strong></span>
        <span>Top 25%: <strong className="text-vwfs-success">{top25.toFixed(1)}%</strong></span>
        <span>Total Retailers: <strong>{data.length}</strong></span>
        <span>Period: <strong className="text-vwfs-brand">{period}</strong></span>
      </div>

      <DataTable data={data} columns={columns} pageSize={15} />
    </div>
  );
}
