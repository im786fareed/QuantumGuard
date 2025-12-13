'use client';

import { Lock, Unlock, Key, Download, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

const CONTENT = {
  en: {
    title: 'Military-Grade File Encryption',
    subtitle: 'AES-256 encryption - Secure your files before sharing',
    encryptTab: 'Encrypt File',
    decryptTab: 'Decrypt File',
    selectFile: 'Select File to Encrypt',
    selectEncrypted: 'Select Encrypted File',
    passwordPlaceholder: 'Enter strong password (min 8 characters)',
    confirmPassword: 'Confirm password',
    encryptButton: 'Encrypt File (AES-256)',
    decryptButton: 'Decrypt File',
    encrypting: 'Encrypting with AES-256...',
    decrypting: 'Decrypting...',
    downloadEncrypted: 'Download Encrypted File',
    downloadDecrypted: 'Download Original File',
    encryptAnother: 'Encrypt Another File',
    decryptAnother: 'Decrypt Another File',
    howItWorks: 'How File Encryption Works',
    disclaimer: 'Client-side AES-256 encryption. Files never uploaded to server. Password cannot be recovered if forgotten.'
  },
  hi: {
    title: 'मिलिट्री-ग्रेड फ़ाइल एन्क्रिप्शन',
    subtitle: 'AES-256 एन्क्रिप्शन - साझा करने से पहले अपनी फ़ाइलें सुरक्षित करें',
    encryptTab: 'फ़ाइल एन्क्रिप्ट करें',
    decryptTab: 'फ़ाइल डिक्रिप्ट करें',
    selectFile: 'एन्क्रिप्ट करने के लिए फ़ाइल चुनें',
    selectEncrypted: 'एन्क्रिप्टेड फ़ाइल चुनें',
    passwordPlaceholder: 'मजबूत पासवर्ड दर्ज करें (कम से कम 8 अक्षर)',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    encryptButton: 'फ़ाइल एन्क्रिप्ट करें (AES-256)',
    decryptButton: 'फ़ाइल डिक्रिप्ट करें',
    encrypting: 'AES-256 के साथ एन्क्रिप्ट हो रहा है',
    decrypting: 'डिक्रिप्ट हो रहा है',
    downloadEncrypted: 'एन्क्रिप्टेड फ़ाइल डाउनलोड करें',
    downloadDecrypted: 'मूल फ़ाइल डाउनलोड करें',
    encryptAnother: 'दूसरी फ़ाइल एन्क्रिप्ट करें',
    decryptAnother: 'दूसरी फ़ाइल डिक्रिप्ट करें',
    howItWorks: 'फ़ाइल एन्क्रिप्शन कैसे काम करता है',
    disclaimer: 'क्लाइंट-साइड AES-256 एन्क्रिप्शन। फ़ाइलें कभी सर्वर पर अपलोड नहीं होतीं। पासवर्ड भूल जाने पर पुनर्प्राप्त नहीं किया जा सकता।'
  }
};

export default function FileEncryption({ lang }: Props) {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [encryptedBlob, setEncryptedBlob] = useState<Blob | null>(null);
  const [decryptedBlob, setDecryptedBlob] = useState<Blob | null>(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const content = CONTENT[lang];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOriginalFileName(selectedFile.name);
    }
  };

  // AES-256 Encryption using Web Crypto API
  const encryptFile = async () => {
    if (!file || !password || password.length < 8) {
      alert(lang === 'en' ? 'Password must be at least 8 characters' : 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए');
      return;
    }

    if (password !== confirmPassword) {
      alert(lang === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते');
      return;
    }

    setIsProcessing(true);

    try {
      // Read file as ArrayBuffer
      const fileBuffer = await file.arrayBuffer();

      // Generate encryption key from password
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const passwordKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );

      // Generate salt (random)
      const salt = crypto.getRandomValues(new Uint8Array(16));

      // Derive AES-256 key from password
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );

      // Generate IV (initialization vector)
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt file
      const encryptedContent = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        fileBuffer
      );

      // Combine salt + iv + encrypted content + original filename
      const nameBytes = encoder.encode(file.name);
      const nameLength = new Uint8Array([nameBytes.length]);
      const finalData = new Uint8Array([
        ...salt,
        ...iv,
        ...nameLength,
        ...nameBytes,
        ...new Uint8Array(encryptedContent)
      ]);

      const blob = new Blob([finalData], { type: 'application/octet-stream' });
      setEncryptedBlob(blob);
      setIsProcessing(false);
    } catch (error) {
      console.error('Encryption error:', error);
      alert(lang === 'en' ? 'Encryption failed' : 'एन्क्रिप्शन विफल');
      setIsProcessing(false);
    }
  };

  // AES-256 Decryption
  const decryptFile = async () => {
    if (!file || !password) {
      alert(lang === 'en' ? 'Please select file and enter password' : 'कृपया फ़ाइल चुनें और पासवर्ड दर्ज करें');
      return;
    }

    setIsProcessing(true);

    try {
      const fileBuffer = await file.arrayBuffer();
      const dataView = new Uint8Array(fileBuffer);

      // Extract salt, iv, filename
      const salt = dataView.slice(0, 16);
      const iv = dataView.slice(16, 28);
      const nameLength = dataView[28];
      const nameBytes = dataView.slice(29, 29 + nameLength);
      const encryptedContent = dataView.slice(29 + nameLength);

      // Decode original filename
      const decoder = new TextDecoder();
      const originalName = decoder.decode(nameBytes);

      // Generate key from password
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const passwordKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );

      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      // Decrypt
      const decryptedContent = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encryptedContent
      );

      const blob = new Blob([decryptedContent]);
      setDecryptedBlob(blob);
      setOriginalFileName(originalName);
      setIsProcessing(false);
    } catch (error) {
      console.error('Decryption error:', error);
      alert(lang === 'en' ? 'Decryption failed - wrong password or corrupted file' : 'डिक्रिप्शन विफल - गलत पासवर्ड या दूषित फ़ाइल');
      setIsProcessing(false);
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPassword('');
    setConfirmPassword('');
    setEncryptedBlob(null);
    setDecryptedBlob(null);
    setOriginalFileName('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-green-500/20 rounded-2xl mb-4">
          <Lock className="w-12 h-12 text-green-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => { setMode('encrypt'); reset(); }}
          className={`flex-1 py-3 rounded-xl font-bold transition ${
            mode === 'encrypt'
              ? 'bg-green-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Lock className="w-5 h-5 inline mr-2" />
          {content.encryptTab}
        </button>
        <button
          onClick={() => { setMode('decrypt'); reset(); }}
          className={`flex-1 py-3 rounded-xl font-bold transition ${
            mode === 'decrypt'
              ? 'bg-blue-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Unlock className="w-5 h-5 inline mr-2" />
          {content.decryptTab}
        </button>
      </div>

      {/* Encrypt Mode */}
      {mode === 'encrypt' && !encryptedBlob && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-encrypt"
              />
              <label
                htmlFor="file-encrypt"
                className="px-6 py-3 bg-green-500 rounded-xl font-bold cursor-pointer inline-block hover:bg-green-600 transition"
              >
                {content.selectFile}
              </label>
              {file && (
                <p className="mt-4 text-sm text-gray-300">
                  Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  <Key className="w-4 h-4 inline mr-2" />
                  Password (AES-256)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={content.passwordPlaceholder}
                  className="w-full bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-green-400 focus:outline-none"
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  <Key className="w-4 h-4 inline mr-2" />
                  {content.confirmPassword}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={content.confirmPassword}
                  className="w-full bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-green-400 focus:outline-none"
                  minLength={8}
                />
              </div>
            </div>

            <button
              onClick={encryptFile}
              disabled={isProcessing || !file || !password || password !== confirmPassword}
              className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? content.encrypting : content.encryptButton}
            </button>
          </div>

          {/* How it works */}
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-400" />
              {content.howItWorks}
            </h3>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li>{lang === 'en' ? 'Select any file (document, photo, video)' : 'कोई भी फ़ाइल चुनें (दस्तावेज़, फ़ोटो, वीडियो)'}</li>
              <li>{lang === 'en' ? 'Enter strong password (minimum 8 characters)' : 'मजबूत पासवर्ड दर्ज करें (कम से कम 8 अक्षर)'}</li>
              <li>{lang === 'en' ? 'QuantumGuard encrypts with military-grade AES-256' : 'QuantumGuard मिलिट्री-ग्रेड AES-256 से एन्क्रिप्ट करता है'}</li>
              <li>{lang === 'en' ? 'Download encrypted file (safe to share via WhatsApp/email)' : 'एन्क्रिप्टेड फ़ाइल डाउनलोड करें (WhatsApp/email से साझा करने के लिए सुरक्षित)'}</li>
              <li>{lang === 'en' ? 'Receiver uses QuantumGuard to decrypt with password' : 'प्राप्तकर्ता पासवर्ड के साथ डिक्रिप्ट करने के लिए QuantumGuard का उपयोग करता है'}</li>
            </ol>
          </div>
        </div>
      )}

      {/* Encrypt Success */}
      {mode === 'encrypt' && encryptedBlob && (
        <div className="space-y-6">
          <div className="bg-green-600/20 backdrop-blur rounded-2xl border-2 border-green-500 p-8">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-16 h-16 text-green-400" />
              <div>
                <h3 className="text-3xl font-bold text-green-400">
                  {lang === 'en' ? 'File Encrypted Successfully!' : 'फ़ाइल सफलतापूर्वक एन्क्रिप्ट हुई!'}
                </h3>
                <p className="text-gray-300">
                  {lang === 'en' ? 'AES-256 encryption applied' : 'AES-256 एन्क्रिप्शन लागू'}
                </p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-300 mb-4">
                <strong className="text-white">
                  {lang === 'en' ? 'Original File:' : 'मूल फ़ाइल:'}
                </strong> {originalFileName}
              </p>
              <p className="text-sm text-gray-300 mb-4">
                <strong className="text-white">
                  {lang === 'en' ? 'Encrypted File:' : 'एन्क्रिप्टेड फ़ाइल:'}
                </strong> {originalFileName}.encrypted
              </p>
              <p className="text-sm text-yellow-300">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                <strong>
                  {lang === 'en' ? 'Remember your password!' : 'अपना पासवर्ड याद रखें!'}
                </strong>
                {' '}
                {lang === 'en' ? 'It cannot be recovered if forgotten.' : 'भूल जाने पर इसे पुनर्प्राप्त नहीं किया जा सकता।'}
              </p>
            </div>

            <button
              onClick={() => downloadFile(encryptedBlob, `${originalFileName}.encrypted`)}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Download className="w-6 h-6" />
              {content.downloadEncrypted}
            </button>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.encryptAnother}
          </button>
        </div>
      )}

      {/* Decrypt Mode */}
      {mode === 'decrypt' && !decryptedBlob && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
              <Unlock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-decrypt"
              />
              <label
                htmlFor="file-decrypt"
                className="px-6 py-3 bg-blue-500 rounded-xl font-bold cursor-pointer inline-block hover:bg-blue-600 transition"
              >
                {content.selectEncrypted}
              </label>
              {file && (
                <p className="mt-4 text-sm text-gray-300">
                  Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-300">
                <Key className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={content.passwordPlaceholder}
                className="w-full bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={decryptFile}
              disabled={isProcessing || !file || !password}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? content.decrypting : content.decryptButton}
            </button>
          </div>
        </div>
      )}

      {/* Decrypt Success */}
      {mode === 'decrypt' && decryptedBlob && (
        <div className="space-y-6">
          <div className="bg-blue-600/20 backdrop-blur rounded-2xl border-2 border-blue-500 p-8">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="w-16 h-16 text-blue-400" />
              <div>
                <h3 className="text-3xl font-bold text-blue-400">
                  {lang === 'en' ? 'File Decrypted Successfully!' : 'फ़ाइल सफलतापूर्वक डिक्रिप्ट हुई!'}
                </h3>
                <p className="text-gray-300">
                  {lang === 'en' ? 'Original file recovered' : 'मूल फ़ाइल पुनर्प्राप्त'}
                </p>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-300">
                <strong className="text-white">
                  {lang === 'en' ? 'Recovered File:' : 'पुनर्प्राप्त फ़ाइल:'}
                </strong> {originalFileName}
              </p>
            </div>

            <button
              onClick={() => downloadFile(decryptedBlob, originalFileName)}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Download className="w-6 h-6" />
              {content.downloadDecrypted}
            </button>
          </div>

          <button
            onClick={reset}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.decryptAnother}
          </button>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4">
        <p className="text-sm text-yellow-200">
          <span className="font-bold">🔒 Privacy:</span> {content.disclaimer}
        </p>
      </div>
    </div>
  );
}