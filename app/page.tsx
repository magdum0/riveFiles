import Link from 'next/link';

import { RIVE_ASSET_MAP, type RiveAssetKey } from '@/lib/riveAssetMap';

const KEYS = Object.keys(RIVE_ASSET_MAP) as RiveAssetKey[];

function getCategoryFromSrc(src: string): string {
  // Extract directory name from path like "/rive-files/column/file.riv"
  const match = src.match(/\/rive-files\/([^/]+)\//);
  return match ? match[1] : 'other';
}

function groupAssetsByCategory() {
  const groups: Record<string, RiveAssetKey[]> = {};

  for (const key of KEYS) {
    const config = RIVE_ASSET_MAP[key];
    const category = getCategoryFromSrc(config.src);

    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(key);
  }

  return groups;
}

const CATEGORY_LABELS: Record<string, string> = {
  column: 'Column',
  company: 'Company',
  executive: 'Executive',
  interview: 'Interview',
  member: 'Member',
  philosophy: 'Philosophy',
  reuse: 'Reuse',
  services_to_b: 'Services to B',
  services_to_c: 'Services to C',
  top: 'Top',
};

export default function HomePage() {
  const groups = groupAssetsByCategory();
  const categories = Object.keys(groups).sort();

  return (
    <main className="homeIndex">
      <h1>Rive Asset Library</h1>
      <p className="homeLead">
        Open an asset to view the large preview (full-screen, fixed layout).
      </p>

      {categories.map((category) => (
        <section key={category} className="assetCategory">
          <h2 className="assetCategoryTitle">
            {CATEGORY_LABELS[category] || category}
          </h2>
          <ul className="assetLinkList">
            {groups[category].map((key) => {
              const config = RIVE_ASSET_MAP[key];
              return (
                <li key={key}>
                  <Link className="assetLink" href={`/assets/${key}`}>
                    <span className="assetLinkKey">{key}</span>
                    <span className="assetLinkSrc">{config.src}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
