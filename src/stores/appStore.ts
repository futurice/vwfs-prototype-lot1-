// ============================================================================
// VWFS Performance Platform - Global App Store (Zustand)
// ============================================================================

import { create } from 'zustand';
import type { UserRole, BrandCode } from '../types';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export interface AppState {
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Dev mode
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentBrand: BrandCode;
  setCurrentBrand: (brand: BrandCode) => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Modal
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;

  // Hierarchy filter state
  selectedRegion: string;
  selectedArea: string;
  selectedGroup: string;
  selectedRetailer: string;
  setHierarchyFilter: (level: string, value: string) => void;
  resetHierarchyFilter: () => void;
}

let toastCounter = 0;

export const useAppStore = create<AppState>((set) => ({
  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Dev mode
  currentRole: 'national' as UserRole,
  setCurrentRole: (role) => set({ currentRole: role }),
  currentBrand: 'VWPC' as BrandCode,
  setCurrentBrand: (brand) => set({ currentBrand: brand }),

  // Toasts
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${++toastCounter}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, toast.duration ?? 4000);
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // Modal
  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),

  // Hierarchy filter
  selectedRegion: '',
  selectedArea: '',
  selectedGroup: '',
  selectedRetailer: '',
  setHierarchyFilter: (level, value) => {
    switch (level) {
      case 'region':
        set({ selectedRegion: value, selectedArea: '', selectedGroup: '', selectedRetailer: '' });
        break;
      case 'area':
        set({ selectedArea: value, selectedGroup: '', selectedRetailer: '' });
        break;
      case 'group':
        set({ selectedGroup: value, selectedRetailer: '' });
        break;
      case 'retailer':
        set({ selectedRetailer: value });
        break;
    }
  },
  resetHierarchyFilter: () =>
    set({ selectedRegion: '', selectedArea: '', selectedGroup: '', selectedRetailer: '' }),
}));
