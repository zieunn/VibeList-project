
import { Track } from '../types';

// 기본 라디오 스테이션 (iTunes에서 가져올 때까지 임시)
export const DEFAULT_STATIONS = {
  'lofi': 'lofi chill beats',
  'summer': 'summer pop hits',
  'indie': 'indie folk',
  'jazz': 'jazz smooth',
  'electronic': 'electronic chill',
};

export const WELCOME_MESSAGE = {
  title: 'VibeList Radio',
  subtitle: '끝없는 여름 사운드트랙',
  description: '당신만의 라디오 스테이션',
};

// 로컬스토리지 키
export const STORAGE_KEYS = {
  hasVisited: 'vibelist_has_visited',
  lastStation: 'vibelist_last_station',
  autoPlay: 'vibelist_auto_play',
};

export function getHasVisited(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.hasVisited) === 'true';
  } catch {
    return false;
  }
}

export function setHasVisited(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.hasVisited, 'true');
  } catch {
    // ignore
  }
}

export function getLastStation(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.lastStation);
  } catch {
    return null;
  }
}

export function setLastStation(station: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.lastStation, station);
  } catch {
    // ignore
  }
}
