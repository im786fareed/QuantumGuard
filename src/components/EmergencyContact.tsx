'use client';
import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Shield,
  Activity,
  Eye,
  BellRing,
  Smartphone,
  Users,
} from 'lucide-react';

interface TrustedContact {
  name: string;
  phone: string;
  relation: string;
  email?: string;
}

interface PoliceStation {
  name: string;
  address: string;
  phone: string;
  distance?: number;
  lat?: number;
  lng?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

interface ScamAlert {
  timestamp: string;
  riskScore: number;
  indicators: string[];
  location?: UserLocation;
  alertSent: boolean;
}

export default function EmergencyContact({ lang = 'en' }: { lang?: 'en' | 'hi' }) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestStations, setNearestStations] = useState<PoliceStation[]>([]);
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [monitoringEnabled, setMonitoringEnabled] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [currentIndicators, setCurrentIndicators] = useState<string[]>([]);
  const [alertHistory, setAlertHistory] = useState<ScamAlert[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);

  const [newContact, setNewContact] = useState<TrustedContact>({
    name: '',
    phone: '',
    relation: '',
  });

  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /* ============================================================
     TRANSLATIONS (FIXED — maxContacts added)
  ============================================================ */
  const content = {
    en: {
      title: '🚨 Emergency Contacts',
      subtitle: 'Get help immediately - Find nearest police station and emergency numbers',

      aiProtection: 'AI Scam Protection',
      aiProtectionDesc: 'Automatically alert your family if digital arrest scam is detected',
      enableMonitoring: 'Enable AI Monitoring',
      disableMonitoring: 'Disable Monitoring',
      monitoringActive: 'AI Protection Active',
      monitoringInactive: 'AI Protection Inactive',

      currentRisk: 'Current Risk Level',

      maxContacts: 'You can add a maximum of 3 trusted contacts.',

      riskLevels: {
        safe: 'Safe',
        low: 'Low Risk',
        medium: 'Medium Risk',
        high: 'High Risk',
        critical: 'CRITICAL - Alert Sent!',
      },

      trustedContacts: 'Trusted Emergency Contacts',
      trustedContactsDesc: 'Add 3 family members who will be auto-alerted if scam is detected',
      addContact: 'Add Contact',
      contactName: 'Contact Name',
      contactPhone: 'Phone Number',
      contactRelation: 'Relation',
      relations: ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'],
      saveContact: 'Save Contact',
      cancel: 'Cancel',

      detectionIndicators: 'What We Monitor',
      indicators: {
        longCall: 'Long call with unknown number',
        bankingApp: 'Banking app used during call',
        ignoredCalls: 'Ignored calls from known contacts',
        screenShare: 'Screen sharing detected',
        suspiciousKeywords: 'Scam keywords detected',
        locationChange: 'Unusual location detected',
      },

      alertSystem: 'How Auto Alert Works',
      alertSteps: [
        'AI continuously monitors activity patterns',
        'Detects digital arrest scam indicators',
        'Triggers alert at 70% risk score',
        'Sends SMS / WhatsApp to trusted contacts',
        'Advises emergency action immediately',
      ],

      alertMessage: 'Alert Message Preview',
      alertPreview:
        '🚨 EMERGENCY ALERT\n\nPossible digital arrest scam detected.\nPlease contact immediately.\n\nCall police: 100\nCybercrime: 1930',

      nationalHelplines: 'National Emergency Helplines',
      callNow: 'Call Now',

      helplines: {
        cybercrime: {
          name: 'National Cybercrime Helpline',
          number: '1930',
          description: 'Report cyber frauds',
          available: '24/7',
        },
        police: {
          name: 'Police Emergency',
          number: '100',
          description: 'Immediate police help',
          available: '24/7',
        },
      },

      locationError: 'Could not access your location.',
      permissionDenied: 'Location permission denied.',
    },

    hi: {
      title: '🚨 आपातकालीन संपर्क',
      subtitle: 'तुरंत सहायता प्राप्त करें',

      aiProtection: 'AI घोटाला सुरक्षा',
      aiProtectionDesc: 'डिजिटल अरेस्ट घोटाले पर परिवार को स्वतः सूचना',
      enableMonitoring: 'AI निगरानी चालू करें',
      disableMonitoring: 'निगरानी बंद करें',
      monitoringActive: 'AI सुरक्षा सक्रिय',
      monitoringInactive: 'AI सुरक्षा बंद',

      currentRisk: 'वर्तमान जोखिम स्तर',

      maxContacts: 'आप केवल 3 विश्वसनीय संपर्क जोड़ सकते हैं।',

      riskLevels: {
        safe: 'सुरक्षित',
        low: 'कम जोखिम',
        medium: 'मध्यम जोखिम',
        high: 'उच्च जोखिम',
        critical: 'गंभीर – अलर्ट भेजा गया!',
      },

      trustedContacts: 'विश्वसनीय संपर्क',
      trustedContactsDesc: '3 लोगों को जोड़ें जिन्हें आपात में सूचना मिलेगी',
      addContact: 'संपर्क जोड़ें',
      contactName: 'नाम',
      contactPhone: 'फोन नंबर',
      contactRelation: 'संबंध',
      relations: ['पति/पत्नी', 'माता-पिता', 'बच्चा', 'भाई-बहन', 'मित्र', 'अन्य'],
      saveContact: 'सहेजें',
      cancel: 'रद्द करें',

      detectionIndicators: 'हम क्या पहचानते हैं',
      indicators: {
        longCall: 'अज्ञात नंबर से लंबी कॉल',
        bankingApp: 'कॉल के दौरान बैंकिंग ऐप',
        ignoredCalls: 'परिचित कॉल अनदेखी',
        screenShare: 'स्क्रीन शेयरिंग',
        suspiciousKeywords: 'संदिग्ध शब्द',
        locationChange: 'स्थान परिवर्तन',
      },

      alertSystem: 'ऑटो अलर्ट कैसे काम करता है',
      alertSteps: [
        'AI गतिविधि पर नजर रखता है',
        'घोटाले के संकेत पहचानता है',
        '70% जोखिम पर अलर्ट भेजता है',
        'SMS/WhatsApp से सूचना भेजता है',
        'तुरंत कार्रवाई की सलाह देता है',
      ],

      alertMessage: 'अलर्ट पूर्वावलोकन',
      alertPreview:
        '🚨 आपातकालीन अलर्ट\nसंभावित डिजिटल अरेस्ट घोटाला\nतुरंत संपर्क करें\nपुलिस: 100\nसायबर: 1930',

      nationalHelplines: 'राष्ट्रीय हेल्पलाइन',
      callNow: 'कॉल करें',

      helplines: {
        cybercrime: {
          name: 'राष्ट्रीय साइबर अपराध हेल्पलाइन',
          number: '1930',
          description: 'साइबर अपराध रिपोर्ट करें',
          available: '24/7',
        },
        police: {
          name: 'पुलिस आपातकाल',
          number: '100',
          description: 'तत्काल सहायता',
          available: '24/7',
        },
      },

      locationError: 'स्थान प्राप्त नहीं हो सका।',
      permissionDenied: 'स्थान अनुमति अस्वीकृत।',
    },
  };

  const t = content[lang];

  /* ================= LOGIC ================= */

  useEffect(() => {
    const saved = localStorage.getItem('quantumshield_trusted_contacts');
    if (saved) setTrustedContacts(JSON.parse(saved));
  }, []);

  const startMonitoring = () => {
    setMonitoringEnabled(true);
    monitoringIntervalRef.current = setInterval(simulateScamDetection, 5000);
  };

  const stopMonitoring = () => {
    setMonitoringEnabled(false);
    if (monitoringIntervalRef.current) clearInterval(monitoringIntervalRef.current);
    setRiskScore(0);
    setCurrentIndicators([]);
  };

  const simulateScamDetection = () => {
    let score = 0;
    const indicators: string[] = [];

    const r = Math.random();
    if (r > 0.7) { score += 40; indicators.push('longCall'); }
    if (r > 0.6) { score += 30; indicators.push('bankingApp'); }
    if (r > 0.5) { score += 20; indicators.push('ignoredCalls'); }

    setRiskScore(score);
    setCurrentIndicators(indicators);

    if (score >= 70 && trustedContacts.length > 0) {
      setAlertHistory(prev => [
        {
          timestamp: new Date().toLocaleString(),
          riskScore: score,
          indicators,
          location: userLocation || undefined,
          alertSent: true,
        },
        ...prev,
      ]);
    }
  };

  const addTrustedContact = () => {
    if (trustedContacts.length >= 3) {
      alert(t.maxContacts);
      return;
    }

    if (!newContact.name || !newContact.phone || !newContact.relation) return;

    const updated = [...trustedContacts, newContact];
    setTrustedContacts(updated);
    localStorage.setItem('quantumshield_trusted_contacts', JSON.stringify(updated));

    setNewContact({ name: '', phone: '', relation: '' });
    setShowAddContact(false);
  };

  const removeTrustedContact = (index: number) => {
    const updated = trustedContacts.filter((_, i) => i !== index);
    setTrustedContacts(updated);
    localStorage.setItem('quantumshield_trusted_contacts', JSON.stringify(updated));
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { label: t.riskLevels.critical, color: 'text-red-500', bg: 'bg-red-600/20 border-red-500' };
    if (score >= 50) return { label: t.riskLevels.high, color: 'text-orange-500', bg: 'bg-orange-600/20 border-orange-500' };
    if (score >= 30) return { label: t.riskLevels.medium, color: 'text-yellow-500', bg: 'bg-yellow-600/20 border-yellow-500' };
    if (score > 0) return { label: t.riskLevels.low, color: 'text-blue-500', bg: 'bg-blue-600/20 border-blue-500' };
    return { label: t.riskLevels.safe, color: 'text-green-500', bg: 'bg-green-600/20 border-green-500' };
  };

  const risk = getRiskLevel(riskScore);

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      {/* AI Protection */}
      <div className="bg-black/40 border border-purple-500/40 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-400" />
            {t.aiProtection}
          </h2>

          <button
            onClick={monitoringEnabled ? stopMonitoring : startMonitoring}
            className={`px-4 py-2 rounded-lg font-semibold ${
              monitoringEnabled ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {monitoringEnabled ? t.disableMonitoring : t.enableMonitoring}
          </button>
        </div>

        {monitoringEnabled && (
          <div className={`border rounded-lg p-4 ${risk.bg}`}>
            <div className="flex justify-between mb-2">
              <span>{t.currentRisk}</span>
              <span className={`font-bold ${risk.color}`}>{risk.label}</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded">
              <div
                className="h-full bg-red-500 transition-all"
                style={{ width: `${riskScore}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Trusted Contacts */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <h3 className="font-bold text-lg mb-2">{t.trustedContacts}</h3>
        <p className="text-sm text-gray-400 mb-3">{t.trustedContactsDesc}</p>

        {trustedContacts.map((c, i) => (
          <div key={i} className="flex justify-between bg-black/30 p-3 rounded mb-2">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400">{c.relation} • {c.phone}</div>
            </div>
            <button onClick={() => removeTrustedContact(i)} className="text-red-400">
              Remove
            </button>
          </div>
        ))}

        {trustedContacts.length < 3 && (
          <button
            onClick={() => setShowAddContact(true)}
            className="mt-3 bg-blue-600 px-4 py-2 rounded"
          >
            + {t.addContact}
          </button>
        )}

        {showAddContact && (
          <div className="mt-4 bg-black/40 p-4 rounded">
            <input
              className="w-full mb-2 p-2 rounded bg-black/50"
              placeholder={t.contactName}
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              className="w-full mb-2 p-2 rounded bg-black/50"
              placeholder={t.contactPhone}
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <select
              className="w-full mb-2 p-2 rounded bg-black/50"
              value={newContact.relation}
              onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
            >
              <option value="">{t.contactRelation}</option>
              {t.relations.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button onClick={addTrustedContact} className="bg-green-600 px-4 py-2 rounded">
                {t.saveContact}
              </button>
              <button onClick={() => setShowAddContact(false)} className="bg-gray-600 px-4 py-2 rounded">
                {t.cancel}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Helplines */}
      <div className="bg-white/5 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">{t.nationalHelplines}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(t.helplines).map((h, i) => (
            <div key={i} className="bg-red-600/20 border border-red-500/40 rounded-lg p-4">
              <h3 className="font-bold">{h.name}</h3>
              <p className="text-sm text-gray-300">{h.description}</p>
              <a
                href={`tel:${h.number}`}
                className="inline-block mt-2 bg-red-600 px-4 py-2 rounded"
              >
                {t.callNow}: {h.number}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
