import SpamChecker from '@/components/SpamChecker';
import BackToHome from '@/components/BackToHome';

export default function SpamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <BackToHome />
      <SpamChecker lang="en" />
    </div>
  );
}