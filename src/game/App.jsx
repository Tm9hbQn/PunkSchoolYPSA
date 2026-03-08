import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import SetupPage from './pages/SetupPage.jsx';
import LobbyPage from './pages/LobbyPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

/*
  Hash routing:
    (empty)             → HomePage
    #setup              → SetupPage (admin creates lobby + hosts game)
    #lobby/ROOMID       → LobbyPage (player joins via QR)
    #play/ENCODED       → PlayerPage (legacy: encoded game URL)
    #admin              → AdminPage (manage character DB)
*/

function parseHash() {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('lobby/')) {
    const roomId = hash.slice(6);
    return { page: 'lobby', roomId };
  }
  if (hash.startsWith('play/')) {
    const encoded = hash.slice(5);
    return { page: 'play', encoded };
  }
  if (hash === 'setup') return { page: 'setup' };
  if (hash === 'admin') return { page: 'admin' };
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (page, extra = '') => {
    if (page === 'home') window.location.hash = '';
    else if (extra) window.location.hash = `${page}/${extra}`;
    else window.location.hash = page;
  };

  if (route.page === 'lobby')
    return <LobbyPage roomId={route.roomId} navigate={navigate} />;
  if (route.page === 'play')
    return <PlayerPage encoded={route.encoded} navigate={navigate} />;
  if (route.page === 'setup') return <SetupPage navigate={navigate} />;
  if (route.page === 'admin') return <AdminPage navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}
