import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { marginRecords } from '../../mocks';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { type ColumnDef } from '@tanstack/react-table';
import type { MarginRecord } from '../../types';

export function MarginOverview() {
  const navigate = useNavigate();
  const passed = marginRecords.filter(m => m.gateway_status === 'Pass').length;
  const failed = marginRecords.filter(m => m.gateway_status === 'Fail').length;
  const partial = marginRecords.filter(m => m.gateway_status === 'Partial').length;
  const avgBonus = marginRecords.reduce((s, m) => s + m.bonus_calculation.bonus_percentage, 0) / marginRecords.length;

  const stats = [
    { label: 'Total Retailers', value: marginRecords.length, color: 'bg-vwfs-brand' },
    { label: 'Passed', value: passed, color: 'bg-vwfs-success' },
    { label: 'Failed', value: failed, color: 'bg-vwfs-error' },
    { label: 'Partial', value: partial, color: 'bg-vwfs-warning' },
    { label: 'Pass Rate', value: `${((passed / marginRecords.length) * 100).toFixed(0)}%`, color: 'bg-vwfs-accent' },
    { label: 'Avg Bonus', value: `${avgBonus.toFixed(1)}%`, color: 'bg-vwfs-brand' },
  ];

  const columns: ColumnDef<MarginRecord>[] = [
    { accessorKey: 'retailer_name', header: 'Retailer', cell: info => <span className="font-medium text-vwfs-brand">{info.getValue() as string}</span> },
    { accessorKey: 'brand', header: 'Brand', cell: info => <span className="text-xs font-bold bg-vwfs-brand text-white px-1.5 py-0.5 rounded">{info.getValue() as string}</span> },
    {
      accessorKey: 'gateway_status',
      header: 'Gateway',
      cell: info => {
        const status = info.getValue() as string;
        return (
          <div className="flex items-center gap-1.5">
            {status === 'Pass' ? <CheckCircle size={16} className="text-vwfs-success" /> : status === 'Fail' ? <XCircle size={16} className="text-vwfs-error" /> : <TrendingUp size={16} className="text-vwfs-warning" />}
            <StatusBadge status={status} size="sm" />
          </div>
        );
      },
    },
    {
      id: 'gateway_score',
      header: 'Gateway Score',
      cell: ({ row }) => <span className="text-sm">{row.original.gateway_passed}/{row.original.gateway_total}</span>,
    },
    {
      id: 'bonus_pct',
      header: 'Bonus %',
      cell: ({ row }) => <span className="font-semibold">{row.original.bonus_calculation.bonus_percentage.toFixed(1)}%</span>,
    },
    {
      id: 'monthly_accrual',
      header: 'Monthly Accrual',
      cell: ({ row }) => <span className="font-medium">£{row.original.bonus_calculation.monthly_accrual.toLocaleString()}</span>,
    },
    {
      id: 'appeal',
      header: 'Appeal',
      cell: ({ row }) => row.original.appeal_submitted ? <StatusBadge status={row.original.appeal_status ?? 'Pending'} size="sm" /> : <span className="text-xs text-vwfs-text/40">—</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Margin Tool</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card text-center">
            <p className="text-xs text-vwfs-text/60 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-vwfs-brand">{s.value}</p>
            <div className={`h-1 ${s.color} rounded-full mt-2`} />
          </div>
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        data={marginRecords}
        columns={columns}
        onRowClick={(row) => navigate(`/margin/${row.id}`)}
        pageSize={15}
      />
    </div>
  );
}
