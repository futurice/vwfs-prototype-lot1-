// ============================================================================
// VWFS Performance Platform - RAG (Red/Amber/Green) Indicator
// ============================================================================

import type { RAGStatus } from '../../types';

interface RAGIndicatorProps {
  status: RAGStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'bar';
}

const ragColors: Record<RAGStatus, string> = {
  Red: '#CD3B4F',
  Amber: '#F5E850',
  Green: '#038364',
};

const ragBgClasses: Record<RAGStatus, string> = {
  Red: 'bg-vwfs-error',
  Amber: 'bg-vwfs-warning',
  Green: 'bg-vwfs-success',
};

const ragTextClasses: Record<RAGStatus, string> = {
  Red: 'text-vwfs-error',
  Amber: 'text-vwfs-warning',
  Green: 'text-vwfs-success',
};

const sizeMap = {
  sm: { dot: 'w-2.5 h-2.5', bar: 'h-1 w-8', text: 'text-xs' },
  md: { dot: 'w-3.5 h-3.5', bar: 'h-1.5 w-12', text: 'text-sm' },
  lg: { dot: 'w-5 h-5', bar: 'h-2 w-16', text: 'text-base' },
};

export function RAGIndicator({
  status,
  showLabel = false,
  size = 'md',
  variant = 'dot',
}: RAGIndicatorProps) {
  const sizes = sizeMap[size];

  if (variant === 'bar') {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`rounded-full ${sizes.bar} ${ragBgClasses[status]}`}
          title={status}
        />
        {showLabel && (
          <span className={`font-medium ${sizes.text} ${ragTextClasses[status]}`}>
            {status}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-block rounded-full ${sizes.dot} ${ragBgClasses[status]}`}
        style={{ backgroundColor: ragColors[status] }}
        title={status}
      />
      {showLabel && (
        <span className={`font-medium ${sizes.text} ${ragTextClasses[status]}`}>
          {status}
        </span>
      )}
    </div>
  );
}

export default RAGIndicator;
