// ============================================================================
// VWFS Performance Platform - Loading Skeleton
// ============================================================================

interface LoadingSkeletonProps {
  variant: 'table' | 'card' | 'text' | 'tiles';
  rows?: number;
}

function ShimmerBar({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function TableSkeleton({ rows = 5 }: { rows: number }) {
  return (
    <div className="w-full space-y-3">
      {/* Header row */}
      <div className="flex gap-4 rounded-md bg-gray-300/50 p-3">
        <ShimmerBar className="h-4 w-1/6" />
        <ShimmerBar className="h-4 w-1/4" />
        <ShimmerBar className="h-4 w-1/5" />
        <ShimmerBar className="h-4 w-1/6" />
        <ShimmerBar className="h-4 w-1/6" />
      </div>
      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 border-b border-gray-100 p-3">
          <ShimmerBar className="h-3 w-1/6" />
          <ShimmerBar className="h-3 w-1/4" />
          <ShimmerBar className="h-3 w-1/5" />
          <ShimmerBar className="h-3 w-1/6" />
          <ShimmerBar className="h-3 w-1/6" />
        </div>
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <ShimmerBar className="mb-4 h-5 w-2/3" />
      <ShimmerBar className="mb-2 h-3 w-full" />
      <ShimmerBar className="mb-2 h-3 w-5/6" />
      <ShimmerBar className="h-3 w-1/2" />
      <div className="mt-4 flex gap-2">
        <ShimmerBar className="h-8 w-20" />
        <ShimmerBar className="h-8 w-20" />
      </div>
    </div>
  );
}

function TextSkeleton() {
  return (
    <div className="space-y-3">
      <ShimmerBar className="h-4 w-full" />
      <ShimmerBar className="h-4 w-11/12" />
      <ShimmerBar className="h-4 w-4/5" />
      <ShimmerBar className="h-4 w-2/3" />
    </div>
  );
}

function TilesSkeleton({ count = 4 }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function LoadingSkeleton({ variant, rows = 5 }: LoadingSkeletonProps) {
  switch (variant) {
    case 'table':
      return <TableSkeleton rows={rows} />;
    case 'card':
      return <CardSkeleton />;
    case 'text':
      return <TextSkeleton />;
    case 'tiles':
      return <TilesSkeleton count={rows} />;
    default:
      return <TextSkeleton />;
  }
}

export default LoadingSkeleton;
