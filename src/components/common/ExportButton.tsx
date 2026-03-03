// ============================================================================
// VWFS Performance Platform - Export Button
// ============================================================================

import { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, Presentation } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

interface ExportOption {
  label: string;
  format: string;
  icon: React.ReactNode;
}

const EXPORT_OPTIONS: ExportOption[] = [
  { label: 'Export as Excel', format: 'Excel (.xlsx)', icon: <FileSpreadsheet size={14} /> },
  { label: 'Export as PDF', format: 'PDF (.pdf)', icon: <FileText size={14} /> },
  { label: 'Export as PPT', format: 'PowerPoint (.pptx)', icon: <Presentation size={14} /> },
];

export function ExportButton() {
  const [open, setOpen] = useState(false);
  const { addToast } = useAppStore();
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function handleExport(format: string) {
    addToast({ type: 'success', message: `Export generated \u2014 ${format}` });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-vwfs-surface-dark/40 bg-white px-3 py-2 text-sm font-medium text-vwfs-text shadow-sm transition-colors hover:bg-vwfs-surface"
      >
        <Download size={16} />
        Export
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-52 overflow-hidden rounded-md border border-vwfs-surface-dark/20 bg-white shadow-lg">
          {EXPORT_OPTIONS.map((option) => (
            <button
              key={option.format}
              onClick={() => handleExport(option.format)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-vwfs-text transition-colors hover:bg-vwfs-surface"
            >
              <span className="text-vwfs-brand">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExportButton;
