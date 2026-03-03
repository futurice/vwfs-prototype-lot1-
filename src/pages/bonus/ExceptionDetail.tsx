import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Send, Clock, Shield } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ApprovalTimeline } from '../../components/common/ApprovalTimeline';
import { useAppStore } from '../../stores/appStore';
import type { Exception, ApprovalStage, InternalChatMessage, AuditTrailEntry } from '../../types';

// Generate a rich exception for this showpiece page
function buildException(id: string): Exception {
  const stages: ApprovalStage[] = [
    {
      stage_number: 1,
      stage_name: 'Area Manager Review',
      approver_id: 'usr-003',
      approver_name: 'Emily Chen',
      approver_role: 'area_manager',
      status: 'Approved',
      decision_date: '2026-02-10T14:30:00Z',
      notes: 'Reviewed supporting documentation. The delivery delay is clearly evidenced by factory communication. Approved.',
    },
    {
      stage_number: 2,
      stage_name: 'National Manager',
      approver_id: 'usr-004',
      approver_name: 'Richard Thompson',
      approver_role: 'national',
      status: 'Approved',
      decision_date: '2026-02-13T09:15:00Z',
      notes: 'Consistent with similar cases approved in Q3. Value is within threshold.',
    },
    {
      stage_number: 3,
      stage_name: 'Head of Bonus',
      approver_id: 'usr-005',
      approver_name: 'Alexandra Foster',
      approver_role: 'head_office',
      status: 'Pending',
    },
    {
      stage_number: 4,
      stage_name: 'Finance Director',
      approver_id: 'usr-011',
      approver_name: 'Lisa Turner',
      approver_role: 'head_office',
      status: 'Pending',
    },
  ];

  const chat: InternalChatMessage[] = [
    { id: 'chat-1', author_id: 'usr-003', author_name: 'Emily Chen', author_role: 'area_manager', content: 'I have reviewed this exception. The retailer has provided clear evidence of factory delay. The 5 VINs were all part of the same fleet order and were impacted by a supply chain issue.', timestamp: '2026-02-10T10:00:00Z' },
    { id: 'chat-2', author_id: 'usr-004', author_name: 'Richard Thompson', author_role: 'national', content: 'Thanks Emily. The total value of £8,750 is within the auto-approval threshold for fleet orders. I agree this should be approved.', timestamp: '2026-02-12T15:30:00Z' },
    { id: 'chat-3', author_id: 'usr-005', author_name: 'Alexandra Foster', author_role: 'head_office', content: 'Just to confirm - do we have the original factory communication letter on file? I need to see that before I can sign off.', timestamp: '2026-02-14T09:00:00Z' },
    { id: 'chat-4', author_id: 'usr-003', author_name: 'Emily Chen', author_role: 'area_manager', content: 'Yes, it was uploaded as attachment EXC-2025-2001-att-001. The letter from the factory confirms the delay for all 5 VINs.', timestamp: '2026-02-14T09:45:00Z' },
  ];

  const audit: AuditTrailEntry[] = [
    { id: 'aud-1', timestamp: '2026-02-08T10:00:00Z', user_id: 'usr-001', user_name: 'Sarah Mitchell', action: 'Created', details: 'Exception created from enquiry ENQ-2025-1000' },
    { id: 'aud-2', timestamp: '2026-02-08T10:01:00Z', user_id: 'system', user_name: 'System', action: 'Workflow Started', details: 'Approval workflow initiated - 4 stages' },
    { id: 'aud-3', timestamp: '2026-02-10T14:30:00Z', user_id: 'usr-003', user_name: 'Emily Chen', action: 'Stage 1 Approved', details: 'Area Manager review passed' },
    { id: 'aud-4', timestamp: '2026-02-13T09:15:00Z', user_id: 'usr-004', user_name: 'Richard Thompson', action: 'Stage 2 Approved', details: 'National Manager review passed' },
    { id: 'aud-5', timestamp: '2026-02-14T09:00:00Z', user_id: 'usr-005', user_name: 'Alexandra Foster', action: 'Comment Added', details: 'Requested factory communication letter' },
  ];

  return {
    id: id || 'exc-001',
    exception_id: 'EXC-2025-2001',
    status: 'In Progress',
    brand: 'VWPC',
    business_area: 'Fleet',
    bonus_type: 'Margin',
    reason: 'Factory production delay impacting bonus qualification',
    description: 'Five vehicles from a fleet order of 12 were delayed in production by 6 weeks due to a semiconductor shortage at the Wolfsburg plant. The vehicles were ordered in Q3 2025 but delivered in Q4, causing them to fall outside the bonus qualification period. The retailer requests the bonus be attributed to the original Q3 order date.',
    retailer_id: 'ret-001',
    retailer_name: 'Volkswagen Milton Keynes',
    retailer_code: 'RET001',
    escalated_from_enquiry: 'enq-001',
    created_by: 'usr-001',
    created_by_name: 'Sarah Mitchell',
    created_date: '2026-02-08T10:00:00Z',
    updated_date: '2026-02-14T09:45:00Z',
    vins: [
      { vin: 'WVWZZZ3CZWE100001', model: 'Tiguan', variant: 'R-Line', registration_number: 'AB25 DEF', handover_date: '2025-10-15', bonus_amount: 1750 },
      { vin: 'WVWZZZ3CZWE100002', model: 'Tiguan', variant: 'R-Line', registration_number: 'AB25 GHJ', handover_date: '2025-10-15', bonus_amount: 1750 },
      { vin: 'WVWZZZ3CZWE100003', model: 'Tiguan', variant: 'SEL', registration_number: 'AB25 KLM', handover_date: '2025-10-18', bonus_amount: 1750 },
      { vin: 'WVWZZZ3CZWE100004', model: 'Passat', variant: 'SE', registration_number: 'CD25 NPR', handover_date: '2025-10-20', bonus_amount: 1750 },
      { vin: 'WVWZZZ3CZWE100005', model: 'Passat', variant: 'SE', registration_number: 'CD25 ABC', handover_date: '2025-10-22', bonus_amount: 1750 },
    ],
    approval_stages: stages,
    current_stage: 3,
    internal_chat: chat,
    audit_trail: audit,
    attachments: [
      { id: 'att-1', filename: 'factory_delay_letter.pdf', file_type: 'application/pdf', file_size: 185000, uploaded_by: 'usr-001', uploaded_date: '2026-02-08T10:05:00Z', url: '#' },
      { id: 'att-2', filename: 'fleet_order_confirmation.xlsx', file_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', file_size: 42000, uploaded_by: 'usr-001', uploaded_date: '2026-02-08T10:06:00Z', url: '#' },
    ],
    total_value: 8750,
    comments: [],
  };
}

export function ExceptionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [chatMessage, setChatMessage] = useState('');

  const exception = buildException(id || 'exc-001');

  function handleApprove(stageNumber: number) {
    addToast({ type: 'success', message: `Stage ${stageNumber} approved` });
  }

  function handleReject(stageNumber: number) {
    addToast({ type: 'error', message: `Stage ${stageNumber} rejected` });
  }

  function handleRequestChanges(stageNumber: number) {
    addToast({ type: 'warning', message: `Changes requested for stage ${stageNumber}` });
  }

  function handleAddStage() {
    addToast({ type: 'info', message: 'Additional approval stage added' });
  }

  function handleDeputise(stageNumber: number) {
    addToast({ type: 'info', message: `Deputisation requested for stage ${stageNumber}` });
  }

  function handleSendChat() {
    if (chatMessage.trim()) {
      addToast({ type: 'success', message: 'Message sent' });
      setChatMessage('');
    }
  }

  const roleColorMap: Record<string, string> = {
    retailer: 'bg-blue-100 text-blue-700',
    area_manager: 'bg-green-100 text-green-700',
    national: 'bg-purple-100 text-purple-700',
    head_office: 'bg-amber-100 text-amber-700',
    field_force: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/bonus/exceptions')}
        className="text-sm text-vwfs-text/60 hover:text-vwfs-brand flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back to Exceptions
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-vwfs-brand">{exception.exception_id}</h1>
            <StatusBadge status={exception.status} />
          </div>
          <p className="text-sm text-vwfs-text/60">{exception.reason}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-vwfs-text/50">Total Value</p>
          <p className="text-2xl font-bold text-vwfs-brand">
            £{exception.total_value.toLocaleString()}
          </p>
        </div>
      </div>

      {/* SHOWPIECE: Approval Timeline */}
      <ApprovalTimeline
        stages={exception.approval_stages}
        currentStage={exception.current_stage}
        onApprove={handleApprove}
        onReject={handleReject}
        onRequestChanges={handleRequestChanges}
        onAddStage={handleAddStage}
        onDeputise={handleDeputise}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Info + VINs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Retailer', value: exception.retailer_name },
              { label: 'Code', value: exception.retailer_code },
              { label: 'Brand', value: exception.brand },
              { label: 'Business Area', value: exception.business_area },
              { label: 'Bonus Type', value: exception.bonus_type },
              { label: 'Created', value: new Date(exception.created_date).toLocaleDateString('en-GB') },
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
            <p className="text-sm text-vwfs-text leading-relaxed">{exception.description}</p>
          </div>

          {/* VINs */}
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">
              Affected VINs ({exception.vins.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-vwfs-surface">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">VIN</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Model</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-vwfs-text/70">Registration</th>
                    <th className="px-3 py-2 text-right text-xs font-semibold text-vwfs-text/70">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {exception.vins.map((vin) => (
                    <tr key={vin.vin} className="border-t border-gray-100">
                      <td className="px-3 py-2 font-mono text-xs">{vin.vin}</td>
                      <td className="px-3 py-2">{vin.model} {vin.variant}</td>
                      <td className="px-3 py-2">{vin.registration_number}</td>
                      <td className="px-3 py-2 text-right font-semibold">£{vin.bonus_amount?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-vwfs-brand">
                    <td colSpan={3} className="px-3 py-2 text-sm font-bold text-vwfs-brand">Total</td>
                    <td className="px-3 py-2 text-right text-sm font-bold text-vwfs-brand">
                      £{exception.total_value.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Audit Trail */}
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3 flex items-center gap-2">
              <Shield size={16} /> Audit Trail
            </h3>
            <div className="space-y-3">
              {exception.audit_trail.map((entry) => (
                <div key={entry.id} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-vwfs-accent mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-vwfs-brand">{entry.action}</span>
                      <span className="text-[10px] text-vwfs-text/40">
                        {new Date(entry.timestamp).toLocaleDateString('en-GB')}{' '}
                        {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-vwfs-text/70">{entry.details}</p>
                    <p className="text-[10px] text-vwfs-text/40">by {entry.user_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Internal Chat */}
        <div className="space-y-6">
          <div className="card flex flex-col h-[600px]">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">Internal Discussion</h3>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {exception.internal_chat.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-vwfs-brand">{msg.author_name}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${roleColorMap[msg.author_role] || 'bg-gray-100 text-gray-600'}`}>
                      {msg.author_role.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-vwfs-text leading-relaxed bg-vwfs-surface rounded-lg p-2.5">
                    {msg.content}
                  </p>
                  <p className="text-[10px] text-vwfs-text/30">
                    {new Date(msg.timestamp).toLocaleDateString('en-GB')}{' '}
                    {new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 border-t border-gray-100 pt-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                className="input-field flex-1 text-xs"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendChat}
                disabled={!chatMessage.trim()}
                className="btn-primary p-2 disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* Attachments */}
          <div className="card">
            <h3 className="text-sm font-bold text-vwfs-brand mb-3">Attachments</h3>
            <ul className="space-y-2">
              {exception.attachments.map((att) => (
                <li
                  key={att.id}
                  className="flex items-center gap-2 bg-vwfs-surface rounded-lg px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-vwfs-brand truncate">{att.filename}</p>
                    <p className="text-[10px] text-vwfs-text/40">{(att.file_size / 1024).toFixed(0)} KB</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Linked Enquiry */}
          {exception.escalated_from_enquiry && (
            <div className="card">
              <h3 className="text-sm font-bold text-vwfs-brand mb-2">Linked Enquiry</h3>
              <Link
                to={`/bonus/enquiries/${exception.escalated_from_enquiry}`}
                className="text-sm text-vwfs-accent hover:underline flex items-center gap-1"
              >
                <Clock size={14} /> View original enquiry
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
