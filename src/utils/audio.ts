// Synthesize sound effects using Web Audio API so we don't need any external audio assets.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a simple synthetic beep for the countdown timer
 */
export function playCountdownBeep(highPitch: boolean = false) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(highPitch ? 1200 : 800, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (error) {
    console.warn('Audio feedback failed:', error);
  }
}

/**
 * Play a camera shutter click sound
 */
export function playShutterSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.15; // 0.15 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill buffer with white noise for the mechanical click texture
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it sound like a shutter click
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);
    filter.Q.setValueAtTime(2.0, ctx.currentTime);

    // Dynamic volume envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Add a quick sine tone underneath for the mechanical "mirror slap" body
    const sineOsc = ctx.createOscillator();
    const sineGain = ctx.createGain();
    sineOsc.type = 'triangle';
    sineOsc.frequency.setValueAtTime(150, ctx.currentTime);
    sineOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

    sineGain.gain.setValueAtTime(0.25, ctx.currentTime);
    sineGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    sineOsc.connect(sineGain);
    sineGain.connect(ctx.destination);

    noise.start();
    sineOsc.start();
    
    noise.stop(ctx.currentTime + 0.15);
    sineOsc.stop(ctx.currentTime + 0.08);
  } catch (error) {
    console.warn('Audio shutter failed:', error);
  }
}

/**
 * Play a success chime when the photo grid is ready
 */
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const playNote = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      
      osc.start(start);
      osc.stop(start + duration);
    };

    // Delightful arpeggio
    playNote(523.25, now, 0.2); // C5
    playNote(659.25, now + 0.08, 0.2); // E5
    playNote(783.99, now + 0.16, 0.2); // G5
    playNote(1046.50, now + 0.24, 0.3); // C6
  } catch (error) {
    console.warn('Audio success chime failed:', error);
  }
}
