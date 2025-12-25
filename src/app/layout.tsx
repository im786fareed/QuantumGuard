import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
<head>
  <meta name="referrer" content="no-referrer" />
  {/* Optional: Strict CSP for testing */}
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://platform.twitter.com;" />
</head>

export const metadata: Metadata = {
  title: "QuantumGuard - AI-Powered Cyber Fraud Prevention",
  description: "India's First AI Anti-APK Shield. AI-powered protection against cyber fraud, phishing, APK malware, ransomware, and data breaches.",
  keywords: "cyber security, fraud detection, AI, India, scam protection, APK blocker",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QuantumGuard"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}