// ============================================================================
// VWFS Performance Platform - File Uploader
// ============================================================================

import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileIcon } from 'lucide-react';

interface FileUploaderProps {
  onFilesChange?: (files: File[]) => void;
  acceptedTypes?: string[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader({ onFilesChange, acceptedTypes }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptString = acceptedTypes?.join(',') ?? '';

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const newFiles = Array.from(incoming);
      setFiles((prev) => {
        const updated = [...prev, ...newFiles];
        onFilesChange?.(updated);
        return updated;
      });
    },
    [onFilesChange],
  );

  function removeFile(index: number) {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange?.(updated);
      return updated;
    });
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    // Reset so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="w-full space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? 'border-vwfs-accent bg-vwfs-accent/5'
            : 'border-vwfs-surface-dark/40 bg-vwfs-surface/50 hover:border-vwfs-brand/40 hover:bg-vwfs-surface'
        }`}
      >
        <Upload
          size={28}
          className={dragActive ? 'text-vwfs-accent' : 'text-vwfs-surface-dark'}
        />
        <p className="text-sm font-medium text-vwfs-text">
          Drag & drop files here
        </p>
        <p className="text-xs text-vwfs-surface-dark">
          or click to browse
          {acceptedTypes && acceptedTypes.length > 0 && (
            <span className="ml-1">({acceptedTypes.join(', ')})</span>
          )}
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={acceptString}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 rounded-md border border-vwfs-surface-dark/20 bg-white px-3 py-2"
            >
              <FileIcon size={16} className="shrink-0 text-vwfs-brand" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-vwfs-text">{file.name}</p>
                <p className="text-xs text-vwfs-surface-dark">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="shrink-0 rounded p-1 text-vwfs-surface-dark transition-colors hover:bg-vwfs-surface hover:text-vwfs-text"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileUploader;
