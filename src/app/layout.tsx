import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantumShield - India's #1 AI Cyber Protection Platform",
  description:
    "Protect yourself from scams, fraud, and cyber threats with AI-powered security tools. Free for all Indians.",
  keywords:
    "cybersecurity, India, scam protection, digital arrest, fraud detection, AI security, cyber safety",
  authors: [{ name: "QuantumShield Team" }],
  creator: "QuantumShield",
  publisher: "QuantumShield",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://quantumshield.in",
    title: "QuantumShield - India's #1 AI Cyber Protection",
    description:
      "Protect yourself from cyber scams and fraud using AI-powered tools.",
    siteName: "QuantumShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumShield - AI Cyber Protection",
    description: "India's #1 cybersecurity platform - Free & AI-powered",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QuantumShield" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="canonical" href="https://quantumshield.in" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col`}
      >
        {/* HEADER */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo className="w-10 h-10" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    QuantumShield
                  </h1>
                  <p className="text-xs text-gray-400">
                    AI Cyber Protection
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <a
                  href="tel:1930"
                  className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                >
                  🚨 Emergency: 1930
                </a>

                <a
                  href="mailto:quantumshield4india@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  📧 Support
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="bg-black/50 border-t border-white/10 mt-12 py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Logo className="w-8 h-8" />
                  <span className="font-bold text-lg">QuantumShield</span>
                </div>

                <p className="text-sm text-gray-400 max-w-md">
                  QuantumShield is an AI-powered cyber safety platform designed to
                  protect individuals from scams, fraud, phishing, and digital
                  threats across the modern internet.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a
                      href="mailto:quantumshield4india@gmail.com"
                      className="hover:text-white transition"
                    >
                      Email Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:1930"
                      className="hover:text-white transition"
                    >
                      Emergency Helpline (India)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Disclaimer</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} QuantumShield. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
