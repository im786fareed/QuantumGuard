import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuantumGuard - AI-Powered Cyber Fraud Prevention',
  description: 'Advanced machine learning algorithms detect scams, phishing, and cyber threats. Protect yourself with AI-powered fraud detection for India.',
  openGraph: {
    title: 'QuantumGuard - AI-Powered Cyber Fraud Prevention',
    description: 'India\'s first AI-driven cyber safety platform. Detect scams, phishing, and malware with advanced ML algorithms.',
    url: 'https://quantumguard-3axu68sqf-shaik-fareeds-projects.vercel.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}