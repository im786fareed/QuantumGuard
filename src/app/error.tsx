'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-8 text-center">
        <div className="inline-block p-4 bg-red-500/20 rounded-2xl mb-6">
          <AlertTriangle className="w-16 h-16 text-red-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-400 text-lg mb-6">
          QuantumGuard encountered an unexpected error. Don't worry, your data is safe.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-lg transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}