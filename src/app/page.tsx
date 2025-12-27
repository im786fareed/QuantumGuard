'use client';

import type { TabId } from '@/types/navigation';
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
  Search,
} from 'lucide-react';

// Core pages
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

// Anti-scam
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

type Language = 'en' | 'hi';

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
    { id: 'privacy' as TabId, label: 'Privacy Shield', icon: Lock },
  ],
  hi: [],
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

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            activeTab={activeTab}
            onNavigate={handleNavigate}
            lang={language}
          />
        );

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
        return (
          <HomePage
            activeTab={activeTab}
            onNavigate={handleNavigate}
            lang={language}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <InstallPrompt />
      <main className="min-h-screen">{renderContent()}</main>
    </div>
  );
}
