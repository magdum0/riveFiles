'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { RiveAssetView } from '@/components/RiveAssetView';
import type { RiveAssetConfig, RiveAssetKey } from '@/lib/riveAssetMap';

type AssetDetailShellProps = {
  assetKey: RiveAssetKey;
  config: RiveAssetConfig;
};

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.height = '100%';
    body.style.height = '100%';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
    };
  }, [active]);
}

export function AssetDetailShell({ assetKey, config }: AssetDetailShellProps) {
  const hasScrollVm = Boolean(config.viewModelScroll);
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const scrollMultiplier = config.viewModelScroll?.scrollDistanceMultiplier ?? 1;
  const spacerHeightVh = 400 * Math.max(0.1, scrollMultiplier);
  const scrollPaths = config.viewModelScroll
    ? config.viewModelScroll.stateNumRanges?.length
      ? config.viewModelScroll.stateNumRanges
          .map((r) => `${r.path}:${r.min}-${r.max}`)
          .join(', ')
      : config.viewModelScroll.stateNumPaths?.length
      ? config.viewModelScroll.stateNumPaths.join(', ')
      : config.viewModelScroll.stateNumPath ?? '-'
    : null;

  useBodyScrollLock(true);

  // Forward wheel + touch to the scroll root so viewModelScroll (stateNum) reacts
  // even over the Rive canvas (wheel may not bubble / touch doesn't scroll the root).
  useEffect(() => {
    if (!scrollRoot || !hasScrollVm) return;
    const root = scrollRoot;

    const shouldIgnoreTarget = (n: EventTarget | null) => {
      const el = n instanceof Element ? n : (n as Node)?.parentElement;
      if (!el) return true;
      if (el.closest('details.assetDetailMeta[open]')) return true;
      return Boolean(
        el.closest('a, button, input, textarea, select, summary, [data-scroll-pass]'),
      );
    };

    const onWheel = (e: WheelEvent) => {
      const t = e.target;
      if (!(t instanceof Node) || !root.contains(t)) return;
      if (shouldIgnoreTarget(t)) return;
      root.scrollTop += e.deltaY;
      e.preventDefault();
    };

    let touchLastY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const p = e.touches[0];
      const hit = document.elementFromPoint(p.clientX, p.clientY);
      if (!hit || !root.contains(hit)) return;
      if (shouldIgnoreTarget(hit)) return;
      touchLastY = p.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchLastY === null || e.touches.length !== 1) return;
      const p = e.touches[0];
      const y = p.clientY;
      const delta = touchLastY - y;
      touchLastY = y;
      // Increase touch sensitivity (2x multiplier)
      root.scrollTop += delta * 2;
      // Manually dispatch scroll event to ensure Rive state updates
      root.dispatchEvent(new Event('scroll'));
      e.preventDefault();
    };

    const onTouchEnd = () => {
      touchLastY = null;
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('touchend', onTouchEnd, { capture: true });
      window.removeEventListener('touchcancel', onTouchEnd, { capture: true });
    };
  }, [scrollRoot, hasScrollVm]);

  return (
    <div
      ref={setScrollRoot}
      data-view-model-scroll={hasScrollVm ? '1' : undefined}
      data-rive-fit={config.fit ?? 'contain'}
      className={
        hasScrollVm ? 'assetScrollRoot' : 'assetScrollRoot assetScrollRoot--locked'
      }
    >
      {hasScrollVm ? (
        <div
          className="assetScrollSpacer"
          style={{ height: `${spacerHeightVh}vh` }}
          aria-hidden
        />
      ) : null}

      <header className="assetDetailNav">
        <Link href="/">← Back</Link>
        <span className="assetDetailTitle">{assetKey}</span>
      </header>

      <div className="assetRiveLayer">
        <div className="detailPreview assetDetailPreview">
          <RiveAssetView
            asset={assetKey}
            scrollRootEl={hasScrollVm ? scrollRoot : null}
          />
        </div>
      </div>

      <details className="assetDetailMeta">
        <summary>Asset meta (optional)</summary>
        <div>src: {config.src}</div>
        <div>artboard: {config.artboard ?? '-'}</div>
        <div>stateMachine: {config.stateMachine ?? '-'}</div>
        <div>fit: {config.fit ?? 'contain'}</div>
        {config.viewModelScroll ? (
          <div>
            viewModelScroll: {config.viewModelScroll.viewModelName} /{' '}
            {scrollPaths} [
            {config.viewModelScroll.min}–{config.viewModelScroll.max}] (inner
            scroll, x{scrollMultiplier})
          </div>
        ) : null}
      </details>
    </div>
  );
}
