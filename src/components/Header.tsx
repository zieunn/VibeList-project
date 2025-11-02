
import React from 'react';

type Props = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  genreFilter: string;
  onGenreFilterChange: (g: string) => void;
  sortBy: string;
  onSortByChange: (s: string) => void;
  onAddTrack: () => void;
  onNewPlaylist: () => void;
  onDJFav: () => void;
  onDJAll: () => void;
  onFetchItunes: () => void;
  onExportImport: () => void;
  onStationClick: (keyword: string) => void;
  genres: string[];
};

const STATIONS = [
  { name: 'LO-FI', keyword: 'lofi', icon: '◐' },
  { name: 'INDIE', keyword: 'indie', icon: '♪' },
  { name: 'ELECTRONIC', keyword: 'electronic', icon: '◆' },
  { name: 'JAZZ', keyword: 'jazz', icon: '♫' },
  { name: 'CLASSICAL', keyword: 'classical', icon: '♬' },
];

export default function Header({
  searchQuery,
  onSearchChange,
  genreFilter,
  onGenreFilterChange,
  sortBy,
  onSortByChange,
  onAddTrack,
  onNewPlaylist,
  onDJFav,
  onDJAll,
  onFetchItunes,
  onExportImport,
  onStationClick,
  genres,
}: Props) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#1a1a1a]/95 border-b border-[#EFDE9C]/20 shadow-xl">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
              <span className="text-2xl font-black text-[#2a2a2a]">♪</span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black retro-title text-[#EFDE9C]">
                VibeList
              </h1>
              <p className="text-[#727272] text-sm font-semibold tracking-wide">
                Your Music Radio
              </p>
            </div>
          </div>
        </div>

        {/* Stations */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {STATIONS.map((station) => (
            <button
              key={station.keyword}
              onClick={() => onStationClick(station.keyword)}
              className="px-4 py-2 text-sm font-bold bg-[#2a2a2a] hover:bg-[#EFDE9C] text-[#EFDE9C] hover:text-[#2a2a2a] border border-[#EFDE9C]/30 rounded-full shadow-md transform hover:scale-105 transition-all duration-200"
              aria-label={`${station.name} 스테이션`}
            >
              <span className="icon icon-sm mr-1">{station.icon}</span>
              {station.name}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="검색..."
            className="flex-1 min-w-[200px] px-4 py-3 bg-[#2a2a2a] border border-[#727272]/30 rounded-xl text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
            aria-label="트랙 검색"
          />
          <select
            value={genreFilter}
            onChange={(e) => onGenreFilterChange(e.target.value)}
            className="px-4 py-3 bg-[#2a2a2a] border border-[#727272]/30 rounded-xl text-[#F6F6F6] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
            aria-label="장르 필터"
          >
            <option value="">전체 장르</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="px-4 py-3 bg-[#2a2a2a] border border-[#727272]/30 rounded-xl text-[#F6F6F6] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
            aria-label="정렬"
          >
            <option value="newest">최신순</option>
            <option value="title">제목순</option>
            <option value="artist">아티스트순</option>
            <option value="fav">즐겨찾기</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onFetchItunes}
            className="px-5 py-2.5 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">↓</span>
            iTunes
          </button>
          <button
            onClick={onAddTrack}
            className="px-5 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#EFDE9C] border border-[#EFDE9C]/30 font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">+</span>
            추가
          </button>
          <button
            onClick={onNewPlaylist}
            className="px-5 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#EFDE9C] border border-[#EFDE9C]/30 font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">☰</span>
            리스트
          </button>
          <button
            onClick={onDJFav}
            className="px-5 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#EFDE9C] border border-[#EFDE9C]/30 font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">★</span>
            즐겨찾기
          </button>
          <button
            onClick={onDJAll}
            className="px-5 py-2.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#EFDE9C] border border-[#EFDE9C]/30 font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">♪</span>
            전체
          </button>
          <button
            onClick={onExportImport}
            className="px-5 py-2.5 bg-[#727272] hover:bg-[#828282] text-[#F6F6F6] font-bold rounded-full shadow-md transform hover:scale-105 transition-all text-sm"
          >
            <span className="icon icon-sm mr-1">⊕</span>
            백업
          </button>
        </div>
      </div>
    </header>
  );
}
