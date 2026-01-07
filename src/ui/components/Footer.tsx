"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("app");
  const locale = useLocale();

  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] pb-1">
                Algo Arcade Lab
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Master algorithms through interactive visualizations. The most intuitive way to learn Data Structures and Algorithms.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-6">Product</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href={`/${locale}/topics`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/playground`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Code Playground
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#pricing`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cheatsheet`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Cheatsheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cancellation-policy`} className="hover:text-[var(--color-primary-500)] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-primary)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} {t("name") || "Algo Arcade Lab"}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Mail className="w-4 h-4" />
            <span>hello@algoarcadelab.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
