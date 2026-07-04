import React, { useState } from 'react';
import { Camera, Sparkles, Image as ImageIcon, Heart, ArrowRight } from 'lucide-react';
import { Orientation, AppStep, PhotoFilter } from './types';
import { FILTERS, DEMO_PHOTOS } from './constants';
import CameraView from './components/CameraView';
import PhotoboxPreview from './components/PhotoboxPreview';

export default function App() {
  const [step, setStep] = useState<AppStep>('setup');
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<PhotoFilter>(FILTERS[0]);
  
  // Choose to start with a camera
  const handleStartCapture = () => {
    setCapturedPhotos([]);
    setStep('capture');
  };

  // Skip straight to customizer with gorgeous pre-loaded mockup portrait photos
  const handleStartWithDemo = async () => {
    setStep('preview');
    // Preload demo photos
    setCapturedPhotos([]);
    
    // Convert preset Unsplash images into usable high-res canvases or just use the direct URLs
    const base64Photos = await Promise.all(
      DEMO_PHOTOS.map(async (url) => {
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          return new Promise<string>((resolve) => {
            const r = new FileReader();
            r.onloadend = () => resolve(r.result as string);
            r.readAsDataURL(blob);
          });
        } catch {
          return url; // fallback to raw URL
        }
      })
    );
    setCapturedPhotos(base64Photos);
  };

  const handlePhotosCaptured = (photos: string[]) => {
    setCapturedPhotos(photos);
    setStep('preview');
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setStep('setup');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex items-center justify-center p-0 md:p-8 relative selection:bg-pink-400 selection:text-zinc-950 overflow-hidden">
      
      {/* Visual Accents for Desktop Viewport */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        <div className="text-[140px] font-black text-white/5 leading-none select-none font-display">SNAP<br/>SHOT</div>
      </div>
      <div className="absolute right-16 bottom-16 hidden xl:block text-right pointer-events-none select-none">
        <p className="text-zinc-800 text-sm font-mono">v2.0.4 BUILD_STABLE</p>
        <p className="text-zinc-600 font-bold tracking-tighter text-sm font-display">PRO PHOTO STATION</p>
      </div>

      {/* App Container (Phone Frame Mockup) */}
      <div className="w-full max-w-md md:w-[420px] md:h-[820px] bg-black rounded-none md:rounded-[50px] border-0 md:border-[12px] border-zinc-800 shadow-2xl flex flex-col relative overflow-hidden h-screen md:min-h-0">
        
        {/* Step 1: Welcome Setup View */}
        {step === 'setup' && (
          <div className="flex-1 flex flex-col justify-between pt-12 pb-8 px-6 overflow-y-auto no-scrollbar">
            
            {/* Top Branding Header */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-bold tracking-wider uppercase rounded-full mb-4">
                <Sparkles size={12} /> Mobile Photobox Premium
              </div>
              <h1 className="text-3xl font-extrabold font-display tracking-tighter text-zinc-100">
                BEV2 <span className="text-pink-400">PHOTOBOX</span>
              </h1>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto mt-2.5 leading-relaxed">
                Abadikan momen terbaikmu langsung dari HP dengan filter estetik dan cetakan grid 2x2 berkualitas tinggi.
              </p>
            </div>

            {/* Interactive Feature Highlights Card */}
            <div className="my-6 space-y-4">
              {/* Specs & Capabilities list */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-4 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-pink-400 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">01</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">Kamera Interaktif Langsung</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Ambil 4 foto otomatis berturut-turut (Grid 2x2) dengan timer mundur.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-pink-400 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">02</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">7 Pilihan Efek Klasik</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Retro Warm, Noir Classic, Cyber Neon, Summer Fade, Cool Breeze, dan lainnya.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-zinc-850 border border-zinc-800 flex items-center justify-center text-pink-400 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">03</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">5 Desain Bingkai Estetik</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Minimalist White, Midnight Obsidian, Y2K Sparkle, Analog Kodak, dan Pastel Dream.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="space-y-3 w-full mt-auto">
              {/* Option A: Start Camera */}
              <button
                onClick={handleStartCapture}
                className="w-full py-4 px-6 bg-zinc-100 text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer"
              >
                <Camera size={18} className="stroke-[2.5]" />
                <span className="font-display uppercase tracking-wider text-sm">Ambil Foto Sekarang</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </button>

              {/* Option B: Use Demo Photos (Brilliant fallback / fast edit tool) */}
              <button
                onClick={handleStartWithDemo}
                className="w-full py-3 px-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-2xl flex items-center justify-center gap-2 transition duration-200 active:scale-95 border border-zinc-800/80 cursor-pointer"
              >
                <ImageIcon size={16} className="text-zinc-400" />
                <span className="text-xs tracking-wide">Coba Instan dengan Foto Demo</span>
              </button>

              {/* Footer Credits */}
              <div className="text-center pt-2">
                <span className="text-[10px] text-zinc-600 font-medium tracking-wide flex items-center justify-center gap-1">
                  Made with <Heart size={10} className="fill-pink-400 text-pink-400" /> for smartphone screen only
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Step 2: Camera Capture Interface */}
        {step === 'capture' && (
          <CameraView
            orientation={orientation}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onPhotosCaptured={handlePhotosCaptured}
            onCancel={() => setStep('setup')}
          />
        )}

        {/* Step 3: Edit, Customization and Download Screen */}
        {step === 'preview' && (
          <PhotoboxPreview
            photos={capturedPhotos}
            initialOrientation={orientation}
            initialFilter={activeFilter}
            onRetake={handleRetake}
          />
        )}

        {/* Bottom Notch Accent (Simulates Premium device mockup bar on desktop frames) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-800 rounded-full hidden md:block"></div>
      </div>
    </div>
  );
}

