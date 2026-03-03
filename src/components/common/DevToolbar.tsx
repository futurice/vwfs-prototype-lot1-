// ============================================================================
// VWFS Performance Platform - Dev Toolbar
// ============================================================================

import { RotateCcw } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import type { UserRole } from '../../types';

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'retailer', label: 'Retailer' },
  { value: 'group_manager', label: 'Group Manager' },
  { value: 'area_manager', label: 'Area Manager' },
  { value: 'national', label: 'National' },
  { value: 'head_office', label: 'Head Office' },
  { value: 'field_force', label: 'Field Force' },
];

export function DevToolbar() {
  const { currentRole, setCurrentRole, currentBrand, addToast } = useAppStore();

  function handleReset() {
    setCurrentRole('national');
    addToast({ type: 'info', message: 'Dev state reset to defaults' });
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-10 items-center gap-4 bg-vwfs-brand px-4 text-white">
      {/* DEV badge */}
      <span className="rounded bg-vwfs-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        DEV
      </span>

      {/* Role selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="dev-role" className="text-xs text-white/70">
          Role:
        </label>
        <select
          id="dev-role"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as UserRole)}
          className="rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-white outline-none focus:border-vwfs-accent"
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-vwfs-brand text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Current brand badge */}
      <span className="rounded border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
        {currentBrand}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="flex items-center gap-1 text-xs text-white/60 transition-colors hover:text-white"
      >
        <RotateCcw size={12} />
        Reset
      </button>
    </div>
  );
}

export default DevToolbar;
