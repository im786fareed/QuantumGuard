import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'text') {
      const text = data.toLowerCase();
      const scamKeywords = ['congratulations', 'won', 'lottery', 'prize', 'claim', 'urgent', 'verify', 'account', 'suspend', 'block', 'click here', 'link', 'otp', 'bank', 'credit card', 'kyc', 'update', 'immediately', 'expire', 'reward'];
      let riskScore = 0;
      const foundKeywords: string[] = [];
      for (const keyword of scamKeywords) {
        if (text.includes(keyword)) {
          riskScore += 15;
          foundKeywords.push(keyword);
        }
      }
      const hasPhoneNumber = /\d{10}/.test(text);
      const hasLink = /http|www\.|bit\.ly|tinyurl/i.test(text);
      const hasUrgency = /urgent|immediately|now|asap/i.test(text);
      const hasMoney = /rupees|rs\.|crore|lakh|dollar/i.test(text);
      if (hasPhoneNumber) riskScore += 10;
      if (hasLink) riskScore += 20;
      if (hasUrgency) riskScore += 15;
      if (hasMoney) riskScore += 15;
      riskScore = Math.min(riskScore, 100);
      let verdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM' = 'SAFE';
      let message = '';
      if (riskScore >= 70) {
        verdict = 'SCAM';
        message = 'High probability scam detected! Do not respond or click any links.';
      } else if (riskScore >= 40) {
        verdict = 'SUSPICIOUS';
        message = 'Suspicious patterns detected. Verify sender before taking action.';
      } else {
        verdict = 'SAFE';
        message = 'No obvious scam patterns detected. Stay cautious.';
      }
      return NextResponse.json({
        verdict,
        riskScore,
        message,
        indicators: { hasPhoneNumber, hasLink, hasUrgency, hasMoney, foundKeywords },
        actions: riskScore >= 70 ? ['Do NOT click any links', 'Do NOT share OTP or passwords', 'Block this number', 'Report to cybercrime'] : riskScore >= 40 ? ['Verify sender identity', 'Do not share sensitive info', 'Check official channels'] : ['Stay vigilant', 'Never share OTP', 'Verify urgent requests']
      });
    }

    if (type === 'image') {
      const stegoIndicators = {
        hasUnusualFileSize: false,
        hasHiddenData: false,
        hasSuspiciousMetadata: false,
        hasAPKSignature: false
      };

      // IMPROVED: Check if it's actually an image first
      const isValidImage = data.startsWith('data:image/');
      
      if (!isValidImage) {
        stegoIndicators.hasAPKSignature = true;
        stegoIndicators.hasHiddenData = true;
      } else {
        // Extract just the base64 part (after the comma)
        const base64Data = data.split(',')[1] || data;
        
        // Check the actual START of the base64 data for APK signatures
        // APK files start with "PK" which is "UEs" in base64
        // IMPORTANT: Check only the FIRST 100 characters to avoid false positives from image data
        const header = base64Data.substring(0, 100);
        
        // More precise APK detection
        if (header.startsWith('UEsDBBQA') || header.startsWith('UEsDBAo')) {
          stegoIndicators.hasAPKSignature = true;
        }

        // Check for Android-specific strings in the beginning
        const suspiciousPatterns = [
          'AndroidManifest',
          'classes.dex',
          'META-INF',
          'resources.arsc'
        ];

        // Only check first 500 characters to avoid image data false positives
        const beginning = base64Data.substring(0, 500);
        for (const pattern of suspiciousPatterns) {
          if (beginning.includes(pattern)) {
            stegoIndicators.hasHiddenData = true;
            break;
          }
        }

        // Additional check: If file claims to be image but has APK patterns at START
        if (isValidImage && stegoIndicators.hasAPKSignature) {
          // This is suspicious - image header but APK signature
          stegoIndicators.hasSuspiciousMetadata = true;
        }
      }

      let stegoRisk = 0;
      if (stegoIndicators.hasAPKSignature) stegoRisk += 50;
      if (stegoIndicators.hasHiddenData) stegoRisk += 30;
      if (stegoIndicators.hasSuspiciousMetadata) stegoRisk += 20;

      const totalRisk = Math.min(stegoRisk, 100);

      let verdict: 'SAFE' | 'SUSPICIOUS' | 'DANGER' = 'SAFE';
      let message = '';
      let explanation = '';

      if (totalRisk >= 70) {
        verdict = 'DANGER';
        message = 'CRITICAL: Hidden code detected in image! Your device is at risk!';
        explanation = 'This image contains suspicious file signatures. It may contain hidden malware. Do not open images from unknown sources.';
      } else if (totalRisk >= 40) {
        verdict = 'SUSPICIOUS';
        message = 'Warning: This image has unusual patterns';
        explanation = 'The image shows some unusual characteristics. Verify the source before opening.';
      } else {
        verdict = 'SAFE';
        message = 'Image appears safe - no obvious hidden code detected';
        explanation = 'Basic scan shows no obvious threats in this image. However, always be cautious with images from unknown sources.';
      }

      return NextResponse.json({
        verdict,
        riskScore: totalRisk,
        message,
        explanation,
        indicators: stegoIndicators,
        actions: totalRisk >= 70 ? [
          'DO NOT OPEN this image',
          'DELETE immediately from your device',
          'Block the sender',
          'Report to cybercrime.gov.in',
          'Run antivirus scan on your device'
        ] : totalRisk >= 40 ? [
          'Do not open from unknown sender',
          'Verify sender identity first',
          'Use antivirus to scan',
          'Consider deleting if suspicious'
        ] : [
          'Image appears safe for viewing',
          'Still verify sender if from unknown source',
          'Never download from untrusted sources'
        ]
      });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}