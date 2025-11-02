
import React from 'react';

type Props = {
  isPlaying: boolean;
};

export default function MusicVisualEffect({ isPlaying }: Props) {
  if (!isPlaying) return null;

  return (
    <>
      {/* 부드러운 앰비언트 배경 */}
      <div className="fixed inset-0 ambient-bg pointer-events-none z-0"></div>

      {/* 클럽 라이트빔 - 회전하는 빛줄기들 */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="light-beam-container absolute top-0 left-1/2 w-full h-full" style={{ transformOrigin: 'top center' }}>
          {/* 메인 빔들 */}
          <div className="light-beam absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#EFDE9C]/30 via-[#EFDE9C]/10 to-transparent transform -translate-x-1/2" style={{ animationDelay: '0s' }}></div>
          <div className="light-beam absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#EFDE9C]/30 via-[#EFDE9C]/10 to-transparent transform -translate-x-1/2 rotate-45" style={{ animationDelay: '0.3s' }}></div>
          <div className="light-beam absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#EFDE9C]/30 via-[#EFDE9C]/10 to-transparent transform -translate-x-1/2 rotate-90" style={{ animationDelay: '0.6s' }}></div>
          <div className="light-beam absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-[#EFDE9C]/30 via-[#EFDE9C]/10 to-transparent transform -translate-x-1/2 rotate-[135deg]" style={{ animationDelay: '0.9s' }}></div>
        </div>
      </div>

      {/* 스포트라이트 효과 */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="spotlight absolute top-0 left-1/2 w-full h-full" style={{ transformOrigin: 'top center' }}>
          <div className="absolute top-0 left-1/2 w-32 h-full bg-gradient-to-b from-[#EFDE9C]/20 via-transparent to-transparent blur-xl transform -translate-x-1/2"></div>
        </div>
        <div className="spotlight absolute top-0 left-1/2 w-full h-full" style={{ transformOrigin: 'top center', animationDirection: 'reverse', animationDuration: '15s' }}>
          <div className="absolute top-0 left-1/2 w-32 h-full bg-gradient-to-b from-[#EFDE9C]/20 via-transparent to-transparent blur-xl transform -translate-x-1/2 rotate-180"></div>
        </div>
      </div>

      {/* 반짝이는 플래시 효과 */}
      <div className="fixed inset-0 strobe-flash bg-[#EFDE9C]/5 pointer-events-none z-0"></div>
      <div className="fixed inset-0 strobe-flash bg-[#EFDE9C]/5 pointer-events-none z-0" style={{ animationDelay: '1.5s' }}></div>

      {/* 방사형 빛줄기 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="radial-light absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-[#EFDE9C]/40 to-transparent transform-origin-top"
            style={{
              transformOrigin: 'top center',
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 중앙 턴테이블 비닐 레코드 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-20">
        {/* 메인 레코드 */}
        <div className="vinyl-record relative">
          {/* 레코드 외곽 */}
          <div className="w-96 h-96 rounded-full border-[3px] border-[#EFDE9C]/30"></div>
          
          {/* 그루브 라인들 */}
          <div className="absolute inset-8 rounded-full border border-[#EFDE9C]/20"></div>
          <div className="absolute inset-16 rounded-full border border-[#EFDE9C]/20"></div>
          <div className="absolute inset-24 rounded-full border border-[#EFDE9C]/20"></div>
          <div className="absolute inset-32 rounded-full border border-[#EFDE9C]/20"></div>
          
          {/* 중앙 레이블 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#EFDE9C]/10 border-2 border-[#EFDE9C]/30 flex items-center justify-center">
            <span className="text-4xl text-[#EFDE9C]/50">♪</span>
          </div>
        </div>

        {/* 톤암 */}
        <div className="absolute -right-20 top-8 tonearm">
          <div className="relative">
            {/* 톤암 본체 */}
            <div className="w-2 h-40 bg-gradient-to-b from-[#EFDE9C]/40 to-[#EFDE9C]/20 rounded-full shadow-lg"></div>
            {/* 헤드쉘 */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#EFDE9C]/30 rounded-full border-2 border-[#EFDE9C]/50"></div>
          </div>
        </div>
      </div>

      {/* 부드러운 파동 효과 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="gentle-wave absolute w-72 h-72 border border-[#EFDE9C]/20 rounded-full"></div>
        <div className="gentle-wave absolute w-72 h-72 border border-[#EFDE9C]/20 rounded-full" style={{ animationDelay: '1.3s' }}></div>
        <div className="gentle-wave absolute w-72 h-72 border border-[#EFDE9C]/20 rounded-full" style={{ animationDelay: '2.6s' }}></div>
      </div>

      {/* 반짝이는 점들 (디스코볼 효과) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="shimmer-effect absolute w-1 h-1 bg-[#EFDE9C] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 미니멀 떠다니는 음표 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="minimal-particle absolute text-[#EFDE9C]/20"
            style={{
              left: `${15 + i * 15}%`,
              bottom: 0,
              animationDelay: `${i * 2}s`,
              fontSize: `${24 + Math.random() * 12}px`,
              '--drift': `${(Math.random() - 0.5) * 100}px`,
            } as React.CSSProperties}
          >
            {i % 2 === 0 ? '♪' : '♫'}
          </div>
        ))}
      </div>

      {/* 코너 서브틀 글로우 */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-[#EFDE9C]/5 rounded-full blur-3xl subtle-glow pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-[#EFDE9C]/5 rounded-full blur-3xl subtle-glow pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

      {/* 상단 하단 비네팅 */}
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#EFDE9C]/3 to-transparent pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#EFDE9C]/3 to-transparent pointer-events-none z-0"></div>
    </>
  );
}
