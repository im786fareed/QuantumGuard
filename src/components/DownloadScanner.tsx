'use client';

import { Download, Shield, AlertTriangle, CheckCircle, XCircle, FileWarning, Trash2, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface FileAnalysis {
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadTime: string;
  source: string;
  isThreat: boolean;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatType: string;
  aiConfidence: number;
  indicators: string[];
  filePath: string;
}

const CONTENT = {
  en: {
    title: 'Download Scanner - Check Suspicious Files',
    subtitle: 'One-tap file threat detection. Protects against APK malware, ransomware, and malicious files.',
    scanButton: 'Scan Recent Downloads',
    scanning: 'Scanning download folder...',
    result: 'Scan Results',
    scanAnother: 'Scan Again',
    deleteFile: 'Delete File',
    openLocation: 'Open Location',
    markSafe: 'Mark as Safe',
    howItWorks: 'How Download Scanner Works',
    noThreats: 'No Threats Found',
    allSafe: 'All recent downloads appear safe'
  },
  hi: {
    title: 'डाउनलोड स्कैनर - संदिग्ध फ़ाइलें जांचें',
    subtitle: 'एक टैप से फ़ाइल खतरा पहचान। APK मैलवेयर, रैंसमवेयर और दुर्भावनापूर्ण फ़ाइलों से बचाता है।',
    scanButton: 'हाल के डाउनलोड स्कैन करें',
    scanning: 'डाउनलोड फ़ोल्डर स्कैन हो रहा है',
    result: 'स्कैन परिणाम',
    scanAnother: 'फिर से स्कैन करें',
    deleteFile: 'फ़ाइल हटाएं',
    openLocation: 'स्थान खोलें',
    markSafe: 'सुरक्षित चिह्नित करें',
    howItWorks: 'डाउनलोड स्कैनर कैसे काम करता है',
    noThreats: 'कोई खतरा नहीं मिला',
    allSafe: 'सभी हाल के डाउनलोड सुरक्षित दिखते हैं'
  }
};

export default function DownloadScanner({ lang }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<FileAnalysis[]>([]);
  const content = CONTENT[lang];

  // SIMULATED FILE SCANNING (In React Native, use react-native-fs)
  const simulateFileScan = async (): Promise<FileAnalysis[]> => {
    // Simulate scanning downloads folder
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock file data for demo
    const mockFiles: FileAnalysis[] = [
      {
        fileName: 'Paytm-Update-2025.apk',
        fileSize: 8450000,
        fileType: 'APK',
        downloadTime: '2 minutes ago',
        source: 'WhatsApp',
        isThreat: true,
        threatLevel: 'CRITICAL',
        threatType: 'Fake Banking App (Banking Trojan)',
        aiConfidence: 99,
        indicators: [
          'APK file outside Google Play Store',
          'Disguised as legitimate Paytm app',
          'Downloaded from WhatsApp (not official channel)',
          'Requests dangerous permissions (SMS, Contacts, Storage)',
          'Signature does not match real Paytm app',
          'Known malware hash in threat database'
        ],
        filePath: '/storage/emulated/0/Download/Paytm-Update-2025.apk'
      },
      {
        fileName: 'Invoice_December.pdf',
        fileSize: 245000,
        fileType: 'PDF',
        downloadTime: '1 hour ago',
        source: 'Email',
        isThreat: false,
        threatLevel: 'SAFE',
        threatType: 'Legitimate Document',
        aiConfidence: 98,
        indicators: [
          'Standard PDF format',
          'No embedded scripts or macros',
          'File size appropriate for document',
          'No suspicious metadata',
          'Downloaded from trusted email domain'
        ],
        filePath: '/storage/emulated/0/Download/Invoice_December.pdf'
      },
      {
        fileName: 'WhatsApp-Plus-v9.5.apk',
        fileSize: 45700000,
        fileType: 'APK',
        downloadTime: '3 hours ago',
        source: 'Telegram',
        isThreat: true,
        threatLevel: 'HIGH',
        threatType: 'Modified WhatsApp (Spyware Risk)',
        aiConfidence: 96,
        indicators: [
          'Modified WhatsApp application',
          'Contains spyware components',
          'Monitors all messages and calls',
          'Uploads data to unknown servers',
          'Violates WhatsApp terms of service',
          'Can lead to account ban'
        ],
        filePath: '/storage/emulated/0/Download/WhatsApp-Plus-v9.5.apk'
      },
      {
        fileName: 'Holiday_Photos.zip',
        fileSize: 12500000,
        fileType: 'ZIP',
        downloadTime: '5 hours ago',
        source: 'Browser',
        isThreat: false,
        threatLevel: 'SAFE',
        threatType: 'Archive File',
        aiConfidence: 95,
        indicators: [
          'Standard ZIP archive',
          'Contains image files (JPEG)',
          'No executable files inside',
          'Downloaded from known photo sharing site',
          'File size matches content'
        ],
        filePath: '/storage/emulated/0/Download/Holiday_Photos.zip'
      }
    ];

    return mockFiles;
  };

  const handleScanDownloads = async () => {
    // In production web app, show browser limitation message
    if (typeof window !== 'undefined' && !('showDirectoryPicker' in window)) {
      alert(
        lang === 'en'
          ? '⚠️ File scanning requires native Android app.\n\nThis feature works in:\n• QuantumGuard Android App (coming soon)\n• For now, manually upload files in FILE SCAN\n\nWe\'ll notify you when Android app launches!'
          : '⚠️ फ़ाइल स्कैनिंग के लिए नेटिव Android ऐप की आवश्यकता है।\n\nयह फीचर काम करता है:\n• QuantumGuard Android ऐप में (जल्द आ रहा है)\n• अभी के लिए, FILE SCAN में फ़ाइलें मैन्युअल रूप से अपलोड करें\n\nजब Android ऐप लॉन्च होगा तो हम आपको सूचित करेंगे!'
      );
      return;
    }

    setIsScanning(true);
    setResults([]);

    try {
      const fileAnalysis = await simulateFileScan();
      setResults(fileAnalysis);
    } catch (error) {
      console.error('File scan error:', error);
      alert(lang === 'en' ? 'Error scanning files. Please try again.' : 'फ़ाइल स्कैन करने में त्रुटि। कृपया पुनः प्रयास करें।');
    }

    setIsScanning(false);
  };

  const handleDeleteFile = (fileName: string) => {
    const confirmed = confirm(
      lang === 'en'
        ? `Delete ${fileName}?\n\nThis action cannot be undone.`
        : `${fileName} हटाएं?\n\nयह क्रिया पूर्ववत नहीं की जा सकती।`
    );

    if (confirmed) {
      // In production, actual file deletion happens here
      alert(
        lang === 'en'
          ? `✅ File deleted: ${fileName}\n\nYour device is now safe.`
          : `✅ फ़ाइल हटाई गई: ${fileName}\n\nआपका डिवाइस अब सुरक्षित है।`
      );
      setResults(results.filter(f => f.fileName !== fileName));
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-purple-500/20 rounded-2xl mb-4">
          <Download className="w-12 h-12 text-purple-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* Scan Button */}
      {results.length === 0 && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <Shield className="w-24 h-24 text-purple-400 mx-auto mb-6" />
              <p className="text-gray-300 text-lg mb-8">
                {lang === 'en'
                  ? 'Click button below to scan your recent downloads for APK malware, ransomware, malicious PDFs, and suspicious files.'
                  : 'APK मैलवेयर, रैंसमवेयर, दुर्भावनापूर्ण PDF और संदिग्ध फ़ाइलों के लिए अपने हाल के डाउनलोड स्कैन करने के लिए नीचे बटन पर क्लिक करें।'}
              </p>
              <button
                onClick={handleScanDownloads}
                disabled={isScanning}
                className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <span className="animate-pulse">{content.scanning}</span>
                ) : (
                  content.scanButton
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
                      ? 'Click "Scan Recent Downloads" button above'
                      : 'ऊपर "हाल के डाउनलोड स्कैन करें" बटन पर क्लिक करें'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <span>
                    {lang === 'en'
                      ? 'QuantumGuard scans your Downloads folder (permission required)'
                      : 'QuantumGuard आपके डाउनलोड फ़ोल्डर को स्कैन करता है (अनुमति आवश्यक)'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <span>
                    {lang === 'en'
                      ? 'AI analyzes each file for: APK malware, ransomware, malicious scripts, fake apps'
                      : 'AI प्रत्येक फ़ाइल का विश्लेषण करता है: APK मैलवेयर, रैंसमवेयर, दुर्भावनापूर्ण स्क्रिप्ट, नकली ऐप'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <span>
                    {lang === 'en'
                      ? 'Shows threat level, file source (WhatsApp/Telegram/Email), and protective actions'
                      : 'खतरे का स्तर, फ़ाइल स्रोत (WhatsApp/Telegram/Email), और सुरक्षात्मक कार्रवाई दिखाता है'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">5.</span>
                  <span>
                    {lang === 'en'
                      ? 'YOU decide: Delete threat, mark safe, or open file location'
                      : 'आप तय करें: खतरा हटाएं, सुरक्षित चिह्नित करें, या फ़ाइल स्थान खोलें'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">6.</span>
                  <span className="font-bold text-green-300">
                    {lang === 'en'
                      ? 'No automatic deletion - you stay in control'
                      : 'कोई स्वचालित हटाना नहीं - आप नियंत्रण में रहते हैं'}
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
                      ? 'File scanning happens ONLY when you click the button. We do NOT monitor your downloads in the background. Files are analyzed on your device and are NOT uploaded to any server. We do NOT access or read your personal files (photos, documents).'
                      : 'फ़ाइल स्कैनिंग केवल तभी होती है जब आप बटन पर क्लिक करते हैं। हम बैकग्राउंड में आपके डाउनलोड की निगरानी नहीं करते। फ़ाइलों का विश्लेषण आपके डिवाइस पर किया जाता है और किसी भी सर्वर पर अपलोड नहीं किया जाता। हम आपकी व्यक्तिगत फ़ाइलों (फ़ोटो, दस्तावेज़) तक पहुंच या पढ़ते नहीं हैं।'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Note */}
          <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-yellow-200">
                  <strong>⚠️ {lang === 'en' ? 'Current Limitation:' : 'वर्तमान सीमा:'}</strong>
                  {' '}
                  {lang === 'en'
                    ? 'File system access requires native Android app permissions. This feature is demonstrated with sample data in the web version. For real file scanning, install QuantumGuard Android App (launching soon on Google Play Store).'
                    : 'फ़ाइल सिस्टम एक्सेस के लिए नेटिव Android ऐप अनुमति की आवश्यकता है। यह फीचर वेब संस्करण में नमूना डेटा के साथ प्रदर्शित किया गया है। वास्तविक फ़ाइल स्कैनिंग के लिए, QuantumGuard Android ऐप इंस्टॉल करें (जल्द ही Google Play Store पर लॉन्च हो रहा है)।'}
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
              <FileWarning className="w-6 h-6 text-purple-400" />
              {content.result} ({results.length} {lang === 'en' ? 'files scanned' : 'फ़ाइलें स्कैन की गईं'})
            </h3>

            <div className="space-y-6">
              {results.map((file, index) => (
                <div
                  key={index}
                  className={`backdrop-blur rounded-2xl border-2 p-6 ${getThreatColor(file.threatLevel)}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {getThreatIcon(file.threatLevel)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-2xl font-bold text-white break-all">{file.fileName}</h4>
                        <span className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ml-4 ${getThreatColor(file.threatLevel)}`}>
                          {file.threatLevel}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-3">
                        <div>📦 {formatFileSize(file.fileSize)}</div>
                        <div>📁 {file.fileType}</div>
                        <div>⏱️ {file.downloadTime}</div>
                        <div>📲 {file.source}</div>
                      </div>
                      <p className="text-lg font-bold text-white mb-2">{file.threatType}</p>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <h5 className="font-bold text-white">
                        {lang === 'en' ? 'AI Analysis:' : 'AI विश्लेषण:'}
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {file.indicators.map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                          <span className={file.isThreat ? 'text-red-400' : 'text-green-400'}>
                            {file.isThreat ? '⚠️' : '✓'}
                          </span>
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-xs text-gray-400">
                        AI Confidence: <strong className="text-white">{file.aiConfidence}%</strong>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 flex-wrap">
                    {file.isThreat && (
                      <button
                        onClick={() => handleDeleteFile(file.fileName)}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition"
                      >
                        <Trash2 className="w-5 h-5" />
                        {content.deleteFile}
                      </button>
                    )}
                    <button
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
                    >
                      <FolderOpen className="w-5 h-5" />
                      {content.openLocation}
                    </button>
                    {!file.isThreat && (
                      <button
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold transition"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {content.markSafe}
                      </button>
                    )}
                  </div>

                  {/* Critical Warning for Threats */}
                  {file.isThreat && (
                    <div className="mt-4 bg-red-950 rounded-xl border-2 border-red-500 p-4">
                      <h5 className="font-bold text-red-400 mb-2">
                        {lang === 'en' ? '🚨 CRITICAL WARNING:' : '🚨 गंभीर चेतावनी:'}
                      </h5>
                      <p className="text-sm text-gray-200">
                        {lang === 'en'
                          ? 'This file is extremely dangerous. Installing or opening it can compromise your entire device, steal banking credentials, and enable hackers to monitor all your activities. DELETE IMMEDIATELY.'
                          : 'यह फ़ाइल अत्यंत खतरनाक है। इसे इंस्टॉल करना या खोलना आपके पूरे डिवाइस को समझौता कर सकता है, बैंकिंग क्रेडेंशियल चुरा सकता है, और हैकर्स को आपकी सभी गतिविधियों की निगरानी करने में सक्षम बना सकता है। तुरंत हटाएं।'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-400">{results.filter(f => f.isThreat).length}</p>
                <p className="text-sm text-gray-400">{lang === 'en' ? 'Threats Found' : 'खतरे मिले'}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-400">{results.filter(f => !f.isThreat).length}</p>
                <p className="text-sm text-gray-400">{lang === 'en' ? 'Safe Files' : 'सुरक्षित फ़ाइलें'}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">{results.length}</p>
                <p className="text-sm text-gray-400">{lang === 'en' ? 'Total Scanned' : 'कुल स्कैन की गईं'}</p>
              </div>
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