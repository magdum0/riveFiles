'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';

import { RiveAssetView } from '@/components/RiveAssetView';
import { SiteHeaderNav } from '@/components/SiteHeaderNav';
import { SiteHeaderNavDesktop } from '@/components/SiteHeaderNavDesktop';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`siteHeader ${menuOpen ? 'siteHeader--menuOpen' : ''}`}
        aria-label="Site header"
      >
        <Link href="/" className="siteHeaderLogoLink" aria-label="Home">
          <div className="siteHeaderLogo">
            <RiveAssetView asset="ReuseLogo" autoplay />
          </div>
        </Link>

        <button
          className="siteHeaderMenuButton"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Image
            src={menuOpen ? '/img/open-menu.webp' : '/img/menu-icon.webp'}
            alt=""
            width={24}
            height={24}
            className="siteHeaderMenuIcon"
            aria-hidden
          />
        </button>
      </header>

      {menuOpen ? (
        <div
          className="siteHeaderModalRoot"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          id={panelId}
        >
          <h2 id={titleId} className="siteHeaderModalSrOnly">
            Menu
          </h2>

          {/* Mobile: full-bleed panel below header, #004445 */}
          <div className="siteHeaderModalMobile">
            <SiteHeaderNav onNavigate={closeMenu} />
          </div>

          {/* Desktop: dimmed backdrop + white panel */}
          <div className="siteHeaderModalDesktop">
            <button
              type="button"
              className="siteHeaderModalBackdrop"
              aria-label="Close menu"
              onClick={closeMenu}
            />
            <div className="siteHeaderModalPanel siteHeaderModalPanel--desktopNav">
              <SiteHeaderNavDesktop
                onNavigate={closeMenu}
                onClose={closeMenu}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
