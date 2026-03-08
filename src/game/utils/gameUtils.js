import { DEFAULT_DB } from '../data/defaultCharacters.js';

const DB_KEY = 'guessing_game_db';
const GAMES_KEY = 'guessing_game_sessions';

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

// ── Game session storage (short IDs) ────────────────────────────────────────

function loadGames() {
  try {
    const raw = localStorage.getItem(GAMES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveGames(games) {
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
}

export function saveGameSession(gameId, players) {
  const games = loadGames();
  games[gameId] = { players, createdAt: Date.now() };
  saveGames(games);
}

export function loadGameSession(gameId) {
  const games = loadGames();
  return games[gameId] || null;
}

export function updatePlayerInSession(gameId, playerIndex, updates) {
  const games = loadGames();
  if (!games[gameId]) return;
  games[gameId].players[playerIndex] = { ...games[gameId].players[playerIndex], ...updates };
  saveGames(games);
}

// ── Build per-player shareable links (short game ID) ────────────────────────

export function buildPlayerLinks(players, gamePageUrl) {
  const gameId = shortId();
  saveGameSession(gameId, players);
  return {
    gameId,
    links: players.map((_, i) => {
      const url = `${gamePageUrl}#play/${gameId}/${i}`;
      return { name: players[i].name, url };
    }),
  };
}

// ── Question log (per player, per game) ─────────────────────────────────────

const QLOG_KEY = 'guessing_game_questions';

function loadAllQuestionLogs() {
  try {
    const raw = localStorage.getItem(QLOG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveAllQuestionLogs(logs) {
  localStorage.setItem(QLOG_KEY, JSON.stringify(logs));
}

export function getQuestionLog(gameId, playerIndex) {
  const logs = loadAllQuestionLogs();
  const key = `${gameId}_${playerIndex}`;
  return logs[key] || [];
}

export function addQuestion(gameId, playerIndex, question) {
  const logs = loadAllQuestionLogs();
  const key = `${gameId}_${playerIndex}`;
  if (!logs[key]) logs[key] = [];
  logs[key].push({ text: question, time: Date.now() });
  saveAllQuestionLogs(logs);
  return logs[key];
}

export function removeQuestion(gameId, playerIndex, questionIndex) {
  const logs = loadAllQuestionLogs();
  const key = `${gameId}_${playerIndex}`;
  if (!logs[key]) return [];
  logs[key].splice(questionIndex, 1);
  saveAllQuestionLogs(logs);
  return logs[key];
}

// ── ID generator ───────────────────────────────────────────────────────────

export function shortId() {
  return Math.random().toString(36).slice(2, 8);
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
