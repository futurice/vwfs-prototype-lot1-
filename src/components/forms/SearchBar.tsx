// ============================================================================
// VWFS Performance Platform - Search Bar
// ============================================================================

import { useRef, useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        onChange(nextValue);
      }, 300);
    },
    [onChange],
  );

  return (
    <div className="relative w-full max-w-sm">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-vwfs-surface-dark"
      />
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-vwfs-surface-dark/30 bg-white py-2 pl-9 pr-3 text-sm text-vwfs-text placeholder:text-vwfs-surface-dark outline-none transition-colors focus:border-vwfs-brand focus:ring-1 focus:ring-vwfs-brand/30"
      />
    </div>
  );
}

export default SearchBar;
