'use client';

import { useState } from 'react';
import { Link2, Shield, AlertTriangle, Loader2, Share2, ExternalLink } from 'lucide-react';

interface Props {
  lang: 'en' | 'hi';
}

const STRINGS = {
  en: {
    title: 'URL Phishing Checker',
    subtitle: 'Check if a link is safe before clicking',
    placeholder: 'Paste URL here (e.g., https://example.com)',
    button: 'Check URL',
    checking: 'Analyzing...',
    safe: 'This URL is SAFE ✅',
    safeDesc: 'No known threats detected. However, always be cautious with sensitive information.',
    unsafe: 'DANGER: Phishing/Malware Detected 🚨',
    unsafeDesc: 'This URL has been flagged as dangerous. DO NOT click or enter any information.',
    error: 'Could not check URL',
    share: 'Share Result',
    checkAnother: 'Check Another URL'
  },
  hi: {
    title: 'URL फिशिंग चेकर',
    subtitle: 'क्लिक करने से पहले लिंक सुरक्षित है या नहीं जांचें',
    placeholder: 'URL यहाँ पेस्ट करें (जैसे, https://example.com)',
    button: 'URL जांचें',
    checking: 'विश्लेषण हो रहा है...',
    safe: 'यह URL सुरक्षित है ✅',
    safeDesc: 'कोई ज्ञात खतरा नहीं मिला। हालांकि, संवेदनशील जानकारी के साथ हमेशा सावधान रहें।',
    unsafe: 'खतरा: फिशिंग/मैलवेयर का पता चला 🚨',
    unsafeDesc: 'यह URL खतरनाक के रूप में चिह्नित किया गया है। क्लिक न करें या कोई जानकारी दर्ज न करें।',
    error: 'URL की जांच नहीं हो सकी',
    share: 'परिणाम साझा करें',
    checkAnother: 'दूसरा URL जांचें'
  }
};

export default function UrlChecker({ lang }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const t = STRINGS[lang];

  const checkUrl = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/check-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  };

  const shareResult = () => {
    const message = result?.safe
      ? `✅ ${url} is safe - checked with QuantumGuard`
      : `🚨 WARNING: ${url} is dangerous - DO NOT CLICK`;
    
    if (navigator.share) {
      navigator.share({ text: message });
    } else {
      navigator.clipboard.writeText(message);
      alert(lang === 'en' ? 'Copied to clipboard!' : 'क्लिपबोर्ड पर कॉपी किया गया!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Link2 className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-400">{t.subtitle}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 mb-6">
        <div className="flex flex-col gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t.placeholder}
            className="w-full px-6 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && checkUrl()}
          />
          <button
            onClick={checkUrl}
            disabled={loading || !url.trim()}
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.checking}
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                {t.button}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Section */}
      {result && !result.error && (
        <div className={`bg-white/5 backdrop-blur rounded-2xl border p-6 ${
          result.safe ? 'border-green-500/50' : 'border-red-500/50'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            {result.safe ? (
              <Shield className="w-12 h-12 text-green-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0 animate-pulse" />
            )}
            <div className="flex-1">
              <h3 className={`text-2xl font-bold mb-2 ${result.safe ? 'text-green-400' : 'text-red-400'}`}>
                {result.safe ? t.safe : t.unsafe}
              </h3>
              <p className="text-gray-300 mb-4">
                {result.safe ? t.safeDesc : t.unsafeDesc}
              </p>
              <div className="bg-black/30 rounded-xl p-4 break-all text-sm text-gray-400">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                {result.url}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={shareResult}
              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {t.share}
            </button>
            <button
              onClick={() => {
                setUrl('');
                setResult(null);
              }}
              className="flex-1 px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-xl hover:bg-cyan-500/30 transition"
            >
              {t.checkAnother}
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {result?.error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-red-400">{t.error}</p>
        </div>
      )}
    </div>
  );
}