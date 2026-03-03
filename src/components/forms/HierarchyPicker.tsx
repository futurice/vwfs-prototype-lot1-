// ============================================================================
// VWFS Performance Platform - Hierarchy Picker
// ============================================================================

import { useMemo } from 'react';
import { useAppStore } from '../../stores/appStore';
import { retailers } from '../../mocks/retailers';

interface HierarchyPickerProps {
  onChange?: (level: string, value: string) => void;
}

export function HierarchyPicker({ onChange }: HierarchyPickerProps) {
  const {
    selectedRegion,
    selectedArea,
    selectedGroup,
    selectedRetailer,
    setHierarchyFilter,
  } = useAppStore();

  // Compute available options at each level based on the active retailer data
  const regions = useMemo(() => {
    const unique = new Set(retailers.filter((r) => r.active).map((r) => r.region));
    return Array.from(unique).sort();
  }, []);

  const areas = useMemo(() => {
    const filtered = retailers.filter(
      (r) => r.active && (!selectedRegion || r.region === selectedRegion),
    );
    const unique = new Set(filtered.map((r) => r.area));
    return Array.from(unique).sort();
  }, [selectedRegion]);

  const groups = useMemo(() => {
    const filtered = retailers.filter(
      (r) =>
        r.active &&
        (!selectedRegion || r.region === selectedRegion) &&
        (!selectedArea || r.area === selectedArea),
    );
    const unique = new Set(filtered.map((r) => r.group));
    return Array.from(unique).sort();
  }, [selectedRegion, selectedArea]);

  const retailerOptions = useMemo(() => {
    return retailers.filter(
      (r) =>
        r.active &&
        (!selectedRegion || r.region === selectedRegion) &&
        (!selectedArea || r.area === selectedArea) &&
        (!selectedGroup || r.group === selectedGroup),
    );
  }, [selectedRegion, selectedArea, selectedGroup]);

  function handleChange(level: string, value: string) {
    setHierarchyFilter(level, value);
    onChange?.(level, value);
  }

  const selectClasses =
    'rounded-md border border-vwfs-surface-dark/30 bg-white px-3 py-2 text-sm text-vwfs-text outline-none transition-colors focus:border-vwfs-brand focus:ring-1 focus:ring-vwfs-brand/30';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Region */}
      <select
        value={selectedRegion}
        onChange={(e) => handleChange('region', e.target.value)}
        className={selectClasses}
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Area */}
      <select
        value={selectedArea}
        onChange={(e) => handleChange('area', e.target.value)}
        className={selectClasses}
      >
        <option value="">All Areas</option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      {/* Group */}
      <select
        value={selectedGroup}
        onChange={(e) => handleChange('group', e.target.value)}
        className={selectClasses}
      >
        <option value="">All Groups</option>
        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      {/* Retailer */}
      <select
        value={selectedRetailer}
        onChange={(e) => handleChange('retailer', e.target.value)}
        className={selectClasses}
      >
        <option value="">All Retailers</option>
        {retailerOptions.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name} ({r.code})
          </option>
        ))}
      </select>
    </div>
  );
}

export default HierarchyPicker;
