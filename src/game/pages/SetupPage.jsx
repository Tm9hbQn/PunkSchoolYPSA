import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { loadDB, assignCharacters, buildGameUrl } from '../utils/gameUtils.js';

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
  sectionTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#e0e0ff',
  },
  hint: {
    color: '#6060aa',
    fontSize: '.85rem',
    marginBottom: '1rem',
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
  playerChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.4rem',
    padding: '.4rem .8rem',
    background: 'rgba(123,47,247,.15)',
    border: '1px solid rgba(123,47,247,.35)',
    borderRadius: '20px',
    margin: '0 .3rem .4rem 0',
    fontSize: '.95rem',
    fontWeight: 600,
    animation: 'fadeInScale 0.3s ease-out',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    fontSize: '.85rem',
    lineHeight: 1,
    padding: '0',
    fontFamily: 'Heebo, sans-serif',
  },
  startBtn: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.3rem',
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
  errorMsg: {
    color: '#ff6b6b',
    padding: '.75rem',
    background: 'rgba(255,42,109,.1)',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '.9rem',
    animation: 'fadeInScale 0.3s ease-out',
  },
  // QR result area
  qrSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '2rem 1rem',
    background: 'rgba(255,255,255,.04)',
    border: '2px solid rgba(123,47,247,.4)',
    borderRadius: '20px',
    marginBottom: '1.5rem',
    animation: 'fadeInScale 0.5s ease-out',
  },
  qrTitle: {
    fontWeight: 800,
    fontSize: '1.4rem',
    color: '#c084fc',
    textAlign: 'center',
  },
  qrSubtitle: {
    color: '#a0a0cc',
    fontSize: '.9rem',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  qrWrap: {
    background: '#fff',
    padding: '16px',
    borderRadius: '16px',
    animation: 'pulseGlow 3s ease-in-out infinite',
  },
  linkBox: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    gap: '.5rem',
    alignItems: 'stretch',
  },
  linkText: {
    flex: 1,
    padding: '.6rem .8rem',
    background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#6060aa',
    fontSize: '.7rem',
    fontFamily: 'monospace',
    direction: 'ltr',
    textAlign: 'left',
    wordBreak: 'break-all',
    overflow: 'hidden',
  },
  copyBtn: {
    padding: '.6rem 1rem',
    background: 'rgba(5,217,232,.15)',
    border: '1px solid rgba(5,217,232,.3)',
    borderRadius: '10px',
    color: '#05d9e8',
    cursor: 'pointer',
    fontSize: '.9rem',
    fontFamily: 'Heebo, sans-serif',
    whiteSpace: 'nowrap',
    transition: 'transform 0.15s',
  },
  playersCount: {
    fontWeight: 600,
    color: '#a0a0cc',
    fontSize: '.9rem',
    marginBottom: '.75rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    padding: '.6rem 0',
    fontSize: '.9rem',
    color: '#a0a0cc',
  },
  stepNum: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(123,47,247,.3)',
    color: '#c084fc',
    fontWeight: 700,
    fontSize: '.85rem',
    flexShrink: 0,
  },
};

export default function SetupPage({ navigate }) {
  const db = loadDB();
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const addName = () => {
    const name = newName.trim();
    if (!name) return;
    if (names.includes(name)) { setError('השם כבר קיים ברשימה'); return; }
    setNames((prev) => [...prev, name]);
    setNewName('');
    setGameUrl('');
    setError('');
  };

  const removeName = (i) => {
    setNames((prev) => prev.filter((_, idx) => idx !== i));
    setGameUrl('');
  };

  const startGame = () => {
    if (names.length < 2) { setError('יש להוסיף לפחות 2 שחקנים'); return; }
    try {
      const players = assignCharacters(names, db, categoryId || null);
      const url = buildGameUrl(players, getGamePageUrl());
      setGameUrl(url);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(gameUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button style={S.backBtn} onClick={() => navigate('home')}>←</button>
        <h1 style={S.h1}>יצירת משחק</h1>
      </div>

      {/* Game not started yet — setup phase */}
      {!gameUrl && (
        <>
          {/* Category */}
          <div style={S.section}>
            <div style={S.sectionTitle}>בחר קטגוריה (אופציונלי)</div>
            <select
              style={S.select}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">כל הקטגוריות</option>
              {db.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name} ({cat.characters.length})</option>
              ))}
            </select>
          </div>

          {/* Add player names */}
          <div style={S.section}>
            <div style={S.sectionTitle}>הוסף שחקנים (כולל את עצמך!)</div>
            <p style={S.hint}>
              רשום את שמות כל המשתתפים. אף אחד לא יראה את הדמות שלו — רק של האחרים.
            </p>

            <div style={S.nameInputRow}>
              <input
                style={S.nameInput}
                placeholder="שם השחקן"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addName()}
              />
              <button style={S.addBtn} onClick={addName}>+ הוסף</button>
            </div>

            {error && <div style={S.errorMsg}>{error}</div>}

            {names.length > 0 && (
              <>
                <div style={S.playersCount}>{names.length} שחקנים</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {names.map((n, i) => (
                    <div key={i} style={S.playerChip}>
                      <span>{n}</span>
                      <button style={S.removeBtn} onClick={() => removeName(i)}>✕</button>
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
            🎮 התחל משחק!
          </button>
        </>
      )}

      {/* Game started — show QR + link */}
      {gameUrl && (
        <>
          <div style={S.qrSection}>
            <div style={S.qrTitle}>📱 המשחק מוכן!</div>
            <div style={S.qrSubtitle}>
              כל השחקנים סורקים את ה-QR או פותחים את הלינק
              <br />
              ובוחרים את השם שלהם
            </div>
            <div style={S.qrWrap}>
              <QRCodeSVG
                value={gameUrl}
                size={220}
                bgColor="#ffffff"
                fgColor="#0d0d1a"
                level="L"
                includeMargin={false}
              />
            </div>
            <div style={S.linkBox}>
              <div style={S.linkText}>{gameUrl}</div>
              <button style={S.copyBtn} onClick={copyLink}>
                {copied ? '✓ הועתק!' : '📋 העתק'}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div style={S.section}>
            <div style={S.sectionTitle}>איך זה עובד?</div>
            <div style={S.step}>
              <span style={S.stepNum}>1</span>
              <span>כל שחקן סורק את ה-QR או פותח את הלינק</span>
            </div>
            <div style={S.step}>
              <span style={S.stepNum}>2</span>
              <span>כל אחד בוחר את השם שלו מהרשימה</span>
            </div>
            <div style={S.step}>
              <span style={S.stepNum}>3</span>
              <span>כל שחקן רואה את הדמויות של כולם — חוץ משלו</span>
            </div>
            <div style={S.step}>
              <span style={S.stepNum}>4</span>
              <span>שואלים שאלות ומנסים לנחש!</span>
            </div>
          </div>

          {/* New game button */}
          <button
            style={{ ...S.startBtn, background: 'rgba(123,47,247,.2)', color: '#c084fc', border: '1px solid rgba(123,47,247,.5)' }}
            onClick={() => { setGameUrl(''); setNames([]); }}
          >
            🔄 משחק חדש
          </button>
        </>
      )}
    </div>
  );
}
