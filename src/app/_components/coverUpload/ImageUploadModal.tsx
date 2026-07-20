import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/app/components/ui/dialog';
import { useI18nStore } from '@/stores/i18n';
import { Button } from '@/app/components/ui/button';
import { Slider } from '@/app/components/ui/slider';
import {
  Camera,
  RotateCcw,
  RotateCw,
  RotateCcw as ResetIcon,
  X,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Check,
  RefreshCcw,
  Loader2
} from 'lucide-react';
import { Dropzone } from './Dropzone';
import { ImageCropper } from './ImageCropper';
import { exportCroppedImage, type CropData } from './export-image';

interface ImageUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aspectRatio?: number;
  variant?: 'cover' | 'banner';
  onSave: (blob: Blob, previewUrl: string) => void;
}

export function ImageUploadModal({
  open,
  onOpenChange,
  aspectRatio = 16 / 9,
  variant = 'cover',
  onSave
}: ImageUploadModalProps) {
  const { t } = useI18nStore();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [cropData, setCropData] = useState<CropData>({ x: 0, y: 0, zoom: 1, rotation: 0 });

  const isBanner = variant === 'banner';

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setZoom(1);
    setRotation(0);
  };

  const handleCropDataChange = useCallback((data: CropData) => {
    setCropData(data);
    // Sync external zoom if updated from gestures
    if (data.zoom !== undefined) {
      setZoom(data.zoom);
    }
  }, []);

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const handleRotate = (direction: 'cw' | 'ccw') => {
    setRotation(prev => direction === 'cw' ? prev + 90 : prev - 90);
  };

  const handleChangeImage = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageSrc(null);
    setZoom(1);
    setRotation(0);
  };

  const handleSaveAction = async () => {
    if (!imageSrc) return;
    setIsSaving(true);
    try {
      const blob = await exportCroppedImage(imageSrc, cropData, "image/webp", 0.85, aspectRatio);
      const previewUrl = URL.createObjectURL(blob);
      onSave(blob, previewUrl);
      onOpenChange(false);
      // Cleanup after modal closes
      setTimeout(() => {
        setImageSrc(null);
        setZoom(1);
        setRotation(0);
      }, 300);
    } catch (error) {
      console.error("Failed to export image", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageSrc(null);
    setZoom(1);
    setRotation(0);
    onOpenChange(false);
  };

  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${imageSrc ? 'bg-amber-100 text-amber-500' : 'bg-gray-50 text-gray-400'}`}>
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900 leading-tight">
                {isBanner ? t('image_upload.modal_title_banner') : t('image_upload.modal_title_cover')}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500 font-medium">
                {imageSrc
                  ? (isBanner ? t('image_upload.modal_desc_crop_banner') : t('image_upload.modal_desc_crop_cover'))
                  : (isBanner ? t('image_upload.modal_desc_banner') : t('image_upload.modal_desc_cover'))}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 bg-white min-h-[300px]">
          {!imageSrc ? (
            <Dropzone onFileSelect={handleFileSelect} aspectRatio={aspectRatio} />
          ) : (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ImageCropper
                imageSrc={imageSrc}
                zoom={zoom}
                rotation={rotation}
                aspectRatio={aspectRatio}
                onCropDataChange={handleCropDataChange}
              />

              <div className="flex flex-col gap-2">
                {/* Zoom Control */}
                <div className="flex items-center gap-5 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100/50">
                  <button onClick={() => setZoom(Math.max(1, zoom - 0.1))} className="text-gray-400 hover:text-amber-500 transition-colors">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <Slider
                      value={[zoom]}
                      min={1}
                      max={5}
                      step={0.01}
                      onValueChange={(vals) => setZoom(vals[0])}
                      className="cursor-pointer"
                    />
                  </div>
                  <button onClick={() => setZoom(Math.min(5, zoom + 0.1))} className="text-gray-400 hover:text-amber-500 transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-bold text-gray-900 min-w-[3rem] text-right tabular-nums">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                {/* Refined Action Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100/50 overflow-hidden shadow-sm">
                    <Button variant="ghost" size="sm" onClick={() => handleRotate('ccw')} className="h-9 px-3 rounded-lg text-gray-600 hover:bg-white hover:text-amber-600 hover:shadow-sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      <span className="text-xs">{t('image_upload.cropper.rotate_left')}</span>
                    </Button>
                    <div className="w-px h-4 bg-gray-200 self-center" />
                    <Button variant="ghost" size="sm" onClick={() => handleRotate('cw')} className="h-9 px-3 rounded-lg text-gray-600 hover:bg-white hover:text-amber-600 hover:shadow-sm">
                      <RotateCw className="w-4 h-4 mr-2" />
                      <span className="text-xs">{t('image_upload.cropper.rotate_right')}</span>
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-11 px-4 rounded-xl text-gray-600 hover:bg-gray-100">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    {t('image_upload.cropper.reset')}
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleChangeImage} className="h-11 px-4 rounded-xl text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 ml-auto font-bold shadow-sm">
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    {t('image_upload.cropper.change_image')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {imageSrc && (
          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50 transition-all">
            <Button variant="ghost" onClick={handleClose} className="rounded-xl font-bold text-gray-500 hover:text-gray-900 h-10 px-6">
              {t('image_upload.actions.cancel')}
            </Button>
            <Button
              onClick={handleSaveAction}
              disabled={isSaving}
              className="px-8 py-3 h-12 bg-amber-300 hover:bg-amber-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-70 flex items-center gap-3 min-w-[140px] justify-center"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('image_upload.actions.saving')}
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  {isBanner ? t('image_upload.actions.save_banner') : t('image_upload.actions.save_cover')}
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
