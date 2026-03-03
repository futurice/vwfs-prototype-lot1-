// ============================================================================
// VWFS Performance Platform - Breadcrumbs
// ============================================================================

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '': 'Home',
  bonus: 'Bonus',
  enquiries: 'Enquiries',
  exceptions: 'Exceptions',
  scorecards: 'Scorecards',
  dashboards: 'Dashboards',
  actions: 'Actions',
  visits: 'Visits',
  margin: 'Margin Tool',
  retention: 'Retention',
  new: 'New',
  edit: 'Edit',
  detail: 'Detail',
};

function formatSegment(segment: string): string {
  // Check for known labels
  if (routeLabels[segment]) return routeLabels[segment];
  // If it looks like an ID, show it shorter
  if (segment.match(/^[a-f0-9-]{8,}$/i)) return `#${segment.slice(0, 8)}`;
  // Title case
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return (
      <nav className="flex items-center gap-1.5 text-sm text-vwfs-text/60">
        <Home size={14} className="text-vwfs-brand" />
        <span className="font-medium text-vwfs-brand">Home</span>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm text-vwfs-text/60">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-vwfs-brand transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>
      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        return (
          <span key={path} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            {isLast ? (
              <span className="font-medium text-vwfs-brand">
                {formatSegment(segment)}
              </span>
            ) : (
              <Link
                to={path}
                className="hover:text-vwfs-brand transition-colors"
              >
                {formatSegment(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
