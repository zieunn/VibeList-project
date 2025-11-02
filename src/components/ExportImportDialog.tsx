
import React, { useRef } from 'react';
import { DB } from '../types';
import { exportDB, importDB } from '../utils/storage';

type Props = {
  db: DB;
  onImport: (db: DB) => void;
  onClose: () => void;
};

export default function ExportImportDialog({ db, onImport, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportDB(db);
    alert('💾 데이터를 내보냈습니다!');
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    importDB(file, (importedDB) => {
      onImport(importedDB);
      alert('📥 데이터를 가져왔습니다!');
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
            <span className="text-3xl text-[#2a2a2a]">⊕</span>
          </div>
          <h2 className="text-2xl font-black text-[#EFDE9C]">
            데이터 백업/복원
          </h2>
          <p className="text-[#727272] text-sm mt-2">
            모든 곡과 플레이리스트를 저장하거나 불러오세요
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full px-5 py-4 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-xl shadow-md transform hover:scale-105 transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">↓</span>
              <span>JSON 내보내기</span>
            </div>
          </button>
          <button
            onClick={handleImport}
            className="w-full px-5 py-4 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#EFDE9C] border border-[#EFDE9C]/30 font-bold rounded-xl shadow-md transform hover:scale-105 transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">↑</span>
              <span>JSON 가져오기</span>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="mt-5">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#727272] hover:text-[#F6F6F6] border border-[#727272]/30 font-bold rounded-xl shadow-md transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
