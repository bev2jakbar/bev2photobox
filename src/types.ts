export type Orientation = 'portrait' | 'landscape';

export interface PhotoFilter {
  id: string;
  name: string;
  cssFilter: string;
  canvasFilter: string;
  description: string;
}

export interface FrameStyle {
  id: string;
  name: string;
  bgColor: string; // Tailwind background style
  textColor: string; // Tailwind text color
  borderColor: string;
  canvasBg: string; // Canvas color or gradient setup info
  canvasText: string;
  canvasBorder: string;
  styleName: string;
  description: string;
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string; // Raw base64 photo
  timestamp: number;
}

export type AppStep = 'setup' | 'capture' | 'preview' | 'download';

export interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

