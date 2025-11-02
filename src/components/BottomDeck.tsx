
import React, { useState, useEffect, useRef } from 'react';
import { Track } from '../types';

type Props = {
  playlist: Track[];
  onClose: () => void;
  initialVolume: number;
  onVolumeChange: (vol: number) => void;
  onPlayingChange: (playing: boolean) => void;
};

export default function BottomDeck({
  playlist,
  onClose,
  initialVolume,
  onVolumeChange,
  onPlayingChange,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // 기본값을 true로 변경
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', handleNext);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleNext);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  // 트랙 변경 시 자동 재생
  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.volume = volume;
      
      // 자동으로 재생 시작
      audioRef.current.play().catch((err) => {
        console.error('Play error:', err);
        setIsPlaying(false);
      });
      
      // 재생 시작 시 isPlaying을 true로 설정
      setIsPlaying(true);
    }
  }, [currentTrack, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      onVolumeChange(volume);
    }
  }, [volume, onVolumeChange]);

  useEffect(() => {
    onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const prog =
        (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
      setProgress(prog);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !currentTrack?.url) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Play error:', err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    setCurrentIndex(newIndex);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentIndex(randomIndex);
    } else {
      const newIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(newIndex);
    }
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !currentTrack?.url) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handlePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-[#1a1a1a]/98 border-t-2 border-[#EFDE9C]/30 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-5">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* 원형 음반 (Vinyl Record) */}
          <div className="flex-shrink-0 relative">
            {/* 글로우 효과 */}
            <div className="absolute inset-0 bg-[#EFDE9C]/20 rounded-full blur-xl"></div>
            
            {currentTrack.cover ? (
              <div className="relative">
                {/* 음반 외곽 링 */}
                <div className="absolute inset-0 rounded-full border-4 border-[#EFDE9C] shadow-lg"></div>
                {/* 앨범 커버 */}
                <img
                  src={currentTrack.cover}
                  alt="cover"
                  className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover shadow-xl ${
                    isPlaying ? 'spinning' : ''
                  }`}
                  style={{ clipPath: 'circle(50%)' }}
                />
                {/* 중앙 홀 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 bg-[#2a2a2a] rounded-full border-2 border-[#EFDE9C]/50 shadow-inner"></div>
              </div>
            ) : (
              <div className="relative">
                {/* 음반 외곽 링 */}
                <div className="absolute inset-0 rounded-full border-4 border-[#EFDE9C] shadow-lg"></div>
                {/* 기본 음반 디자인 */}
                <div
                  className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#3a3a3a] to-[#2a2a2a] flex items-center justify-center shadow-xl ${
                    isPlaying ? 'spinning' : ''
                  }`}
                  style={{
                    background: 'radial-gradient(circle, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
                  }}
                >
                  {/* 음반 그루브 (홈) 효과 */}
                  <div className="absolute inset-2 rounded-full border border-[#EFDE9C]/10"></div>
                  <div className="absolute inset-4 rounded-full border border-[#EFDE9C]/10"></div>
                  <div className="absolute inset-6 rounded-full border border-[#EFDE9C]/10"></div>
                  
                  {/* 음표 아이콘 */}
                  <span className="text-2xl lg:text-3xl text-[#EFDE9C] relative z-10">♪</span>
                  
                  {/* 중앙 홀 */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 bg-[#1a1a1a] rounded-full border-2 border-[#EFDE9C]/50 shadow-inner"></div>
                </div>
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden">
              <p className="text-[#F6F6F6] font-black text-base lg:text-xl truncate">
                {currentTrack.title}
              </p>
              <p className="text-[#EFDE9C] font-bold text-sm lg:text-base truncate">
                {currentTrack.artist}
              </p>
            </div>
            {currentTrack.album && (
              <p className="text-[#727272] text-xs lg:text-sm truncate mt-0.5">
                {currentTrack.album}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              onClick={handlePrev}
              className="p-2 lg:p-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md text-base font-bold"
              aria-label="이전 곡"
              title="이전"
            >
              ⏮
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 lg:p-4 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] rounded-xl transition font-black text-xl lg:text-2xl shadow-lg glow-effect"
              aria-label={isPlaying ? '일시정지' : '재생'}
              title={isPlaying ? '일시정지' : '재생'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={handleNext}
              className="p-2 lg:p-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md text-base font-bold"
              aria-label="다음 곡"
              title="다음"
            >
              ⏭
            </button>
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 lg:p-2.5 rounded-lg transition shadow-md text-base font-bold ${
                isShuffle
                  ? 'bg-[#EFDE9C] text-[#2a2a2a]'
                  : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30'
              }`}
              aria-label={isShuffle ? '셔플 해제' : '셔플'}
              title={isShuffle ? '셔플 해제' : '셔플'}
            >
              ⤨
            </button>
          </div>

          {/* Volume */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-[#EFDE9C] text-lg">♫</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-[#EFDE9C]"
              aria-label="볼륨"
            />
            <span className="text-[#727272] font-bold text-xs w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 lg:p-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md text-lg"
            aria-label="플레이어 닫기"
            title="닫기"
          >
            ×
          </button>
        </div>

        {/* Progress Bar */}
        <div
          className="mt-3 h-2 bg-[#2a2a2a] rounded-full cursor-pointer overflow-hidden border border-[#727272]/30"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] transition-all shadow-md"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
