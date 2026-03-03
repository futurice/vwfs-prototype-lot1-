import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/appStore';
import { enquiries } from '../../mocks/enquiries';

export function EnquiryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [newComment, setNewComment] = useState('');

  const enquiry = enquiries.find((e) => e.id === id);

  if (!enquiry) {
    return (
      <div className="text-center py-20">
        <p className="text-vwfs-text/50 text-lg">Enquiry not found</p>
        <Link to="/bonus/enquiries" className="text-vwfs-accent text-sm hover:underline mt-2 inline-block">
          Back to Enquiries
        </Link>
      </div>
    );
  }

  function handleAddComment() {
    if (newComment.trim()) {
      addToast({ type: 'success', message: 'Comment added' });
      setNewComment('');
    }
  }

  function handleEscalate() {
    addToast({ type: 'info', message: 'Enquiry escalated to exception' });
  }

  function handleClose() {
    addToast({ type: 'success', message: 'Enquiry closed' });
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/bonus/enquiries')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Enquiries
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-vwfs-brand">{enquiry.enquiry_id}</h1>
            <StatusBadge status={enquiry.status} />
          </div>
          <p className="text-sm text-vwfs-text/60">{enquiry.reason}</p>
        </div>
        <div className="flex gap-2">
          {enquiry.status !== 'Closed' && (
            <>
              <button onClick={handleEscalate} className="btn-secondary flex items-center gap-1.5 text-sm">
                <AlertTriangle size={14} /> Escalate
              </button>
              <button onClick={handleClose} className="btn-primary flex items-center gap-1.5 text-sm">
                <CheckCircle size={14} /> Close Enquiry
              </button>
            </>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Retailer', value: enquiry.retailer_name },
          { label: 'Retailer Code', value: enquiry.retailer_code },
          { label: 'Brand', value: enquiry.brand },
          { label: 'Business Area', value: enquiry.business_area },
          { label: 'Bonus Type', value: enquiry.bonus_type },
          { label: 'Created By', value: enquiry.created_by_name },
          { label: 'Assigned To', value: enquiry.assigned_to_name || 'Unassigned' },
          { label: 'Created', value: new Date(enquiry.created_date).toLocaleDateString('en-GB') },
        ].map((item) => (
          <div key={item.label} className="bg-vwfs-surface rounded-lg p-3">
            <p className="text-xs text-vwfs-text/50 mb-0.5">{item.label}</p>
            <p className="text-sm font-semibold text-vwfs-brand">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-2">Description</h3>
        <p className="text-sm text-vwfs-text leading-relaxed">{enquiry.description}</p>
      </div>

      {/* VIN Table */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-3">
          VINs ({enquiry.vins.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-vwfs-surface">
                <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">VIN</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Model</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Variant</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Registration</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Customer</th>
                <th className="px-3 py-2 text-right text-xs font-semibold text-vwfs-text/70">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {enquiry.vins.map((vin) => (
                <tr key={vin.vin} className="border-t border-gray-100 hover:bg-vwfs-surface/50">
                  <td className="px-3 py-2 font-mono text-xs">{vin.vin}</td>
                  <td className="px-3 py-2">{vin.model}</td>
                  <td className="px-3 py-2 text-vwfs-text/60">{vin.variant}</td>
                  <td className="px-3 py-2">{vin.registration_number}</td>
                  <td className="px-3 py-2">{vin.customer_name}</td>
                  <td className="px-3 py-2 text-right font-semibold">
                    {vin.bonus_amount != null ? `£${vin.bonus_amount.toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comments */}
      <div className="card">
        <h3 className="text-sm font-bold text-vwfs-brand mb-3">
          Comments ({enquiry.comments.length})
        </h3>

        <div className="space-y-4 mb-4">
          {enquiry.comments.length === 0 && (
            <p className="text-sm text-vwfs-text/40 text-center py-4">No comments yet</p>
          )}
          {enquiry.comments.map((comment) => (
            <div key={comment.id} className="border-l-2 border-vwfs-accent-light pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-vwfs-brand">{comment.author_name}</span>
                <span className="text-xs text-vwfs-text/40">
                  {new Date(comment.created_date).toLocaleDateString('en-GB')}
                </span>
                {comment.is_internal && (
                  <span className="text-[10px] bg-vwfs-warning/30 text-vwfs-text px-1.5 py-0.5 rounded-full font-semibold">
                    Internal
                  </span>
                )}
              </div>
              <p className="text-sm text-vwfs-text leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            className="input-field flex-1 resize-none"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="btn-primary self-end flex items-center gap-1 disabled:opacity-50"
          >
            <Send size={14} /> Send
          </button>
        </div>
      </div>

      {/* Attachments */}
      {enquiry.attachments.length > 0 && (
        <div className="card">
          <h3 className="text-sm font-bold text-vwfs-brand mb-3">Attachments</h3>
          <ul className="space-y-2">
            {enquiry.attachments.map((att) => (
              <li
                key={att.id}
                className="flex items-center gap-3 bg-vwfs-surface rounded-lg px-3 py-2 text-sm"
              >
                <span className="font-medium text-vwfs-brand">{att.filename}</span>
                <span className="text-xs text-vwfs-text/40">
                  {(att.file_size / 1024).toFixed(0)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
