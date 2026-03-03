// ============================================================================
// VWFS Performance Platform - Role & Permissions Hook
// ============================================================================

import { useAppStore } from '../stores/appStore';
import type { UserRole } from '../types';

/**
 * Provides the current user role and derived permission flags.
 * Used throughout the application to conditionally render UI and gate actions.
 */
export function useRole(): {
  role: UserRole;
  isRetailer: boolean;
  isGroupManager: boolean;
  isAreaManager: boolean;
  isNational: boolean;
  isHeadOffice: boolean;
  isFieldForce: boolean;
  canApprove: boolean;
  canPublish: boolean;
  canOverride: boolean;
} {
  const currentRole = useAppStore((s) => s.currentRole);

  return {
    role: currentRole,
    isRetailer: currentRole === 'retailer',
    isGroupManager: currentRole === 'group_manager',
    isAreaManager: currentRole === 'area_manager',
    isNational: currentRole === 'national',
    isHeadOffice: currentRole === 'head_office',
    isFieldForce: currentRole === 'field_force',
    canApprove: ['area_manager', 'national', 'head_office'].includes(currentRole),
    canPublish: currentRole === 'head_office',
    canOverride: currentRole === 'head_office',
  };
}
