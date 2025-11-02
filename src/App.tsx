
import React, { useState, useEffect, useRef } from 'react';
import { DB, Track, PList } from './types';
import { loadDB, saveDB, loadVolume, saveVolume } from './utils/storage';
import { searchItunes, convertITunesToTrack } from './utils/itunes';
import { getHasVisited, setHasVisited, setLastStation, DEFAULT_STATIONS } from './utils/defaultStations';
import Header from './components/Header';
import TrackList from './components/TrackList';
import Sidebar from './components/Sidebar';
import BottomDeck from './components/BottomDeck';
import AddTrackDialog from './components/AddTrackDialog';
import PlaylistDialog from './components/PlaylistDialog';
import AddToPlaylistDialog from './components/AddToPlaylistDialog';
import ExportImportDialog from './components/ExportImportDialog';
import FavoritesDialog from './components/FavoritesDialog';
import ITunesSearchDialog from './components/ITunesSearchDialog';
import LoadingDialog from './components/LoadingDialog';
import MusicVisualEffect from './components/MusicVisualEffect';
import WelcomeScreen from './components/WelcomeScreen';

// 안전한 문자열 변환 함수
const safeLower = (s?: string) => (s ?? '').toLowerCase();

export default function App() {
  const [db, setDb] = useState<DB>(() => loadDB());
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [addingTrack, setAddingTrack] = useState<Track | null>(null);
  const [showExportImport, setShowExportImport] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showITunesSearch, setShowITunesSearch] = useState(false);
  const [isLoadingItunes, setIsLoadingItunes] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [deckPlaylist, setDeckPlaylist] = useState<Track[]>([]);
  const [volume, setVolume] = useState(() => loadVolume());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!getHasVisited());
  const [isInitializing, setIsInitializing] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveDB(db);
  }, [db]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target === document.body) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Welcome Screen에서 시작 버튼 클릭
  const handleWelcomeStart = async () => {
    setShowWelcome(false);
    setHasVisited();
    setIsInitializing(true);

    // 기본 스테이션 로드 (Summer Vibes)
    try {
      await fetchStationSilent('summer');
    } catch (err) {
      console.error('Failed to load initial station:', err);
    } finally {
      setIsInitializing(false);
    }
  };

  // 조용히 스테이션 로드 (에러 알림 없이)
  const fetchStationSilent = async (keyword: string) => {
    try {
      const query = DEFAULT_STATIONS[keyword as keyof typeof DEFAULT_STATIONS] || keyword;
      const results = await searchItunes(query);
      const tracks: Track[] = results
        .map(convertITunesToTrack)
        .filter((t): t is Track => t !== null);

      if (tracks.length === 0) return;

      const existing = new Set(
        db.tracks.map((t) => `${safeLower(t.title)}_${safeLower(t.artist)}`)
      );
      const uniqueTracks = tracks.filter(
        (t) => !existing.has(`${safeLower(t.title)}_${safeLower(t.artist)}`)
      );

      if (uniqueTracks.length > 0) {
        const newList: PList = {
          id: `list_${Date.now()}_${Math.random()}`,
          name: `🌊 ${keyword.toUpperCase()} Radio`,
          trackIds: uniqueTracks.map((t) => t.id),
          createdAt: Date.now(),
        };

        setDb((prev) => ({
          ...prev,
          tracks: [...prev.tracks, ...uniqueTracks],
          lists: [...prev.lists, newList],
        }));

        // 자동 재생
        const playable = uniqueTracks.filter((t) => t.url);
        if (playable.length > 0) {
          setDeckPlaylist(playable);
          setLastStation(keyword);
        }
      }
    } catch (err) {
      console.error('Station load error:', err);
    }
  };

  const addTrack = (data: Partial<Track>) => {
    const newTrack: Track = {
      id: `track_${Date.now()}_${Math.random()}`,
      title: data.title!,
      artist: data.artist!,
      album: data.album,
      genre: data.genre,
      url: data.url,
      cover: data.cover,
      fav: false,
      addedAt: Date.now(),
    };
    setDb((prev) => ({ ...prev, tracks: [...prev.tracks, newTrack] }));
    setShowAddTrack(false);
  };

  const updateTrack = (id: string, data: Partial<Track>) => {
    setDb((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    }));
    setEditingTrack(null);
  };

  const deleteTrack = (id: string) => {
    if (!window.confirm('이 곡을 삭제하시겠습니까?')) return;
    setDb((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((t) => t.id !== id),
      lists: prev.lists.map((list) => ({
        ...list,
        trackIds: list.trackIds.filter((tid) => tid !== id),
      })),
    }));
  };

  const toggleFav = (id: string) => {
    setDb((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) =>
        t.id === id ? { ...t, fav: !t.fav } : t
      ),
    }));
  };

  const createPlaylist = (name: string) => {
    const newList: PList = {
      id: `list_${Date.now()}_${Math.random()}`,
      name,
      trackIds: [],
      createdAt: Date.now(),
    };
    setDb((prev) => ({ ...prev, lists: [...prev.lists, newList] }));
    setShowNewPlaylist(false);
  };

  const deletePlaylist = (id: string) => {
    setDb((prev) => ({
      ...prev,
      lists: prev.lists.filter((l) => l.id !== id),
      currentListId: prev.currentListId === id ? '' : prev.currentListId,
    }));
  };

  const addTrackToPlaylist = (listId: string, trackId: string) => {
    setDb((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id === listId && !list.trackIds.includes(trackId)) {
          return { ...list, trackIds: [...list.trackIds, trackId] };
        }
        return list;
      }),
    }));
    setShowAddToPlaylist(false);
    setAddingTrack(null);
  };

  const removeTrackFromPlaylist = (listId: string, trackId: string) => {
    setDb((prev) => ({
      ...prev,
      lists: prev.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              trackIds: list.trackIds.filter((tid) => tid !== trackId),
            }
          : list
      ),
    }));
  };

  const selectPlaylist = (id: string) => {
    setDb((prev) => ({ ...prev, currentListId: id }));
  };

  const handleITunesSearch = async (query: string) => {
    setIsLoadingItunes(true);
    try {
      const results = await searchItunes(query);
      const tracks: Track[] = results
        .map(convertITunesToTrack)
        .filter((t): t is Track => t !== null);

      if (tracks.length === 0) {
        setIsLoadingItunes(false);
        setShowITunesSearch(false);
        alert('❌ 검색 결과가 없거나 previewUrl이 없는 곡만 있습니다.');
        return;
      }

      const existing = new Set(
        db.tracks.map((t) => `${safeLower(t.title)}_${safeLower(t.artist)}`)
      );
      const uniqueTracks = tracks.filter(
        (t) => !existing.has(`${safeLower(t.title)}_${safeLower(t.artist)}`)
      );

      if (uniqueTracks.length === 0) {
        setIsLoadingItunes(false);
        setShowITunesSearch(false);
        alert('ℹ️ 모든 곡이 이미 추가되어 있습니다.');
        return;
      }

      const newList: PList = {
        id: `list_${Date.now()}_${Math.random()}`,
        name: `Import: ${query}`,
        trackIds: uniqueTracks.map((t) => t.id),
        createdAt: Date.now(),
      };

      setDb((prev) => ({
        ...prev,
        tracks: [...prev.tracks, ...uniqueTracks],
        lists: [...prev.lists, newList],
        currentListId: newList.id,
      }));

      setIsLoadingItunes(false);
      setShowITunesSearch(false);
      alert(`✨ ${uniqueTracks.length}곡을 가져왔습니다!`);
    } catch (err) {
      console.error(err);
      setIsLoadingItunes(false);
      setShowITunesSearch(false);
      alert('❌ iTunes 검색에 실패했습니다. 네트워크를 확인해주세요.');
    }
  };

  const fetchStation = async (keyword: string) => {
    setLoadingMessage(`${keyword.toUpperCase()} 스테이션 로딩 중`);
    try {
      const query = DEFAULT_STATIONS[keyword as keyof typeof DEFAULT_STATIONS] || keyword;
      const results = await searchItunes(query);
      const tracks: Track[] = results
        .map(convertITunesToTrack)
        .filter((t): t is Track => t !== null);

      if (tracks.length === 0) {
        setLoadingMessage('');
        alert('❌ 스테이션 데이터를 불러올 수 없습니다.');
        return;
      }

      const existing = new Set(
        db.tracks.map((t) => `${safeLower(t.title)}_${safeLower(t.artist)}`)
      );
      const uniqueTracks = tracks.filter(
        (t) => !existing.has(`${safeLower(t.title)}_${safeLower(t.artist)}`)
      );

      if (uniqueTracks.length > 0) {
        const newList: PList = {
          id: `list_${Date.now()}_${Math.random()}`,
          name: `📻 ${keyword.toUpperCase()} Radio`,
          trackIds: uniqueTracks.map((t) => t.id),
          createdAt: Date.now(),
        };

        setDb((prev) => ({
          ...prev,
          tracks: [...prev.tracks, ...uniqueTracks],
          lists: [...prev.lists, newList],
        }));
      }

      const playable = tracks.filter((t) => t.url);
      if (playable.length > 0) {
        setDeckPlaylist(playable);
        setLastStation(keyword);
      }

      setLoadingMessage('');
      alert(`✨ ${keyword.toUpperCase()} 스테이션 로드 완료!`);
    } catch (err) {
      console.error(err);
      setLoadingMessage('');
      alert('❌ 스테이션 로드 실패');
    }
  };

  const showFavoritesList = () => {
    setShowFavorites(true);
  };

  const playDJFavFromDialog = (track: Track) => {
    setDeckPlaylist([track]);
    setShowFavorites(false);
  };

  const playAllFavorites = () => {
    const favs = db.tracks.filter((t) => t.fav && t.url);
    if (favs.length === 0) {
      alert('재생 가능한 즐겨찾기 곡이 없습니다.');
      return;
    }
    setDeckPlaylist(favs);
    setShowFavorites(false);
  };

  const playDJAll = () => {
    const filtered = getFilteredTracks();
    const playable = filtered.filter((t) => t.url);
    if (playable.length === 0) {
      alert('재생 가능한 곡이 없습니다.');
      return;
    }
    setDeckPlaylist(playable);
  };

  const playDJList = (listId: string) => {
    const list = db.lists.find((l) => l.id === listId);
    if (!list) return;
    const tracks = db.tracks.filter(
      (t) => list.trackIds.includes(t.id) && t.url
    );
    if (tracks.length === 0) {
      alert('재생 가능한 곡이 없습니다.');
      return;
    }
    setDeckPlaylist(tracks);
  };

  const playTrack = (track: Track) => {
    if (!track.url) {
      alert('재생 가능한 URL이 없습니다.');
      return;
    }
    setDeckPlaylist([track]);
  };

  const getFilteredTracks = (): Track[] => {
    let result = [...db.tracks];

    if (searchQuery.trim()) {
      const q = safeLower(searchQuery);
      result = result.filter(
        (t) =>
          safeLower(t.title).includes(q) ||
          safeLower(t.artist).includes(q) ||
          safeLower(t.album).includes(q) ||
          safeLower(t.genre).includes(q)
      );
    }

    if (genreFilter) {
      result = result.filter((t) => safeLower(t.genre) === safeLower(genreFilter));
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => b.addedAt - a.addedAt);
    } else if (sortBy === 'title') {
      result.sort((a, b) => safeLower(a.title).localeCompare(safeLower(b.title)));
    } else if (sortBy === 'artist') {
      result.sort((a, b) => safeLower(a.artist).localeCompare(safeLower(b.artist)));
    } else if (sortBy === 'fav') {
      result.sort((a, b) => (b.fav ? 1 : 0) - (a.fav ? 1 : 0));
    }

    return result;
  };

  const filteredTracks = getFilteredTracks();
  const genres = Array.from(
    new Set(db.tracks.map((t) => t.genre).filter((g): g is string => !!g))
  );

  const favoriteTracks = db.tracks.filter((t) => t.fav);

  if (showWelcome) {
    return <WelcomeScreen onStart={handleWelcomeStart} />;
  }

  return (
    <div className={`min-h-screen pb-32 transition-all duration-500 ${isPlaying ? 'playing-bg' : 'simple-bg'}`}>
      {/* 음악 재생 효과 */}
      <MusicVisualEffect isPlaying={isPlaying} />

      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          genreFilter={genreFilter}
          onGenreFilterChange={setGenreFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onAddTrack={() => {
            setEditingTrack(null);
            setShowAddTrack(true);
          }}
          onNewPlaylist={() => setShowNewPlaylist(true)}
          onDJFav={showFavoritesList}
          onDJAll={playDJAll}
          onFetchItunes={() => setShowITunesSearch(true)}
          onExportImport={() => setShowExportImport(true)}
          onStationClick={fetchStation}
          genres={genres}
        />

        <main className="max-w-7xl mx-auto p-4 lg:p-6 flex gap-6 flex-col lg:flex-row">
          <div className="flex-1">
            <TrackList
              tracks={filteredTracks}
              onPlay={playTrack}
              onToggleFav={toggleFav}
              onEdit={(track) => {
                setEditingTrack(track);
                setShowAddTrack(true);
              }}
              onDelete={deleteTrack}
              onAddToPlaylist={(track) => {
                setAddingTrack(track);
                setShowAddToPlaylist(true);
              }}
            />
          </div>
          <Sidebar
            lists={db.lists}
            tracks={db.tracks}
            currentListId={db.currentListId}
            onSelectList={selectPlaylist}
            onDeleteList={deletePlaylist}
            onPlayList={playDJList}
            onRemoveTrackFromList={removeTrackFromPlaylist}
          />
        </main>
      </div>

      {deckPlaylist.length > 0 && (
        <BottomDeck
          playlist={deckPlaylist}
          onClose={() => {
            setDeckPlaylist([]);
            setIsPlaying(false);
          }}
          initialVolume={volume}
          onVolumeChange={(vol) => {
            setVolume(vol);
            saveVolume(vol);
          }}
          onPlayingChange={setIsPlaying}
        />
      )}

      {showAddTrack && (
        <AddTrackDialog
          track={editingTrack}
          onSave={(data) => {
            if (editingTrack) {
              updateTrack(editingTrack.id, data);
            } else {
              addTrack(data);
            }
          }}
          onClose={() => {
            setShowAddTrack(false);
            setEditingTrack(null);
          }}
        />
      )}

      {showNewPlaylist && (
        <PlaylistDialog
          onSave={createPlaylist}
          onClose={() => setShowNewPlaylist(false)}
        />
      )}

      {showAddToPlaylist && addingTrack && (
        <AddToPlaylistDialog
          lists={db.lists}
          onAdd={(listId) => addTrackToPlaylist(listId, addingTrack.id)}
          onClose={() => {
            setShowAddToPlaylist(false);
            setAddingTrack(null);
          }}
        />
      )}

      {showExportImport && (
        <ExportImportDialog
          db={db}
          onImport={(importedDB) => {
            setDb(importedDB);
          }}
          onClose={() => setShowExportImport(false)}
        />
      )}

      {showFavorites && (
        <FavoritesDialog
          favorites={favoriteTracks}
          onPlay={playDJFavFromDialog}
          onPlayAll={playAllFavorites}
          onClose={() => setShowFavorites(false)}
        />
      )}

      {showITunesSearch && (
        <ITunesSearchDialog
          onSearch={handleITunesSearch}
          onClose={() => setShowITunesSearch(false)}
          isLoading={isLoadingItunes}
        />
      )}

      {(loadingMessage || isInitializing) && (
        <LoadingDialog message={loadingMessage || 'Summer Radio 준비 중...'} />
      )}
    </div>
  );
}
