import Link from "next/link";
import { useTranslations } from "next-intl";

interface HeroProps {
  locale: string;
  verifiedCount?: number;
}

export function Hero({ locale, verifiedCount = 0 }: HeroProps) {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-900)] via-[var(--bg-primary)] to-[var(--bg-primary)] -z-20" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 opacity-20 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--color-primary-500)] rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[var(--color-secondary-500)] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {verifiedCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/20 text-[var(--color-primary-500)] text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary-400)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary-500)]"></span>
            </span>
            Trusted by {verifiedCount.toLocaleString()}+ students
          </div>
        )}

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] mb-8 tracking-tight animate-slide-up pb-2">
          Master Algorithms Visually
        </h1>

        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
          The ultimate interactive playground for learning Data Structures & Algorithms. Visualize, experiment, and master concepts at your own pace.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Link
            href={`/${locale}/topics`}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[var(--color-primary-600)] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-primary-500)]/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Start Visualizing
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            href={`#pricing`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-secondary)] transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
