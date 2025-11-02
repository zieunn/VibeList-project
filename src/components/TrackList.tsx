
import React from 'react';
import { Track } from '../types';

type Props = {
  tracks: Track[];
  onPlay: (track: Track) => void;
  onToggleFav: (id: string) => void;
  onEdit: (track: Track) => void;
  onDelete: (id: string) => void;
  onAddToPlaylist: (track: Track) => void;
};

export default function TrackList({
  tracks,
  onPlay,
  onToggleFav,
  onEdit,
  onDelete,
  onAddToPlaylist,
}: Props) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-xl">
          <span className="text-5xl text-[#2a2a2a]">♪</span>
        </div>
        <p className="text-[#EFDE9C] text-2xl font-bold mb-2">트랙이 없습니다</p>
        <p className="text-[#727272] text-lg">
          스테이션을 선택하거나 iTunes에서 가져오세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="simple-card rounded-2xl p-4 transform hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex gap-3">
            {/* Cover */}
            <div className="flex-shrink-0">
              {track.cover ? (
                <img
                  src={track.cover}
                  alt={`${track.title} cover`}
                  className="w-20 h-20 rounded-xl object-cover shadow-md border border-[#EFDE9C]/20"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-[#EFDE9C]/30 to-[#727272]/30 rounded-xl flex items-center justify-center text-3xl border border-[#EFDE9C]/20 shadow-md text-[#EFDE9C]">
                  ♪
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#F6F6F6] text-base truncate mb-1">
                {track.title}
              </h3>
              <p className="text-[#EFDE9C] text-sm truncate mb-1 font-medium">
                {track.artist}
              </p>
              {track.album && (
                <p className="text-[#727272] text-xs truncate mb-2">
                  {track.album}
                </p>
              )}
              {track.genre && (
                <span className="inline-block px-2 py-0.5 bg-[#2a2a2a] text-[#EFDE9C] text-xs rounded-full font-medium border border-[#EFDE9C]/20">
                  {track.genre}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1">
              {track.url && (
                <button
                  onClick={() => onPlay(track)}
                  className="p-2 bg-[#EFDE9C] hover:bg-[#f5e8b8] text-[#2a2a2a] rounded-lg transition shadow-md font-bold hover:scale-110 active:scale-95"
                  aria-label={`${track.title} 재생`}
                  title="재생"
                >
                  ▶
                </button>
              )}
              <button
                onClick={() => onToggleFav(track.id)}
                className={`p-2 rounded-lg transition shadow-md font-bold ${
                  track.fav
                    ? 'bg-[#EFDE9C] text-[#2a2a2a]'
                    : 'bg-[#2a2a2a] text-[#727272] hover:text-[#EFDE9C] border border-[#727272]/30'
                }`}
                aria-label={track.fav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                title={track.fav ? '즐겨찾기 해제' : '즐겨찾기'}
              >
                ★
              </button>
              <button
                onClick={() => onEdit(track)}
                className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md"
                aria-label={`${track.title} 편집`}
                title="편집"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(track.id)}
                className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md"
                aria-label={`${track.title} 삭제`}
                title="삭제"
              >
                ×
              </button>
              <button
                onClick={() => onAddToPlaylist(track)}
                className="p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#EFDE9C] border border-[#727272]/30 rounded-lg transition shadow-md"
                aria-label={`${track.title} 플레이리스트에 추가`}
                title="플레이리스트에 추가"
              >
                +
              </button>
            </div>
          </div>

          {/* Audio Player */}
          {track.url && (
            <div className="mt-3">
              <audio
                controls
                src={track.url}
                className="w-full h-8 rounded-lg"
              >
                <span className="sr-only">오디오 플레이어</span>
              </audio>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
