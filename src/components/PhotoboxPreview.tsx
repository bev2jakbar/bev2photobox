import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Sparkles, Type, Calendar, Image as ImageIcon, Check, ChevronLeft, LayoutGrid, Smile, Trash2, RotateCw, Share2, Heart, Coffee, Gamepad2 } from 'lucide-react';
import { Orientation, PhotoFilter, FrameStyle, AppStep, Sticker } from '../types';
import { FILTERS, FRAMES } from '../constants';
// @ts-ignore
import tts1FrameBg from '../assets/images/tts1.png';
// @ts-ignore
import tts2FrameBg from '../assets/images/tts2.png';
// @ts-ignore
import tts3FrameBg from '../assets/images/tts3.png';
// @ts-ignore
import stcTts3Img from '../assets/images/stc_tts3.png';
// @ts-ignore
import stcGummyBerryImg from '../assets/images/stc_gb.png';
// @ts-ignore
import stcStrawberryImg from '../assets/images/stc_st.png';
// @ts-ignore
import gummyBerryFrameBg from '../assets/images/GummyBerry.png';
// @ts-ignore
import strawberryFrameBg from '../assets/images/Strawberry.png';

interface PhotoboxPreviewProps {
  photos: string[];
  initialOrientation: Orientation;
  onRetake: () => void;
  initialFilter?: PhotoFilter;
}

export default function PhotoboxPreview({
  photos,
  initialOrientation,
  onRetake,
  initialFilter,
}: PhotoboxPreviewProps) {
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [activeFilter, setActiveFilter] = useState<PhotoFilter>(initialFilter || FILTERS[0]);
  const [activeFrame, setActiveFrame] = useState<FrameStyle>(FRAMES[0]);
  
  // Custom text states
  const [titleText, setTitleText] = useState<string>('•BEV2 PHOTOBOX•');
  const [subText, setSubText] = useState<string>('');
  const [showDate, setShowDate] = useState<boolean>(true);

  const isCustomTemplateFrame = activeFrame.id === 'tts1' || activeFrame.id === 'tts2' || activeFrame.id === 'tts3' || activeFrame.id === 'gummyberry' || activeFrame.id === 'strawberry';

  const getCustomFrameBg = () => {
    if (activeFrame.id === 'tts1') return tts1FrameBg;
    if (activeFrame.id === 'tts2') return tts2FrameBg;
    if (activeFrame.id === 'tts3') return tts3FrameBg;
    if (activeFrame.id === 'gummyberry') return gummyBerryFrameBg;
    if (activeFrame.id === 'strawberry') return strawberryFrameBg;
    return null;
  };
  
  // Sync frame selections to custom authentic defaults (locked)
  useEffect(() => {
    setTitleText('•BEV2 PHOTOBOX•');
    setSubText('');
  }, [activeFrame.id]);
  
  // Sticker states
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  const DECORATIVE_STICKERS = [
    { emoji: '💖', label: 'Heart' },
    { emoji: '✨', label: 'Sparkles' },
    { emoji: '🌟', label: 'Star' },
    { emoji: '🎀', label: 'Ribbon' },
    { emoji: '🕶️', label: 'Cool' },
    { emoji: '🍒', label: 'Cherries' },
    { emoji: '🧸', label: 'Teddy' },
    { emoji: '⚡', label: 'Lightning' },
    { emoji: '👾', label: 'Invader' },
    { emoji: '🍀', label: 'Clover' },
    { emoji: '🥳', label: 'Party' },
    { emoji: '🐾', label: 'Paws' },
    { emoji: '🧁', label: 'Cupcake' },
    { emoji: '🍭', label: 'Lollipop' },
    { emoji: '🔮', label: 'Magic' },
    { emoji: '👽', label: 'Alien' },
  ];

  const handleAddSticker = (emoji: string) => {
    const newSticker: Sticker = {
      id: `sticker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      emoji,
      x: 50, // center horizontally (50%)
      y: 50, // center vertically (50%)
      scale: 1.0,
      rotation: 0,
    };
    setStickers(prev => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  const handleStickerDragStart = (e: React.MouseEvent | React.TouchEvent, stickerId: string) => {
    e.stopPropagation();
    setSelectedStickerId(stickerId);
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const cardElement = document.getElementById('photobox-card-preview');
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    
    const targetSticker = stickers.find(s => s.id === stickerId);
    if (!targetSticker) return;
    
    // Position of sticker center relative to card in pixels
    const stickerXPixels = (targetSticker.x / 100) * rect.width;
    const stickerYPixels = (targetSticker.y / 100) * rect.height;
    
    // Pointer coordinates relative to card
    const pointerXRelativeToCard = clientX - rect.left;
    const pointerYRelativeToCard = clientY - rect.top;
    
    dragStartOffset.current = {
      x: pointerXRelativeToCard - stickerXPixels,
      y: pointerYRelativeToCard - stickerYPixels
    };
  };

  const handleCardPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !selectedStickerId) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const cardElement = document.getElementById('photobox-card-preview');
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    
    const pointerXRelativeToCard = clientX - rect.left;
    const pointerYRelativeToCard = clientY - rect.top;
    
    let newXPixels = pointerXRelativeToCard - dragStartOffset.current.x;
    let newYPixels = pointerYRelativeToCard - dragStartOffset.current.y;
    
    let xPercentage = (newXPixels / rect.width) * 100;
    let yPercentage = (newYPixels / rect.height) * 100;
    
    // Clamp sticker within bounds
    xPercentage = Math.max(2, Math.min(98, xPercentage));
    yPercentage = Math.max(2, Math.min(98, yPercentage));
    
    setStickers(prev => prev.map(s => {
      if (s.id === selectedStickerId) {
        return { ...s, x: xPercentage, y: yPercentage };
      }
      return s;
    }));
  };

  const handleCardPointerUp = () => {
    setIsDragging(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.sticker-element') && !target.closest('button') && !target.closest('input')) {
      setSelectedStickerId(null);
    }
  };
  
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportType, setExportType] = useState<'download' | 'share' | null>(null);
  const [exportProgress, setExportProgress] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Format today's date for preview
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('id-ID', { month: 'short' }).toUpperCase();
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Helper to draw cute Y2K stars on canvas
  const drawY2KStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, fillColor: string) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  };

  // Helper to draw the Solo Monument (Tugu Solo) on canvas
  const drawSoloMonument = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = '#E21B22';
    ctx.lineWidth = 2.0;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Base layers
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.rect(-20, 80, 40, 10);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-16, 80);
    ctx.lineTo(-14, 65);
    ctx.lineTo(14, 65);
    ctx.lineTo(16, 80);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Arch door inside bottom base
    ctx.beginPath();
    ctx.arc(0, 80, 5, Math.PI, 0, false);
    ctx.stroke();

    // Middle layer columns
    ctx.beginPath();
    ctx.moveTo(-12, 65);
    ctx.lineTo(-11, 35);
    ctx.lineTo(11, 35);
    ctx.lineTo(12, 65);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vertical lines in middle tower
    ctx.beginPath();
    ctx.moveTo(-5, 65); ctx.lineTo(-4, 35);
    ctx.moveTo(0, 65); ctx.lineTo(0, 35);
    ctx.moveTo(5, 65); ctx.lineTo(4, 35);
    ctx.stroke();

    // Pedestal top
    ctx.beginPath();
    ctx.moveTo(-14, 35);
    ctx.lineTo(-12, 30);
    ctx.lineTo(12, 30);
    ctx.lineTo(14, 35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Column shaft
    ctx.beginPath();
    ctx.moveTo(-8, 30);
    ctx.lineTo(-6, -15);
    ctx.lineTo(6, -15);
    ctx.lineTo(8, 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vertical lines on column shaft
    ctx.beginPath();
    ctx.moveTo(-3, 30); ctx.lineTo(-2, -15);
    ctx.moveTo(3, 30); ctx.lineTo(2, -15);
    ctx.stroke();

    // Capital top
    ctx.beginPath();
    ctx.moveTo(-10, -15);
    ctx.lineTo(-8, -22);
    ctx.lineTo(8, -22);
    ctx.lineTo(10, -15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dome and spire
    ctx.beginPath();
    ctx.arc(0, -22, 6, Math.PI, 0, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(0, -38);
    ctx.stroke();

    ctx.restore();
  };

  // Helper to draw Teapot & Cup on canvas
  const drawTeapotCup = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = '#E21B22';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 2.0;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // Teapot body
    ctx.beginPath();
    ctx.bezierCurveTo(-15, -10, -25, 10, -25, 25);
    ctx.bezierCurveTo(-25, 38, -10, 40, 10, 40);
    ctx.bezierCurveTo(25, 40, 25, 30, 25, 20);
    ctx.bezierCurveTo(25, 10, 15, -10, -15, -10);
    ctx.fill();
    ctx.stroke();

    // Teapot lid
    ctx.beginPath();
    ctx.moveTo(-12, -10);
    ctx.quadraticCurveTo(0, -18, 12, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lid knob
    ctx.beginPath();
    ctx.arc(0, -18, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Teapot spout
    ctx.beginPath();
    ctx.moveTo(-23, 15);
    ctx.bezierCurveTo(-35, 12, -38, -2, -32, -6);
    ctx.bezierCurveTo(-30, -4, -28, 5, -20, 8);
    ctx.stroke();

    // Teapot handle
    ctx.beginPath();
    ctx.moveTo(23, 10);
    ctx.bezierCurveTo(38, 5, 35, 32, 21, 35);
    ctx.stroke();

    // Tea Cup
    ctx.beginPath();
    ctx.moveTo(28, 15);
    ctx.lineTo(46, 15);
    ctx.bezierCurveTo(45, 32, 31, 32, 30, 15);
    ctx.fill();
    ctx.stroke();

    // Tea Cup handle
    ctx.beginPath();
    ctx.moveTo(44, 18);
    ctx.bezierCurveTo(51, 18, 51, 28, 43, 28);
    ctx.stroke();

    ctx.restore();
  };

  // Render high resolution card to hidden canvas helper
  const renderCardToCanvas = async (setLoadingStatus: (msg: string) => void) => {
    // 1. Setup high-res canvas dimensions
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('Canvas not found');
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');

    let cardWidth = 1280;
    let cardHeight = 1600;
    let photoW = 480;
    let photoH = 600; // Portrait 4:5 ratio (480x600)
    let gap = 16;     // Tighter gap
    let topPadding = 120; // Nicely balanced top offset
    let leftPadding = (cardWidth - (photoW * 2 + gap)) / 2; // (1280 - (960 + 16)) / 2 = 152px
    let bottomPadding = cardHeight - topPadding - (photoH * 2 + gap); // 1600 - 120 - (1200 + 16) = 264px

    if (orientation === 'portrait') {
      cardWidth = 1280;
      cardHeight = 1600;
      photoW = 480;
      photoH = 600;
      leftPadding = (cardWidth - (photoW * 2 + gap)) / 2;
    } else {
      cardWidth = 1280;
      cardHeight = 1600;
      photoW = 480;
      photoH = 600;
      leftPadding = (cardWidth - (photoW * 2 + gap)) / 2;
    }

    canvas.width = cardWidth;
    canvas.height = cardHeight;

    setLoadingStatus('Membuat latar bingkai...');

    const drawRoundedRect = (context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    };

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      });
    };

    // 2. Draw Frame Background (solid base color or custom template frame background)
    if (isCustomTemplateFrame) {
      try {
        let frameImgBg = tts1FrameBg;
        let frameLabel = 'Tjap Solo 1';
        if (activeFrame.id === 'tts2') {
          frameImgBg = tts2FrameBg;
          frameLabel = 'Tjap Solo 2';
        } else if (activeFrame.id === 'tts3') {
          frameImgBg = tts3FrameBg;
          frameLabel = 'Tjap Solo 3';
        } else if (activeFrame.id === 'gummyberry') {
          frameImgBg = gummyBerryFrameBg;
          frameLabel = 'GummyBerry';
        } else if (activeFrame.id === 'strawberry') {
          frameImgBg = strawberryFrameBg;
          frameLabel = 'Strawberry';
        }
        setLoadingStatus(`Memuat bingkai kustom ${frameLabel}...`);
        const frameImg = await loadImage(frameImgBg);
        ctx.drawImage(frameImg, 0, 0, cardWidth, cardHeight);
      } catch (err) {
        console.error('Gagal memuat bingkai kustom:', err);
        ctx.fillStyle = activeFrame.canvasBg;
        ctx.fillRect(0, 0, cardWidth, cardHeight);
      }
    } else {
      ctx.fillStyle = activeFrame.canvasBg;
      ctx.fillRect(0, 0, cardWidth, cardHeight);
    }

    // Draw top permanent watermark "★ BEV2 PHOTOBOX ★" on canvas
    if (!isCustomTemplateFrame) {
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = activeFrame.canvasText;
      ctx.fillText('★ BEV2 PHOTOBOX ★', cardWidth / 2, 140);
    }

    // 4. Draw Decorations for Viral Themes (Removed as requested)

    // 5. Draw the 4 Photos with Selected Filter
    const gridGap = isCustomTemplateFrame ? gap + 6 : gap;
    const gridLeftPadding = isCustomTemplateFrame ? leftPadding + 12 : leftPadding;
    const gridTopPadding = isCustomTemplateFrame ? 45 : topPadding;
    const gridPhotoW = isCustomTemplateFrame ? (cardWidth - (gridLeftPadding * 2) - gridGap) / 2 : photoW;
    const gridPhotoH = isCustomTemplateFrame ? 580 : photoH;

    const photoPositions = [
      { x: gridLeftPadding, y: gridTopPadding },
      { x: gridLeftPadding + gridPhotoW + gridGap, y: gridTopPadding },
      { x: gridLeftPadding, y: gridTopPadding + gridPhotoH + gridGap },
      { x: gridLeftPadding + gridPhotoW + gridGap, y: gridTopPadding + gridPhotoH + gridGap }
    ];

    const drawImageProp = (
      context: CanvasRenderingContext2D,
      image: HTMLImageElement,
      dx: number,
      dy: number,
      dw: number,
      dh: number
    ) => {
      const imageAspect = image.width / image.height;
      const targetAspect = dw / dh;
      let sx = 0;
      let sy = 0;
      let sWidth = image.width;
      let sHeight = image.height;

      if (imageAspect > targetAspect) {
        sWidth = image.height * targetAspect;
        sx = (image.width - sWidth) / 2;
      } else {
        sHeight = image.width / targetAspect;
        sy = (image.height - sHeight) / 2;
      }
      context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dw, dh);
    };

    for (let i = 0; i < 4; i++) {
      const pos = photoPositions[i];
      
      // Load Image
      const img = new Image();
      img.src = photos[i];
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Save state before filter application and clipping
      ctx.save();
      
      // Draw rounded clipping path (curved corners)
      const cornerRadius = 32;
      drawRoundedRect(ctx, pos.x, pos.y, gridPhotoW, gridPhotoH, cornerRadius);
      ctx.clip();
      
      // Draw photo with filter applied to context
      if (activeFilter.id !== 'normal') {
        ctx.filter = activeFilter.canvasFilter;
      }

      // Draw photo inside grid box with cover crop behavior
      drawImageProp(ctx, img, pos.x, pos.y, gridPhotoW, gridPhotoH);
      
      // Restore context (removes filter and clipping for subsequent elements)
      ctx.restore();

      // Draw individual inner photograph borders with matching curved corners (only for non-custom frames here)
      if (!isCustomTemplateFrame) {
        ctx.save();
        drawRoundedRect(ctx, pos.x, pos.y, gridPhotoW, gridPhotoH, cornerRadius);
        ctx.strokeStyle = activeFrame.canvasBorder;
        ctx.lineWidth = 12; // Thicker border for better quality aesthetic definition
        ctx.stroke();
        ctx.restore();
      }
    }

    // 5.5. Draw Custom Template Frame Overlay on top of photos
    if (isCustomTemplateFrame) {
      // Draw the individual inner photograph borders on top of the photos
      for (let i = 0; i < 4; i++) {
        const pos = photoPositions[i];
        ctx.save();
        const cornerRadius = 32;
        drawRoundedRect(ctx, pos.x, pos.y, gridPhotoW, gridPhotoH, cornerRadius);
        ctx.strokeStyle = activeFrame.canvasBorder;
        ctx.lineWidth = 12;
        ctx.stroke();
        ctx.restore();
      }

      if (activeFrame.id === 'tts3') {
        try {
          const stickerImg = await loadImage(stcTts3Img);
          const stickerWidth = cardWidth * 1.05; // 105% of total card width
          const stickerHeight = stickerWidth * (stickerImg.height / stickerImg.width);
          const stickerX = (cardWidth - stickerWidth) / 2; // Center horizontally
          const stickerY = cardHeight - stickerHeight; // Bottom aligned with the very bottom of the card
          ctx.save();
          ctx.drawImage(stickerImg, stickerX, stickerY, stickerWidth, stickerHeight);
          ctx.restore();
        } catch (err) {
          console.error('Gagal memuat stiker tts3 kustom:', err);
        }
      }

      if (activeFrame.id === 'gummyberry') {
        try {
          const stickerImg = await loadImage(stcGummyBerryImg);
          const stickerWidth = cardWidth * 1.03; // 103% of total card width
          const stickerHeight = stickerWidth * (stickerImg.height / stickerImg.width);
          const stickerX = (cardWidth - stickerWidth) / 2; // Center horizontally
          const stickerY = cardHeight - stickerHeight; // Bottom aligned with the very bottom of the card
          ctx.save();
          ctx.drawImage(stickerImg, stickerX, stickerY, stickerWidth, stickerHeight);
          ctx.restore();
        } catch (err) {
          console.error('Gagal memuat stiker GummyBerry kustom:', err);
        }
      }

      if (activeFrame.id === 'strawberry') {
        try {
          const stickerImg = await loadImage(stcStrawberryImg);
          const stickerWidth = cardWidth * 1.03; // 103% of total card width
          const stickerHeight = stickerWidth * (stickerImg.height / stickerImg.width);
          const stickerX = (cardWidth - stickerWidth) / 2; // Center horizontally
          const stickerY = cardHeight - stickerHeight; // Bottom aligned with the very bottom of the card
          ctx.save();
          ctx.drawImage(stickerImg, stickerX, stickerY, stickerWidth, stickerHeight);
          ctx.restore();
        } catch (err) {
          console.error('Gagal memuat stiker Strawberry kustom:', err);
        }
      }
    }

    setLoadingStatus('Menambahkan teks branding...');

    // 6. Draw Footer Branding Text
    if (!isCustomTemplateFrame) {
      const footerY = cardHeight - (bottomPadding / 2) + 15;

      // Font pairings
      let titleFont = 'bold 54px "Space Grotesk", sans-serif';
      let dateFont = 'bold 24px "JetBrains Mono", monospace';

      // Title text
      ctx.fillStyle = activeFrame.canvasText;
      ctx.textAlign = 'center';
      ctx.font = titleFont;
      ctx.fillText('•BEV2 PHOTOBOX•', cardWidth / 2, footerY - 15);

      // Date Stamp directly below the title
      if (showDate) {
        ctx.font = dateFont;
        ctx.fillStyle = activeFrame.canvasText + 'cc'; // slightly muted
        ctx.fillText(getFormattedDate(), cardWidth / 2, footerY + 35);
      }
    }

    // 6.5. Draw Stickers on Canvas
    if (stickers.length > 0) {
      setLoadingStatus('Menambahkan stiker...');
      for (const sticker of stickers) {
        const canvasX = (sticker.x / 100) * cardWidth;
        const canvasY = (sticker.y / 100) * cardHeight;
        
        // Sizing relative to high resolution card width
        const previewWidth = 340;
        const scaleFactor = cardWidth / previewWidth;
        const canvasStickerSize = 34 * sticker.scale * scaleFactor;
        
        ctx.save();
        ctx.translate(canvasX, canvasY);
        ctx.rotate((sticker.rotation * Math.PI) / 180);
        
        ctx.font = `${canvasStickerSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sticker.emoji, 0, 0);
        
        ctx.restore();
      }
    }

    return { canvas, cardWidth, cardHeight };
  };

  // Render high resolution card to hidden canvas and trigger download
  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportType('download');
    setExportProgress('Mempersiapkan render...');

    try {
      const { canvas } = await renderCardToCanvas(setExportProgress);
      if (!canvas) throw new Error('Render failed');

      setExportProgress('Menyimpan file JPG...');

      // Trigger Direct JPG Download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.96);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `${titleText.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setExportProgress('Selesai!');
      setTimeout(() => {
        setIsExporting(false);
        setExportType(null);
      }, 800);

    } catch (error) {
      console.error('Download gagal:', error);
      alert('Gagal mengekspor foto, silakan coba kembali.');
      setIsExporting(false);
      setExportType(null);
    }
  };

  // Render high resolution card to hidden canvas and share via Web Share API
  const handleShare = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportType('share');
    setExportProgress('Mempersiapkan render...');

    try {
      const { canvas } = await renderCardToCanvas(setExportProgress);
      if (!canvas) throw new Error('Render failed');

      setExportProgress('Membuat file gambar...');

      // Convert canvas to Blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.96);
      });

      if (!blob) throw new Error('Gagal membuat blob gambar');

      const filename = `${titleText.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.jpg`;
      const file = new File([blob], filename, { type: 'image/jpeg' });

      setExportProgress('Membuka menu berbagi...');

      // Check if browser supports Web Share API with files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'BEV2 Photobox',
          text: 'Lihat hasil photobox-ku! 📸✨',
        });
      } else if (navigator.share) {
        // Fallback if browser supports navigator.share but not files sharing
        const shareUrl = window.location.href;
        await navigator.share({
          title: 'BEV2 Photobox',
          text: 'Lihat hasil photobox-ku! Unduh gambarnya terlebih dahulu lalu bagikan. 📸✨',
          url: shareUrl
        });
      } else {
        // Fallback for browsers that do not support Web Share API at all
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          alert('Menu berbagi otomatis tidak didukung browser Anda. Tautan aplikasi telah disalin ke papan klip! Unduh gambarnya dan bagikan langsung ke media sosial Anda.');
        } else {
          alert('Fitur berbagi otomatis tidak didukung browser Anda. Silakan unduh gambar dan bagikan secara manual.');
        }
      }

      setExportProgress('Selesai!');
      setTimeout(() => {
        setIsExporting(false);
        setExportType(null);
      }, 800);
    } catch (error: any) {
      // Don't show failure if user cancelled/aborted
      if (error?.name === 'AbortError') {
        console.log('Berbagi dibatalkan oleh pengguna.');
      } else {
        console.error('Berbagi gagal:', error);
        alert('Gagal membagikan foto secara langsung. Silakan coba unduh fotonya terlebih dahulu lalu bagikan secara manual.');
      }
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-zinc-950 text-white overflow-y-auto no-scrollbar pb-32">
      {/* Top Bar Navigation */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-900 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-30">
        <button
          onClick={onRetake}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition py-1.5"
        >
          <ChevronLeft size={16} /> Foto Ulang
        </button>
        <span className="text-xs font-semibold font-display tracking-wider text-zinc-300">EDIT PHOTOBOX</span>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-md mx-auto w-full px-5 py-6 flex flex-col items-center gap-6">
        
        {/* Fixed uneditable Title above preview */}
        <div className="text-center flex flex-col items-center select-none pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-2">
            Hasil Desain Cetak
          </div>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-zinc-100 flex items-center gap-2">
            BEV2 <span className="text-pink-400">PHOTOBOX</span>
          </h2>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide mt-1">
            Gaya & bingkai terkunci (tidak dapat diedit secara langsung)
          </p>
        </div>

        {/* Dynamic Card Preview Container */}
        <div className="w-full flex justify-center">
          <div
            id="photobox-card-preview"
            onMouseMove={handleCardPointerMove}
            onTouchMove={handleCardPointerMove}
            onMouseUp={handleCardPointerUp}
            onTouchEnd={handleCardPointerUp}
            onClick={handleCardClick}
            className={`w-full max-w-[380px] rounded-2xl shadow-2xl transition-all duration-300 relative border overflow-hidden ${
              activeFrame.bgColor
            } aspect-[4/5]`}
            style={isCustomTemplateFrame ? { backgroundImage: `url(${getCustomFrameBg()})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            {activeFrame.id === 'tts3' && (
              <img
                src={stcTts3Img}
                alt="Sticker Tjap Solo 3"
                className="absolute z-40 pointer-events-none select-none"
                style={{
                  left: '-2.5%',
                  width: '105%',
                  bottom: '0%',
                  height: 'auto',
                }}
              />
            )}

            {activeFrame.id === 'gummyberry' && (
              <img
                src={stcGummyBerryImg}
                alt="Sticker GummyBerry"
                className="absolute z-40 pointer-events-none select-none"
                style={{
                  left: '-1.5%',
                  width: '103%',
                  bottom: '0%',
                  height: 'auto',
                }}
              />
            )}

            {activeFrame.id === 'strawberry' && (
              <img
                src={stcStrawberryImg}
                alt="Sticker Strawberry"
                className="absolute z-40 pointer-events-none select-none"
                style={{
                  left: '-1.5%',
                  width: '103%',
                  bottom: '0%',
                  height: 'auto',
                }}
              />
            )}

            {/* Photo grid borders layered on top of the photos */}
            {isCustomTemplateFrame && (
              <div
                style={{
                  position: 'absolute',
                  left: '12.8125%',
                  right: '12.8125%',
                  top: '2.8125%',
                  height: '73.875%',
                  pointerEvents: 'none',
                  zIndex: 30,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                  columnGap: '1.71875%',
                  rowGap: '1.375%',
                }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border-2 transition-all duration-300 w-full h-full"
                    style={{ borderColor: activeFrame.canvasBorder }}
                  />
                ))}
              </div>
            )}

            {/* Permanent brand label at the top center of the frame */}
            {!isCustomTemplateFrame && (
              <div
                style={{
                  position: 'absolute',
                  top: '3.5%',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 20,
                }}
              >
                <span className={`text-[8px] font-bold tracking-[0.25em] uppercase opacity-65 font-display ${
                  activeFrame.textColor
                }`}>
                  ★ BEV2 PHOTOBOX ★
                </span>
              </div>
            )}

            {/* 2x2 Image Grid */}
            <div
              style={
                isCustomTemplateFrame
                  ? {
                      position: 'absolute',
                      left: '12.8125%',
                      right: '12.8125%',
                      top: '2.8125%',
                      height: '73.875%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                      columnGap: '1.71875%',
                      rowGap: '1.375%',
                      zIndex: 10,
                    }
                  : {
                      position: 'absolute',
                      left: '11.875%',
                      right: '11.875%',
                      top: '7.5%',
                      height: '76%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                      columnGap: '1.25%',
                      rowGap: '1.0%',
                      zIndex: 10,
                    }
              }
            >
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden bg-zinc-900 transition-all duration-300 w-full h-full ${
                    isCustomTemplateFrame ? 'border-0' : 'border-2'
                  }`}
                  style={!isCustomTemplateFrame ? { borderColor: activeFrame.canvasBorder } : undefined}
                >
                  <img
                    src={photo}
                    alt={`Preview ${i + 1}`}
                    style={{ filter: activeFilter.cssFilter }}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Branding footer area */}
            {!isCustomTemplateFrame && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '16.5%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 20,
                }}
              >
                <h3
                  className={`font-display font-black uppercase text-[13px] tracking-[0.1em] truncate max-w-[240px] ${
                    activeFrame.textColor
                  }`}
                >
                  •BEV2 PHOTOBOX•
                </h3>
                {showDate && (
                  <span className="text-[9px] font-mono font-bold opacity-75 mt-1 uppercase tracking-widest text-zinc-400">
                    {getFormattedDate()}
                  </span>
                )}
              </div>
            )}

            {/* Sticker Overlay Elements */}
            {stickers.map((sticker) => {
              const isSelected = selectedStickerId === sticker.id;
              return (
                <div
                  key={sticker.id}
                  onMouseDown={(e) => handleStickerDragStart(e, sticker.id)}
                  onTouchStart={(e) => handleStickerDragStart(e, sticker.id)}
                  style={{
                    left: `${sticker.x}%`,
                    top: `${sticker.y}%`,
                    transform: `translate(-50%, -50%) scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                    touchAction: 'none'
                  }}
                  className={`absolute sticker-element select-none cursor-grab active:cursor-grabbing text-3.5xl z-20 p-2 rounded-xl transition-shadow duration-100 ${
                    isSelected ? 'ring-2 ring-pink-500 bg-black/40 shadow-lg' : 'hover:scale-110'
                  }`}
                >
                  {sticker.emoji}
                  {isSelected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStickers(prev => prev.filter(s => s.id !== sticker.id));
                        setSelectedStickerId(null);
                      }}
                      className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md cursor-pointer border border-zinc-950 z-30"
                      title="Hapus"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Customization Sliders & Options Drawer (Simple Mobile Controls) */}
        <div className="w-full flex flex-col gap-6 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60 backdrop-blur-sm">
          
          {/* Section: Filter Effects */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 font-display select-none">
              <Sparkles size={13} className="text-pink-400 animate-pulse" /> PILIHAN 7 FILTER MINIMALIS
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar snap-x justify-start">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex-none snap-start py-1.5 px-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-250 cursor-pointer border ${
                    activeFilter.id === filter.id
                      ? 'bg-pink-500 border-pink-400 text-white shadow-md shadow-pink-500/25 scale-[1.03]'
                      : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/50'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Frame style select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
              <ImageIcon size={14} className="text-pink-400" /> Pilihan Desain Bingkai
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar snap-x">
              {FRAMES.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setActiveFrame(frame)}
                  className={`flex-none snap-start flex items-center gap-2 py-2 px-3 rounded-xl border text-xs transition duration-200 cursor-pointer ${
                    activeFrame.id === frame.id
                      ? 'bg-pink-500/10 border-pink-400 text-pink-300 font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border ${frame.bgColor}`} />
                  <span className="whitespace-nowrap font-medium">{frame.name}</span>
                  {activeFrame.id === frame.id && <Check size={12} className="text-pink-300" />}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Text Customization */}
          <div className={`flex flex-col gap-3 pt-1 border-t border-zinc-800/80 transition-all duration-300 ${
            isCustomTemplateFrame ? 'opacity-65' : ''
          }`}>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Type size={14} className="text-pink-400" /> Kustomisasi Tulisan
              </label>
              <button
                disabled={isCustomTemplateFrame}
                onClick={() => setShowDate(!showDate)}
                className={`text-[10px] px-2 py-1 rounded-md border flex items-center gap-1 transition cursor-pointer ${
                  isCustomTemplateFrame
                    ? 'bg-zinc-950 border-zinc-900 text-zinc-600 cursor-not-allowed'
                    : showDate
                    ? 'bg-pink-500/10 border-pink-400/30 text-pink-300'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                }`}
              >
                <Calendar size={10} /> Tanggal: {isCustomTemplateFrame ? 'OFF' : showDate ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div className="bg-zinc-950/85 border border-zinc-800/80 rounded-xl px-4 py-3.5 text-center">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-widest block flex items-center justify-center gap-1.5">
                🔒 Kustomisasi Tulisan Dikunci
              </span>
              <p className="text-[11px] text-zinc-300 mt-2 font-medium font-display">
                Judul: <span className="text-pink-300 font-bold">•BEV2 PHOTOBOX•</span>
              </p>
              <p className="text-[9px] text-zinc-500 mt-1.5 leading-relaxed font-mono">
                Keterangan ditiadakan & tanggal diletakkan di bawah judul secara otomatis agar desain bingkai selalu estetik, rapi, dan presisi.
              </p>
            </div>
          </div>

        </div>

        {/* Action Buttons: Download & Share */}
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-zinc-100 text-black font-bold rounded-2xl shadow-lg hover:bg-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50 select-none cursor-pointer"
            >
              {isExporting && exportType === 'download' ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold">{exportProgress}</span>
                </div>
              ) : (
                <>
                  <Download size={18} className="stroke-[2.5]" />
                  <span className="font-display uppercase tracking-wider text-xs">Unduh JPG</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-2xl shadow-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 select-none cursor-pointer"
            >
              {isExporting && exportType === 'share' ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-zinc-300">{exportProgress}</span>
                </div>
              ) : (
                <>
                  <Share2 size={18} className="stroke-[2.5] text-pink-400" />
                  <span className="font-display uppercase tracking-wider text-xs">Bagikan Grid</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-zinc-500 text-center leading-relaxed font-semibold">
            Unduh berkas gambar berkualitas cetak atau bagikan langsung hasil photobox-mu ke media sosial & aplikasi chat!
          </p>
        </div>

      </div>

      {/* Hidden canvas used for high resolution rendering */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
