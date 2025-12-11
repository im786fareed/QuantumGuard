'use client';

import { Upload, AlertTriangle, CheckCircle, XCircle, FileWarning } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface ScanResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGER';
  riskScore: number;
  message: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

const CONTENT = {
  en: {
    title: 'Basic File Check',
    subtitle: 'Pattern-based file safety check',
    uploadBtn: 'Upload File (Max 4MB)',
    scanning: 'Checking file...',
    result: 'Check Result',
    fileName: 'File Name',
    fileSize: 'File Size',
    fileType: 'File Type',
    riskScore: 'Risk Score',
    scanAnother: 'Check Another File',
    disclaimer: 'Educational Tool: This is basic signature detection. Cannot detect all malware types. Use professional antivirus for comprehensive protection.',
    sizeLimit: 'File too large! Maximum size: 4MB. For larger files, use professional antivirus software.'
  },
  hi: {
    title: 'बेसिक फ़ाइल चेक',
    subtitle: 'पैटर्न आधारित फ़ाइल सुरक्षा जांच',
    uploadBtn: 'फ़ाइल अपलोड करें (अधिकतम 4MB)',
    scanning: 'फ़ाइल चेक हो रही है',
    result: 'चेक परिणाम',
    fileName: 'फ़ाइल नाम',
    fileSize: 'फ़ाइल आकार',
    fileType: 'फ़ाइल प्रकार',
    riskScore: 'जोखिम स्कोर',
    scanAnother: 'अन्य फ़ाइल चेक करें',
    disclaimer: 'शैक्षिक उपकरण: यह बुनियादी हस्ताक्षर पहचान है। सभी मैलवेयर प्रकारों का पता नहीं लगा सकता। व्यापक सुरक्षा के लिए पेशेवर एंटीवायरस का उपयोग करें।',
    sizeLimit: 'फ़ाइल बहुत बड़ी है! अधिकतम आकार: 4MB। बड़ी फ़ाइलों के लिए पेशेवर एंटीवायरस का उपयोग करें।'
  }
};

export default function FileScanner({ lang }: Props) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const content = CONTENT[lang];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(content.sizeLimit);
      return;
    }

    setIsScanning(true);
    setResult(null);

    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(2) + ' KB';
    const fileType = file.type || 'Unknown';

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result as string;
      
      let riskScore = 0;
      let verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGER' = 'SAFE';
      let message = '';

      const lowerFileName = fileName.toLowerCase();
      if (lowerFileName.endsWith('.apk')) {
        riskScore += 50;
        message = 'APK file detected. Install only from trusted sources.';
      }
      if (lowerFileName.endsWith('.exe') || lowerFileName.endsWith('.bat') || lowerFileName.endsWith('.cmd')) {
        riskScore += 40;
        message = 'Executable file detected. High risk if from unknown source.';
      }
      if (lowerFileName.endsWith('.js') || lowerFileName.endsWith('.vbs')) {
        riskScore += 30;
        message = 'Script file detected. Can be dangerous if malicious.';
      }

      if (fileData.includes('UEsDBBQA') || fileData.includes('504B0304')) {
        riskScore += 20;
        message += ' File may contain hidden APK code.';
      }

      if (file.size > 50 * 1024 * 1024) {
        riskScore += 10;
      }

      riskScore = Math.min(riskScore, 100);

      if (riskScore >= 70) {
        verdict = 'DANGER';
        message = 'HIGH RISK FILE! Do not open or install this file.';
      } else if (riskScore >= 40) {
        verdict = 'SUSPICIOUS';
        message = message || 'File shows suspicious patterns. Verify source before opening.';
      } else {
        verdict = 'SAFE';
        message = 'File appears safe. Always verify source.';
      }

      setTimeout(() => {
        setResult({
          verdict,
          riskScore,
          message,
          fileName,
          fileSize,
          fileType
        });
        setIsScanning(false);
      }, 2000);
    };

    reader.readAsDataURL(file);
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

  const reset = () => {
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Upload className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4 mb-6">
        <p className="text-sm text-yellow-200">
          <span className="font-bold">⚠️ {lang === 'en' ? 'Educational Tool:' : 'शैक्षिक उपकरण:'}</span>
          {' '}
          {content.disclaimer}
        </p>
      </div>

      {!result && !isScanning && (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8">
          <div className="border-2 border-dashed border-cyan-400/50 rounded-xl p-12 text-center">
            <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg cursor-pointer inline-block hover:scale-105 transition"
            >
              {content.uploadBtn}
            </label>
            <p className="text-gray-400 mt-4 text-sm">Supports: APK, EXE, ZIP, PDF, Images</p>
          </div>
        </div>
      )}

      {isScanning && (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
          <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4 animate-pulse">
            <FileWarning className="w-12 h-12 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{content.scanning}</h3>
          <div className="w-full bg-black/50 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className={'backdrop-blur rounded-2xl border-2 p-8 ' + getVerdictColor(result.verdict)}>
            <div className="flex items-center gap-4 mb-4">
              {getVerdictIcon(result.verdict)}
              <div>
                <h3 className="text-3xl font-bold">{result.verdict}</h3>
                <p className="text-lg opacity-90">{content.riskScore}: {result.riskScore}%</p>
              </div>
            </div>
            <p className="text-xl mb-4">{result.message}</p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-xl font-bold mb-4">File Details:</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">{content.fileName}:</span>
                <span className="font-bold">{result.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{content.fileSize}:</span>
                <span className="font-bold">{result.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{content.fileType}:</span>
                <span className="font-bold">{result.fileType}</span>
              </div>
            </div>
          </div>

          {result.verdict === 'DANGER' && (
            <div className="bg-red-600/20 backdrop-blur rounded-2xl border-2 border-red-500 p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-red-400 mb-2">DANGER: HIGH RISK FILE</h4>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Do NOT open or install this file</li>
                    <li>• Delete immediately from your device</li>
                    <li>• Block the sender</li>
                    <li>• Report if received via message</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={reset}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.scanAnother}
          </button>
        </div>
      )}
    </div>
  );
}