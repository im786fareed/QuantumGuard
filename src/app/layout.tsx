import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: 'QuantumGuard - AI-Powered Cyber Fraud Prevention',
  description: 'Advanced machine learning algorithms detect scams, phishing, and cyber threats. Protect yourself with AI-powered fraud detection for India.',
  openGraph: {
    title: 'QuantumGuard - AI-Powered Cyber Fraud Prevention',
    description: 'India\'s first AI-driven cyber safety platform. Detect scams, phishing, and malware with advanced ML algorithms.',
    url: 'https://quantumguard-ten.vercel.app',
    siteName: 'QuantumGuard',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QuantumGuard AI Cyber Protection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuantumGuard - AI-Powered Cyber Fraud Prevention',
    description: 'India\'s first AI-driven cyber safety platform',
    images: ['/og-image.png'],
  },
  keywords: ['cyber security', 'fraud detection', 'AI', 'India', 'scam protection', 'phishing detection', 'malware scanner'],
};

// Add these PWA-specific exports (important!)
export const viewport = {
  themeColor: '#7e22ce',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Essential Tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#7e22ce" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QuantumGuard" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}