'use client';

import { useState } from 'react';
import { Camera, Video, FileText, Download, AlertTriangle } from 'lucide-react';

export default function EvidenceCollector({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState('');
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);

  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setMediaBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      // Auto-stop after 60 seconds for safety
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          setRecording(false);
        }
      }, 60000);

    } catch (err) {
      console.error(err);
      setError('Screen recording permission denied or not supported.');
    }
  };

  const downloadRecording = () => {
    if (!mediaBlob) return;

    const url = URL.createObjectURL(mediaBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evidence-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {lang === 'hi' ? 'सबूत संग्रह' : 'Evidence Collector'}
        </h1>
        <p className="text-sm opacity-90">
          {lang === 'hi'
            ? 'स्क्रीन रिकॉर्डिंग द्वारा डिजिटल धोखाधड़ी के प्रमाण सुरक्षित करें'
            : 'Capture screen evidence during digital fraud incidents'}
        </p>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-500 rounded-lg p-3 mb-4 text-red-300">
          <AlertTriangle className="inline w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="bg-black/40 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-blue-400" />
          <h2 className="text-lg font-semibold">
            {lang === 'hi' ? 'स्क्रीन रिकॉर्डिंग' : 'Screen Recording'}
          </h2>
        </div>

        <p className="text-sm text-gray-300">
          {lang === 'hi'
            ? 'स्कैम के दौरान स्क्रीन रिकॉर्ड करके सबूत सुरक्षित रखें।'
            : 'Record your screen during a scam to preserve evidence.'}
        </p>

        <div className="flex flex-wrap gap-3">
          {!recording && (
            <button
              onClick={startScreenRecording}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Video className="w-5 h-5" />
              {lang === 'hi' ? 'रिकॉर्ड शुरू करें' : 'Start Recording'}
            </button>
          )}

          {mediaBlob && (
            <button
              onClick={downloadRecording}
              className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {lang === 'hi' ? 'डाउनलोड करें' : 'Download Evidence'}
            </button>
          )}
        </div>

        <div className="text-xs text-gray-400 mt-3">
          ⚠ Recording automatically stops after 60 seconds.
        </div>
      </div>
    </div>
  );
}
