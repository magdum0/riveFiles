import { SiteHeader } from '@/components/SiteHeader';

export default function HeaderDemoPage() {
  return (
    <main className="headerDemoPage">
      <SiteHeader />
      <section className="headerDemoBody">
        <h1>Header Demo</h1>
        <p>SP: 50px / PC: 70px</p>
      </section>
    </main>
  );
}
