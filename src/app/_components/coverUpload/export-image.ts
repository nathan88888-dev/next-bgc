export interface CropData {
  x: number
  y: number
  zoom: number
  rotation: number
  containerWidth?: number
  containerHeight?: number
}

const DEFAULT_OUTPUT_WIDTH = 1280
const DEFAULT_OUTPUT_HEIGHT = 720 // 16:9
const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2 MB for Supabase upload

function drawCroppedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cropData: CropData,
  outputWidth: number,
  outputHeight: number
): void {
  const { x, y, zoom, rotation, containerWidth, containerHeight } = cropData

  // Scale position from viewport pixels to output canvas space when container size is known
  const scaleX =
    containerWidth != null && containerWidth > 0 ? outputWidth / containerWidth : 1
  const scaleY =
    containerHeight != null && containerHeight > 0 ? outputHeight / containerHeight : 1
  const offsetX = x * scaleX
  const offsetY = y * scaleY

  ctx.save()
  ctx.translate(outputWidth / 2, outputHeight / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.scale(zoom, zoom)

  const imgAspect = img.naturalWidth / img.naturalHeight
  const canvasAspect = outputWidth / outputHeight
  let drawWidth: number
  let drawHeight: number

  if (imgAspect > canvasAspect) {
    drawHeight = outputHeight
    drawWidth = outputHeight * imgAspect
  } else {
    drawWidth = outputWidth
    drawHeight = outputWidth / imgAspect
  }

  ctx.drawImage(
    img,
    -drawWidth / 2 + offsetX,
    -drawHeight / 2 + offsetY,
    drawWidth,
    drawHeight
  )
  ctx.restore()
}

export async function exportCroppedImage(
  imageSrc: string,
  cropData: CropData,
  format: "image/jpeg" | "image/webp" | "image/png" | "image/gif" = "image/webp",
  quality: number = 0.85,
  aspectRatio: number = DEFAULT_OUTPUT_WIDTH / DEFAULT_OUTPUT_HEIGHT
): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image()
    el.crossOrigin = "anonymous"
    el.onload = () => resolve(el)
    el.onerror = () => reject(new Error("Failed to load image"))
    el.src = imageSrc
  })

  const outputWidth = DEFAULT_OUTPUT_WIDTH
  const outputHeight = Math.round(outputWidth / Math.max(aspectRatio, 0.1))

  const canvas = document.createElement("canvas")
  canvas.width = outputWidth
  canvas.height = outputHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get canvas context")

  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, outputWidth, outputHeight)
  drawCroppedImage(ctx, img, cropData, outputWidth, outputHeight)

  const qualities = [quality, 0.75, 0.6, 0.5, 0.4]
  for (const q of qualities) {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, format, q)
    })
    if (blob && blob.size <= MAX_SIZE_BYTES) return blob
  }

  // Last attempt at minimum quality
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, format, 0.3)
  })
  if (blob) return blob
  throw new Error("Failed to export image")
}
