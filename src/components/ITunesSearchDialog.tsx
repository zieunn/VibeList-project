
import React, { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export default function ITunesSearchDialog({ onSearch, onClose, isLoading }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }
    onSearch(query.trim());
  };

  const popularSearches = [
    { label: 'Lo-fi', query: 'lofi chill' },
    { label: 'Jazz', query: 'jazz smooth' },
    { label: 'Classical', query: 'classical piano' },
    { label: 'K-Pop', query: 'kpop' },
    { label: 'Indie', query: 'indie folk' },
    { label: 'Electronic', query: 'electronic dance' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 lg:p-8 max-w-lg w-full shadow-2xl">
        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg floating">
            <span className="text-3xl text-[#2a2a2a]">🎵</span>
          </div>
          <h2 className="text-3xl font-black text-[#EFDE9C] mb-2">
            iTunes 검색
          </h2>
          <p className="text-[#727272] text-sm">
            아티스트, 곡 제목, 앨범명으로 검색하세요
          </p>
        </div>

        {/* 검색 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-2">
              검색어
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-[#727272]/30 rounded-xl text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-4 focus:ring-[#EFDE9C]/20 font-medium transition text-base"
              placeholder="예: Coldplay, Taylor Swift, Jazz..."
              autoFocus
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-xl shadow-md transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⟳</span>
                  검색 중...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span></span>
                  검색하기
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 font-bold rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              취소
            </button>
          </div>
        </form>

        {/* 인기 검색어 */}
        <div>
          <p className="text-xs font-bold text-[#727272] mb-3">
            💡 인기 검색어
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item) => (
              <button
                key={item.query}
                type="button"
                onClick={() => setQuery(item.query)}
                disabled={isLoading}
                className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#EFDE9C]/10 border border-[#727272]/30 hover:border-[#EFDE9C]/50 text-[#727272] hover:text-[#EFDE9C] text-xs font-medium rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-[#2a2a2a] border border-[#EFDE9C]/20 rounded-xl">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">ℹ️</span>
            <div>
              <p className="text-[#F6F6F6] text-xs font-bold mb-1">
                검색 팁
              </p>
              <ul className="text-[#727272] text-xs space-y-1">
                <li>• 최대 50곡까지 가져올 수 있습니다</li>
                <li>• 30초 미리듣기가 가능한 곡만 추가됩니다</li>
                <li>• 중복된 곡은 자동으로 제외됩니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
