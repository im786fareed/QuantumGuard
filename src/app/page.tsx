'use client';

import { useState } from 'react';
import {
  Scan,
  Link as LinkIcon,
  MessageSquare,
  FileSearch,
  Smartphone,
  TrendingUp,
  GraduationCap,
  Brain,
  Menu,
  X,
  Globe,
  Shield,
  Lock,
  Database,
  AlertTriangle,
  Download,
  Home as HomeIcon,
  Camera,
  Phone,
  MessageCircle,
  Newspaper,
  Search
} from 'lucide-react';

// Import existing components
import HomePage from '@/components/HomePage';
import Scanner from '@/components/Scanner';
import ThreatIntelligence from '@/components/ThreatIntelligence';
import APKGuardian from '@/components/APKGuardian';
import SMSGuardian from '@/components/SMSGuardian';
import DownloadScanner from '@/components/DownloadScanner';
import UrlChecker from '@/components/UrlChecker';
import SpamChecker from '@/components/SpamChecker';
import FileScanner from '@/components/FileScanner';
import FileEncryption from '@/components/FileEncryption';
import DataBreachChecker from '@/components/DataBreachChecker';
import RansomwareDetector from '@/components/RansomwareDetector';
import DeviceCheck from '@/components/DeviceCheck';
import LatestNews from '@/components/LatestNews';
import Education from '@/components/Education';
import AboutAI from '@/components/AboutAI';
import InstallPrompt from '@/components/InstallPrompt';

// Import NEW anti-scam components
import EvidenceCollector from '@/components/EvidenceCollector';
import PoliceReporter from '@/components/PoliceReporter';
import ScamDatabase from '@/components/ScamDatabase';
import AICallAnalyzer from '@/components/AICallAnalyzer';
import EmergencyContact from '@/components/EmergencyContact';
import SIMProtection from '@/components/SIMProtection';
import DeviceSecurityScanner from '@/components/DeviceSecurityScanner';
import WhatsAppGhostPairing from '@/components/WhatsAppGhostPairing';
import ScamAwarenessCenter from '@/components/ScamAwarenessCenter';
import PrivacyShield from '@/components/PrivacyShield';

// ────────────────────────────────────────────────────────────────
// Types (kept locally in this file for now)
// ────────────────────────────────────────────────────────────────
type TabId =
  | 'home'
  | 'scanner'
  | 'apk'
  | 'url'
  | 'spam'
  | 'file'
  | 'encryption'
  | 'breach'
  | 'ransomware'
  | 'device'
  | 'news'
  | 'education'
  | 'aboutai'
  | 'threats'
  | 'sms'
  | 'downloads'
  | 'evidence'
  | 'report'
  | 'scamdb'
  | 'aianalyzer'
  | 'emergency'
  | 'simprotection'
  | 'devicescan'
  | 'whatsapp'
  | 'awareness'
  | 'privacy';

type Language = 'en' | 'hi';

// ────────────────────────────────────────────────────────────────
// Navigation items (bilingual)
// ────────────────────────────────────────────────────────────────
const NAV_ITEMS = {
  en: [
    { id: 'home' as TabId, label: 'Home', icon: HomeIcon },
    { id: 'scanner' as TabId, label: 'AI Scanner', icon: Scan },
    { id: 'threats' as TabId, label: 'Threat Intel', icon: TrendingUp },
    { id: 'apk' as TabId, label: 'APK Guardian', icon: Shield },
    { id: 'sms' as TabId, label: 'SMS Guardian', icon: MessageSquare },
    { id: 'downloads' as TabId, label: 'Download Scanner', icon: Download },
    { id: 'url' as TabId, label: 'URL Check', icon: LinkIcon },
    { id: 'spam' as TabId, label: 'Spam AI', icon: MessageSquare },
    { id: 'file' as TabId, label: 'File Scan', icon: FileSearch },
    { id: 'encryption' as TabId, label: 'File Encryption', icon: Lock },
    { id: 'breach' as TabId, label: 'Breach Check', icon: Database },
    { id: 'ransomware' as TabId, label: 'Ransomware Detect', icon: AlertTriangle },
    { id: 'device' as TabId, label: 'Device Check', icon: Smartphone },
    { id: 'news' as TabId, label: 'Latest Threats', icon: TrendingUp },
    { id: 'education' as TabId, label: 'Learn Safety', icon: GraduationCap },
    { id: 'aboutai' as TabId, label: 'AI Tech', icon: Brain },
    { id: 'evidence' as TabId, label: 'Evidence Collector', icon: Camera },
    { id: 'report' as TabId, label: 'Police Report', icon: Shield },
    { id: 'scamdb' as TabId, label: 'Scam Database', icon: Database },
    { id: 'aianalyzer' as TabId, label: 'AI Call Analyzer', icon: Brain },
    { id: 'emergency' as TabId, label: 'Emergency Contacts', icon: Phone },
    { id: 'simprotection' as TabId, label: 'SIM Protection', icon: Smartphone },
    { id: 'devicescan' as TabId, label: 'Device Scanner', icon: Search },
    { id: 'whatsapp' as TabId, label: 'WhatsApp Safety', icon: MessageCircle },
    { id: 'awareness' as TabId, label: 'Scam Alerts', icon: Newspaper },
    { id: 'privacy' as TabId, label: 'Privacy Shield', icon: Lock }
  ],
  hi: [
    { id: 'home' as TabId, label: 'होम', icon: HomeIcon },
    { id: 'scanner' as TabId, label: 'AI स्कैनर', icon: Scan },
    { id: 'threats' as TabId, label: 'खतरा इंटेल', icon: TrendingUp },
    { id: 'apk' as TabId, label: 'APK गार्डियन', icon: Shield },
    { id: 'sms' as TabId, label: 'SMS गार्डियन', icon: MessageSquare },
    { id: 'downloads' as TabId, label: 'डाउनलोड स्कैनर', icon: Download },
    { id: 'url' as TabId, label: 'URL जांच', icon: LinkIcon },
    { id: 'spam' as TabId, label: 'स्पैम AI', icon: MessageSquare },
    { id: 'file' as TabId, label: 'फ़ाइल स्कैन', icon: FileSearch },
    { id: 'encryption' as TabId, label: 'फ़ाइल एन्क्रिप्शन', icon: Lock },
    { id: 'breach' as TabId, label: 'ब्रीच जांच', icon: Database },
    { id: 'ransomware' as TabId, label: 'रैंसमवेयर पहचान', icon: AlertTriangle },
    { id: 'device' as TabId, label: 'डिवाइस जांच', icon: Smartphone },
    { id: 'news' as TabId, label: 'नवीनतम खतरे', icon: TrendingUp },
    { id: 'education' as TabId, label: 'सुरक्षा सीखें', icon: GraduationCap },
    { id: 'aboutai' as TabId, label: 'AI तकनीक', icon: Brain },
    { id: 'evidence' as TabId, label: 'सबूत संग्रहकर्ता', icon: Camera },
    { id: 'report' as TabId, label: 'पुलिस रिपोर्ट', icon: Shield },
    { id: 'scamdb' as TabId, label: 'घोटाला डेटाबेस', icon: Database },
    { id: 'aianalyzer' as TabId, label: 'AI कॉल विश्लेषक', icon: Brain },
    { id: 'emergency' as TabId, label: 'आपातकालीन संपर्क', icon: Phone },
    { id: 'simprotection' as TabId, label: 'SIM सुरक्षा', icon: Smartphone },
    { id: 'devicescan' as TabId, label: 'डिवाइस स्कैनर', icon: Search },
    { id: 'whatsapp' as TabId, label: 'व्हाट्सएप सुरक्षा', icon: MessageCircle },
    { id: 'awareness' as TabId, label: 'घोटाला अलर्ट', icon: Newspaper },
    { id: 'privacy' as TabId, label: 'गोपनीयता शील्ड', icon: Lock }
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} lang={language} />;
      case 'scanner':
        return <Scanner lang={language} />;
      case 'threats':
        return <ThreatIntelligence lang={language} />;
      case 'apk':
        return <APKGuardian lang={language} />;
      case 'sms':
        return <SMSGuardian lang={language} />;
      case 'downloads':
        return <DownloadScanner lang={language} />;
      case 'url':
        return <UrlChecker lang={language} />;
      case 'spam':
        return <SpamChecker lang={language} />;
      case 'file':
        return <FileScanner lang={language} />;
      case 'encryption':
        return <FileEncryption lang={language} />;
      case 'breach':
        return <DataBreachChecker lang={language} />;
      case 'ransomware':
        return <RansomwareDetector lang={language} />;
      case 'device':
        return <DeviceCheck lang={language} />;
      case 'news':
        return <LatestNews lang={language} />;
      case 'education':
        return <Education lang={language} />;
      case 'aboutai':
        return <AboutAI lang={language} />;
      case 'evidence':
        return <EvidenceCollector lang={language} />;
      case 'report':
        return <PoliceReporter lang={language} />;
      case 'scamdb':
        return <ScamDatabase lang={language} />;
      case 'aianalyzer':
        return <AICallAnalyzer lang={language} />;
      case 'emergency':
        return <EmergencyContact lang={language} />;
      case 'simprotection':
        return <SIMProtection lang={language} />;
      case 'devicescan':
        return <DeviceSecurityScanner lang={language} />;
      case 'whatsapp':
        return <WhatsAppGhostPairing lang={language} />;
      case 'awareness':
        return <ScamAwarenessCenter lang={language} />;
      case 'privacy':
        return <PrivacyShield lang={language} />;
      default:
        return <HomePage onNavigate={handleNavigate} lang={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <InstallPrompt />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">QuantumShield</h1>
              <p className="text-xs text-gray-400">AI Cyber Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">{language === 'en' ? 'EN' : 'हिं'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 h-[calc(100vh-73px)] sticky top-[73px] bg-black/30 backdrop-blur-lg border-r border-white/10 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {NAV_ITEMS[language].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] z-40 bg-black/95 backdrop-blur-lg overflow-y-auto">
            <nav className="p-4 space-y-1">
              {NAV_ITEMS[language].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                        : 'hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-3">
                {language === 'en' ? 'About' : 'के बारे में'}
              </h3>
              <p className="text-sm text-gray-400">
                {language === 'en'
                  ? 'AI-powered cybersecurity platform protecting Indians from digital threats.'
                  : 'AI-संचालित साइबर सुरक्षा प्लेटफ़ॉर्म जो भारतीयों को डिजिटल खतरों से बचाता है।'}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">
                {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleNavigate('home')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'Home' : 'होम'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('scanner')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'AI Scanner' : 'AI स्कैनर'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('education')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'Learn' : 'सीखें'}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">
                {language === 'en' ? 'Emergency Tools' : 'आपातकालीन उपकरण'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleNavigate('evidence')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'Evidence Collector' : 'सबूत संग्रहकर्ता'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('report')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'Police Report' : 'पुलिस रिपोर्ट'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('emergency')} className="hover:text-cyan-400 transition">
                    {language === 'en' ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">
                {language === 'en' ? 'Contact' : 'संपर्क'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Cybercrime Helpline: 1930</li>
                <li>Emergency: 100</li>
                <li>cybercrime.gov.in</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 QuantumShield. {language === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}</p>
            <p className="mt-2">
              {language === 'en'
                ? 'Made with ❤️ for Indians | 100% Free | 100% Legal | 100% Privacy-First'
                : 'भारतीयों के लिए ❤️ से बनाया गया | 100% मुफ्त | 100% कानूनी | 100% गोपनीयता-प्रथम'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}