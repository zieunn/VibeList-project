import { DB } from '../types';

const DB_KEY = 'vibelist_react_db_v2';
const VOL_KEY = 'vibelist_volume';

export function loadDB(): DB {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      return { tracks: [], lists: [], currentListId: '' };
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load DB', e);
    return { tracks: [], lists: [], currentListId: '' };
  }
}

export function saveDB(db: DB): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Failed to save DB', e);
  }
}

export function loadVolume(): number {
  try {
    const raw = localStorage.getItem(VOL_KEY);
    if (!raw) return 0.7;
    return parseFloat(raw);
  } catch (e) {
    return 0.7;
  }
}

export function saveVolume(vol: number): void {
  try {
    localStorage.setItem(VOL_KEY, vol.toString());
  } catch (e) {
    console.error('Failed to save volume', e);
  }
}

export function exportDB(db: DB): void {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vibelist_backup_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importDB(file: File, callback: (db: DB) => void): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = e.target?.result as string;
      const db: DB = JSON.parse(json);
      callback(db);
    } catch (err) {
      alert('JSON 파일 형식이 올바르지 않습니다.');
    }
  };
  reader.readAsText(file);
}