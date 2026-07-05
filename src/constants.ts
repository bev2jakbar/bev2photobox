import { PhotoFilter, FrameStyle } from './types';

export const FILTERS: PhotoFilter[] = [
  {
    id: 'normal',
    name: 'Original',
    cssFilter: 'none',
    canvasFilter: 'none',
    description: 'Tampilan asli kamera yang jernih dan natural'
  },
  {
    id: 'vivid',
    name: 'Vivid',
    cssFilter: 'saturate(1.4) contrast(1.1) brightness(1.02)',
    canvasFilter: 'saturate(140%) contrast(110%) brightness(102%)',
    description: 'Warna kontras tinggi yang cerah dan memikat'
  },
  {
    id: 'vivid_warm',
    name: 'Vivid Warm',
    cssFilter: 'saturate(1.3) contrast(1.1) sepia(0.12) brightness(1.02)',
    canvasFilter: 'saturate(130%) contrast(110%) sepia(12%) brightness(102%)',
    description: 'Warna cerah dipadukan dengan rona hangat keemasan'
  },
  {
    id: 'vivid_cool',
    name: 'Vivid Cool',
    cssFilter: 'saturate(1.3) contrast(1.1) hue-rotate(-8deg) brightness(1.02)',
    canvasFilter: 'saturate(130%) contrast(110%) hue-rotate(-8deg) brightness(102%)',
    description: 'Warna cerah dipadukan dengan rona biru sejuk'
  },
  {
    id: 'dramatic',
    name: 'Dramatic',
    cssFilter: 'contrast(1.25) brightness(0.96) saturate(0.9)',
    canvasFilter: 'contrast(125%) brightness(96%) saturate(90%)',
    description: 'Kontras dramatis dengan bayangan lebih mendalam'
  },
  {
    id: 'dramatic_warm',
    name: 'Dramatic Warm',
    cssFilter: 'contrast(1.2) brightness(0.96) sepia(0.15) saturate(0.85)',
    canvasFilter: 'contrast(120%) brightness(96%) sepia(15%) saturate(85%)',
    description: 'Kontras dramatis dengan sentuhan nuansa hangat'
  },
  {
    id: 'dramatic_cool',
    name: 'Dramatic Cool',
    cssFilter: 'contrast(1.2) brightness(0.96) hue-rotate(-8deg) saturate(0.85)',
    canvasFilter: 'contrast(120%) brightness(96%) hue-rotate(-8deg) saturate(85%)',
    description: 'Kontras dramatis dengan sentuhan rona sejuk'
  },
  {
    id: 'mono',
    name: 'Mono',
    cssFilter: 'grayscale(1) contrast(1.15) brightness(1.0)',
    canvasFilter: 'grayscale(100%) contrast(115%) brightness(100%)',
    description: 'Hitam putih klasik yang bersih dan seimbang'
  },
  {
    id: 'silvertone',
    name: 'Silvertone',
    cssFilter: 'grayscale(1) contrast(0.95) brightness(1.12)',
    canvasFilter: 'grayscale(100%) contrast(95%) brightness(112%)',
    description: 'Hitam putih lembut dengan bayangan terang bernuansa perak'
  },
  {
    id: 'noir',
    name: 'Noir',
    cssFilter: 'grayscale(1) contrast(1.45) brightness(0.88)',
    canvasFilter: 'grayscale(100%) contrast(145%) brightness(88%)',
    description: 'Gaya hitam putih sinematik dengan kontras tinggi yang kuat'
  },
  {
    id: 'cotton_candy',
    name: 'Cotton Candy 🌸',
    cssFilter: 'hue-rotate(-10deg) saturate(1.45) brightness(1.05) contrast(0.96)',
    canvasFilter: 'hue-rotate(-10deg) saturate(145%) brightness(105%) contrast(96%)',
    description: 'Sentuhan warna pink pastel yang imut dan ceria'
  },
  {
    id: 'sweet_peach',
    name: 'Sweet Peach 🍑',
    cssFilter: 'sepia(0.18) saturate(1.35) hue-rotate(-15deg) brightness(1.04)',
    canvasFilter: 'sepia(18%) saturate(135%) hue-rotate(-15deg) brightness(104%)',
    description: 'Rona peach yang hangat, manis, dan lembut di kulit'
  },
  {
    id: 'minty_fresh',
    name: 'Minty Fresh 🌿',
    cssFilter: 'hue-rotate(15deg) saturate(1.15) brightness(1.03) contrast(0.96)',
    canvasFilter: 'hue-rotate(15deg) saturate(115%) brightness(103%) contrast(96%)',
    description: 'Nuansa hijau mint pastel yang segar, tenang, dan estetik'
  }
];

export const FRAMES: FrameStyle[] = [
  {
    id: 'popice_candy',
    name: 'Popice Candy 🍧',
    bgColor: 'bg-[#e0f2fe] border-[#f472b6]',
    textColor: 'text-[#db2777]',
    borderColor: 'border-[#f472b6]',
    canvasBg: '#e0f2fe',
    canvasText: '#db2777',
    canvasBorder: '#f472b6',
    styleName: 'Popice Candy Premium',
    description: 'Bingkai Popice Candy kustom dengan overlay permen warna-warni yang manis'
  },
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
    id: 'etawa',
    name: 'Etawa 🥛',
    bgColor: 'bg-[#f0fdf4] border-[#14532d]',
    textColor: 'text-[#14532d]',
    borderColor: 'border-[#14532d]',
    canvasBg: '#f0fdf4',
    canvasText: '#14532d',
    canvasBorder: '#14532d',
    styleName: 'Etawa Premium',
    description: 'Bingkai Susu Kambing Etawa kustom dengan warna hijau tua segar'
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
