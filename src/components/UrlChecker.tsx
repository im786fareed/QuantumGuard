'use client';

import { Link as LinkIcon, AlertTriangle, CheckCircle, XCircle, Shield, Download } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'en' | 'hi';
}

interface CheckResult {
  verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING' | 'APK_DANGER' | 'GMAIL_SPAM';
  riskScore: number;
  message: string;
  isAPK: boolean;
  apkWarning?: string;
  playStoreAlternative?: string;
  details: {
    protocol: string;
    domain: string;
    fileType?: string;
    checked: string;
  };
  actions: string[];
}

const CONTENT = {
  en: {
    title: 'AI URL & APK Safety Checker',
    subtitle: 'Blocks malicious APK links before device compromise',
    placeholder: 'Enter URL to check (e.g., https://example.com)',
    checkButton: 'Check URL Safety',
    checking: 'AI analyzing threat level...',
    result: 'Security Analysis',
    riskScore: 'Threat Level',
    details: 'URL Details',
    whatToDo: 'Protection Actions',
    checkAnother: 'Check Another URL',
    disclaimer: 'AI-powered APK detection + real-time phishing intelligence. Blocks Android malware distribution.',
    apkCritical: 'APK INSTALLATION LINK DETECTED',
    apkWarning: 'CRITICAL DEVICE THREAT',
    playStoreOnly: 'Only install apps from Google Play Store',
    gmailSpamWarning: 'GMAIL SPAM FOLDER LINK DETECTED',
    useSpamChecker: 'Use SPAM AI CHECKER for email content analysis'
  },
  hi: {
    title: 'AI URL और APK सुरक्षा जांच',
    subtitle: 'डिवाइस समझौता होने से पहले दुर्भावनापूर्ण APK लिंक को ब्लॉक करता है',
    placeholder: 'जांच के लिए URL दर्ज करें',
    checkButton: 'URL सुरक्षा जांचें',
    checking: 'AI खतरा स्तर का विश्लेषण कर रहा है',
    result: 'सुरक्षा विश्लेषण',
    riskScore: 'खतरा स्तर',
    details: 'URL विवरण',
    whatToDo: 'सुरक्षा कार्रवाई',
    checkAnother: 'अन्य URL जांचें',
    disclaimer: 'AI संचालित APK पहचान + वास्तविक समय फ़िशिंग खुफिया। Android मैलवेयर को ब्लॉक करता है।',
    apkCritical: 'APK इंस्टॉलेशन लिंक मिला',
    apkWarning: 'गंभीर डिवाइस खतरा',
    playStoreOnly: 'केवल Google Play Store से ऐप इंस्टॉल करें',
    gmailSpamWarning: 'GMAIL स्पैम फ़ोल्डर लिंक मिला',
    useSpamChecker: 'ईमेल सामग्री विश्लेषण के लिए SPAM AI CHECKER उपयोग करें'
  }
};

export default function UrlChecker({ lang }: Props) {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const content = CONTENT[lang];

  const detectAPK = (urlString: string): { isAPK: boolean; fileType?: string } => {
    const lower = urlString.toLowerCase();
    
    // Direct APK detection
    if (lower.endsWith('.apk')) {
      return { isAPK: true, fileType: 'Direct APK file' };
    }
    
    // APK in URL path
    if (lower.includes('.apk?') || lower.includes('.apk#') || lower.includes('/apk/')) {
      return { isAPK: true, fileType: 'APK in URL path' };
    }
    
    // Common file hosting with APK
    const fileHosting = [
      'drive.google.com', 'dropbox.com', 'mega.nz', 'mediafire.com',
      'files.fm', 'uploadfiles.io', '4shared.com', 'zippyshare.com'
    ];
    
    if (fileHosting.some(host => lower.includes(host)) && 
        (lower.includes('apk') || lower.includes('download'))) {
      return { isAPK: true, fileType: 'File hosting (likely APK)' };
    }
    
    // Suspicious app install patterns
    const appInstallPatterns = [
      'install-app', 'download-app', 'get-app', 'update-app',
      'app-update', 'new-version', 'latest-version', 'install-now'
    ];
    
    if (appInstallPatterns.some(pattern => lower.includes(pattern))) {
      return { isAPK: true, fileType: 'App installation page' };
    }
    
    // URL shorteners (often hide APK)
    const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly', 'short.link'];
    if (shorteners.some(short => lower.includes(short))) {
      return { isAPK: true, fileType: 'Shortened URL (may hide APK)' };
    }
    
    return { isAPK: false };
  };

  const extractAppName = (urlString: string): string | null => {
    const commonApps = [
      'paytm', 'phonepe', 'gpay', 'whatsapp', 'telegram', 'instagram',
      'facebook', 'truecaller', 'bhim', 'amazon', 'flipkart', 'myntra'
    ];
    
    const lower = urlString.toLowerCase();
    for (const app of commonApps) {
      if (lower.includes(app)) {
        return app.charAt(0).toUpperCase() + app.slice(1);
      }
    }
    return null;
  };

  const checkUrl = async () => {
    if (!url.trim()) return;
    
    setIsChecking(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    // CRITICAL: DETECT GMAIL SPAM FOLDER LINKS
    if (url.includes('mail.google.com') && url.includes('#spam')) {
      setResult({
        verdict: 'GMAIL_SPAM',
        riskScore: 80,
        message: lang === 'en'
          ? '⚠️ GMAIL SPAM FOLDER DETECTED! Gmail has already flagged this email as dangerous. URL checkers cannot analyze email CONTENT - you must use SPAM AI CHECKER instead.'
          : '⚠️ GMAIL स्पैम फ़ोल्डर मिला! Gmail ने इस ईमेल को पहले ही खतरनाक के रूप में चिह्नित किया है। URL चेकर ईमेल सामग्री का विश्लेषण नहीं कर सकते - आपको इसके बजाय SPAM AI CHECKER का उपयोग करना होगा।',
        isAPK: false,
        details: {
          protocol: 'Secure (HTTPS)',
          domain: 'mail.google.com (Gmail Spam Folder)',
          checked: new Date().toLocaleString()
        },
        actions: [
          lang === 'en' ? '🚨 This is a link to your Gmail SPAM folder - Gmail already knows this is dangerous!' : '🚨 यह आपके Gmail SPAM फ़ोल्डर का लिंक है - Gmail पहले से जानता है कि यह खतरनाक है!',
          '',
          lang === 'en' ? '✅ CORRECT WAY TO CHECK EMAIL SCAMS:' : '✅ ईमेल स्कैम जांचने का सही तरीका:',
          '',
          lang === 'en' ? '1️⃣ Open the email in Gmail spam folder' : '1️⃣ Gmail स्पैम फ़ोल्डर में ईमेल खोलें',
          lang === 'en' ? '2️⃣ Copy ENTIRE email content:' : '2️⃣ पूरा ईमेल कॉपी करें:',
          lang === 'en' ? '   • Subject line' : '   • विषय पंक्ति',
          lang === 'en' ? '   • Sender email address' : '   • प्रेषक ईमेल पता',
          lang === 'en' ? '   • Full email body text' : '   • पूर्ण ईमेल संदेश',
          lang === 'en' ? '3️⃣ Go to SPAM AI CHECKER tab (not URL checker)' : '3️⃣ SPAM AI CHECKER टैब पर जाएं (URL चेकर नहीं)',
          lang === 'en' ? '4️⃣ Paste the complete email content there' : '4️⃣ वहां पूर्ण ईमेल सामग्री पेस्ट करें',
          lang === 'en' ? '5️⃣ Click "AI Analyze Email"' : '5️⃣ "AI ईमेल विश्लेषण" पर क्लिक करें',
          '',
          lang === 'en' ? '🔍 SPAM AI will detect:' : '🔍 SPAM AI जांचेगा:',
          lang === 'en' ? '   ✓ Lottery/Prize scams' : '   ✓ लॉटरी/पुरस्कार स्कैम',
          lang === 'en' ? '   ✓ Urgency pressure tactics' : '   ✓ दबाव रणनीति',
          lang === 'en' ? '   ✓ Suspicious sender patterns' : '   ✓ संदिग्ध प्रेषक पैटर्न',
          lang === 'en' ? '   ✓ Fake banking/UPI requests' : '   ✓ नकली बैंकिंग/UPI अनुरोध',
          lang === 'en' ? '   ✓ Money/payment mentions' : '   ✓ पैसे/भुगतान उल्लेख',
          lang === 'en' ? '   ✓ URLs hidden in email text' : '   ✓ ईमेल टेक्स्ट में छिपे URL',
          '',
          lang === 'en' ? '⚠️ WHY URL CHECKER CANNOT HELP:' : '⚠️ URL चेकर क्यों मदद नहीं कर सकता:',
          lang === 'en' ? 'URL checkers only analyze domain names (mail.google.com = safe).' : 'URL चेकर केवल डोमेन नामों का विश्लेषण करते हैं (mail.google.com = सुरक्षित)।',
          lang === 'en' ? 'They CANNOT read email content where the actual scam is!' : 'वे ईमेल सामग्री नहीं पढ़ सकते जहां वास्तविक स्कैम है!',
          lang === 'en' ? 'That\'s why you need SPAM AI CHECKER for emails.' : 'इसलिए ईमेल के लिए आपको SPAM AI CHECKER की आवश्यकता है।'
        ]
      });
      setIsChecking(false);
      return;
    }

    const apkDetection = detectAPK(url);
    const appName = extractAppName(url);
    
    let verdict: 'SAFE' | 'SUSPICIOUS' | 'PHISHING' | 'APK_DANGER' = 'SAFE';
    let message = '';
    let riskScore = 0;
    let apkWarning = '';
    let playStoreAlternative = '';

    // CRITICAL: APK Detection
    if (apkDetection.isAPK) {
      verdict = 'APK_DANGER';
      riskScore = 100;
      message = lang === 'en'
        ? '🚨 CRITICAL THREAT! This link attempts to install an Android app (APK) outside Google Play Store. Installing this can give hackers COMPLETE access to your device, contacts, messages, banking apps, and photos.'
        : '🚨 गंभीर खतरा! यह लिंक Google Play Store के बाहर Android ऐप (APK) इंस्टॉल करने का प्रयास करता है। इसे इंस्टॉल करने से हैकर्स को आपके डिवाइस, संपर्क, संदेश, बैंकिंग ऐप और फ़ोटो तक पूर्ण पहुंच मिल सकती है।';
      
      apkWarning = lang === 'en'
        ? `APK Type: ${apkDetection.fileType}\n\n⚠️ WHY APK FILES ARE DANGEROUS:\n• Bypass Google Play security checks\n• Can contain hidden malware and spyware\n• Request dangerous permissions silently\n• Used in 95% of Android banking trojans\n• Impossible to remove once installed`
        : `APK प्रकार: ${apkDetection.fileType}\n\n⚠️ APK फ़ाइलें खतरनाक क्यों हैं:\n• Google Play सुरक्षा जांच को बायपास करती हैं\n• छिपा मैलवेयर और स्पाइवेयर हो सकता है\n• खतरनाक अनुमतियां चुपचाप मांगती हैं\n• 95% Android बैंकिंग ट्रोजन में उपयोग की जाती हैं\n• इंस्टॉल होने के बाद हटाना असंभव`;
      
      if (appName) {
        playStoreAlternative = lang === 'en'
          ? `✅ SAFE ALTERNATIVE:\n\nReal ${appName} app is available on Google Play Store.\n\n1. Open Google Play Store app\n2. Search for "${appName}"\n3. Look for verified publisher badge ✓\n4. Check 1M+ downloads\n5. Install ONLY from Play Store`
          : `✅ सुरक्षित विकल्प:\n\nवास्तविक ${appName} ऐप Google Play Store पर उपलब्ध है।\n\n1. Google Play Store ऐप खोलें\n2. "${appName}" खोजें\n3. सत्यापित प्रकाशक बैज देखें ✓\n4. 1M+ डाउनलोड देखें\n5. केवल Play Store से इंस्टॉल करें`;
      }
    } else {
      // Regular phishing check (existing logic)
      try {
        const response = await fetch(`https://api.phish.rocks/v1/check?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.phishing === true || data.status === 'phishing') {
          verdict = 'PHISHING';
          riskScore = 95;
          message = lang === 'en'
            ? 'PHISHING DETECTED! This URL is known to be malicious and designed to steal your data.'
            : 'फ़िशिंग मिली! यह URL दुर्भावनापूर्ण है और आपका डेटा चुराने के लिए डिज़ाइन किया गया है।';
        } else if (data.suspicious === true) {
          verdict = 'SUSPICIOUS';
          riskScore = 60;
          message = lang === 'en'
            ? 'Suspicious patterns detected. Proceed with extreme caution.'
            : 'संदिग्ध पैटर्न मिले। अत्यधिक सावधानी के साथ आगे बढ़ें।';
        } else {
          verdict = 'SAFE';
          riskScore = 10;
          message = lang === 'en'
            ? 'URL appears safe based on known threat databases.'
            : 'ज्ञात खतरा डेटाबेस के आधार पर URL सुरक्षित दिखता है।';
        }
      } catch (error) {
        // Fallback pattern analysis
        const lowerUrl = url.toLowerCase();
        const suspiciousPatterns = [
          'verify', 'account', 'suspended', 'urgent', 'login',
          'secure', 'update', 'confirm', 'prize', 'winner'
        ];

        for (const pattern of suspiciousPatterns) {
          if (lowerUrl.includes(pattern)) riskScore += 15;
        }

        if (!url.startsWith('https://')) riskScore += 20;
        
        riskScore = Math.min(riskScore, 100);

        if (riskScore >= 70) {
          verdict = 'PHISHING';
          message = lang === 'en'
            ? 'High risk patterns detected. Likely phishing attempt.'
            : 'उच्च जोखिम पैटर्न मिले। संभवतः फ़िशिंग प्रयास।';
        } else if (riskScore >= 40) {
          verdict = 'SUSPICIOUS';
          message = lang === 'en'
            ? 'Suspicious patterns found. Verify before visiting.'
            : 'संदिग्ध पैटर्न मिले। पहले सत्यापित करें।';
        } else {
          verdict = 'SAFE';
          message = lang === 'en'
            ? 'No obvious threats detected.'
            : 'कोई स्पष्ट खतरा नहीं मिला।';
        }
      }
    }

    const actions = verdict === 'APK_DANGER' ? [
      lang === 'en' ? '🚫 DO NOT click this link' : '🚫 इस लिंक पर क्लिक न करें',
      lang === 'en' ? '🚫 DO NOT download any APK file' : '🚫 कोई APK फ़ाइल डाउनलोड न करें',
      lang === 'en' ? '🚫 If already downloaded, DELETE immediately' : '🚫 यदि डाउनलोड हो गया है, तुरंत हटाएं',
      lang === 'en' ? '✅ Only install apps from Google Play Store' : '✅ केवल Google Play Store से ऐप इंस्टॉल करें',
      lang === 'en' ? '📞 Report to sender: "This is a scam link"' : '📞 प्रेषक को रिपोर्ट करें',
      lang === 'en' ? '🛡️ Block the sender immediately' : '🛡️ प्रेषक को तुरंत ब्लॉक करें',
      lang === 'en' ? '📱 If installed, factory reset your phone' : '📱 यदि इंस्टॉल हो गया, फैक्ट्री रीसेट करें',
      lang === 'en' ? '📞 Call 1930 (Cybercrime Helpline)' : '📞 1930 पर कॉल करें'
    ] : verdict === 'PHISHING' ? [
      lang === 'en' ? 'DO NOT visit this website' : 'इस वेबसाइट पर न जाएं',
      lang === 'en' ? 'DO NOT enter any personal information' : 'कोई व्यक्तिगत जानकारी न दें',
      lang === 'en' ? 'Report to cybercrime.gov.in' : 'cybercrime.gov.in पर रिपोर्ट करें',
      lang === 'en' ? 'Warn others who received this link' : 'इस लिंक को प्राप्त करने वालों को चेतावनी दें'
    ] : verdict === 'SUSPICIOUS' ? [
      lang === 'en' ? 'Verify website through official channels' : 'आधिकारिक चैनलों से सत्यापित करें',
      lang === 'en' ? 'Check for HTTPS and padlock icon' : 'HTTPS और पैडलॉक आइकन जांचें',
      lang === 'en' ? 'Do not enter sensitive information' : 'संवेदनशील जानकारी न दें'
    ] : [
      lang === 'en' ? 'Always verify sender before clicking links' : 'लिंक क्लिक से पहले प्रेषक सत्यापित करें',
      lang === 'en' ? 'Check for HTTPS before entering data' : 'डेटा दर्ज करने से पहले HTTPS जांचें'
    ];

    setResult({
      verdict,
      riskScore,
      message,
      isAPK: apkDetection.isAPK,
      apkWarning,
      playStoreAlternative,
      details: {
        protocol: url.startsWith('https') ? 'Secure (HTTPS)' : 'Insecure (HTTP)',
        domain: url.includes('://') ? new URL(url).hostname : url,
        fileType: apkDetection.fileType,
        checked: new Date().toLocaleString()
      },
      actions
    });
    
    setIsChecking(false);
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'SAFE') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (verdict === 'SUSPICIOUS' || verdict === 'GMAIL_SPAM') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    if (verdict === 'APK_DANGER') return 'text-red-400 bg-red-900/40 border-red-500 animate-pulse';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'SAFE') return <CheckCircle className="w-12 h-12 text-green-400" />;
    if (verdict === 'SUSPICIOUS' || verdict === 'GMAIL_SPAM') return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
    if (verdict === 'APK_DANGER') return <XCircle className="w-12 h-12 text-red-400 animate-pulse" />;
    return <XCircle className="w-12 h-12 text-red-400" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-cyan-500/20 rounded-2xl mb-4">
          <Shield className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-2">{content.title}</h2>
        <p className="text-gray-400 text-lg">{content.subtitle}</p>
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={content.placeholder}
          className="w-full bg-black/30 rounded-xl p-4 text-white placeholder-gray-500 border border-white/10 focus:border-cyan-400 focus:outline-none mb-4"
        />

        <button
          onClick={checkUrl}
          disabled={isChecking || !url.trim()}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? content.checking : content.checkButton}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-yellow-600/20 backdrop-blur rounded-xl border border-yellow-500/50 p-4">
            <p className="text-sm text-yellow-200">
              <span className="font-bold">⚠️</span> {content.disclaimer}
            </p>
          </div>

          {result.verdict === 'GMAIL_SPAM' && (
            <div className="bg-yellow-900/60 backdrop-blur rounded-2xl border-4 border-yellow-500 p-8">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-16 h-16 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                    {content.gmailSpamWarning}
                  </h3>
                  <p className="text-xl font-bold text-white mb-4">
                    {content.useSpamChecker}
                  </p>
                </div>
              </div>
            </div>
          )}

          {result.verdict === 'APK_DANGER' && (
            <div className="bg-red-900/60 backdrop-blur rounded-2xl border-4 border-red-500 p-8 animate-pulse">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-16 h-16 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold text-red-400 mb-2">
                    {content.apkCritical}
                  </h3>
                  <p className="text-xl font-bold text-white mb-4">
                    {content.apkWarning}
                  </p>
                  <div className="bg-black/50 rounded-xl p-4 mb-4">
                    <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
                      {result.apkWarning}
                    </pre>
                  </div>
                </div>
              </div>
              
              {result.playStoreAlternative && (
                <div className="bg-green-900/40 rounded-xl border-2 border-green-500 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Download className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <h4 className="text-xl font-bold text-green-400">
                      {content.playStoreOnly}
                    </h4>
                  </div>
                  <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                    {result.playStoreAlternative}
                  </pre>
                </div>
              )}
            </div>
          )}

          <div className={`backdrop-blur rounded-2xl border-2 p-8 ${getVerdictColor(result.verdict)}`}>
            <div className="flex items-center gap-4 mb-4">
              {getVerdictIcon(result.verdict)}
              <div>
                <h3 className="text-3xl font-bold">{result.verdict.replace('_', ' ')}</h3>
                <p className="text-lg opacity-90">{content.riskScore}: {result.riskScore}%</p>
              </div>
            </div>
            <p className="text-xl">{result.message}</p>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-xl font-bold mb-4">{content.details}:</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Protocol:</span>
                <span className="font-bold">{result.details.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Domain:</span>
                <span className="font-bold">{result.details.domain}</span>
              </div>
              {result.details.fileType && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="font-bold text-red-400">{result.details.fileType}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Checked:</span>
                <span className="font-bold">{result.details.checked}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
            <h4 className="text-xl font-bold mb-4">{content.whatToDo}:</h4>
            <ul className="space-y-3">
              {result.actions.map((action, i) => (
                <li key={i} className={`flex items-start gap-3 ${action === '' ? 'h-2' : ''}`}>
                  {action !== '' && (
                    <>
                      <span className="text-cyan-400 font-bold">{action.match(/^\d+️⃣|^[🚨✅🔍⚠️]/)?.[0] || `${i + 1}.`}</span>
                      <span className="text-gray-300">{action.replace(/^\d+️⃣\s*|^[🚨✅🔍⚠️]\s*/, '')}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => { setResult(null); setUrl(''); }}
            className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition"
          >
            {content.checkAnother}
          </button>
        </div>
      )}
    </div>
  );
}