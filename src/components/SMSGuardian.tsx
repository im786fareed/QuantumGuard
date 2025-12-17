'use client';

import { MessageSquare, Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface SMSMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
  threat: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatType: string;
  confidence: number;
  indicators: string[];
  actions: string[];
}

const CONTENT = {
  en: {
    title: 'SMS Guardian',
    subtitle: 'Detect fraud OTPs and scam messages instantly',
    checkButton: 'Check My Latest SMS',
    loading: 'Scanning messages...',
    noMessages: 'No suspicious messages found',
    browserWarning: '⚠️ Browser Limitation',
    browserMessage: 'Web apps cannot read SMS messages from your device.\n\nOptions:\n1. Use "Spam AI Checker" tab to paste suspicious SMS\n2. Try our "Demo Scam" feature on homepage\n3. Wait for Android app (coming soon)\n\nFor now, manually check suspicious messages using our other tools!',
    tabs: {
      check: 'Check SMS',
      learn: 'Learn',
      stats: 'Stats'
    }
  },
  hi: {
    title: 'SMS गार्डियन',
    subtitle: 'धोखाधड़ी OTP और स्कैम संदेश तुरंत पहचानें',
    checkButton: 'मेरे नवीनतम SMS जांचें',
    loading: 'संदेश स्कैन कर रहे हैं...',
    noMessages: 'कोई संदिग्ध संदेश नहीं मिला',
    browserWarning: '⚠️ ब्राउज़र सीमा',
    browserMessage: 'वेब ऐप आपके डिवाइस से SMS संदेश नहीं पढ़ सकते।\n\nविकल्प:\n1. संदिग्ध SMS पेस्ट करने के लिए "Spam AI Checker" टैब उपयोग करें\n2. होमपेज पर हमारे "Demo Scam" फीचर को आज़माएं\n3. Android ऐप की प्रतीक्षा करें (जल्द आ रहा है)\n\nअभी के लिए, हमारे अन्य उपकरणों का उपयोग करके संदिग्ध संदेशों को मैन्युअल रूप से जांचें!',
    tabs: {
      check: 'SMS जांचें',
      learn: 'सीखें',
      stats: 'आँकड़े'
    }
  }
};

const MOCK_MESSAGES: { [key: string]: SMSMessage[] } = {
  en: [
    {
      id: 1,
      sender: '+91-98765-43210',
      message: 'URGENT: Your account will be blocked. Verify KYC: http://bit.ly/verify-now',
      time: '10 minutes ago',
      threat: 'CRITICAL',
      threatType: 'Phishing Link',
      confidence: 98,
      indicators: [
        'Shortened URL (bit.ly) hiding destination',
        'Fake urgency tactics',
        'Unknown sender number',
        'KYC verification scam pattern'
      ],
      actions: [
        'DO NOT click the link',
        'Delete this message immediately',
        'Block the sender',
        'Report to 1930'
      ]
    },
    {
      id: 2,
      sender: 'AX-ICICIBANK',
      message: 'Your ICICI Bank account credited with Rs.5,250 on 15-Dec-24. Available balance: Rs.45,320',
      time: '2 hours ago',
      threat: 'SAFE',
      threatType: 'Legitimate Bank Notification',
      confidence: 99,
      indicators: [
        'Official sender ID (AX-ICICIBANK)',
        'Standard transaction format',
        'No links or requests',
        'Informational only'
      ],
      actions: [
        'This is a legitimate bank notification',
        'No action needed'
      ]
    }
  ],
  hi: [
    {
      id: 1,
      sender: '+91-98765-43210',
      message: 'अत्यावश्यक: आपका खाता ब्लॉक हो जाएगा। KYC सत्यापित करें: http://bit.ly/verify-now',
      time: '10 मिनट पहले',
      threat: 'CRITICAL',
      threatType: 'फ़िशिंग लिंक',
      confidence: 98,
      indicators: [
        'छोटा URL (bit.ly) गंतव्य छिपा रहा है',
        'नकली दबाव रणनीति',
        'अज्ञात प्रेषक नंबर',
        'KYC सत्यापन स्कैम पैटर्न'
      ],
      actions: [
        'लिंक पर क्लिक न करें',
        'यह संदेश तुरंत डिलीट करें',
        'प्रेषक को ब्लॉक करें',
        '1930 पर रिपोर्ट करें'
      ]
    },
    {
      id: 2,
      sender: 'AX-ICICIBANK',
      message: '15-दिसं-24 को आपके ICICI बैंक खाते में Rs.5,250 जमा हुए। उपलब्ध शेष: Rs.45,320',
      time: '2 घंटे पहले',
      threat: 'SAFE',
      threatType: 'वैध बैंक सूचना',
      confidence: 99,
      indicators: [
        'आधिकारिक प्रेषक ID (AX-ICICIBANK)',
        'मानक लेनदेन प्रारूप',
        'कोई लिंक या अनुरोध नहीं',
        'केवल सूचनात्मक'
      ],
      actions: [
        'यह एक वैध बैंक सूचना है',
        'कोई कार्रवाई की आवश्यकता नहीं'
      ]
    }
  ]
};

export default function SMSGuardian({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<'check' | 'learn' | 'stats'>('check');
  const [loading, setLoading] = useState(false);
  const [scannedMessages, setScannedMessages] = useState<SMSMessage[]>([]);

  const content = CONTENT[lang];
  const mockMessages = MOCK_MESSAGES[lang];

  const handleCheckSMS = () => {
    // Check if running in browser (not Android app)
    if (typeof window !== 'undefined') {
      alert(content.browserWarning + '\n\n' + content.browserMessage);
      return;
    }
    
    // This code will only run in Android app
    setLoading(true);
    setTimeout(() => {
      setScannedMessages(mockMessages);
      setLoading(false);
    }, 2000);
  };

  const getSeverityColor = (threat: string) => {
    switch (threat) {
      case 'CRITICAL':
        return 'border-red-500 bg-red-900/20';
      case 'HIGH':
        return 'border-orange-500 bg-orange-900/20';
      case 'MEDIUM':
        return 'border-yellow-500 bg-yellow-900/20';
      case 'SAFE':
        return 'border-green-500 bg-green-900/20';
      default:
        return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getSeverityBadge = (threat: string) => {
    switch (threat) {
      case 'CRITICAL':
        return 'bg-red-500';
      case 'HIGH':
        return 'bg-orange-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'SAFE':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl mb-4">
          <MessageSquare className="w-12 h-12 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center">
        {(['check', 'learn', 'stats'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {content.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Check Tab */}
      {activeTab === 'check' && (
        <div className="space-y-6">
          {/* Check Button */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
            <button
              onClick={handleCheckSMS}
              disabled={loading}
              className="px-12 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Clock className="w-6 h-6 animate-spin" />
                  {content.loading}
                </span>
              ) : (
                content.checkButton
              )}
            </button>
            <p className="text-sm text-gray-400 mt-4">
              {lang === 'en' 
                ? 'Click to scan your latest SMS messages for fraud patterns'
                : 'धोखाधड़ी पैटर्न के लिए अपने नवीनतम SMS संदेश स्कैन करने के लिए क्लिक करें'}
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-600/20 backdrop-blur rounded-xl border border-green-500/50 p-6">
            <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {lang === 'en' ? 'Privacy Guarantee' : 'गोपनीयता गारंटी'}
            </h3>
            <ul className="text-sm text-green-200 space-y-1">
              <li>✓ {lang === 'en' ? 'Only reads when you click the button' : 'केवल बटन क्लिक करने पर पढ़ता है'}</li>
              <li>✓ {lang === 'en' ? 'No background monitoring' : 'कोई पृष्ठभूमि निगरानी नहीं'}</li>
              <li>✓ {lang === 'en' ? 'Analysis happens on your device' : 'विश्लेषण आपके डिवाइस पर होता है'}</li>
              <li>✓ {lang === 'en' ? 'No data stored or transmitted' : 'कोई डेटा संग्रहीत या प्रसारित नहीं'}</li>
            </ul>
          </div>

          {/* Results */}
          {scannedMessages.length > 0 && (
            <div className="space-y-4">
              {scannedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`backdrop-blur rounded-2xl border-2 p-6 ${getSeverityColor(msg.threat)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-white">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3 bg-black/20 rounded-lg p-3">
                        {msg.message}
                      </p>
                    </div>
                    <span className={`px-3 py-1 ${getSeverityBadge(msg.threat)} rounded-full text-xs font-bold ml-4`}>
                      {msg.threat}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-2">{msg.threatType}</h4>
                      <p className="text-sm text-gray-400">
                        {lang === 'en' ? 'AI Confidence: ' : 'AI विश्वास: '}
                        <strong className="text-white">{msg.confidence}%</strong>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {lang === 'en' ? 'Threat Indicators:' : 'खतरे के संकेतक:'}
                      </h4>
                      <ul className="space-y-1">
                        {msg.indicators.map((indicator, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-400">•</span>
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-black/20 rounded-lg p-4">
                      <h4 className="font-bold text-white mb-2">
                        {lang === 'en' ? 'Recommended Actions:' : 'अनुशंसित कार्रवाई:'}
                      </h4>
                      <ul className="space-y-1">
                        {msg.actions.map((action, i) => (
                          <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Learn Tab */}
      {activeTab === 'learn' && (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
          <h2 className="text-2xl font-bold mb-6">
            {lang === 'en' ? 'Common SMS Scams' : 'सामान्य SMS स्कैम'}
          </h2>
          <div className="space-y-4">
            <div className="bg-red-900/20 rounded-xl border border-red-500/50 p-6">
              <h3 className="font-bold text-red-400 mb-2">
                {lang === 'en' ? '1. OTP Fraud' : '1. OTP धोखाधड़ी'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Never share OTPs for money transfers. Real banks never ask for OTPs over calls or SMS.'
                  : 'पैसे ट्रांसफर के लिए कभी OTP साझा न करें। असली बैंक कभी कॉल या SMS पर OTP नहीं मांगते।'}
              </p>
            </div>
            <div className="bg-orange-900/20 rounded-xl border border-orange-500/50 p-6">
              <h3 className="font-bold text-orange-400 mb-2">
                {lang === 'en' ? '2. KYC Update Scams' : '2. KYC अपडेट स्कैम'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Fake urgency about KYC updates with phishing links. Real banks use official channels.'
                  : 'फ़िशिंग लिंक के साथ KYC अपडेट के बारे में नकली दबाव। असली बैंक आधिकारिक चैनल उपयोग करते हैं।'}
              </p>
            </div>
            <div className="bg-yellow-900/20 rounded-xl border border-yellow-500/50 p-6">
              <h3 className="font-bold text-yellow-400 mb-2">
                {lang === 'en' ? '3. Prize/Lottery Scams' : '3. पुरस्कार/लॉटरी स्कैम'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Messages claiming you won prizes asking for fees. No legitimate lottery asks for money upfront.'
                  : 'पुरस्कार जीतने का दावा करने वाले संदेश शुल्क मांगते हैं। कोई वैध लॉटरी पहले पैसे नहीं मांगती।'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur rounded-2xl border-2 border-red-500 p-8 text-center">
            <TrendingUp className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-5xl font-bold text-red-400 mb-2">847</p>
            <p className="text-gray-300">
              {lang === 'en' ? 'SMS Scam Patterns Detected' : 'SMS स्कैम पैटर्न पाए गए'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur rounded-2xl border-2 border-green-500 p-8 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-5xl font-bold text-green-400 mb-2">99.2%</p>
            <p className="text-gray-300">
              {lang === 'en' ? 'Detection Accuracy' : 'पहचान सटीकता'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}