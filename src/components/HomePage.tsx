'use client';

import { 
  Home, Shield, Scan, Link as LinkIcon, MessageSquare, FileText,
  Database, Lock, AlertTriangle, Smartphone, Download, TrendingUp,
  GraduationCap, Brain, Camera, Phone, Search, MessageCircle,
  Newspaper, Activity
} from 'lucide-react';

import type { TabId } from '@/types/navigation';

interface HomePageProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
  lang: 'en' | 'hi';
}

export default function HomePage({ activeTab, onNavigate, lang }: HomePageProps) {
  const t = {
    hero: {
      title: lang === 'en' ? "India's #1 AI Cyber Protection" : "भारत की #1 AI साइबर सुरक्षा",
      subtitle:
        lang === 'en'
          ? 'Protect yourself from scams, fraud, and cyber threats'
          : 'घोटालों और साइबर खतरों से खुद को सुरक्षित रखें',
      cta: lang === 'en' ? 'Start Protection' : 'सुरक्षा शुरू करें',
    },
  };

  /** ✅ IMPORTANT FIX:
   *  Explicitly type tool.id as TabId
   */
  const emergencyTools: {
    id: TabId;
    label: string;
    description: string;
    icon: any;
    gradient: string;
  }[] = [
    {
      id: 'evidence',
      label: lang === 'en' ? '📸 Evidence Collector' : '📸 सबूत संग्रह',
      description: lang === 'en' ? 'Record scam evidence' : 'घोटाले का प्रमाण रिकॉर्ड करें',
      icon: Camera,
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      id: 'report',
      label: lang === 'en' ? '🚔 Police Report' : '🚔 पुलिस रिपोर्ट',
      description: lang === 'en' ? 'File cyber complaint' : 'साइबर शिकायत दर्ज करें',
      icon: Phone,
      gradient: 'from-red-600 to-orange-600',
    },
    {
      id: 'emergency',
      label: lang === 'en' ? '📞 Emergency Contacts' : '📞 आपात संपर्क',
      description: lang === 'en' ? 'Quick emergency help' : 'त्वरित सहायता',
      icon: Activity,
      gradient: 'from-green-600 to-teal-600',
    },
    {
      id: 'scamdb',
      label: lang === 'en' ? '🗄️ Scam Database' : '🗄️ घोटाला डेटाबेस',
      description: lang === 'en' ? 'Check known scams' : 'ज्ञात घोटाले देखें',
      icon: Search,
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      id: 'aianalyzer',
      label: lang === 'en' ? '🧠 AI Call Analyzer' : '🧠 AI कॉल विश्लेषक',
      description: lang === 'en' ? 'Detect scam calls' : 'घोटाला कॉल पहचानें',
      icon: Brain,
      gradient: 'from-indigo-600 to-blue-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t.hero.title}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {t.hero.subtitle}
        </p>

        <button
          onClick={() => onNavigate('scanner')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-bold"
        >
          {t.hero.cta}
        </button>
      </div>

      {/* EMERGENCY TOOLS */}
      <div className="grid md:grid-cols-5 gap-4">
        {emergencyTools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            className={`bg-gradient-to-br ${tool.gradient} p-6 rounded-xl hover:scale-105 transition text-left`}
          >
            <tool.icon className="w-12 h-12 mb-3" />
            <h3 className="font-bold text-sm mb-1">{tool.label}</h3>
            <p className="text-xs opacity-90">{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
