'use client';
import { useState } from 'react';
import { AlertTriangle, TrendingUp, Users, Calendar, ExternalLink, Share2, Bookmark, Play, FileText, Newspaper } from 'lucide-react';

// Define interfaces first
interface ScamAlert {
  id: string;
  title: string;
  type: string;
  severity: 'critical' | 'high' | 'medium';
  date: string;
  description: string;
  howItWorks: string[];
  prevention: string[];
  affectedStates?: string[];
  lossesCrores?: number;
  source?: string;
  sourceUrl?: string;
}

interface RealStory {
  id: string;
  title: string;
  victim: string;
  location: string;
  lossAmount: string;
  scamType: string;
  story: string;
  lesson: string;
}

// Define the full shape of each language's content
interface ContentLang {
  title: string;
  subtitle: string;
  tabs: {
    latest: string;
    stories: string;
    videos: string;
    tips: string;
  };
  severity: {
    critical: string;
    high: string;
    medium: string;
  };
  share: string;
  bookmark: string;
  bookmarked: string;
  readMore: string;
  howItWorks: string;
  prevention: string;
  affectedAreas: string;
  estimatedLosses: string;
  source: string;
  latestScams: ScamAlert[];
  realStories: RealStory[];
  educationalVideos: {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
    url: string;
    channel: string;
    views: string;
  }[];
  dailyTips: string[];
}

// Now define content with explicit type
const content: Record<'en' | 'hi', ContentLang> = {
  en: {
    title: '📢 Scam Awareness Center',
    subtitle: 'Stay updated with latest cyber scams targeting Indians',
    tabs: {
      latest: 'Latest Scams',
      stories: 'Real Victims',
      videos: 'Educational Videos',
      tips: 'Daily Tips'
    },
    severity: {
      critical: '🚨 CRITICAL',
      high: '⚠️ HIGH RISK',
      medium: '📊 MEDIUM'
    },
    share: 'Share Alert',
    bookmark: 'Bookmark',
    bookmarked: 'Bookmarked',
    readMore: 'Read Full Article',
    howItWorks: 'How the Scam Works',
    prevention: 'How to Protect Yourself',
    affectedAreas: 'Affected Areas',
    estimatedLosses: 'Estimated Losses',
    source: 'Source',
    latestScams: [
      {
        id: 'ghost-pairing-2024',
        title: 'WhatsApp Ghost Pairing Scam - Active in Hyderabad',
        type: 'WhatsApp QR Code',
        severity: 'critical' as const,
        date: '2024-12-20',
        description: 'Scammers are calling people pretending to be courier/bank representatives and asking them to scan QR codes. This links victim\'s WhatsApp to scammer\'s device.',
        howItWorks: [
          'Scammer calls claiming urgent parcel/KYC update',
          'Sends link with WhatsApp Web QR code',
          'Victim scans thinking it\'s verification',
          'WhatsApp gets linked to scammer\'s device',
          'Scammer messages contacts asking for money'
        ],
        prevention: [
          'NEVER scan QR codes sent by strangers',
          'Enable two-step verification on WhatsApp',
          'Check linked devices weekly',
          'WhatsApp NEVER asks for QR scan for verification'
        ],
        affectedStates: ['Telangana', 'Andhra Pradesh', 'Karnataka'],
        lossesCrores: 50,
        source: 'Telangana Today',
        sourceUrl: 'https://telanganatoday.com/hyderabad-police-warn-of-ghostpairing-whatsapp-scam-exploiting-device-linking'
      },
      // ... add your other latestScams entries here
    ],
    realStories: [
      // ... add your realStories array here
    ],
    educationalVideos: [
      {
        id: 'vid-1',
        title: 'Digital Arrest Scam Explained (Hindi)',
        duration: '5:23',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        url: 'https://youtube.com/watch?v=example1',
        channel: 'Cyber Dost',
        views: '2.5M'
      },
      // ... add other videos
    ],
    dailyTips: [
      'Never share OTP with anyone - not even bank staff',
      'Police never make video call arrests - "Digital Arrest" is fake',
      // ... add other tips
    ]
  },
  hi: {
    title: '📢 घोटाला जागरूकता केंद्र',
    subtitle: 'भारतीयों को लक्षित करने वाले नवीनतम साइबर घोटालों से अपडेट रहें',
    tabs: {
      latest: 'नवीनतम घोटाले',
      stories: 'वास्तविक पीड़ित',
      videos: 'शैक्षिक वीडियो',
      tips: 'दैनिक सुझाव'
    },
    severity: {
      critical: '🚨 गंभीर',
      high: '⚠️ उच्च जोखिम',
      medium: '📊 मध्यम'
    },
    share: 'अलर्ट साझा करें',
    bookmark: 'बुकमार्क',
    bookmarked: 'बुकमार्क किया गया',
    readMore: 'पूरा लेख पढ़ें',
    howItWorks: 'घोटाला कैसे काम करता है',
    prevention: 'खुद को कैसे बचाएं',
    affectedAreas: 'प्रभावित क्षेत्र',
    estimatedLosses: 'अनुमानित नुकसान',
    source: 'स्रोत',
    latestScams: [
      // ... add Hindi latestScams (same structure as en)
    ],
    realStories: [
      // ... add Hindi realStories
    ],
    educationalVideos: [
      // ... add Hindi videos
    ],
    dailyTips: [
      // ... add Hindi tips
    ]
  }
};

export default function ScamAwarenessCenter({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [activeTab, setActiveTab] = useState<'latest' | 'stories' | 'videos' | 'tips'>('latest');
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  // t is now guaranteed to have all properties
  const t = content[lang as 'en' | 'hi'];

  const shareAlert = (alert: ScamAlert) => {
    const text = `🚨 SCAM ALERT: ${alert.title}\n\n${alert.description}\n\nProtect yourself! Visit QuantumShield.in`;

    if (navigator.share) {
      navigator.share({
        title: alert.title,
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      window.alert('Alert copied to clipboard!');
    }
  };

  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(b => b !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-600/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-600/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-gray-600/20 border-gray-500/50 text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-red-100">{t.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(['latest', 'stories', 'videos', 'tips'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
              activeTab === tab
                ? 'bg-red-600 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {t.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Latest Scams Tab */}
      {activeTab === 'latest' && (
        <div className="space-y-6">
          {t.latestScams.map((scam) => (
            <div key={scam.id} className={`border rounded-xl p-6 ${getSeverityColor(scam.severity)}`}>
              {/* ... your full scam card JSX (header, stats, howItWorks, prevention, actions) ... */}
            </div>
          ))}
        </div>
      )}

      {/* Real Stories Tab */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          {t.realStories.map((story) => (
            <div key={story.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              {/* ... your full story JSX ... */}
            </div>
          ))}
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="grid md:grid-cols-2 gap-6">
          {t.educationalVideos.map((video) => (
            (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition group"
              >
                <div className="relative aspect-video bg-black/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-red-500 group-hover:scale-110 transition" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{video.channel}</span>
                    <span>{video.views} views</span>
                  </div>
                </div>
              </a>
            )
          ))}
        </div>
      )}

      {/* Daily Tips Tab */}
      {activeTab === 'tips' && (
        <div className="space-y-3">
          {t.dailyTips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-4 flex items-start gap-3"
            >
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-gray-200">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}