
import React, { useState } from 'react';

type Props = {
  onSave: (name: string) => void;
  onClose: () => void;
};

export default function PlaylistDialog({ onSave, onClose }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('플레이리스트 이름을 입력하세요.');
      return;
    }
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
            <span className="text-3xl text-[#2a2a2a]">☰</span>
          </div>
          <h2 className="text-2xl font-black text-[#EFDE9C]">
            새 플레이리스트
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="나만의 플레이리스트"
              autoFocus
              required
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-xl shadow-md transform hover:scale-105 transition-all"
            >
              생성
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 font-bold rounded-xl shadow-md transition"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
