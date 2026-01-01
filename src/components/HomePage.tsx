'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  MessageSquare,
  Link as LinkIcon,
  FileText,
  Smartphone,
  Download,
  Mail,
  Lock,
  Database,
  AlertTriangle,
  Newspaper,
  GraduationCap,
  Bot,
  Camera,
  FileCheck,
  Search,
  Brain,
  Phone,
  Siren,
  Users,
  Eye,
  ShieldAlert,
} from 'lucide-react';

interface HomePageProps {
  lang: 'en' | 'hi';
}

interface Feature {
  href: string;
  icon: React.ReactNode;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  category: string;
  categoryHi: string;
}

const FEATURES: Feature[] = [
  {
    href: '/scanner',
    icon: <Shield className="w-6 h-6" />,
    title: 'Universal Scanner',
    titleHi: 'यूनिवर्सल स्कैनर',
    description: 'Scan SMS, URLs, files, and calls in one place',
    descriptionHi: 'एक जगह SMS, URL, फाइल और कॉल स्कैन करें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/sms',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'SMS Guardian',
    titleHi: 'SMS संरक्षक',
    description: 'Detect phishing and scam messages',
    descriptionHi: 'फ़िशिंग और घोटाले के संदेश पहचानें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/url',
    icon: <LinkIcon className="w-6 h-6" />,
    title: 'URL Checker',
    titleHi: 'URL चेकर',
    description: 'Verify link safety before clicking',
    descriptionHi: 'क्लिक करने से पहले लिंक की सुरक्षा जांचें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/file',
    icon: <FileText className="w-6 h-6" />,
    title: 'File Scanner',
    titleHi: 'फ़ाइल स्कैनर',
    description: 'Scan documents and files for malware',
    descriptionHi: 'मैलवेयर के लिए फ़ाइलें स्कैन करें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/apk',
    icon: <Smartphone className="w-6 h-6" />,
    title: 'APK Guardian',
    titleHi: 'APK संरक्षक',
    description: 'Analyze Android apps for threats',
    descriptionHi: 'Android ऐप्स में खतरे खोजें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/downloads',
    icon: <Download className="w-6 h-6" />,
    title: 'Download Scanner',
    titleHi: 'डाउनलोड स्कैनर',
    description: 'Check downloaded files for safety',
    descriptionHi: 'डाउनलोड की गई फ़ाइलों की सुरक्षा जांचें',
    category: 'Core Security',
    categoryHi: 'मुख्य सुरक्षा',
  },
  {
    href: '/aianalyzer',
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Call Analyzer',
    titleHi: 'AI कॉल विश्लेषक',
    description: 'Detect AI-generated scam calls',
    descriptionHi: 'AI द्वारा बनाई कॉल पहचानें',
    category: 'Advanced Detection',
    categoryHi: 'उन्नत पहचान',
  },
  {
    href: '/spam',
    icon: <Mail className="w-6 h-6" />,
    title: 'Spam Checker',
    titleHi: 'स्पैम चेकर',
    description: 'Filter spam emails and messages',
    descriptionHi: 'स्पैम ईमेल और संदेश फ़िल्टर करें',
    category: 'Advanced Detection',
    categoryHi: 'उन्नत पहचान',
  },
  {
    href: '/ransomware',
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Ransomware Detector',
    titleHi: 'रैंसमवेयर डिटेक्टर',
    description: 'Protect against ransomware attacks',
    descriptionHi: 'रैंसमवेयर हमलों से बचाव',
    category: 'Advanced Detection',
    categoryHi: 'उन्नत पहचान',
  },
  {
    href: '/threats',
    icon: <ShieldAlert className="w-6 h-6" />,
    title: 'Threat Intelligence',
    titleHi: 'खतरा खुफिया',
    description: 'Real-time threat monitoring',
    descriptionHi: 'रियल-टाइम खतरा निगरानी',
    category: 'Advanced Detection',
    categoryHi: 'उन्नत पहचान',
  },
  {
    href: '/device',
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Device Check',
    titleHi: 'डिवाइस चेक',
    description: 'Check device security status',
    descriptionHi: 'डिवाइस सुरक्षा स्थिति जांचें',
    category: 'Device Protection',
    categoryHi: 'डिवाइस सुरक्षा',
  },
  {
    href: '/devicescan',
    icon: <Search className="w-6 h-6" />,
    title: 'Device Security Scanner',
    titleHi: 'डिवाइस सुरक्षा स्कैनर',
    description: 'Deep scan for vulnerabilities',
    descriptionHi: 'कमजोरियों के लिए गहरी स्कैन',
    category: 'Device Protection',
    categoryHi: 'डिवाइस सुरक्षा',
  },
  {
    href: '/simprotection',
    icon: <Phone className="w-6 h-6" />,
    title: 'SIM Protection',
    titleHi: 'SIM सुरक्षा',
    description: 'Prevent SIM swap fraud',
    descriptionHi: 'SIM स्वैप धोखाधड़ी रोकें',
    category: 'Device Protection',
    categoryHi: 'डिवाइस सुरक्षा',
  },
  {
    href: '/whatsapp',
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'WhatsApp Ghost Pairing',
    titleHi: 'WhatsApp भूत पेयरिंग',
    description: 'Detect unauthorized WhatsApp access',
    descriptionHi: 'अनधिकृत WhatsApp एक्सेस पहचानें',
    category: 'Device Protection',
    categoryHi: 'डिवाइस सुरक्षा',
  },
  {
    href: '/encryption',
    icon: <Lock className="w-6 h-6" />,
    title: 'File Encryption',
    titleHi: 'फ़ाइल एन्क्रिप्शन',
    description: 'Encrypt sensitive files',
    descriptionHi: 'संवेदनशील फ़ाइलें एन्क्रिप्ट करें',
    category: 'Privacy & Data',
    categoryHi: 'गोपनीयता और डेटा',
  },
  {
    href: '/breach',
    icon: <Database className="w-6 h-6" />,
    title: 'Data Breach Checker',
    titleHi: 'डेटा ब्रीच चेकर',
    description: 'Check if your data was leaked',
    descriptionHi: 'जांचें कि आपका डेटा लीक हुआ है',
    category: 'Privacy & Data',
    categoryHi: 'गोपनीयता और डेटा',
  },
  {
    href: '/privacy',
    icon: <Eye className="w-6 h-6" />,
    title: 'Privacy Shield',
    titleHi: 'प्राइवेसी शील्ड',
    description: 'Protect your online privacy',
    descriptionHi: 'अपनी ऑनलाइन गोपनीयता सुरक्षित रखें',
    category: 'Privacy & Data',
    categoryHi: 'गोपनीयता और डेटा',
  },
  {
    href: '/evidence',
    icon: <Camera className="w-6 h-6" />,
    title: 'Evidence Collector',
    titleHi: 'साक्ष्य संग्रहकर्ता',
    description: 'Collect legal evidence of scams',
    descriptionHi: 'घोटालों के कानूनी साक्ष्य एकत्र करें',
    category: 'Legal & Evidence',
    categoryHi: 'कानूनी और साक्ष्य',
  },
  {
    href: '/report',
    icon: <FileCheck className="w-6 h-6" />,
    title: 'Police Reporter',
    titleHi: 'पुलिस रिपोर्टर',
    description: 'File complaints with authorities',
    descriptionHi: 'अधिकारियों को शिकायत दर्ज करें',
    category: 'Legal & Evidence',
    categoryHi: 'कानूनी और साक्ष्य',
  },
  {
    href: '/scamdb',
    icon: <Database className="w-6 h-6" />,
    title: 'Scam Database',
    titleHi: 'घोटाला डेटाबेस',
    description: 'Browse known scams and frauds',
    descriptionHi: 'ज्ञात घोटालों को ब्राउज़ करें',
    category: 'Legal & Evidence',
    categoryHi: 'कानूनी और साक्ष्य',
  },
  {
    href: '/emergency',
    icon: <Siren className="w-6 h-6" />,
    title: 'Emergency Contact',
    titleHi: 'आपातकालीन संपर्क',
    description: 'Quick access to cyber helplines',
    descriptionHi: 'साइबर हेल्पलाइन तक त्वरित पहुंच',
    category: 'Emergency & Support',
    categoryHi: 'आपातकालीन और सहायता',
  },
  {
    href: '/awareness',
    icon: <Users className="w-6 h-6" />,
    title: 'Scam Awareness Center',
    titleHi: 'घोटाला जागरूकता केंद्र',
    description: 'Learn about latest scam tactics',
    descriptionHi: 'नवीनतम घोटाले की रणनीति जानें',
    category: 'Emergency & Support',
    categoryHi: 'आपातकालीन और सहायता',
  },
  {
    href: '/news',
    icon: <Newspaper className="w-6 h-6" />,
    title: 'Latest News',
    titleHi: 'ताज़ा खबर',
    description: 'Stay updated on cyber threats',
    descriptionHi: 'साइबर खतरों पर अपडेट रहें',
    category: 'Education & News',
    categoryHi: 'शिक्षा और समाचार',
  },
  {
    href: '/education',
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'Education',
    titleHi: 'शिक्षा',
    description: 'Learn cyber safety basics',
    descriptionHi: 'साइबर सुरक्षा मूल बातें सीखें',
    category: 'Education & News',
    categoryHi: 'शिक्षा और समाचार',
  },
  {
    href: '/aboutai',
    icon: <Bot className="w-6 h-6" />,
    title: 'About AI',
    titleHi: 'AI के बारे में',
    description: 'How our AI protects you',
    descriptionHi: 'हमारा AI आपको कैसे सुरक्षित करता है',
    category: 'Education & News',
    categoryHi: 'शिक्षा और समाचार',
  },
];

export default function HomePage({ lang }: HomePageProps) {
  const categories = Array.from(
    new Set(FEATURES.map((f) => (lang === 'en' ? f.category : f.categoryHi)))
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {lang === 'en'
              ? "India's #1 AI Cyber Protection"
              : 'भारत की #1 AI साइबर सुरक्षा'}
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Protect yourself from scams, frauds, and cyber threats.'
              : 'घोटालों, धोखाधड़ी और साइबर खतरों से खुद को सुरक्षित रखें।'}
          </p>

          <Link
            href="/scanner"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            {lang === 'en' ? 'Start Protection' : 'सुरक्षा शुरू करें'}
          </Link>
        </div>

        {/* Features Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryFeatures = FEATURES.filter(
              (f) => (lang === 'en' ? f.category : f.categoryHi) === category
            );

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6 text-blue-400">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryFeatures.map((feature) => (
                    <Link
                      key={feature.href}
                      href={feature.href}
                      className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all group block"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-all">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 text-white">
                            {lang === 'en' ? feature.title : feature.titleHi}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {lang === 'en'
                              ? feature.description
                              : feature.descriptionHi}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl font-bold text-blue-400 mb-2">26</div>
            <div className="text-gray-400">
              {lang === 'en' ? 'Security Features' : 'सुरक्षा सुविधाएं'}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl font-bold text-purple-400 mb-2">AI</div>
            <div className="text-gray-400">
              {lang === 'en' ? 'Powered Detection' : 'संचालित पहचान'}
            </div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
            <div className="text-gray-400">
              {lang === 'en' ? 'Protection' : 'सुरक्षा'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}