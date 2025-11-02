
import React from 'react';
import { Track } from '../types';

type Props = {
  favorites: Track[];
  onPlay: (track: Track) => void;
  onPlayAll: () => void;
  onClose: () => void;
};

export default function FavoritesDialog({ favorites, onPlay, onPlayAll, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
              <span className="text-2xl text-[#2a2a2a]">★</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#EFDE9C]">
                즐겨찾기
              </h2>
              <p className="text-[#727272] text-sm">
                {favorites.length}곡
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md text-lg"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#2a2a2a] border-2 border-[#727272]/30 flex items-center justify-center">
              <span className="text-4xl text-[#727272]">★</span>
            </div>
            <p className="text-[#727272] text-lg font-semibold mb-2">
              즐겨찾기한 곡이 없습니다
            </p>
            <p className="text-[#727272] text-sm">
              마음에 드는 곡에 ★를 눌러보세요
            </p>
          </div>
        ) : (
          <>
            {/* 전체 재생 버튼 */}
            <div className="mb-4">
              <button
                onClick={onPlayAll}
                className="w-full px-5 py-3 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-xl shadow-md transform hover:scale-[1.02] transition-all"
              >
                <span className="icon icon-sm mr-2">▶</span>
                전체 재생 ({favorites.length}곡)
              </button>
            </div>

            {/* 즐겨찾기 리스트 */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {favorites.map((track) => (
                <div
                  key={track.id}
                  className="simple-card rounded-xl p-3 hover:border-[#EFDE9C]/40 transition"
                >
                  <div className="flex items-center gap-3">
                    {/* 커버 */}
                    <div className="flex-shrink-0">
                      {track.cover ? (
                        <img
                          src={track.cover}
                          alt={`${track.title} cover`}
                          className="w-14 h-14 rounded-lg object-cover shadow-md border border-[#EFDE9C]/20"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-[#EFDE9C]/30 to-[#727272]/30 rounded-lg flex items-center justify-center text-2xl border border-[#EFDE9C]/20 shadow-md text-[#EFDE9C]">
                          ♪
                        </div>
                      )}
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#F6F6F6] text-sm truncate">
                        {track.title}
                      </h3>
                      <p className="text-[#EFDE9C] text-xs truncate font-medium">
                        {track.artist}
                      </p>
                      {track.album && (
                        <p className="text-[#727272] text-xs truncate">
                          {track.album}
                        </p>
                      )}
                    </div>

                    {/* 재생 버튼 */}
                    {track.url ? (
                      <button
                        onClick={() => onPlay(track)}
                        className="p-2.5 bg-[#EFDE9C] hover:bg-[#f5e8b8] text-[#2a2a2a] rounded-lg transition shadow-md font-bold"
                        aria-label={`${track.title} 재생`}
                      >
                        ▶
                      </button>
                    ) : (
                      <div className="p-2.5 bg-[#2a2a2a] text-[#727272] rounded-lg text-xs font-medium border border-[#727272]/30">
                        재생 불가
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
