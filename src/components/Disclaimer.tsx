'use client';

interface Props {
  lang: 'en' | 'hi';
}

export default function Disclaimer({ lang }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-yellow-600/20 backdrop-blur rounded-2xl border border-yellow-500/50 p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          {lang === 'en' ? '⚠️ Important Disclaimer' : '⚠️ महत्वपूर्ण अस्वीकरण'}
        </h2>
        
        <div className="space-y-4 text-gray-200">
          <p className="font-bold">
            {lang === 'en' 
              ? 'QuantumGuard is an EDUCATIONAL TOOL, not a replacement for professional security software.'
              : 'QuantumGuard एक शैक्षिक उपकरण है, पेशेवर सुरक्षा सॉफ़्टवेयर का प्रतिस्थापन नहीं।'}
          </p>

          <div className="space-y-2">
            <p className="font-semibold text-yellow-300">
              {lang === 'en' ? 'WHAT WE DO:' : 'हम क्या करते हैं:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{lang === 'en' ? 'Provide basic pattern-based scam detection' : 'बुनियादी पैटर्न आधारित स्कैम पहचान'}</li>
              <li>{lang === 'en' ? 'Educate users about common cyber threats in India' : 'भारत में साइबर खतरों के बारे में शिक्षा'}</li>
              <li>{lang === 'en' ? 'Guide users to official resources like 1930 helpline' : '1930 हेल्पलाइन जैसे आधिकारिक संसाधनों का मार्गदर्शन'}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-red-400">
              {lang === 'en' ? 'WHAT WE DO NOT DO:' : 'हम क्या नहीं करते:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{lang === 'en' ? 'Guarantee 100% accuracy in threat detection' : '100% सटीकता की गारंटी नहीं'}</li>
              <li>{lang === 'en' ? 'Replace professional antivirus or security software' : 'पेशेवर एंटीवायरस का स्थान नहीं'}</li>
              <li>{lang === 'en' ? 'Provide real-time malware analysis or deep file scanning' : 'वास्तविक समय मैलवेयर विश्लेषण नहीं'}</li>
              <li>{lang === 'en' ? 'Store or track your data' : 'आपका डेटा स्टोर या ट्रैक नहीं करते'}</li>
            </ul>
          </div>

          <div className="bg-red-600/20 rounded-xl p-4 border border-red-500/50">
            <p className="font-bold text-red-300">
              {lang === 'en' 
                ? '⚠️ ALWAYS VERIFY: If you receive a suspicious message, call, or link, always verify through official channels. Never rely solely on any automated tool.'
                : '⚠️ हमेशा सत्यापित करें: संदिग्ध संदेश, कॉल या लिंक के लिए हमेशा आधिकारिक चैनलों से सत्यापित करें। किसी भी स्वचालित उपकरण पर पूरी तरह निर्भर न रहें।'}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">
              {lang === 'en' ? 'LIMITATIONS:' : 'सीमाएं:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>{lang === 'en' ? 'Detection is pattern-based and may miss new or sophisticated scams' : 'पैटर्न आधारित पहचान नई या जटिल स्कैम को छोड़ सकती है'}</li>
              <li>{lang === 'en' ? 'File scanning is basic and cannot detect all malware types' : 'फ़ाइल स्कैनिंग बुनियादी है और सभी मैलवेयर प्रकारों का पता नहीं लगा सकती'}</li>
              <li>{lang === 'en' ? 'Steganography detection checks for known signatures only' : 'स्टेगनोग्राफी पहचान केवल ज्ञात हस्ताक्षरों की जांच करती है'}</li>
              <li>{lang === 'en' ? 'No real-time threat intelligence integration yet' : 'अभी तक कोई वास्तविक समय खतरा खुफिया एकीकरण नहीं'}</li>
            </ul>
          </div>

          <div className="bg-cyan-600/20 rounded-xl p-4 border border-cyan-500/50 mt-4">
            <p className="font-bold text-cyan-300">
              {lang === 'en' 
                ? '📞 IF YOU ARE SCAMMED: Call 1930 immediately or report at cybercrime.gov.in'
                : '📞 यदि आप धोखा खाते हैं: तुरंत 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट करें'}
            </p>
          </div>

          <p className="text-sm text-gray-400 italic mt-4">
            {lang === 'en' 
              ? 'By using QuantumGuard, you acknowledge that this is a learning and awareness tool. Always exercise caution and verify independently.'
              : 'QuantumGuard का उपयोग करके, आप स्वीकार करते हैं कि यह एक सीखने और जागरूकता उपकरण है। हमेशा सावधानी बरतें और स्वतंत्र रूप से सत्यापित करें।'}
          </p>
        </div>
      </div>
    </div>
  );
}