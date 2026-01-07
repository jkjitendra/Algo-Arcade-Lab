"use client";

import { useTranslations, useLocale } from "next-intl";
import { BookOpen, Sparkles, Rocket, Bell } from "lucide-react";
import Link from "next/link";

export default function CheatsheetPage() {
  const t = useTranslations("pages.cheatsheet");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary-500)]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-secondary-500)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-secondary-500)]/20 mb-8 relative">
            <BookOpen className="w-16 h-16 text-[var(--color-primary-500)]" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/20 mb-6">
            <Rocket className="w-4 h-4 text-[var(--color-primary-500)]" />
            <span className="text-sm font-semibold text-[var(--color-primary-500)]">
              {t("comingSoon")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
            {t("title").split(" ")[0]}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] pb-1">
              {t("title").split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
            {t("subtitle")}
          </p>

          {/* Features Preview */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("feature1Title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("feature1Text")}
              </p>
            </div>

            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary-500)]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("feature2Title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("feature2Text")}
              </p>
            </div>

            <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-primary)] p-6 text-left">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                {t("feature3Title")}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("feature3Text")}
              </p>
            </div>
          </div>

          {/* Notify Me Card */}
          <div className="bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 rounded-2xl border border-[var(--border-primary)] p-8 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-[var(--color-primary-500)]" />
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {t("notifyTitle")}
              </h3>
            </div>
            <p className="text-[var(--text-secondary)] mb-6">
              {t("notifyText")}
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent transition-all"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                {t("notifyButton")}
              </button>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors"
            >
              ← {t("backHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
