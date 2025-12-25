'use client';
import { Shield, Scan, MessageSquare, Download, Link as LinkIcon, Database, TrendingUp, ArrowRight, PlayCircle, AlertTriangle, Users, Clock, GraduationCap, BookOpen, CheckCircle, XCircle, Camera, Brain, Phone, Smartphone, Search, MessageCircle, Newspaper, Lock } from 'lucide-react';

// TabId type definition
type TabId =
  | 'home'
  | 'scanner'
  | 'apk'
  | 'url'
  | 'spam'
  | 'file'
  | 'encryption'
  | 'breach'
  | 'ransomware'
  | 'device'
  | 'news'
  | 'education'
  | 'aboutai'
  | 'threats'
  | 'sms'
  | 'downloads'
  | 'evidence'
  | 'report'
  | 'scamdb'
  | 'aianalyzer'
  | 'emergency'
  | 'simprotection'
  | 'devicescan'
  | 'whatsapp'
  | 'awareness'
  | 'privacy';

interface HomePageProps {
  onNavigate: (tab: TabId) => void;
  lang: 'en' | 'hi';
}

export default function HomePage({ onNavigate, lang }: HomePageProps) {
  // Define tools array first (separate constant)
  const tools = [
    {
      id: 'evidence' as TabId,
      title: 'Evidence Collector',
      description: 'Record scam calls legally',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'report' as TabId,
      title: 'Report to Police',
      description: 'File complaint instantly',
      gradient: 'from-red-600 to-orange-600'
    },
    {
      id: 'scamdb' as TabId,
      title: 'Scam Database',
      description: 'Check phone numbers',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'aianalyzer' as TabId,
      title: 'AI Call Analyzer',
      description: 'Real-time scam detection',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      id: 'emergency' as TabId,
      title: 'Emergency Help',
      description: 'Find nearest police',
      gradient: 'from-red-600 to-pink-600'
    },
  ];

  // Now define emergency object (references the tools array)
  const emergency = {
    title: '🚨 Emergency Anti-Scam Tools',
    subtitle: 'Protect yourself from the latest cyber scams targeting Indians',
    tools: tools,  // Reference the array here
  };

  const content = {
    en: {
      hero: {
        badge: '🛡️ India\'s #1 AI Cyber Protection',
        title: 'Protect Yourself from',
        highlight: 'Cyber Scams & Digital Threats',
        subtitle: 'AI-powered security tools designed for Indians. Detect scams, protect your data, and stay safe online.',
        cta: 'Start Free Scan',
        stats: [
          { value: '₹120Cr+', label: 'Losses Prevented' },
          { value: '26', label: 'Security Tools' },
          { value: '100%', label: 'Free Forever' }
        ]
      },
      emergency,  // ← Use the fixed emergency object here
      protection: {
        title: '🛡️ Protection Tools',
        tools: [
          { id: 'simprotection' as TabId, title: 'SIM Protection', description: 'Call forwarding check', icon: 'smartphone', color: 'orange' },
          { id: 'devicescan' as TabId, title: 'Device Scanner', description: 'Check if compromised', icon: 'search', color: 'purple' },
          { id: 'whatsapp' as TabId, title: 'WhatsApp Safety', description: 'Ghost pairing alert', icon: 'message', color: 'green' },
          { id: 'awareness' as TabId, title: 'Scam Alerts', description: 'Latest threats', icon: 'newspaper', color: 'red' },
          { id: 'privacy' as TabId, title: 'Privacy Shield', description: 'Free VPN alternative', icon: 'lock', color: 'indigo' }
        ]
      },
      features: {
        title: 'Complete Protection Suite',
        subtitle: '26 AI-powered tools to keep you safe',
        items: [
          {
            icon: Scan,
            title: 'AI-Powered Scanning',
            description: 'Deep learning algorithms detect threats in real-time across messages, files, and links.'
          },
          {
            icon: Shield,
            title: 'Multi-Layer Security',
            description: 'APK analysis, URL checking, spam detection, and device security - all in one platform.'
          },
          {
            icon: Brain,
            title: 'Smart Threat Intelligence',
            description: 'Stay ahead with real-time updates on emerging threats targeting Indians.'
          },
          {
            icon: Users,
            title: 'Community Protection',
            description: 'Share and report scams to protect millions of Indians from cyber threats.'
          }
        ]
      },
      threats: {
        title: '⚠️ Top Threats in India (2024)',
        items: [
          {
            threat: 'Digital Arrest Scam',
            losses: '₹120 Crores',
            description: 'Fake police officers on video call demanding money',
            severity: 'critical'
          },
          {
            threat: 'WhatsApp Ghost Pairing',
            losses: '₹50 Crores',
            description: 'QR code scam linking your WhatsApp to scammers',
            severity: 'critical'
          },
          {
            threat: 'UPI/Banking Fraud',
            losses: '₹95 Crores',
            description: 'Fake payment links and OTP phishing',
            severity: 'high'
          },
          {
            threat: 'Job Offer Scams',
            losses: '₹100 Crores',
            description: 'Fake LinkedIn jobs demanding registration fees',
            severity: 'high'
          }
        ]
      },
      tools: {
        title: 'All 26 Security Tools',
        categories: [
          {
            name: 'Scam Protection',
            items: ['AI Scanner', 'Threat Intel', 'Evidence Collector', 'Police Report', 'Scam Database', 'AI Call Analyzer']
          },
          {
            name: 'Device Security',
            items: ['APK Guardian', 'Device Check', 'Ransomware Detect', 'Device Scanner', 'SIM Protection']
          },
          {
            name: 'Communication Safety',
            items: ['SMS Guardian', 'Spam AI', 'WhatsApp Safety', 'URL Check']
          },
          {
            name: 'Data Protection',
            items: ['File Encryption', 'Breach Check', 'Privacy Shield', 'File Scan']
          },
          {
            name: 'Emergency Response',
            items: ['Emergency Contacts', 'Latest Threats', 'Scam Alerts', 'Download Scanner']
          },
          {
            name: 'Education',
            items: ['Learn Safety', 'AI Tech Info']
          }
        ]
      },
      cta: {
        title: 'Ready to Protect Yourself?',
        subtitle: 'Join thousands of Indians staying safe online',
        button: 'Get Started Free'
      }
    },
    hi: {
      // Your Hindi translations (same structure as en)
      hero: {
        badge: '🛡️ भारत का #1 AI साइबर सुरक्षा',
        title: 'खुद को बचाएं',
        highlight: 'साइबर घोटालों और डिजिटल खतरों से',
        subtitle: 'भारतीयों के लिए डिज़ाइन किए गए AI-संचालित सुरक्षा उपकरण। घोटालों का पता लगाएं, अपने डेटा की रक्षा करें, और ऑनलाइन सुरक्षित रहें।',
        cta: 'मुफ्त स्कैन शुरू करें',
        stats: [
          { value: '₹120Cr+', label: 'नुकसान रोका गया' },
          { value: '26', label: 'सुरक्षा उपकरण' },
          { value: '100%', label: 'हमेशा मुफ्त' }
        ]
      },
      emergency: {
        title: '🚨 आपातकालीन घोटाला-विरोधी उपकरण',
        subtitle: 'भारतीयों को लक्षित करने वाले नवीनतम साइबर घोटालों से खुद को बचाएं',
        tools: tools.map(tool => ({
          ...tool,
          title: tool.title === 'Evidence Collector' ? 'सबूत संग्रहकर्ता' : 
                 tool.title === 'Report to Police' ? 'पुलिस को रिपोर्ट' : 
                 tool.title === 'Scam Database' ? 'घोटाला डेटाबेस' : 
                 tool.title === 'AI Call Analyzer' ? 'AI कॉल विश्लेषक' : 
                 'आपातकालीन सहायता',
          description: tool.description === 'Record scam calls legally' ? 'घोटाला कॉल कानूनी रूप से रिकॉर्ड करें' : 
                       tool.description === 'File complaint instantly' ? 'तुरंत शिकायत दर्ज करें' : 
                       tool.description === 'Check phone numbers' ? 'फोन नंबर जांचें' : 
                       tool.description === 'Real-time scam detection' ? 'वास्तविक समय घोटाला पहचान' : 
                       'निकटतम पुलिस खोजें'
        }))
      },
      // ... add other Hindi translations similarly (protection, features, threats, tools, cta)
    }
  };

  const t = content[lang];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'smartphone': return Smartphone;
      case 'search': return Search;
      case 'message': return MessageCircle;
      case 'newspaper': return Newspaper;
      case 'lock': return Lock;
      default: return Shield;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'orange': return 'text-orange-400 border-orange-500/50 hover:border-orange-500';
      case 'purple': return 'text-purple-400 border-purple-500/50 hover:border-purple-500';
      case 'green': return 'text-green-400 border-green-500/50 hover:border-green-500';
      case 'red': return 'text-red-400 border-red-500/50 hover:border-red-500';
      case 'indigo': return 'text-indigo-400 border-indigo-500/50 hover:border-indigo-500';
      default: return 'text-blue-400 border-blue-500/50 hover:border-blue-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-full px-4 py-2 mb-6">
          <span className="text-sm font-semibold">{t.hero.badge}</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {t.hero.title}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {t.hero.highlight}
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {t.hero.subtitle}
        </p>
        <button
          onClick={() => onNavigate('scanner')}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition shadow-lg shadow-cyan-500/50"
        >
          {t.hero.cta}
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          {t.hero.stats.map((stat, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Anti-Scam Tools - FEATURED */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {t.emergency.title}
          </h2>
          <p className="text-gray-400 text-lg">{t.emergency.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.emergency.tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id as TabId)}
              className={`bg-gradient-to-br ${tool.gradient} rounded-xl p-6 hover:scale-105 transition text-left group shadow-lg`}
            >
              {tool.id === 'evidence' && <Camera className="w-10 h-10 mb-3 group-hover:scale-110 transition" />}
              {tool.id === 'report' && <Shield className="w-10 h-10 mb-3 group-hover:scale-110 transition" />}
              {tool.id === 'scamdb' && <Database className="w-10 h-10 mb-3 group-hover:scale-110 transition" />}
              {tool.id === 'aianalyzer' && <Brain className="w-10 h-10 mb-3 group-hover:scale-110 transition" />}
              {tool.id === 'emergency' && <Phone className="w-10 h-10 mb-3 group-hover:scale-110 transition" />}
              <h3 className="font-bold text-lg mb-1">{tool.title}</h3>
              <p className="text-sm text-white/90 opacity-90">{tool.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ... rest of your JSX (protection, features, threats, tools, cta sections) ... */}
    </div>
  );
}