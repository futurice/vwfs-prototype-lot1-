import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ColumnDef } from '@tanstack/react-table';
import type { Exception, BrandCode } from '../../types';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';

const BRAND_TABS: { code: BrandCode; label: string }[] = [
  { code: 'VWPC', label: 'VWPC' },
  { code: 'VWCV', label: 'VWCV' },
  { code: 'SEAT', label: 'SEAT' },
  { code: 'CUPRA', label: 'CUPRA' },
  { code: 'SKODA', label: 'SKODA' },
  { code: 'AUDI', label: 'AUDI' },
];

// Generate inline exception data since mocks may not have it
function generateExceptions(): Exception[] {
  const statuses: Exception['status'][] = ['Pending', 'In Progress', 'Approved', 'Rejected', 'Escalated'];
  const brands: BrandCode[] = ['VWPC', 'VWCV', 'SEAT', 'CUPRA', 'SKODA', 'AUDI'];
  const retailers = [
    { id: 'ret-001', name: 'Volkswagen Milton Keynes', code: 'RET001' },
    { id: 'ret-003', name: 'Volkswagen Leeds', code: 'RET003' },
    { id: 'ret-011', name: 'VW Van Centre London', code: 'RET011' },
    { id: 'ret-015', name: 'SEAT Maidstone', code: 'RET015' },
    { id: 'ret-020', name: 'CUPRA London City', code: 'RET020' },
    { id: 'ret-024', name: 'SKODA Cheltenham', code: 'RET024' },
    { id: 'ret-031', name: 'Audi Reading', code: 'RET031' },
    { id: 'ret-033', name: 'Audi Liverpool', code: 'RET033' },
  ];

  return Array.from({ length: 48 }, (_, i) => {
    const status = statuses[i % statuses.length];
    const brand = brands[i % brands.length];
    const retailer = retailers[i % retailers.length];
    const totalStages = 4;
    const currentStage = status === 'Approved' ? totalStages : 1 + (i % totalStages);
    const approvedCount = status === 'Approved' ? totalStages : currentStage - 1;

    return {
      id: `exc-${String(i + 1).padStart(3, '0')}`,
      exception_id: `EXC-2025-${String(2000 + i)}`,
      status,
      brand,
      business_area: (['Retail', 'Fleet', 'Direct'] as const)[i % 3],
      bonus_type: (['Margin', 'Catch-Back', 'Tactical'] as const)[i % 3],
      reason: 'Exception raised for bonus qualification review',
      description: 'Detailed description of the exception circumstances.',
      retailer_id: retailer.id,
      retailer_name: retailer.name,
      retailer_code: retailer.code,
      escalated_from_enquiry: i % 3 === 0 ? `enq-${String(i + 1).padStart(3, '0')}` : undefined,
      created_by: 'usr-001',
      created_by_name: 'Sarah Mitchell',
      created_date: new Date(2025, 5 + (i % 8), 1 + (i % 28)).toISOString(),
      updated_date: new Date(2026, 1, 1 + (i % 28)).toISOString(),
      resolved_date: status === 'Approved' || status === 'Rejected' ? new Date(2026, 1, 15 + (i % 14)).toISOString() : undefined,
      vins: [],
      approval_stages: Array.from({ length: totalStages }, (_, s) => ({
        stage_number: s + 1,
        stage_name: ['Area Manager', 'National Manager', 'Head of Bonus', 'Finance Director'][s],
        approver_id: `usr-${3 + s}`,
        approver_name: ['Emily Chen', 'Richard Thompson', 'Alexandra Foster', 'Lisa Turner'][s],
        approver_role: (['area_manager', 'national', 'head_office', 'head_office'] as const)[s],
        status: s < approvedCount ? 'Approved' as const : s === approvedCount && status !== 'Approved' ? 'Pending' as const : 'Pending' as const,
        decision_date: s < approvedCount ? new Date(2026, 1, 5 + s * 3).toISOString() : undefined,
        notes: s < approvedCount ? 'Approved - meets criteria' : undefined,
      })),
      current_stage: currentStage,
      internal_chat: [],
      audit_trail: [],
      attachments: [],
      total_value: 1500 + i * 250,
      comments: [],
    };
  });
}

const exceptions = generateExceptions();

export function ExceptionList() {
  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState<BrandCode>('VWPC');

  const filteredExceptions = useMemo(
    () => exceptions.filter((e) => e.brand === activeBrand),
    [activeBrand],
  );

  const columns: ColumnDef<Exception, unknown>[] = [
    {
      accessorKey: 'exception_id',
      header: 'ID',
      cell: (info) => (
        <span className="font-mono text-xs font-semibold text-vwfs-brand">
          {info.getValue() as string}
        </span>
      ),
      size: 130,
    },
    {
      accessorKey: 'retailer_name',
      header: 'Retailer',
    },
    {
      accessorKey: 'business_area',
      header: 'Business Area',
      size: 110,
    },
    {
      accessorKey: 'bonus_type',
      header: 'Bonus Type',
      size: 110,
    },
    {
      accessorKey: 'total_value',
      header: 'Value',
      cell: (info) => (
        <span className="font-semibold">
          £{(info.getValue() as number).toLocaleString()}
        </span>
      ),
      size: 100,
    },
    {
      id: 'approval_progress',
      header: 'Approval',
      cell: ({ row }) => {
        const exc = row.original;
        const approved = exc.approval_stages.filter((s) => s.status === 'Approved').length;
        const total = exc.approval_stages.length;
        const pct = (approved / total) * 100;
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-vwfs-success rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-vwfs-text/60 whitespace-nowrap">
              {approved} of {total}
            </span>
          </div>
        );
      },
      size: 140,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue() as string} size="sm" />,
      size: 110,
    },
    {
      accessorKey: 'created_date',
      header: 'Created',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-GB'),
      size: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-vwfs-brand">Bonus Exceptions</h1>
        <p className="text-sm text-vwfs-text/60 mt-1">
          Multi-stage approval workflows for bonus exception requests
        </p>
      </div>

      {/* Brand Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {BRAND_TABS.map((tab) => (
          <button
            key={tab.code}
            onClick={() => setActiveBrand(tab.code)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeBrand === tab.code
                ? 'border-vwfs-accent text-vwfs-brand'
                : 'border-transparent text-vwfs-text/50 hover:text-vwfs-text hover:border-gray-300'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-vwfs-text/40">
              ({exceptions.filter((e) => e.brand === tab.code).length})
            </span>
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(['Pending', 'In Progress', 'Approved', 'Rejected', 'Escalated'] as const).map((status) => {
          const count = filteredExceptions.filter((e) => e.status === status).length;
          return (
            <div key={status} className="card text-center">
              <StatusBadge status={status} size="sm" />
              <p className="text-2xl font-bold text-vwfs-brand mt-2">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredExceptions}
        columns={columns}
        onRowClick={(row) => navigate(`/bonus/exceptions/${row.id}`)}
        searchable
        exportable
        pageSize={10}
      />
    </div>
  );
}
