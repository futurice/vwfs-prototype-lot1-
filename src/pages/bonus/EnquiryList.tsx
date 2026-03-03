import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Enquiry, BrandCode } from '../../types';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { enquiries } from '../../mocks/enquiries';

const BRAND_TABS: { code: BrandCode; label: string }[] = [
  { code: 'VWPC', label: 'VWPC' },
  { code: 'VWCV', label: 'VWCV' },
  { code: 'SEAT', label: 'SEAT' },
  { code: 'CUPRA', label: 'CUPRA' },
  { code: 'SKODA', label: 'SKODA' },
];

export function EnquiryList() {
  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState<BrandCode>('VWPC');

  const filteredEnquiries = useMemo(
    () => enquiries.filter((e) => e.brand === activeBrand),
    [activeBrand],
  );

  const columns: ColumnDef<Enquiry, unknown>[] = [
    {
      accessorKey: 'enquiry_id',
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
      size: 110,
    },
  ];

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEnquiries.forEach((e) => {
      counts[e.status] = (counts[e.status] || 0) + 1;
    });
    return counts;
  }, [filteredEnquiries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-vwfs-brand">Bonus Enquiries</h1>
          <p className="text-sm text-vwfs-text/60 mt-1">
            Manage bonus enquiries across all brands
          </p>
        </div>
        <button
          onClick={() => navigate('/bonus/enquiries/new')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          New Enquiry
        </button>
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
              ({enquiries.filter((e) => e.brand === tab.code).length})
            </span>
          </button>
        ))}
      </div>

      {/* Status Chips */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span
            key={status}
            className="inline-flex items-center gap-1.5 rounded-full bg-vwfs-surface px-3 py-1 text-xs font-medium text-vwfs-text"
          >
            <StatusBadge status={status} size="sm" />
            <span>{count}</span>
          </span>
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredEnquiries}
        columns={columns}
        onRowClick={(row) => navigate(`/bonus/enquiries/${row.id}`)}
        searchable
        exportable
        pageSize={12}
      />
    </div>
  );
}
