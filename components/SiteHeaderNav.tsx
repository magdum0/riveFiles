import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { siteNavRoutes as routes } from "@/lib/siteNavRoutes";

type SiteHeaderNavProps = {
  onNavigate?: () => void;
};

export function SiteHeaderNav({ onNavigate }: SiteHeaderNavProps) {
  const NavLink = ({
    href,
    className,
    children,
  }: {
    href: string;
    className: string;
    children: ReactNode;
  }) => (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );

  return (
    <div className="siteHeaderNav siteHeaderNav--mobile">
      <div className="siteHeaderNavMain">
        <div className="siteHeaderNavCol">
          <NavLink href={routes.philosophy} className="siteHeaderNavHeading">
            PHILOSOPHY
          </NavLink>
          <NavLink href={routes.company} className="siteHeaderNavHeading">
            COMPANY
          </NavLink>

          <div className="siteHeaderNavService">
            <NavLink href={routes.service} className="siteHeaderNavHeading">
              SERVICE
            </NavLink>
            <div className="siteHeaderNavServiceSub">
              <div className="siteHeaderNavServiceRow">
                <Link
                  href={routes.serviceIndividual}
                  className="siteHeaderNavServiceRowLink"
                  onClick={onNavigate}
                >
                  <Image
                    src="/img/header-sp-vector.webp"
                    alt=""
                    width={24}
                    height={24}
                    className="siteHeaderNavServiceIcon"
                    aria-hidden
                  />
                  <span className="siteHeaderNavSub">個人の方</span>
                </Link>
              </div>
              <div className="siteHeaderNavServiceRow">
                <Link
                  href={routes.serviceCorporate}
                  className="siteHeaderNavServiceRowLink"
                  onClick={onNavigate}
                >
                  <Image
                    src="/img/header-sp-vector.webp"
                    alt=""
                    width={24}
                    height={24}
                    className="siteHeaderNavServiceIcon"
                    aria-hidden
                  />
                  <span className="siteHeaderNavSub">法人の方</span>
                </Link>
              </div>
              <div className="siteHeaderNavServiceRow">
                <Link
                  href={routes.serviceAgency}
                  className="siteHeaderNavServiceRowLink"
                  onClick={onNavigate}
                >
                  <Image
                    src="/img/header-sp-vector.webp"
                    alt=""
                    width={24}
                    height={24}
                    className="siteHeaderNavServiceIcon"
                    aria-hidden
                  />
                  <span className="siteHeaderNavSub">人材紹介会社様</span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink href={routes.member} className="siteHeaderNavHeading">
            MEMBER
          </NavLink>
          <NavLink href={routes.blog} className="siteHeaderNavHeading">
            BLOG
          </NavLink>
          <NavLink href={routes.recruit} className="siteHeaderNavHeading">
            RECRUIT
          </NavLink>
          <NavLink href={routes.contact} className="siteHeaderNavHeading">
            CONTACT
          </NavLink>
        </div>

        <div className="siteHeaderNavLineCta">
          <Link
            href={routes.line}
            className="siteHeaderNavLineCtaInner"
            onClick={onNavigate}
          >
            <div className="siteHeaderNavLineText">
              <span className="siteHeaderNavLineStrong">LINE</span>
              <span className="siteHeaderNavLineRest">で転職相談</span>
            </div>
            <div className="siteHeaderNavLineDecor" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
