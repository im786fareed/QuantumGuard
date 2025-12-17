'use client';

import { X, PlayCircle, Shield, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  lang: 'en' | 'hi';
}

const DEMO_SCAMS = {
  en: [
    {
      id: 'digital-arrest',
      title: 'Digital Arrest Scam',
      icon: '🎭',
      content: `URGENT: CBI Notice

Your Aadhar Card 1234-5678-9012 is linked to a drug trafficking case in Mumbai. 

Arrest warrant has been issued. You must stay on video call with Officer Rajesh Sharma (Badge #CBI4829) for verification.

Do NOT disconnect or leave your house. Do NOT contact anyone or they will also be arrested.

Call immediately: +91-98765-43210

Case No: CBI/2024/8472
Status: ACTIVE WARRANT`,
      result: {
        verdict: 'CRITICAL',
        type: 'Digital Arrest Scam',
        confidence: 99,
        summary: 'This is a fake CBI message. Real CBI never calls about arrests.',
        indicators: [
          'Fake urgency ("URGENT", "immediately")',
          'Threatens arrest over phone (not how CBI works)',
          'Demands you stay on call for hours',
          'Tells you not to contact anyone (isolation tactic)',
          'Uses random mobile number (real CBI uses official channels)',
          'Fake case number format',
          '"Digital arrest" does not exist in Indian law'
        ],
        actions: [
          '✅ DO NOT call this number back',
          '✅ Block and delete this message',
          '✅ Real CBI sends PHYSICAL notices by post',
          '✅ Report to 1930 (National Cybercrime Helpline)',
          '✅ If worried, visit your local police station in person'
        ]
      }
    },
    {
      id: 'aadhar-phishing',
      title: 'Aadhar Phishing Scam',
      icon: '🆔',
      content: `UIDAI ALERT

Your Aadhaar Card will be permanently BLOCKED in 24 hours due to KYC verification pending.

Update your details immediately to avoid deactivation:
👉 http://bit.ly/aadhar-update-2024

Failure to update will result in:
❌ Bank accounts frozen
❌ Mobile number blocked  
❌ Government schemes stopped

Update Now: bit.ly/aadhar-kyc-verify

- UIDAI, Government of India`,
      result: {
        verdict: 'HIGH',
        type: 'Aadhar Phishing Scam',
        confidence: 96,
        summary: 'Fake UIDAI message with phishing link to steal your Aadhar data.',
        indicators: [
          'Shortened URL (bit.ly) - hiding actual destination',
          'Fake urgency ("24 hours", "permanently BLOCKED")',
          'Threatening consequences (frozen accounts, blocked services)',
          'UIDAI never sends such messages via SMS',
          'Real UIDAI website is uidai.gov.in (not bit.ly link)',
          'Pressure tactics to make you act without thinking'
        ],
        actions: [
          '✅ DO NOT click any links in this message',
          '✅ Delete this message immediately',
          '✅ Real Aadhar updates: Only at uidai.gov.in',
          '✅ UIDAI never threatens to block Aadhar',
          '✅ Report to 1930 if you clicked the link'
        ]
      }
    },
    {
      id: 'upi-cashback',
      title: 'UPI Cashback APK Scam',
      icon: '💰',
      content: `🎉 CONGRATULATIONS! 🎉

You have been selected for UPI CASHBACK 2024 program!

Get ₹500 instant cashback on EVERY UPI transaction!

Download the official app now:
📲 Paytm-Cashback-2024.apk

✅ Verified by Google
✅ 4.8★ rating
✅ 10 lakh+ downloads
✅ 100% Safe & Secure

Download link:
https://drive.google.com/uc?id=1a2b3c4d5e6f7g8h9i0j

Offer valid till midnight! Don't miss out!

- UPI Rewards Team`,
      result: {
        verdict: 'CRITICAL',
        type: 'Fake Banking App (Banking Trojan)',
        confidence: 99,
        summary: 'Malicious APK disguised as cashback app. Will steal all banking credentials.',
        indicators: [
          'APK file shared outside Play Store',
          'Fake app name impersonating Paytm',
          'Uploaded to Google Drive (not official source)',
          'Unrealistic offer (₹500 on EVERY transaction)',
          'False claims (not verified by Google)',
          'Fake urgency ("valid till midnight")',
          'Real Paytm never distributes apps via Drive/WhatsApp'
        ],
        actions: [
          '🚨 DO NOT download or install this APK',
          '✅ ONLY install apps from Google Play Store',
          '✅ Block the sender who sent this',
          '✅ Report to 1930 immediately',
          '✅ Warn friends/family about this scam',
          '✅ If already installed: Factory reset your phone'
        ]
      }
    }
  ],
  hi: [
    {
      id: 'digital-arrest',
      title: 'डिजिटल अरेस्ट स्कैम',
      icon: '🎭',
      content: `अत्यावश्यक: CBI नोटिस

आपका आधार कार्ड 1234-5678-9012 मुंबई में ड्रग तस्करी मामले से जुड़ा है।

गिरफ्तारी वारंट जारी किया गया है। आपको सत्यापन के लिए अधिकारी राजेश शर्मा (बैज #CBI4829) के साथ वीडियो कॉल पर रहना होगा।

डिस्कनेक्ट न करें या घर न छोड़ें। किसी से संपर्क न करें नहीं तो उन्हें भी गिरफ्तार किया जाएगा।

तुरंत कॉल करें: +91-98765-43210

केस नंबर: CBI/2024/8472
स्थिति: सक्रिय वारंट`,
      result: {
        verdict: 'गंभीर',
        type: 'डिजिटल अरेस्ट स्कैम',
        confidence: 99,
        summary: 'यह नकली CBI संदेश है। असली CBI गिरफ्तारी के बारे में कभी कॉल नहीं करती।',
        indicators: [
          'नकली दबाव ("अत्यावश्यक", "तुरंत")',
          'फोन पर गिरफ्तारी की धमकी (CBI ऐसे काम नहीं करती)',
          'घंटों कॉल पर रहने की मांग',
          'किसी से संपर्क न करने को कहना (अलगाव रणनीति)',
          'रैंडम मोबाइल नंबर (असली CBI आधिकारिक चैनल उपयोग करती है)',
          'नकली केस नंबर फॉर्मेट',
          'भारतीय कानून में "डिजिटल अरेस्ट" जैसी कोई चीज़ नहीं'
        ],
        actions: [
          '✅ इस नंबर पर वापस कॉल न करें',
          '✅ यह संदेश ब्लॉक और डिलीट करें',
          '✅ असली CBI डाक से फिजिकल नोटिस भेजती है',
          '✅ 1930 (राष्ट्रीय साइबर क्राइम हेल्पलाइन) पर रिपोर्ट करें',
          '✅ चिंतित हैं तो व्यक्तिगत रूप से पुलिस स्टेशन जाएं'
        ]
      }
    },
    {
      id: 'aadhar-phishing',
      title: 'आधार फ़िशिंग स्कैम',
      icon: '🆔',
      content: `UIDAI अलर्ट

KYC सत्यापन लंबित होने के कारण आपका आधार कार्ड 24 घंटे में स्थायी रूप से ब्लॉक हो जाएगा।

निष्क्रियता से बचने के लिए तुरंत विवरण अपडेट करें:
👉 http://bit.ly/aadhar-update-2024

अपडेट न करने पर:
❌ बैंक खाते फ्रीज हो जाएंगे
❌ मोबाइल नंबर ब्लॉक हो जाएगा
❌ सरकारी योजनाएं बंद हो जाएंगी

अभी अपडेट करें: bit.ly/aadhar-kyc-verify

- UIDAI, भारत सरकार`,
      result: {
        verdict: 'उच्च',
        type: 'आधार फ़िशिंग स्कैम',
        confidence: 96,
        summary: 'आपका आधार डेटा चुराने के लिए फ़िशिंग लिंक के साथ नकली UIDAI संदेश।',
        indicators: [
          'छोटा URL (bit.ly) - वास्तविक गंतव्य छिपा रहा है',
          'नकली दबाव ("24 घंटे", "स्थायी रूप से ब्लॉक")',
          'धमकी भरे परिणाम (फ्रोजन खाते, ब्लॉक सेवाएं)',
          'UIDAI कभी ऐसे संदेश SMS से नहीं भेजता',
          'असली UIDAI वेबसाइट uidai.gov.in है (bit.ly लिंक नहीं)',
          'बिना सोचे कार्य करवाने के लिए दबाव रणनीति'
        ],
        actions: [
          '✅ इस संदेश में किसी भी लिंक पर क्लिक न करें',
          '✅ यह संदेश तुरंत डिलीट करें',
          '✅ असली आधार अपडेट: केवल uidai.gov.in पर',
          '✅ UIDAI कभी आधार ब्लॉक करने की धमकी नहीं देता',
          '✅ लिंक क्लिक किया तो 1930 पर रिपोर्ट करें'
        ]
      }
    },
    {
      id: 'upi-cashback',
      title: 'UPI कैशबैक APK स्कैम',
      icon: '💰',
      content: `🎉 बधाई हो! 🎉

आपको UPI कैशबैक 2024 प्रोग्राम के लिए चुना गया है!

हर UPI ट्रांजैक्शन पर ₹500 तुरंत कैशबैक पाएं!

अभी आधिकारिक ऐप डाउनलोड करें:
📲 Paytm-Cashback-2024.apk

✅ Google द्वारा सत्यापित
✅ 4.8★ रेटिंग
✅ 10 लाख+ डाउनलोड
✅ 100% सुरक्षित

डाउनलोड लिंक:
https://drive.google.com/uc?id=1a2b3c4d5e6f7g8h9i0j

ऑफर आधी रात तक वैध! मिस न करें!

- UPI रिवार्ड्स टीम`,
      result: {
        verdict: 'गंभीर',
        type: 'नकली बैंकिंग ऐप (बैंकिंग ट्रोजन)',
        confidence: 99,
        summary: 'कैशबैक ऐप के रूप में छिपा दुर्भावनापूर्ण APK। सभी बैंकिंग क्रेडेंशियल चुराएगा।',
        indicators: [
          'Play Store के बाहर साझा किया गया APK फ़ाइल',
          'Paytm की नकल करता नकली ऐप नाम',
          'Google Drive पर अपलोड (आधिकारिक स्रोत नहीं)',
          'अवास्तविक ऑफर (हर ट्रांजैक्शन पर ₹500)',
          'झूठे दावे (Google द्वारा सत्यापित नहीं)',
          'नकली दबाव ("आधी रात तक वैध")',
          'असली Paytm कभी Drive/WhatsApp से ऐप वितरित नहीं करता'
        ],
        actions: [
          '🚨 इस APK को डाउनलोड या इंस्टॉल न करें',
          '✅ केवल Google Play Store से ऐप इंस्टॉल करें',
          '✅ भेजने वाले को ब्लॉक करें',
          '✅ तुरंत 1930 पर रिपोर्ट करें',
          '✅ दोस्तों/परिवार को इस स्कैम के बारे में चेतावनी दें',
          '✅ पहले से इंस्टॉल किया: अपने फोन को फैक्ट्री रीसेट करें'
        ]
      }
    }
  ]
};

export default function DemoScamModal({ isOpen, onClose, onNavigate, lang }: Props) {
  const [selectedScam, setSelectedScam] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const demos = DEMO_SCAMS[lang];
  const currentDemo = demos.find(d => d.id === selectedScam);

  const handleSelectScam = (scamId: string) => {
    setSelectedScam(scamId);
    setShowResult(false);
  };

  const handleScan = () => {
    setShowResult(true);
  };

  const handleClose = () => {
    setSelectedScam(null);
    setShowResult(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl border-2 border-cyan-500 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900 to-blue-900 border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PlayCircle className="w-8 h-8 text-cyan-400" />
            {lang === 'en' ? 'Try a Demo Scam' : 'डेमो स्कैम आज़माएं'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!selectedScam && (
            <>
              <p className="text-gray-300 text-lg">
                {lang === 'en'
                  ? 'Select a demo scam to see how QuantumGuard detects it:'
                  : 'QuantumGuard कैसे पहचानता है यह देखने के लिए डेमो स्कैम चुनें:'}
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {demos.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => handleSelectScam(demo.id)}
                    className="bg-white/5 hover:bg-white/10 backdrop-blur rounded-xl border border-white/10 hover:border-cyan-500 p-6 transition text-left"
                  >
                    <div className="text-5xl mb-3">{demo.icon}</div>
                    <h3 className="font-bold text-white text-lg">{demo.title}</h3>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedScam && currentDemo && !showResult && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setSelectedScam(null)}
                  className="text-cyan-400 hover:underline"
                >
                  ← {lang === 'en' ? 'Back' : 'वापस'}
                </button>
                <h3 className="text-2xl font-bold">{currentDemo.title}</h3>
              </div>

              <div className="bg-black/40 backdrop-blur rounded-xl border border-white/10 p-6">
                <p className="text-sm text-gray-400 mb-4">
                  {lang === 'en' ? 'Sample scam message:' : 'नमूना स्कैम संदेश:'}
                </p>
                <div className="bg-white/5 rounded-lg p-4 whitespace-pre-wrap text-gray-200 font-mono text-sm">
                  {currentDemo.content}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleScan}
                  className="px-12 py-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-lg"
                >
                  {lang === 'en' ? '🔍 Scan This Demo' : '🔍 इस डेमो को स्कैन करें'}
                </button>
              </div>
            </>
          )}

          {showResult && currentDemo && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setShowResult(false)}
                  className="text-cyan-400 hover:underline"
                >
                  ← {lang === 'en' ? 'Back' : 'वापस'}
                </button>
              </div>

              {/* Result */}
              <div className={`backdrop-blur rounded-2xl border-2 p-8 ${
                currentDemo.result.verdict === 'CRITICAL' || currentDemo.result.verdict === 'गंभीर'
                  ? 'bg-red-900/40 border-red-500 animate-pulse'
                  : 'bg-orange-900/40 border-orange-500'
              }`}>
                <div className="flex items-start gap-4 mb-6">
                  <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-3xl font-bold text-white">{currentDemo.result.type}</h3>
                      <span className="px-4 py-2 bg-red-500 rounded-full font-bold">
                        {currentDemo.result.verdict}
                      </span>
                    </div>
                    <p className="text-xl text-gray-200 mb-2">{currentDemo.result.summary}</p>
                    <p className="text-sm text-gray-400">
                      AI Confidence: <strong className="text-white">{currentDemo.result.confidence}%</strong>
                    </p>
                  </div>
                </div>

                {/* Indicators */}
                <div className="bg-black/40 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    {lang === 'en' ? 'Why This is a Scam:' : 'यह स्कैम क्यों है:'}
                  </h4>
                  <ul className="space-y-2">
                    {currentDemo.result.indicators.map((indicator, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                       <span className="text-red-400">⚠</span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="bg-green-900/40 rounded-xl border border-green-500 p-6">
                  <h4 className="font-bold text-green-400 mb-4">
                    {lang === 'en' ? '✅ What to Do:' : '✅ क्या करें:'}
                  </h4>
                  <ul className="space-y-2">
                    {currentDemo.result.actions.map((action, i) => (
                      <li key={i} className="text-sm text-gray-200">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reassurance */}
              <div className="bg-cyan-600/20 backdrop-blur rounded-xl border border-cyan-500/50 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-cyan-200">
                      <strong>{lang === 'en' ? '🎉 You\'re Safe!' : '🎉 आप सुरक्षित हैं!'}</strong>
                      {' '}
                      {lang === 'en'
                        ? 'This was just a demo. Now you know how to spot this scam if it happens to you!'
                        : 'यह सिर्फ एक डेमो था। अब आप जानते हैं कि यह स्कैम आपके साथ होने पर इसे कैसे पहचानें!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    handleClose();
                    onNavigate('education');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:scale-105 transition"
                >
                  {lang === 'en' ? 'Watch Full Videos' : 'पूरे वीडियो देखें'}
                </button>
                <button
                  onClick={() => {
                    setShowResult(false);
                    setSelectedScam(null);
                  }}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
                >
                  {lang === 'en' ? 'Try Another Demo' : 'दूसरा डेमो आज़माएं'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}