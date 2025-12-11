'use client';

import { useState, useEffect } from 'react';
import { Shield, Activity, Link as LinkIcon, Phone, Upload, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';
import Scanner from '@/components/Scanner';
import DeviceCheck from '@/components/DeviceCheck';
import UrlChecker from '@/components/UrlChecker';
import SpamChecker from '@/components/SpamChecker';
import FileScanner from '@/components/FileScanner';
import LatestNews from '@/components/LatestNews';
import Education from '@/components/Education';
import Disclaimer from '@/components/Disclaimer';

type View = 'scanner' | 'device' | 'url' | 'spam' | 'file' | 'news' | 'education' | 'disclaimer';

export default function Home() {
  const [view, setView] = useState<View>('scanner');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  interface NavButtonProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick: () => void;
    isActive: boolean;
  }

  const NavButton = ({ icon: Icon, label, onClick, isActive }: NavButtonProps) => (
    <button
      onClick={() => {
        onClick();
        setShowMenu(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
        isActive
          ? 'bg-cyan-500 text-white'
          : 'bg-white/5 text-gray-400 hover:bg-white/10'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white">
      <div className="sticky top-4 z-50 px-4 mb-8">
        <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur rounded-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold">QuantumGuard</h1>
                <p className="text-xs text-gray-400">
                  {lang === 'en' ? "India's Cyber Awareness Tool" : 'भारत का साइबर जागरूकता उपकरण'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden px-4 py-2 bg-white/10 rounded-xl"
            >
              ☰
            </button>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
              >
                {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
              </button>
            </div>
          </div>

          <div
            className={`${
              showMenu ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row gap-2 mt-4 md:mt-0`}
          >
            <div className="flex flex-col md:flex-row flex-wrap gap-2 flex-1">
              <NavButton
                icon={Activity}
                label={lang === 'en' ? 'Basic Check' : 'बेसिक चेक'}
                onClick={() => setView('scanner')}
                isActive={view === 'scanner'}
              />
              <NavButton
                icon={LinkIcon}
                label={lang === 'en' ? 'URL Check' : 'URL जांच'}
                onClick={() => setView('url')}
                isActive={view === 'url'}
              />
              <NavButton
                icon={Phone}
                label={lang === 'en' ? 'Spam Check' : 'स्पैम'}
                onClick={() => setView('spam')}
                isActive={view === 'spam'}
              />
              <NavButton
                icon={Upload}
                label={lang === 'en' ? 'File Check' : 'फ़ाइल'}
                onClick={() => setView('file')}
                isActive={view === 'file'}
              />
              <NavButton
                icon={Shield}
                label={lang === 'en' ? 'Device Check' : 'डिवाइस'}
                onClick={() => setView('device')}
                isActive={view === 'device'}
              />
              <NavButton
                icon={Sparkles}
                label={lang === 'en' ? 'Latest Threats' : 'खतरे'}
                onClick={() => setView('news')}
                isActive={view === 'news'}
              />
              <NavButton
                icon={BookOpen}
                label={lang === 'en' ? 'Learn Scams' : 'सीखें'}
                onClick={() => setView('education')}
                isActive={view === 'education'}
              />
              <NavButton
                icon={AlertTriangle}
                label={lang === 'en' ? 'Disclaimer' : 'अस्वीकरण'}
                onClick={() => setView('disclaimer')}
                isActive={view === 'disclaimer'}
              />
            </div>

            <button
              onClick={toggleLang}
              className="md:hidden px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
            >
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-12">
        {view === 'scanner' && <Scanner lang={lang} />}
        {view === 'device' && <DeviceCheck lang={lang} />}
        {view === 'url' && <UrlChecker lang={lang} />}
        {view === 'spam' && <SpamChecker lang={lang} />}
        {view === 'file' && <FileScanner lang={lang} />}
        {view === 'news' && <LatestNews lang={lang} />}
        {view === 'education' && <Education lang={lang} />}
        {view === 'disclaimer' && <Disclaimer lang={lang} />}
      </div>
    </div>
  );
}