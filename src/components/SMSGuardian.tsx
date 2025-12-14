'use client';

import { MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, Phone } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface SMSAnalysis {
  sender: string;
  message: string;
  timestamp: string;
  isThreat: boolean;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatType: string;
  aiConfidence: number;
  indicators: string[];
}

const CONTENT = {
  en: {
    title: 'SMS Guardian - Check Suspicious Messages',
    subtitle: 'One-tap SMS fraud detection. No background monitoring.',
    checkButton: 'Check My Latest SMS',
    checking: 'Scanning latest messages...',
    noPermission: 'SMS Permission Required',
    permissionMessage: 'QuantumGuard needs SMS permission to scan your messages for fraud.\n\nWe will:\n• Read ONLY when you click this button\n• NOT monitor SMS in background\n• NOT store your messages\n• NOT share with anyone\n\nYour privacy is protected.',
    grantPermission: 'Grant Permission',
    result: 'SMS Analysis Result',
    scanAnother: 'Scan Again',
    howItWorks: 'How SMS Guardian Works',
    safe: 'No Threats Found',
    safeMessage: 'Your recent messages appear safe'
  },
  hi: {
    title: 'SMS गार्डियन - संदिग्ध संदेश जांचें',
    subtitle: 'एक टैप से SMS धोखाधड़ी की पहचान। कोई बैकग्राउंड निगरानी नहीं।',
    checkButton: 'मेरे नवीनतम SMS जांचें',
    checking: 'नवीनतम संदेश स्कैन हो रहे हैं',
    noPermission: 'SMS अनुमति आवश्यक',
    permissionMessage: 'QuantumGuard को धोखाधड़ी के लिए आपके संदेश स्कैन करने के लिए SMS अनुमति की आवश्यकता है।\n\nहम:\n• केवल तभी पढ़ेंगे जब आप इस बटन पर क्लिक करें\n• बैकग्राउंड में SMS की निगरानी नहीं करेंगे\n• आपके संदेश संग्रहीत नहीं करेंगे\n• किसी के साथ साझा नहीं करेंगे\n\nआपकी गोपनीयता सुरक्षित है।',
    grantPermission: 'अनुमति दें',
    result: 'SMS विश्लेषण परिणाम',
    scanAnother: 'फिर से स्कैन करें',
    howItWorks: 'SMS Guardian कैसे काम करता है',
    safe: 'कोई खतरा नहीं मिला',
    safeMessage: 'आपके हाल के संदेश सुरक्षित दिखते हैं'
  }
};

export default function SMSGuardian({ lang }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<SMSAnalysis[]>([]);
  const [hasPermission, setHasPermission] = useState(false);
  const content = CONTENT[lang];

  // SIMULATED SMS SCANNING (In React Native, use react-native-sms library)
  const simulateSMSScan = async (): Promise<SMSAnalysis[]> => {
    // Simulate reading SMS (in production, actual SMS reading happens here)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock SMS data for demo
    const mockSMS = [
      {
        sender: '+91 98765 43210',
        message: 'Your OTP for UPI payment of Rs.50000 to Account XXXX1234 is 847392. Valid for 10 minutes. DO NOT SHARE.',
        timestamp: new Date(Date.now() - 120000).toLocaleString(),
        isThreat: true,
        threatLevel: 'CRITICAL' as const,
        threatType: 'Money Transfer OTP Scam',
        aiConfidence: 98,
        indicators: [
          'OTP for large money transfer (₹50,000)',
          'Unusual account destination',
          'Sender number not from official bank',
          'Urgency pressure (10 minutes validity)',
          'No user-initiated transaction'
        ]
      },
      {
        sender: 'AX-ICICIBANK',
        message: 'Your ICICI Bank Account XX1234 is credited with Rs.5,250 on 14-Dec-25. Avl Bal: Rs.45,230. Download iMobile app.',
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
        isThreat: false,
        threatLevel: 'SAFE' as const,
        threatType: 'Legitimate Bank Notification',
        aiConfidence: 99,
        indicators: [
          'Official bank sender ID (AX-ICICIBANK)',
          'Transaction notification only',
          'No action required from user',
          'Standard bank message format'
        ]
      },
      {
        sender: '+91 87654 32109',
        message: 'URGENT: Your Aadhar Card will be blocked in 24 hours. Update details immediately: http://bit.ly/aadhar-update-2025',
        timestamp: new Date(Date.now() - 7200000).toLocaleString(),
        isThreat: true,
        threatLevel: 'HIGH' as const,
        threatType: 'Aadhar Phishing Scam',
        aiConfidence: 95,
        indicators: [
          'Fake urgency ("24 hours" deadline)',
          'Government impersonation (Aadhar)',
          'Shortened URL (bit.ly) - hiding destination',
          'UIDAI never sends such messages',
          'Threatening language'
        ]
      }
    ];

    return mockSMS;
  };

  const handleCheckSMS = async () => {
    // In production web app, show browser limitation message
    if (typeof window !== 'undefined' && !('sms' in navigator)) {
      alert(
        lang === 'en'
          ? '⚠️ SMS reading requires native Android app.\n\nThis feature works in:\n• QuantumGuard Android App (coming soon)\n• For now, paste suspicious SMS in SPAM AI CHECKER\n\nWe\'ll notify you when Android app launches!'
          : '⚠️ SMS पढ़ने के लिए नेटिव Android ऐप की आवश्यकता है।\n\nयह फीचर काम करता है:\n• QuantumGuard Android ऐप में (जल्द आ रहा है)\n• अभी के लिए, SPAM AI CHECKER में संदिग्ध SMS पेस्ट करें\n\nजब Android ऐप लॉन्च होगा तो हम आपको सूचित करेंगे!'
      );
      return;
    }

    setIsScanning(true);
    setResults([]);

    try {
      const smsAnalysis = await simulateSMSScan();
      setResults(smsAnalysis);
    } catch (error) {
      console.error('SMS scan error:', error);
      alert(lang === 'en' ? 'Error scanning SMS. Please try again.' : 'SMS स्कैन करने में त्रुटि। कृपया पुनः प्रयास करें।');
    }

    setIsScanning(false);
  };

  const getThreatColor = (level: string) => {
    if (level === 'SAFE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (level === 'MEDIUM') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    if (level === 'HIGH') return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
    return 'text-red-400 bg-red-900/40 border-red-500 animate-pulse';
  };

  const getThreatIcon = (level: string) => {
    if (level === 'SAFE') return <CheckCircle className="w-12 h-12 text-green-400" />;
    if (level === 'MEDIUM') return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
    return <XCircle className="w-12 h-12 text-red-400 animate-pulse" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-4">
          <MessageSquare className="w-12 h-12 text-blue-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* Check Button */}
      {results.length === 0 && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <Shield className="w-24 h-24 text-blue-400 mx-auto mb-6" />
              <p className="text-gray-300 text-lg mb-8">
                {lang === 'en'
                  ? 'Click button below to scan your recent SMS messages for fraud patterns, scam OTPs, and phishing links.'
                  : 'धोखाधड़ी पैटर्न, स्कैम OTP और फ़िशिंग लिंक के लिए अपने हाल के SMS संदेश स्कैन करने के लिए नीचे बटन पर क्लिक करें।'}
              </p>
              <button
                onClick={handleCheckSMS}
                disabled={isScanning}
                className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-bold text-xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>
                    <span className="animate-pulse">{content.checking}</span>
                  </>
                ) : (
                  content.checkButton
                )}
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-cyan-600/20 rounded-xl border border-cyan-500/50 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{content.howItWorks}</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span>
                    {lang === 'en'
                      ? 'Click "Check My Latest SMS" button above'
                      : 'ऊपर "मेरे नवीनतम SMS जांचें" बटन पर क्लिक करें'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <span>
                    {lang === 'en'
                      ? 'QuantumGuard reads your last 5-10 SMS messages (permission required)'
                      : 'QuantumGuard आपके अंतिम 5-10 SMS संदेश पढ़ता है (अनुमति आवश्यक)'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <span>
                    {lang === 'en'
                      ? 'AI analyzes each message for: OTP scams, phishing links, fake urgency, money transfers'
                      : 'AI प्रत्येक संदेश का विश्लेषण करता है: OTP स्कैम, फ़िशिंग लिंक, नकली दबाव, पैसे ट्रांसफर'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <span>
                    {lang === 'en'
                      ? 'Results show threat level, scam type, and protective actions'
                      : 'परिणाम खतरे का स्तर, स्कैम प्रकार और सुरक्षात्मक कार्रवाई दिखाते हैं'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">5.</span>
                  <span className="font-bold text-green-300">
                    {lang === 'en'
                      ? 'Your messages are NOT stored or uploaded anywhere'
                      : 'आपके संदेश कहीं भी संग्रहीत या अपलोड नहीं किए जाते'}
                  </span>
                </li>
              </ol>
            </div>

            {/* Privacy Notice */}
            <div className="mt-6 bg-green-600/20 rounded-xl border border-green-500/50 p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-green-200">
                    <strong>{lang === 'en' ? '🔒 Privacy Guarantee:' : '🔒 गोपनीयता गारंटी:'}</strong>
                    {' '}
                    {lang === 'en'
                      ? 'SMS reading happens ONLY when you click the button. We do NOT monitor SMS in the background. Your messages are analyzed on your device and are NOT sent to any server. We do NOT store or share your SMS data.'
                      : 'SMS पढ़ना केवल तभी होता है जब आप बटन पर क्लिक करते हैं। हम बैकग्राउंड में SMS की निगरानी नहीं करते। आपके संदेश आपके डिवाइस पर विश्लेषण किए जाते हैं और किसी भी सर्वर पर नहीं भेजे जाते। हम आपके SMS डेटा को संग्रहीत या साझा नहीं करते।'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Note for Android */}
          <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yellow-200">
                  <strong>⚠️ {lang === 'en' ? 'Current Limitation:' : 'वर्तमान सीमा:'}</strong>
                  {' '}
                  {lang === 'en'
                    ? 'SMS reading requires native Android app permissions. This feature is demonstrated with sample data in the web version. For real SMS scanning, install QuantumGuard Android App (launching soon on Google Play Store).'
                    : 'SMS पढ़ने के लिए नेटिव Android ऐप अनुमति की आवश्यकता है। यह फीचर वेब संस्करण में नमूना डेटा के साथ प्रदर्शित किया गया है। वास्तविक SMS स्कैनिंग के लिए, QuantumGuard Android ऐप इंस्टॉल करें (जल्द ही Google Play Store पर लॉन्च हो रहा है)।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              {content.result} ({results.length} {lang === 'en' ? 'messages scanned' : 'संदेश स्कैन किए गए'})
            </h3>

            <div className="space-y-6">
              {results.map((sms, index) => (
                <div
                  key={index}
                  className={`backdrop-blur rounded-2xl border-2 p-6 ${getThreatColor(sms.threatLevel)}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {getThreatIcon(sms.threatLevel)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-2xl font-bold text-white">{sms.threatType}</h4>
                        <span className={`px-4 py-2 rounded-full font-bold text-sm ${getThreatColor(sms.threatLevel)}`}>
                          {sms.threatLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                        <Phone className="w-4 h-4" />
                        <span>{sms.sender}</span>
                        <span>•</span>
                        <span>{sms.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-300 font-mono">{sms.message}</p>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <h5 className="font-bold text-white">
                        {lang === 'en' ? 'AI Detected Threats:' : 'AI द्वारा पाए गए खतरे:'}
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {sms.indicators.map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className={sms.isThreat ? 'text-red-400' : 'text-green-400'}>
                            {sms.isThreat ? '⚠️' : '✓'}
                          </span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs text-gray-400">
                        AI Confidence: <strong className="text-white">{sms.aiConfidence}%</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {sms.isThreat && (
                    <div className="bg-red-950 rounded-xl border-2 border-red-500 p-4">
                      <h5 className="font-bold text-red-400 mb-3">
                        {lang === 'en' ? '🚨 IMMEDIATE ACTIONS:' : '🚨 तत्काल कार्रवाई:'}
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-200">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="font-bold">
                            {lang === 'en'
                              ? 'DO NOT respond to this message'
                              : 'इस संदेश का जवाब न दें'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="font-bold">
                            {lang === 'en'
                              ? 'DO NOT click any links'
                              : 'किसी भी लिंक पर क्लिक न करें'}
                          </span>
                        </li>
                        {sms.threatType.includes('OTP') && (
                          <li className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="font-bold">
                              {lang === 'en'
                                ? 'DO NOT share this OTP with anyone'
                                : 'यह OTP किसी के साथ साझा न करें'}
                            </span>
                          </li>
                        )}
                        <li className="flex items-start gap-2">
                          <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>
                            {lang === 'en'
                              ? 'Block this sender in your phone'
                              : 'अपने फोन में इस प्रेषक को ब्लॉक करें'}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span>
                            {lang === 'en'
                              ? 'Report to 1930 (National Cybercrime Helpline)'
                              : '1930 पर रिपोर्ट करें (राष्ट्रीय साइबर क्राइम हेल्पलाइन)'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {!sms.isThreat && (
                    <div className="bg-green-900/40 rounded-xl border border-green-500 p-4">
                      <p className="text-sm text-green-200 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <strong>
                          {lang === 'en'
                            ? 'This message appears legitimate. Always verify sender before taking any action.'
                            : 'यह संदेश वैध लगता है। कोई भी कार्रवाई करने से पहले हमेशा प्रेषक को सत्यापित करें।'}
                        </strong>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scan Again Button */}
          <button
            onClick={() => setResults([])}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.scanAnother}
          </button>
        </div>
      )}
    </div>
  );
}