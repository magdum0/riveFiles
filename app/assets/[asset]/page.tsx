import { notFound } from 'next/navigation';

import { AssetDetailShell } from '@/components/AssetDetailShell';
import {
  RIVE_ASSET_MAP,
  type RiveAssetConfig,
  type RiveAssetKey,
} from '@/lib/riveAssetMap';

type AssetPageProps = {
  params: Promise<{ asset: string }>;
};

export async function generateStaticParams() {
  return (Object.keys(RIVE_ASSET_MAP) as RiveAssetKey[]).map((asset) => ({
    asset,
  }));
}

export default async function AssetDetailPage({ params }: AssetPageProps) {
  const { asset } = await params;
  const key = asset as RiveAssetKey;

  if (!(asset in RIVE_ASSET_MAP)) {
    notFound();
  }

  const config: RiveAssetConfig = RIVE_ASSET_MAP[key];

  return <AssetDetailShell assetKey={key} config={config} />;
}
