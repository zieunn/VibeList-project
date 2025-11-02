
import React, { useState, useEffect } from 'react';
import { Track } from '../types';

type Props = {
  track?: Track | null;
  onSave: (track: Partial<Track>) => void;
  onClose: () => void;
};

export default function AddTrackDialog({ track, onSave, onClose }: Props) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [url, setUrl] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    if (track) {
      setTitle(track.title);
      setArtist(track.artist);
      setAlbum(track.album || '');
      setGenre(track.genre || '');
      setUrl(track.url || '');
      setCover(track.cover || '');
    }
  }, [track]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) {
      alert('제목과 아티스트는 필수입니다.');
      return;
    }
    onSave({
      title: title.trim(),
      artist: artist.trim(),
      album: album.trim() || undefined,
      genre: genre.trim() || undefined,
      url: url.trim() || undefined,
      cover: cover.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="simple-card rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#EFDE9C] to-[#f5e8b8] flex items-center justify-center shadow-lg">
            <span className="text-3xl text-[#2a2a2a]">♪</span>
          </div>
          <h2 className="text-2xl font-black text-[#EFDE9C]">
            {track ? '노래 편집' : '노래 추가'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="곡 제목"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              아티스트 *
            </label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="아티스트 이름"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              앨범
            </label>
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="앨범명 (선택)"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              장르
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="장르 (선택)"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              미리듣기 URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#727272] mb-1.5">
              커버 이미지 URL
            </label>
            <input
              type="url"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-[#727272]/30 rounded-lg text-[#F6F6F6] placeholder-[#727272] focus:outline-none focus:border-[#EFDE9C] focus:ring-2 focus:ring-[#EFDE9C]/20 font-medium transition"
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="flex-1 px-5 py-3 bg-gradient-to-r from-[#EFDE9C] to-[#f5e8b8] hover:from-[#f5e8b8] hover:to-[#EFDE9C] text-[#2a2a2a] font-bold rounded-xl shadow-md transform hover:scale-105 transition-all"
            >
              저장
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
