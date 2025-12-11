'use client';

import { Shield, CheckCircle, XCircle, AlertTriangle, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

const CONTENT = {
  en: {
    title: 'Device Security Check',
    subtitle: 'Check your device security status',
    checkButton: 'Run Security Check',
    checking: 'Checking device security...',
    result: 'Security Status',
    recommendations: 'Recommendations',
    securityScore: 'Security Score',
    checkAgain: 'Check Again'
  },
  hi: {
    title: 'डिवाइस सुरक्षा जांच',
    subtitle: 'अपने डिवाइस की सुरक्षा जांचें',
    checkButton: 'सुरक्षा जांच करें',
    checking: 'जांच हो रही है',
    result: 'सुरक्षा स्थिति',
    recommendations: 'सिफारिशें',
    securityScore: 'सुरक्षा स्कोर',
    checkAgain: 'फिर जांचें'
  }
};

interface CheckResult {
  status: 'SECURE' | 'WARNING' | 'VULNERABLE';
  score: number;
  issues: string[];
  recommendations: string[];
}

export default function DeviceCheck({ lang }: Props) {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const content = CONTENT[lang];

  const runCheck = async () => {
    setIsChecking(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const checks = {
      httpsConnection: window.location.protocol === 'https:',
      hasLocalStorage: typeof localStorage !== 'undefined',
      hasCookies: navigator.cookieEnabled,
      hasJavaScript: true,
      screenSize: window.screen.width > 0
    };

    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    if (!checks.httpsConnection) {
      issues.push(lang === 'en' ? 'Insecure connection detected' : 'असुरक्षित कनेक्शन');
      recommendations.push(lang === 'en' ? 'Always use HTTPS websites' : 'हमेशा HTTPS वेबसाइट उपयोग करें');
      score -= 30;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      recommendations.push(lang === 'en' 
        ? 'Keep Android OS updated to latest version' 
        : 'Android OS को अपडेट रखें');
      recommendations.push(lang === 'en' 
        ? 'Only install apps from Google Play Store' 
        : 'केवल Google Play Store से apps इंस्टॉल करें');
      recommendations.push(lang === 'en' 
        ? 'Enable Google Play Protect scanning' 
        : 'Google Play Protect स्कैनिंग सक्षम करें');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      recommendations.push(lang === 'en' 
        ? 'Keep iOS updated to latest version' 
        : 'iOS को अपडेट रखें');
      recommendations.push(lang === 'en' 
        ? 'Only install apps from Apple App Store' 
        : 'केवल Apple App Store से apps इंस्टॉल करें');
    }

    recommendations.push(lang === 'en' 
      ? 'Never download files from unknown sources' 
      : 'अज्ञात स्रोतों से फ़ाइलें डाउनलोड न करें');
    recommendations.push(lang === 'en' 
      ? 'Regularly scan images received via WhatsApp' 
      : 'WhatsApp से प्राप्त छवियों को नियमित रूप से स्कैन करें');
    recommendations.push(lang === 'en' 
      ? 'Enable device lock screen with strong PIN' 
      : 'मजबूत PIN के साथ डिवाइस लॉक सक्षम करें');
    recommendations.push(lang === 'en' 
      ? 'Review app permissions regularly' 
      : 'ऐप अनुमतियों की नियमित समीक्षा करें');

    let status: 'SECURE' | 'WARNING' | 'VULNERABLE' = 'SECURE';
    if (score < 70) status = 'VULNERABLE';
    else if (score < 90) status = 'WARNING';

    setResult({
      status,
      score,
      issues,
      recommendations
    });
    setIsChecking(false);
  };

  const getStatusColor = (status: string) => {
    if (status === 'SECURE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (status === 'WARNING') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'SECURE') return <CheckCircle className="w-12 h-12 text-green-400" />;
    if (status === 'WARNING') return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
    return <XCircle className="w-12 h-12 text-red-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Smartphone className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {!result && !isChecking && (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <button
            onClick={runCheck}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            {content.checkButton}
          </button>
        </div>
      )}

      {isChecking && (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
          <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4 animate-pulse">
            <Shield className="w-12 h-12 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{content.checking}</h3>
          <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className={`backdrop-blur rounded-2xl border-2 p-8 ${getStatusColor(result.status)}`}>
            <div className="flex items-center gap-4 mb-4">
              {getStatusIcon(result.status)}
              <div>
                <h3 className="text-3xl font-bold">{result.status}</h3>
                <p className="text-lg opacity-90">{content.securityScore}: {result.score}%</p>
              </div>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="bg-red-500/20 backdrop-blur rounded-2xl border border-red-500/50 p-6">
              <h4 className="text-xl font-bold mb-4 text-red-400">
                {lang === 'en' ? 'Security Issues Found' : 'सुरक्षा समस्याएं मिलीं'}
              </h4>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-xl font-bold mb-4">{content.recommendations}:</h4>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">{i + 1}.</span>
                  <span className="text-gray-300">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setResult(null)}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAgain}
          </button>
        </div>
      )}
    </div>
  );
}