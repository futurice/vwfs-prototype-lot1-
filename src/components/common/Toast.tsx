// ============================================================================
// VWFS Performance Platform - Toast Notification System
// ============================================================================

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useAppStore, type Toast as ToastType } from '../../stores/appStore';

const toastConfig: Record<
  ToastType['type'],
  { icon: React.ReactNode; bgClass: string; borderClass: string; textClass: string }
> = {
  success: {
    icon: <CheckCircle size={18} />,
    bgClass: 'bg-green-50',
    borderClass: 'border-l-4 border-vwfs-success',
    textClass: 'text-vwfs-success',
  },
  error: {
    icon: <AlertCircle size={18} />,
    bgClass: 'bg-red-50',
    borderClass: 'border-l-4 border-vwfs-error',
    textClass: 'text-vwfs-error',
  },
  info: {
    icon: <Info size={18} />,
    bgClass: 'bg-blue-50',
    borderClass: 'border-l-4 border-blue-500',
    textClass: 'text-blue-600',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    bgClass: 'bg-amber-50',
    borderClass: 'border-l-4 border-vwfs-warning',
    textClass: 'text-amber-600',
  },
};

export function Toast() {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        return (
          <div
            key={toast.id}
            className={`${config.bgClass} ${config.borderClass} rounded-md shadow-lg p-3 flex items-start gap-3 animate-slide-in`}
            role="alert"
          >
            <span className={config.textClass}>{config.icon}</span>
            <p className="flex-1 text-sm text-vwfs-text">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-vwfs-text/40 hover:text-vwfs-text transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Toast;
