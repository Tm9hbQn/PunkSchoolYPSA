const S = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0d0d1a 0%, #12122a 60%, #1a0a2e 100%)',
    padding: '2rem',
    gap: '2rem',
  },
  title: {
    fontSize: 'clamp(2.4rem, 8vw, 4rem)',
    fontWeight: 900,
    letterSpacing: '-1px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7, #05d9e8)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: 1.1,
    animation: 'gradientShift 4s ease infinite',
  },
  sub: {
    color: '#a0a0cc',
    fontSize: '1.1rem',
    textAlign: 'center',
    maxWidth: '480px',
    lineHeight: 1.6,
    animation: 'fadeInUp 0.8s ease-out 0.3s both',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '340px',
    animation: 'fadeInUp 0.8s ease-out 0.5s both',
  },
  btnPrimary: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: 'Heebo, sans-serif',
    background: 'linear-gradient(90deg, #ff2a6d, #7b2ff7)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'opacity .2s, transform .15s, box-shadow .2s',
  },
  btnSecondary: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: 'Heebo, sans-serif',
    background: 'transparent',
    color: '#05d9e8',
    border: '2px solid #05d9e8',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background .2s, transform .15s',
  },
  emoji: {
    fontSize: '5rem',
    lineHeight: 1,
    animation: 'floatBounce 3s ease-in-out infinite',
  },
};

export default function HomePage({ navigate }) {
  return (
    <div style={S.wrap}>
      <div style={S.emoji}>🎭</div>
      <h1 style={S.title}>מי אני?</h1>
      <p style={S.sub}>
        משחק ניחוש דמויות דיגיטלי — בלי לגזור ניירות ולהדביק למצח.
        <br />
        כל שחקן רואה את הדמויות של כולם חוץ מ‑שלו.
      </p>
      <div style={S.btnGroup}>
        <button
          style={S.btnPrimary}
          onClick={() => navigate('setup')}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.03)'; e.target.style.boxShadow = '0 0 30px rgba(255,42,109,.4)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
        >
          🃏 צור משחק חדש
        </button>
        <button
          style={S.btnSecondary}
          onClick={() => navigate('admin')}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(5,217,232,.1)'; e.target.style.transform = 'scale(1.03)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.transform = 'scale(1)'; }}
        >
          📋 נהל רשימת דמויות
        </button>
      </div>
    </div>
  );
}
