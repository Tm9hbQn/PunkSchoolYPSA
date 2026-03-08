import { useState, useEffect, useRef } from 'react';
import { publish, subscribe } from '../utils/gameSync.js';
import GameView from '../components/GameView.jsx';

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0d1a 0%, #12122a 100%)',
    padding: '2rem',
    fontFamily: 'Heebo, sans-serif',
    color: '#e0e0ff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: '.5rem',
  },
  sub: {
    color: '#a0a0cc',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  card: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeInUp 0.5s ease-out',
  },
  label: {
    display: 'block',
    fontWeight: 600,
    color: '#a0a0cc',
    marginBottom: '.5rem',
    fontSize: '.9rem',
  },
  input: {
    width: '100%',
    padding: '.85rem 1rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '1.1rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  joinBtn: {
    width: '100%',
    padding: '.85rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  error: {
    color: '#ff6b6b',
    padding: '.5rem',
    background: 'rgba(255,42,109,.1)',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '.9rem',
    textAlign: 'center',
  },
  // Waiting screen
  waitWrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0d0d1a 0%, #12122a 100%)',
    padding: '2rem',
    fontFamily: 'Heebo, sans-serif',
    color: '#e0e0ff',
    gap: '1.5rem',
    textAlign: 'center',
  },
  waitTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#c084fc',
  },
  waitSub: {
    color: '#a0a0cc',
    fontSize: '1rem',
  },
  playerChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.4rem',
    padding: '.5rem .9rem',
    background: 'rgba(123,47,247,.15)',
    border: '1px solid rgba(123,47,247,.35)',
    borderRadius: '20px',
    margin: '0 .3rem .5rem 0',
    fontSize: '1rem',
    fontWeight: 600,
    animation: 'fadeInScale 0.3s ease-out',
  },
  myChip: {
    background: 'rgba(5,217,232,.15)',
    border: '1px solid rgba(5,217,232,.4)',
    color: '#05d9e8',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(123,47,247,.2)',
    borderTop: '4px solid #7b2ff7',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  playerCount: {
    fontWeight: 600,
    color: '#a0a0cc',
    fontSize: '.9rem',
    marginBottom: '.5rem',
  },
};

export default function LobbyPage({ roomId, navigate }) {
  const [phase, setPhase] = useState('joining'); // 'joining' | 'waiting' | 'playing'
  const [myName, setMyName] = useState('');
  const [inputName, setInputName] = useState('');
  const [names, setNames] = useState([]);
  const [players, setPlayers] = useState(null); // with characters, after game starts
  const [error, setError] = useState('');
  const playersRef = useRef(null);

  useEffect(() => { playersRef.current = players; }, [players]);

  // Subscribe to game events
  useEffect(() => {
    const unsub = subscribe(roomId, (data) => {
      if (data.type === 'state') {
        if (data.phase === 'lobby') {
          setNames(data.names || []);
        } else if (data.phase === 'playing' && data.players) {
          setPlayers(data.players);
          playersRef.current = data.players;
          setPhase('playing');
        }
      }
    });
    return unsub;
  }, [roomId]);

  const handleJoin = () => {
    const name = inputName.trim();
    if (!name) { setError('נא להזין שם'); return; }
    if (names.includes(name)) { setError('שם זה כבר תפוס, בחר שם אחר'); return; }
    setMyName(name);
    setError('');
    // Publish join request
    publish(roomId, { type: 'join', name });
    setPhase('waiting');
  };

  const handleNewCharacter = () => {
    // Send request to admin
    publish(roomId, { type: 'newchar', name: myName });
  };

  // ── Playing phase ──
  if (phase === 'playing' && players) {
    return (
      <GameView
        players={players}
        myName={myName}
        gameHash={roomId}
        onNewCharacter={handleNewCharacter}
      />
    );
  }

  // ── Waiting phase ──
  if (phase === 'waiting') {
    return (
      <div style={S.waitWrap}>
        <div style={{ fontSize: '4rem', animation: 'floatBounce 3s ease-in-out infinite' }}>🎭</div>
        <div style={S.waitTitle}>הצטרפת למשחק!</div>
        <div style={S.waitSub}>ממתין למנהל המשחק שיתחיל...</div>
        <div style={{
          width: '50px', height: '50px',
          border: '4px solid rgba(123,47,247,.2)',
          borderTop: '4px solid #7b2ff7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <div>
          <div style={S.playerCount}>{names.length} שחקנים הצטרפו</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {names.map((n, i) => (
              <div key={i} style={{ ...S.playerChip, ...(n === myName ? S.myChip : {}) }}>
                <span>{['🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻', '🎹'][i % 8]}</span>
                <span>{n}</span>
                {n === myName && <span style={{ fontSize: '.75rem' }}>(אני)</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Joining phase ──
  return (
    <div style={S.page}>
      <div style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', animation: 'floatBounce 3s ease-in-out infinite', marginBottom: '1rem' }}>🎭</div>
        <div style={S.title}>מי אני?</div>
        <div style={S.sub}>הצטרף למשחק</div>
      </div>

      <div style={S.card}>
        <label style={S.label}>מה השם שלך?</label>
        <input
          style={S.input}
          placeholder="הכנס את שמך"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          autoFocus
        />
        {error && <div style={S.error}>{error}</div>}
        <button
          style={S.joinBtn}
          onClick={handleJoin}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 0 25px rgba(123,47,247,.4)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
        >
          🚀 הצטרף!
        </button>
      </div>

      {/* Show who's already in */}
      {names.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div style={S.playerCount}>{names.length} שחקנים כבר בפנים</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {names.map((n, i) => (
              <div key={i} style={S.playerChip}>
                <span>{['🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎻', '🎹'][i % 8]}</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
