import type { Metadata } from "next";
import { Geist } from "next/font/google";
import StickyAppBanner from "@/components/conversion/StickyAppBanner";
import { SITE_URL, APP_STORE_URL, GOOGLE_PLAY_URL, APP_STORE_ID } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Learn Korean - How to Say Any Word in Korean",
    template: "%s | Learn Korean",
  },
  description:
    "Free Korean dictionary with 10,000+ words, native pronunciation, and example sentences. Learn how to say any word in Korean.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Learn Korean",
  },
  other: {
    "apple-itunes-app": `app-id=${APP_STORE_ID}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {/* Header */}
        <header className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-bold text-gray-900">
              Learn Korean
            </a>
            <div className="flex items-center gap-2">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700"
              >
                App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700"
              >
                Google Play
              </a>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-gray-50 pb-24">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm text-gray-500">
            <p className="font-semibold text-gray-900">Learn Korean App</p>
            <p className="mt-2">
              Master Korean with 10,000+ words, AI-powered conversation
              practice, and native pronunciation.
            </p>
            <p className="mt-4">&copy; {new Date().getFullYear()} Learn Korean. All rights reserved.</p>
          </div>
        </footer>

        <StickyAppBanner />
      </body>
    </html>
  );
}
