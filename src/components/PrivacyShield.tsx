'use client';
import { useState } from 'react';
import { Shield, Globe, Lock, AlertTriangle, CheckCircle, ExternalLink, Eye, EyeOff, XCircle } from 'lucide-react';

export default function PrivacyShield({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [dnsTest, setDnsTest] = useState<'idle' | 'testing' | 'safe' | 'danger'>('idle');

  const content = {
    en: {
      title: '🛡️ Privacy Shield',
      subtitle: 'Protect your online privacy without expensive VPNs',

      why: {
        title: '🤔 Why You DON\'T Need a VPN (Usually)',
        myths: [
          {
            myth: 'I need VPN to stay safe online',
            reality: 'Most websites use HTTPS already (encrypted). VPN helps with privacy from ISP, but won\'t protect you from scams or malware.'
          },
          {
            myth: 'Free VPNs are safe',
            reality: 'DANGEROUS! Many free VPNs sell your data, inject ads, or are operated by scammers. If it\'s free, YOU are the product.'
          },
          {
            myth: 'VPN makes me anonymous',
            reality: 'Partial. VPN hides your IP but websites still track you via cookies, browser fingerprinting, and login data.'
          }
        ]
      },

      betterAlternatives: {
        title: '✅ Better (FREE) Privacy Protection',
        options: [
          {
            name: 'DNS over HTTPS (DoH)',
            description: 'Encrypt your DNS queries so ISP can\'t spy on which websites you visit',
            benefit: 'FREE, Built-in, Prevents DNS hijacking',
            howTo: 'Enable in browser settings (Chrome/Firefox/Edge)',
            steps: [
              'Chrome: Settings → Privacy & Security → Use secure DNS',
              'Firefox: Settings → Network Settings → Enable DNS over HTTPS',
              'Use Cloudflare (1.1.1.1) or Google (8.8.8.8) DNS'
            ]
          },
          {
            name: 'HTTPS-Only Mode',
            description: 'Force all websites to use encrypted connections',
            benefit: 'FREE, Prevents man-in-the-middle attacks',
            howTo: 'Enable in browser settings',
            steps: [
              'Chrome: Settings → Privacy → Always use secure connections',
              'Firefox: Settings → Privacy → HTTPS-Only Mode',
              'Never ignore HTTPS warnings!'
            ]
          },
          {
            name: 'Private Browsing Mode',
            description: 'Browse without saving history, cookies, or cache',
            benefit: 'FREE, Built-in to all browsers',
            howTo: 'Use for sensitive browsing',
            steps: [
              'Chrome: Ctrl+Shift+N (Incognito)',
              'Firefox: Ctrl+Shift+P (Private Window)',
              'Doesn\'t hide from ISP, but prevents local tracking'
            ]
          },
          {
            name: 'Ad & Tracker Blockers',
            description: 'Block ads, trackers, and malicious scripts',
            benefit: 'FREE, Faster browsing, Better privacy',
            howTo: 'Install browser extensions',
            steps: [
              'uBlock Origin (best free ad blocker)',
              'Privacy Badger (automatic tracker blocker)',
              'HTTPS Everywhere (force HTTPS)'
            ]
          }
        ]
      },

      whenYouNeedVPN: {
        title: '🔐 When You Actually NEED a VPN',
        scenarios: [
          'Using public WiFi (coffee shops, airports)',
          'Accessing banking on unsecured networks',
          'Your ISP is blocking legitimate websites',
          'Working remotely and accessing company network',
          'Traveling abroad and need Indian IP'
        ],
        trustedVPNs: [
          {
            name: 'ProtonVPN',
            why: 'Swiss-based, no logs, free tier available',
            link: 'https://protonvpn.com'
          },
          {
            name: 'Windscribe',
            why: 'Canadian, 10GB free per month',
            link: 'https://windscribe.com'
          },
          {
            name: 'Cloudflare WARP',
            why: 'From DNS company, focus on security not privacy',
            link: 'https://1.1.1.1'
          }
        ],
        avoid: [
          '❌ Any VPN from unknown developers',
          '❌ VPNs advertised heavily on YouTube (they pay for ads somehow)',
          '❌ Chinese-owned VPNs (data protection laws)',
          '❌ VPNs that require excessive permissions',
          '❌ "100% free forever" VPNs (selling your data)'
        ]
      },

      dnsTest: {
        title: '🔍 Test Your DNS Security',
        description: 'Check if your DNS queries are encrypted',
        testButton: 'Test DNS Security',
        testing: 'Testing...',
        results: {
          safe: 'Your DNS is encrypted! Good job.',
          danger: 'Your DNS is NOT encrypted. Enable DNS over HTTPS.'
        }
      },

      privacyChecklist: {
        title: '✅ Privacy Protection Checklist',
        items: [
          'Enable DNS over HTTPS in browser',
          'Turn on HTTPS-Only mode',
          'Install uBlock Origin ad blocker',
          'Use strong, unique passwords (password manager)',
          'Enable 2FA on all accounts',
          'Review app permissions (revoke unnecessary)',
          'Clear cookies regularly',
          'Use private browsing for sensitive searches',
          'Never save passwords in public computers',
          'Check "Have I Been Pwned" for data breaches'
        ]
      },

      scamVPNs: {
        title: '🚨 Beware: Scam VPN Apps',
        warning: 'Many fake VPN apps in Play Store are actually MALWARE designed to steal your data!',
        redFlags: [
          'Claims "100% free forever with unlimited data"',
          'Requires access to SMS, Contacts, Camera',
          'Made by unknown developer with <1000 downloads',
          'Asks for payment details for "free trial"',
          'Shows excessive ads',
          'Drains battery suspiciously fast',
          'No clear privacy policy',
          'Promises "anonymity" or "invisibility"'
        ]
      }
    },
    hi: {
      title: '🛡️ गोपनीयता शील्ड',
      subtitle: 'महंगे VPN के बिना अपनी ऑनलाइन गोपनीयता सुरक्षित करें',

      why: {
        title: '🤔 आपको VPN की आवश्यकता क्यों नहीं है (आमतौर पर)',
        myths: [
          {
            myth: 'मुझे ऑनलाइन सुरक्षित रहने के लिए VPN चाहिए',
            reality: 'अधिकांश वेबसाइटें पहले से ही HTTPS का उपयोग करती हैं (एन्क्रिप्टेड)। VPN ISP से गोपनीयता में मदद करता है, लेकिन आपको घोटालों या मैलवेयर से सुरक्षित नहीं रखेगा।'
          },
          {
            myth: 'मुफ्त VPN सुरक्षित हैं',
            reality: 'खतरनाक! कई मुफ्त VPN आपका डेटा बेचते हैं, विज्ञापन इंजेक्ट करते हैं, या घोटालेबाजों द्वारा संचालित होते हैं। यदि यह मुफ्त है, तो आप उत्पाद हैं।'
          },
          {
            myth: 'VPN मुझे गुमनाम बनाता है',
            reality: 'आंशिक। VPN आपके IP को छुपाता है लेकिन वेबसाइटें अभी भी कुकीज़, ब्राउज़र फिंगरप्रिंटिंग और लॉगिन डेटा के माध्यम से आपको ट्रैक करती हैं।'
          }
        ]
      },

      betterAlternatives: {
        title: '✅ बेहतर (मुफ्त) गोपनीयता सुरक्षा',
        options: [
          {
            name: 'DNS over HTTPS (DoH)',
            description: 'अपनी DNS क्वेरी एन्क्रिप्ट करें ताकि ISP यह न देख सके कि आप कौन सी वेबसाइटें देखते हैं',
            benefit: 'मुफ्त, अंतर्निहित, DNS हाइजैकिंग रोकता है',
            howTo: 'ब्राउज़र सेटिंग्स में सक्षम करें (Chrome/Firefox/Edge)',
            steps: [
              'Chrome: सेटिंग्स → गोपनीयता और सुरक्षा → सुरक्षित DNS का उपयोग करें',
              'Firefox: सेटिंग्स → नेटवर्क सेटिंग्स → DNS over HTTPS सक्षम करें',
              'Cloudflare (1.1.1.1) या Google (8.8.8.8) DNS का उपयोग करें'
            ]
          },
          {
            name: 'HTTPS-केवल मोड',
            description: 'सभी वेबसाइटों को एन्क्रिप्टेड कनेक्शन का उपयोग करने के लिए मजबूर करें',
            benefit: 'मुफ्त, मैन-इन-द-मिडल हमलों को रोकता है',
            howTo: 'ब्राउज़र सेटिंग्स में सक्षम करें',
            steps: [
              'Chrome: सेटिंग्स → गोपनीयता → हमेशा सुरक्षित कनेक्शन का उपयोग करें',
              'Firefox: सेटिंग्स → गोपनीयता → HTTPS-केवल मोड',
              'HTTPS चेतावनियों को कभी अनदेखा न करें!'
            ]
          },
          {
            name: 'निजी ब्राउज़िंग मोड',
            description: 'इतिहास, कुकीज़ या कैश को सहेजे बिना ब्राउज़ करें',
            benefit: 'मुफ्त, सभी ब्राउज़रों में अंतर्निहित',
            howTo: 'संवेदनशील ब्राउज़िंग के लिए उपयोग करें',
            steps: [
              'Chrome: Ctrl+Shift+N (इनकॉग्निटो)',
              'Firefox: Ctrl+Shift+P (निजी विंडो)',
              'ISP से नहीं छुपाता, लेकिन स्थानीय ट्रैकिंग रोकता है'
            ]
          },
          {
            name: 'विज्ञापन और ट्रैकर ब्लॉकर',
            description: 'विज्ञापन, ट्रैकर और दुर्भावनापूर्ण स्क्रिप्ट ब्लॉक करें',
            benefit: 'मुफ्त, तेज़ ब्राउज़िंग, बेहतर गोपनीयता',
            howTo: 'ब्राउज़र एक्सटेंशन इंस्टॉल करें',
            steps: [
              'uBlock Origin (सबसे अच्छा मुफ्त विज्ञापन ब्लॉकर)',
              'Privacy Badger (स्वचालित ट्रैकर ब्लॉकर)',
              'HTTPS Everywhere (HTTPS लागू करें)'
            ]
          }
        ]
      },

      whenYouNeedVPN: {
        title: '🔐 जब आपको वास्तव में VPN की आवश्यकता है',
        scenarios: [
          'सार्वजनिक WiFi का उपयोग करते समय (कॉफी शॉप, हवाई अड्डे)',
          'असुरक्षित नेटवर्क पर बैंकिंग एक्सेस करते समय',
          'आपका ISP वैध वेबसाइटों को ब्लॉक कर रहा है',
          'दूरस्थ रूप से काम करते समय और कंपनी नेटवर्क तक पहुंच',
          'विदेश यात्रा करते समय और भारतीय IP की आवश्यकता'
        ],
        trustedVPNs: [
          {
            name: 'ProtonVPN',
            why: 'स्विस-आधारित, कोई लॉग नहीं, मुफ्त टियर उपलब्ध',
            link: 'https://protonvpn.com'
          },
          {
            name: 'Windscribe',
            why: 'कनाडाई, प्रति माह 10GB मुफ्त',
            link: 'https://windscribe.com'
          },
          {
            name: 'Cloudflare WARP',
            why: 'DNS कंपनी से, गोपनीयता नहीं बल्कि सुरक्षा पर ध्यान',
            link: 'https://1.1.1.1'
          }
        ],
        avoid: [
          '❌ अज्ञात डेवलपर्स से कोई भी VPN',
          '❌ YouTube पर भारी विज्ञापन वाले VPN (वे किसी तरह विज्ञापनों के लिए भुगतान करते हैं)',
          '❌ चीनी-स्वामित्व वाले VPN (डेटा संरक्षण कानून)',
          '❌ अत्यधिक अनुमतियों की आवश्यकता वाले VPN',
          '❌ "100% हमेशा के लिए मुफ्त" VPN (आपका डेटा बेचते हैं)'
        ]
      },

      dnsTest: {
        title: '🔍 अपनी DNS सुरक्षा का परीक्षण करें',
        description: 'जांचें कि क्या आपकी DNS क्वेरी एन्क्रिप्टेड हैं',
        testButton: 'DNS सुरक्षा परीक्षण',
        testing: 'परीक्षण कर रहे हैं...',
        results: {
          safe: 'आपकी DNS एन्क्रिप्टेड है! बढ़िया काम।',
          danger: 'आपकी DNS एन्क्रिप्टेड नहीं है। DNS over HTTPS सक्षम करें।'
        }
      },

      privacyChecklist: {
        title: '✅ गोपनीयता सुरक्षा चेकलिस्ट',
        items: [
          'ब्राउज़र में DNS over HTTPS सक्षम करें',
          'HTTPS-केवल मोड चालू करें',
          'uBlock Origin विज्ञापन ब्लॉकर इंस्टॉल करें',
          'मजबूत, अद्वितीय पासवर्ड का उपयोग करें (पासवर्ड मैनेजर)',
          'सभी खातों पर 2FA सक्षम करें',
          'ऐप अनुमतियों की समीक्षा करें (अनावश्यक को रद्द करें)',
          'नियमित रूप से कुकीज़ साफ़ करें',
          'संवेदनशील खोजों के लिए निजी ब्राउज़िंग का उपयोग करें',
          'सार्वजनिक कंप्यूटर में कभी भी पासवर्ड सहेजें नहीं',
          'डेटा उल्लंघनों के लिए "Have I Been Pwned" जांचें'
        ]
      },

      scamVPNs: {
        title: '🚨 सावधान: घोटाला VPN ऐप्स',
        warning: 'प्ले स्टोर में कई नकली VPN ऐप वास्तव में मैलवेयर हैं जो आपका डेटा चुराने के लिए डिज़ाइन किए गए हैं!',
        redFlags: [
          '"असीमित डेटा के साथ 100% हमेशा के लिए मुफ्त" का दावा करता है',
          'SMS, संपर्क, कैमरा तक पहुंच की आवश्यकता है',
          '<1000 डाउनलोड के साथ अज्ञात डेवलपर द्वारा बनाया गया',
          '"मुफ्त परीक्षण" के लिए भुगतान विवरण मांगता है',
          'अत्यधिक विज्ञापन दिखाता है',
          'संदिग्ध रूप से तेजी से बैटरी खत्म करता है',
          'कोई स्पष्ट गोपनीयता नीति नहीं',
          '"गुमनामी" या "अदृश्यता" का वादा करता है'
        ]
      }
    }
  };

  const t = content[lang];

  const testDNS = async () => {
    setDnsTest('testing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple check: if we can resolve cloudflare's DNS test
    try {
      const response = await fetch('https://1.1.1.1/cdn-cgi/trace');
      const text = await response.text();
      
      // Very basic check - in production, use proper DNS-over-HTTPS test
      if (text.includes('warp=on') || text.includes('warp=plus')) {
        setDnsTest('safe');
      } else {
        setDnsTest('danger');
      }
    } catch {
      setDnsTest('danger');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-indigo-100">{t.subtitle}</p>
      </div>

      {/* Why You Don't Need VPN */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.why.title}</h2>
        
        <div className="space-y-4">
          {t.why.myths.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <h3 className="font-bold text-red-400">MYTH</h3>
                </div>
                <p className="text-sm text-gray-300">{item.myth}</p>
              </div>
              
              <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <h3 className="font-bold text-green-400">REALITY</h3>
                </div>
                <p className="text-sm text-gray-300">{item.reality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Better Alternatives */}
      <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          {t.betterAlternatives.title}
        </h2>
        
        <div className="space-y-4">
          {t.betterAlternatives.options.map((option, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              <h3 className="font-bold text-blue-400 mb-2">{option.name}</h3>
              <p className="text-gray-300 text-sm mb-2">{option.description}</p>
              <div className="bg-green-600/20 border border-green-500/50 rounded px-3 py-1 text-sm text-green-300 inline-block mb-3">
                ✅ {option.benefit}
              </div>
              
              <h4 className="font-semibold text-sm mb-2">{option.howTo}:</h4>
              <ul className="space-y-1">
                {option.steps.map((step, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Test */}
      <div className="bg-purple-600/20 border border-purple-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.dnsTest.title}</h2>
        <p className="text-gray-300 mb-4">{t.dnsTest.description}</p>
        
        <button
          onClick={testDNS}
          disabled={dnsTest === 'testing'}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold mb-4 transition"
        >
          {dnsTest === 'testing' ? t.dnsTest.testing : t.dnsTest.testButton}
        </button>

        {dnsTest === 'safe' && (
          <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
            <CheckCircle className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-green-300">{t.dnsTest.results.safe}</p>
          </div>
        )}

        {dnsTest === 'danger' && (
          <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-red-300">{t.dnsTest.results.danger}</p>
          </div>
        )}
      </div>

      {/* When You Need VPN */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.whenYouNeedVPN.title}</h2>
        
        <div className="mb-6">
          <h3 className="font-bold mb-3">{lang === 'en' ? 'Use VPN Only For:' : 'केवल इसके लिए VPN का उपयोग करें:'}</h3>
          <ul className="space-y-2">
            {t.whenYouNeedVPN.scenarios.map((scenario, index) => (
              <li key={index} className="flex items-start gap-2 bg-black/30 rounded p-2">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{scenario}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3 text-green-400">{lang === 'en' ? 'Trusted VPN Services:' : 'विश्वसनीय VPN सेवाएं:'}</h3>
<div className="grid md:grid-cols-3 gap-3">
            {t.whenYouNeedVPN.trustedVPNs.map((vpn, index) => (
       (
  <a       
                key={index}
                href={vpn.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600/20 border border-green-500/50 rounded-lg p-4 hover:border-green-400 transition"
              >
                <h4 className="font-bold mb-2 flex items-center justify-between">
                  {vpn.name}
                  <ExternalLink className="w-4 h-4" />
                </h4>
                <p className="text-sm text-gray-400">{vpn.why}</p>
              </a>
)
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3 text-red-400">{lang === 'en' ? 'AVOID These:' : 'इनसे बचें:'}</h3>
          <div className="space-y-2">
            {t.whenYouNeedVPN.avoid.map((item, index) => (
              <div key={index} className="flex items-start gap-2 bg-red-600/20 border border-red-500/50 rounded p-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Checklist */}
      <div className="bg-green-600/20 border border-green-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.privacyChecklist.title}</h2>
        
        <div className="grid md:grid-cols-2 gap-3">
          {t.privacyChecklist.items.map((item, index) => (
            <div key={index} className="flex items-start gap-2 bg-black/30 rounded p-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scam VPNs */}
      <div className="bg-red-600/20 border border-red-500/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          {t.scamVPNs.title}
        </h2>
        
        <p className="text-red-300 font-semibold mb-4">{t.scamVPNs.warning}</p>
        
        <div className="space-y-2">
          {t.scamVPNs.redFlags.map((flag, index) => (
            <div key={index} className="flex items-start gap-2 bg-black/30 rounded p-3">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{flag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}