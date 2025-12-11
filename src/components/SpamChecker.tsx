'use client';

import { Phone, AlertTriangle, CheckCircle, XCircle, Mail } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface CheckResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'SPAM';
  riskScore: number;
  message: string;
  type: 'phone' | 'email';
  indicators: {
    hasScamKeywords: boolean;
    hasPhoneNumber: boolean;
    hasLink: boolean;
    hasUrgency: boolean;
    hasMoney: boolean;
    foundKeywords: string[];
  };
  actions: string[];
}

const CONTENT = {
  en: {
    title: 'Spam Checker',
    subtitle: 'Check phone numbers, emails, or messages',
    phonePlaceholder: 'Enter phone number or paste suspicious message/email...',
    checkButton: 'Check for Spam',
    checking: 'Checking...',
    result: 'Check Result',
    riskScore: 'Risk Score',
    indicators: 'Detected Patterns',
    whatToDo: 'What to do',
    checkAnother: 'Check Another',
    disclaimer: 'Educational Tool: Pattern-based detection. Always verify through official channels.'
  },
  hi: {
    title: 'स्पैम चेकर',
    subtitle: 'फोन नंबर ईमेल या संदेश जांचें',
    phonePlaceholder: 'फोन नंबर दर्ज करें या संदिग्ध संदेश पेस्ट करें',
    checkButton: 'स्पैम चेक करें',
    checking: 'जांच हो रही है',
    result: 'जांच परिणाम',
    riskScore: 'जोखिम स्कोर',
    indicators: 'पैटर्न मिले',
    whatToDo: 'क्या करें',
    checkAnother: 'फिर जांचें',
    disclaimer: 'शैक्षिक उपकरण: पैटर्न आधारित पहचान। हमेशा सत्यापित करें।'
  }
};

export default function SpamChecker({ lang }: Props) {
  const [input, setInput] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const content = CONTENT[lang];

  const handleCheck = async () => {
    if (!input.trim()) return;

    setIsChecking(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const text = input.toLowerCase();
    
    // Detect if it's phone number or email/message
    const isPhoneOnly = /^[\d\s\-\+\(\)]+$/.test(input.trim());
    const type: 'phone' | 'email' = isPhoneOnly ? 'phone' : 'email';

    // SPAM KEYWORDS (expanded list)
    const scamKeywords = [
      'congratulations', 'won', 'lottery', 'prize', 'winner', 'claim', 'reward',
      'urgent', 'verify', 'account', 'suspend', 'suspended', 'block', 'blocked',
      'click here', 'link', 'otp', 'bank', 'credit card', 'debit card',
      'kyc', 'update', 'immediately', 'expire', 'expired', 'act now',
      'limited time', 'offer', 'free', 'gift', 'bonus', 'cashback',
      'confirm', 'validate', 'security', 'alert', 'warning', 'notice',
      'payment', 'refund', 'transaction', 'failed', 'pending',
      'courier', 'parcel', 'delivery', 'customs', 'clearance',
      'investment', 'profit', 'earn', 'income', 'money',
      'covid', 'vaccine', 'medicine', 'cure', 'treatment',
      'loan', 'approved', 'eligible', 'apply',
      'dating', 'meet', 'chat', 'lonely', 'friend',
      'job offer', 'work from home', 'hiring', 'vacancy',
      'subscription', 'cancel', 'renew', 'membership'
    ];

    let riskScore = 0;
    const foundKeywords: string[] = [];

    // Check for scam keywords
    for (const keyword of scamKeywords) {
      if (text.includes(keyword)) {
        riskScore += 15;
        foundKeywords.push(keyword);
      }
    }

    // Additional indicators
    const hasPhoneNumber = /\d{10}/.test(text);
    const hasLink = /http|www\.|bit\.ly|tinyurl|short\.link|goo\.gl/i.test(text);
    const hasUrgency = /urgent|immediately|now|asap|hurry|fast|quick|today|tonight/i.test(text);
    const hasMoney = /₹|rupees|rs\.|crore|lakh|dollar|\$|£|€|prize|reward|cash|refund|payment/i.test(text);

    if (hasPhoneNumber) riskScore += 10;
    if (hasLink) riskScore += 25;
    if (hasUrgency) riskScore += 20;
    if (hasMoney) riskScore += 20;

    // Check for multiple exclamation marks or all caps
    if (/!!!|!!!!/.test(text)) riskScore += 10;
    if (text.toUpperCase() === text && text.length > 20) riskScore += 15;

    riskScore = Math.min(riskScore, 100);

    let verdict: 'SAFE' | 'SUSPICIOUS' | 'SPAM' = 'SAFE';
    let message = '';

    if (riskScore >= 70) {
      verdict = 'SPAM';
      message = lang === 'en' 
        ? 'HIGH SPAM PROBABILITY! This appears to be a scam. Do NOT respond, click links, or share any information.'
        : 'उच्च स्पैम संभावना! यह एक स्कैम लगता है। जवाब न दें, लिंक न क्लिक करें, कोई जानकारी साझा न करें।';
    } else if (riskScore >= 40) {
      verdict = 'SUSPICIOUS';
      message = lang === 'en'
        ? 'SUSPICIOUS patterns detected. Verify sender identity through official channels before taking any action.'
        : 'संदिग्ध पैटर्न मिले। कोई भी कार्रवाई से पहले आधिकारिक चैनलों से प्रेषक की पहचान सत्यापित करें।';
    } else {
      verdict = 'SAFE';
      message = lang === 'en'
        ? 'No obvious spam patterns detected. However, always stay cautious with unknown senders.'
        : 'कोई स्पष्ट स्पैम पैटर्न नहीं मिला। हालांकि, अज्ञात प्रेषकों के साथ हमेशा सावधान रहें।';
    }

    const actions = riskScore >= 70 ? [
      lang === 'en' ? 'DO NOT respond to this message' : 'इस संदेश का जवाब न दें',
      lang === 'en' ? 'DO NOT click any links' : 'किसी भी लिंक पर क्लिक न करें',
      lang === 'en' ? 'DO NOT share OTP, password, or card details' : 'OTP, पासवर्ड, कार्ड विवरण साझा न करें',
      lang === 'en' ? 'Block this sender immediately' : 'इस प्रेषक को तुरंत ब्लॉक करें',
      lang === 'en' ? 'Report to 1930 or cybercrime.gov.in' : '1930 या cybercrime.gov.in पर रिपोर्ट करें'
    ] : riskScore >= 40 ? [
      lang === 'en' ? 'Verify sender through official website or phone' : 'आधिकारिक वेबसाइट से प्रेषक सत्यापित करें',
      lang === 'en' ? 'Do not share sensitive information' : 'संवेदनशील जानकारी साझा न करें',
      lang === 'en' ? 'Check for official domain/phone number' : 'आधिकारिक डोमेन/फोन नंबर जांचें',
      lang === 'en' ? 'Be cautious with links and attachments' : 'लिंक और अटैचमेंट से सावधान रहें'
    ] : [
      lang === 'en' ? 'Stay vigilant with unknown senders' : 'अज्ञात प्रेषकों के साथ सतर्क रहें',
      lang === 'en' ? 'Never share OTP or passwords' : 'कभी भी OTP या पासवर्ड साझा न करें',
      lang === 'en' ? 'Verify urgent requests independently' : 'जरूरी अनुरोधों को स्वतंत्र रूप से सत्यापित करें'
    ];

    setResult({
      verdict,
      riskScore,
      message,
      type,
      indicators: {
        hasScamKeywords: foundKeywords.length > 0,
        hasPhoneNumber,
        hasLink,
        hasUrgency,
        hasMoney,
        foundKeywords
      },
      actions
    });
    setIsChecking(false);
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
          <Phone className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={content.phonePlaceholder}
          className="w-full h-40 bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-400 focus:outline-none resize-none mb-4"
        />

        <button
          onClick={handleCheck}
          disabled={isChecking || !input.trim()}
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

          {result.indicators.foundKeywords.length > 0 && (
            <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
              <h4 className="text-xl font-bold mb-4">{content.indicators}:</h4>
              <div className="flex flex-wrap gap-2">
                {result.indicators.foundKeywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

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

          <button
            onClick={() => { setResult(null); setInput(''); }}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAnother}
          </button>
        </div>
      )}
    </div>
  );
}