// ============================================================================
// VWFS Performance Platform - Status Badge
// ============================================================================

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

function getStatusClasses(status: string): string {
  const normalized = status.toLowerCase().replace(/\s+/g, '_');

  switch (normalized) {
    case 'draft':
    case 'pending':
    case 'cancelled':
      return 'bg-vwfs-surface-dark/30 text-vwfs-text';

    case 'open':
    case 'scheduled':
      return 'bg-vwfs-accent-light/30 text-vwfs-brand';

    case 'in_progress':
    case 'in_review':
    case 'for_review':
    case 'under_review':
    case 'in_negotiation':
      return 'bg-vwfs-warning/40 text-vwfs-text';

    case 'completed':
    case 'approved':
    case 'closed':
    case 'pass':
    case 'qualified':
    case 'renewed':
      return 'bg-vwfs-success text-white';

    case 'failed':
    case 'rejected':
    case 'overdue':
    case 'fail':
    case 'not_qualified':
    case 'lost':
      return 'bg-vwfs-error text-white';

    case 'appealed':
    case 'escalated':
      return 'bg-purple-600 text-white';

    case 'partially_qualified':
    case 'partial':
      return 'bg-vwfs-warning text-vwfs-text';

    default:
      return 'bg-vwfs-surface-dark/30 text-vwfs-text';
  }
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wide whitespace-nowrap ${sizeClasses} ${getStatusClasses(status)}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
