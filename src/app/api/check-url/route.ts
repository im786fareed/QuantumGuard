import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // Dangerous patterns commonly found in phishing/scam URLs
    const dangerousPatterns = [
      'bit.ly/scam',
      'phishing',
      'verify-account',
      'urgent-update',
      'suspended-account',
      'confirm-identity',
      'prize-winner',
      'claim-reward',
      'reset-password',
      'unusual-activity',
      'security-alert',
      'bank-verify',
      'account-locked',
      'verify-now',
      'update-payment',
      'confirm-details',
      'tax-refund',
      'lottery-winner',
      'free-prize',
      'claim-now'
    ];

    const lowerUrl = url.toLowerCase();
    const isDangerous = dangerousPatterns.some(pattern => lowerUrl.includes(pattern));

    // Additional checks
    const hasSuspiciousExtension = /\.(xyz|tk|ml|ga|cf|gq)/.test(lowerUrl);
    const hasIPAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url);
    const hasMultipleSubdomains = (url.match(/\./g) || []).length > 3;
    const isShortenedURL = /(bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly)/i.test(url);

    const finalDangerous = isDangerous || hasSuspiciousExtension || (hasIPAddress && isShortenedURL);

    return NextResponse.json({
      url,
      safe: !finalDangerous,
      threat: finalDangerous ? 'SUSPICIOUS_PATTERN' : null,
      checked: new Date().toISOString(),
      details: {
        hasSuspiciousPattern: isDangerous,
        hasSuspiciousExtension,
        hasIPAddress,
        isShortenedURL,
        hasMultipleSubdomains
      }
    });

  } catch (error) {
    console.error('URL check error:', error);
    return NextResponse.json({ error: 'Check failed' }, { status: 500 });
  }
}