export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* Shield Outline */}
      <path
        d="M50 5L15 20V45C15 65 30 82 50 95C70 82 85 65 85 45V20L50 5Z"
        fill="url(#gradient1)"
        stroke="currentColor"
        strokeWidth="3"
      />
      
      {/* Inner Shield Design */}
      <path
        d="M50 15L25 27V45C25 60 35 73 50 83C65 73 75 60 75 45V27L50 15Z"
        fill="url(#gradient2)"
      />
      
      {/* Q Letter */}
      <text
        x="50"
        y="60"
        fontSize="40"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="Arial, sans-serif">
        Q
      </text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}