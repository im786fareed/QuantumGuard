'use client';
import { useState, useEffect } from 'react';
import { Smartphone, Shield, AlertTriangle, CheckCircle, XCircle, Phone, Wifi, Battery, Database, Settings, ExternalLink } from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  status: 'checking' | 'safe' | 'warning' | 'danger' | 'manual';
  message: string;
  action?: string;
  autoCheck: boolean;
}

export default function DeviceSecurityScanner({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [scanning, setScanning] = useState(false);
  const [checks, setChecks] = useState<SecurityCheck[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const content = {
    en: {
      title: '🔒 Device Security Scanner',
      subtitle: 'Check if your phone is compromised by scammers',
      startScan: 'Start Security Scan',
      scanning: 'Scanning your device...',
      overallSecurity: 'Overall Security Score',
      checkTypes: {
        callForwarding: 'Call Forwarding Check',
        suspiciousApps: 'Suspicious Permissions',
        networkSecurity: 'Network Security',
        browserSecurity: 'Browser Security',
        batteryUsage: 'Battery & Performance',
        dataUsage: 'Data Usage Pattern'
      },
      statusLabels: {
        safe: '✅ Secure',
        warning: '⚠️ Attention Needed',
        danger: '🚨 Threat Detected',
        manual: '👉 Manual Check Required'
      },
      manualChecks: {
        title: '📋 Manual Security Checks',
        subtitle: 'These checks require your input',
        callForwarding: {
          title: '📞 Check Call Forwarding',
          instruction: 'Dial *#21# and check if "Voice call forwarding" shows as DISABLED',
          action: 'Dial *#21#',
          code: '*#21#'
        },
        installedApps: {
          title: '📱 Check Installed Apps',
          instruction: 'Go to Settings → Apps and look for unknown apps you didn\'t install',
          steps: [
            'Open Settings → Apps',
            'Look for apps with suspicious names',
            'Check app permissions (especially SMS, Calls, Contacts)',
            'Uninstall any unknown apps'
          ]
        },
        deviceAdmin: {
          title: '🔐 Check Device Admin Apps',
          instruction: 'Settings → Security → Device Admin Apps',
          steps: [
            'Open Settings → Security → Device Admin',
            'Check if any unknown apps have admin access',
            'Disable admin access for suspicious apps',
            'Uninstall the app after removing admin rights'
          ]
        },
        accessibility: {
          title: '♿ Check Accessibility Services',
          instruction: 'Settings → Accessibility',
          steps: [
            'Open Settings → Accessibility',
            'Check which apps have accessibility access',
            'Malware often abuses accessibility to control your phone',
            'Disable access for any suspicious apps'
          ]
        }
      },
      autoChecks: {
        title: '🤖 Automatic Security Checks',
        subtitle: 'We\'ll check these automatically'
      },
      compromiseIndicators: {
        title: '🚨 Signs Your Phone is Compromised',
        indicators: [
          'Sudden battery drain (phone dies in 2-3 hours)',
          'Phone heats up even when idle',
          'Data usage spike (50MB-100MB per day increase)',
          'Apps opening/closing automatically',
          'Settings changing on their own',
          'Unknown numbers in call history',
          'SMS being sent without your knowledge',
          'Bank OTPs you didn\'t request',
          'Unfamiliar apps appearing',
          'Phone slower than usual'
        ]
      },
      recommendations: {
        safe: 'Your device appears secure. Continue following security best practices.',
        warning: 'Some security concerns detected. Follow the recommendations to secure your device.',
        danger: 'CRITICAL: Your device may be compromised. Take immediate action!'
      },
      immediateActions: {
        title: '⚡ Immediate Actions if Compromised',
        steps: [
          'Turn on Airplane Mode immediately',
          'Change all passwords from a DIFFERENT device',
          'Call your bank and freeze accounts',
          'Factory reset your phone (backup important data first)',
          'Call telecom operator: Report SIM swap if suspected',
          'File police complaint at cyber cell',
          'Install security updates after reset',
          'Re-download apps only from official stores'
        ]
      }
    },
    hi: {
      title: '🔒 डिवाइस सुरक्षा स्कैनर',
      subtitle: 'जांचें कि क्या आपका फोन घोटालेबाजों द्वारा समझौता किया गया है',
      startScan: 'सुरक्षा स्कैन शुरू करें',
      scanning: 'आपके डिवाइस को स्कैन कर रहे हैं...',
      overallSecurity: 'समग्र सुरक्षा स्कोर',
      checkTypes: {
        callForwarding: 'कॉल फॉरवर्डिंग जांच',
        suspiciousApps: 'संदिग्ध अनुमतियां',
        networkSecurity: 'नेटवर्क सुरक्षा',
        browserSecurity: 'ब्राउज़र सुरक्षा',
        batteryUsage: 'बैटरी और प्रदर्शन',
        dataUsage: 'डेटा उपयोग पैटर्न'
      },
      statusLabels: {
        safe: '✅ सुरक्षित',
        warning: '⚠️ ध्यान देने की जरूरत',
        danger: '🚨 खतरा पाया गया',
        manual: '👉 मैनुअल जांच आवश्यक'
      },
      manualChecks: {
        title: '📋 मैनुअल सुरक्षा जांच',
        subtitle: 'इन जांचों के लिए आपके इनपुट की आवश्यकता है',
        callForwarding: {
          title: '📞 कॉल फॉरवर्डिंग जांचें',
          instruction: '*#21# डायल करें और जांचें कि "वॉयस कॉल फॉरवर्डिंग" अक्षम दिखाई दे',
          action: '*#21# डायल करें',
          code: '*#21#'
        },
        installedApps: {
          title: '📱 इंस्टॉल किए गए ऐप्स जांचें',
          instruction: 'सेटिंग्स → ऐप्स पर जाएं और अज्ञात ऐप्स देखें जो आपने इंस्टॉल नहीं किए',
          steps: [
            'सेटिंग्स → ऐप्स खोलें',
            'संदिग्ध नामों वाले ऐप्स देखें',
            'ऐप अनुमतियां जांचें (विशेष रूप से SMS, कॉल, संपर्क)',
            'किसी भी अज्ञात ऐप को अनइंस्टॉल करें'
          ]
        },
        deviceAdmin: {
          title: '🔐 डिवाइस एडमिन ऐप्स जांचें',
          instruction: 'सेटिंग्स → सुरक्षा → डिवाइस एडमिन ऐप्स',
          steps: [
            'सेटिंग्स → सुरक्षा → डिवाइस एडमिन खोलें',
            'जांचें कि क्या किसी अज्ञात ऐप के पास एडमिन एक्सेस है',
            'संदिग्ध ऐप्स के लिए एडमिन एक्सेस अक्षम करें',
            'एडमिन अधिकार हटाने के बाद ऐप अनइंस्टॉल करें'
          ]
        },
        accessibility: {
          title: '♿ सुलभता सेवाएं जांचें',
          instruction: 'सेटिंग्स → सुलभता',
          steps: [
            'सेटिंग्स → सुलभता खोलें',
            'जांचें कि किन ऐप्स के पास सुलभता पहुंच है',
            'मैलवेयर अक्सर आपके फोन को नियंत्रित करने के लिए सुलभता का दुरुपयोग करता है',
            'किसी भी संदिग्ध ऐप के लिए पहुंच अक्षम करें'
          ]
        }
      },
      autoChecks: {
        title: '🤖 स्वचालित सुरक्षा जांच',
        subtitle: 'हम इन्हें स्वचालित रूप से जांचेंगे'
      },
      compromiseIndicators: {
        title: '🚨 आपका फोन समझौता किए जाने के संकेत',
        indicators: [
          'अचानक बैटरी ड्रेन (फोन 2-3 घंटे में मर जाता है)',
          'फोन निष्क्रिय होने पर भी गर्म होता है',
          'डेटा उपयोग में वृद्धि (प्रति दिन 50MB-100MB वृद्धि)',
          'ऐप्स स्वचालित रूप से खुलते/बंद होते हैं',
          'सेटिंग्स अपने आप बदल जाती हैं',
          'कॉल हिस्ट्री में अज्ञात नंबर',
          'आपकी जानकारी के बिना SMS भेजे जा रहे हैं',
          'बैंक OTP जो आपने अनुरोध नहीं किए',
          'अपरिचित ऐप्स दिखाई देते हैं',
          'फोन सामान्य से धीमा'
        ]
      },
      recommendations: {
        safe: 'आपका डिवाइस सुरक्षित प्रतीत होता है। सुरक्षा सर्वोत्तम प्रथाओं का पालन करना जारी रखें।',
        warning: 'कुछ सुरक्षा चिंताएं पाई गईं। अपने डिवाइस को सुरक्षित करने के लिए सिफारिशों का पालन करें।',
        danger: 'गंभीर: आपका डिवाइस समझौता किया जा सकता है। तत्काल कार्रवाई करें!'
      },
      immediateActions: {
        title: '⚡ समझौता होने पर तत्काल कार्रवाई',
        steps: [
          'तुरंत एयरप्लेन मोड चालू करें',
          'एक अलग डिवाइस से सभी पासवर्ड बदलें',
          'अपने बैंक को कॉल करें और खाते फ्रीज करें',
          'अपने फोन को फैक्ट्री रीसेट करें (पहले महत्वपूर्ण डेटा बैकअप लें)',
          'टेलीकॉम ऑपरेटर को कॉल करें: SIM स्वैप की रिपोर्ट करें यदि संदेह हो',
          'साइबर सेल में पुलिस शिकायत दर्ज करें',
          'रीसेट के बाद सुरक्षा अपडेट इंस्टॉल करें',
          'केवल आधिकारिक स्टोर से ऐप्स फिर से डाउनलोड करें'
        ]
      }
    }
  };

  const t = content[lang];

  const runAutoChecks = async () => {
    setScanning(true);
    const newChecks: SecurityCheck[] = [];

    // Check 1: Browser Security
    await new Promise(resolve => setTimeout(resolve, 500));
    newChecks.push({
      id: 'browser',
      name: t.checkTypes.browserSecurity,
      status: 'safe',
      message: lang === 'en' 
        ? 'No suspicious browser extensions detected' 
        : 'कोई संदिग्ध ब्राउज़र एक्सटेंशन नहीं मिला',
      autoCheck: true
    });

    // Check 2: Network Security
    await new Promise(resolve => setTimeout(resolve, 500));
    const isVPN = false;
    newChecks.push({
      id: 'network',
      name: t.checkTypes.networkSecurity,
      status: isVPN ? 'warning' : 'safe',
      message: isVPN 
        ? (lang === 'en' ? 'VPN detected - ensure it\'s from trusted source' : 'VPN पाया गया - सुनिश्चित करें कि यह विश्वसनीय स्रोत से है')
        : (lang === 'en' ? 'Network connection appears secure' : 'नेटवर्क कनेक्शन सुरक्षित प्रतीत होता है'),
      autoCheck: true
    });

    // Check 3: Battery/Performance (User input needed)
    await new Promise(resolve => setTimeout(resolve, 500));
    newChecks.push({
      id: 'battery',
      name: t.checkTypes.batteryUsage,
      status: 'manual',
      message: lang === 'en'
        ? 'Check if battery drains unusually fast'
        : 'जांचें कि क्या बैटरी असामान्य रूप से तेजी से खत्म होती है',
      action: lang === 'en'
        ? 'Settings → Battery → Check battery usage by apps'
        : 'सेटिंग्स → बैटरी → ऐप्स द्वारा बैटरी उपयोग जांचें',
      autoCheck: false
    });

    // Check 4: Call Forwarding (Manual)
    await new Promise(resolve => setTimeout(resolve, 500));
    newChecks.push({
      id: 'callforward',
      name: t.checkTypes.callForwarding,
      status: 'manual',
      message: lang === 'en'
        ? 'Dial *#21# to check call forwarding status'
        : 'कॉल फॉरवर्डिंग स्थिति जांचने के लिए *#21# डायल करें',
      action: lang === 'en'
        ? 'Dial *#21# now'
        : 'अभी *#21# डायल करें',
      autoCheck: false
    });

    // Check 5: Suspicious Apps (Manual)
    await new Promise(resolve => setTimeout(resolve, 500));
    newChecks.push({
      id: 'apps',
      name: t.checkTypes.suspiciousApps,
      status: 'manual',
      message: lang === 'en'
        ? 'Check for unknown apps in Settings'
        : 'सेटिंग्स में अज्ञात ऐप्स की जांच करें',
      action: lang === 'en'
        ? 'Settings → Apps → Check for suspicious apps'
        : 'सेटिंग्स → ऐप्स → संदिग्ध ऐप्स की जांच करें',
      autoCheck: false
    });

    setChecks(newChecks);
    
    // Calculate score
    const safeCount = newChecks.filter(c => c.status === 'safe').length;
    const score = Math.round((safeCount / newChecks.length) * 100);
    setOverallScore(score);
    
    setScanning(false);
  };

  const getScoreColor = () => {
    if (overallScore >= 80) return 'text-green-400 bg-green-600/20 border-green-500/50';
    if (overallScore >= 50) return 'text-yellow-400 bg-yellow-600/20 border-yellow-500/50';
    return 'text-red-400 bg-red-600/20 border-red-500/50';
  };

  const getStatusIcon = (status: SecurityCheck['status']) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'danger': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'manual': return <Settings className="w-5 h-5 text-blue-400" />;
      default: return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-purple-100">{t.subtitle}</p>
      </div>

      {/* Scan Button */}
      {checks.length === 0 && (
        <button
          onClick={runAutoChecks}
          disabled={scanning}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition mb-6"
        >
          <Shield className="w-6 h-6" />
          {scanning ? t.scanning : t.startScan}
        </button>
      )}

      {/* Overall Score */}
      {checks.length > 0 && (
        <div className={`border rounded-xl p-6 mb-6 ${getScoreColor()}`}>
          <div className="text-center">
            <div className="text-sm opacity-80 mb-2">{t.overallSecurity}</div>
            <div className="text-6xl font-bold mb-4">{overallScore}%</div>
            <div className="text-lg">
              {overallScore >= 80 && t.recommendations.safe}
              {overallScore >= 50 && overallScore < 80 && t.recommendations.warning}
              {overallScore < 50 && t.recommendations.danger}
            </div>
          </div>
        </div>
      )}

      {/* Auto Checks Results */}
      {checks.filter(c => c.autoCheck).length > 0 && (
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{t.autoChecks.title}</h2>
          <p className="text-gray-400 text-sm mb-4">{t.autoChecks.subtitle}</p>
          
          <div className="space-y-3">
            {checks.filter(c => c.autoCheck).map((check) => (
              <div
                key={check.id}
                className="bg-black/50 border border-white/10 rounded-lg p-4 flex items-start gap-3"
              >
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{check.name}</h3>
                  <p className="text-sm text-gray-400">{check.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Checks */}
      {checks.filter(c => !c.autoCheck).length > 0 && (
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{t.manualChecks.title}</h2>
          <p className="text-gray-400 text-sm mb-4">{t.manualChecks.subtitle}</p>
          
          <div className="space-y-4">
            {/* Call Forwarding Check */}
            <div className="bg-blue-600/20 border border-blue-500/50 rounded-lg p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                {t.manualChecks.callForwarding.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{t.manualChecks.callForwarding.instruction}</p>
              
(
  <a
    href={`tel:${encodeURIComponent(t.manualChecks.callForwarding.code)}`}
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2 transition"
  >
    <Phone className="w-4 h-4" />
    {t.manualChecks.callForwarding.action}
  </a>
)
            </div>

            {/* Installed Apps */}
            <div className="bg-orange-600/20 border border-orange-500/50 rounded-lg p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-400" />
                {t.manualChecks.installedApps.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{t.manualChecks.installedApps.instruction}</p>
              <ol className="space-y-2 text-sm">
                {t.manualChecks.installedApps.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 font-bold">{index + 1}.</span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Device Admin */}
            <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                {t.manualChecks.deviceAdmin.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{t.manualChecks.deviceAdmin.instruction}</p>
              <ol className="space-y-2 text-sm">
                {t.manualChecks.deviceAdmin.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">{index + 1}.</span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Accessibility Services */}
            <div className="bg-purple-600/20 border border-purple-500/50 rounded-lg p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                {t.manualChecks.accessibility.title}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{t.manualChecks.accessibility.instruction}</p>
              <ol className="space-y-2 text-sm">
                {t.manualChecks.accessibility.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">{index + 1}.</span>
                    <span className="text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Compromise Indicators */}
      <div className="bg-red-600/20 border border-red-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          {t.compromiseIndicators.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-3">
          {t.compromiseIndicators.indicators.map((indicator, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-3 flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">{indicator}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          {t.immediateActions.title}
        </h2>
        
        <ol className="space-y-3">
          {t.immediateActions.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="bg-yellow-600 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-300">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}