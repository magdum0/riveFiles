import type { Metadata } from 'next';
import { Syncopate, Zen_Kaku_Gothic_New } from 'next/font/google';

import './globals.css';

const syncopate = Syncopate({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-syncopate',
  display: 'swap',
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rive Asset Library',
  description: 'Reference and usage surface for Rive assets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${syncopate.variable} ${zenKakuGothicNew.variable}`}>
        {children}
      </body>
    </html>
  );
}
