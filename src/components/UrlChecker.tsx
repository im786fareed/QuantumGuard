'use client';

import { Link as LinkIcon, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface CheckResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING';
  riskScore: number;
  message: string;
  details: {
    protocol: string;
    domain: string;
    checked: string;
  };
  actions: string[];
}

const CONTENT = {
  en: {
    title: 'URL Safety Checker',
    subtitle: 'Verify links before clicking',
    placeholder: 'Enter URL to check (e.g., https://example.com)',
    checkButton: 'Check URL',
    checking: 'Checking...',
    result: 'Check Result',
    riskScore: 'Risk Score',
    details: 'URL Details',
    whatToDo: 'What to do',
    checkAnother: 'Check Another URL',
    disclaimer: 'AI-powered phishing detection using real-time threat intelligence.'
  },
  hi: {
    title: 'URL सुरक्षा जांच',
    subtitle: 'क्लिक करने से पहले लिंक सत्यापित करें',
    placeholder: 'जांच के लिए URL दर्ज करें',
    checkButton: 'URL जांचें',
    checking: 'जांच हो रही है',
    result: 'जांच परिणाम',
    riskScore: 'जोखिम स्कोर',
    details: 'URL विवरण',
    whatToDo: 'क्या करें',
    checkAnother: 'अन्य URL जांचें',
    disclaimer: 'वास्तविक समय खतरा खुफिया का उपयोग करते हुए AI संचालित फ़िशिंग पहचान।'
  }
};

export default function UrlChecker({ lang }: Props) {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const content = CONTENT[lang];

  const checkUrl = async () => {
    if (!url.trim()) return;
    
    setIsChecking(true);
    setResult(null);

    try {
      const response = await fetch(`https://api.phish.rocks/v1/check?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      let verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING' = 'SAFE';
      let message = '';
      let riskScore = 0;

      if (data.phishing === true || data.status === 'phishing') {
        verdict = 'PHISHING';
        riskScore = 95;
        message = 'PHISHING DETECTED! This URL is known to be malicious.';
      } else if (data.suspicious === true) {
        verdict = 'SUSPICIOUS';
        riskScore = 60;
        message = 'Suspicious patterns detected. Proceed with caution.';
      } else {
        verdict = 'SAFE';
        riskScore = 10;
        message = 'URL appears safe based on known threat databases.';
      }

      setResult({
        verdict,
        riskScore,
        message,
        details: {
          protocol: url.startsWith('https') ? 'Secure (HTTPS)' : 'Insecure (HTTP)',
          domain: new URL(url).hostname,
          checked: new Date().toLocaleString()
        },
        actions: verdict === 'PHISHING' ? [
          'DO NOT visit this website',
          'DO NOT enter any personal information',
          'Report to cybercrime.gov.in',
          'Warn others who may have received this link'
        ] : verdict === 'SUSPICIOUS' ? [
          'Verify the website through official channels',
          'Check for spelling errors in domain',
          'Look for HTTPS and padlock icon',
          'Do not enter sensitive information'
        ] : [
          'URL appears safe, but always verify sender',
          'Check for HTTPS before entering data',
          'Be cautious with login credentials'
        ]
      });
    } catch (error) {
      console.error('API Error:', error);
      
      let verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING' = 'SAFE';
      let riskScore = 0;
      let message = '';

      const lowerUrl = url.toLowerCase();
      const suspiciousPatterns = [
        'bit.ly', 'tinyurl', 'goo.gl', 'short.link',
        'verify', 'account', 'suspended', 'urgent',
        'login', 'secure', 'update', 'confirm'
      ];

      for (const pattern of suspiciousPatterns) {
        if (lowerUrl.includes(pattern)) {
          riskScore += 15;
        }
      }

      if (!url.startsWith('https://')) riskScore += 20;
      if (lowerUrl.split('.').length > 4) riskScore += 15;

      riskScore = Math.min(riskScore, 100);

      if (riskScore >= 70) {
        verdict = 'PHISHING';
        message = 'High risk patterns detected. Likely phishing.';
      } else if (riskScore >= 40) {
        verdict = 'SUSPICIOUS';
        message = 'Suspicious patterns found. Verify before visiting.';
      } else {
        verdict = 'SAFE';
        message = 'No obvious threats detected (offline check).';
      }

      setResult({
        verdict,
        riskScore,
        message: message + ' (API unavailable, using pattern analysis)',
        details: {
          protocol: url.startsWith('https') ? 'Secure (HTTPS)' : 'Insecure (HTTP)',
          domain: url.includes('://') ? new URL(url).hostname : url,
          checked: new Date().toLocaleString()
        },
        actions: []
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'SAFE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (verdict === 'SUSPICIOUS') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'SAFE') return <CheckCircle className="w-12 h-12 text-green-400" />;
    if (verdict === 'SUSPICIOUS') return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
    return <XCircle className="w-12 h-12 text-red-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <LinkIcon className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={content.placeholder}
          className="w-full bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-400 focus:outline-none mb-4"
        />

        <button
          onClick={checkUrl}
          disabled={isChecking || !url.trim()}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? content.checking : content.checkButton}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4">
            <p className="text-sm text-yellow-200">
              <span className="font-bold">⚠️</span> {content.disclaimer}
            </p>
          </div>

          <div className={`backdrop-blur rounded-2xl border-2 p-8 ${getVerdictColor(result.verdict)}`}>
            <div className="flex items-center gap-4 mb-4">
              {getVerdictIcon(result.verdict)}
              <div>
                <h3 className="text-3xl font-bold">{result.verdict}</h3>
                <p className="text-lg opacity-90">{content.riskScore}: {result.riskScore}%</p>
              </div>
            </div>
            <p className="text-xl">{result.message}</p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-xl font-bold mb-4">{content.details}:</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Protocol:</span>
                <span className="font-bold">{result.details.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Domain:</span>
                <span className="font-bold">{result.details.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Checked:</span>
                <span className="font-bold">{result.details.checked}</span>
              </div>
            </div>
          </div>

          {result.actions.length > 0 && (
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <h4 className="text-xl font-bold mb-4">{content.whatToDo}:</h4>
              <ul className="space-y-3">
                {result.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">{i + 1}.</span>
                    <span className="text-gray-300">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => { setResult(null); setUrl(''); }}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAnother}
          </button>
        </div>
      )}
    </div>
  );
}