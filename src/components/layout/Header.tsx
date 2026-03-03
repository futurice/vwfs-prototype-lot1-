// ============================================================================
// VWFS Performance Platform - Header Bar
// ============================================================================

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut, Settings, Bell } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { Breadcrumbs } from './Breadcrumbs';
import type { BrandCode, UserRole } from '../../types';

const brands: { code: BrandCode; label: string }[] = [
  { code: 'VWPC', label: 'VW Passenger Cars' },
  { code: 'VWCV', label: 'VW Commercial' },
  { code: 'AUDI', label: 'Audi' },
  { code: 'SKODA', label: 'Skoda' },
  { code: 'SEAT', label: 'SEAT' },
  { code: 'CUPRA', label: 'CUPRA' },
];

const roleLabels: Record<UserRole, string> = {
  retailer: 'Retailer',
  group_manager: 'Group Manager',
  area_manager: 'Area Manager',
  national: 'National',
  head_office: 'Head Office',
  field_force: 'Field Force',
};

export function Header() {
  const { currentBrand, setCurrentBrand, currentRole } = useAppStore();
  const [brandOpen, setBrandOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setBrandOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentBrandLabel = brands.find((b) => b.code === currentBrand)?.label ?? currentBrand;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between z-30">
      {/* Left: Breadcrumbs */}
      <Breadcrumbs />

      {/* Right: Brand Switcher + User */}
      <div className="flex items-center gap-4">
        {/* Brand Switcher */}
        <div ref={brandRef} className="relative">
          <button
            onClick={() => setBrandOpen(!brandOpen)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-vwfs-text hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs font-bold bg-vwfs-brand text-white px-1.5 py-0.5 rounded">
              {currentBrand}
            </span>
            <span className="hidden sm:inline">{currentBrandLabel}</span>
            <ChevronDown size={14} />
          </button>
          {brandOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-56 z-50">
              {brands.map((brand) => (
                <button
                  key={brand.code}
                  onClick={() => {
                    setCurrentBrand(brand.code);
                    setBrandOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-vwfs-surface transition-colors flex items-center gap-2 ${
                    currentBrand === brand.code
                      ? 'text-vwfs-brand font-medium bg-vwfs-surface/50'
                      : 'text-vwfs-text'
                  }`}
                >
                  <span className="text-xs font-bold bg-vwfs-brand text-white px-1.5 py-0.5 rounded">
                    {brand.code}
                  </span>
                  {brand.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative text-vwfs-text/60 hover:text-vwfs-brand transition-colors p-1">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-vwfs-error rounded-full" />
        </button>

        {/* User Dropdown */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-vwfs-text hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-vwfs-brand flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-medium">Demo User</span>
              <span className="block text-[10px] text-vwfs-text/60">
                {roleLabels[currentRole]}
              </span>
            </div>
            <ChevronDown size={14} />
          </button>
          {userOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-48 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-vwfs-text">Demo User</p>
                <p className="text-xs text-vwfs-text/60">{roleLabels[currentRole]}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-vwfs-text hover:bg-vwfs-surface transition-colors flex items-center gap-2">
                <Settings size={14} />
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-vwfs-text hover:bg-vwfs-surface transition-colors flex items-center gap-2">
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
