'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Scan,
  TrendingUp,
  Shield,
  MessageSquare,
  Download,
  Link as LinkIcon,
  FileSearch,
  Lock,
  Database,
  AlertTriangle,
  Smartphone,
  GraduationCap,
  Brain,
  Camera,
  Phone,
  MessageCircle,
  Newspaper,
  Search,
} from 'lucide-react';

import type { TabId } from '@/types/navigation';

type Language = 'en' | 'hi';

type NavItem = {
  id: TabId;
  label: string;
  icon: React.ElementType;
  href: string;
};

const NAV_ITEMS: Record<Language, NavItem[]> = {
  en: [
    { id: 'home', label: 'Home', icon: Home, href: '/home' },
    { id: 'scanner', label: 'AI Scanner', icon: Scan, href: '/scanner' },
    { id: 'threats', label: 'Threat Intel', icon: TrendingUp, href: '/threats' },
    { id: 'apk', label: 'APK Guardian', icon: Shield, href: '/apk' },
    { id: 'sms', label: 'SMS Guardian', icon: MessageSquare, href: '/sms' },
    { id: 'downloads', label: 'Download Scanner', icon: Download, href: '/downloads' },
    { id: 'url', label: 'URL Check', icon: LinkIcon, href: '/url' },
    { id: 'spam', label: 'Spam AI', icon: MessageSquare, href: '/spam' },
    { id: 'file', label: 'File Scan', icon: FileSearch, href: '/file' },
    { id: 'encryption', label: 'File Encryption', icon: Lock, href: '/encryption' },
    { id: 'breach', label: 'Breach Check', icon: Database, href: '/breach' },
    { id: 'ransomware', label: 'Ransomware Detect', icon: AlertTriangle, href: '/ransomware' },
    { id: 'device', label: 'Device Check', icon: Smartphone, href: '/device' },
    { id: 'news', label: 'Latest Threats', icon: TrendingUp, href: '/news' },
    { id: 'education', label: 'Learn Safety', icon: GraduationCap, href: '/education' },
    { id: 'aboutai', label: 'AI Tech', icon: Brain, href: '/aboutai' },
    { id: 'evidence', label: 'Evidence Collector', icon: Camera, href: '/evidence' },
    { id: 'report', label: 'Police Report', icon: Shield, href: '/report' },
    { id: 'scamdb', label: 'Scam Database', icon: Database, href: '/scamdb' },
    { id: 'aianalyzer', label: 'AI Call Analyzer', icon: Brain, href: '/aianalyzer' },
    { id: 'emergency', label: 'Emergency Contacts', icon: Phone, href: '/emergency' },
    { id: 'simprotection', label: 'SIM Protection', icon: Smartphone, href: '/simprotection' },
    { id: 'devicescan', label: 'Device Scanner', icon: Search, href: '/devicescan' },
    { id: 'whatsapp', label: 'WhatsApp Safety', icon: MessageCircle, href: '/whatsapp' },
    { id: 'awareness', label: 'Scam Alerts', icon: Newspaper, href: '/awareness' },
    { id: 'privacy', label: 'Privacy Shield', icon: Lock, href: '/privacy' },
  ],
  hi: [],
};

export default function Sidebar({ language = 'en' }: { language?: Language }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 h-full border-r border-white/10 bg-black/30 backdrop-blur">
      <nav className="p-4 space-y-1">
        {NAV_ITEMS[language].map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  active ? 'scale-110' : 'group-hover:scale-110'
                }`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}