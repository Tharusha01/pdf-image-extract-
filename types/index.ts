export interface ImageInfo {
  filename: string;
  width: number;
  height: number;
  format: string;
  mode: string;
  file_size: number;
  aspect_ratio: string;
  base64: string;
}

export interface ProcessingResult {
  success: boolean;
  message: string;
  images: ImageInfo[];
  total_images: number;
}
