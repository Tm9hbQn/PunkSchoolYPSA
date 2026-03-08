import { useState, useMemo, useCallback } from 'react';
import {
  decodeGame,
  loadGameSession,
  updatePlayerInSession,
  getQuestionLog,
  addQuestion,
  removeQuestion,
  getAllCharacters,
  loadDB,
} from '../utils/gameUtils.js';

const CARD_COLORS = [
  ['#ff2a6d', '#7b2ff7'],
  ['#05d9e8', '#7b2ff7'],
  ['#ff6b35', '#ff2a6d'],
  ['#7b2ff7', '#05d9e8'],
  ['#ff2a6d', '#ff6b35'],
  ['#05d9e8', '#ff6b35'],
];

const EMOJIS = ['🦁', '🐯', '🦊', '🐺', '🦅', '🐻', '🦋', '🐲', '🦄', '🌙', '⚡', '🔥'];

function getEmoji(index) {
  return EMOJIS[index % EMOJIS.length];
}

function getCardGradient(index) {
  const [c1, c2] = CARD_COLORS[index % CARD_COLORS.length];
  return `linear-gradient(135deg, ${c1}22, ${c2}18)`;
}

function getCardBorder(index) {
  const [c1] = CARD_COLORS[index % CARD_COLORS.length];
  return `2px solid ${c1}55`;
}

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
    animation: 'fadeInUp 0.5s ease-out',
  },
  gameTitle: {
    fontSize: '1.6rem',
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
    animation: 'fadeInScale 0.6s ease-out',
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
    animation: 'pulseGlow 3s ease-in-out infinite',
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
    fontSize: '.95rem',
    fontWeight: 600,
  },
  dividerLine: {
    flex: 1,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(123,47,247,.4), transparent)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  card: {
    borderRadius: '18px',
    padding: '1.25rem 1rem',
    textAlign: 'center',
    transition: 'transform .2s, box-shadow .2s',
    cursor: 'default',
    position: 'relative',
  },
  cardEmoji: {
    fontSize: '3rem',
    marginBottom: '.6rem',
    animation: 'floatBounce 3s ease-in-out infinite',
  },
  cardPlayerName: {
    fontSize: '1rem',
    color: '#c0c0e0',
    marginBottom: '.4rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  cardCharacter: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.3,
    textShadow: '0 0 20px rgba(123,47,247,.5)',
  },
  cardCategory: {
    fontSize: '.75rem',
    color: '#8080bb',
    marginTop: '.4rem',
    fontWeight: 500,
  },
  wonOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,.5)',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: '#05d9e8',
    fontWeight: 800,
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
    transition: 'transform 0.15s',
  },
  // Question log
  questionSection: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(5,217,232,.2)',
    borderRadius: '16px',
    padding: '1.25rem',
    marginTop: '1.5rem',
    animation: 'fadeInUp 0.5s ease-out',
  },
  questionTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    marginBottom: '.75rem',
    color: '#05d9e8',
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
  },
  questionInputRow: {
    display: 'flex',
    gap: '.5rem',
    marginBottom: '.75rem',
  },
  questionInput: {
    flex: 1,
    padding: '.7rem 1rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '.95rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
  },
  questionAddBtn: {
    padding: '.7rem 1rem',
    background: 'rgba(5,217,232,.15)',
    border: '1px solid rgba(5,217,232,.3)',
    borderRadius: '10px',
    color: '#05d9e8',
    cursor: 'pointer',
    fontSize: '.9rem',
    fontFamily: 'Heebo, sans-serif',
    whiteSpace: 'nowrap',
  },
  questionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    padding: '.5rem .75rem',
    background: 'rgba(255,255,255,.03)',
    borderRadius: '8px',
    marginBottom: '.35rem',
    animation: 'questionSlideIn 0.3s ease-out',
  },
  questionText: {
    flex: 1,
    fontSize: '.9rem',
    color: '#c0c0e0',
  },
  questionNum: {
    color: '#6060aa',
    fontSize: '.75rem',
    fontWeight: 700,
    minWidth: '20px',
  },
  questionDelBtn: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    fontSize: '.85rem',
    padding: '0 .2rem',
    fontFamily: 'Heebo, sans-serif',
  },
  // Win / new character
  actionBar: {
    display: 'flex',
    gap: '.75rem',
    justifyContent: 'center',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  winBtn: {
    padding: '.6rem 1.5rem',
    background: 'linear-gradient(90deg, #05d9e8, #7b2ff7)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    transition: 'transform 0.2s',
  },
  newCharBtn: {
    padding: '.6rem 1.5rem',
    background: 'rgba(255,107,53,.15)',
    border: '1px solid rgba(255,107,53,.4)',
    borderRadius: '10px',
    color: '#ff6b35',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'Heebo, sans-serif',
    transition: 'transform 0.2s',
  },
  wonBanner: {
    background: 'linear-gradient(90deg, rgba(5,217,232,.15), rgba(123,47,247,.15))',
    border: '2px solid rgba(5,217,232,.5)',
    borderRadius: '14px',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '1rem',
    animation: 'celebrateWin 0.6s ease-out',
  },
  wonText: {
    fontSize: '1.3rem',
    fontWeight: 800,
    color: '#05d9e8',
  },
  revealedChar: {
    fontSize: '1.1rem',
    color: '#c084fc',
    marginTop: '.3rem',
  },
  // Player picker for join flow
  joinWrap: {
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
  },
  joinTitle: {
    fontSize: '1.8rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  joinSub: {
    color: '#6060aa',
    fontSize: '1rem',
    textAlign: 'center',
  },
  joinGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '1rem',
    width: '100%',
    maxWidth: '500px',
  },
  joinPlayerBtn: {
    padding: '1.2rem .75rem',
    background: 'rgba(123,47,247,.12)',
    border: '2px solid rgba(123,47,247,.35)',
    borderRadius: '14px',
    color: '#e0e0ff',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    textAlign: 'center',
    transition: 'transform 0.2s, border-color 0.2s',
  },
  roundBadge: {
    display: 'inline-block',
    background: 'rgba(123,47,247,.2)',
    border: '1px solid rgba(123,47,247,.4)',
    borderRadius: '20px',
    padding: '.2rem .8rem',
    fontSize: '.8rem',
    color: '#c084fc',
    marginTop: '.5rem',
  },
};

export default function PlayerPage({ gameIdOrEncoded, myIndex, navigate }) {
  const [selectedPlayer, setSelectedPlayer] = useState(myIndex);
  const [won, setWon] = useState(false);
  const [revealedChar, setRevealedChar] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [roundNum, setRoundNum] = useState(1);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  // Determine if this is a short game ID or legacy encoded
  const isShortId = gameIdOrEncoded && gameIdOrEncoded.length <= 10;
  const isJoinFlow = myIndex !== myIndex || String(myIndex) === 'NaN';
  const isJoinRoute = window.location.hash.endsWith('/join');

  const gameData = useMemo(() => {
    if (!gameIdOrEncoded) return null;
    if (isShortId) {
      const session = loadGameSession(gameIdOrEncoded);
      return session;
    }
    // Legacy: full encoded data
    return decodeGame(gameIdOrEncoded);
  }, [gameIdOrEncoded, isShortId]);

  // Load question log once we know gameId and player index
  const gameId = isShortId ? gameIdOrEncoded : null;

  const loadQuestions = useCallback(() => {
    if (gameId && !isNaN(selectedPlayer) && !questionsLoaded) {
      setQuestions(getQuestionLog(gameId, selectedPlayer));
      setQuestionsLoaded(true);
    }
  }, [gameId, selectedPlayer, questionsLoaded]);

  // Load questions on first valid render
  if (gameId && !isNaN(selectedPlayer) && !questionsLoaded) {
    loadQuestions();
  }

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

  // Join flow: show player selection
  if (isJoinRoute) {
    return (
      <div style={S.joinWrap}>
        <div style={{ fontSize: '3rem', animation: 'floatBounce 3s ease-in-out infinite' }}>🎭</div>
        <div style={S.joinTitle}>מי אני?</div>
        <div style={S.joinSub}>בחר את השם שלך כדי להצטרף למשחק</div>
        <div style={S.joinGrid}>
          {players.map((p, i) => (
            <button
              key={i}
              style={S.joinPlayerBtn}
              onClick={() => {
                window.location.hash = `play/${gameIdOrEncoded}/${i}`;
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.borderColor = '#7b2ff7'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.borderColor = 'rgba(123,47,247,.35)'; }}
            >
              {getEmoji(i)} {p.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const me = players[selectedPlayer];
  const others = players.filter((_, i) => i !== selectedPlayer);

  const handleAddQuestion = () => {
    const text = questionText.trim();
    if (!text || !gameId) return;
    const updated = addQuestion(gameId, selectedPlayer, text);
    setQuestions([...updated]);
    setQuestionText('');
  };

  const handleRemoveQuestion = (qi) => {
    if (!gameId) return;
    const updated = removeQuestion(gameId, selectedPlayer, qi);
    setQuestions([...updated]);
  };

  const handleWin = () => {
    setWon(true);
    setRevealedChar(me?.character || '');
  };

  const handleNewCharacter = () => {
    if (!gameId) return;
    const db = loadDB();
    const pool = getAllCharacters(db).map(c => c.name);
    const usedChars = players.map(p => p.character);
    const remaining = pool.filter(c => !usedChars.includes(c));
    const src = remaining.length > 0 ? remaining : pool;
    const newChar = src[Math.floor(Math.random() * src.length)];
    const catName = getAllCharacters(db).find(c => c.name === newChar)?.categoryName || '';

    updatePlayerInSession(gameId, selectedPlayer, { character: newChar, categoryName: catName });

    // Update local state
    players[selectedPlayer] = { ...players[selectedPlayer], character: newChar, categoryName: catName };
    setWon(false);
    setRevealedChar('');
    setRoundNum(r => r + 1);
    setQuestions([]);
    setQuestionsLoaded(false);
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={S.gameTitle}>🎭 מי אני?</div>
        <div style={S.subTitle}>{players.length} שחקנים במשחק</div>
        {roundNum > 1 && <div style={S.roundBadge}>סבב {roundNum}</div>}
      </div>

      {/* Won banner */}
      {won && (
        <div style={S.wonBanner}>
          <div style={S.wonText}>🎉 ניחשת נכון!</div>
          <div style={S.revealedChar}>הדמות שלך הייתה: {revealedChar}</div>
        </div>
      )}

      {/* My card - character hidden */}
      <div style={S.myCard}>
        <div style={S.myCardGlow} />
        <div style={S.myLabel}>הדמות שלך:</div>
        <div style={S.myName}>{me?.name}</div>
        {!won ? (
          <div style={S.hiddenBadge}>
            ? ? ?
            <span style={S.hiddenText}>הדמות שלך מוסתרת ממך</span>
          </div>
        ) : (
          <div style={{
            ...S.hiddenBadge,
            background: 'rgba(5,217,232,.15)',
            borderColor: 'rgba(5,217,232,.5)',
            color: '#05d9e8',
          }}>
            {revealedChar}
          </div>
        )}

        {/* Action buttons */}
        <div style={S.actionBar}>
          {!won && (
            <button
              style={S.winBtn}
              onClick={handleWin}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🏆 ניחשתי נכון!
            </button>
          )}
          {gameId && (
            <button
              style={S.newCharBtn}
              onClick={handleNewCharacter}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🔄 דמות חדשה
            </button>
          )}
        </div>
      </div>

      {/* Others */}
      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span>👥 הדמויות של שאר השחקנים</span>
        <div style={S.dividerLine} />
      </div>

      <div style={S.grid}>
        {others.map((player, i) => (
          <div
            key={i}
            style={{
              ...S.card,
              background: getCardGradient(i),
              border: getCardBorder(i),
              animation: `cardEntrance 0.5s ease-out ${i * 0.08}s both`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${CARD_COLORS[i % CARD_COLORS.length][0]}33`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ ...S.cardEmoji, animationDelay: `${i * 0.3}s` }}>{getEmoji(i)}</div>
            <div style={S.cardPlayerName}>{player.name}</div>
            <div style={S.cardCharacter}>{player.character}</div>
            <div style={S.cardCategory}>{player.categoryName}</div>
          </div>
        ))}
      </div>

      {/* Question log */}
      {gameId && (
        <div style={S.questionSection}>
          <div style={S.questionTitle}>
            <span>📝</span>
            <span>שאלות ששאלתי ({questions.length})</span>
          </div>
          <div style={S.questionInputRow}>
            <input
              style={S.questionInput}
              placeholder="תעד שאלה ששאלת..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
            />
            <button style={S.questionAddBtn} onClick={handleAddQuestion}>+ הוסף</button>
          </div>
          {questions.length > 0 && (
            <div>
              {questions.map((q, qi) => (
                <div key={qi} style={S.questionItem}>
                  <span style={S.questionNum}>{qi + 1}.</span>
                  <span style={S.questionText}>{q.text}</span>
                  <button
                    style={S.questionDelBtn}
                    onClick={() => handleRemoveQuestion(qi)}
                    title="מחק"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          style={S.backBtn}
          onClick={() => navigate('home')}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ← לעמוד הראשי
        </button>
      </div>
    </div>
  );
}
