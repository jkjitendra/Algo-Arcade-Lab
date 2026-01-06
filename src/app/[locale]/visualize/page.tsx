import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { VisualizerClient } from "@/ui/visualizers/VisualizerClient";

interface VisualizePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ algorithm?: string; category?: string }>;
}

export default async function VisualizePage({ params, searchParams }: VisualizePageProps) {
  const { locale } = await params;
  const { algorithm, category } = await searchParams;
  setRequestLocale(locale);

  // Require both algorithm and category to access - redirect otherwise
  if (!algorithm || !category) {
    redirect(`/${locale}/topics`);
  }

  return <VisualizeContent initialAlgorithm={algorithm} category={category} />;
}

function VisualizeContent({ initialAlgorithm, category }: { initialAlgorithm?: string; category?: string }) {
  const t = useTranslations();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          {t("nav.visualize")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Select an algorithm and watch it come to life with step-by-step animations
        </p>
      </div>

      {/* Visualizer */}
      <VisualizerClient initialAlgorithm={initialAlgorithm} category={category} />
    </div>
  );
}

