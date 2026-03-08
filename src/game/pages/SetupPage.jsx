import { useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
    animation: 'fadeInUp 0.5s ease-out',
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
    animation: 'fadeInUp 0.6s ease-out',
  },
  label: {
    display: 'block',
    color: '#a0a0cc',
    marginBottom: '.5rem',
    fontSize: '.9rem',
    fontWeight: 600,
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
    animation: 'slideInRight 0.3s ease-out',
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
    transition: 'transform 0.2s, box-shadow 0.2s',
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
    animation: 'fadeInUp 0.4s ease-out',
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
    transition: 'transform 0.15s',
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
    transition: 'background 0.2s',
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
    animation: 'fadeInScale 0.3s ease-out',
  },
  hint: {
    color: '#6060aa',
    fontSize: '.85rem',
    marginBottom: '1rem',
  },
  qrSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem 1rem',
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(123,47,247,.3)',
    borderRadius: '16px',
    marginBottom: '1.5rem',
    animation: 'fadeInScale 0.5s ease-out',
  },
  qrTitle: {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#c084fc',
    textAlign: 'center',
  },
  qrSubtitle: {
    color: '#6060aa',
    fontSize: '.85rem',
    textAlign: 'center',
  },
  qrWrap: {
    background: '#fff',
    padding: '16px',
    borderRadius: '12px',
    animation: 'pulseGlow 3s ease-in-out infinite',
  },
  adminCheckRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '.6rem',
    padding: '.75rem 1rem',
    background: 'rgba(255,107,53,.08)',
    border: '1px solid rgba(255,107,53,.25)',
    borderRadius: '10px',
    marginBottom: '.75rem',
    cursor: 'pointer',
  },
  adminCheckLabel: {
    color: '#ff6b35',
    fontSize: '.9rem',
    fontWeight: 600,
    userSelect: 'none',
  },
  adminBadge: {
    background: 'rgba(255,107,53,.15)',
    border: '1px solid rgba(255,107,53,.4)',
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '.7rem',
    color: '#ff6b35',
    marginRight: '.5rem',
  },
};

export default function SetupPage({ navigate }) {
  const db = loadDB();
  const [players, setPlayers] = useState([]);
  const [newName, setNewName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [linksData, setLinksData] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState({});
  const [adminName, setAdminName] = useState('');
  const [includeAdmin, setIncludeAdmin] = useState(false);

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
      setLinksData(null);
    } catch (e) {
      setError(e.message);
    }
  }, [newName, players, categoryId, db]);

  const removePlayer = (i) => {
    setPlayers((prev) => prev.filter((_, idx) => idx !== i));
    setLinksData(null);
  };

  const shuffleAll = () => {
    try {
      setPlayers(assignCharacters(players.map((p) => p.name), db, categoryId || null));
      setLinksData(null);
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
      setLinksData(null);
    } catch {}
  };

  const generateLinks = () => {
    let allPlayers = [...players];

    // Add admin as a player if requested
    if (includeAdmin && adminName.trim()) {
      const pool = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.characters || []
        : getAllCharacters(db).map((c) => c.name);
      const usedChars = allPlayers.map(p => p.character);
      const remaining = pool.filter((c) => !usedChars.includes(c));
      const char = remaining.length > 0
        ? remaining[Math.floor(Math.random() * remaining.length)]
        : pool[Math.floor(Math.random() * pool.length)];
      const catName = categoryId
        ? db.categories.find((c) => c.id === categoryId)?.name
        : getAllCharacters(db).find((c) => c.name === char)?.categoryName || '';
      // Admin is added as the last player, marked as admin
      allPlayers.push({ name: adminName.trim(), character: char, categoryName: catName, isAdmin: true });
    }

    if (allPlayers.length < 2) { setError('יש להוסיף לפחות 2 שחקנים'); return; }
    const gameUrl = getGamePageUrl();
    const result = buildPlayerLinks(allPlayers, gameUrl);
    setLinksData(result);
    setError('');
  };

  const copyLink = async (url, key) => {
    await navigator.clipboard.writeText(url);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const copyAll = async () => {
    if (!linksData) return;
    const text = linksData.links.map((l) => `${l.name}:\n${l.url}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, all: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, all: false })), 2000);
  };

  // Build a general join URL (just points to the game, users pick their name)
  const generalJoinUrl = linksData
    ? `${getGamePageUrl()}#play/${linksData.gameId}/join`
    : null;

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
          onChange={(e) => { setCategoryId(e.target.value); setLinksData(null); }}
        >
          <option value="">כל הקטגוריות</option>
          {db.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name} ({cat.characters.length})</option>
          ))}
        </select>
      </div>

      {/* Admin as player */}
      <div style={S.section}>
        <div style={S.sectionTitle}>מנהל המשחק (אופציונלי)</div>
        <p style={S.hint}>רוצה להשתתף במשחק בעצמך? הוסף את שמך כאן — לא תראה את הדמות שלך.</p>
        <div
          style={S.adminCheckRow}
          onClick={() => setIncludeAdmin(!includeAdmin)}
        >
          <input
            type="checkbox"
            checked={includeAdmin}
            onChange={(e) => setIncludeAdmin(e.target.checked)}
            style={{ accentColor: '#ff6b35', width: '18px', height: '18px' }}
          />
          <span style={S.adminCheckLabel}>אני רוצה להשתתף במשחק</span>
        </div>
        {includeAdmin && (
          <input
            style={S.nameInput}
            placeholder="השם שלך"
            value={adminName}
            onChange={(e) => { setAdminName(e.target.value); setLinksData(null); }}
          />
        )}
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
      <button
        style={S.generateBtn}
        onClick={generateLinks}
        onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 30px rgba(123,47,247,.5)'; }}
        onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
      >
        🔗 צור קישורים לשיתוף
      </button>

      {/* QR Code for joining */}
      {linksData && generalJoinUrl && (
        <div style={S.qrSection}>
          <div style={S.qrTitle}>📱 סרקו QR כדי להצטרף למשחק</div>
          <div style={S.qrSubtitle}>הראה את הקוד לחברים — הם יבחרו את השם שלהם</div>
          <div style={S.qrWrap}>
            <QRCodeSVG
              value={generalJoinUrl}
              size={200}
              bgColor="#ffffff"
              fgColor="#0d0d1a"
              level="M"
              includeMargin={false}
            />
          </div>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              style={S.copyBtn}
              onClick={() => copyLink(generalJoinUrl, 'qr')}
            >
              {copied.qr ? '✓ הועתק!' : '📋 העתק קישור כללי'}
            </button>
          </div>
        </div>
      )}

      {/* Links */}
      {linksData && (
        <div style={S.section}>
          <div style={S.sectionTitle}>קישורים אישיים לשחקנים</div>
          <p style={S.hint}>שלח לכל שחקן את הקישור האישי שלו (למשל בוואטסאפ). כל שחקן יראה את הדמויות של כולם — חוץ מהשלו.</p>
          <button style={S.copyAllBtn} onClick={copyAll}>
            {copied.all ? '✓ הועתקו!' : '📋 העתק את כל הקישורים'}
          </button>
          {linksData.links.map((l, i) => (
            <div key={i} style={S.linkCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span style={S.linkName}>👤 {l.name}</span>
                {linksData.links.length > 0 && i === linksData.links.length - 1 && includeAdmin && (
                  <span style={S.adminBadge}>מנהל</span>
                )}
              </div>
              <div style={S.linkUrl}>{l.url}</div>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <button style={S.copyBtn} onClick={() => copyLink(l.url, i)}>
                  {copied[i] ? '✓ הועתק!' : '📋 העתק'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
