import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Sparkles, User, AlertTriangle, Timer } from 'lucide-react';
import { Orientation, PhotoFilter } from '../types';
import { playCountdownBeep, playShutterSound, playSuccessChime } from '../utils/audio';
import { DEMO_PHOTOS, FILTERS } from '../constants';

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
  const [capturedCount, setCapturedCount] = useState<number>(0);
  const [capturedList, setCapturedList] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [timerDuration, setTimerDuration] = useState<number>(3);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);
  const [simulatedPhotoIndex, setSimulatedPhotoIndex] = useState<number>(0);

  // Initialize camera
  useEffect(() => {
    if (useSimulation) {
      setPermissionState('granted');
      return;
    }

    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        setPermissionState('pending');
        const constraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = mediaStream;
        setStream(mediaStream);
        setPermissionState('granted');

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Gagal mengakses kamera:', err);
        setPermissionState('denied');
        // Fallback to simulation mode automatically
        setUseSimulation(true);
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, useSimulation]);

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

    for (let shot = 0; shot < 4; shot++) {
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
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    // Play final completion chime
    playSuccessChime();
    
    // Pass final set back
    setTimeout(() => {
      onPhotosCaptured(photos);
      setIsCapturing(false);
    }, 500);
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
      // Flip horizontally if front-facing camera for natural reflection
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
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
      
      ctx.drawImage(
        video,
        sx, sy, sWidth, sHeight,
        0, 0, canvas.width, canvas.height
      );
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
              ctx.drawImage(rawImg, sx, sy, sw, sh, 0, 0, 800, 1000);
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
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">Mode: Estetik (4:5)</p>
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
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all duration-300 aspect-[4/5] w-full max-w-[380px]"
        >
          {/* Active Camera View */}
          {permissionState === 'granted' && !useSimulation && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ filter: activeFilter.cssFilter }}
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
            />
          )}

          {/* Simulated Camera View */}
          {useSimulation && (
            <div className="w-full h-full relative bg-zinc-900 flex items-center justify-center">
              <img
                src={DEMO_PHOTOS[(simulatedPhotoIndex + capturedCount) % DEMO_PHOTOS.length]}
                alt="Simulator Feed"
                style={{ filter: activeFilter.cssFilter }}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-2 left-2 bg-pink-500/90 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={10} /> Simulator Active
              </div>
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

          {/* Top Floating Overlay inside Viewfinder: Captured mini strip & progress */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
            <div className="flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-xl border border-zinc-800/80 shadow-lg">
              {[0, 1, 2, 3].map((idx) => {
                const pic = capturedList[idx];
                return (
                  <div
                    key={idx}
                    className={`relative rounded-lg border bg-zinc-950 overflow-hidden aspect-[4/5] w-8 transition-all duration-300 ${
                      idx === capturedCount && isCapturing
                        ? 'border-pink-500 scale-105 shadow-sm shadow-pink-500/30'
                        : 'border-zinc-800/80'
                    }`}
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

            {/* Right Status / Filter Pill */}
            <div className="flex flex-col items-end gap-1.5">
              {isCapturing && (
                <div className="bg-pink-500/95 backdrop-blur-md text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg border border-pink-400/20 flex items-center gap-1 uppercase tracking-wider animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                  {capturedCount === 4 ? 'Done' : `${capturedCount + 1}/4`}
                </div>
              )}
              {activeFilter.id !== 'normal' && (
                <div className="bg-black/70 backdrop-blur-md border border-zinc-800/80 text-zinc-300 text-[8px] px-1.5 py-0.5 rounded-md font-mono flex items-center gap-0.5 shadow-md">
                  <Sparkles size={8} className="text-pink-300" />
                  {activeFilter.name}
                </div>
              )}
            </div>
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
              <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar snap-x justify-start">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter)}
                    disabled={isCapturing}
                    className={`flex-none snap-start py-0.5 px-2 rounded-full text-[8px] font-bold transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
                      activeFilter.id === filter.id
                        ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/20'
                        : 'bg-black/50 text-zinc-400 hover:text-zinc-200 hover:bg-black/80'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
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

