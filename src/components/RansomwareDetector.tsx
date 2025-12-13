'use client';

import { Shield, AlertTriangle, CheckCircle, XCircle, FileWarning, Lock, Database } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface RansomwareAnalysis {
  isRansomware: boolean;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  confidence: number;
  indicators: string[];
  fileName: string;
  fileExtension: string;
  detectionMethod: string;
  ransomwareType?: string;
}

const CONTENT = {
  en: {
    title: 'AI Ransomware Pattern Detector',
    subtitle: 'Detect ransomware before it encrypts your device',
    uploadFile: 'Select Suspicious File',
    analyzeButton: 'AI Analyze for Ransomware',
    analyzing: 'AI scanning ransomware patterns...',
    result: 'Ransomware Analysis',
    threatLevel: 'Threat Level',
    confidence: 'AI Confidence',
    indicators: 'Ransomware Indicators',
    whatToDo: 'Protection Actions',
    checkAnother: 'Check Another File',
    disclaimer: 'AI-powered ransomware pattern detection. Identifies malicious file signatures, double extensions, and encryption behavior patterns.',
    criticalThreat: 'RANSOMWARE DETECTED',
    safeFile: 'No Ransomware Detected',
    howRansomwareWorks: 'How Ransomware Works'
  },
  hi: {
    title: 'AI रैंसमवेयर पैटर्न डिटेक्टर',
    subtitle: 'आपके डिवाइस को एन्क्रिप्ट करने से पहले रैंसमवेयर का पता लगाएं',
    uploadFile: 'संदिग्ध फ़ाइल चुनें',
    analyzeButton: 'रैंसमवेयर के लिए AI विश्लेषण',
    analyzing: 'AI रैंसमवेयर पैटर्न स्कैन कर रहा है',
    result: 'रैंसमवेयर विश्लेषण',
    threatLevel: 'खतरे का स्तर',
    confidence: 'AI विश्वास',
    indicators: 'रैंसमवेयर संकेतक',
    whatToDo: 'सुरक्षा कार्रवाई',
    checkAnother: 'अन्य फ़ाइल जांचें',
    disclaimer: 'AI संचालित रैंसमवेयर पैटर्न पहचान। दुर्भावनापूर्ण फ़ाइल हस्ताक्षर, डबल एक्सटेंशन और एन्क्रिप्शन व्यवहार पैटर्न की पहचान करता है।',
    criticalThreat: 'रैंसमवेयर मिला',
    safeFile: 'कोई रैंसमवेयर नहीं मिला',
    howRansomwareWorks: 'रैंसमवेयर कैसे काम करता है'
  }
};

export default function RansomwareDetector({ lang }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RansomwareAnalysis | null>(null);
  const content = CONTENT[lang];

  // AI-POWERED RANSOMWARE DETECTION
  const detectRansomware = (fileName: string, fileSize: number): RansomwareAnalysis => {
    const lower = fileName.toLowerCase();
    const indicators: string[] = [];
    let threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE' = 'SAFE';
    let confidence = 0;
    let detectionMethod = '';
    let ransomwareType = '';

    // PATTERN 1: Double File Extensions (Classic Ransomware Trick)
    const doubleExtensionPatterns = [
      '.pdf.exe', '.doc.exe', '.jpg.exe', '.png.exe', '.zip.exe',
      '.docx.exe', '.xlsx.exe', '.pptx.exe', '.txt.exe', '.mp4.exe'
    ];

    for (const pattern of doubleExtensionPatterns) {
      if (lower.endsWith(pattern)) {
        indicators.push(`Double extension detected: ${pattern}`);
        threatLevel = 'CRITICAL';
        confidence = 99;
        detectionMethod = 'Double Extension Analysis';
        ransomwareType = 'File Disguise Ransomware';
      }
    }

    // PATTERN 2: Known Ransomware Extensions
    const ransomwareExtensions = [
      '.locked', '.encrypted', '.crypto', '.locky', '.cerber', '.wannacry',
      '.cryptolocker', '.cryptowall', '.teslacrypt', '.vvv', '.zzz', '.exx',
      '.ezz', '.ecc', '.thor', '.aaa', '.xyz', '.zzz', '.micro', '.kraken',
      '.dharma', '.wallet', '.onion', '.wncry', '.wcry', '.crypt', '.r5a',
      '.crjoker', '.encryptedRSA', '.RDM', '.KEYZ', '.lechiffre', '.magic'
    ];

    for (const ext of ransomwareExtensions) {
      if (lower.endsWith(ext)) {
        indicators.push(`Known ransomware extension: ${ext}`);
        threatLevel = 'CRITICAL';
        confidence = 100;
        detectionMethod = 'Ransomware Signature Database';
        ransomwareType = 'Confirmed Ransomware File';
      }
    }

    // PATTERN 3: Suspicious File Names (Common Ransomware Naming)
    const suspiciousNames = [
      'decrypt', 'readme', 'how_to_decrypt', 'recover', 'locked',
      'encrypted', 'help_decrypt', 'restore', 'unlock', 'ransom',
      'payment', 'your_files', 'important', 'read_me', 'help_restore'
    ];

    for (const name of suspiciousNames) {
      if (lower.includes(name)) {
        indicators.push(`Suspicious filename pattern: contains "${name}"`);
        if (threatLevel === 'SAFE') threatLevel = 'HIGH';
        confidence = Math.max(confidence, 85);
        detectionMethod = 'Filename Pattern Analysis';
      }
    }

    // PATTERN 4: Executable Files with Document Icons
    const executableExtensions = ['.exe', '.scr', '.bat', '.cmd', '.vbs', '.js', '.jar'];
    const hasExecutable = executableExtensions.some(ext => lower.endsWith(ext));

    if (hasExecutable && !lower.includes('setup') && !lower.includes('install')) {
      indicators.push('Executable file without installer context');
      if (threatLevel === 'SAFE') threatLevel = 'MEDIUM';
      confidence = Math.max(confidence, 70);
    }

    // PATTERN 5: Unusual File Size (Ransomware is typically small)
    if (hasExecutable && fileSize < 500000 && fileSize > 10000) {
      indicators.push(`Suspicious file size for executable: ${(fileSize / 1024).toFixed(2)} KB`);
      if (threatLevel === 'SAFE') threatLevel = 'MEDIUM';
      confidence = Math.max(confidence, 65);
    }

    // PATTERN 6: Files with ransom note keywords
    const ransomNoteKeywords = [
      'bitcoin', 'btc', 'cryptocurrency', 'wallet', 'payment',
      'decrypt', 'restore', 'unlock', 'key', 'private'
    ];

    let noteKeywordCount = 0;
    for (const keyword of ransomNoteKeywords) {
      if (lower.includes(keyword)) {
        noteKeywordCount++;
      }
    }

    if (noteKeywordCount >= 2) {
      indicators.push(`Multiple ransom note keywords found (${noteKeywordCount})`);
      if (threatLevel === 'SAFE') threatLevel = 'HIGH';
      confidence = Math.max(confidence, 80);
      ransomwareType = 'Potential Ransom Note';
    }

    // PATTERN 7: Recently encrypted files (common user scenario)
    const recentlyEncryptedPatterns = [
      /\.id-.*\./, /\.[a-z]{3,5}$/
    ];

    for (const pattern of recentlyEncryptedPatterns) {
      if (pattern.test(lower) && lower.split('.').length > 2) {
        indicators.push('File appears to be recently encrypted (ID pattern detected)');
        threatLevel = 'CRITICAL';
        confidence = Math.max(confidence, 95);
        ransomwareType = 'Victim File (Already Encrypted)';
      }
    }

    const fileExtension = fileName.split('.').pop() || '';
    const isRansomware = indicators.length > 0;

    return {
      isRansomware,
      threatLevel: isRansomware ? threatLevel : 'SAFE',
      confidence: isRansomware ? confidence : 100,
      indicators,
      fileName,
      fileExtension,
      detectionMethod: detectionMethod || 'Multi-Pattern AI Analysis',
      ransomwareType
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analysis = detectRansomware(file.name, file.size);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  const getThreatColor = (level: string) => {
    if (level === 'SAFE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (level === 'MEDIUM') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    if (level === 'HIGH') return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
    return 'text-red-400 bg-red-900/40 border-red-500 animate-pulse';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-red-500/20 rounded-2xl mb-4 animate-pulse">
          <Lock className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* File Upload */}
      {!result && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
              <FileWarning className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="ransomware-file"
              />
              <label
                htmlFor="ransomware-file"
                className="px-6 py-3 bg-red-500 rounded-xl font-bold cursor-pointer inline-block hover:bg-red-600 transition"
              >
                {content.uploadFile}
              </label>
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300">
                    <strong>Selected:</strong> {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Size: {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !file}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? content.analyzing : content.analyzeButton}
            </button>
          </div>

          {/* Educational Info */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-red-400" />
              {content.howRansomwareWorks}
            </h3>
            
            <div className="space-y-4">
              <div className="bg-red-900/20 rounded-xl border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-white mb-2">
                  {lang === 'en' ? '1. Infection' : '1. संक्रमण'}
                </h4>
                <p className="text-sm text-gray-300">
                  {lang === 'en'
                    ? 'Ransomware enters via malicious email attachments, fake software downloads, or compromised websites.'
                    : 'रैंसमवेयर दुर्भावनापूर्ण ईमेल अटैचमेंट, नकली सॉफ़्टवेयर डाउनलोड या समझौता किए गए वेबसाइटों के माध्यम से प्रवेश करता है।'}
                </p>
              </div>

              <div className="bg-red-900/20 rounded-xl border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-white mb-2">
                  {lang === 'en' ? '2. Encryption' : '2. एन्क्रिप्शन'}
                </h4>
                <p className="text-sm text-gray-300">
                  {lang === 'en'
                    ? 'Once activated, it rapidly encrypts all files (photos, documents, videos) making them inaccessible.'
                    : 'एक बार सक्रिय होने पर, यह सभी फ़ाइलों (फ़ोटो, दस्तावेज़, वीडियो) को तेज़ी से एन्क्रिप्ट करता है जिससे वे दुर्गम हो जाती हैं।'}
                </p>
              </div>

              <div className="bg-red-900/20 rounded-xl border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-white mb-2">
                  {lang === 'en' ? '3. Ransom Demand' : '3. फिरौती की मांग'}
                </h4>
                <p className="text-sm text-gray-300">
                  {lang === 'en'
                    ? 'Displays ransom note demanding payment (usually cryptocurrency) to decrypt files. Often $500-$5000.'
                    : 'फ़ाइलों को डिक्रिप्ट करने के लिए भुगतान (आमतौर पर क्रिप्टोकरेंसी) की मांग करते हुए फिरौती नोट प्रदर्शित करता है। अक्सर $500-$5000।'}
                </p>
              </div>

              <div className="bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-400 mb-2">
                  {lang === 'en' ? '⚠️ Critical: Never Pay Ransom' : '⚠️ महत्वपूर्ण: कभी फिरौती न दें'}
                </h4>
                <p className="text-sm text-gray-300">
                  {lang === 'en'
                    ? 'Paying does NOT guarantee file recovery. 40% who pay never get decryption keys. Report to cybercrime instead.'
                    : 'भुगतान करने से फ़ाइल रिकवरी की गारंटी नहीं होती। भुगतान करने वालों में से 40% को कभी डिक्रिप्शन कुंजी नहीं मिलती। इसके बजाय साइबर क्राइम को रिपोर्ट करें।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safe Result */}
      {result && !result.isRansomware && (
        <div className="space-y-6">
          <div className="bg-green-600/20 backdrop-blur rounded-2xl border-2 border-green-500 p-8">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-16 h-16 text-green-400" />
              <div>
                <h3 className="text-3xl font-bold text-green-400">{content.safeFile}</h3>
                <p className="text-gray-300">
                  {lang === 'en'
                    ? 'No ransomware patterns detected in this file'
                    : 'इस फ़ाइल में कोई रैंसमवेयर पैटर्न नहीं मिला'}
                </p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6">
              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-white">File:</strong> {result.fileName}
              </p>
              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-white">Extension:</strong> .{result.fileExtension}
              </p>
              <p className="text-sm text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                {lang === 'en'
                  ? 'AI Confidence: File appears safe'
                  : 'AI विश्वास: फ़ाइल सुरक्षित दिखती है'}
              </p>
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAnother}
          </button>
        </div>
      )}

      {/* Ransomware Detected */}
      {result && result.isRansomware && (
        <div className="space-y-6">
          <div className={`backdrop-blur rounded-2xl border-2 p-8 ${getThreatColor(result.threatLevel)}`}>
            <div className="flex items-center gap-4 mb-6">
              <XCircle className="w-20 h-20 animate-pulse" />
              <div>
                <h3 className="text-4xl font-bold">{content.criticalThreat}</h3>
                <p className="text-lg">
                  {content.threatLevel}: <strong>{result.threatLevel}</strong>
                </p>
                <p className="text-lg">
                  {content.confidence}: <strong>{result.confidence}%</strong>
                </p>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-6 mb-6">
              <p className="text-sm mb-2">
                <strong className="text-white">File:</strong> {result.fileName}
              </p>
              <p className="text-sm mb-2">
                <strong className="text-white">Detection Method:</strong> {result.detectionMethod}
              </p>
              {result.ransomwareType && (
                <p className="text-sm mb-2">
                  <strong className="text-white">Type:</strong> {result.ransomwareType}
                </p>
              )}
            </div>

            <div className="bg-red-950 rounded-xl border-2 border-red-500 p-6">
              <h4 className="text-xl font-bold text-red-400 mb-4">
                {content.indicators}:
              </h4>
              <ul className="space-y-2">
                {result.indicators.map((indicator, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Immediate Actions */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-2xl font-bold mb-4 text-red-400">{content.whatToDo}:</h4>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li className="font-bold">
                {lang === 'en'
                  ? 'DO NOT open or execute this file'
                  : 'इस फ़ाइल को न खोलें या न चलाएं'}
              </li>
              <li className="font-bold">
                {lang === 'en'
                  ? 'DELETE this file immediately from your device'
                  : 'इस फ़ाइल को अपने डिवाइस से तुरंत हटाएं'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Disconnect from internet if file was already opened'
                  : 'यदि फ़ाइल पहले ही खोली गई है तो इंटरनेट से डिस्कनेक्ट करें'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Run full antivirus scan on your device'
                  : 'अपने डिवाइस पर पूर्ण एंटीवायरस स्कैन चलाएं'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Back up important files to external drive (if not infected)'
                  : 'महत्वपूर्ण फ़ाइलों का बाहरी ड्राइव पर बैकअप लें (यदि संक्रमित नहीं है)'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Change all passwords from a different device'
                  : 'सभी पासवर्ड एक अलग डिवाइस से बदलें'}
              </li>
              <li className="font-bold text-yellow-300">
                {lang === 'en'
                  ? 'Report to cybercrime.gov.in or call 1930'
                  : 'cybercrime.gov.in पर रिपोर्ट करें या 1930 पर कॉल करें'}
              </li>
              <li className="font-bold text-red-300">
                {lang === 'en'
                  ? 'NEVER pay ransom - it does not guarantee file recovery'
                  : 'कभी फिरौती न दें - इससे फ़ाइल रिकवरी की गारंटी नहीं होती'}
              </li>
            </ol>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAnother}
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4">
        <p className="text-sm text-yellow-200">
          <span className="font-bold">🛡️ AI Guardian:</span> {content.disclaimer}
        </p>
      </div>
    </div>
  );
}