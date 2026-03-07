import { useState, useCallback } from 'react';
import { loadDB, assignCharacters, buildPlayerLinks, getAllCharacters } from '../utils/gameUtils.js';

function getGamePageUrl() {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
}

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0d1a 0%, #12122a 100%)',
    padding: '1.5rem',
    color: '#e0e0ff',
    fontFamily: 'Heebo, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#7b2ff7',
    fontSize: '1.5rem',
    cursor: 'pointer',
    fontFamily: 'Heebo, sans-serif',
  },
  h1: {
    fontSize: '1.8rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  section: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#a0a0cc',
    marginBottom: '.5rem',
    fontSize: '.9rem',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    padding: '.75rem 1rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
    marginBottom: '.75rem',
  },
  select: {
    width: '100%',
    padding: '.75rem 1rem',
    background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
    marginBottom: '1rem',
  },
  playerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '.75rem',
    padding: '.75rem 1rem',
    background: 'rgba(255,255,255,.04)',
    borderRadius: '10px',
    marginBottom: '.5rem',
    flexWrap: 'wrap',
  },
  playerName: {
    fontWeight: 700,
    flex: '0 0 auto',
    minWidth: '80px',
  },
  charBadge: {
    background: 'linear-gradient(90deg, rgba(123,47,247,.3), rgba(5,217,232,.2))',
    border: '1px solid rgba(123,47,247,.4)',
    borderRadius: '8px',
    padding: '.25rem .75rem',
    fontSize: '.95rem',
    flex: 1,
    minWidth: '120px',
  },
  catLabel: {
    color: '#a0a0cc',
    fontSize: '.75rem',
    flex: '0 0 auto',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ff2a6d',
    cursor: 'pointer',
    fontSize: '1.2rem',
    lineHeight: 1,
    padding: '0 .25rem',
    fontFamily: 'Heebo, sans-serif',
  },
  shuffleBtn: {
    background: 'rgba(123,47,247,.2)',
    border: '1px solid rgba(123,47,247,.5)',
    borderRadius: '8px',
    color: '#c084fc',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '.25rem .75rem',
    fontFamily: 'Heebo, sans-serif',
    marginRight: '.5rem',
  },
  addRowBtn: {
    background: 'rgba(5,217,232,.1)',
    border: '1px solid rgba(5,217,232,.3)',
    borderRadius: '8px',
    color: '#05d9e8',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '.5rem 1rem',
    fontFamily: 'Heebo, sans-serif',
    width: '100%',
    marginTop: '.5rem',
  },
  generateBtn: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
  },
  linkCard: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(5,217,232,.2)',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
  },
  linkName: {
    fontWeight: 700,
    color: '#05d9e8',
  },
  linkUrl: {
    fontSize: '.75rem',
    color: '#6060aa',
    wordBreak: 'break-all',
    direction: 'ltr',
    textAlign: 'left',
  },
  copyBtn: {
    alignSelf: 'flex-start',
    background: 'rgba(5,217,232,.15)',
    border: '1px solid rgba(5,217,232,.3)',
    borderRadius: '8px',
    color: '#05d9e8',
    cursor: 'pointer',
    fontSize: '.9rem',
    padding: '.3rem .9rem',
    fontFamily: 'Heebo, sans-serif',
  },
  copyAllBtn: {
    width: '100%',
    padding: '.75rem',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '1rem',
    background: 'transparent',
    border: '2px solid #7b2ff7',
    color: '#c084fc',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#e0e0ff',
  },
  errorMsg: {
    color: '#ff6b6b',
    padding: '.75rem',
    background: 'rgba(255,42,109,.1)',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '.9rem',
  },
  hint: {
    color: '#6060aa',
    fontSize: '.85rem',
    marginBottom: '1rem',
  },
  nameInputRow: {
    display: 'flex',
    gap: '.5rem',
    marginBottom: '.75rem',
  },
  nameInput: {
    flex: 1,
    padding: '.75rem 1rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
  },
  addBtn: {
    padding: '.75rem 1.2rem',
    background: 'rgba(123,47,247,.25)',
    border: '1px solid rgba(123,47,247,.5)',
    borderRadius: '10px',
    color: '#c084fc',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
    whiteSpace: 'nowrap',
  },
};

export default function SetupPage({ navigate }) {
  const db = loadDB();
  const [players, setPlayers] = useState([]);
  const [newName, setNewName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [links, setLinks] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState({});

  const addPlayer = useCallback(() => {
    const name = newName.trim();
    if (!name) return;
    setError('');
    try {
      const pool = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.characters || []
        : getAllCharacters(db).map((c) => c.name);
      if (pool.length === 0) { setError('אין דמויות בקטגוריה'); return; }
      const remaining = pool.filter(
        (c) => !players.some((p) => p.character === c)
      );
      const char = remaining.length > 0
        ? remaining[Math.floor(Math.random() * remaining.length)]
        : pool[Math.floor(Math.random() * pool.length)];
      const catName = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.name
        : getAllCharacters(db).find((c) => c.name === char)?.categoryName || '';
      setPlayers((prev) => [...prev, { name, character: char, categoryName: catName }]);
      setNewName('');
      setLinks(null);
    } catch (e) {
      setError(e.message);
    }
  }, [newName, players, categoryId, db]);

  const removePlayer = (i) => {
    setPlayers((prev) => prev.filter((_, idx) => idx !== i));
    setLinks(null);
  };

  const shuffleAll = () => {
    try {
      setPlayers(assignCharacters(players.map((p) => p.name), db, categoryId || null));
      setLinks(null);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const shuffleOne = (i) => {
    try {
      const pool = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.characters || []
        : getAllCharacters(db).map((c) => c.name);
      if (!pool.length) return;
      const others = players.filter((_, idx) => idx !== i).map((p) => p.character);
      const remaining = pool.filter((c) => !others.includes(c));
      const src = remaining.length > 1 ? remaining.filter(c => c !== players[i].character) : pool;
      const char = src[Math.floor(Math.random() * src.length)];
      const catName = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.name
        : getAllCharacters(db).find((c) => c.name === char)?.categoryName || '';
      setPlayers((prev) => prev.map((p, idx) => idx === i ? { ...p, character: char, categoryName: catName } : p));
      setLinks(null);
    } catch {}
  };

  const generateLinks = () => {
    if (players.length < 2) { setError('יש להוסיף לפחות 2 שחקנים'); return; }
    const gameUrl = getGamePageUrl();
    setLinks(buildPlayerLinks(players, gameUrl));
    setError('');
  };

  const copyLink = async (url, key) => {
    await navigator.clipboard.writeText(url);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const copyAll = async () => {
    if (!links) return;
    const text = links.map((l) => `${l.name}:\n${l.url}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, all: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, all: false })), 2000);
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button style={S.backBtn} onClick={() => navigate('home')}>← </button>
        <h1 style={S.h1}>הגדרת משחק</h1>
      </div>

      {/* Category filter */}
      <div style={S.section}>
        <div style={S.sectionTitle}>קטגוריית דמויות (אופציונלי)</div>
        <select
          style={S.select}
          value={categoryId}
          onChange={(e) => { setCategoryId(e.target.value); setLinks(null); }}
        >
          <option value="">כל הקטגוריות</option>
          {db.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name} ({cat.characters.length})</option>
          ))}
        </select>
      </div>

      {/* Add players */}
      <div style={S.section}>
        <div style={S.sectionTitle}>הוספת שחקנים</div>
        <p style={S.hint}>הוסף שחקן — כל שחקן מקבל דמות אקראית אוטומטית</p>
        <div style={S.nameInputRow}>
          <input
            style={S.nameInput}
            placeholder="שם השחקן"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          />
          <button style={S.addBtn} onClick={addPlayer}>+ הוסף</button>
        </div>

        {error && <div style={S.errorMsg}>{error}</div>}

        {players.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.75rem' }}>
              <span style={{ flex: 1, fontWeight: 600, color: '#a0a0cc', fontSize: '.9rem' }}>
                {players.length} שחקנים
              </span>
              <button style={S.shuffleBtn} onClick={shuffleAll}>🔀 ערבב הכל</button>
            </div>
            {players.map((p, i) => (
              <div key={i} style={S.playerRow}>
                <span style={S.playerName}>{p.name}</span>
                <span style={S.charBadge}>{p.character}</span>
                <span style={S.catLabel}>{p.categoryName}</span>
                <button style={S.shuffleBtn} onClick={() => shuffleOne(i)} title="החלף דמות">🔀</button>
                <button style={S.removeBtn} onClick={() => removePlayer(i)}>✕</button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Generate */}
      <button style={S.generateBtn} onClick={generateLinks}>
        🔗 צור קישורים לשיתוף
      </button>

      {/* Links */}
      {links && (
        <div style={S.section}>
          <div style={S.sectionTitle}>קישורים אישיים לשחקנים</div>
          <p style={S.hint}>שלח לכל שחקן את הקישור האישי שלו (למשל בוואטסאפ). כל שחקן יראה את הדמויות של כולם — חוץ מהשלו.</p>
          <button style={S.copyAllBtn} onClick={copyAll}>
            {copied.all ? '✓ הועתקו!' : '📋 העתק את כל הקישורים'}
          </button>
          {links.map((l, i) => (
            <div key={i} style={S.linkCard}>
              <div style={S.linkName}>👤 {l.name}</div>
              <div style={S.linkUrl}>{l.url}</div>
              <button style={S.copyBtn} onClick={() => copyLink(l.url, i)}>
                {copied[i] ? '✓ הועתק!' : '📋 העתק'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
