import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export type MuteMode = 'full' | 'range';
export type EngineStage = 'loading' | 'probing' | 'processing' | 'finalizing';

export interface MuteVideoOptions {
  file: File;
  mode: MuteMode;
  startSec?: number;
  endSec?: number;
  keepSilentTrack?: boolean;
  durationSec?: number | null;
  onStage?: (stage: EngineStage) => void;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export interface MuteVideoResult {
  blob: Blob;
  url: string;
  mimeType: string;
  filename: string;
  originalBytes: number;
  outputBytes: number;
  bytesSaved: number;
  hadAudio: boolean;
  usedLosslessCopy: boolean;
  processingMs: number;
  mode: MuteMode;
  mutedRange?: { startSec: number; endSec: number };
}

const CORE_VERSION = '0.12.10';
const LOCAL_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/ffmpeg`;
const CORE_BASES = [
  LOCAL_BASE,
  `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/esm`,
  `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/esm`,
];

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;
let jobCounter = 0;

const SUPPORTED_VIDEO_EXT = /\.(mp4|m4v|webm|mov|mkv|avi|ogv|3gp|flv|wmv)$/i;

export function isSupportedVideoFile(file: File): boolean {
  if (file.type.startsWith('video/')) {
    return true;
  }
  return SUPPORTED_VIDEO_EXT.test(file.name);
}

export function formatDuration(seconds: number | null | undefined, showTenths = false): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) {
    return showTenths ? '00:00.0' : '00:00';
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secsWhole = Math.floor(seconds % 60);
  const tenths = Math.floor((seconds - Math.floor(seconds)) * 10);

  const mm = String(mins).padStart(2, '0');
  const ss = String(secsWhole).padStart(2, '0');
  const suffix = showTenths ? `.${tenths}` : '';

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${mm}:${ss}${suffix}`;
  }
  return `${mm}:${ss}${suffix}`;
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

function getSafeExtension(filename: string): string {
  const match = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? `.${match[1]}` : '.mp4';
}

function getMimeTypeForExt(ext: string): string {
  switch (ext.toLowerCase()) {
    case '.webm':
      return 'video/webm';
    case '.mov':
      return 'video/quicktime';
    case '.mkv':
      return 'video/x-matroska';
    case '.avi':
      return 'video/x-msvideo';
    case '.ogv':
      return 'video/ogg';
    default:
      return 'video/mp4';
  }
}

function buildMutedFilename(originalName: string, outputExt: string): string {
  const cleanExt = outputExt.startsWith('.') ? outputExt.slice(1) : outputExt;
  const baseName = originalName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]+/g, '_') || 'video';
  return `${baseName}-muted.${cleanExt}`;
}

async function ensureFFmpegLoaded(): Promise<FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) {
    return ffmpegInstance;
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    let lastError: unknown = null;

    for (const baseURL of CORE_BASES) {
      const instance = new FFmpeg();
      try {
        const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
        const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
        await instance.load({ coreURL, wasmURL });
        ffmpegInstance = instance;
        return instance;
      } catch (err) {
        lastError = err;
        try {
          instance.terminate();
        } catch {
          // ignore cleanup failure
        }
      }
    }

    loadPromise = null;
    throw lastError instanceof Error
      ? lastError
      : new Error('Failed to load FFmpeg WebAssembly core.');
  })();

  return loadPromise;
}

export function terminateFFmpeg(): void {
  loadPromise = null;
  if (ffmpegInstance) {
    try {
      ffmpegInstance.terminate();
    } catch {
      // ignore
    }
    ffmpegInstance = null;
  }
}

async function safeDelete(ffmpeg: FFmpeg, path: string): Promise<void> {
  try {
    await ffmpeg.deleteFile(path);
  } catch {
    // ignore missing file
  }
}

/**
 * Probes an input file in FFmpeg WASM to detect audio presence and media duration.
 */
async function probeInputMedia(
  ffmpeg: FFmpeg,
  inputName: string
): Promise<{ hasAudio: boolean; durationSec: number | null }> {
  const probeLogs: string[] = [];
  const captureLog = ({ message }: { type: string; message: string }) => {
    probeLogs.push(message);
  };
  ffmpeg.on('log', captureLog);
  try {
    await ffmpeg.exec(['-hide_banner', '-i', inputName]);
  } catch {
    // `-i` without an output exits non-zero intentionally after printing stream headers
  } finally {
    ffmpeg.off('log', captureLog);
  }

  const headerDump = probeLogs.join('\n');
  const hasAudio = /Input #0/i.test(headerDump)
    ? /Stream #\d+:\d+[^:]*:\s*Audio:/i.test(headerDump)
    : true;

  const durMatch =
    headerDump.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i) ||
    headerDump.match(/DURATION\s*:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/i);
  let parsedDuration: number | null = null;
  if (durMatch) {
    const total = Number(durMatch[1]) * 3600 + Number(durMatch[2]) * 60 + Number(durMatch[3]);
    if (Number.isFinite(total) && total > 0) {
      parsedDuration = total;
    }
  }

  return { hasAudio, durationSec: parsedDuration };
}

export async function processMuteVideo(options: MuteVideoOptions): Promise<MuteVideoResult> {
  const {
    file,
    mode,
    startSec = 0,
    endSec = 0,
    keepSilentTrack = false,
    durationSec = null,
    onStage,
    onProgress,
    signal,
  } = options;

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const startedAt = performance.now();
  onStage?.('loading');
  onProgress?.(4);
  const ffmpeg = await ensureFFmpegLoaded();

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const jobId = ++jobCounter;
  const inputExt = getSafeExtension(file.name);
  const inputName = `in_${jobId}${inputExt}`;
  const outMp4 = `out_${jobId}.mp4`;
  const outWebm = `out_${jobId}.webm`;

  let actualOutputFile = outMp4;
  let actualOutputExt = '.mp4';
  let usedLosslessCopy = true;

  const logs: string[] = [];
  const logHandler = ({ message }: { type: string; message: string }) => {
    logs.push(message);
    if (logs.length > 80) logs.shift();
  };

  const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
    let pct = 0;
    if (durationSec && durationSec > 0 && time > 0) {
      pct = Math.round(((time / 1_000_000) / durationSec) * 100);
    } else if (Number.isFinite(progress) && progress > 0) {
      pct = Math.round(progress * 100);
    }
    const bounded = Math.min(97, Math.max(12, pct));
    onProgress?.(bounded);
  };

  const onAbort = () => {
    terminateFFmpeg();
  };
  signal?.addEventListener('abort', onAbort, { once: true });

  ffmpeg.on('log', logHandler);
  ffmpeg.on('progress', progressHandler);

  try {
    onStage?.('probing');
    onProgress?.(10);

    const bytes = await fetchFile(file);
    await ffmpeg.writeFile(inputName, bytes);

    const { hasAudio: hadAudio, durationSec: probedDurationSec } = await probeInputMedia(
      ffmpeg,
      inputName
    );

    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    onStage?.('processing');
    onProgress?.(18);

    let exitCode = 1;
    let appliedRange: { startSec: number; endSec: number } | undefined;

    if (mode === 'full' && !keepSilentTrack) {
      // Mode 1: Instant 1-second lossless stream strip (`-c copy -an`)
      exitCode = await ffmpeg.exec([
        '-i',
        inputName,
        '-c',
        'copy',
        '-an',
        '-movflags',
        '+faststart',
        outMp4,
      ]);

      // Fallback for WebM/VP8/Opus streams that cannot copy directly into MP4
      if (exitCode !== 0 && inputExt === '.webm') {
        await safeDelete(ffmpeg, outMp4);
        logs.length = 0;
        exitCode = await ffmpeg.exec(['-i', inputName, '-c', 'copy', '-an', outWebm]);
        if (exitCode === 0) {
          actualOutputFile = outWebm;
          actualOutputExt = '.webm';
        }
      }

      // Final fallback if container codec requires video transcode into MP4
      if (exitCode !== 0) {
        await safeDelete(ffmpeg, outMp4);
        await safeDelete(ffmpeg, outWebm);
        logs.length = 0;
        usedLosslessCopy = false;
        exitCode = await ffmpeg.exec([
          '-i',
          inputName,
          '-c:v',
          'libx264',
          '-preset',
          'ultrafast',
          '-crf',
          '20',
          '-pix_fmt',
          'yuv420p',
          '-an',
          '-movflags',
          '+faststart',
          outMp4,
        ]);
        actualOutputFile = outMp4;
        actualOutputExt = '.mp4';
      }
    } else if (mode === 'full' && keepSilentTrack) {
      // Keep a silent AAC audio container while preserving 100% original video via `-c:v copy`
      exitCode = await ffmpeg.exec([
        '-f',
        'lavfi',
        '-i',
        'anullsrc=channel_layout=stereo:sample_rate=44100',
        '-i',
        inputName,
        '-map',
        '1:v:0',
        '-map',
        '0:a:0',
        '-c:v',
        'copy',
        '-c:a',
        'aac',
        '-b:a',
        '64k',
        '-shortest',
        '-movflags',
        '+faststart',
        outMp4,
      ]);

      if (exitCode !== 0) {
        await safeDelete(ffmpeg, outMp4);
        logs.length = 0;
        usedLosslessCopy = false;
        exitCode = await ffmpeg.exec([
          '-f',
          'lavfi',
          '-i',
          'anullsrc=channel_layout=stereo:sample_rate=44100',
          '-i',
          inputName,
          '-map',
          '1:v:0',
          '-map',
          '0:a:0',
          '-c:v',
          'libx264',
          '-preset',
          'ultrafast',
          '-crf',
          '20',
          '-pix_fmt',
          'yuv420p',
          '-c:a',
          'aac',
          '-b:a',
          '64k',
          '-shortest',
          '-movflags',
          '+faststart',
          outMp4,
        ]);
      }
    } else {
      // Mode 2: Custom Time-Range Mute (`asetpts=N/SR/TB,volume=enable='between(t,start,end)':volume=0` + `-c:v copy`)
      const effectiveDuration =
        durationSec && Number.isFinite(durationSec) && durationSec > 0
          ? durationSec
          : probedDurationSec;
      let safeStart = Math.max(0, startSec);
      let safeEnd = Math.max(safeStart + 0.1, endSec);
      if (effectiveDuration && safeStart >= effectiveDuration) {
        safeStart = Number((effectiveDuration * 0.25).toFixed(2));
        safeEnd = Number((effectiveDuration * 0.7).toFixed(2));
      }
      if (effectiveDuration && safeEnd > effectiveDuration) {
        safeEnd = Number(effectiveDuration.toFixed(2));
      }
      appliedRange = { startSec: safeStart, endSec: safeEnd };
      const volumeFilter = `asetpts=N/SR/TB,volume=enable='between(t,${safeStart.toFixed(3)},${safeEnd.toFixed(3)})':volume=0`;

      if (hadAudio) {
        exitCode = await ffmpeg.exec([
          '-i',
          inputName,
          '-map',
          '0:v:0',
          '-map',
          '0:a:0',
          '-af',
          volumeFilter,
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-b:a',
          '128k',
          '-movflags',
          '+faststart',
          outMp4,
        ]);

        if (exitCode !== 0 && inputExt === '.webm') {
          await safeDelete(ffmpeg, outMp4);
          logs.length = 0;
          exitCode = await ffmpeg.exec([
            '-i',
            inputName,
            '-map',
            '0:v:0',
            '-map',
            '0:a:0',
            '-af',
            volumeFilter,
            '-c:v',
            'copy',
            '-c:a',
            'libopus',
            outWebm,
          ]);
          if (exitCode === 0) {
            actualOutputFile = outWebm;
            actualOutputExt = '.webm';
          }
        }

        if (exitCode !== 0) {
          await safeDelete(ffmpeg, outMp4);
          await safeDelete(ffmpeg, outWebm);
          logs.length = 0;
          usedLosslessCopy = false;
          exitCode = await ffmpeg.exec([
            '-i',
            inputName,
            '-map',
            '0:v:0',
            '-map',
            '0:a:0',
            '-af',
            volumeFilter,
            '-c:v',
            'libx264',
            '-preset',
            'ultrafast',
            '-crf',
            '20',
            '-pix_fmt',
            'yuv420p',
            '-c:a',
            'aac',
            '-b:a',
            '128k',
            '-movflags',
            '+faststart',
            outMp4,
          ]);
          actualOutputFile = outMp4;
          actualOutputExt = '.mp4';
        }
      } else if (keepSilentTrack) {
        exitCode = await ffmpeg.exec([
          '-f',
          'lavfi',
          '-i',
          'anullsrc=channel_layout=stereo:sample_rate=44100',
          '-i',
          inputName,
          '-map',
          '1:v:0',
          '-map',
          '0:a:0',
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          '-b:a',
          '64k',
          '-shortest',
          '-movflags',
          '+faststart',
          outMp4,
        ]);
      } else {
        // Source had no audio stream at all; perform clean lossless copy
        exitCode = await ffmpeg.exec([
          '-i',
          inputName,
          '-c',
          'copy',
          '-an',
          '-movflags',
          '+faststart',
          outMp4,
        ]);
        if (exitCode !== 0 && inputExt === '.webm') {
          await safeDelete(ffmpeg, outMp4);
          exitCode = await ffmpeg.exec(['-i', inputName, '-c', 'copy', '-an', outWebm]);
          if (exitCode === 0) {
            actualOutputFile = outWebm;
            actualOutputExt = '.webm';
          }
        }
      }
    }

    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    if (exitCode !== 0) {
      const tail = logs.slice(-6).join(' | ');
      throw new Error(`FFmpeg exited with code ${exitCode}${tail ? `: ${tail}` : ''}`);
    }

    onStage?.('finalizing');
    onProgress?.(98);

    const data = await ffmpeg.readFile(actualOutputFile);
    if (!(data instanceof Uint8Array) || data.byteLength === 0) {
      throw new Error('FFmpeg produced an empty output file.');
    }

    const mimeType = getMimeTypeForExt(actualOutputExt);
    const copyBytes = new Uint8Array(data.byteLength);
    copyBytes.set(data);
    const blob = new Blob([copyBytes.buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);

    onProgress?.(100);

    const outputBytes = blob.size;
    const originalBytes = file.size;
    const bytesSaved = Math.max(0, originalBytes - outputBytes);

    return {
      blob,
      url,
      mimeType,
      filename: buildMutedFilename(file.name, actualOutputExt),
      originalBytes,
      outputBytes,
      bytesSaved,
      hadAudio,
      usedLosslessCopy,
      processingMs: Math.round(performance.now() - startedAt),
      mode,
      mutedRange: appliedRange,
    };
  } finally {
    signal?.removeEventListener('abort', onAbort);
    ffmpeg.off('log', logHandler);
    ffmpeg.off('progress', progressHandler);
    if (ffmpegInstance && ffmpegInstance.loaded) {
      await safeDelete(ffmpegInstance, inputName);
      await safeDelete(ffmpegInstance, outMp4);
      await safeDelete(ffmpegInstance, outWebm);
    }
  }
}

/**
 * Generates an in-browser 4-second sample video containing real audible tones
 * so users can test Full Mute and Time-Section Mute immediately with zero uploads.
 * Prefers a seekable faststart MP4 via FFmpeg WASM, with MediaRecorder fallback.
 */
export async function createSampleVideoWithAudio(): Promise<File> {
  try {
    const ffmpeg = await ensureFFmpegLoaded();
    const outName = `sample_gen_${++jobCounter}.mp4`;
    const exitCode = await ffmpeg.exec([
      '-f',
      'lavfi',
      '-i',
      'testsrc=duration=4:size=640x360:rate=24',
      '-f',
      'lavfi',
      '-i',
      'sine=frequency=440:beep_factor=2:duration=4',
      '-c:v',
      'libx264',
      '-preset',
      'ultrafast',
      '-pix_fmt',
      'yuv420p',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
      outName,
    ]);

    if (exitCode === 0) {
      const raw = await ffmpeg.readFile(outName);
      await safeDelete(ffmpeg, outName);
      if (raw instanceof Uint8Array && raw.byteLength > 0) {
        const bytes = new Uint8Array(raw.byteLength);
        bytes.set(raw);
        const blob = new Blob([bytes.buffer], { type: 'video/mp4' });
        const sampleFile = new File([blob], 'sample-audio-clip.mp4', { type: 'video/mp4' });
        (sampleFile as File & { knownDurationSec?: number }).knownDurationSec = 4;
        return sampleFile;
      }
    }
    await safeDelete(ffmpeg, outName);
  } catch {
    // Fall back to Canvas + MediaRecorder below if WASM sample generation fails
  }

  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  const videoStream = canvas.captureStream(30);
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  let audioCtx: AudioContext | null = null;
  let combinedStream = videoStream;

  if (AudioCtx) {
    try {
      audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      const dest = audioCtx.createMediaStreamDestination();
      const gain = audioCtx.createGain();
      gain.gain.value = 0.14;
      gain.connect(dest);

      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.setValueAtTime(440, now + 0.9);
      osc.frequency.setValueAtTime(523.25, now + 1.8);
      osc.frequency.setValueAtTime(392, now + 2.7);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 4.1);

      combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);
    } catch {
      combinedStream = videoStream;
    }
  }

  const candidateTypes = [
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp9,opus',
    'video/webm',
    'video/mp4',
  ];
  const selectedMime = candidateTypes.find((type) => MediaRecorder.isTypeSupported(type)) || '';
  const recorder = selectedMime
    ? new MediaRecorder(combinedStream, { mimeType: selectedMime })
    : new MediaRecorder(combinedStream);

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  const durationMs = 4000;
  const startTime = performance.now();

  const stopPromise = new Promise<File>((resolve, reject) => {
    recorder.onstop = () => {
      try {
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.close().catch(() => undefined);
        }
        const finalMime = recorder.mimeType || 'video/webm';
        const ext = finalMime.includes('mp4') ? 'mp4' : 'webm';
        const blob = new Blob(chunks, { type: finalMime });
        const sampleFile = new File([blob], `sample-audio-clip.${ext}`, { type: finalMime });
        (sampleFile as File & { knownDurationSec?: number }).knownDurationSec = 4;
        resolve(sampleFile);
      } catch (err) {
        reject(err);
      }
    };
    recorder.onerror = () => reject(new Error('Sample recording failed'));
  });

  recorder.start(250);

  const drawFrame = () => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(1, elapsed / durationMs);

    ctx.fillStyle = '#FBF7F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#D9E4DD';
    ctx.fillRect(28, 28, canvas.width - 56, canvas.height - 56);

    ctx.strokeStyle = '#CDC9C3';
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Animated soundwave bars in sample clip
    const barCount = 9;
    const barWidth = 16;
    const gap = 14;
    const totalWidth = barCount * barWidth + (barCount - 1) * gap;
    const startX = (canvas.width - totalWidth) / 2;

    for (let i = 0; i < barCount; i++) {
      const wave = Math.abs(Math.sin(elapsed * 0.008 + i * 0.7));
      const h = 24 + wave * 84;
      const x = startX + i * (barWidth + gap);
      const y = canvas.height / 2 - h / 2 - 12;
      ctx.fillStyle = '#555555';
      ctx.fillRect(x, y, barWidth, h);
    }

    ctx.fillStyle = '#555555';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`MuteVideo Sample • ${(elapsed / 1000).toFixed(1)}s`, canvas.width / 2, canvas.height - 58);

    // Progress bar at bottom
    ctx.fillStyle = '#CDC9C3';
    ctx.fillRect(80, canvas.height - 42, canvas.width - 160, 8);
    ctx.fillStyle = '#555555';
    ctx.fillRect(80, canvas.height - 42, (canvas.width - 160) * progress, 8);

    if (elapsed < durationMs) {
      requestAnimationFrame(drawFrame);
    } else if (recorder.state !== 'inactive') {
      recorder.stop();
    }
  };

  requestAnimationFrame(drawFrame);
  return stopPromise;
}
