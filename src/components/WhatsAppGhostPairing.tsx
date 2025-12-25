'use client';
import { useState } from 'react';
import { MessageCircle, Smartphone, AlertTriangle, Shield, CheckCircle, XCircle, Phone, ExternalLink, Link2 } from 'lucide-react';

export default function WhatsAppGhostPairing({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [showChecklist, setShowChecklist] = useState(false);

  const content = {
    en: {
      title: '👻 WhatsApp Ghost Pairing Scam',
      subtitle: 'Protect yourself from unauthorized WhatsApp device linking',
      
      whatIsIt: {
        title: '⚠️ What is Ghost Pairing?',
        description: 'Scammers trick you into scanning a QR code that links YOUR WhatsApp account to THEIR device. They can then read all your messages, contacts, and impersonate you to scam your friends and family.',
        realCase: '🚨 Real Case (Hyderabad): A businessman lost ₹50 lakhs after scammers accessed his WhatsApp and sent loan requests to his contacts pretending to be him.'
      },

      howItWorks: {
        title: '🎯 How Scammers Execute This Attack',
        steps: [
          {
            step: 'Scammer calls pretending to be from courier/bank/government',
            details: 'Claims there\'s an urgent parcel, KYC update, or legal notice'
          },
          {
            step: 'Sends "verification link" via SMS/WhatsApp',
            details: 'Link opens WhatsApp Web QR code or asks to scan QR image'
          },
          {
            step: 'You scan the QR code thinking it\'s verification',
            details: 'Actually, you just linked your WhatsApp to their device!'
          },
          {
            step: 'Scammer gets instant access to your WhatsApp',
            details: 'Can read all messages, see contacts, send messages as YOU'
          },
          {
            step: 'Scammer messages your contacts asking for money',
            details: '"Emergency, need ₹50,000 urgently" - appears to come from YOU'
          },
          {
            step: 'Your friends/family send money thinking it\'s you',
            details: 'By the time you realize, damage is done'
          }
        ]
      },

      redFlags: {
        title: '🚩 Red Flags - Scam Indicators',
        flags: [
          'Someone asks you to scan a QR code to "verify" anything',
          'Receive link saying "Scan to verify your identity"',
          'Call about courier/parcel you didn\'t order',
          'Urgent message asking to "link device for security"',
          'Email/SMS with QR code to "update KYC"',
          'Job offer requiring WhatsApp QR scan for "registration"',
          'Prize/lottery win requiring QR scan to "claim"',
          'Bank notice with QR code to "prevent account block"'
        ]
      },

      checkNow: {
        title: '✅ Check If Your WhatsApp is Linked',
        instruction: 'Open WhatsApp and check for unauthorized devices',
        steps: [
          {
            platform: 'Android/iPhone',
            steps: [
              'Open WhatsApp',
              'Tap three dots (⋮) → Linked Devices',
              'Check if any unknown devices are listed',
              'If you see devices you don\'t recognize → TAP and LOG OUT IMMEDIATELY'
            ]
          }
        ],
        checkButton: 'Open WhatsApp to Check',
        whatsappUrl: 'whatsapp://settings'
      },

      protection: {
        title: '🛡️ How to Protect Yourself',
        steps: [
          'NEVER scan QR codes sent by strangers (SMS/WhatsApp/Email)',
          'WhatsApp QR codes are ONLY for linking YOUR OWN devices',
          'Enable two-step verification: Settings → Account → Two-step verification',
          'Check linked devices weekly: Settings → Linked Devices',
          'Log out all unknown devices immediately',
          'Don\'t click suspicious links even if they appear urgent',
          'WhatsApp will NEVER ask you to scan QR for "verification"',
          'Banks/Government NEVER use WhatsApp QR for KYC'
        ]
      },

      twoStepVerification: {
        title: '🔐 Enable Two-Step Verification NOW',
        description: 'This adds a PIN that scammers WON\'T have even if they scan your QR code',
        steps: [
          'Open WhatsApp → Settings (⋮)',
          'Account → Two-step verification',
          'Tap "Turn On"',
          'Create a 6-digit PIN (Don\'t use 123456!)',
          'Add your email (for PIN recovery)',
          'Confirm PIN',
          'Done! Now linking requires PIN + QR code'
        ],
        warning: '⚠️ Without this, anyone with QR access can link your WhatsApp!'
      },

      commonScenarios: {
        title: '🎭 Common Scam Scenarios',
        scenarios: [
          {
            title: 'Fake Courier Scam',
            script: '"Your parcel is stuck at customs. Scan this QR to verify identity and release it."',
            reality: 'No courier company uses WhatsApp QR for verification!'
          },
          {
            title: 'Fake KYC Update',
            script: '"Your bank KYC is expiring. Scan QR code immediately to prevent account block."',
            reality: 'Banks NEVER use WhatsApp QR for KYC!'
          },
          {
            title: 'Fake Job Offer',
            script: '"Congratulations! You\'re selected. Scan QR to register for online interview."',
            reality: 'Legitimate companies don\'t use WhatsApp QR for recruitment!'
          },
          {
            title: 'Fake Prize/Lottery',
            script: '"You won ₹10 lakhs! Scan QR to claim your prize within 24 hours."',
            reality: 'Lottery companies don\'t use WhatsApp QR for verification!'
          }
        ]
      },

      ifScammed: {
        title: '🚨 If You Already Scanned the QR Code',
        immediateActions: [
          'IMMEDIATELY: Settings → Linked Devices → Log out ALL devices',
          'Enable two-step verification RIGHT NOW',
          'Broadcast message to ALL your contacts: "My WhatsApp was hacked. Ignore any money requests from me. I\'ll call directly if needed."',
          'Check if any messages were sent from your account',
          'Report to WhatsApp: Settings → Help → Contact Us',
          'File police complaint (cybercrime helpline: 1930)',
          'Change your phone PIN/password',
          'Inform your bank if financial info was shared',
          'Warn others in your contact list about the scam'
        ]
      },

      mythBusters: {
        title: '❌ Myths vs ✅ Facts',
        myths: [
          {
            myth: 'QR codes are always safe to scan',
            fact: 'WhatsApp QR codes can link your account to scammer\'s device'
          },
          {
            myth: 'I can scan QR if the call sounds official',
            fact: 'Scammers are trained to sound legitimate. NEVER scan QR codes from calls/SMS'
          },
          {
            myth: 'WhatsApp will alert me if someone links my account',
            fact: 'You get notification but many people ignore it or don\'t understand it'
          },
          {
            myth: 'Two-step verification is optional',
            fact: 'It\'s ESSENTIAL! Without it, QR scan = instant access to your WhatsApp'
          }
        ]
      }
    },
    hi: {
      title: '👻 व्हाट्सएप घोस्ट पेयरिंग घोटाला',
      subtitle: 'अनधिकृत व्हाट्सएप डिवाइस लिंकिंग से खुद को बचाएं',
      
      whatIsIt: {
        title: '⚠️ घोस्ट पेयरिंग क्या है?',
        description: 'घोटालेबाज आपको एक QR कोड स्कैन करने के लिए धोखा देते हैं जो आपके व्हाट्सएप खाते को उनके डिवाइस से लिंक करता है। फिर वे आपके सभी संदेश, संपर्क पढ़ सकते हैं और आपके दोस्तों और परिवार को धोखा देने के लिए आपकी नकल कर सकते हैं।',
        realCase: '🚨 वास्तविक मामला (हैदराबाद): एक व्यवसायी ने ₹50 लाख खो दिए जब घोटालेबाजों ने उनके व्हाट्सएप तक पहुंच बनाई और उनके संपर्कों को ऋण अनुरोध भेजे, उनके होने का दिखावा करते हुए।'
      },

      howItWorks: {
        title: '🎯 घोटालेबाज इस हमले को कैसे अंजाम देते हैं',
        steps: [
          {
            step: 'घोटालेबाज कूरियर/बैंक/सरकार से होने का दिखावा करते हुए कॉल करता है',
            details: 'दावा करता है कि एक जरूरी पार्सल, KYC अपडेट, या कानूनी नोटिस है'
          },
          {
            step: 'SMS/व्हाट्सएप के माध्यम से "सत्यापन लिंक" भेजता है',
            details: 'लिंक व्हाट्सएप वेब QR कोड खोलता है या QR छवि स्कैन करने के लिए कहता है'
          },
          {
            step: 'आप QR कोड स्कैन करते हैं यह सोचकर कि यह सत्यापन है',
            details: 'वास्तव में, आपने अभी-अभी अपने व्हाट्सएप को उनके डिवाइस से लिंक कर दिया!'
          },
          {
            step: 'घोटालेबाज को आपके व्हाट्सएप तक तत्काल पहुंच मिल जाती है',
            details: 'सभी संदेश पढ़ सकते हैं, संपर्क देख सकते हैं, आपके रूप में संदेश भेज सकते हैं'
          },
          {
            step: 'घोटालेबाज आपके संपर्कों को पैसे मांगते हुए संदेश भेजता है',
            details: '"आपातकाल, तुरंत ₹50,000 चाहिए" - आपसे आता हुआ प्रतीत होता है'
          },
          {
            step: 'आपके दोस्त/परिवार पैसे भेजते हैं यह सोचकर कि यह आप हैं',
            details: 'जब तक आपको एहसास होता है, नुकसान हो चुका होता है'
          }
        ]
      },

      redFlags: {
        title: '🚩 लाल झंडे - घोटाला संकेतक',
        flags: [
          'कोई आपसे कुछ भी "सत्यापित" करने के लिए QR कोड स्कैन करने के लिए कहता है',
          'लिंक प्राप्त होता है जो कहता है "अपनी पहचान सत्यापित करने के लिए स्कैन करें"',
          'कूरियर/पार्सल के बारे में कॉल जो आपने ऑर्डर नहीं किया',
          '"सुरक्षा के लिए डिवाइस लिंक करें" कहने वाला जरूरी संदेश',
          '"KYC अपडेट करें" के साथ QR कोड वाला ईमेल/SMS',
          '"पंजीकरण" के लिए व्हाट्सएप QR स्कैन की आवश्यकता वाली नौकरी की पेशकश',
          '"दावा करने" के लिए QR स्कैन की आवश्यकता वाली पुरस्कार/लॉटरी जीत',
          '"खाता ब्लॉक रोकने" के लिए QR कोड वाला बैंक नोटिस'
        ]
      },

      checkNow: {
        title: '✅ जांचें कि क्या आपका व्हाट्सएप लिंक है',
        instruction: 'व्हाट्सएप खोलें और अनधिकृत उपकरणों की जांच करें',
        steps: [
          {
            platform: 'Android/iPhone',
            steps: [
              'व्हाट्सएप खोलें',
              'तीन बिंदु (⋮) टैप करें → लिंक किए गए डिवाइस',
              'जांचें कि क्या कोई अज्ञात डिवाइस सूचीबद्ध हैं',
              'यदि आप ऐसे डिवाइस देखते हैं जिन्हें आप नहीं पहचानते → तुरंत टैप करें और लॉग आउट करें'
            ]
          }
        ],
        checkButton: 'जांच करने के लिए व्हाट्सएप खोलें',
        whatsappUrl: 'whatsapp://settings'
      },

      protection: {
        title: '🛡️ खुद को कैसे बचाएं',
        steps: [
          'अजनबियों द्वारा भेजे गए QR कोड कभी भी स्कैन न करें (SMS/व्हाट्सएप/ईमेल)',
          'व्हाट्सएप QR कोड केवल आपके अपने उपकरणों को लिंक करने के लिए हैं',
          'दो-चरणीय सत्यापन सक्षम करें: सेटिंग्स → खाता → दो-चरणीय सत्यापन',
          'साप्ताहिक रूप से लिंक किए गए उपकरणों की जांच करें: सेटिंग्स → लिंक किए गए डिवाइस',
          'सभी अज्ञात उपकरणों को तुरंत लॉग आउट करें',
          'संदिग्ध लिंक पर क्लिक न करें भले ही वे जरूरी दिखाई दें',
          'व्हाट्सएप आपसे कभी भी "सत्यापन" के लिए QR स्कैन करने के लिए नहीं कहेगा',
          'बैंक/सरकार KYC के लिए कभी व्हाट्सएप QR का उपयोग नहीं करते'
        ]
      },

      twoStepVerification: {
        title: '🔐 अभी दो-चरणीय सत्यापन सक्षम करें',
        description: 'यह एक PIN जोड़ता है जो घोटालेबाजों के पास नहीं होगा भले ही वे आपका QR कोड स्कैन करें',
        steps: [
          'व्हाट्सएप खोलें → सेटिंग्स (⋮)',
          'खाता → दो-चरणीय सत्यापन',
          '"चालू करें" टैप करें',
          '6-अंकीय PIN बनाएं (123456 का उपयोग न करें!)',
          'अपना ईमेल जोड़ें (PIN पुनर्प्राप्ति के लिए)',
          'PIN की पुष्टि करें',
          'हो गया! अब लिंक करने के लिए PIN + QR कोड की आवश्यकता होती है'
        ],
        warning: '⚠️ इसके बिना, QR पहुंच वाला कोई भी व्यक्ति आपका व्हाट्सएप लिंक कर सकता है!'
      },

      commonScenarios: {
        title: '🎭 सामान्य घोटाला परिदृश्य',
        scenarios: [
          {
            title: 'नकली कूरियर घोटाला',
            script: '"आपका पार्सल सीमा शुल्क पर फंसा है। पहचान सत्यापित करने और इसे रिलीज करने के लिए इस QR को स्कैन करें।"',
            reality: 'कोई भी कूरियर कंपनी सत्यापन के लिए व्हाट्सएप QR का उपयोग नहीं करती!'
          },
          {
            title: 'नकली KYC अपडेट',
            script: '"आपका बैंक KYC समाप्त हो रहा है। खाता ब्लॉक रोकने के लिए तुरंत QR कोड स्कैन करें।"',
            reality: 'बैंक KYC के लिए कभी व्हाट्सएप QR का उपयोग नहीं करते!'
          },
          {
            title: 'नकली नौकरी की पेशकश',
            script: '"बधाई! आप चयनित हैं। ऑनलाइन साक्षात्कार के लिए पंजीकरण करने के लिए QR स्कैन करें।"',
            reality: 'वैध कंपनियां भर्ती के लिए व्हाट्सएप QR का उपयोग नहीं करतीं!'
          },
          {
            title: 'नकली पुरस्कार/लॉटरी',
            script: '"आपने ₹10 लाख जीते! 24 घंटे के भीतर अपना पुरस्कार दावा करने के लिए QR स्कैन करें।"',
            reality: 'लॉटरी कंपनियां सत्यापन के लिए व्हाट्सएप QR का उपयोग नहीं करतीं!'
          }
        ]
      },

      ifScammed: {
        title: '🚨 यदि आपने पहले से QR कोड स्कैन कर लिया है',
        immediateActions: [
          'तुरंत: सेटिंग्स → लिंक किए गए डिवाइस → सभी डिवाइस लॉग आउट करें',
          'अभी दो-चरणीय सत्यापन सक्षम करें',
          'अपने सभी संपर्कों को प्रसारण संदेश: "मेरा व्हाट्सएप हैक हो गया था। मुझसे किसी भी पैसे के अनुरोध को अनदेखा करें। यदि आवश्यक हो तो मैं सीधे कॉल करूंगा।"',
          'जांचें कि क्या आपके खाते से कोई संदेश भेजे गए',
          'व्हाट्सएप को रिपोर्ट करें: सेटिंग्स → सहायता → हमसे संपर्क करें',
          'पुलिस शिकायत दर्ज करें (साइबर अपराध हेल्पलाइन: 1930)',
          'अपना फोन PIN/पासवर्ड बदलें',
          'यदि वित्तीय जानकारी साझा की गई तो अपने बैंक को सूचित करें',
          'अपनी संपर्क सूची में दूसरों को घोटाले के बारे में चेतावनी दें'
        ]
      },

      mythBusters: {
        title: '❌ मिथक बनाम ✅ तथ्य',
        myths: [
          {
            myth: 'QR कोड स्कैन करने के लिए हमेशा सुरक्षित होते हैं',
            fact: 'व्हाट्सएप QR कोड आपके खाते को घोटालेबाज के डिवाइस से लिंक कर सकते हैं'
          },
          {
            myth: 'मैं QR स्कैन कर सकता हूं यदि कॉल आधिकारिक लगती है',
            fact: 'घोटालेबाज वैध लगने के लिए प्रशिक्षित होते हैं। कॉल/SMS से कभी भी QR कोड स्कैन न करें'
          },
          {
            myth: 'व्हाट्सएप मुझे अलर्ट करेगा यदि कोई मेरा खाता लिंक करता है',
            fact: 'आपको सूचना मिलती है लेकिन कई लोग इसे अनदेखा करते हैं या इसे नहीं समझते'
          },
          {
            myth: 'दो-चरणीय सत्यापन वैकल्पिक है',
            fact: 'यह आवश्यक है! इसके बिना, QR स्कैन = आपके व्हाट्सएप तक तत्काल पहुंच'
          }
        ]
      }
    }
  };

  const t = content[lang];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-green-100">{t.subtitle}</p>
      </div>

      {/* What is Ghost Pairing */}
      <div className="bg-red-600/20 border border-red-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          {t.whatIsIt.title}
        </h2>
        <p className="text-gray-300 mb-4">{t.whatIsIt.description}</p>
        
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-red-300 font-semibold">{t.whatIsIt.realCase}</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-orange-600/20 border border-orange-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.howItWorks.title}</h2>
        
        <div className="space-y-4">
          {t.howItWorks.steps.map((item, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold mb-1">{item.step}</h3>
                  <p className="text-sm text-gray-400">{item.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          {t.redFlags.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-3">
          {t.redFlags.flags.map((flag, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-3 flex items-start gap-2">
              <XCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">{flag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Check Now */}
      <div className="bg-blue-600/20 border border-blue-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-blue-400" />
          {t.checkNow.title}
        </h2>
        <p className="text-gray-300 mb-4">{t.checkNow.instruction}</p>
        
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h3 className="font-bold mb-3">{t.checkNow.steps[0].platform}</h3>
          <ol className="space-y-2">
            {t.checkNow.steps[0].steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">{index + 1}.</span>
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
(
  <a
      
href={t.checkNow.whatsappUrl}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition"
        >
          <MessageCircle className="w-5 h-5" />
          {t.checkNow.checkButton}
        </a>
)
      </div>

      {/* Two-Step Verification */}
      <div className="bg-green-600/20 border border-green-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-400" />
          {t.twoStepVerification.title}
        </h2>
        <p className="text-gray-300 mb-4">{t.twoStepVerification.description}</p>
        
        <ol className="space-y-3 mb-4">
          {t.twoStepVerification.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-300">{step}</span>
            </li>
          ))}
        </ol>

        <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-4">
          <p className="text-yellow-300 text-sm font-semibold">{t.twoStepVerification.warning}</p>
        </div>
      </div>

      {/* Protection Steps */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          {t.protection.title}
        </h2>
        
        <div className="space-y-2">
          {t.protection.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Scenarios */}
      <div className="bg-purple-600/20 border border-purple-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{t.commonScenarios.title}</h2>
        
        <div className="space-y-4">
          {t.commonScenarios.scenarios.map((scenario, index) => (
            <div key={index} className="bg-black/30 rounded-lg p-4">
              <h3 className="font-bold text-purple-400 mb-2">{scenario.title}</h3>
              <div className="bg-red-600/20 border-l-4 border-red-500 p-3 mb-2">
                <p className="text-sm text-gray-300 italic">"{scenario.script}"</p>
              </div>
              <div className="bg-green-600/20 border-l-4 border-green-500 p-3">
                <p className="text-sm text-green-300 font-semibold">✅ {scenario.reality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* If Scammed */}
      <div className="bg-red-600/20 border border-red-500/50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          {t.ifScammed.title}
        </h2>
        
        <ol className="space-y-3">
          {t.ifScammed.immediateActions.map((action, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-300">{action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Myths vs Facts */}
      <div className="bg-white/5 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">{t.mythBusters.title}</h2>
        
        <div className="space-y-4">
          {t.mythBusters.myths.map((item, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <h3 className="font-bold text-red-400">{lang === 'en' ? 'MYTH' : 'मिथक'}</h3>
                </div>
                <p className="text-sm text-gray-300">{item.myth}</p>
              </div>
              
              <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <h3 className="font-bold text-green-400">{lang === 'en' ? 'FACT' : 'तथ्य'}</h3>
                </div>
                <p className="text-sm text-gray-300">{item.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}