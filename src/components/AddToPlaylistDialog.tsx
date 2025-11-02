
import React from 'react';
import { PList } from '../types';

type Props = {
  lists: PList[];
  onAdd: (listId: string) => void;
  onClose: () => void;
};

export default function AddToPlaylistDialog({ lists, onAdd, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
            <span className="text-3xl text-[#2a2a2a]">+</span>
          </div>
          <h2 className="text-2xl font-black text-[#EFDE9C]">
            플레이리스트에 추가
          </h2>
        </div>
        {lists.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#2a2a2a] border border-[#727272]/30 flex items-center justify-center">
              <span className="text-2xl text-[#727272]">☰</span>
            </div>
            <p className="text-[#727272] font-semibold mb-1">플레이리스트가 없습니다</p>
            <p className="text-[#727272] text-sm">먼저 플레이리스트를 만들어주세요</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto mb-4">
            {lists.map((list) => (
              <button
                key={list.id}
                onClick={() => onAdd(list.id)}
                className="w-full text-left px-4 py-3 bg-[#2a2a2a] hover:bg-[#EFDE9C]/10 border border-[#727272]/30 hover:border-[#EFDE9C] rounded-xl text-[#F6F6F6] hover:text-[#EFDE9C] font-bold transition transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">☰</span>
                  <span>{list.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 font-bold rounded-xl shadow-md transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
