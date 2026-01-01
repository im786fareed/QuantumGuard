import ThreatIntelligence from '@/components/ThreatIntelligence';
import BackToHome from '@/components/BackToHome';

export default function ThreatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <BackToHome />
      <ThreatIntelligence lang="en" />
    </div>
  );
}