import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { CropData } from './export-image';
import { useI18nStore } from '@/stores/i18n';

interface ImageCropperProps {
  imageSrc: string;
  zoom: number;
  rotation: number;
  aspectRatio?: number;
  onCropDataChange: (data: CropData) => void;
}

export function ImageCropper({ 
  imageSrc, 
  zoom, 
  rotation, 
  aspectRatio = 16 / 9, 
  onCropDataChange 
}: ImageCropperProps) {
  const { t } = useI18nStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const activePointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDistance = useRef<number | null>(null);
  const lastPinchZoom = useRef(zoom);

  // Load image to get original size
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      setImageLoaded(true);
      setPosition({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Handle container resizing
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Sync crop data to parent
  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    onCropDataChange({
      ...position,
      zoom,
      rotation,
      containerWidth: rect?.width,
      containerHeight: rect?.height,
    });
  }, [position, zoom, rotation, onCropDataChange]);

  const getPinchDistance = (pointers: Map<number, { x: number; y: number }>) => {
    const pts = Array.from(pointers.values());
    if (pts.length < 2) return null;
    const dx = pts[1].x - pts[0].x;
    const dy = pts[1].y - pts[0].y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    } else if (activePointers.current.size === 2) {
      const dist = getPinchDistance(activePointers.current);
      lastPinchDistance.current = dist;
      lastPinchZoom.current = zoom;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activePointers.current.has(e.pointerId) && activePointers.current.size === 0) return;
    
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size === 2) {
      const dist = getPinchDistance(activePointers.current);
      if (dist !== null && lastPinchDistance.current !== null) {
        const scale = dist / lastPinchDistance.current;
        const newZoom = Math.min(Math.max(lastPinchZoom.current * scale, 1), 5);
        // We trigger parent callback for zoom change, usually zoom is state of parent
        // In Vue it was emitting update:zoom, here we expect the parent will update the prop.
        onCropDataChange({ ...position, zoom: newZoom, rotation });
      }
      return;
    }

    if (!isDragging || activePointers.current.size !== 1) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    if (containerRef.current && imageSize.width > 0 && imageSize.height > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const coverScale = Math.max(
        rect.width / imageSize.width,
        rect.height / imageSize.height
      );
      const displayedWidth = imageSize.width * coverScale * zoom;
      const displayedHeight = imageSize.height * coverScale * zoom;
      const maxOffsetX = Math.max(0, (displayedWidth - rect.width) / 2);
      const maxOffsetY = Math.max(0, (displayedHeight - rect.height) / 2);
      
      setPosition({
        x: Math.min(Math.max(newX, -maxOffsetX), maxOffsetX),
        y: Math.min(Math.max(newY, -maxOffsetY), maxOffsetY),
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointers.current.delete(e.pointerId);
    if (activePointers.current.size < 2) {
      lastPinchDistance.current = null;
    }
    if (activePointers.current.size === 0) {
      setIsDragging(false);
    }
  };

  const coverScale = useMemo(() => 
    containerSize.width > 0 && containerSize.height > 0 && imageSize.width > 0 && imageSize.height > 0
      ? Math.max(containerSize.width / imageSize.width, containerSize.height / imageSize.height)
      : 0
  , [containerSize, imageSize]);

  const displayedWidthValue = useMemo(() => coverScale > 0 ? imageSize.width * coverScale * zoom : 0, [coverScale, imageSize, zoom]);
  const displayedHeightValue = useMemo(() => coverScale > 0 ? imageSize.height * coverScale * zoom : 0, [coverScale, imageSize, zoom]);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 select-none cursor-move shadow-inner"
        style={{ aspectRatio: `${aspectRatio}` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="application"
        aria-label="Image crop area. Drag to reposition the image."
        tabIndex={0}
      >
        {imageLoaded && displayedWidthValue > 0 && displayedHeightValue > 0 && (
          <div
            className="absolute left-1/2 top-1/2 flex items-center justify-center pointer-events-none"
            style={{
              width: displayedWidthValue + 'px',
              height: displayedHeightValue + 'px',
              transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            <img
              src={imageSrc}
              alt="Image to crop"
              className="h-full w-full object-contain pointer-events-none"
              draggable="false"
            />
          </div>
        )}

        {/* Overlay grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/70" />
            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/70" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/70" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/70" />
          </div>

          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl shadow-sm" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr shadow-sm" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl shadow-sm" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br shadow-sm" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/80 shadow-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/80 shadow-sm" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white/80 shadow-sm" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-white/80 shadow-sm" />
        </div>

        {!isDragging && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg border border-white/10">
              {t('image_upload.cropper.drag_to_reposition')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
