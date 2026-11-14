import { useEffect, useRef, useState } from 'preact/hooks';
import type { TargetedDragEvent, TargetedEvent } from 'preact';
import type { UITranslations } from '../i18n/ui';
import {
  createSampleVideoWithAudio,
  formatDuration,
  formatFileSize,
  isSupportedVideoFile,
  processMuteVideo,
  type EngineStage,
  type MuteMode,
  type MuteVideoResult,
} from '../lib/ffmpegEngine';

type Step = 'dropzone' | 'controls' | 'processing' | 'result';

interface Props {
  t: UITranslations['workspace'];
}

export default function MuteVideoWorkspace({ t }: Props) {
  const [step, setStep] = useState<Step>('dropzone');
  const [mode, setMode] = useState<MuteMode>('full');
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [durationSec, setDurationSec] = useState<number>(10);
  const [startSec, setStartSec] = useState<number>(0);
  const [endSec, setEndSec] = useState<number>(5);
  const [keepSilentTrack, setKeepSilentTrack] = useState<boolean>(false);
  const [previewMuted, setPreviewMuted] = useState<boolean>(false);
  const [playheadSec, setPlayheadSec] = useState<number>(0);
  const [activeDrag, setActiveDrag] = useState<'start' | 'end' | 'move' | null>(null);

  const [stage, setStage] = useState<EngineStage>('loading');
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<MuteVideoResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const timelineBarRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const sourceUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  const resolvingDurationRef = useRef<boolean>(false);
  const dragStateRef = useRef<{
    mode: 'start' | 'end' | 'move' | null;
    grabSec: number;
    initStart: number;
    initEnd: number;
  }>({ mode: null, grabSec: 0, initStart: 0, initEnd: 0 });

  sourceUrlRef.current = sourceUrl;
  resultUrlRef.current = result?.url ?? null;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const syncPreviewMuteState = (videoEl: HTMLVideoElement | null) => {
    if (!videoEl || resolvingDurationRef.current) return;
    if (previewMuted) {
      videoEl.muted = true;
      return;
    }
    if (mode === 'range') {
      const current = videoEl.currentTime;
      videoEl.muted = current >= startSec && current <= endSec;
      return;
    }
    videoEl.muted = false;
  };

  useEffect(() => {
    if (step === 'controls') {
      syncPreviewMuteState(previewVideoRef.current);
    }
  }, [step, previewMuted, mode, startSec, endSec]);

  useEffect(() => {
    if (step !== 'controls') return;
    const timer = window.setInterval(() => {
      const el = previewVideoRef.current;
      if (!el || resolvingDurationRef.current) return;
      const nextTime = Number(el.currentTime.toFixed(2));
      setPlayheadSec((prev) => (prev === nextTime ? prev : nextTime));
      syncPreviewMuteState(el);
    }, 50);
    return () => window.clearInterval(timer);
  }, [step, previewMuted, mode, startSec, endSec]);

  const applyDetectedDuration = (dur: number) => {
    const cleanDur = Math.max(0.5, Number(dur.toFixed(1)));
    const defaultStart = Number((cleanDur * 0.25).toFixed(1));
    const defaultEnd = Number(
      Math.min(cleanDur, Math.max(defaultStart + 0.2, cleanDur * 0.7)).toFixed(1)
    );
    setDurationSec(cleanDur);
    setStartSec(defaultStart);
    setEndSec(defaultEnd);
  };

  const loadSelectedFile = (nextFile: File) => {
    if (!isSupportedVideoFile(nextFile)) {
      setErrorMsg(t.errors.unsupportedFile);
      return;
    }

    if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);

    resolvingDurationRef.current = false;
    const nextUrl = URL.createObjectURL(nextFile);
    setErrorMsg(null);
    setResult(null);
    setFile(nextFile);
    setSourceUrl(nextUrl);
    setMode('full');
    setPreviewMuted(false);
    setPlayheadSec(0);

    const knownDur = (nextFile as File & { knownDurationSec?: number }).knownDurationSec;
    if (knownDur && Number.isFinite(knownDur) && knownDur > 0) {
      applyDetectedDuration(knownDur);
    } else {
      setDurationSec(10);
      setStartSec(2.0);
      setEndSec(6.5);
    }
    setStep('controls');
  };

  const handleFileInputChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
    const selected = e.currentTarget.files?.[0];
    if (selected) {
      loadSelectedFile(selected);
    }
    e.currentTarget.value = '';
  };

  const handleDrop = (e: TargetedDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) {
      loadSelectedFile(dropped);
    }
  };

  const handleDragOver = (e: TargetedDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: TargetedDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleTrySample = async () => {
    if (isGeneratingSample) return;
    setErrorMsg(null);
    setIsGeneratingSample(true);
    try {
      const sampleFile = await createSampleVideoWithAudio();
      loadSelectedFile(sampleFile);
    } catch {
      setErrorMsg(t.errors.processFailed);
    } finally {
      setIsGeneratingSample(false);
    }
  };

  const handleLoadedMetadata = () => {
    const el = previewVideoRef.current;
    if (!el) return;
    if (Number.isFinite(el.duration) && el.duration > 0) {
      applyDetectedDuration(el.duration);
      return;
    }
    const knownDur = file
      ? (file as File & { knownDurationSec?: number }).knownDurationSec
      : undefined;
    if (el.duration === Infinity && !knownDur && !resolvingDurationRef.current) {
      resolvingDurationRef.current = true;
      el.currentTime = 1e101;
    }
  };

  const handleDurationChange = () => {
    const el = previewVideoRef.current;
    if (!el || !Number.isFinite(el.duration) || el.duration <= 0 || el.duration >= 86400) {
      return;
    }
    if (resolvingDurationRef.current) {
      resolvingDurationRef.current = false;
      el.currentTime = 0;
    }
    applyDetectedDuration(el.duration);
  };

  const minGap = durationSec > 1 ? 0.5 : 0.1;

  const handleStartSlider = (val: number) => {
    if (!Number.isFinite(val)) return;
    const maxStart = Math.max(0, Number((durationSec - minGap).toFixed(1)));
    const nextStart = Math.max(0, Math.min(maxStart, Number(val.toFixed(1))));
    setStartSec(nextStart);
    if (nextStart > endSec - minGap) {
      setEndSec(Math.min(durationSec, Number((nextStart + minGap).toFixed(1))));
    }
    if (previewVideoRef.current && Math.abs(previewVideoRef.current.currentTime - nextStart) > 0.25) {
      previewVideoRef.current.currentTime = nextStart;
    }
  };

  const handleEndSlider = (val: number) => {
    if (!Number.isFinite(val)) return;
    const minEnd = Math.min(durationSec, minGap);
    const nextEnd = Math.max(minEnd, Math.min(durationSec, Number(val.toFixed(1))));
    setEndSec(nextEnd);
    if (nextEnd < startSec + minGap) {
      setStartSec(Math.max(0, Number((nextEnd - minGap).toFixed(1))));
    }
  };

  const handlePreviewRange = () => {
    const el = previewVideoRef.current;
    if (!el) return;
    setPreviewMuted(false);
    const previewAt = Math.max(0, startSec - 0.4);
    el.currentTime = previewAt;
    setPlayheadSec(previewAt);
    el.play().catch(() => undefined);
  };

  const clientXToSec = (clientX: number): number => {
    const bar = timelineBarRef.current;
    if (!bar || durationSec <= 0) return 0;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Number((ratio * durationSec).toFixed(1));
  };

  const startTimelineDrag = (
    e: TargetedEvent<HTMLElement, PointerEvent>,
    dragMode: 'start' | 'end' | 'move'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      timelineBarRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // ignore environments without pointer capture
    }
    dragStateRef.current = {
      mode: dragMode,
      grabSec: clientXToSec(e.clientX),
      initStart: startSec,
      initEnd: endSec,
    };
    setActiveDrag(dragMode);
  };

  const handleTrackPointerDown = (e: TargetedEvent<HTMLDivElement, PointerEvent>) => {
    const clickedSec = clientXToSec(e.clientX);
    const distStart = Math.abs(clickedSec - startSec);
    const distEnd = Math.abs(clickedSec - endSec);
    const targetMode: 'start' | 'end' = distStart <= distEnd ? 'start' : 'end';
    try {
      timelineBarRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    dragStateRef.current = {
      mode: targetMode,
      grabSec: clickedSec,
      initStart: startSec,
      initEnd: endSec,
    };
    setActiveDrag(targetMode);
    if (targetMode === 'start') {
      handleStartSlider(clickedSec);
    } else {
      handleEndSlider(clickedSec);
    }
  };

  const handleTrackPointerMove = (e: TargetedEvent<HTMLDivElement, PointerEvent>) => {
    const drag = dragStateRef.current;
    if (!drag.mode) return;
    const sec = clientXToSec(e.clientX);
    if (drag.mode === 'start') {
      handleStartSlider(sec);
    } else if (drag.mode === 'end') {
      handleEndSlider(sec);
    } else if (drag.mode === 'move') {
      const span = Math.max(minGap, drag.initEnd - drag.initStart);
      const delta = sec - drag.grabSec;
      const maxStart = Math.max(0, Number((durationSec - span).toFixed(1)));
      const clampedStart = Math.max(
        0,
        Math.min(maxStart, Number((drag.initStart + delta).toFixed(1)))
      );
      const nextEnd = Number(Math.min(durationSec, clampedStart + span).toFixed(1));
      setStartSec(clampedStart);
      setEndSec(nextEnd);
      if (previewVideoRef.current && Math.abs(previewVideoRef.current.currentTime - clampedStart) > 0.25) {
        previewVideoRef.current.currentTime = clampedStart;
      }
    }
  };

  const handleTrackPointerUp = (e: TargetedEvent<HTMLDivElement, PointerEvent>) => {
    if (!dragStateRef.current.mode) return;
    dragStateRef.current.mode = null;
    setActiveDrag(null);
    try {
      if (timelineBarRef.current?.hasPointerCapture(e.pointerId)) {
        timelineBarRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handleBarKeyDown = (
    e: TargetedEvent<HTMLElement, KeyboardEvent>,
    target: 'start' | 'end'
  ) => {
    const step = e.shiftKey ? 0.5 : 0.1;
    let delta = 0;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step;
    else return;
    e.preventDefault();
    if (target === 'start') {
      handleStartSlider(startSec + delta);
    } else {
      handleEndSlider(endSec + delta);
    }
  };

  const handleProcessMute = async () => {
    if (!file) return;
    if (mode === 'range' && endSec <= startSec) {
      setErrorMsg(t.errors.invalidRange);
      return;
    }

    setErrorMsg(null);
    setStage('loading');
    setProgress(4);
    setStep('processing');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const output = await processMuteVideo({
        file,
        mode,
        startSec,
        endSec,
        keepSilentTrack,
        durationSec,
        onStage: (nextStage) => setStage(nextStage),
        onProgress: (pct) => setProgress(pct),
        signal: controller.signal,
      });
      setResult(output);
      setStep('result');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setStep('controls');
        return;
      }
      setErrorMsg(t.errors.processFailed);
      setStep('controls');
    } finally {
      abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setStep('controls');
  };

  const handleReset = () => {
    abortRef.current?.abort();
    if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    setFile(null);
    setSourceUrl(null);
    setResult(null);
    setErrorMsg(null);
    setProgress(0);
    setPlayheadSec(0);
    setStep('dropzone');
  };

  const stageLabel = (() => {
    switch (stage) {
      case 'loading':
        return t.step3.stageLoading;
      case 'probing':
        return t.step3.stageProbing;
      case 'processing':
        return mode === 'full' ? t.step3.stageFullMute : t.step3.stageRangeMute;
      case 'finalizing':
        return t.step3.stageFinalizing;
    }
  })();

  const rangeStartPct = durationSec > 0 ? Math.min(100, Math.max(0, (startSec / durationSec) * 100)) : 0;
  const rangeEndPct = durationSec > 0 ? Math.min(100, Math.max(rangeStartPct, (endSec / durationSec) * 100)) : 100;
  const playheadPct = durationSec > 0 ? Math.min(100, Math.max(0, (playheadSec / durationSec) * 100)) : 0;

  return (
    <div
      class="mx-auto w-full max-w-4xl rounded-3xl border-2 p-4 transition-all duration-300 sm:p-6 md:p-8"
      style="background-color: var(--bg-surface-card); border-color: var(--border-color); box-shadow: var(--shadow-workspace);"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp4,.mov,.webm,.mkv,.avi,.m4v,video/*"
        class="hidden"
        onChange={handleFileInputChange}
      />

      {errorMsg && (
        <div
          role="alert"
          aria-live="polite"
          class="mb-4 flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-base font-bold"
          style="background-color: var(--workspace-box-bg); border-color: var(--primary-action-btn); color: var(--text-primary);"
        >
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            aria-label="Dismiss error"
            class="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg font-extrabold hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}

      {/* STEP 1: GIANT DASHED-BORDER DROPZONE */}
      {step === 'dropzone' && (
        <div
          role="region"
          aria-label={t.step1.dropTitle}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          class="animate-fade-slide-up flex flex-col items-center justify-center rounded-2xl border-[3px] border-dashed px-4 py-10 text-center transition-all duration-200 sm:px-8 sm:py-12"
          style={
            isDragging
              ? 'background-color: var(--workspace-box-bg); border-color: #555555; transform: scale(1.01);'
              : 'background-color: var(--workspace-box-bg); border-color: var(--border-color);'
          }
        >
          {/* Oversized Animated Soundwave-to-Mute SVG Icon (64px) */}
          <div
            class="animate-float-slow mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border-2 shadow-md"
            style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
              class="h-14 w-14 sm:h-16 sm:w-16"
            >
              {/* Speaker Body */}
              <path
                d="M14 25H23L34 15V49L23 39H14C12.34 39 11 37.66 11 36V28C11 26.34 12.34 25 14 25Z"
                fill="currentColor"
                fill-opacity="0.18"
                stroke="currentColor"
                stroke-width="3"
                stroke-linejoin="round"
              />
              {/* Animated Soundwave Bars */}
              <line
                x1="41"
                y1="25"
                x2="41"
                y2="39"
                stroke="currentColor"
                stroke-width="3.2"
                stroke-linecap="round"
                class="animate-soundwave-bar-1"
              />
              <line
                x1="47"
                y1="20"
                x2="47"
                y2="44"
                stroke="currentColor"
                stroke-width="3.2"
                stroke-linecap="round"
                class="animate-soundwave-bar-2"
              />
              <line
                x1="53"
                y1="26"
                x2="53"
                y2="38"
                stroke="currentColor"
                stroke-width="3.2"
                stroke-linecap="round"
                class="animate-soundwave-bar-3"
              />
              {/* Smooth Diagonal Mute Slash */}
              <line
                x1="14"
                y1="50"
                x2="54"
                y2="14"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                class="animate-mute-slash"
              />
            </svg>
          </div>

          <h2 class="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl" style="color: var(--text-primary);">
            {isDragging ? t.step1.dropTitleActive : t.step1.dropTitle}
          </h2>
          <p class="mb-6 max-w-xl text-base font-medium sm:text-lg" style="color: var(--text-secondary);">
            {t.step1.dropSubtitle}
          </p>

          {/* Oversized Primary Action Button */}
          <div class="flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              class="inline-flex min-h-[58px] cursor-pointer items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-extrabold shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style="background-color: var(--primary-action-btn); color: var(--primary-action-text);"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="h-6 w-6"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <span>{t.step1.selectBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleTrySample}
              disabled={isGeneratingSample}
              class="inline-flex min-h-[58px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-6 py-3.5 text-base font-bold hover:opacity-90 disabled:cursor-wait disabled:opacity-65"
              style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="h-5 w-5"
              >
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span>{isGeneratingSample ? t.step1.sampleGenerating : t.step1.sampleBtn}</span>
            </button>
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm font-bold" style="color: var(--text-secondary);">
            <span
              class="rounded-full border px-3.5 py-1"
              style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
            >
              {t.step1.formatsBadge}
            </span>
            <span class="opacity-85">{t.step1.privacyPill}</span>
          </div>
        </div>
      )}

      {/* STEP 2: ONE-CLICK OR CUSTOM CONTROLS */}
      {step === 'controls' && file && sourceUrl && (
        <div class="animate-fade-slide-up space-y-6">
          {/* Top File Header + Sound Comparison Bar */}
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-lg font-extrabold" style="color: var(--text-primary);">
                {file.name}
              </p>
              <p class="text-sm font-semibold" style="color: var(--text-secondary);">
                {formatFileSize(file.size)} • {formatDuration(durationSec)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              class="cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-bold hover:opacity-90"
              style="background-color: var(--workspace-box-bg); border-color: var(--border-color); color: var(--text-primary);"
            >
              {t.step2.changeFileBtn}
            </button>
          </div>

          {/* 1. Live Video Player Preview + Interactive Sound On/Off Comparison Toggle */}
          <div
            class="overflow-hidden rounded-2xl border-2"
            style="background-color: var(--workspace-box-bg); border-color: var(--border-color);"
          >
            <div class="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3" style="border-color: var(--border-color);">
              <span class="text-sm font-extrabold uppercase tracking-wide" style="color: var(--text-primary);">
                {t.step2.previewHeading}
              </span>
              <button
                type="button"
                onClick={() => setPreviewMuted((prev) => !prev)}
                aria-pressed={previewMuted}
                aria-label={previewMuted ? t.step2.soundOffLabel : t.step2.soundOnLabel}
                class="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3.5 py-1.5 text-sm font-extrabold shadow-sm"
                style={
                  previewMuted
                    ? 'background-color: var(--primary-action-btn); border-color: var(--primary-action-btn); color: var(--primary-action-text);'
                    : 'background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);'
                }
              >
                {previewMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <line x1="22" x2="16" y1="9" y2="15" />
                    <line x1="16" x2="22" y1="9" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                    <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
                <span>{previewMuted ? t.step2.soundOffLabel : t.step2.soundOnLabel}</span>
              </button>
            </div>

            <div class="flex items-center justify-center bg-black/90">
              <video
                ref={previewVideoRef}
                src={sourceUrl}
                controls
                playsInline
                onLoadedMetadata={handleLoadedMetadata}
                onDurationChange={handleDurationChange}
                onSeeked={() => syncPreviewMuteState(previewVideoRef.current)}
                onTimeUpdate={() => syncPreviewMuteState(previewVideoRef.current)}
                onPlay={() => syncPreviewMuteState(previewVideoRef.current)}
                class="max-h-[280px] w-full object-contain sm:max-h-[320px]"
              />
            </div>
          </div>

          {/* 2. Compact Mode Cards */}
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Card 1: Instant Full Mute (Default) */}
            <button
              type="button"
              onClick={() => setMode('full')}
              aria-pressed={mode === 'full'}
              aria-label={`${t.step2.modeFullTitle} — ${t.step2.modeFullBadge}`}
              class="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-3.5 text-left transition-all"
              style={
                mode === 'full'
                  ? 'background-color: var(--workspace-box-bg); border-color: var(--primary-action-btn); box-shadow: 0 6px 18px -10px rgba(85, 85, 85, 0.35);'
                  : 'background-color: var(--bg-surface-card); border-color: var(--border-color); opacity: 0.88;'
              }
            >
              <div class="min-w-0 space-y-1">
                <span class="block text-base font-extrabold leading-tight" style="color: var(--text-primary);">
                  {t.step2.modeFullTitle}
                </span>
                <span
                  class="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                  style="background-color: var(--bg-surface-card); color: var(--text-secondary); border: 1px solid var(--border-color);"
                >
                  {t.step2.modeFullBadge}
                </span>
              </div>
              <span
                class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black"
                style={
                  mode === 'full'
                    ? 'border-color: var(--primary-action-btn); background-color: var(--primary-action-btn); color: var(--primary-action-text);'
                    : 'border-color: var(--border-color);'
                }
              >
                {mode === 'full' ? '✓' : ''}
              </span>
            </button>

            {/* Card 2: Mute Specific Time Section */}
            <button
              type="button"
              onClick={() => setMode('range')}
              aria-pressed={mode === 'range'}
              aria-label={`${t.step2.modeRangeTitle} — ${t.step2.modeRangeBadge}`}
              class="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 p-3.5 text-left transition-all"
              style={
                mode === 'range'
                  ? 'background-color: var(--workspace-box-bg); border-color: var(--primary-action-btn); box-shadow: 0 6px 18px -10px rgba(85, 85, 85, 0.35);'
                  : 'background-color: var(--bg-surface-card); border-color: var(--border-color); opacity: 0.88;'
              }
            >
              <div class="min-w-0 space-y-1">
                <span class="block text-base font-extrabold leading-tight" style="color: var(--text-primary);">
                  {t.step2.modeRangeTitle}
                </span>
                <span
                  class="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                  style="background-color: var(--bg-surface-card); color: var(--text-secondary); border: 1px solid var(--border-color);"
                >
                  {t.step2.modeRangeBadge}
                </span>
              </div>
              <span
                class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black"
                style={
                  mode === 'range'
                    ? 'border-color: var(--primary-action-btn); background-color: var(--primary-action-btn); color: var(--primary-action-text);'
                    : 'border-color: var(--border-color);'
                }
              >
                {mode === 'range' ? '✓' : ''}
              </span>
            </button>
          </div>

          {/* Interactive Timeline Range Bar Panel */}
          {mode === 'range' && (
            <div
              class="animate-fade-slide-up space-y-3 rounded-2xl border-2 p-4"
              style="background-color: var(--workspace-box-bg); border-color: var(--border-color);"
            >
              {/* Header Row: Summary + Quick Preview Play */}
              <div class="flex flex-wrap items-center justify-between gap-2 text-sm font-extrabold" style="color: var(--text-primary);">
                <span>{t.step2.mutedSegmentSummary}</span>
                <div class="flex items-center gap-2">
                  <span
                    class="rounded-lg border px-2.5 py-0.5 text-xs font-extrabold tabular-nums"
                    style="background-color: var(--bg-surface-card); border-color: var(--border-color);"
                  >
                    {formatDuration(startSec, true)} → {formatDuration(endSec, true)} ({Math.max(0, endSec - startSec).toFixed(1)}s)
                  </span>
                  <button
                    type="button"
                    onClick={handlePreviewRange}
                    aria-label={`▶ ${t.step2.previewHeading}`}
                    class="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-extrabold hover:opacity-90"
                    style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
                  >
                    <span>▶</span>
                  </button>
                </div>
              </div>

              {/* Unified Draggable Timeline Range Bar */}
              <div class="px-3 pt-7 pb-1">
                <div
                  ref={timelineBarRef}
                  onPointerDown={handleTrackPointerDown}
                  onPointerMove={handleTrackPointerMove}
                  onPointerUp={handleTrackPointerUp}
                  onPointerCancel={handleTrackPointerUp}
                  class="relative h-14 w-full touch-none select-none cursor-pointer rounded-xl border-2"
                  style="background-color: var(--bg-surface-card); border-color: var(--border-color);"
                >
                  {/* Background Soundwave Visualization */}
                  <div
                    aria-hidden="true"
                    class="pointer-events-none absolute inset-0 flex items-center justify-between overflow-hidden rounded-[10px] px-2"
                  >
                    {Array.from({ length: 36 }, (_, idx) => {
                      const pct = ((idx + 0.5) / 36) * 100;
                      const inMutedZone = pct >= rangeStartPct && pct <= rangeEndPct;
                      const heightPct = 24 + ((idx * 23 + (idx % 5) * 13) % 62);
                      return (
                        <span
                          class="w-1 rounded-full transition-opacity"
                          style={`height: ${heightPct}%; background-color: var(--text-primary); opacity: ${inMutedZone ? 0.16 : 0.45};`}
                        />
                      );
                    })}
                  </div>

                  {/* Active Draggable Muted Region Overlay */}
                  <div
                    role="presentation"
                    onPointerDown={(e) => startTimelineDrag(e, 'move')}
                    class={`absolute top-0 bottom-0 z-10 flex items-center justify-center border-y-2 ${activeDrag === 'move' ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={`left: ${rangeStartPct}%; width: ${Math.max(2, rangeEndPct - rangeStartPct)}%; background-color: rgba(85, 85, 85, 0.24); border-color: var(--primary-action-btn);`}
                  >
                    <span
                      class="pointer-events-none inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-extrabold shadow-xs"
                      style="background-color: var(--primary-action-btn); color: var(--primary-action-text);"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                        <line x1="22" x2="16" y1="9" y2="15" />
                        <line x1="16" x2="22" y1="9" y2="15" />
                      </svg>
                      {rangeEndPct - rangeStartPct > 22 && (
                        <span class="hidden sm:inline tabular-nums">
                          {formatDuration(startSec, true)}–{formatDuration(endSec, true)}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Live Playhead Indicator */}
                  <div
                    aria-hidden="true"
                    class="pointer-events-none absolute -top-1 -bottom-1 z-[15] w-0.5"
                    style={`left: ${playheadPct}%; background-color: var(--text-primary); opacity: 0.75;`}
                  >
                    <span
                      class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                      style="background-color: var(--text-primary);"
                    />
                  </div>

                  {/* Draggable Start Handle */}
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label={t.step2.startTimeLabel}
                    aria-valuemin={0}
                    aria-valuemax={durationSec}
                    aria-valuenow={startSec}
                    onPointerDown={(e) => startTimelineDrag(e, 'start')}
                    onKeyDown={(e) => handleBarKeyDown(e, 'start')}
                    class="absolute top-1/2 z-20 flex h-16 w-6 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-lg border-2 shadow-md focus-visible:outline-none"
                    style={`left: ${rangeStartPct}%; background-color: var(--primary-action-btn); color: var(--primary-action-text); border-color: var(--bg-surface-card);`}
                  >
                    <span
                      class="pointer-events-none absolute -top-6 rounded-md border px-1.5 py-0.5 text-[11px] font-extrabold tabular-nums whitespace-nowrap shadow-xs"
                      style="background-color: var(--bg-surface-card); color: var(--text-primary); border-color: var(--border-color);"
                    >
                      {startSec.toFixed(1)}s
                    </span>
                    <span class="flex gap-0.5" aria-hidden="true">
                      <span class="h-5 w-0.5 rounded-full bg-current opacity-85" />
                      <span class="h-5 w-0.5 rounded-full bg-current opacity-85" />
                    </span>
                  </div>

                  {/* Draggable End Handle */}
                  <div
                    role="slider"
                    tabIndex={0}
                    aria-label={t.step2.endTimeLabel}
                    aria-valuemin={0}
                    aria-valuemax={durationSec}
                    aria-valuenow={endSec}
                    onPointerDown={(e) => startTimelineDrag(e, 'end')}
                    onKeyDown={(e) => handleBarKeyDown(e, 'end')}
                    class="absolute top-1/2 z-20 flex h-16 w-6 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-lg border-2 shadow-md focus-visible:outline-none"
                    style={`left: ${rangeEndPct}%; background-color: var(--primary-action-btn); color: var(--primary-action-text); border-color: var(--bg-surface-card);`}
                  >
                    <span
                      class="pointer-events-none absolute -top-6 rounded-md border px-1.5 py-0.5 text-[11px] font-extrabold tabular-nums whitespace-nowrap shadow-xs"
                      style="background-color: var(--bg-surface-card); color: var(--text-primary); border-color: var(--border-color);"
                    >
                      {endSec.toFixed(1)}s
                    </span>
                    <span class="flex gap-0.5" aria-hidden="true">
                      <span class="h-5 w-0.5 rounded-full bg-current opacity-85" />
                      <span class="h-5 w-0.5 rounded-full bg-current opacity-85" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Bottom Timestamp & Fine-Tune Bar */}
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-bold" style="color: var(--text-secondary);">
                <span class="tabular-nums">00:00.0</span>
                <div class="flex flex-wrap items-center gap-2">
                  <label class="flex items-center gap-1 rounded-lg border px-2 py-1" style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);">
                    <span>{t.step2.startTimeLabel}:</span>
                    <input
                      id="mute-start-number"
                      type="number"
                      min={0}
                      max={durationSec}
                      step={0.1}
                      value={startSec}
                      aria-label={`${t.step2.startTimeLabel} (s)`}
                      onInput={(e) => handleStartSlider(Number(e.currentTarget.value))}
                      class="w-12 bg-transparent text-right font-extrabold tabular-nums focus:outline-none"
                    />
                    <span>s</span>
                  </label>
                  <label class="flex items-center gap-1 rounded-lg border px-2 py-1" style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);">
                    <span>{t.step2.endTimeLabel}:</span>
                    <input
                      id="mute-end-number"
                      type="number"
                      min={0}
                      max={durationSec}
                      step={0.1}
                      value={endSec}
                      aria-label={`${t.step2.endTimeLabel} (s)`}
                      onInput={(e) => handleEndSlider(Number(e.currentTarget.value))}
                      class="w-12 bg-transparent text-right font-extrabold tabular-nums focus:outline-none"
                    />
                    <span>s</span>
                  </label>
                </div>
                <span class="tabular-nums">{formatDuration(durationSec, true)}</span>
              </div>
            </div>
          )}

          {/* Optional Silent Audio Track Container Toggle (Full Mute only, compact single line) */}
          {mode === 'full' && (
            <label
              class="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
              style="background-color: var(--surface-subtle); border-color: var(--border-color);"
            >
              <input
                type="checkbox"
                checked={keepSilentTrack}
                onChange={(e) => setKeepSilentTrack(e.currentTarget.checked)}
                class="h-4 w-4 shrink-0 cursor-pointer accent-[#555555]"
              />
              <span class="text-sm font-bold" style="color: var(--text-primary);">
                {t.step2.silentTrackLabel}
              </span>
            </label>
          )}

          {/* 3. Oversized Primary CTA Button */}
          <button
            type="button"
            onClick={handleProcessMute}
            class="flex min-h-[62px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-8 py-4 text-xl font-extrabold shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            style="background-color: var(--primary-action-btn); color: var(--primary-action-text);"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="22" x2="16" y1="9" y2="15" />
              <line x1="16" x2="22" y1="9" y2="15" />
            </svg>
            <span>{t.step2.removeAudioBtn}</span>
          </button>
        </div>
      )}

      {/* STEP 3: ANIMATED PROGRESS */}
      {step === 'processing' && (
        <div
          role="status"
          aria-live="polite"
          class="animate-fade-slide-up flex flex-col items-center justify-center rounded-2xl border-2 px-5 py-12 text-center sm:px-8"
          style="background-color: var(--workspace-box-bg); border-color: var(--border-color);"
        >
          <div class="mb-4 text-4xl font-black tabular-nums sm:text-5xl" style="color: var(--text-primary);">
            {progress}%
          </div>

          <p class="mb-6 text-lg font-extrabold sm:text-xl" style="color: var(--text-primary);">
            {stageLabel}
          </p>

          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            class="mb-6 h-5 w-full max-w-xl overflow-hidden rounded-full border-2 p-0.5"
            style="background-color: var(--bg-surface-card); border-color: var(--border-color);"
          >
            <div
              class="progress-shimmer-bar h-full rounded-full transition-all duration-300"
              style={`width: ${Math.max(5, progress)}%;`}
            />
          </div>

          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold sm:text-sm"
            style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{t.step3.privacyBadge}</span>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            class="cursor-pointer rounded-xl border-2 px-5 py-2.5 text-sm font-bold hover:opacity-85"
            style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
          >
            {t.step3.cancelBtn}
          </button>
        </div>
      )}

      {/* STEP 4: INSTANT PREVIEW & DOWNLOAD */}
      {step === 'result' && result && (
        <div class="animate-fade-slide-up space-y-6">
          {/* File Size Saved Badge */}
          <div
            role="status"
            aria-live="polite"
            class="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-center text-sm font-extrabold sm:text-base"
            style="background-color: var(--workspace-box-bg); border-color: var(--primary-action-btn); color: var(--text-primary);"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              {!result.hadAudio
                ? `${t.step4.savedBadgePrefix} • ${t.step4.noAudioAlreadyNote}`
                : result.mode === 'range' && result.mutedRange
                  ? `${t.step4.savedBadgePrefix} • ${formatDuration(result.mutedRange.startSec, true)} → ${formatDuration(result.mutedRange.endSec, true)}`
                  : result.bytesSaved > 0
                    ? `${t.step4.savedBadgePrefix} • ${t.step4.savedAmountPrefix} ${formatFileSize(result.bytesSaved)}`
                    : t.step4.savedBadgePrefix}
            </span>
          </div>

          {/* Instant Muted Video Preview Player */}
          <div
            class="overflow-hidden rounded-2xl border-2"
            style="background-color: var(--workspace-box-bg); border-color: var(--border-color);"
          >
            <div class="flex items-center justify-between border-b px-4 py-2.5 text-sm font-extrabold" style="border-color: var(--border-color); color: var(--text-primary);">
              <span>{t.step4.previewLabel}</span>
              <span>{formatFileSize(result.outputBytes)}</span>
            </div>
            <div class="flex items-center justify-center bg-black/90">
              <video
                src={result.url}
                controls
                playsInline
                class="max-h-[300px] w-full object-contain sm:max-h-[340px]"
              />
            </div>
          </div>

          {/* Oversized Download + Reset Buttons */}
          <div class="flex flex-col gap-3 sm:flex-row">
            <a
              href={result.url}
              download={result.filename}
              class="flex min-h-[60px] flex-1 items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-extrabold shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              style="background-color: var(--primary-action-btn); color: var(--primary-action-text);"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>{t.step4.downloadBtn}</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              class="inline-flex min-h-[60px] cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 px-6 py-4 text-base font-extrabold hover:opacity-90"
              style="background-color: var(--bg-surface-card); border-color: var(--border-color); color: var(--text-primary);"
            >
              {t.step4.muteAnotherBtn}
            </button>
          </div>

          {/* Friendly Post-Download Coffee Micro-Card */}
          <div
            class="flex flex-col items-center justify-between gap-4 rounded-2xl border p-4 sm:flex-row sm:px-5"
            style="background-color: var(--surface-subtle); border-color: var(--border-color);"
          >
            <div class="text-center sm:text-left">
              <p class="text-base font-extrabold" style="color: var(--text-primary);">
                {t.step4.coffeeTitle}
              </p>
              <p class="text-sm font-medium" style="color: var(--text-secondary);">
                {t.step4.coffeeDesc}
              </p>
            </div>
            <a
              href="https://kisharadilshan.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              class="support-dev-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              </svg>
              <span>{t.step4.coffeeCta}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
