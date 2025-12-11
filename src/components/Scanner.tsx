'use client';

import { Activity, Upload, AlertTriangle, CheckCircle, XCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  lang: 'en' | 'hi';
}

interface ScanResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM' | 'DANGER';
  riskScore: number;
  message: string;
  explanation?: string;
  indicators?: any;
  actions?: string[];
}

const CONTENT = {
  en: {
    title: 'Basic Scam Check',
    subtitle: 'Educational pattern-based scam detection',
    textTab: 'Text Message',
    imageTab: 'Image',
    textPlaceholder: 'Paste suspicious message here...',
    imagePlaceholder: 'Upload image to scan',
    scanButton: 'Check for Scams',
    scanning: 'Checking...',
    result: 'Check Result',
    riskScore: 'Risk Score',
    whatToDo: 'What to do',
    shareResult: 'Share Result',
    scanAnother: 'Check Another',
    disclaimer: 'Educational Tool: This is basic pattern detection. Always verify through official channels. Not a replacement for professional security software.'
  },
  hi: {
    title: 'बेसिक स्कैम चेक',
    subtitle: 'शैक्षिक पैटर्न आधारित स्कैम पहचान',
    textTab: 'टेक्स्ट संदेश',
    imageTab: 'छवि',
    textPlaceholder: 'संदिग्ध संदेश यहां पेस्ट करें',
    imagePlaceholder: 'स्कैन के लिए छवि अपलोड करें',
    scanButton: 'चेक करें',
    scanning: 'चेक हो रहा है',
    result: 'चेक परिणाम',
    riskScore: 'जोखिम स्कोर',
    whatToDo: 'क्या करें',
    shareResult: 'परिणाम साझा करें',
    scanAnother: 'फिर चेक करें',
    disclaimer: 'शैक्षिक उपकरण: यह बुनियादी पैटर्न पहचान है। हमेशा आधिकारिक चैनलों से सत्यापित करें। पेशेवर सुरक्षा सॉफ़्टवेयर का प्रतिस्थापन नहीं।'
  }
};

export default function Scanner({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [imageData, setImageData] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const content = CONTENT[lang];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          data: activeTab === 'text' ? textInput : imageData
        })
      });

      const data = await response.json();
      setResult(data);

      if (data.verdict === 'SAFE') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'SAFE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (verdict === 'SUSPICIOUS') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    if (verdict === 'SCAM' || verdict === 'DANGER') return 'text-red-400 bg-red-500/20 border-red-500/50';
    return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'SAFE') return <CheckCircle className="w-12 h-12 text-green-400" />;
    if (verdict === 'SUSPICIOUS') return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
    return <XCircle className="w-12 h-12 text-red-400" />;
  };

  const shareResult = () => {
    const message = `QuantumGuard Check Result: ${result?.verdict} - Risk Score: ${result?.riskScore}%`;
    if (navigator.share) {
      navigator.share({ text: message });
    } else {
      navigator.clipboard.writeText(message);
      alert(lang === 'en' ? 'Copied to clipboard!' : 'कॉपी हो गया!');
    }
  };

  const reset = () => {
    setResult(null);
    setTextInput('');
    setImageData('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Activity className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              activeTab === 'text'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {content.textTab}
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              activeTab === 'image'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {content.imageTab}
          </button>
        </div>

        {activeTab === 'text' ? (
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={content.textPlaceholder}
            className="w-full h-40 bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-400 focus:outline-none resize-none"
          />
        ) : (
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-6 py-3 bg-cyan-500 rounded-xl font-bold cursor-pointer inline-block hover:bg-cyan-600 transition"
            >
              {content.imagePlaceholder}
            </label>
            {imageData && (
              <div className="mt-4">
                <img src={imageData} alt="Upload" className="max-h-40 mx-auto rounded-xl" />
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleScan}
          disabled={isScanning || (activeTab === 'text' && !textInput) || (activeTab === 'image' && !imageData)}
          className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isScanning ? content.scanning : content.scanButton}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4">
            <p className="text-sm text-yellow-200">
              <span className="font-bold">⚠️ {lang === 'en' ? 'Educational Tool:' : 'शैक्षिक उपकरण:'}</span>
              {' '}
              {content.disclaimer}
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
            <p className="text-xl mb-4">{result.message}</p>
            {result.explanation && (
              <p className="text-gray-300">{result.explanation}</p>
            )}
          </div>

          {result.indicators && (result.indicators.hasAPKSignature || result.indicators.hasHiddenData) && (
            <div className="bg-red-600/20 backdrop-blur rounded-2xl border-2 border-red-500 p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-red-400 mb-3">
                    {lang === 'en' ? '🚨 STEGANOGRAPHY ATTACK DETECTED!' : '🚨 स्टेगनोग्राफी हमला!'}
                  </h3>
                  <p className="text-white font-bold mb-4">
                    {lang === 'en'
                      ? 'Hidden APK code found in image! This image contains malware that can compromise your device.'
                      : 'छवि में छिपा APK कोड मिला! यह मैलवेयर आपके डिवाइस को खतरे में डाल सकता है।'}
                  </p>
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-yellow-300 font-bold mb-2">
                      {lang === 'en' ? '⚠️ WHAT IS STEGANOGRAPHY?' : '⚠️ स्टेगनोग्राफी क्या है?'}
                    </p>
                    <p className="text-gray-200 text-sm">
                      {lang === 'en'
                        ? 'Attackers hide malicious APK files inside normal-looking images. When you download and open such images from WhatsApp or unknown numbers, hidden malware can automatically install without your permission and compromise your device.'
                        : 'हमलावर सामान्य दिखने वाली छवियों में दुर्भावनापूर्ण APK फ़ाइलें छिपाते हैं। जब आप WhatsApp या अज्ञात नंबरों से ऐसी छवियां डाउनलोड करते हैं, तो छिपा मैलवेयर आपकी अनुमति के बिना इंस्टॉल हो सकता है।'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.actions && result.actions.length > 0 && (
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

          <div className="flex gap-4">
            <button
              onClick={shareResult}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-5 h-5" />
              {content.shareResult}
            </button>
            <button
              onClick={reset}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
            >
              {content.scanAnother}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}