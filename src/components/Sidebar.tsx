
import React from 'react';
import { PList, Track } from '../types';

type Props = {
  lists: PList[];
  tracks: Track[];
  currentListId: string;
  onSelectList: (id: string) => void;
  onDeleteList: (id: string) => void;
  onPlayList: (id: string) => void;
  onRemoveTrackFromList: (listId: string, trackId: string) => void;
};

export default function Sidebar({
  lists,
  tracks,
  currentListId,
  onSelectList,
  onDeleteList,
  onPlayList,
  onRemoveTrackFromList,
}: Props) {
  const currentList = lists.find((l) => l.id === currentListId);
  const currentTracks = currentList
    ? tracks.filter((t) => currentList.trackIds.includes(t.id))
    : [];

  return (
    <aside className="w-full lg:w-80 simple-card rounded-2xl p-5 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-md">
          <span className="text-xl text-[#2a2a2a] font-bold">☰</span>
        </div>
        <h2 className="text-xl font-black text-[#EFDE9C]">
          플레이리스트
        </h2>
      </div>

      {lists.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#2a2a2a] border border-[#727272]/30 flex items-center justify-center">
            <span className="text-3xl text-[#727272]">♪</span>
          </div>
          <p className="text-[#727272] font-semibold">리스트가 없습니다</p>
        </div>
      ) : (
        <div className="space-y-2 mb-5">
          {lists.map((list) => (
            <div
              key={list.id}
              className={`p-3 rounded-xl border transition cursor-pointer transform hover:scale-[1.01] ${
                list.id === currentListId
                  ? 'bg-[#EFDE9C]/10 border-[#EFDE9C]'
                  : 'bg-[#2a2a2a] border-[#727272]/30 hover:border-[#EFDE9C]/50'
              }`}
              onClick={() => onSelectList(list.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#F6F6F6] truncate">
                    {list.name}
                  </h3>
                  <p className="text-[#727272] text-sm font-medium">
                    {list.trackIds.length} 곡
                  </p>
                </div>
                <div className="flex gap-1 ml-2">
                  {list.trackIds.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayList(list.id);
                      }}
                      className="p-1.5 bg-[#EFDE9C] hover:bg-[#f5e8b8] text-[#2a2a2a] rounded-lg transition shadow-md text-sm font-bold"
                      aria-label={`${list.name} 재생`}
                      title="재생"
                    >
                      ▶
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `"${list.name}" 플레이리스트를 삭제하시겠습니까?`
                        )
                      ) {
                        onDeleteList(list.id);
                      }
                    }}
                    className="p-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded-lg transition shadow-md text-sm"
                    aria-label={`${list.name} 삭제`}
                    title="삭제"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentList && (
        <div className="mt-5 pt-5 border-t border-[#727272]/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg text-[#EFDE9C]">♪</span>
            <h3 className="text-base font-bold text-[#EFDE9C]">
              {currentList.name}
            </h3>
          </div>
          {currentTracks.length === 0 ? (
            <p className="text-[#727272] text-sm text-center py-4">곡이 없습니다</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {currentTracks.map((track) => (
                <div
                  key={track.id}
                  className="p-2.5 bg-[#2a2a2a] border border-[#727272]/20 rounded-lg hover:border-[#EFDE9C]/30 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#F6F6F6] truncate">
                        {track.title}
                      </p>
                      <p className="text-xs text-[#727272] truncate font-medium">
                        {track.artist}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        onRemoveTrackFromList(currentList.id, track.id)
                      }
                      className="p-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 rounded text-xs transition flex-shrink-0"
                      aria-label={`${track.title} 제거`}
                      title="리스트에서 제거"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
