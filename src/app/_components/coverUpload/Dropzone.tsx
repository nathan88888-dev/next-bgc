import React, { useRef, useState } from 'react';
import { Upload, ImageIcon } from 'lucide-react';
import { useI18nStore } from '@/stores/i18n';

interface DropzoneProps {
  aspectRatio?: number;
  onFileSelect: (file: File) => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function Dropzone({ aspectRatio = 16 / 9, onFileSelect }: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t } = useI18nStore();

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return t('image_upload.dropzone.error_type');
    }
    if (file.size > MAX_FILE_SIZE) {
      return t('image_upload.dropzone.error_size');
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full animate-in fade-in zoom-in-95 duration-200">
      <div
        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 p-8 sm:p-12 cursor-pointer
          ${isDragOver 
            ? 'border-amber-500 bg-amber-50/50 scale-[1.01] shadow-lg shadow-amber-500/10' 
            : 'border-gray-200 hover:border-amber-400 hover:bg-gray-50 bg-white'
          }`}
        style={{ aspectRatio: `${aspectRatio}` }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload cover image. Click or drag and drop."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={onInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300
            ${isDragOver ? 'bg-amber-100 text-amber-500 scale-110' : 'bg-gray-50 text-gray-400 group-hover:bg-amber-50'}`}
        >
          {isDragOver ? (
            <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            {isDragOver ? t('image_upload.dropzone.title_active') : t('image_upload.dropzone.title')}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t('image_upload.dropzone.tap_to_browse')}
          </p>
          <p className="text-[11px] font-medium text-gray-400 mt-3 flex items-center gap-2 justify-center">
            <span className="px-1.5 py-0.5 rounded bg-gray-100 uppercase tracking-tight">JPEG</span>
            <span className="px-1.5 py-0.5 rounded bg-gray-100 uppercase tracking-tight">PNG</span>
            <span className="px-1.5 py-0.5 rounded bg-gray-100 uppercase tracking-tight">WebP</span>
            <span className="ml-1">{t('image_upload.dropzone.limits', { maxSize: 10 })}</span>
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium px-4 py-2 bg-red-50 rounded-lg animate-in slide-in-from-top-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
