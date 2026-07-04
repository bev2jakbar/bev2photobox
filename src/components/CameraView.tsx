import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Sparkles, User, AlertTriangle, Timer, Disc, LayoutGrid } from 'lucide-react';
import { Orientation, PhotoFilter } from '../types';
import { playCountdownBeep, playShutterSound, playSuccessChime } from '../utils/audio';
import { DEMO_PHOTOS, FILTERS } from '../constants';

export interface FunnyEffect {
  id: string;
  name: string;
  emoji: string;
  cssFilter?: string;
  canvasFilter?: string;
  description: string;
}

export const FUNNY_EFFECTS: FunnyEffect[] = [
  {
    id: 'none',
    name: 'Tanpa Efek',
    emoji: '🚫',
    description: 'Tidak ada efek tambahan'
  },
  {
    id: 'kirakira',
    name: 'KiraKira Sparkle ✨',
    emoji: '✨',
    cssFilter: 'saturate(1.2) brightness(1.03)',
    canvasFilter: 'saturate(120%) brightness(103%)',
    description: 'Bintang sparkle berkilau estetik dan cantik'
  },
  {
    id: 'vhs_cam',
    name: '90s VHS Cam 📼',
    emoji: '📼',
    cssFilter: 'contrast(0.9) saturate(0.85) sepia(0.12)',
    canvasFilter: 'contrast(90%) saturate(85%) sepia(12%)',
    description: 'Tampilan camcorder retro dengan time stamp dan scanlines'
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour 🌅',
    emoji: '🌅',
    cssFilter: 'sepia(0.32) saturate(1.4) hue-rotate(-10deg) brightness(1.05)',
    canvasFilter: 'sepia(32%) saturate(140%) hue-rotate(-10deg) brightness(105%)',
    description: 'Efek matahari sore yang hangat, romantis, dan dreamy'
  },
  {
    id: 'heart_blush',
    name: 'Heart Blush 💖',
    emoji: '💖',
    cssFilter: 'saturate(1.15) brightness(1.02)',
    canvasFilter: 'saturate(115%) brightness(102%)',
    description: 'Perona pipi pink merona dengan hiasan hati kecil yang imut'
  },
  {
    id: 'angel_halo',
    name: 'Angel Halo 😇',
    emoji: '😇',
    cssFilter: 'brightness(1.04) saturate(1.1) contrast(0.96)',
    canvasFilter: 'brightness(104%) saturate(110%) contrast(96%)',
    description: 'Lingkaran cahaya malaikat emas di kepala dan awan lembut'
  },
  {
    id: 'cyber_glitch',
    name: 'Cyber Glitch ⚡',
    emoji: '⚡',
    cssFilter: 'hue-rotate(180deg) saturate(1.8) contrast(1.15)',
    canvasFilter: 'hue-rotate(180deg) saturate(180%) contrast(115%)',
    description: 'Efek distorsi warna neon cyberpunk yang keren'
  },
  {
    id: 'vintage_grain',
    name: 'Vintage Grain 🎞️',
    emoji: '🎞️',
    cssFilter: 'contrast(1.08) sepia(0.22) saturate(0.9)',
    canvasFilter: 'contrast(108%) sepia(22%) saturate(90%)',
    description: 'Goresan debu film vintage dan tekstur analog klasik'
  },
  {
    id: 'subtle_glow',
    name: 'Soft Dreamy 🌸',
    emoji: '🌸',
    cssFilter: 'brightness(1.08) saturate(1.1) blur(0.3px)',
    canvasFilter: 'brightness(108%) saturate(110%)',
    description: 'Aura lembut berkilau dengan filter dreamy pink pastel'
  },
  {
    id: 'indie_kid',
    name: 'Indie Kid 🦋',
    emoji: '🦋',
    cssFilter: 'saturate(1.75) contrast(1.15) hue-rotate(-5deg)',
    canvasFilter: 'saturate(175%) contrast(115%) hue-rotate(-5deg)',
    description: 'Filter 2000s super saturated dilengkapi kupu-kupu warna-warni'
  },
  {
    id: 'polaroid_frame',
    name: 'Instant Instax 📸',
    emoji: '📸',
    cssFilter: 'contrast(0.95) saturate(0.9) brightness(1.02)',
    canvasFilter: 'contrast(95%) saturate(90%) brightness(102%)',
    description: 'Bingkai foto polaroid instax klasik yang estetik'
  },
  {
    id: 'devil_horns',
    name: 'Neon Devil 😈',
    emoji: '😈',
    cssFilter: 'contrast(1.1) saturate(1.2) hue-rotate(340deg)',
    canvasFilter: 'contrast(110%) saturate(120%) hue-rotate(340deg)',
    description: 'Tanduk setan merah neon menyala yang imut di kepala'
  },
  {
    id: 'disco_fever',
    name: 'Disco Fever 🪩',
    emoji: '🪩',
    cssFilter: 'saturate(1.5) contrast(1.1) brightness(0.95)',
    canvasFilter: 'saturate(150%) contrast(110%) brightness(95%)',
    description: 'Pesta disko retro dengan lampu warna-warni berkerlap-kerlip'
  },
  {
    id: 'pixel_art',
    name: '8-Bit Arcade 👾',
    emoji: '👾',
    cssFilter: 'contrast(1.2) saturate(1.3)',
    canvasFilter: 'contrast(120%) saturate(130%)',
    description: 'Vibe game retro 8-bit klasik arcade lengkap dengan konsol game'
  },
  {
    id: 'butterfly_crown',
    name: 'Butterfly Crown 👑',
    emoji: '👑',
    cssFilter: 'saturate(1.25) brightness(1.04) sepia(0.08)',
    canvasFilter: 'saturate(125%) brightness(104%) sepia(8%)',
    description: 'Mahkota kupu-kupu monarch kuning-oranye estetik mengitari kepala'
  },
  {
    id: 'neon_wings',
    name: 'Neon Wings 🪽',
    emoji: '🪽',
    cssFilter: 'contrast(1.05) saturate(1.3) brightness(0.98)',
    canvasFilter: 'contrast(105%) saturate(130%) brightness(98%)',
    description: 'Sayap neon pink menyala elegan di belakang tubuhmu'
  },
  {
    id: 'raining_money',
    name: 'Raining Cash 💸',
    emoji: '💸',
    cssFilter: 'saturate(1.15) brightness(1.02) contrast(1.03)',
    canvasFilter: 'saturate(115%) brightness(102%) contrast(103%)',
    description: 'Hujan lembaran uang dolar hijau viral melimpah dari atas'
  },
  {
    id: 'snow_globe',
    name: 'Snow Globe ❄️',
    emoji: '❄️',
    cssFilter: 'brightness(1.06) saturate(0.95) contrast(1.02)',
    canvasFilter: 'brightness(106%) saturate(95%) contrast(102%)',
    description: 'Efek butiran salju musim dingin yang magis berjatuhan'
  },
  {
    id: 'cute_puppy',
    name: 'Cute Puppy 🐶',
    emoji: '🐶',
    cssFilter: 'saturate(1.1) brightness(1.03)',
    canvasFilter: 'saturate(110%) brightness(103%)',
    description: 'Telinga dan hidung anak anjing lucu yang menggemaskan'
  },
  {
    id: 'starry_night',
    name: 'Starry Night 🌙',
    emoji: '🌙',
    cssFilter: 'brightness(0.92) saturate(1.15) hue-rotate(210deg) contrast(1.05)',
    canvasFilter: 'brightness(92%) saturate(115%) hue-rotate(210deg) contrast(105%)',
    description: 'Tampilan malam berbintang biru tua mistis dan syahdu'
  }
];

interface CameraViewProps {
  orientation: Orientation;
  activeFilter: PhotoFilter;
  onFilterChange: (filter: PhotoFilter) => void;
  onPhotosCaptured: (photos: string[]) => void;
  onCancel: () => void;
}

export default function CameraView({
  orientation,
  activeFilter,
  onFilterChange,
  onPhotosCaptured,
  onCancel,
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionState, setPermissionState] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [lensType, setLensType] = useState<'1x' | '0.5x'>('1x');
  const [capturedCount, setCapturedCount] = useState<number>(0);
  const [capturedList, setCapturedList] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(3);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);
  const [simulatedPhotoIndex, setSimulatedPhotoIndex] = useState<number>(0);
  const [funnyEffectId, setFunnyEffectId] = useState<string>('none');
  const [isCembung, setIsCembung] = useState<boolean>(false);
  const [captureMode, setCaptureMode] = useState<'grid2x2' | 'single'>('grid2x2');

  // Initialize camera
  useEffect(() => {
    if (useSimulation) {
      setPermissionState('granted');
      return;
    }

    let isCurrent = true;
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        setPermissionState('pending');

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('API mediaDevices tidak didukung pada browser ini. Pastikan Anda mengakses via HTTPS.');
        }

        const constraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        };

        let mediaStream: MediaStream;
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        } catch (err) {
          console.warn('Gagal memuat dengan resolusi ideal, mencoba resolusi default...', err);
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: facingMode },
            audio: false
          });
        }

        if (!isCurrent) {
          // If cleaned up while acquiring, immediately stop tracks
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        activeStream = mediaStream;
        setStream(mediaStream);
        setPermissionState('granted');
      } catch (err) {
        if (isCurrent) {
          console.error('Gagal mengakses kamera:', err);
          setPermissionState('denied');
          // Fallback to simulation mode automatically
          setUseSimulation(true);
        }
      }
    }

    startCamera();

    return () => {
      isCurrent = false;
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      setStream((prevStream) => {
        if (prevStream) {
          prevStream.getTracks().forEach((track) => track.stop());
        }
        return null;
      });
    };
  }, [facingMode, useSimulation]);

  // Bind the video stream to the video element safely
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (stream && permissionState === 'granted' && !useSimulation) {
        video.srcObject = stream;
        video.play().catch((err) => {
          console.warn('Gagal memutar video secara otomatis:', err);
        });
      } else {
        video.srcObject = null;
      }
    }
  }, [stream, permissionState, useSimulation]);

  // Flip camera helper
  const handleFlipCamera = () => {
    if (useSimulation) return;
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Start the automated photobox shooting session
  const startShootingSequence = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    setCapturedCount(0);
    const photos: string[] = [];
    setCapturedList([]);

    const totalExpectedShots = captureMode === 'single' ? 1 : 4;

    for (let shot = 0; shot < totalExpectedShots; shot++) {
      // dynamic countdown duration
      for (let count = timerDuration; count > 0; count--) {
        setCountdown(count);
        playCountdownBeep(false);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Flash & Capture moment!
      setCountdown(null);
      setIsFlash(true);
      playShutterSound();
      
      // Delay to let the flash effect run
      await new Promise((resolve) => setTimeout(resolve, 100));
      setIsFlash(false);

      // Perform photo capture
      let photoDataUrl = '';
      if (useSimulation) {
        // Grab simulated image
        const imgUrl = DEMO_PHOTOS[(simulatedPhotoIndex + shot) % DEMO_PHOTOS.length];
        photoDataUrl = await convertUrlToBase64(imgUrl);
      } else {
        // Grab actual video frame
        photoDataUrl = captureVideoFrame();
      }

      photos.push(photoDataUrl);
      setCapturedList([...photos]);
      setCapturedCount(shot + 1);

      // Brief gap between shots
      if (shot < totalExpectedShots - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    }

    // Play final completion chime
    playSuccessChime();
    
    // Pass final set back
    setTimeout(() => {
      onPhotosCaptured(photos);
      setIsCapturing(false);
    }, 500);
  };

  const renderFunnyOverlayLive = () => {
    switch (funnyEffectId) {
      case 'kirakira':
        return (
          <>
            {/* Sparkles floating around */}
            <div className="absolute top-[20%] left-[25%] text-4xl select-none animate-pulse z-10 duration-1000">✨</div>
            <div className="absolute top-[15%] right-[20%] text-5xl select-none animate-bounce z-10">✨</div>
            <div className="absolute top-[48%] left-[12%] text-3xl select-none animate-pulse z-10 duration-700">🌟</div>
            <div className="absolute bottom-[28%] right-[15%] text-4xl select-none animate-bounce z-10">✨</div>
            <div className="absolute bottom-[15%] left-[22%] text-3xl select-none animate-pulse z-10 duration-500">💫</div>
            <div className="absolute top-[40%] right-[10%] text-2xl select-none animate-pulse z-10">🌟</div>
          </>
        );
      case 'vhs_cam':
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-4 font-mono text-white/90 text-[10px] select-none tracking-wider z-20 pointer-events-none">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5 bg-black/30 px-1.5 py-0.5 rounded">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-red-500">REC</span>
              </div>
              <div className="bg-black/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span>🔋 95%</span>
              </div>
            </div>

            {/* Scanlines visual helper */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />

            {/* Bottom row */}
            <div className="flex justify-between items-end mt-auto">
              <div className="bg-black/30 px-1.5 py-0.5 rounded flex flex-col">
                <span>PLAY ▶</span>
                <span className="text-[8px] opacity-70">SP MODE</span>
              </div>
              <div className="bg-black/30 px-1.5 py-0.5 rounded flex flex-col items-end">
                <span>JUL 04, 2026</span>
                <span className="font-bold text-amber-400">14:20:05</span>
              </div>
            </div>
          </div>
        );
      case 'golden_hour':
        return (
          <>
            {/* Warm Solar flare gradient leak */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent mix-blend-screen pointer-events-none z-10" />
            <div className="absolute top-[12%] right-[12%] w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none mix-blend-screen animate-pulse z-10" />
            <div className="absolute top-[8%] right-[8%] text-3xl select-none animate-spin duration-10000 opacity-60 z-10">☀️</div>
          </>
        );
      case 'heart_blush':
        return (
          <>
            {/* Pink airbrush cheeks */}
            <div className="absolute top-[54%] left-[32%] -translate-x-1/2 -translate-y-1/2 w-20 h-12 bg-pink-400/20 rounded-full blur-xl pointer-events-none z-10" />
            <div className="absolute top-[54%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-20 h-12 bg-pink-400/20 rounded-full blur-xl pointer-events-none z-10" />
            
            {/* Aesthetic freckles representation on nose bridge/cheeks */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] text-amber-800/60 font-bold select-none tracking-widest z-10 pointer-events-none">
              ... .. . .. .
            </div>

            {/* Floating love hearts */}
            <div className="absolute top-[48%] left-[26%] text-xl select-none animate-bounce z-10">💖</div>
            <div className="absolute top-[48%] left-[74%] text-xl select-none animate-bounce z-10 duration-1000">💖</div>
            <div className="absolute top-[56%] left-[35%] text-sm select-none animate-pulse z-10">💕</div>
            <div className="absolute top-[56%] left-[65%] text-sm select-none animate-pulse z-10">💕</div>
          </>
        );
      case 'angel_halo':
        return (
          <>
            {/* Golden glowing angel halo above the head */}
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-8 border-[5px] border-amber-300 rounded-full rotate-[-6deg] shadow-[0_0_20px_rgba(251,191,36,0.9),inset_0_0_10px_rgba(251,191,36,0.4)] z-20 animate-pulse" />
            <div className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-bounce text-amber-200 select-none z-10">✨</div>
            
            {/* Sweet fluffy clouds at bottom corners */}
            <div className="absolute bottom-[4%] left-[8%] text-3xl opacity-80 animate-pulse select-none z-10">☁️</div>
            <div className="absolute bottom-[4%] right-[8%] text-3xl opacity-80 animate-pulse select-none z-10">☁️</div>
          </>
        );
      case 'cyber_glitch':
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-4 font-mono select-none pointer-events-none z-20">
            {/* Glitch Bracket Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

            {/* Neon tags */}
            <div className="flex justify-between text-[8px] font-bold text-cyan-400">
              <span className="animate-pulse shadow-cyan-500/50 bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-500/30">SYS_ONLINE // 1.0x</span>
              <span className="text-pink-500 shadow-pink-500/50 bg-pink-950/40 px-1 py-0.5 rounded border border-pink-500/30 animate-pulse">GRID_MATRIX_ACTIVE</span>
            </div>

            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-cyan-400/60" />
              <div className="h-4 w-0.5 bg-cyan-400/60 absolute" />
            </div>

            {/* Bottom tags */}
            <div className="flex justify-between items-end mt-auto text-[8px] font-bold">
              <span className="text-cyan-400">FPS 60 // P_B_01</span>
              <span className="text-pink-400 tracking-widest animate-bounce">CYBER_AESTHETIC</span>
            </div>
          </div>
        );
      case 'vintage_grain':
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-4 font-serif pointer-events-none z-20">
            {/* Vintage Dust/Scratch representation */}
            <div className="absolute top-[30%] left-[45%] w-0.5 h-6 bg-white/20 rotate-12" />
            <div className="absolute bottom-[25%] right-[30%] w-0.5 h-4 bg-white/25 -rotate-12" />
            <div className="absolute top-[60%] right-[15%] w-1 h-1 bg-white/30 rounded-full" />
            <div className="absolute bottom-[40%] left-[10%] w-1 h-1 bg-white/20 rounded-full" />

            {/* Classic amber digital date stamp */}
            <div className="mt-auto ml-auto bg-black/25 px-2 py-0.5 rounded text-[11px] font-mono text-orange-500 tracking-wider font-bold">
              04.07.26
            </div>
          </div>
        );
      case 'subtle_glow':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-pink-400/5 via-transparent to-purple-400/5 mix-blend-screen pointer-events-none z-10" />
            <div className="absolute top-[25%] left-[20%] text-3xl select-none animate-pulse duration-1000 z-10">🌸</div>
            <div className="absolute top-[35%] right-[22%] text-2xl select-none animate-pulse duration-700 z-10">✨</div>
            <div className="absolute bottom-[30%] left-[25%] text-2xl select-none animate-bounce z-10">🌸</div>
            <div className="absolute top-[60%] right-[15%] text-3xl select-none animate-pulse z-10">✨</div>
          </>
        );
      case 'indie_kid':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-transparent to-yellow-400/10 mix-blend-color-burn pointer-events-none z-10" />
            <div className="absolute top-[18%] left-[15%] text-4xl select-none animate-bounce z-10">🦋</div>
            <div className="absolute top-[22%] right-[18%] text-3xl select-none animate-pulse duration-500 z-10">🌈</div>
            <div className="absolute top-[45%] left-[8%] text-3xl select-none animate-pulse duration-1000 z-10">🦋</div>
            <div className="absolute bottom-[25%] right-[12%] text-4xl select-none animate-bounce z-10">🦋</div>
            <div className="absolute bottom-[15%] left-[18%] text-2xl select-none animate-pulse z-10">✨</div>
          </>
        );
      case 'polaroid_frame':
        return (
          <div className="absolute inset-0 border-[16px] border-white border-b-[56px] flex flex-col justify-end items-center pb-2 pointer-events-none z-20 select-none shadow-inner">
            <span className="font-sans text-[10px] text-zinc-600/80 font-semibold tracking-wider uppercase">
              ✨ JULY 2026 ✨
            </span>
          </div>
        );
      case 'devil_horns':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 via-transparent to-black/30 pointer-events-none z-10" />
            {/* Left and Right Devil Horns */}
            <div className="absolute top-[18%] left-[34%] -translate-x-1/2 -translate-y-1/2 text-5xl select-none filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse z-20">😈</div>
            <div className="absolute top-[18%] left-[66%] -translate-x-1/2 -translate-y-1/2 text-5xl select-none filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse z-20 scale-x-[-1]">😈</div>
            <div className="absolute bottom-[15%] left-[12%] text-2xl select-none animate-bounce z-10">🔥</div>
            <div className="absolute bottom-[15%] right-[12%] text-2xl select-none animate-bounce z-10">🔥</div>
          </>
        );
      case 'disco_fever':
        return (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-zinc-400/60 z-10" />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 text-5xl select-none animate-spin duration-10000 filter drop-shadow-md z-20">🪩</div>
            
            {/* Colorful light sparkles */}
            <div className="absolute top-[30%] left-[15%] w-8 h-8 rounded-full bg-pink-500/25 blur-md animate-ping" />
            <div className="absolute top-[40%] right-[18%] w-10 h-10 rounded-full bg-cyan-400/20 blur-md animate-ping duration-1000" />
            <div className="absolute bottom-[35%] left-[22%] w-12 h-12 rounded-full bg-yellow-400/20 blur-md animate-ping duration-700" />
            <div className="absolute bottom-[25%] right-[25%] w-8 h-8 rounded-full bg-purple-500/25 blur-md animate-ping" />
            
            <div className="absolute top-[25%] left-[25%] text-xl select-none animate-bounce z-10">✨</div>
            <div className="absolute top-[35%] right-[28%] text-xl select-none animate-bounce z-10">✨</div>
          </>
        );
      case 'pixel_art':
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-3 font-mono text-green-400 text-[9px] select-none tracking-widest z-20 pointer-events-none">
            <div className="flex justify-between items-center bg-black/40 p-1.5 rounded border border-green-500/20">
              <span className="animate-pulse">🔴 1P READY</span>
              <span className="text-yellow-400">HI-SCORE: 99990</span>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl select-none animate-bounce opacity-70">👾</div>
            
            <div className="flex justify-between items-center mt-auto bg-black/40 p-1 rounded border border-green-500/10">
              <span>SCORE: 00120</span>
              <span className="flex gap-1">
                <span>❤️</span>
                <span>❤️</span>
                <span>❤️</span>
              </span>
            </div>
          </div>
        );
      case 'butterfly_crown':
        return (
          <>
            {/* Butterfly crown in arc layout above head */}
            <div className="absolute top-[15%] left-[32%] -translate-x-1/2 -translate-y-1/2 text-2xl select-none animate-bounce z-20">🦋</div>
            <div className="absolute top-[11%] left-[41%] -translate-x-1/2 -translate-y-1/2 text-3xl select-none animate-bounce duration-1000 z-20">🦋</div>
            <div className="absolute top-[9%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl select-none animate-pulse z-20">👑</div>
            <div className="absolute top-[11%] left-[59%] -translate-x-1/2 -translate-y-1/2 text-3xl select-none animate-bounce duration-700 z-20">🦋</div>
            <div className="absolute top-[15%] left-[68%] -translate-x-1/2 -translate-y-1/2 text-2xl select-none animate-bounce duration-1000 z-20">🦋</div>
            
            <div className="absolute top-[35%] left-[10%] text-sm opacity-60 animate-ping z-10">✨</div>
            <div className="absolute top-[40%] right-[10%] text-sm opacity-60 animate-ping z-10">✨</div>
          </>
        );
      case 'neon_wings':
        return (
          <>
            <div className="absolute inset-y-0 left-2 flex items-center justify-center select-none animate-pulse z-10">
              <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">🪽</span>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center justify-center select-none animate-pulse z-10 scale-x-[-1]">
              <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">🪽</span>
            </div>
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-[9px] font-mono text-pink-400 tracking-wider bg-black/40 px-2 py-0.5 rounded border border-pink-500/20 z-10">
              NEON_WING_SYSTEM // ACTIVE
            </div>
          </>
        );
      case 'raining_money':
        return (
          <>
            {/* Raining Cash falling emojis */}
            <div className="absolute top-[-5%] left-[10%] text-4xl animate-bounce z-10 duration-1000">💸</div>
            <div className="absolute top-[-10%] left-[28%] text-3xl animate-bounce z-10 duration-700">💵</div>
            <div className="absolute top-[-5%] left-[45%] text-4xl animate-bounce z-10">💵</div>
            <div className="absolute top-[-8%] left-[65%] text-3xl animate-bounce z-10 duration-1000">💸</div>
            <div className="absolute top-[-5%] left-[82%] text-4xl animate-bounce z-10 duration-500">💵</div>
            
            <div className="absolute top-[35%] left-[18%] text-2xl animate-pulse z-10">💸</div>
            <div className="absolute top-[45%] right-[15%] text-2xl animate-pulse z-10">💸</div>
            <div className="absolute bottom-[20%] left-[30%] text-xl animate-bounce z-10">💰</div>
            <div className="absolute bottom-[25%] right-[25%] text-xl animate-bounce z-10">💰</div>
          </>
        );
      case 'snow_globe':
        return (
          <>
            <div className="absolute inset-0 bg-blue-400/5 pointer-events-none z-10" />
            <div className="absolute top-[10%] left-[15%] text-3xl select-none animate-spin duration-10000 z-10">❄️</div>
            <div className="absolute top-[18%] right-[20%] text-4xl select-none animate-bounce z-10">❄️</div>
            <div className="absolute top-[48%] left-[8%] text-2xl select-none animate-pulse duration-700 z-10">🌨️</div>
            <div className="absolute bottom-[28%] right-[12%] text-3xl select-none animate-bounce z-10">❄️</div>
            <div className="absolute bottom-[12%] left-[22%] text-4xl select-none animate-spin duration-10000 z-10">❄️</div>
            <div className="absolute bottom-4 left-4 text-3xl select-none z-10">☃️</div>
          </>
        );
      case 'cute_puppy':
        return (
          <>
            {/* Cute Puppy ears */}
            <div className="absolute top-[15%] left-[24%] -translate-x-1/2 -translate-y-1/2 text-6xl select-none z-20">🐶</div>
            <div className="absolute top-[15%] left-[76%] -translate-x-1/2 -translate-y-1/2 text-6xl select-none z-20 scale-x-[-1]">🐶</div>
            
            {/* Cute puppy nose & tongue */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
              <div className="text-3xl">👃</div>
              <div className="text-4xl -mt-2 animate-bounce">👅</div>
            </div>
            
            {/* Puppy paw prints */}
            <div className="absolute bottom-6 left-6 text-2xl opacity-70 animate-pulse z-10">🐾</div>
            <div className="absolute bottom-6 right-6 text-2xl opacity-70 animate-pulse z-10">🐾</div>
          </>
        );
      case 'starry_night':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-blue-900/10 pointer-events-none z-10" />
            <div className="absolute top-[12%] right-[15%] text-4xl select-none animate-pulse filter drop-shadow-[0_0_12px_rgba(253,224,71,0.6)] z-20">🌙</div>
            
            <div className="absolute top-[20%] left-[20%] text-xl select-none animate-pulse duration-1000 z-10">⭐️</div>
            <div className="absolute top-[35%] left-[40%] text-sm select-none animate-pulse duration-500 z-10">⭐️</div>
            <div className="absolute top-[28%] right-[35%] text-lg select-none animate-pulse duration-700 z-10">⭐️</div>
            <div className="absolute bottom-[40%] left-[12%] text-lg select-none animate-bounce z-10">⭐</div>
            <div className="absolute bottom-[20%] right-[18%] text-2xl select-none animate-pulse z-10">⭐</div>
          </>
        );
      default:
        return null;
    }
  };

  const drawFunnyOverlayToCanvas = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    effectId: string,
    isWide: boolean
  ) => {
    if (effectId === 'none') return;

    ctx.save();
    
    // If wide angle, scale around center
    if (isWide) {
      ctx.translate(width / 2, height / 2);
      ctx.scale(0.72, 0.72);
      ctx.translate(-width / 2, -height / 2);
    }

    const drawEmoji = (emoji: string, x: number, y: number, fontSize: number, rotateDeg: number = 0) => {
      ctx.save();
      ctx.translate(x, y);
      if (rotateDeg !== 0) {
        ctx.rotate((rotateDeg * Math.PI) / 180);
      }
      ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
    };

    switch (effectId) {
      case 'kirakira':
        drawEmoji('✨', 180, 250, 75, 10);
        drawEmoji('✨', 640, 180, 95, -15);
        drawEmoji('🌟', 120, 500, 60);
        drawEmoji('✨', 680, 720, 85, 20);
        drawEmoji('💫', 180, 850, 65, -5);
        drawEmoji('🌟', 700, 420, 45);
        break;

      case 'vhs_cam':
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Red dot and REC text
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(80, 75, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('REC', 105, 75);
        
        // Battery
        ctx.textAlign = 'right';
        ctx.fillText('🔋 95%', width - 60, 75);
        
        // Bottom elements
        ctx.textAlign = 'left';
        ctx.fillText('PLAY ▶', 60, height - 105);
        ctx.font = '16px monospace';
        ctx.fillText('SP MODE', 60, height - 75);
        
        ctx.textAlign = 'right';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('JUL 04, 2026', width - 60, height - 105);
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('14:20:05', width - 60, height - 75);
        ctx.restore();
        break;

      case 'golden_hour':
        ctx.save();
        const grad = ctx.createRadialGradient(width - 100, 120, 40, width - 100, 120, 650);
        grad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
        grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.18)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('☀️', width - 100, 110, 70);
        break;

      case 'heart_blush':
        ctx.save();
        ctx.fillStyle = 'rgba(244, 114, 182, 0.18)';
        // Draw blushes
        ctx.beginPath();
        ctx.arc(width * 0.32, height * 0.54, 70, 0, 2 * Math.PI);
        ctx.arc(width * 0.68, height * 0.54, 70, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw mini freckles
        ctx.fillStyle = 'rgba(180, 83, 9, 0.6)';
        const frecklesX = [
          width * 0.42, width * 0.45, width * 0.47, width * 0.50, width * 0.53, width * 0.55, width * 0.58,
          width * 0.38, width * 0.62, width * 0.40, width * 0.60
        ];
        const frecklesY = [
          height * 0.52, height * 0.51, height * 0.52, height * 0.53, height * 0.52, height * 0.51, height * 0.53,
          height * 0.54, height * 0.54, height * 0.53, height * 0.53
        ];
        frecklesX.forEach((fx, index) => {
          ctx.beginPath();
          ctx.arc(fx, frecklesY[index], 3, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.restore();

        drawEmoji('💖', width * 0.26, height * 0.48, 45, -10);
        drawEmoji('💖', width * 0.74, height * 0.48, 45, 10);
        drawEmoji('💕', width * 0.35, height * 0.56, 30);
        drawEmoji('💕', width * 0.65, height * 0.56, 30);
        break;

      case 'angel_halo':
        ctx.save();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 10;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.9)';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.ellipse(width / 2, height * 0.18, 130, 26, -6 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();

        drawEmoji('✨', width / 2, height * 0.11, 55);
        drawEmoji('☁️', width * 0.12, height * 0.92, 90);
        drawEmoji('☁️', width * 0.88, height * 0.92, 90);
        break;

      case 'cyber_glitch':
        ctx.save();
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 6;
        ctx.beginPath();
        // Top-left corner bracket
        ctx.moveTo(60, 40); ctx.lineTo(40, 40); ctx.lineTo(40, 60);
        // Top-right corner bracket
        ctx.moveTo(width - 60, 40); ctx.lineTo(width - 40, 40); ctx.lineTo(width - 40, 60);
        // Bottom-left corner bracket
        ctx.moveTo(40, height - 60); ctx.lineTo(40, height - 40); ctx.lineTo(60, height - 40);
        // Bottom-right corner bracket
        ctx.moveTo(width - 60, height - 40); ctx.lineTo(width - 40, height - 40); ctx.lineTo(width - 40, height - 60);
        ctx.stroke();

        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('SYS_ONLINE // 1.0x', 60, 55);
        
        ctx.fillStyle = '#ec4899';
        ctx.textAlign = 'right';
        ctx.fillText('GRID_MATRIX_ACTIVE', width - 60, 55);

        // Center crosshair
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 20, height / 2); ctx.lineTo(width / 2 + 20, height / 2);
        ctx.moveTo(width / 2, height / 2 - 20); ctx.lineTo(width / 2, height / 2 + 20);
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#22d3ee';
        ctx.fillText('FPS 60 // P_B_01', 60, height - 55);
        
        ctx.textAlign = 'right';
        ctx.fillStyle = '#f472b6';
        ctx.fillText('CYBER_AESTHETIC', width - 60, height - 55);
        ctx.restore();
        break;

      case 'vintage_grain':
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width * 0.45, height * 0.30); ctx.lineTo(width * 0.45 + 2, height * 0.30 + 20);
        ctx.moveTo(width * 0.70, height * 0.75); ctx.lineTo(width * 0.70 - 2, height * 0.75 - 15);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(width * 0.58, height * 0.60, 3, 0, 2 * Math.PI);
        ctx.arc(width * 0.12, height * 0.40, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#f97316';
        ctx.font = 'bold 30px monospace';
        ctx.textAlign = 'right';
        ctx.fillText('04.07.26', width - 60, height - 75);
        ctx.restore();
        break;

      case 'subtle_glow':
        ctx.save();
        const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, height);
        glowGrad.addColorStop(0, 'rgba(255, 192, 203, 0.12)');
        glowGrad.addColorStop(1, 'rgba(147, 51, 234, 0.05)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('🌸', width * 0.20, height * 0.25, 55);
        drawEmoji('✨', width * 0.78, height * 0.35, 45);
        drawEmoji('🌸', width * 0.25, height * 0.70, 45);
        drawEmoji('✨', width * 0.85, height * 0.60, 55);
        break;

      case 'indie_kid':
        ctx.save();
        const indieGrad = ctx.createLinearGradient(0, 0, width, height);
        indieGrad.addColorStop(0, 'rgba(34, 211, 238, 0.08)');
        indieGrad.addColorStop(1, 'rgba(234, 179, 8, 0.08)');
        ctx.fillStyle = indieGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('🦋', width * 0.15, height * 0.18, 65);
        drawEmoji('🌈', width * 0.82, height * 0.22, 55);
        drawEmoji('🦋', width * 0.08, height * 0.45, 55);
        drawEmoji('🦋', width * 0.88, height * 0.75, 65);
        drawEmoji('✨', width * 0.18, height * 0.85, 40);
        break;

      case 'polaroid_frame':
        ctx.save();
        ctx.fillStyle = '#ffffff';
        // Left, Right, Top, and thick Bottom border
        ctx.fillRect(0, 0, 32, height);
        ctx.fillRect(width - 32, 0, 32, height);
        ctx.fillRect(0, 0, width, 32);
        ctx.fillRect(0, height - 110, width, 110);
        
        ctx.fillStyle = '#4b5563';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✨ JULY 2026 ✨', width / 2, height - 50);
        ctx.restore();
        break;

      case 'devil_horns':
        ctx.save();
        const devilGrad = ctx.createLinearGradient(0, 0, 0, height);
        devilGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        devilGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        devilGrad.addColorStop(1, 'rgba(239, 68, 68, 0.08)');
        ctx.fillStyle = devilGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('😈', width * 0.34, height * 0.18, 90);
        drawEmoji('😈', width * 0.66, height * 0.18, 90, 180);
        drawEmoji('🔥', width * 0.12, height * 0.85, 45);
        drawEmoji('🔥', width * 0.88, height * 0.85, 45);
        break;

      case 'disco_fever':
        ctx.save();
        ctx.strokeStyle = 'rgba(161, 161, 170, 0.7)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, 120);
        ctx.stroke();
        ctx.restore();
        drawEmoji('🪩', width / 2, 120, 95);
        
        ctx.save();
        const colors = ['rgba(236, 72, 153, 0.3)', 'rgba(34, 211, 238, 0.25)', 'rgba(234, 179, 8, 0.25)', 'rgba(168, 85, 247, 0.3)'];
        const centers = [
          { x: width * 0.15, y: height * 0.30, r: 60 },
          { x: width * 0.82, y: height * 0.40, r: 80 },
          { x: width * 0.22, y: height * 0.65, r: 90 },
          { x: width * 0.75, y: height * 0.75, r: 70 }
        ];
        centers.forEach((c, idx) => {
          const lGrad = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.r);
          lGrad.addColorStop(0, colors[idx]);
          lGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = lGrad;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
          ctx.fill();
        });
        ctx.restore();
        drawEmoji('✨', width * 0.25, height * 0.25, 35);
        drawEmoji('✨', width * 0.72, height * 0.35, 35);
        break;

      case 'pixel_art':
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(30, 20, width - 60, 50);
        ctx.fillRect(30, height - 60, width - 60, 45);
        
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('🔴 1P READY', 50, 52);
        
        ctx.fillStyle = '#fbbf24';
        ctx.textAlign = 'right';
        ctx.fillText('HI-SCORE: 99990', width - 50, 52);
        
        ctx.fillStyle = '#4ade80';
        ctx.textAlign = 'left';
        ctx.fillText('SCORE: 00120', 50, height - 32);
        
        // Draw 3 pixel hearts
        drawEmoji('❤️', width - 110, height - 32, 28);
        drawEmoji('❤️', width - 80, height - 32, 28);
        drawEmoji('❤️', width - 50, height - 32, 28);
        ctx.restore();
        drawEmoji('👾', width / 2, height / 2, 85);
        break;

      case 'butterfly_crown':
        drawEmoji('🦋', width * 0.32, height * 0.15, 45);
        drawEmoji('🦋', width * 0.41, height * 0.11, 55);
        drawEmoji('👑', width / 2, height * 0.09, 75);
        drawEmoji('🦋', width * 0.59, height * 0.11, 55);
        drawEmoji('🦋', width * 0.68, height * 0.15, 45);
        break;

      case 'neon_wings':
        drawEmoji('🪽', 90, height / 2, 140);
        drawEmoji('🪽', width - 90, height / 2, 140, 180);
        
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(width / 2 - 160, height - 70, 320, 35);
        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NEON_WING_SYSTEM // ACTIVE', width / 2, height - 47);
        ctx.restore();
        break;

      case 'raining_money':
        drawEmoji('💸', width * 0.10, height * 0.12, 60, 15);
        drawEmoji('💵', width * 0.28, height * 0.08, 55, -20);
        drawEmoji('💵', width * 0.45, height * 0.14, 60, 5);
        drawEmoji('💸', width * 0.65, height * 0.09, 55, -15);
        drawEmoji('💵', width * 0.82, height * 0.15, 60, 30);
        
        drawEmoji('💸', width * 0.18, height * 0.35, 45, -10);
        drawEmoji('💸', width * 0.85, height * 0.45, 45, 10);
        drawEmoji('💰', width * 0.30, height * 0.80, 45);
        drawEmoji('💰', width * 0.75, height * 0.75, 45);
        break;

      case 'snow_globe':
        ctx.save();
        ctx.fillStyle = 'rgba(96, 165, 250, 0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('❄️', width * 0.15, height * 0.10, 55);
        drawEmoji('❄️', width * 0.80, height * 0.18, 65);
        drawEmoji('🌨️', width * 0.08, height * 0.48, 45);
        drawEmoji('❄️', width * 0.88, height * 0.72, 55);
        drawEmoji('❄️', width * 0.22, height * 0.88, 65);
        drawEmoji('☃️', width * 0.10, height * 0.90, 75);
        break;

      case 'cute_puppy':
        drawEmoji('🐶', width * 0.24, height * 0.15, 110);
        drawEmoji('🐶', width * 0.76, height * 0.15, 110);
        drawEmoji('👃', width / 2, height * 0.52, 55);
        drawEmoji('👅', width / 2, height * 0.57, 65);
        drawEmoji('🐾', width * 0.12, height * 0.88, 45);
        drawEmoji('🐾', width * 0.88, height * 0.88, 45);
        break;

      case 'starry_night':
        ctx.save();
        const nightGrad = ctx.createLinearGradient(0, 0, 0, height);
        nightGrad.addColorStop(0, 'rgba(30, 27, 75, 0.35)');
        nightGrad.addColorStop(1, 'rgba(30, 58, 138, 0.15)');
        ctx.fillStyle = nightGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        drawEmoji('🌙', width * 0.85, height * 0.12, 75);
        drawEmoji('⭐️', width * 0.20, height * 0.20, 35);
        drawEmoji('⭐️', width * 0.40, height * 0.35, 25);
        drawEmoji('⭐️', width * 0.65, height * 0.28, 30);
        drawEmoji('⭐', width * 0.12, height * 0.60, 30);
        drawEmoji('⭐', width * 0.82, height * 0.80, 40);
        break;
    }
    ctx.restore();
  };

  // Capture current video frame to base64
  const captureVideoFrame = (): string => {
    if (!videoRef.current) return '';
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Use natural video sizes to ensure high resolution
    const videoWidth = video.videoWidth || 1280;
    const videoHeight = video.videoHeight || 960;
    
    const videoAspect = videoWidth / videoHeight;
    
    canvas.width = 800;
    canvas.height = 1000;
    const targetAspect = 4 / 5; // 0.8
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Clear with dark background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      
      // Flip horizontally if front-facing camera for natural reflection
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      // Apply funny filter on canvas if present
      const currentFunnyEffect = FUNNY_EFFECTS.find(e => e.id === funnyEffectId);
      if (currentFunnyEffect && currentFunnyEffect.canvasFilter) {
        ctx.filter = currentFunnyEffect.canvasFilter;
      }
      
      let sx = 0;
      let sy = 0;
      let sWidth = videoWidth;
      let sHeight = videoHeight;
      
      if (videoAspect > targetAspect) {
        // video is wider than target aspect, crop left/right
        sWidth = videoHeight * targetAspect;
        sx = (videoWidth - sWidth) / 2;
      } else {
        // video is taller than target aspect, crop top/bottom
        sHeight = videoWidth / targetAspect;
        sy = (videoHeight - sHeight) / 2;
      }
      
      if (lensType === '0.5x') {
        // Draw centered and scaled down to simulate wide lens
        const scaleVal = 0.72;
        const dw = canvas.width * scaleVal;
        const dh = canvas.height * scaleVal;
        const dx = (canvas.width - dw) / 2;
        const dy = (canvas.height - dh) / 2;

        ctx.drawImage(
          video,
          sx, sy, sWidth, sHeight,
          dx, dy, dw, dh
        );
      } else {
        ctx.drawImage(
          video,
          sx, sy, sWidth, sHeight,
          0, 0, canvas.width, canvas.height
        );
      }

      ctx.restore();

      // Apply convex distortion (Cembung) if active
      if (isCembung) {
        applyCembungDistortion(ctx, canvas.width, canvas.height);
      }

      // Apply funny props overlays (drawn on top of the image)
      drawFunnyOverlayToCanvas(ctx, canvas.width, canvas.height, funnyEffectId, lensType === '0.5x');

      // Apply wide-angle lens vignette effect on top of 0.5x shots
      if (lensType === '0.5x') {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, canvas.width * 0.28,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.52
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.7, 'rgba(0,0,0,0.5)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.92)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Circular styling to enhance the wide angle camera feeling
        ctx.strokeStyle = '#18181b';
        ctx.lineWidth = 16;
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
      }

      // Apply cembung vignette on captured canvas
      if (isCembung) {
        ctx.save();
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, canvas.width * 0.25,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.55
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.75, 'rgba(0,0,0,0.4)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.96)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Circular styling/hood
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 48;
        ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

        // Lens glare simulation reflection
        const flareGrad = ctx.createRadialGradient(
          canvas.width * 0.15, canvas.height * 0.15, 10,
          canvas.width * 0.15, canvas.height * 0.15, 120
        );
        flareGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
        flareGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.15, canvas.height * 0.15, 120, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    return canvas.toDataURL('image/jpeg', 0.92);
  };

  // Helper to fetch an Unsplash photo and convert to base64 for simulator
  const convertUrlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const rawImg = new Image();
          rawImg.src = reader.result as string;
          rawImg.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 1000;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const imgAspect = rawImg.width / rawImg.height;
              const targetAspect = 4 / 5;
              let sx = 0, sy = 0, sw = rawImg.width, sh = rawImg.height;
              if (imgAspect > targetAspect) {
                sw = rawImg.height * targetAspect;
                sx = (rawImg.width - sw) / 2;
              } else {
                sh = rawImg.width / targetAspect;
                sy = (rawImg.height - sh) / 2;
              }

              ctx.save();
              // Apply funny filter on canvas if present
              const currentFunnyEffect = FUNNY_EFFECTS.find(e => e.id === funnyEffectId);
              if (currentFunnyEffect && currentFunnyEffect.canvasFilter) {
                ctx.filter = currentFunnyEffect.canvasFilter;
              }

              if (lensType === '0.5x') {
                ctx.fillStyle = '#09090b';
                ctx.fillRect(0, 0, 800, 1000);

                const scaleVal = 0.72;
                const dw = 800 * scaleVal;
                const dh = 1000 * scaleVal;
                const dx = (800 - dw) / 2;
                const dy = (1000 - dh) / 2;

                ctx.drawImage(rawImg, sx, sy, sw, sh, dx, dy, dw, dh);

                const gradient = ctx.createRadialGradient(400, 500, 224, 400, 500, 416);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.7, 'rgba(0,0,0,0.5)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.92)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 800, 1000);

                ctx.strokeStyle = '#18181b';
                ctx.lineWidth = 16;
                ctx.strokeRect(8, 8, 800 - 16, 1000 - 16);
              } else {
                ctx.drawImage(rawImg, sx, sy, sw, sh, 0, 0, 800, 1000);
              }

              // Apply convex distortion (Cembung) if active
              if (isCembung) {
                applyCembungDistortion(ctx, 800, 1000);
              }

              ctx.restore();

              // Apply funny props overlays (drawn on top of the image)
              drawFunnyOverlayToCanvas(ctx, 800, 1000, funnyEffectId, lensType === '0.5x');

              // Apply cembung vignette if active
              if (isCembung) {
                ctx.save();
                const gradient = ctx.createRadialGradient(400, 500, 200, 400, 500, 440);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.75, 'rgba(0,0,0,0.4)');
                gradient.addColorStop(1, 'rgba(0,0,0,0.96)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 800, 1000);

                ctx.strokeStyle = '#000000';
                ctx.lineWidth = 48;
                ctx.strokeRect(24, 24, 800 - 48, 1000 - 48);

                const flareGrad = ctx.createRadialGradient(120, 150, 10, 120, 150, 120);
                flareGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
                flareGrad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = flareGrad;
                ctx.beginPath();
                ctx.arc(120, 150, 120, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
              }

              resolve(canvas.toDataURL('image/jpeg', 0.92));
            } else {
              resolve(reader.result as string);
            }
          };
          rawImg.onerror = () => resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      // In case fetch fails, use fallback canvas colored placeholder
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 65%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Simulated Pic ${capturedCount + 1}`, canvas.width / 2, canvas.height / 2);
      }
      return canvas.toDataURL('image/jpeg');
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-black text-white relative select-none">
      {/* Header Info */}
      <div className="px-5 py-4 flex items-center justify-between z-10 bg-black/60 backdrop-blur-md border-b border-zinc-900 absolute top-0 left-0 right-0">
        <div>
          <h2 className="text-sm font-semibold font-display tracking-tight text-zinc-100">BEV2 <span className="text-pink-400">PHOTOBOX</span></h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">WEST JAKARTA</p>
        </div>
        <button
          onClick={onCancel}
          disabled={isCapturing}
          className="text-xs px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition disabled:opacity-50 cursor-pointer"
        >
          Kembali
        </button>
      </div>

      {/* Main Viewfinder Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        {/* Aspect-ratio restricted viewfinder wrapper */}
        <div
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-300 w-full max-w-[380px]"
          style={{ aspectRatio: '380 / 600' }}
        >
          {/* Active Camera View */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              filter: `${activeFilter.cssFilter !== 'none' ? activeFilter.cssFilter : ''} ${FUNNY_EFFECTS.find(e => e.id === funnyEffectId)?.cssFilter || ''}`.trim() || 'none',
              transform: `${facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)'} ${lensType === '0.5x' ? 'scale(0.72)' : 'scale(1)'} ${isCembung ? 'scale(1.15)' : ''}`.trim(),
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              transformOrigin: 'center center',
            }}
            className={`w-full h-full object-cover ${
              permissionState === 'granted' && !useSimulation ? 'block' : 'hidden'
            }`}
          />

          {/* Simulated Camera View */}
          {useSimulation && (
            <div className="w-full h-full relative bg-zinc-900 flex items-center justify-center overflow-hidden">
              <img
                src={DEMO_PHOTOS[(simulatedPhotoIndex + capturedCount) % DEMO_PHOTOS.length]}
                alt="Simulator Feed"
                style={{
                  filter: `${activeFilter.cssFilter !== 'none' ? activeFilter.cssFilter : ''} ${FUNNY_EFFECTS.find(e => e.id === funnyEffectId)?.cssFilter || ''}`.trim() || 'none',
                  transform: `${lensType === '0.5x' ? 'scale(0.72)' : 'scale(1)'} ${isCembung ? 'scale(1.15)' : ''}`.trim(),
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transformOrigin: 'center center',
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-pink-500/90 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 z-10">
                <Sparkles size={10} /> Simulator Active
              </div>
            </div>
          )}

          {/* Live Funny Effect Overlays */}
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 overflow-hidden"
            style={{
              transform: lensType === '0.5x' ? 'scale(0.72)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
              transformOrigin: 'center center',
            }}
          >
            {renderFunnyOverlayLive()}
          </div>

          {/* 0.5x Lens Curved Vignette & Hood styling */}
          {lensType === '0.5x' && (
            <div className="absolute inset-0 pointer-events-none border-[12px] border-zinc-950/95 rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.92)] z-10 transition-all duration-300" />
          )}

          {/* Cembung (Convex) Spherical Vignette Overlay */}
          {isCembung && (
            <div className="absolute inset-0 pointer-events-none z-10 transition-all duration-300 flex items-center justify-center">
              {/* Outer physical lens barrel border */}
              <div className="absolute inset-0 border-[24px] border-black/90 rounded-3xl shadow-[inset_0_0_120px_rgba(0,0,0,0.98)]" />
              {/* Spherical glass curvature reflection */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.3)_100%)] rounded-3xl mix-blend-screen" />
              {/* Soft white curved lens flare reflection in the top-left */}
              <div className="absolute top-6 left-6 w-16 h-16 bg-white/10 rounded-full blur-md pointer-events-none" />
            </div>
          )}

          {/* Pending State */}
          {permissionState === 'pending' && !useSimulation && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
              <div className="relative flex h-10 w-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-10 w-10 bg-pink-500 items-center justify-center">
                  <Camera size={20} className="text-white" />
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium mt-2">Menghubungkan kamera...</p>
            </div>
          )}

          {/* Denied / Error State */}
          {permissionState === 'denied' && !useSimulation && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-950">
              <AlertTriangle className="text-pink-400 mb-2" size={36} />
              <p className="text-xs font-semibold text-zinc-200">Kamera Tidak Diakses</p>
              <p className="text-[11px] text-zinc-400 mt-1 mb-4 leading-relaxed">
                Izin kamera ditolak. Aktifkan simulator untuk melanjutkan keseruan photobox!
              </p>
              <button
                onClick={() => setUseSimulation(true)}
                className="text-xs bg-pink-500 hover:bg-pink-400 text-white font-semibold px-4 py-2 rounded-xl transition"
              >
                Gunakan Kamera Virtual
              </button>
            </div>
          )}

          {/* Countdown overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
              <div className="text-7xl font-bold font-display text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] scale-110 animate-bounce">
                {countdown}
              </div>
            </div>
          )}

          {/* Flash animation overlay */}
          {isFlash && (
            <div className="absolute inset-0 bg-white z-50 flash-overlay" />
          )}

          {/* Top Floating Overlay inside Viewfinder: Captured mini strip at top center */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex justify-center">
            <div className="flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-zinc-800/80 shadow-lg">
              {(captureMode === 'single' ? [0] : [0, 1, 2, 3]).map((idx) => {
                const pic = capturedList[idx];
                return (
                  <div
                    key={idx}
                    className={`relative rounded-lg border bg-zinc-950 overflow-hidden w-8 transition-all duration-300 ${
                      idx === capturedCount && isCapturing
                        ? 'border-pink-500 scale-105 shadow-sm shadow-pink-500/30'
                        : 'border-zinc-800/80'
                    }`}
                    style={{ aspectRatio: '380 / 600' }}
                  >
                    {pic ? (
                      <img src={pic} alt={`Shot ${idx + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-600 font-mono font-bold">
                        {idx + 1}
                      </div>
                    )}
                    {pic && (
                      <div className="absolute top-0 right-0 bg-pink-500 text-[6px] px-0.5 rounded-bl text-white font-extrabold leading-none">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Right Status / Filter Pill */}
          <div className="absolute top-3 right-3 z-20 pointer-events-auto flex flex-col items-end gap-1.5">
            {isCapturing && (
              <div className="bg-pink-500/95 backdrop-blur-md text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg border border-pink-400/20 flex items-center gap-1 uppercase tracking-wider animate-pulse">
                <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                {capturedCount === (captureMode === 'single' ? 1 : 4) ? 'Done' : `${capturedCount + 1}/${captureMode === 'single' ? 1 : 4}`}
              </div>
            )}
            {activeFilter.id !== 'normal' && (
              <div className="bg-black/70 backdrop-blur-md border border-zinc-800/80 text-zinc-300 text-[8px] px-1.5 py-0.5 rounded-md font-mono flex items-center gap-0.5 shadow-md">
                <Sparkles size={8} className="text-pink-300" />
                {activeFilter.name}
              </div>
            )}
          </div>

          {/* Bottom Floating Control Panel inside Viewfinder */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-14 pb-3.5 px-3 flex flex-col gap-2.5 z-20 pointer-events-auto">
            {/* Minimalist Controls: Timer & Filter */}
            <div className="space-y-2">
              {/* Timer Row */}
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono tracking-widest font-bold uppercase select-none px-1">
                <span className="text-[8px] text-zinc-500">TIMER</span>
                <div className="flex gap-1.5">
                  {[2, 3, 5, 10].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setTimerDuration(duration)}
                      disabled={isCapturing}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        timerDuration === duration
                          ? 'bg-white text-black font-black scale-105 shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {duration}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Filters pill list (Ultra compact) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono tracking-widest font-bold uppercase select-none px-1">
                  <span>FILTERS</span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar snap-x justify-start">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => onFilterChange(filter)}
                      disabled={isCapturing}
                      className={`flex-none snap-start py-0.5 px-2 rounded-full text-[8px] font-bold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                        activeFilter.id === filter.id
                          ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20 font-extrabold'
                          : 'bg-black/50 text-zinc-400 hover:text-zinc-200 hover:bg-black/80'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Funny Effects pill list (Ultra compact) */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono tracking-widest font-bold uppercase select-none px-1">
                  <span>IG EFFECTS</span>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar snap-x justify-start">
                  {FUNNY_EFFECTS.map((effect) => (
                    <button
                      key={effect.id}
                      onClick={() => setFunnyEffectId(effect.id)}
                      disabled={isCapturing}
                      className={`flex-none snap-start py-0.5 px-2.5 rounded-full text-[8px] font-bold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 ${
                        funnyEffectId === effect.id
                          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 text-white shadow-md shadow-pink-500/30 font-black scale-105'
                          : 'bg-black/50 text-zinc-400 hover:text-zinc-200 hover:bg-black/80'
                      }`}
                    >
                      <span>{effect.emoji}</span>
                      <span>{effect.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode selection Segmented Control (Grid 2x2 vs Single Photo) */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono tracking-widest font-bold uppercase select-none px-1">
                  <span>LAYOUT MODE</span>
                </div>
                <div className="flex bg-zinc-950/90 p-0.5 rounded-full border border-zinc-800/80 gap-0.5 shadow-md">
                  <button
                    type="button"
                    disabled={isCapturing}
                    onClick={() => setCaptureMode('grid2x2')}
                    className={`flex-1 py-1 rounded-full text-[8px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 ${
                      captureMode === 'grid2x2'
                        ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20 font-black'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                    }`}
                  >
                    <LayoutGrid size={10} />
                    Grid 2x2
                  </button>
                  <button
                    type="button"
                    disabled={isCapturing}
                    onClick={() => setCaptureMode('single')}
                    className={`flex-1 py-1 rounded-full text-[8px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 ${
                      captureMode === 'single'
                        ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20 font-black'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                    }`}
                  >
                    <User size={10} />
                    Single Foto
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between px-1 pt-2 border-t border-zinc-900/30">
              {/* Flip Camera */}
              <button
                onClick={handleFlipCamera}
                disabled={isCapturing}
                className={`p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all duration-200 active:scale-95 disabled:opacity-30 cursor-pointer ${
                  useSimulation ? 'opacity-20 cursor-not-allowed' : ''
                }`}
                title="Balik Kamera"
              >
                <RefreshCw size={13} />
              </button>

              {/* Shutter Shooting & Lens Select Group */}
              <div className="flex items-center gap-2.5">
                {/* Compact Lens Selector Pill */}
                <div className="flex bg-zinc-950/90 p-0.5 rounded-full border border-zinc-800/80 gap-0.5 shadow-md">
                  <button
                    type="button"
                    onClick={() => setLensType('0.5x')}
                    disabled={isCapturing}
                    className={`w-6 h-6 rounded-full text-[8px] font-black transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-50 ${
                      lensType === '0.5x'
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                    }`}
                  >
                    0.5
                  </button>
                  <button
                    type="button"
                    onClick={() => setLensType('1x')}
                    disabled={isCapturing}
                    className={`w-6 h-6 rounded-full text-[8px] font-black transition-all duration-200 cursor-pointer flex items-center justify-center disabled:opacity-50 ${
                      lensType === '1x'
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'
                    }`}
                  >
                    1x
                  </button>
                </div>

                {/* Shutter Shooting Button */}
                <button
                  onClick={startShootingSequence}
                  disabled={isCapturing}
                  className="relative flex items-center justify-center focus:outline-none disabled:opacity-60 cursor-pointer transition-all duration-300 group"
                >
                  {/* Elegant Outer Ring */}
                  <span className={`absolute w-11 h-11 rounded-full border-2 transition-all duration-300 ${
                    isCapturing ? 'border-pink-500/40 scale-110' : 'border-zinc-500 hover:border-pink-500 group-hover:scale-105'
                  }`} />
                  
                  {/* Minimalist Solid Inner Circle */}
                  <span className={`relative transition-all duration-300 rounded-full flex items-center justify-center shadow-sm ${
                    isCapturing 
                      ? 'w-4 h-4 bg-pink-500 rounded-sm animate-pulse' 
                      : 'w-8 h-8 bg-pink-500 hover:bg-pink-400 active:scale-95 text-white'
                  }`}>
                    {!isCapturing && <Camera size={13} className="text-white stroke-[2.2]" />}
                  </span>
                </button>

                {/* Cembung (Convex) Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsCembung(!isCembung)}
                  disabled={isCapturing}
                  className={`w-8 h-8 rounded-full border transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer disabled:opacity-30 ${
                    isCembung
                      ? 'bg-pink-500 text-white border-pink-400 shadow-sm shadow-pink-500/20'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-white'
                  }`}
                  title={isCembung ? "Matikan Efek Cembung" : "Aktifkan Efek Cembung"}
                >
                  <Disc size={13} className={isCembung ? 'animate-spin duration-3000' : ''} />
                </button>
              </div>

              {/* Simulation Mode Toggle */}
              <button
                onClick={() => {
                  if (isCapturing) return;
                  setUseSimulation((prev) => !prev);
                  setCapturedCount(0);
                  setCapturedList([]);
                }}
                disabled={isCapturing}
                className={`p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-800 transition-all duration-200 active:scale-95 disabled:opacity-30 cursor-pointer ${
                  useSimulation
                    ? 'text-pink-400'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
                title={useSimulation ? "Gunakan Kamera Asli" : "Gunakan Kamera Simulasi"}
              >
                {useSimulation ? <Sparkles size={13} /> : <User size={13} />}
              </button>
            </div>
          </div>
        </div>

        {/* Small Caption below inside the layout */}
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest text-center mt-3 font-semibold select-none">
          {isCapturing 
            ? 'Tersenyumlah! Kamera memotret otomatis' 
            : '4x Otomatis Shoot'}
        </p>
      </div>
    </div>
  );
}

// Helper function to apply convex (cembung) fisheye distortion on canvas
const applyCembungDistortion = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  try {
    const imgData = ctx.getImageData(0, 0, width, height);
    const src = new Uint32Array(imgData.data.buffer);
    const destData = ctx.createImageData(width, height);
    const dest = new Uint32Array(destData.data.buffer);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.75;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxRadius) {
          const normDist = distance / maxRadius;
          const scale = 1.0 - 0.32 * (1.0 - normDist * normDist);
          const sx = Math.round(centerX + dx * scale);
          const sy = Math.round(centerY + dy * scale);

          if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
            dest[y * width + x] = src[sy * width + sx];
          } else {
            dest[y * width + x] = src[y * width + x];
          }
        } else {
          dest[y * width + x] = src[y * width + x];
        }
      }
    }
    ctx.putImageData(destData, 0, 0);
  } catch (err) {
    console.error("Gagal menerapkan efek cembung:", err);
  }
};

