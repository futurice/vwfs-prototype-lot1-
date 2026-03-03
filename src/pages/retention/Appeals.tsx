import { useState } from 'react';
import { appeals } from '../../mocks';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { useAppStore } from '../../stores/appStore';
import { useRole } from '../../hooks';
import { type ColumnDef } from '@tanstack/react-table';
import type { Appeal } from '../../types';
import { Download, Upload } from 'lucide-react';

export function Appeals() {
  const { addToast } = useAppStore();
  const { isHeadOffice } = useRole();
  const [submitOpen, setSubmitOpen] = useState(false);

  const pending = appeals.filter(a => a.status === 'Pending').length;
  const approved = appeals.filter(a => a.status === 'Approved').length;
  const rejected = appeals.filter(a => a.status === 'Rejected').length;
  const underReview = appeals.filter(a => a.status === 'Under Review').length;

  const stats = [
    { label: 'Pending', count: pending, color: 'bg-vwfs-warning' },
    { label: 'Under Review', count: underReview, color: 'bg-vwfs-accent-light' },
    { label: 'Approved', count: approved, color: 'bg-vwfs-success' },
    { label: 'Rejected', count: rejected, color: 'bg-vwfs-error' },
  ];

  const columns: ColumnDef<Appeal>[] = [
    { accessorKey: 'id', header: 'Appeal ID', cell: info => <span className="font-mono text-xs">{(info.getValue() as string).slice(0, 12)}</span> },
    { accessorKey: 'retailer_name', header: 'Retailer', cell: info => <span className="font-medium">{info.getValue() as string}</span> },
    { accessorKey: 'customer_name', header: 'Customer' },
    { accessorKey: 'reason', header: 'Reason', cell: info => <span className="text-xs max-w-[200px] truncate block">{info.getValue() as string}</span> },
    { accessorKey: 'submitted_date', header: 'Submitted', cell: info => new Date(info.getValue() as string).toLocaleDateString('en-GB') },
    { accessorKey: 'status', header: 'Status', cell: info => <StatusBadge status={info.getValue() as string} size="sm" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[30px] font-bold text-vwfs-brand">Retention Appeals</h2>
        <div className="flex items-center gap-3">
          {isHeadOffice && (
            <>
              <button className="btn-secondary text-sm flex items-center gap-2" onClick={() => addToast({ type: 'success', message: 'Appeals data downloaded' })}>
                <Download size={14} /> Download All
              </button>
              <button className="btn-secondary text-sm flex items-center gap-2" onClick={() => addToast({ type: 'info', message: 'Upload decisions file to process' })}>
                <Upload size={14} /> Upload Decisions
              </button>
            </>
          )}
          <button className="btn-primary text-sm" onClick={() => setSubmitOpen(true)}>Submit Appeal</button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg ${s.color} flex items-center justify-center`}>
              <span className="text-xl font-bold text-white">{s.count}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-vwfs-text">{s.label}</p>
              <p className="text-xs text-vwfs-text/50">appeals</p>
            </div>
          </div>
        ))}
      </div>

      <DataTable data={appeals} columns={columns} pageSize={10} />

      {/* Submit Appeal Modal */}
      <Modal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        title="Submit Retention Appeal"
        size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setSubmitOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => { setSubmitOpen(false); addToast({ type: 'success', message: 'Appeal submitted successfully' }); }}>
              Submit Appeal
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-vwfs-text mb-1">Reason for Appeal</label>
            <textarea className="input-field" rows={3} placeholder="Describe why this renewal should be reconsidered..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-vwfs-text mb-1">Old Contract Number</label>
              <input className="input-field" placeholder="e.g., VWF-100234" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-vwfs-text mb-1">New Contract Number</label>
              <input className="input-field" placeholder="e.g., VWF-200567" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-vwfs-text mb-1">Renewal Date</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-vwfs-text mb-1">Customer Name</label>
              <input className="input-field" placeholder="Full customer name" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
