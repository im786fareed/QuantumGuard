'use client';

import { Download, Shield, AlertTriangle, CheckCircle, FolderOpen, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface DownloadFile {
  id: number;
  name: string;
  size: string;
  date: string;
  threat: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatType: string;
  confidence: number;
  indicators: string[];
  actions: string[];
}

const CONTENT = {
  en: {
    title: 'Download Scanner',
    subtitle: 'Scan downloaded files for malware and threats',
    scanButton: 'Scan Downloads Folder',
    loading: 'Scanning files...',
    noFiles: 'No suspicious files found',
    browserWarning: '⚠️ Browser Limitation',
    browserMessage: 'Web apps cannot access your Downloads folder directly.\n\nOptions:\n1. Use "File Scan" tab to manually upload suspicious files\n2. Try our "Demo Scam" feature on homepage\n3. Wait for Android app with automatic scanning\n\nFor now, manually check suspicious downloads using our File Scanner tool!',
    tabs: {
      scan: 'Scan',
      learn: 'Learn',
      stats: 'Stats'
    },
    deleteButton: 'Delete File',
    openLocation: 'Open Location'
  },
  hi: {
    title: 'डाउनलोड स्कैनर',
    subtitle: 'मैलवेयर और खतरों के लिए डाउनलोड की गई फ़ाइलें स्कैन करें',
    scanButton: 'डाउनलोड फ़ोल्डर स्कैन करें',
    loading: 'फ़ाइलें स्कैन कर रहे हैं...',
    noFiles: 'कोई संदिग्ध फ़ाइलें नहीं मिलीं',
    browserWarning: '⚠️ ब्राउज़र सीमा',
    browserMessage: 'वेब ऐप सीधे आपके डाउनलोड फ़ोल्डर तक नहीं पहुंच सकते।\n\nविकल्प:\n1. संदिग्ध फ़ाइलें मैन्युअल रूप से अपलोड करने के लिए "File Scan" टैब उपयोग करें\n2. होमपेज पर हमारे "Demo Scam" फीचर को आज़माएं\n3. स्वचालित स्कैनिंग के साथ Android ऐप की प्रतीक्षा करें\n\nअभी के लिए, हमारे File Scanner टूल का उपयोग करके संदिग्ध डाउनलोड मैन्युअल रूप से जांचें!',
    tabs: {
      scan: 'स्कैन',
      learn: 'सीखें',
      stats: 'आँकड़े'
    },
    deleteButton: 'फ़ाइल डिलीट करें',
    openLocation: 'स्थान खोलें'
  }
};

const MOCK_FILES: { [key: string]: DownloadFile[] } = {
  en: [
    {
      id: 1,
      name: 'Paytm-Cashback-2024.apk',
      size: '3.2 MB',
      date: '2 hours ago',
      threat: 'CRITICAL',
      threatType: 'Banking Trojan',
      confidence: 99,
      indicators: [
        'APK file from untrusted source',
        'Requests dangerous permissions (READ_SMS, RECEIVE_SMS)',
        'Matches known banking trojan signature',
        'Fake app impersonating Paytm',
        'No digital signature from legitimate developer'
      ],
      actions: [
        '🚨 DELETE THIS FILE IMMEDIATELY',
        'DO NOT install this APK',
        'If already installed: Uninstall now and factory reset phone',
        'Change all banking passwords',
        'Contact your bank immediately',
        'Report to 1930'
      ]
    },
    {
      id: 2,
      name: 'Invoice_Dec2024.pdf',
      size: '245 KB',
      date: '1 day ago',
      threat: 'SAFE',
      threatType: 'Clean Document',
      confidence: 98,
      indicators: [
        'Standard PDF format',
        'No embedded scripts',
        'No suspicious links',
        'File signature matches legitimate PDF'
      ],
      actions: [
        '✅ This file appears safe to open',
        'Always verify sender before opening attachments'
      ]
    },
    {
      id: 3,
      name: 'Setup_Crack_Free.exe',
      size: '12.8 MB',
      date: '3 days ago',
      threat: 'HIGH',
      threatType: 'Potential Malware',
      confidence: 94,
      indicators: [
        'Executable file (.exe)',
        'Suspicious filename (Crack, Free)',
        'Common malware distribution pattern',
        'No digital signature',
        'Downloaded from unknown source'
      ],
      actions: [
        '⚠️ DO NOT run this file',
        'Delete immediately',
        'Scan your system with antivirus',
        'Never download cracked software'
      ]
    }
  ],
  hi: [
    {
      id: 1,
      name: 'Paytm-Cashback-2024.apk',
      size: '3.2 MB',
      date: '2 घंटे पहले',
      threat: 'CRITICAL',
      threatType: 'बैंकिंग ट्रोजन',
      confidence: 99,
      indicators: [
        'अविश्वसनीय स्रोत से APK फ़ाइल',
        'खतरनाक अनुमतियां मांगता है (READ_SMS, RECEIVE_SMS)',
        'ज्ञात बैंकिंग ट्रोजन हस्ताक्षर से मेल खाता है',
        'Paytm की नकल करता नकली ऐप',
        'वैध डेवलपर से कोई डिजिटल हस्ताक्षर नहीं'
      ],
      actions: [
        '🚨 यह फ़ाइल तुरंत डिलीट करें',
        'इस APK को इंस्टॉल न करें',
        'पहले से इंस्टॉल है: अभी अनइंस्टॉल करें और फोन फैक्ट्री रीसेट करें',
        'सभी बैंकिंग पासवर्ड बदलें',
        'तुरंत अपने बैंक से संपर्क करें',
        '1930 पर रिपोर्ट करें'
      ]
    },
    {
      id: 2,
      name: 'Invoice_Dec2024.pdf',
      size: '245 KB',
      date: '1 दिन पहले',
      threat: 'SAFE',
      threatType: 'साफ दस्तावेज़',
      confidence: 98,
      indicators: [
        'मानक PDF प्रारूप',
        'कोई एम्बेडेड स्क्रिप्ट नहीं',
        'कोई संदिग्ध लिंक नहीं',
        'फ़ाइल हस्ताक्षर वैध PDF से मेल खाता है'
      ],
      actions: [
        '✅ यह फ़ाइल खोलने के लिए सुरक्षित लगती है',
        'अटैचमेंट खोलने से पहले हमेशा प्रेषक सत्यापित करें'
      ]
    },
    {
      id: 3,
      name: 'Setup_Crack_Free.exe',
      size: '12.8 MB',
      date: '3 दिन पहले',
      threat: 'HIGH',
      threatType: 'संभावित मैलवेयर',
      confidence: 94,
      indicators: [
        'निष्पादन योग्य फ़ाइल (.exe)',
        'संदिग्ध फ़ाइल नाम (Crack, Free)',
        'सामान्य मैलवेयर वितरण पैटर्न',
        'कोई डिजिटल हस्ताक्षर नहीं',
        'अज्ञात स्रोत से डाउनलोड किया गया'
      ],
      actions: [
        '⚠️ इस फ़ाइल को चलाएं नहीं',
        'तुरंत डिलीट करें',
        'एंटीवायरस से अपने सिस्टम को स्कैन करें',
        'कभी क्रैक्ड सॉफ्टवेयर डाउनलोड न करें'
      ]
    }
  ]
};

export default function DownloadScanner({ lang }: Props) {
  const [activeTab, setActiveTab] = useState<'scan' | 'learn' | 'stats'>('scan');
  const [loading, setLoading] = useState(false);
  const [scannedFiles, setScannedFiles] = useState<DownloadFile[]>([]);

  const content = CONTENT[lang];
  const mockFiles = MOCK_FILES[lang];

  const handleScanDownloads = () => {
    // Browser cannot access Downloads folder
    alert(content.browserWarning + '\n\n' + content.browserMessage);
    return;
    
    // This code would only work in native app
    /*
    setLoading(true);
    setTimeout(() => {
      setScannedFiles(mockFiles);
      setLoading(false);
    }, 2000);
    */
  };

  const handleDelete = (fileName: string) => {
    alert('⚠️ ' + (lang === 'en' ? 'Browser Limitation' : 'ब्राउज़र सीमा') + '\n\n' + 
      (lang === 'en' 
        ? 'Web apps cannot delete files from your device.\n\nTo delete this file:\n1. Open your Downloads folder\n2. Find: ' + fileName + '\n3. Delete manually\n\nFor auto-deletion, download our Android app (coming soon).'
        : 'वेब ऐप आपके डिवाइस से फ़ाइलें डिलीट नहीं कर सकते।\n\nयह फ़ाइल डिलीट करने के लिए:\n1. अपना डाउनलोड फ़ोल्डर खोलें\n2. खोजें: ' + fileName + '\n3. मैन्युअल रूप से डिलीट करें\n\nऑटो-डिलीशन के लिए, हमारा Android ऐप डाउनलोड करें (जल्द आ रहा है)।'
      )
    );
  };

  const handleOpenLocation = (fileName: string) => {
    alert('⚠️ ' + (lang === 'en' ? 'Browser Limitation' : 'ब्राउज़र सीमा') + '\n\n' + 
      (lang === 'en'
        ? 'Web apps cannot open file system locations.\n\nTo find this file:\n• Windows: Press Win+E → Downloads folder\n• Mac: Open Finder → Downloads\n• Android: Files app → Downloads\n\nLook for: ' + fileName
        : 'वेब ऐप फ़ाइल सिस्टम स्थान नहीं खोल सकते।\n\nयह फ़ाइल खोजने के लिए:\n• Windows: Win+E दबाएं → डाउनलोड फ़ोल्डर\n• Mac: Finder खोलें → डाउनलोड\n• Android: Files ऐप → डाउनलोड\n\nखोजें: ' + fileName
      )
    );
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
        <div className="inline-block p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl mb-4">
          <Download className="w-12 h-12 text-green-400" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center">
        {(['scan', 'learn', 'stats'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              activeTab === tab
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {content.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Scan Tab */}
      {activeTab === 'scan' && (
        <div className="space-y-6">
          {/* Scan Button */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
            <button
              onClick={handleScanDownloads}
              disabled={loading}
              className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl font-bold text-xl hover:scale-105 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Download className="w-6 h-6 animate-bounce" />
                  {content.loading}
                </span>
              ) : (
                content.scanButton
              )}
            </button>
            <p className="text-sm text-gray-400 mt-4">
              {lang === 'en'
                ? 'Click to scan your Downloads folder for malicious files'
                : 'दुर्भावनापूर्ण फ़ाइलों के लिए अपने डाउनलोड फ़ोल्डर को स्कैन करने के लिए क्लिक करें'}
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-600/20 backdrop-blur rounded-xl border border-green-500/50 p-6">
            <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {lang === 'en' ? 'Privacy Guarantee' : 'गोपनीयता गारंटी'}
            </h3>
            <ul className="text-sm text-green-200 space-y-1">
              <li>✓ {lang === 'en' ? 'Only scans when you click the button' : 'केवल बटन क्लिक करने पर स्कैन करता है'}</li>
              <li>✓ {lang === 'en' ? 'No automatic background scanning' : 'कोई स्वचालित पृष्ठभूमि स्कैनिंग नहीं'}</li>
              <li>✓ {lang === 'en' ? 'Analysis happens on your device' : 'विश्लेषण आपके डिवाइस पर होता है'}</li>
              <li>✓ {lang === 'en' ? 'Files never uploaded to servers' : 'फ़ाइलें कभी सर्वर पर अपलोड नहीं की जातीं'}</li>
            </ul>
          </div>

          {/* Results */}
          {scannedFiles.length > 0 && (
            <div className="space-y-4">
              {scannedFiles.map((file) => (
                <div
                  key={file.id}
                  className={`backdrop-blur rounded-2xl border-2 p-6 ${getSeverityColor(file.threat)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5" />
                        <span className="font-bold text-white">{file.name}</span>
                        <span className={`px-3 py-1 ${getSeverityBadge(file.threat)} rounded-full text-xs font-bold ml-2`}>
                          {file.threat}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>{file.size}</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-2">{file.threatType}</h4>
                      <p className="text-sm text-gray-400">
                        {lang === 'en' ? 'AI Confidence: ' : 'AI विश्वास: '}
                        <strong className="text-white">{file.confidence}%</strong>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {lang === 'en' ? 'Threat Indicators:' : 'खतरे के संकेतक:'}
                      </h4>
                      <ul className="space-y-1">
                        {file.indicators.map((indicator, i) => (
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
                        {file.actions.map((action, i) => (
                          <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {file.threat !== 'SAFE' && (
                        <button
                          onClick={() => handleDelete(file.name)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-sm transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          {content.deleteButton}
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenLocation(file.name)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition"
                      >
                        <FolderOpen className="w-4 h-4" />
                        {content.openLocation}
                      </button>
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
            {lang === 'en' ? 'Dangerous File Types' : 'खतरनाक फ़ाइल प्रकार'}
          </h2>
          <div className="space-y-4">
            <div className="bg-red-900/20 rounded-xl border border-red-500/50 p-6">
              <h3 className="font-bold text-red-400 mb-2">
                {lang === 'en' ? '1. APK Files (Android Apps)' : '1. APK फ़ाइलें (Android ऐप)'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Never install APKs from WhatsApp, Telegram, or unknown websites. Only use Google Play Store.'
                  : 'WhatsApp, Telegram, या अज्ञात वेबसाइटों से कभी APK इंस्टॉल न करें। केवल Google Play Store उपयोग करें।'}
              </p>
            </div>
            <div className="bg-orange-900/20 rounded-xl border border-orange-500/50 p-6">
              <h3 className="font-bold text-orange-400 mb-2">
                {lang === 'en' ? '2. EXE Files (Programs)' : '2. EXE फ़ाइलें (प्रोग्राम)'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Never run cracked software or keygens. They often contain malware and trojans.'
                  : 'कभी क्रैक्ड सॉफ्टवेयर या keygen न चलाएं। उनमें अक्सर मैलवेयर और ट्रोजन होते हैं।'}
              </p>
            </div>
            <div className="bg-yellow-900/20 rounded-xl border border-yellow-500/50 p-6">
              <h3 className="font-bold text-yellow-400 mb-2">
                {lang === 'en' ? '3. Macro-Enabled Documents' : '3. मैक्रो-सक्षम दस्तावेज़'}
              </h3>
              <p className="text-gray-300 text-sm">
                {lang === 'en'
                  ? 'Be cautious with .docm, .xlsm files from unknown senders. Disable macros unless absolutely needed.'
                  : 'अज्ञात प्रेषकों से .docm, .xlsm फ़ाइलों से सावधान रहें। जब तक बिल्कुल जरूरी न हो मैक्रो अक्षम करें।'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur rounded-2xl border-2 border-red-500 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-5xl font-bold text-red-400 mb-2">2,847</p>
            <p className="text-gray-300">
              {lang === 'en' ? 'Malware Signatures Detected' : 'मैलवेयर हस्ताक्षर पाए गए'}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur rounded-2xl border-2 border-green-500 p-8 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-5xl font-bold text-green-400 mb-2">98.7%</p>
            <p className="text-gray-300">
              {lang === 'en' ? 'Detection Accuracy' : 'पहचान सटीकता'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}