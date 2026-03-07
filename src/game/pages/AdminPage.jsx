import { useState, useCallback } from 'react';
import { loadDB, saveDB, resetDB } from '../utils/gameUtils.js';
import { DEFAULT_DB } from '../data/defaultCharacters.js';

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
    flexWrap: 'wrap',
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
    flex: 1,
    fontSize: '1.8rem',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #05d9e8, #7b2ff7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  resetBtn: {
    background: 'rgba(255,42,109,.15)',
    border: '1px solid rgba(255,42,109,.4)',
    borderRadius: '8px',
    color: '#ff6b6b',
    cursor: 'pointer',
    padding: '.4rem .9rem',
    fontSize: '.85rem',
    fontFamily: 'Heebo, sans-serif',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'clamp(180px,30%,280px) 1fr',
    gap: '1.5rem',
    alignItems: 'start',
  },
  catPanel: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '16px',
    padding: '1rem',
    position: 'sticky',
    top: '1rem',
  },
  panelTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '1rem',
    color: '#a0a0cc',
  },
  catBtn: (active) => ({
    width: '100%',
    textAlign: 'right',
    padding: '.6rem .8rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '.95rem',
    marginBottom: '.25rem',
    background: active ? 'rgba(123,47,247,.3)' : 'transparent',
    color: active ? '#c084fc' : '#a0a0cc',
    fontWeight: active ? 700 : 400,
    transition: 'background .15s',
  }),
  addCatRow: {
    display: 'flex',
    gap: '.4rem',
    marginTop: '1rem',
  },
  smallInput: {
    flex: 1,
    padding: '.5rem .7rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '.9rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
    minWidth: 0,
  },
  smallBtn: (color = '#7b2ff7') => ({
    padding: '.5rem .8rem',
    background: `rgba(${color === '#7b2ff7' ? '123,47,247' : '5,217,232'},.2)`,
    border: `1px solid rgba(${color === '#7b2ff7' ? '123,47,247' : '5,217,232'},.4)`,
    borderRadius: '8px',
    color: color === '#7b2ff7' ? '#c084fc' : '#05d9e8',
    cursor: 'pointer',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '.9rem',
    whiteSpace: 'nowrap',
  }),
  charPanel: {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '16px',
    padding: '1.2rem',
  },
  charPanelHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '.5rem',
    flexWrap: 'wrap',
  },
  catName: {
    flex: 1,
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  deleteCatBtn: {
    background: 'rgba(255,42,109,.15)',
    border: '1px solid rgba(255,42,109,.3)',
    borderRadius: '8px',
    color: '#ff6b6b',
    cursor: 'pointer',
    padding: '.35rem .75rem',
    fontSize: '.85rem',
    fontFamily: 'Heebo, sans-serif',
  },
  charGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.5rem',
    marginBottom: '1rem',
  },
  charChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '.3rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: '20px',
    padding: '.3rem .8rem .3rem .5rem',
    fontSize: '.9rem',
    cursor: 'default',
  },
  chipDel: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    fontSize: '.85rem',
    lineHeight: 1,
    padding: 0,
    fontFamily: 'Heebo, sans-serif',
  },
  addCharRow: {
    display: 'flex',
    gap: '.5rem',
    marginTop: '.5rem',
  },
  charInput: {
    flex: 1,
    padding: '.65rem 1rem',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: '10px',
    color: '#e0e0ff',
    fontSize: '1rem',
    fontFamily: 'Heebo, sans-serif',
    outline: 'none',
  },
  saveNotice: {
    color: '#05d9e8',
    fontSize: '.8rem',
    marginTop: '.75rem',
    textAlign: 'center',
  },
  emptyState: {
    color: '#6060aa',
    textAlign: 'center',
    padding: '3rem 0',
    fontSize: '1rem',
  },
  confirmBanner: {
    background: 'rgba(255,42,109,.1)',
    border: '1px solid rgba(255,42,109,.4)',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  confirmText: { flex: 1, color: '#ff9999', fontSize: '.9rem' },
  confirmYes: {
    background: '#ff2a6d',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    padding: '.4rem .9rem',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '.9rem',
  },
  confirmNo: {
    background: 'transparent',
    border: '1px solid #a0a0cc',
    borderRadius: '8px',
    color: '#a0a0cc',
    cursor: 'pointer',
    padding: '.4rem .9rem',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '.9rem',
  },
};

export default function AdminPage({ navigate }) {
  const [db, setDB] = useState(() => loadDB());
  const [selectedCatId, setSelectedCatId] = useState(() => loadDB().categories[0]?.id || '');
  const [newCatName, setNewCatName] = useState('');
  const [newChar, setNewChar] = useState('');
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const persist = useCallback((newDB) => {
    setDB(newDB);
    saveDB(newDB);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, []);

  const addCategory = () => {
    const name = newCatName.trim();
    if (!name) return;
    const id = Date.now().toString(36);
    const newDB = { ...db, categories: [...db.categories, { id, name, characters: [] }] };
    persist(newDB);
    setNewCatName('');
    setSelectedCatId(id);
  };

  const deleteCategory = (catId) => {
    if (!window.confirm('למחוק קטגוריה זו ואת כל הדמויות בה?')) return;
    const newDB = { ...db, categories: db.categories.filter((c) => c.id !== catId) };
    persist(newDB);
    setSelectedCatId(newDB.categories[0]?.id || '');
  };

  const addChar = () => {
    const name = newChar.trim();
    if (!name) return;
    const newDB = {
      ...db,
      categories: db.categories.map((c) =>
        c.id === selectedCatId ? { ...c, characters: [...c.characters, name] } : c
      ),
    };
    persist(newDB);
    setNewChar('');
  };

  const deleteChar = (catId, charName) => {
    const newDB = {
      ...db,
      categories: db.categories.map((c) =>
        c.id === catId ? { ...c, characters: c.characters.filter((ch) => ch !== charName) } : c
      ),
    };
    persist(newDB);
  };

  const handleReset = () => {
    const fresh = resetDB();
    setDB(fresh);
    setSelectedCatId(fresh.categories[0]?.id || '');
    setConfirmReset(false);
  };

  const selectedCat = db.categories.find((c) => c.id === selectedCatId);

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button style={S.backBtn} onClick={() => navigate('home')}>← </button>
        <h1 style={S.h1}>ניהול רשימת דמויות</h1>
        <button style={S.resetBtn} onClick={() => setConfirmReset(true)}>↺ איפוס לברירת מחדל</button>
      </div>

      {confirmReset && (
        <div style={S.confirmBanner}>
          <span style={S.confirmText}>זה ימחק את כל השינויים שלך ויחזיר לרשימת הברירת מחדל. בטוח?</span>
          <button style={S.confirmYes} onClick={handleReset}>כן, אפס</button>
          <button style={S.confirmNo} onClick={() => setConfirmReset(false)}>ביטול</button>
        </div>
      )}

      <div style={S.layout}>
        {/* Category sidebar */}
        <div style={S.catPanel}>
          <div style={S.panelTitle}>קטגוריות ({db.categories.length})</div>
          {db.categories.map((cat) => (
            <button
              key={cat.id}
              style={S.catBtn(cat.id === selectedCatId)}
              onClick={() => setSelectedCatId(cat.id)}
            >
              {cat.name}
              <span style={{ color: '#6060aa', fontSize: '.8rem', marginRight: '.3rem' }}>
                ({cat.characters.length})
              </span>
            </button>
          ))}
          <div style={S.addCatRow}>
            <input
              style={S.smallInput}
              placeholder="קטגוריה חדשה"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            />
            <button style={S.smallBtn()} onClick={addCategory}>+</button>
          </div>
        </div>

        {/* Characters panel */}
        <div style={S.charPanel}>
          {selectedCat ? (
            <>
              <div style={S.charPanelHeader}>
                <span style={S.catName}>{selectedCat.name}</span>
                <button style={S.deleteCatBtn} onClick={() => deleteCategory(selectedCat.id)}>
                  🗑 מחק קטגוריה
                </button>
              </div>

              <div style={S.charGrid}>
                {selectedCat.characters.length === 0 && (
                  <span style={{ color: '#6060aa', fontSize: '.9rem' }}>אין דמויות עדיין</span>
                )}
                {selectedCat.characters.map((ch) => (
                  <div key={ch} style={S.charChip}>
                    <button style={S.chipDel} onClick={() => deleteChar(selectedCat.id, ch)} title="מחק">✕</button>
                    {ch}
                  </div>
                ))}
              </div>

              <div style={S.addCharRow}>
                <input
                  style={S.charInput}
                  placeholder="הוסף דמות חדשה..."
                  value={newChar}
                  onChange={(e) => setNewChar(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addChar()}
                />
                <button style={S.smallBtn('#05d9e8')} onClick={addChar}>+ הוסף</button>
              </div>

              {saved && <div style={S.saveNotice}>✓ נשמר</div>}
            </>
          ) : (
            <div style={S.emptyState}>בחר קטגוריה או צור קטגוריה חדשה →</div>
          )}
        </div>
      </div>
    </div>
  );
}
