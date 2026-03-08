import { DEFAULT_DB } from '../data/defaultCharacters.js';

const DB_KEY = 'guessing_game_db';
const QLOG_KEY = 'guessing_game_questions';

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

// ── Compact URL encode / decode ─────────────────────────────────────────────
// Uses short keys: p=players, n=name, c=character, t=categoryName
// This keeps URLs as short as possible for QR codes.

export function encodeGame(players) {
  const compact = players.map((p) => ({
    n: p.name,
    c: p.character,
    t: p.categoryName || '',
  }));
  const json = JSON.stringify(compact);
  // Use encodeURIComponent to handle Hebrew, then btoa for URL-safe base64
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeGame(encoded) {
  try {
    const json = decodeURIComponent(escape(atob(encoded)));
    const compact = JSON.parse(json);
    if (!Array.isArray(compact)) return null;
    const players = compact.map((p) => ({
      name: p.n,
      character: p.c,
      categoryName: p.t || '',
    }));
    return { players };
  } catch {
    return null;
  }
}

// ── Build the single game URL ───────────────────────────────────────────────

export function buildGameUrl(players, gamePageUrl) {
  const encoded = encodeGame(players);
  return `${gamePageUrl}#play/${encoded}`;
}

// ── Question log (per encoded-game hash + player name, in localStorage) ─────

function questionKey(gameHash, playerName) {
  // Use first 12 chars of encoded data + player name as key
  return `q_${gameHash.slice(0, 12)}_${playerName}`;
}

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

export function getQuestionLog(gameHash, playerName) {
  const logs = loadAllQuestionLogs();
  const key = questionKey(gameHash, playerName);
  return logs[key] || [];
}

export function addQuestion(gameHash, playerName, question) {
  const logs = loadAllQuestionLogs();
  const key = questionKey(gameHash, playerName);
  if (!logs[key]) logs[key] = [];
  logs[key].push({ text: question, time: Date.now() });
  saveAllQuestionLogs(logs);
  return logs[key];
}

export function removeQuestion(gameHash, playerName, questionIndex) {
  const logs = loadAllQuestionLogs();
  const key = questionKey(gameHash, playerName);
  if (!logs[key]) return [];
  logs[key].splice(questionIndex, 1);
  saveAllQuestionLogs(logs);
  return logs[key];
}
