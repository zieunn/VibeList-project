
import React, { useState } from 'react';

type Props = {
  onStart: (station: string) => void;
};

const STATIONS = [
  { 
    id: 'summer', 
    name: 'Summer Vibes', 
    emoji: '☀️',
    description: 'Endless summer soundtrack',
    color: 'from-orange-400 to-pink-400'
  },
  { 
    id: 'lofi', 
    name: 'Lo-Fi Chill', 
    emoji: '🌙',
    description: 'Relax and focus',
    color: 'from-purple-400 to-indigo-400'
  },
  { 
    id: 'indie', 
    name: 'Indie Folk', 
    emoji: '🎸',
    description: 'Acoustic dreams',
    color: 'from-green-400 to-teal-400'
  },
  { 
    id: 'jazz', 
    name: 'Smooth Jazz', 
    emoji: '🎷',
    description: 'Late night mood',
    color: 'from-amber-400 to-yellow-400'
  },
  { 
    id: 'electronic', 
    name: 'Electronic', 
    emoji: '⚡',
    description: 'Future sounds',
    color: 'from-cyan-400 to-blue-400'
  },
];

export default function WelcomeScreen({ onStart }: Props) {
  const [selectedStation, setSelectedStation] = useState('summer');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart(selectedStation);
    }, 600);
  };

  const selected = STATIONS.find(s => s.id === selectedStation);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* 다이나믹 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${selected?.color} blur-3xl transform scale-150 transition-all duration-1000`}></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* 로고 & 타이틀 */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4 floating">{selected?.emoji}</div>
          </div>
          <h1 className="text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="retro-title bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] bg-clip-text text-transparent">
              VibeList
            </span>
          </h1>
          <p className="text-[#EFDE9C]/80 text-lg lg:text-xl font-medium">
            Your endless radio station
          </p>
        </div>

        {/* 스테이션 선택 */}
        <div className="mb-12">
          <p className="text-center text-[#727272] text-sm font-semibold mb-6 tracking-wider uppercase">
            Choose Your Vibe
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {STATIONS.map((station) => (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedStation === station.id
                    ? 'border-[#EFDE9C] bg-[#EFDE9C]/10 scale-105'
                    : 'border-[#727272]/20 bg-[#2a2a2a]/50 hover:border-[#EFDE9C]/50 hover:scale-105'
                }`}
              >
                {/* 선택 표시 */}
                {selectedStation === station.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#EFDE9C] rounded-full flex items-center justify-center">
                    <span className="text-[#2a2a2a] text-xs font-black">✓</span>
                  </div>
                )}

                <div className="text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                    {station.emoji}
                  </div>
                  <h3 className="text-[#F6F6F6] font-bold text-sm mb-1">
                    {station.name}
                  </h3>
                  <p className="text-[#727272] text-xs">
                    {station.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="text-center">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] rounded-full shadow-2xl hover:shadow-[#EFDE9C]/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* 호버 효과 */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
            
            <span className="relative text-[#2a2a2a] text-2xl font-black flex items-center gap-3">
              <span className="text-3xl">▶</span>
              <span>Start Radio</span>
            </span>
          </button>

          {/* 서브 텍스트 */}
          <p className="mt-6 text-[#727272] text-sm">
            Press <kbd className="px-2 py-1 bg-[#2a2a2a] rounded text-[#EFDE9C] font-mono text-xs">Space</kbd> to play/pause
          </p>
        </div>
      </div>

      {/* 장식 요소 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#727272]/30 text-xs font-medium">
        Powered by iTunes • 24/7 Music Stream
      </div>
    </div>
  );
}
