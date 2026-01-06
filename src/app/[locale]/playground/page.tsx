import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PracticeClient } from "@/ui/practice/PracticeClient";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ algorithm?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: "Code Playground - Algo Arcade Lab",
    description: "Write, run, and visualize sorting algorithms in real-time",
  };
}

export default async function PlaygroundPage({ searchParams }: PageProps) {
  const { algorithm } = await searchParams;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <PracticeClient initialAlgorithm={algorithm} />
      </div>
    </main>
  );
}
