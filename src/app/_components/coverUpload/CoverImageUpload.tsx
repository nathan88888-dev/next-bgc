import React, { useState, useMemo } from 'react';
import { Camera, Upload, X, RefreshCcw } from 'lucide-react';
import { ImageUploadModal } from './ImageUploadModal';
import { DEFAULT_GROUP_IMAGE } from '@/utils/default';
import { Button } from '@/app/components/ui/button';
import { useI18nStore } from '@/stores/i18n';

interface CoverImageUploadProps {
  previewUrl: string | null;
  aspectRatio?: number;
  variant?: 'cover' | 'banner';
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export function CoverImageUpload({
  previewUrl,
  aspectRatio = 16 / 9,
  variant = 'banner',
  onFileSelect,
  onClear
}: CoverImageUploadProps) {
  const { t } = useI18nStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (blob: Blob, _previewUrl: string) => {
    const file = new File([blob], "cover.webp", { type: blob.type });
    onFileSelect(file);
  };

  const isDefault = useMemo(() => previewUrl === DEFAULT_GROUP_IMAGE, [previewUrl]);
  const hasPreview = useMemo(() => previewUrl !== null && previewUrl !== '', [previewUrl]);

  return (
    <div className="space-y-4 w-full">
      {hasPreview && !isDefault ? (
        <div 
          className="group relative rounded-[2rem] overflow-hidden w-full border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-500 ease-out" 
          style={{ aspectRatio: `${aspectRatio}` }}
        >
          <img
            src={previewUrl!}
            alt="Cover preview"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-red-500 flex items-center justify-center text-white transition-all transform hover:rotate-90 opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-md border border-white/20"
            aria-label="Remove cover image"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="bg-white/95 backdrop-blur-md hover:bg-white text-gray-900 font-bold px-5 py-5 rounded-2xl border-0 shadow-xl flex items-center gap-2 transform hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCcw className="w-4 h-4 text-amber-500" />
              {t('image_upload.cropper.change_image')}
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setModalOpen(true)}
          aria-label="Upload cover image"
          className={`
            group relative flex flex-col items-center justify-center gap-4 rounded-[2rem] border-4 border-dashed cursor-pointer transition-all duration-500 p-12 overflow-hidden
            ${modalOpen 
              ? 'border-amber-500 bg-amber-50 shadow-inner' 
              : isDefault 
                ? 'border-white/50 bg-gray-100/50 shadow-md' 
                : 'border-gray-200 hover:border-amber-400/50 hover:bg-amber-50/30 bg-white shadow-sm'
            }
          `}
          style={{ aspectRatio: `${aspectRatio}` }}
        >
          {isDefault && (
            <div className="absolute inset-0">
              <img
                src={previewUrl!}
                className="w-full h-full object-cover opacity-20 filter grayscale blur-[1px] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/40 to-transparent" />
            </div>
          )}

          <div 
            className={`
              w-16 h-16 rounded-[1.25rem] flex items-center justify-center relative z-10 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg
              ${isDefault ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white' : 'bg-amber-50 text-amber-500 group-hover:bg-amber-100'}
            `}
          >
            <Upload className={isDefault ? 'w-8 h-8 drop-shadow-lg' : 'w-7 h-7'} />
          </div>
          
          <div className="text-center relative z-10 flex flex-col items-center gap-1.5 animate-in fade-in duration-1000">
            {!isDefault ? (
              <>
                <p className="text-base font-bold text-gray-900 tracking-tight">
                  {t('image_upload.dropzone.title')}
                </p>
                <p className="text-xs font-medium text-gray-400 mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {t('image_upload.dropzone.limits', { maxSize: 10 })} · {t('image_upload.modal_desc_crop_cover')}
                </p>
              </>
            ) : (
              <span className="text-lg font-black text-white tracking-widest uppercase drop-shadow-xl flex items-center gap-3">
                {t('image_upload.cropper.change_image')}
              </span>
            )}
          </div>
        </div>
      )}

      <ImageUploadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        aspectRatio={aspectRatio}
        variant={variant}
        onSave={handleSave}
      />
    </div>
  );
}
