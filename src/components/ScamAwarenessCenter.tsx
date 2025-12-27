'use client';
import { useState } from 'react';
import { AlertTriangle, TrendingUp, Shield, ExternalLink, PlayCircle, Newspaper, Users, Phone } from 'lucide-react';

interface ScamAlert {
  id: string;
  title: string;
  type: string;
  severity: 'critical' | 'high' | 'medium';
  amount: string;
  description: string;
  date: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
}

export default function ScamAwarenessCenter({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const content = {
    en: {
      title: '📰 Scam Awareness Center',
      subtitle: 'Stay updated on latest scam threats and learn how to protect yourself',
      
      latestAlerts: 'Latest Scam Alerts',
      viewAll: 'View All Alerts',
      
      recentScams: [
        {
          id: '1',
          title: 'Digital Arrest Scam Surge',
          type: 'Digital Arrest',
          severity: 'critical' as const,
          amount: '₹120 Crores lost',
          description: 'Scammers impersonate police/CBI officials, claim victim involved in crime, demand immediate money transfer.',
          date: 'Dec 2024'
        },
        {
          id: '2',
          title: 'WhatsApp Ghost Pairing Attack',
          type: 'Account Takeover',
          severity: 'high' as const,
          amount: '₹50 Crores lost',
          description: 'Attackers pair victim\'s WhatsApp with their device, access messages, contacts, and extort money.',
          date: 'Nov 2024'
        },
        {
          id: '3',
          title: 'UPI Fraud via QR Codes',
          type: 'Payment Fraud',
          severity: 'high' as const,
          amount: '₹95 Crores lost',
          description: 'Fake QR codes sent via SMS/WhatsApp claiming refunds, actually requesting payment instead.',
          date: 'Dec 2024'
        },
        {
          id: '4',
          title: 'Job Offer Scams',
          type: 'Employment Fraud',
          severity: 'medium' as const,
          amount: '₹100 Crores lost',
          description: 'Fake job offers from "international companies" demand upfront fees for processing, training, or equipment.',
          date: 'Nov 2024'
        }
      ],
      
      educationalVideos: 'Educational Videos',
      videosDescription: 'Learn from experts how to identify and avoid scams',
      
      videos: [
        {
          id: '1',
          title: 'What is Digital Arrest Scam?',
          description: 'Learn how scammers impersonate police and trap victims',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '5:30'
        },
        {
          id: '2',
          title: 'How to Protect from WhatsApp Hacking',
          description: 'Enable 2-step verification and recognize pairing attempts',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '4:15'
        },
        {
          id: '3',
          title: 'UPI Safety Tips',
          description: 'Avoid QR code scams and verify payment requests',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '6:00'
        },
        {
          id: '4',
          title: 'Recognize Job Offer Scams',
          description: 'Red flags in fake job postings and offers',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '7:20'
        }
      ],
      
      scamTypes: 'Common Scam Types in India',
      categories: {
        all: 'All Scams',
        digital: 'Digital Arrest',
        banking: 'Banking Fraud',
        investment: 'Investment Scams',
        employment: 'Job Scams'
      },
      
      preventionTips: 'Prevention Tips',
      tips: [
        'Never share OTP, CVV, or passwords with anyone - even "bank officials"',
        'Police/CBI never arrest people over phone calls',
        'Verify caller identity by calling official numbers from website',
        'Enable 2-factor authentication on all accounts',
        'Don\'t click links in unsolicited SMS/emails',
        'Report suspicious numbers to 1930 immediately',
        'Use strong, unique passwords for each account',
        'Keep your phone\'s OS and apps updated'
      ],
      
      reportScam: 'Report a Scam',
      reportDescription: 'Help protect others by reporting scams',
      reportButton: 'Report to Authorities',
      
      resources: 'Helpful Resources',
      resourceLinks: [
        { name: 'National Cybercrime Portal', url: 'https://cybercrime.gov.in' },
        { name: 'Reserve Bank of India - Fraud Alerts', url: 'https://rbi.org.in' },
        { name: 'TRAI - DND Services', url: 'https://www.trai.gov.in' },
        { name: 'Cyber Helpline - 1930', url: 'tel:1930' }
      ]
    },
    hi: {
      title: '📰 घोटाला जागरूकता केंद्र',
      subtitle: 'नवीनतम घोटाला खतरों पर अपडेट रहें और अपनी सुरक्षा करना सीखें',
      
      latestAlerts: 'नवीनतम घोटाला अलर्ट',
      viewAll: 'सभी अलर्ट देखें',
      
      recentScams: [
        {
          id: '1',
          title: 'डिजिटल अरेस्ट घोटाला में वृद्धि',
          type: 'डिजिटल अरेस्ट',
          severity: 'critical' as const,
          amount: '₹120 करोड़ का नुकसान',
          description: 'घोटालेबाज पुलिस/CBI अधिकारियों का रूप धारण करते हैं, दावा करते हैं कि पीड़ित अपराध में शामिल है, तत्काल पैसे की मांग करते हैं।',
          date: 'दिसंबर 2024'
        },
        {
          id: '2',
          title: 'व्हाट्सएप घोस्ट पेयरिंग हमला',
          type: 'खाता अधिग्रहण',
          severity: 'high' as const,
          amount: '₹50 करोड़ का नुकसान',
          description: 'हमलावर पीड़ित के व्हाट्सएप को अपने डिवाइस से पेयर करते हैं, संदेश, संपर्क एक्सेस करते हैं और पैसे की मांग करते हैं।',
          date: 'नवंबर 2024'
        },
        {
          id: '3',
          title: 'QR कोड के माध्यम से UPI धोखाधड़ी',
          type: 'भुगतान धोखाधड़ी',
          severity: 'high' as const,
          amount: '₹95 करोड़ का नुकसान',
          description: 'SMS/व्हाट्सएप के माध्यम से नकली QR कोड भेजे जाते हैं जो रिफंड का दावा करते हैं, वास्तव में भुगतान की मांग करते हैं।',
          date: 'दिसंबर 2024'
        },
        {
          id: '4',
          title: 'नौकरी की पेशकश घोटाला',
          type: 'रोजगार धोखाधड़ी',
          severity: 'medium' as const,
          amount: '₹100 करोड़ का नुकसान',
          description: '"अंतर्राष्ट्रीय कंपनियों" से नकली नौकरी की पेशकश प्रसंस्करण, प्रशिक्षण या उपकरण के लिए अग्रिम शुल्क की मांग करती हैं।',
          date: 'नवंबर 2024'
        }
      ],
      
      educationalVideos: 'शैक्षिक वीडियो',
      videosDescription: 'विशेषज्ञों से सीखें कि घोटालों की पहचान कैसे करें और उनसे कैसे बचें',
      
      videos: [
        {
          id: '1',
          title: 'डिजिटल अरेस्ट घोटाला क्या है?',
          description: 'जानें कि घोटालेबाज पुलिस का रूप कैसे धारण करते हैं',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '5:30'
        },
        {
          id: '2',
          title: 'व्हाट्सएप हैकिंग से कैसे बचें',
          description: '2-चरण सत्यापन सक्षम करें और पेयरिंग प्रयासों को पहचानें',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '4:15'
        },
        {
          id: '3',
          title: 'UPI सुरक्षा टिप्स',
          description: 'QR कोड घोटालों से बचें और भुगतान अनुरोधों को सत्यापित करें',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '6:00'
        },
        {
          id: '4',
          title: 'नौकरी की पेशकश घोटालों को पहचानें',
          description: 'नकली नौकरी पोस्टिंग और ऑफ़र में लाल झंडे',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: '7:20'
        }
      ],
      
      scamTypes: 'भारत में सामान्य घोटाले के प्रकार',
      
      preventionTips: 'रोकथाम टिप्स',
      tips: [
        'OTP, CVV, या पासवर्ड किसी के साथ साझा न करें - यहां तक कि "बैंक अधिकारियों" के साथ भी',
        'पुलिस/CBI कभी भी फोन कॉल पर लोगों को गिरफ्तार नहीं करते',
        'वेबसाइट से आधिकारिक नंबरों पर कॉल करके कॉलर की पहचान सत्यापित करें',
        'सभी खातों पर 2-कारक प्रमाणीकरण सक्षम करें',
        'अवांछित SMS/ईमेल में लिंक पर क्लिक न करें',
        'संदिग्ध नंबरों को तुरंत 1930 पर रिपोर्ट करें',
        'प्रत्येक खाते के लिए मजबूत, अद्वितीय पासवर्ड का उपयोग करें',
        'अपने फोन के OS और ऐप्स को अपडेट रखें'
      ],
      
      reportScam: 'घोटाला रिपोर्ट करें',
      reportDescription: 'घोटालों की रिपोर्ट करके दूसरों की सुरक्षा में मदद करें',
      reportButton: 'अधिकारियों को रिपोर्ट करें',
      
      resources: 'उपयोगी संसाधन'
    }
  };

  const t = content[lang];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600/20 border-red-500/50 text-red-400';
      case 'high': return 'bg-orange-600/20 border-orange-500/50 text-orange-400';
      case 'medium': return 'bg-yellow-600/20 border-yellow-500/50 text-yellow-400';
      default: return 'bg-blue-600/20 border-blue-500/50 text-blue-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-red-100">{t.subtitle}</p>
      </div>

      {/* Latest Scam Alerts */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-2xl flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            {t.latestAlerts}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {t.recentScams.map((scam) => (
            <div
              key={scam.id}
              className={`border rounded-xl p-4 ${getSeverityColor(scam.severity)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">{scam.title}</h3>
                  <p className="text-sm opacity-80">{scam.type}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-black/30">
                  {scam.date}
                </span>
              </div>
              
              <p className="text-sm mb-3 text-gray-300">{scam.description}</p>
              
              <div className="flex items-center gap-2 text-sm font-bold">
                <TrendingUp className="w-4 h-4" />
                {scam.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Videos - FIXED */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-2xl mb-2 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-blue-400" />
          {t.educationalVideos}
        </h2>
        <p className="text-gray-400 mb-4">{t.videosDescription}</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {t.videos.map((video) => (
             <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/50 border border-white/10 rounded-xl p-4 hover:border-blue-500/50 transition group">
              <div className="flex items-start gap-3">
                <PlayCircle className="w-12 h-12 text-red-500 shrink-0 group-hover:scale-110 transition" />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{video.duration}</span>
                    <span className="text-xs text-blue-400 group-hover:text-blue-300">
                      Watch on YouTube →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Backup: If no videos, show placeholder */}
        {t.videos.length === 0 && (
          <div className="text-center py-8">
            <PlayCircle className="w-16 h-16 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Educational videos coming soon!</p>
            <p className="text-sm text-gray-500 mt-2">
              Follow our YouTube channel for cybersecurity tips
            </p>
          </div>
        )}
      </div>

      {/* Prevention Tips */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-2xl mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-400" />
          {t.preventionTips}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-3">
          {t.tips.map((tip, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
              <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-gray-300">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Report Scam CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-center">
        <h3 className="font-bold text-2xl mb-3">{t.reportScam}</h3>
        <p className="text-gray-200 mb-4">{t.reportDescription}</p>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition">
          <Phone className="w-5 h-5" />
          {t.reportButton}
        </a>
      </div>
    </div>
  );
}