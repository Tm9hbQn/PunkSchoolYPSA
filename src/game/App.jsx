import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import SetupPage from './pages/SetupPage.jsx';
import PlayerPage from './pages/PlayerPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

// Hash routing: #play/BASE64/INDEX | #setup | #admin | (empty) = home

function parseHash() {
  const hash = window.location.hash.slice(1); // remove leading #
  if (hash.startsWith('play/')) {
    const parts = hash.slice(5).split('/');
    const encoded = parts.slice(0, -1).join('/');
    const myIndex = parseInt(parts[parts.length - 1], 10);
    return { page: 'play', encoded, myIndex };
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

  if (route.page === 'play')
    return <PlayerPage encoded={route.encoded} myIndex={route.myIndex} navigate={navigate} />;
  if (route.page === 'setup') return <SetupPage navigate={navigate} />;
  if (route.page === 'admin') return <AdminPage navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}
