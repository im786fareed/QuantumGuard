'use client';
import { useState } from 'react';
import { Shield, AlertTriangle, Search, ExternalLink, Info, CheckCircle } from 'lucide-react';

export default function DataBreachChecker({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const content = {
    en: {
      title: '🔍 Data Breach Checker',
      subtitle: 'Check if your accounts have been compromised',
      disclaimer: 'For Accurate Results - Use Official HIBP',
      disclaimerText: 'This is an educational tool. For real breach checking, visit',
      emailLabel: 'Enter Email Address',
      emailPlaceholder: 'your.email@example.com',
      checkButton: 'Check Breaches',
      checking: 'Checking...',
      visitHIBP: 'Visit Have I Been Pwned',
      whatToDo: 'What to Do If Breached',
      steps: [
        'Change passwords immediately',
        'Enable two-factor authentication',
        'Monitor account activity',
        'Use unique passwords per account',
        'Consider a password manager'
      ]
    },
    hi: {
      title: '🔍 डेटा उल्लंघन जांचकर्ता',
      subtitle: 'जांचें कि क्या आपके खाते से छेड़छाड़ की गई है',
      disclaimer: 'सटीक परिणामों के लिए - आधिकारिक HIBP का उपयोग करें',
      disclaimerText: 'यह एक शैक्षिक उपकरण है। वास्तविक उल्लंघन जांच के लिए, यहां जाएं',
      emailLabel: 'ईमेल पता दर्ज करें',
      emailPlaceholder: 'your.email@example.com',
      checkButton: 'उल्लंघन जांचें',
      checking: 'जांच रहे हैं...',
      visitHIBP: 'Have I Been Pwned पर जाएं',
      whatToDo: 'यदि उल्लंघन हो तो क्या करें',
      steps: [
        'तुरंत पासवर्ड बदलें',
        'दो-कारक प्रमाणीकरण सक्षम करें',
        'खाता गतिविधि की निगरानी करें',
        'प्रति खाते अद्वितीय पासवर्ड का उपयोग करें',
        'पासवर्ड प्रबंधक पर विचार करें'
      ]
    }
  };

  const t = content[lang];

  const checkBreaches = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChecked(true);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-orange-100">{t.subtitle}</p>
      </div>

      <div className="bg-yellow-600/20 border-2 border-yellow-500/50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-400 text-xl mb-2">{t.disclaimer}</h3>
            <p className="text-gray-200 mb-3">
              {t.disclaimerText}{' '}
              <a
                href="https://haveibeenpwned.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline hover:text-yellow-200 font-bold inline-flex items-center gap-1">
                Have I Been Pwned
                <ExternalLink className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <label className="block text-sm font-semibold mb-2">{t.emailLabel}</label>
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={checkBreaches}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
            <Search className="w-5 h-5" />
            {loading ? t.checking : t.checkButton}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6 text-center">
        <h3 className="font-bold text-xl mb-3">Check Your Email for Real Breaches</h3>
        <a
          href="https://haveibeenpwned.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold">
          <ExternalLink className="w-5 h-5" />
          {t.visitHIBP}
        </a>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <h2 className="font-bold text-2xl mb-4">{t.whatToDo}</h2>
        <ol className="space-y-3">
          {t.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-300">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}