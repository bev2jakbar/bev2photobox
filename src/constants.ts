import { PhotoFilter, FrameStyle } from './types';

export const FILTERS: PhotoFilter[] = [
  {
    id: 'normal',
    name: 'Original',
    cssFilter: 'none',
    canvasFilter: 'none',
    description: 'Tampilan asli yang natural dan jernih'
  },
  {
    id: 'retro',
    name: 'Retro Warm',
    cssFilter: 'sepia(0.35) saturate(1.2) contrast(1.05) brightness(0.98)',
    canvasFilter: 'sepia(35%) saturate(120%) contrast(105%) brightness(98%)',
    description: 'Nuansa vintage klasik dengan kehangatan sepia'
  },
  {
    id: 'noir',
    name: 'Noir Classic',
    cssFilter: 'grayscale(1) contrast(1.35) brightness(0.95)',
    canvasFilter: 'grayscale(100%) contrast(135%) brightness(95%)',
    description: 'Hitam putih dramatis berseni tinggi'
  },
  {
    id: 'cyberpunk',
    name: 'Cyber Neon',
    cssFilter: 'hue-rotate(130deg) saturate(1.7) contrast(1.1) brightness(1.02)',
    canvasFilter: 'hue-rotate(130deg) saturate(170%) contrast(110%) brightness(102%)',
    description: 'Warna futuristik dengan sentuhan magenta dan teal'
  },
  {
    id: 'summer',
    name: 'Summer Fade',
    cssFilter: 'contrast(0.9) brightness(1.03) sepia(0.12) saturate(0.85) hue-rotate(-5deg)',
    canvasFilter: 'contrast(90%) brightness(103%) sepia(12%) saturate(85%) hue-rotate(-5deg)',
    description: 'Sentuhan musim panas lembut yang estetik'
  },
  {
    id: 'chrome',
    name: 'Vibrant Pop',
    cssFilter: 'saturate(1.6) contrast(1.2) brightness(1.02)',
    canvasFilter: 'saturate(160%) contrast(120%) brightness(102%)',
    description: 'Warna menyala tinggi yang segar dan berenergi'
  },
  {
    id: 'cool',
    name: 'Cool Breeze',
    cssFilter: 'hue-rotate(-15deg) saturate(1.15) brightness(0.98) contrast(1.05)',
    canvasFilter: 'hue-rotate(-15deg) saturate(115%) brightness(98%) contrast(105%)',
    description: 'Sentuhan warna biru sejuk dan menyegarkan'
  }
];

export const FRAMES: FrameStyle[] = [
  {
    id: 'tts1',
    name: 'Tjap Solo_1 📸',
    bgColor: 'bg-[#fffaeb] border-[#fde68a]',
    textColor: 'text-[#b45309]',
    borderColor: 'border-[#fde68a]',
    canvasBg: '#fffaeb',
    canvasText: '#b45309',
    canvasBorder: '#fde68a',
    styleName: 'Tjap Solo_1 Premium',
    description: 'Bingkai tts1.png kustom yang presisi dan pas dengan layout foto'
  },
  {
    id: 'tts2',
    name: 'Tjap Solo_2 📸',
    bgColor: 'bg-[#F4C115] border-[#E21B22]',
    textColor: 'text-[#E21B22]',
    borderColor: 'border-[#E21B22]',
    canvasBg: '#F4C115',
    canvasText: '#E21B22',
    canvasBorder: '#E21B22',
    styleName: 'Tjap Solo_2 Premium',
    description: 'Bingkai tts2.png kustom bertema Teh Tjap Solo kedua yang pas dengan layout foto'
  },
  {
    id: 'tts3',
    name: 'Tjap Solo_3 📸',
    bgColor: 'bg-[#fffbeb] border-[#f59e0b]',
    textColor: 'text-[#b45309]',
    borderColor: 'border-[#f59e0b]',
    canvasBg: '#fffbeb',
    canvasText: '#b45309',
    canvasBorder: '#f59e0b',
    styleName: 'Tjap Solo_3 Premium',
    description: 'Bingkai tts3.png kustom bertema Teh Tjap Solo ketiga'
  },
  {
    id: 'gummyberry',
    name: 'GummyBerry 📸',
    bgColor: 'bg-[#fff0f6] border-[#e64980]',
    textColor: 'text-[#e64980]',
    borderColor: 'border-[#e64980]',
    canvasBg: '#fff0f6',
    canvasText: '#e64980',
    canvasBorder: '#e64980',
    styleName: 'GummyBerry Premium',
    description: 'Bingkai GummyBerry kustom yang manis, penuh keceriaan'
  },
  {
    id: 'strawberry',
    name: 'Strawberry 📸',
    bgColor: 'bg-[#fff5f5] border-[#fa5252]',
    textColor: 'text-[#fa5252]',
    borderColor: 'border-[#fa5252]',
    canvasBg: '#fff5f5',
    canvasText: '#fa5252',
    canvasBorder: '#fa5252',
    styleName: 'Strawberry Premium',
    description: 'Bingkai Strawberry kustom yang segar bernuansa buah stroberi merah'
  },
  {
    id: 'coquette_pink',
    name: 'Coquette Pink 🎀',
    bgColor: 'bg-[#ffe4e6] border-[#f43f5e]',
    textColor: 'text-[#f43f5e]',
    borderColor: 'border-[#f43f5e]',
    canvasBg: '#ffe4e6',
    canvasText: '#f43f5e',
    canvasBorder: '#ffccd5',
    styleName: 'Coquette Pink',
    description: 'Aesthetic pita pink lembut yang anggun dan viral'
  },
  {
    id: 'dusty_rose',
    name: 'Dusty Rose Gold ✨',
    bgColor: 'bg-[#f3e8ee] border-[#c084fc]/50',
    textColor: 'text-[#a21caf]',
    borderColor: 'border-[#c084fc]/50',
    canvasBg: '#f3e8ee',
    canvasText: '#a21caf',
    canvasBorder: '#ebd9e6',
    styleName: 'Rose Gold Luxury',
    description: 'Dusty rose mewah dengan sentuhan keemasan elegan'
  },
  {
    id: 'blossom_sakura',
    name: 'Blossom Sakura 🌸',
    bgColor: 'bg-[#fff0f6] border-[#ffb3c1]',
    textColor: 'text-[#ff4d6d]',
    borderColor: 'border-[#ffb3c1]',
    canvasBg: '#fff0f6',
    canvasText: '#ff4d6d',
    canvasBorder: '#ffe5ec',
    styleName: 'Sakura Breeze',
    description: 'Nuansa kelopak bunga sakura merah muda yang estetik'
  },
  {
    id: 'royal_magenta',
    name: 'Royal Magenta 👑',
    bgColor: 'bg-[#fae8ff] border-[#c084fc]',
    textColor: 'text-[#86198f]',
    borderColor: 'border-[#c084fc]',
    canvasBg: '#fae8ff',
    canvasText: '#86198f',
    canvasBorder: '#f5d0fe',
    styleName: 'Royal Elegance',
    description: 'Perpaduan warna magenta bangsawan yang memikat dan anggun'
  },
  {
    id: 'quartz_minimalist',
    name: 'Quartz Minimalist 💎',
    bgColor: 'bg-[#fff5f5] border-[#fda4af]',
    textColor: 'text-[#e11d48]',
    borderColor: 'border-[#fda4af]',
    canvasBg: '#fff5f5',
    canvasText: '#e11d48',
    canvasBorder: '#ffe4e6',
    styleName: 'Quartz Elegant',
    description: 'Sentuhan pink kristal kuarsa bersih dan minimalis modern'
  },
  {
    id: 'vintage_mauve',
    name: 'Vintage Mauve 🍷',
    bgColor: 'bg-[#f5ebe6] border-[#cdb4db]',
    textColor: 'text-[#9c89b8]',
    borderColor: 'border-[#cdb4db]',
    canvasBg: '#f5ebe6',
    canvasText: '#9c89b8',
    canvasBorder: '#e0d3cb',
    styleName: 'Mauve Elegance',
    description: 'Sentuhan warna mauve klasik bernuansa vintage mewah'
  },
  {
    id: 'strawberry_glaze',
    name: 'Strawberry Glaze 🍓',
    bgColor: 'bg-[#fff0f2] border-[#ff8787]',
    textColor: 'text-[#e64980]',
    borderColor: 'border-[#ff8787]',
    canvasBg: '#fff0f2',
    canvasText: '#e64980',
    canvasBorder: '#ffccd5',
    styleName: 'Sweet Strawberry',
    description: 'Desain stroberi pink pastel yang manis dan berkelas'
  }
];

export const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
];
