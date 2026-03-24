'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { siteNavRoutes as r } from '@/lib/siteNavRoutes';

type SiteHeaderNavDesktopProps = {
  onNavigate?: () => void;
  onClose: () => void;
};

export function SiteHeaderNavDesktop({
  onNavigate,
  onClose,
}: SiteHeaderNavDesktopProps) {
  const NavHeading = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <Link href={href} className="hdNavHeading" onClick={onNavigate}>
      {children}
    </Link>
  );

  const NavSub = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <div className="hdNavServiceRow">
      <Link href={href} className="hdNavSub" onClick={onNavigate}>
        {children}
      </Link>
    </div>
  );

  return (
    <div className="hdNavRoot">
      <div className="hdNavInner">
        <div className="hdNavHeroWrap" aria-hidden>
          <Image
            src="/img/menu-desktop-hero.webp"
            alt=""
            fill
            className="hdNavHeroImg"
            sizes="(min-width: 1200px) 1400px, 95vw"
            priority
          />
        </div>

        <div className="hdNavLayers">
          <div className="hdNavTopBar">
            <div className="hdNavTopBarEnd">
              <button
                type="button"
                className="hdNavCloseWrap"
                aria-label="Close menu"
                onClick={onClose}
              >
                <span className="hdNavCloseBox" aria-hidden />
              </button>
            </div>
          </div>

          <div className="hdNavMainRow">
            <div className="hdNavMainCol">
              <div className="hdNavContentBg">
                <div className="hdNavContentInner">
                  <div className="hdNavColumns">
                    <div className="hdNavCol">
                      <NavHeading href={r.top}>TOP</NavHeading>
                      <NavHeading href={r.philosophy}>PHILOSOPHY</NavHeading>
                      <NavHeading href={r.company}>COMPANY</NavHeading>
                      <div className="hdNavServiceBlock">
                        <NavHeading href={r.service}>SERVICE</NavHeading>
                        <NavSub href={r.serviceIndividual}>個人の方</NavSub>
                        <NavSub href={r.serviceCorporate}>法人の方</NavSub>
                        <NavSub href={r.serviceAgency}>人材紹介会社様</NavSub>
                      </div>
                    </div>
                    <div className="hdNavCol">
                      <NavHeading href={r.member}>MEMBER</NavHeading>
                      <NavHeading href={r.column}>COLUMN</NavHeading>
                      <NavHeading href={r.executive}>EXECUTIVE</NavHeading>
                      <NavHeading href={r.recruit}>RECRUIT</NavHeading>
                      <NavHeading href={r.contact}>CONTACT</NavHeading>
                    </div>
                  </div>

                  <Link
                    href={r.line}
                    className="hdNavLineCta"
                    onClick={onNavigate}
                  >
                    <div className="hdNavLineText">
                      <span className="hdNavLineStrong">LINE</span>
                      <span className="hdNavLineRest">で転職相談</span>
                    </div>
                    <span className="hdNavLineDecor" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hdNavFooter">
        <span className="hdNavFooterSquare" aria-hidden />
        <div className="hdNavFooterLogo">
          <span className="hdNavFooterLogoMark" aria-hidden />
        </div>
      </div>
    </div>
  );
}
