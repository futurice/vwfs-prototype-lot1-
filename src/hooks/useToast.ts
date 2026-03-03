// ============================================================================
// VWFS Performance Platform - Toast Notification Hook
// ============================================================================

import { useAppStore } from '../stores/appStore';

/**
 * Provides convenience methods for triggering toast notifications.
 * Wraps the global app store's addToast method with typed helpers.
 */
export function useToast() {
  const addToast = useAppStore((s) => s.addToast);

  return {
    success: (message: string) => addToast({ type: 'success', message }),
    error: (message: string) => addToast({ type: 'error', message }),
    info: (message: string) => addToast({ type: 'info', message }),
    warning: (message: string) => addToast({ type: 'warning', message }),
  };
}
