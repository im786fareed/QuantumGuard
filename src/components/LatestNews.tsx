'use client';
import { Sparkles, AlertTriangle, ExternalLink, TrendingUp, Shield } from 'lucide-react';
interface Props {
  lang: 'en' | 'hi';
}
export default function LatestNews({ lang }: Props) {
  const title = lang === 'en' ? 'Latest Cyber Threats' : 'Latest Threats';
  const subtitle = lang === 'en' ? 'Stay informed about emerging scams' : 'Stay informed';
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Sparkles className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 text-lg">{subtitle}</p>
      </div>
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-red-500/50 shadow-lg shadow-red-500/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full flex items-center gap-2 animate-pulse">
              <TrendingUp className="w-3 h-3" />
              BREAKING
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" />
              CRITICAL
            </div>
            <span className="text-sm text-gray-500">Dec 2024</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">Digital Arrest Scams Cost Rs 2140 Crore</h3>
          <p className="text-gray-300 mb-4">Over 92000 cases. Scammers impersonate CBI ED Police via video calls.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Source: I4C MHA</span>
            </div>
            <a href="https://www.vifindia.org/article/2024/november/26/The-Growing-Problem-of-Digital-Arrest-Scams-in-Bharat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold transition">
              Read More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">HIGH RISK</div>
            <span className="text-sm text-gray-500">Nov 2024</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">UPI Fraud Surge 85 Percent</h3>
          <p className="text-gray-300 mb-4">6.32 lakh cases. Rs 485 crore lost. New QR code scams.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Source: Ministry of Finance</span>
            </div>
            <a href="https://cyberpeace.org/resources/blogs/domestic-upi-frauds-finance-ministry-presented-data-in-loksabha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold transition">
              Read More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold rounded-full">MEDIUM</div>
            <span className="text-sm text-gray-500">Dec 2024</span>
          </div>
          <h3 className="text-2xl font-bold mb-3">Fake KYC Update Scams</h3>
          <p className="text-gray-300 mb-4">SMS phishing links steal bank details and OTPs.</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Source: RBI Advisory</span>
            </div>
            <a href="https://rbi.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold transition">
              Read More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur rounded-2xl border border-purple-400/30 p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Protected</h3>
        <p className="text-gray-300 mb-6">Check daily for alerts</p>
        <button onClick={() => { const msg = 'Stay safe Check QuantumGuard'; if (navigator.share) { navigator.share({ text: msg }); } else { navigator.clipboard.writeText(msg); alert('Copied'); } }} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition">
          Share Alert
        </button>
      </div>
    </div>
  );
}
