
import { Track } from '../types';

export type ITunesResult = {
  trackId?: number;
  collectionId?: number;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  primaryGenreName?: string;
  previewUrl?: string;
  artworkUrl100?: string;
};

export async function searchItunes(term: string): Promise<any[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=50`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('iTunes 응답 오류');
  const json = await res.json();
  return Array.isArray(json.results) ? json.results : [];
}

export function convertITunesToTrack(r: any): Track | null {
  // previewUrl, trackName, artistName 없으면 제외 (재생/표시 안정성)
  if (!r?.previewUrl || !r?.trackName || !r?.artistName) return null;
  
  const idBase = r.trackId ?? r.collectionId ?? Date.now();
  
  return {
    id: `it_${idBase}_${Math.random().toString(36).slice(2, 7)}`,
    title: String(r.trackName),
    artist: String(r.artistName),
    album: String(r.collectionName ?? ''),
    genre: String(r.primaryGenreName ?? ''),
    url: String(r.previewUrl),
    cover: r.artworkUrl100 ? String(r.artworkUrl100).replace('100x100', '300x300') : '',
    fav: false,
    addedAt: Date.now(),
  };
}
