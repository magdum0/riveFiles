import Link from 'next/link';

type NavPlaceholderPageProps = {
  title: string;
};

export function NavPlaceholderPage({ title }: NavPlaceholderPageProps) {
  return (
    <main className="navPlaceholderPage">
      <p className="navPlaceholderPageBack">
        <Link href="/header-demo">← Header demo</Link>
      </p>
      <h1 className="navPlaceholderPageTitle">{title}</h1>
      <p className="navPlaceholderPageLead">
        このページはプレースホルダーです。コンテンツを差し替えてください。
      </p>
    </main>
  );
}
