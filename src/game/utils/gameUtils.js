import { DEFAULT_DB } from '../data/defaultCharacters.js';

const DB_KEY = 'guessing_game_db';

// ── Character database (localStorage) ──────────────────────────────────────

export function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return structuredClone(DEFAULT_DB);
}

export function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function resetDB() {
  localStorage.removeItem(DB_KEY);
  return structuredClone(DEFAULT_DB);
}

// ── All characters flat list ────────────────────────────────────────────────

export function getAllCharacters(db) {
  return db.categories.flatMap((cat) =>
    cat.characters.map((c) => ({ name: c, categoryName: cat.name, categoryId: cat.id }))
  );
}

export function getCharactersByCategory(db, categoryId) {
  const cat = db.categories.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.characters.map((c) => ({ name: c, categoryName: cat.name, categoryId: cat.id }));
}

// ── Random assignment ───────────────────────────────────────────────────────

export function assignCharacters(playerNames, db, categoryId = null) {
  const pool = categoryId ? getCharactersByCategory(db, categoryId) : getAllCharacters(db);
  if (pool.length === 0) throw new Error('אין דמויות בקטגוריה זו');

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return playerNames.map((name, i) => ({
    name,
    character: shuffled[i % shuffled.length].name,
    categoryName: shuffled[i % shuffled.length].categoryName,
  }));
}

// ── URL encode / decode ─────────────────────────────────────────────────────

export function encodeGame(players) {
  const json = JSON.stringify({ players, v: 1 });
  return btoa(encodeURIComponent(json));
}

export function decodeGame(encoded) {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// ── Build per-player shareable links ───────────────────────────────────────

export function buildPlayerLinks(players, gamePageUrl) {
  return players.map((_, i) => {
    const encoded = encodeGame(players);
    const url = `${gamePageUrl}#play/${encoded}/${i}`;
    return { name: players[i].name, url };
  });
}

// ── ID generator ───────────────────────────────────────────────────────────

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
