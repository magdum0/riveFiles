'use client';

import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceNumber,
} from '@rive-app/react-webgl2';
import { useEffect } from 'react';

import {
  RIVE_ASSET_MAP,
  type RiveAssetConfig,
  type RiveAssetKey,
  type RiveViewModelScrollConfig,
} from '@/lib/riveAssetMap';

type RiveAssetViewProps = {
  asset: RiveAssetKey;
  className?: string;
  autoplay?: boolean;
  /** When set with `viewModelScroll`, scroll progress is read from this element (not `window`). */
  scrollRootEl?: HTMLElement | null;
};

const RIVE_RENDER_OPTIONS = {
  shouldResizeCanvasToContainer: true,
  useDevicePixelRatio: true,
  useOffscreenRenderer: true,
} as const;

function resolveFit(fit?: 'contain' | 'cover' | 'layout') {
  if (fit === 'layout') return Fit.Layout;
  if (fit === 'cover') return Fit.Cover;
  return Fit.Contain;
}

function buildRiveParams(config: RiveAssetConfig, autoplay: boolean) {
  return {
    src: config.src,
    artboard: config.artboard,
    stateMachines: config.stateMachine ? [config.stateMachine] : undefined,
    autoBind: config.autoBind,
    layout: new Layout({
      fit: resolveFit(config.fit),
      alignment: Alignment.Center,
    }),
    autoplay,
  };
}

function useScrollToStateNum(
  binding: { min: number; max: number },
  setValue: (value: number) => void,
  scrollRootEl: HTMLElement | null | undefined,
  sequenceIndex = 0,
  sequenceCount = 1,
) {
  useEffect(() => {
    const update = () => {
      let t: number;
      if (scrollRootEl) {
        const maxScroll = Math.max(
          1,
          scrollRootEl.scrollHeight - scrollRootEl.clientHeight,
        );
        t = Math.min(1, Math.max(0, scrollRootEl.scrollTop / maxScroll));
      } else {
        const el = document.documentElement;
        const maxScroll = Math.max(1, el.scrollHeight - window.innerHeight);
        t = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      }
      // Sequential mode: path0 fills first, then path1, then path2...
      // Example with 3 paths and [0..150]:
      // number1: 0..150 during t=0..1/3, then stays 150
      // number2: 0..150 during t=1/3..2/3
      // number3: 0..150 during t=2/3..1
      const scaled = t * Math.max(1, sequenceCount) - sequenceIndex;
      const localT = Math.min(1, Math.max(0, scaled));
      const raw = binding.min + localT * (binding.max - binding.min);
      const rounded = Math.round(raw);
      const clamped = Math.min(binding.max, Math.max(binding.min, rounded));
      setValue(clamped);
    };

    update();
    if (scrollRootEl) {
      scrollRootEl.addEventListener('scroll', update, { passive: true });
    } else {
      window.addEventListener('scroll', update, { passive: true });
    }
    window.addEventListener('resize', update, { passive: true });
    return () => {
      if (scrollRootEl) {
        scrollRootEl.removeEventListener('scroll', update);
      } else {
        window.removeEventListener('scroll', update);
      }
      window.removeEventListener('resize', update);
    };
  }, [binding, setValue, scrollRootEl, sequenceIndex, sequenceCount]);
}

function getScrollNumberBindings(scroll: RiveViewModelScrollConfig) {
  if (scroll.stateNumRanges && scroll.stateNumRanges.length > 0) {
    return scroll.stateNumRanges.map((range) => ({
      path: range.path,
      min: range.min,
      max: range.max,
    }));
  }
  if (scroll.stateNumPaths && scroll.stateNumPaths.length > 0) {
    return scroll.stateNumPaths.map((path) => ({
      path,
      min: scroll.min,
      max: scroll.max,
    }));
  }
  if (scroll.stateNumPath) {
    return [{ path: scroll.stateNumPath, min: scroll.min, max: scroll.max }];
  }
  return [];
}

function ScrollNumberBinding({
  path,
  min,
  max,
  viewModelInstance,
  scrollRootEl,
  sequenceIndex,
  sequenceCount,
}: {
  path: string;
  min: number;
  max: number;
  viewModelInstance: ReturnType<typeof useViewModelInstance>;
  scrollRootEl?: HTMLElement | null;
  sequenceIndex: number;
  sequenceCount: number;
}) {
  const { setValue } = useViewModelInstanceNumber(path, viewModelInstance);
  useScrollToStateNum(
    { min, max },
    setValue,
    scrollRootEl,
    sequenceIndex,
    sequenceCount,
  );
  return null;
}

function RiveAssetViewWithScroll({
  config,
  className,
  autoplay,
  scrollRootEl,
}: {
  config: RiveAssetConfig & { viewModelScroll: RiveViewModelScrollConfig };
  className?: string;
  autoplay: boolean;
  scrollRootEl?: HTMLElement | null;
}) {
  const scroll = config.viewModelScroll;

  const { RiveComponent, rive } = useRive(
    buildRiveParams(config, autoplay),
    RIVE_RENDER_OPTIONS,
  );

  const viewModel = useViewModel(rive, { name: scroll.viewModelName });
  const viewModelInstance = useViewModelInstance(viewModel, {
    useDefault: true,
    rive,
  });
  const numberBindings = getScrollNumberBindings(scroll);

  return (
    <div className={`riveHost ${className ?? ''}`}>
      {numberBindings.map((binding, index) => (
        <ScrollNumberBinding
          key={binding.path}
          path={binding.path}
          min={binding.min}
          max={binding.max}
          viewModelInstance={viewModelInstance}
          scrollRootEl={scrollRootEl}
          sequenceIndex={index}
          sequenceCount={numberBindings.length}
        />
      ))}
      <RiveComponent />
    </div>
  );
}

function RiveAssetViewStatic({
  config,
  className,
  autoplay,
}: {
  config: RiveAssetConfig;
  className?: string;
  autoplay: boolean;
}) {
  const { RiveComponent } = useRive(
    buildRiveParams(config, autoplay),
    RIVE_RENDER_OPTIONS,
  );

  return (
    <div className={`riveHost ${className ?? ''}`}>
      <RiveComponent />
    </div>
  );
}

export function RiveAssetView({
  asset,
  className,
  autoplay = true,
  scrollRootEl,
}: RiveAssetViewProps) {
  const config: RiveAssetConfig = RIVE_ASSET_MAP[asset];

  if (config.viewModelScroll) {
    return (
      <RiveAssetViewWithScroll
        config={{ ...config, viewModelScroll: config.viewModelScroll }}
        className={className}
        autoplay={autoplay}
        scrollRootEl={scrollRootEl}
      />
    );
  }

  return (
    <RiveAssetViewStatic
      config={config}
      className={className}
      autoplay={autoplay}
    />
  );
}
