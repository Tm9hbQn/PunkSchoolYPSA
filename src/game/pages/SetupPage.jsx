import { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { loadDB, assignCharacters, getAllCharacters } from '../utils/gameUtils.js';
import { generateRoomId, publish, subscribe } from '../utils/gameSync.js';
import GameView from '../components/GameView.jsx';

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
    display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem',
    animation: 'fadeInUp 0.5s ease-out',
  },
  backBtn: {
    background: 'none', border: 'none', color: '#7b2ff7',
    fontSize: '1.5rem', cursor: 'pointer', fontFamily: 'Heebo, sans-serif',
  },
  h1: {
    fontSize: '1.8rem', fontWeight: 800,
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  section: {
    background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
    animation: 'fadeInUp 0.6s ease-out',
  },
  sectionTitle: { fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#e0e0ff' },
  hint: { color: '#6060aa', fontSize: '.85rem', marginBottom: '1rem' },
  select: {
    width: '100%', padding: '.75rem 1rem', background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,.15)', borderRadius: '10px',
    color: '#e0e0ff', fontSize: '1rem', fontFamily: 'Heebo, sans-serif',
    outline: 'none', marginBottom: '1rem',
  },
  nameInput: {
    flex: 1, padding: '.75rem 1rem',
    background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px', color: '#e0e0ff', fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif', outline: 'none',
  },
  addBtn: {
    padding: '.75rem 1.2rem', background: 'rgba(123,47,247,.25)',
    border: '1px solid rgba(123,47,247,.5)', borderRadius: '10px',
    color: '#c084fc', cursor: 'pointer', fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif', whiteSpace: 'nowrap',
  },
  qrSection: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    padding: '2rem 1rem', background: 'rgba(255,255,255,.04)',
    border: '2px solid rgba(123,47,247,.4)', borderRadius: '20px',
    marginBottom: '1.5rem', animation: 'fadeInScale 0.5s ease-out',
  },
  qrTitle: { fontWeight: 800, fontSize: '1.4rem', color: '#c084fc', textAlign: 'center' },
  qrSubtitle: { color: '#a0a0cc', fontSize: '.9rem', textAlign: 'center', lineHeight: 1.6 },
  qrWrap: {
    background: '#fff', padding: '16px', borderRadius: '16px',
    animation: 'pulseGlow 3s ease-in-out infinite',
  },
  linkBox: {
    width: '100%', maxWidth: '500px', display: 'flex', gap: '.5rem', alignItems: 'stretch',
  },
  linkText: {
    flex: 1, padding: '.6rem .8rem', background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,.15)', borderRadius: '10px',
    color: '#6060aa', fontSize: '.7rem', fontFamily: 'monospace',
    direction: 'ltr', textAlign: 'left', wordBreak: 'break-all', overflow: 'hidden',
  },
  copyBtn: {
    padding: '.6rem 1rem', background: 'rgba(5,217,232,.15)',
    border: '1px solid rgba(5,217,232,.3)', borderRadius: '10px',
    color: '#05d9e8', cursor: 'pointer', fontSize: '.9rem',
    fontFamily: 'Heebo, sans-serif', whiteSpace: 'nowrap', transition: 'transform 0.15s',
  },
  playerChip: {
    display: 'inline-flex', alignItems: 'center', gap: '.4rem',
    padding: '.5rem .9rem', background: 'rgba(123,47,247,.15)',
    border: '1px solid rgba(123,47,247,.35)', borderRadius: '20px',
    margin: '0 .3rem .5rem 0', fontSize: '1rem', fontWeight: 600,
    animation: 'fadeInScale 0.3s ease-out',
  },
  playerCount: { fontWeight: 600, color: '#a0a0cc', fontSize: '.9rem', marginBottom: '.75rem' },
  startBtn: {
    width: '100%', padding: '1rem', fontSize: '1.3rem', fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer',
    marginBottom: '1rem', transition: 'transform 0.2s, box-shadow 0.2s',
  },
  adminPlayBtn: {
    width: '100%', padding: '.75rem', fontSize: '1.1rem', fontWeight: 600,
    fontFamily: 'Heebo, sans-serif',
    background: 'rgba(5,217,232,.15)', border: '2px solid rgba(5,217,232,.4)',
    color: '#05d9e8', borderRadius: '12px', cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  errorMsg: {
    color: '#ff6b6b', padding: '.75rem', background: 'rgba(255,42,109,.1)',
    borderRadius: '8px', marginBottom: '1rem', fontSize: '.9rem',
    animation: 'fadeInScale 0.3s ease-out',
  },
  dot: {
    display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%',
    background: '#05d9e8', marginLeft: '.5rem', animation: 'sparkle 1.5s ease-in-out infinite',
  },
};

export default function SetupPage({ navigate }) {
  const db = loadDB();
  const [phase, setPhase] = useState('lobby'); // 'lobby' | 'playing'
  const [roomId] = useState(() => generateRoomId());
  const [names, setNames] = useState([]);
  const [myName, setMyName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [players, setPlayers] = useState(null); // assigned players (with characters)
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const namesRef = useRef(names);
  const playersRef = useRef(players);

  // Keep refs in sync
  useEffect(() => { namesRef.current = names; }, [names]);
  useEffect(() => { playersRef.current = players; }, [players]);

  // Subscribe to room messages
  useEffect(() => {
    const unsub = subscribe(roomId, (data) => {
      if (data.type === 'join') {
        // Player wants to join — add their name if not already in
        setNames((prev) => {
          if (prev.includes(data.name)) return prev;
          const updated = [...prev, data.name];
          // Publish updated lobby state
          setTimeout(() => {
            publish(roomId, {
              type: 'state',
              phase: 'lobby',
              names: updated,
            });
          }, 100);
          return updated;
        });
      }
      if (data.type === 'newchar') {
        // Player requests new character — assign and broadcast
        const currentPlayers = playersRef.current;
        if (!currentPlayers) return;
        const idx = currentPlayers.findIndex((p) => p.name === data.name);
        if (idx === -1) return;
        const allChars = getAllCharacters(db);
        const usedChars = currentPlayers.map((p) => p.character);
        const remaining = allChars.filter((c) => !usedChars.includes(c.name));
        const pool = remaining.length > 0 ? remaining : allChars;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const updated = [...currentPlayers];
        updated[idx] = { ...updated[idx], character: pick.name, categoryName: pick.categoryName };
        setPlayers(updated);
        playersRef.current = updated;
        publish(roomId, {
          type: 'state',
          phase: 'playing',
          players: updated,
        });
      }
    });
    return unsub;
  }, [roomId, db]);

  // Publish initial lobby state
  useEffect(() => {
    publish(roomId, { type: 'state', phase: 'lobby', names: [] });
  }, [roomId]);

  const lobbyUrl = `${getGamePageUrl()}#lobby/${roomId}`;

  const addMyName = () => {
    const name = myName.trim();
    if (!name) return;
    if (names.includes(name)) { setError('השם כבר קיים'); return; }
    const updated = [...names, name];
    setNames(updated);
    setMyName('');
    setError('');
    publish(roomId, { type: 'state', phase: 'lobby', names: updated });
  };

  const startGame = useCallback(() => {
    if (names.length < 2) { setError('יש להמתין לפחות ל-2 שחקנים'); return; }
    try {
      const assigned = assignCharacters(names, db, categoryId || null);
      setPlayers(assigned);
      playersRef.current = assigned;
      setPhase('playing');
      setError('');
      // Broadcast game start
      publish(roomId, { type: 'state', phase: 'playing', players: assigned });
    } catch (e) {
      setError(e.message);
    }
  }, [names, db, categoryId, roomId]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(lobbyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdminNewChar = () => {
    if (!players || !myName.trim()) return;
    const adminNameInGame = names[0]; // Admin is typically the first name, but could be any
    // Find admin's name — we need a known admin name. Use the first name added by admin.
    // Actually, let the admin enter their name to play
  };

  // ── Playing phase: show game view ──
  if (phase === 'playing' && players) {
    // Admin needs to pick their name if they want to play
    const adminName = names[0]; // first name is typically the admin
    return (
      <div>
        {/* Admin can enter as any player — show a name picker if not already chosen */}
        <AdminGameView
          players={players}
          names={names}
          roomId={roomId}
          db={db}
          playersRef={playersRef}
          setPlayers={setPlayers}
        />
      </div>
    );
  }

  // ── Lobby phase ──
  return (
    <div style={S.page}>
      <div style={S.header}>
        <button style={S.backBtn} onClick={() => navigate('home')}>←</button>
        <h1 style={S.h1}>יצירת משחק</h1>
      </div>

      {/* QR Code — always visible */}
      <div style={S.qrSection}>
        <div style={S.qrTitle}>📱 שלב 1: שחקנים מצטרפים</div>
        <div style={S.qrSubtitle}>
          הראה את ה-QR לחברים — כל אחד סורק ורושם את שמו
        </div>
        <div style={S.qrWrap}>
          <QRCodeSVG
            value={lobbyUrl}
            size={200}
            bgColor="#ffffff"
            fgColor="#0d0d1a"
            level="L"
            includeMargin={false}
          />
        </div>
        <div style={S.linkBox}>
          <div style={S.linkText}>{lobbyUrl}</div>
          <button style={S.copyBtn} onClick={copyLink}>
            {copied ? '✓ הועתק!' : '📋 העתק'}
          </button>
        </div>
      </div>

      {/* Category */}
      <div style={S.section}>
        <div style={S.sectionTitle}>קטגוריה (אופציונלי)</div>
        <select style={S.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">כל הקטגוריות</option>
          {db.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name} ({cat.characters.length})</option>
          ))}
        </select>
      </div>

      {/* Admin can also add their own name */}
      <div style={S.section}>
        <div style={S.sectionTitle}>הוסף את עצמך (או שחקן נוסף)</div>
        <p style={S.hint}>אפשר גם להוסיף שמות ידנית מכאן</p>
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.75rem' }}>
          <input
            style={S.nameInput}
            placeholder="שם השחקן"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMyName()}
          />
          <button style={S.addBtn} onClick={addMyName}>+ הוסף</button>
        </div>
        {error && <div style={S.errorMsg}>{error}</div>}
      </div>

      {/* Player list */}
      <div style={S.section}>
        <div style={S.sectionTitle}>
          שחקנים שהצטרפו
          <span style={S.dot} />
        </div>
        {names.length === 0 ? (
          <p style={S.hint}>ממתין לשחקנים... כשמישהו סורק את ה-QR ורושם את שמו, הוא יופיע כאן</p>
        ) : (
          <>
            <div style={S.playerCount}>{names.length} שחקנים</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {names.map((n, i) => (
                <div key={i} style={S.playerChip}>
                  <span>{['🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻', '🎹'][i % 8]}</span>
                  <span>{n}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Start game */}
      <button
        style={{
          ...S.startBtn,
          opacity: names.length < 2 ? 0.5 : 1,
          cursor: names.length < 2 ? 'not-allowed' : 'pointer',
        }}
        disabled={names.length < 2}
        onClick={startGame}
        onMouseEnter={(e) => { if (names.length >= 2) { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 30px rgba(123,47,247,.5)'; } }}
        onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
      >
        🎮 שלב 2: התחל משחק! ({names.length} שחקנים)
      </button>
    </div>
  );
}

// ── Admin's game view with name picker ──
function AdminGameView({ players, names, roomId, db, playersRef, setPlayers }) {
  const [chosenName, setChosenName] = useState(null);

  const handleNewCharacter = () => {
    if (!chosenName) return;
    const allChars = getAllCharacters(db);
    const usedChars = players.map((p) => p.character);
    const remaining = allChars.filter((c) => !usedChars.includes(c.name));
    const pool = remaining.length > 0 ? remaining : allChars;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const idx = players.findIndex((p) => p.name === chosenName);
    if (idx === -1) return;
    const updated = [...players];
    updated[idx] = { ...updated[idx], character: pick.name, categoryName: pick.categoryName };
    setPlayers(updated);
    playersRef.current = updated;
    publish(roomId, { type: 'state', phase: 'playing', players: updated });
  };

  if (!chosenName) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d0d1a 0%, #12122a 100%)',
        padding: '2rem', fontFamily: 'Heebo, sans-serif', color: '#e0e0ff', gap: '1.5rem',
      }}>
        <div style={{ fontSize: '4rem', animation: 'floatBounce 3s ease-in-out infinite' }}>🎭</div>
        <div style={{
          fontSize: '1.8rem', fontWeight: 800,
          background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          המשחק התחיל!
        </div>
        <div style={{ color: '#a0a0cc', fontSize: '1rem', textAlign: 'center' }}>
          בחר את השם שלך כדי להיכנס למשחק
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1rem', width: '100%', maxWidth: '500px',
        }}>
          {names.map((n, i) => (
            <button
              key={i}
              onClick={() => setChosenName(n)}
              style={{
                padding: '1.2rem .75rem', background: 'rgba(123,47,247,.12)',
                border: '2px solid rgba(123,47,247,.35)', borderRadius: '14px',
                color: '#e0e0ff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700,
                fontFamily: 'Heebo, sans-serif', textAlign: 'center',
                transition: 'transform 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.borderColor = '#7b2ff7'; e.target.style.background = 'rgba(123,47,247,.25)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.borderColor = 'rgba(123,47,247,.35)'; e.target.style.background = 'rgba(123,47,247,.12)'; }}
            >
              {['🦁', '🐯', '🦊', '🐺', '🦅', '🐻', '🦋', '🐲', '🦄', '🌙', '⚡', '🔥'][i % 12]} {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <GameView
      players={players}
      myName={chosenName}
      gameHash={roomId}
      onNewCharacter={handleNewCharacter}
    />
  );
}
