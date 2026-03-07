import { useMemo } from 'react';
import { decodeGame } from '../utils/gameUtils.js';

const EMOJI_BG = ['#1a0a2e', '#0a1a2e', '#0a2e1a', '#2e0a0a', '#1a2e0a', '#2e1a0a'];

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0d0d1a 0%, #12122a 100%)',
    padding: '1rem',
    fontFamily: 'Heebo, sans-serif',
    color: '#e0e0ff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    paddingTop: '.5rem',
  },
  gameTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7, #05d9e8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '.25rem',
  },
  subTitle: {
    color: '#6060aa',
    fontSize: '.85rem',
  },
  myCard: {
    background: 'linear-gradient(135deg, rgba(123,47,247,.15), rgba(255,42,109,.1))',
    border: '2px solid rgba(123,47,247,.6)',
    borderRadius: '20px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  myCardGlow: {
    position: 'absolute',
    top: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(123,47,247,.4), transparent)',
    pointerEvents: 'none',
  },
  myLabel: {
    color: '#a0a0cc',
    fontSize: '.9rem',
    marginBottom: '.5rem',
  },
  myName: {
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#e0e0ff',
    marginBottom: '1rem',
  },
  hiddenBadge: {
    display: 'inline-block',
    background: 'rgba(255,42,109,.15)',
    border: '2px dashed rgba(255,42,109,.5)',
    borderRadius: '12px',
    padding: '1rem 2rem',
    fontSize: '1.8rem',
    letterSpacing: '8px',
    color: 'rgba(255,42,109,.7)',
  },
  hiddenText: {
    display: 'block',
    fontSize: '.85rem',
    color: '#ff2a6d',
    marginTop: '.5rem',
    letterSpacing: '0',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    color: '#a0a0cc',
    fontSize: '.85rem',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'rgba(255,255,255,.1)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '.75rem',
  },
  card: {
    borderRadius: '16px',
    padding: '1rem',
    border: '1px solid rgba(255,255,255,.1)',
    textAlign: 'center',
    transition: 'transform .15s',
  },
  cardEmoji: {
    fontSize: '2.5rem',
    marginBottom: '.5rem',
  },
  cardPlayerName: {
    fontSize: '.85rem',
    color: '#a0a0cc',
    marginBottom: '.3rem',
    fontWeight: 600,
  },
  cardCharacter: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#e0e0ff',
    lineHeight: 1.3,
  },
  cardCategory: {
    fontSize: '.7rem',
    color: '#6060aa',
    marginTop: '.3rem',
  },
  errorWrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0d1a',
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Heebo, sans-serif',
    color: '#e0e0ff',
    gap: '1rem',
  },
  backBtn: {
    marginTop: '1rem',
    background: 'rgba(123,47,247,.2)',
    border: '1px solid rgba(123,47,247,.5)',
    borderRadius: '10px',
    color: '#c084fc',
    cursor: 'pointer',
    padding: '.75rem 1.5rem',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
  },
};

const EMOJIS = ['🦁', '🐯', '🦊', '🐺', '🦅', '🐻', '🦋', '🐲', '🦄', '🌙', '⚡', '🔥'];

function getEmoji(index) {
  return EMOJIS[index % EMOJIS.length];
}

export default function PlayerPage({ encoded, myIndex, navigate }) {
  const gameData = useMemo(() => {
    if (!encoded) return null;
    return decodeGame(encoded);
  }, [encoded]);

  if (!gameData || !Array.isArray(gameData.players)) {
    return (
      <div style={S.errorWrap}>
        <div style={{ fontSize: '3rem' }}>😕</div>
        <h2>קישור לא תקין</h2>
        <p style={{ color: '#6060aa' }}>ייתכן שהקישור פג תוקף או שגוי. בקש מהמארח לשלוח קישור חדש.</p>
        <button style={S.backBtn} onClick={() => navigate('home')}>← לעמוד הראשי</button>
      </div>
    );
  }

  const { players } = gameData;
  const me = players[myIndex];
  const others = players.filter((_, i) => i !== myIndex);

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.gameTitle}>🎭 מי אני?</div>
        <div style={S.subTitle}>{players.length} שחקנים במשחק</div>
      </div>

      {/* My card - character hidden */}
      <div style={S.myCard}>
        <div style={S.myCardGlow} />
        <div style={S.myLabel}>הדמות שלך:</div>
        <div style={S.myName}>{me?.name}</div>
        <div style={S.hiddenBadge}>
          ? ? ?
          <span style={S.hiddenText}>הדמות שלך מוסתרת ממך</span>
        </div>
      </div>

      {/* Others */}
      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span>הדמויות של שאר השחקנים</span>
        <div style={S.dividerLine} />
      </div>

      <div style={S.grid}>
        {others.map((player, i) => (
          <div
            key={i}
            style={{
              ...S.card,
              background: `linear-gradient(160deg, ${EMOJI_BG[i % EMOJI_BG.length]}, rgba(18,18,42,.8))`,
            }}
          >
            <div style={S.cardEmoji}>{getEmoji(i)}</div>
            <div style={S.cardPlayerName}>{player.name}</div>
            <div style={S.cardCharacter}>{player.character}</div>
            <div style={S.cardCategory}>{player.categoryName}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button style={S.backBtn} onClick={() => navigate('home')}>
          ← לעמוד הראשי
        </button>
      </div>
    </div>
  );
}
