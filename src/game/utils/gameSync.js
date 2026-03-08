// Real-time game sync via ntfy.sh (free, no-signup pub/sub with SSE)
const NTFY_BASE = 'https://ntfy.sh';
const TOPIC_PREFIX = 'punkschoolypsa-';

export function generateRoomId() {
  return Math.random().toString(36).slice(2, 8);
}

export async function publish(roomId, data) {
  const topic = TOPIC_PREFIX + roomId;
  try {
    await fetch(`${NTFY_BASE}/${topic}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn('Publish failed:', e);
  }
}

export function subscribe(roomId, onMessage) {
  const topic = TOPIC_PREFIX + roomId;
  const url = `${NTFY_BASE}/${topic}/sse?since=all&poll=0`;
  let source = null;
  let closed = false;

  function connect() {
    if (closed) return;
    source = new EventSource(url);

    source.addEventListener('message', (event) => {
      try {
        const envelope = JSON.parse(event.data);
        if (envelope.event !== 'message') return;
        const data = JSON.parse(envelope.message);
        onMessage(data);
      } catch {
        // ignore malformed messages
      }
    });

    source.addEventListener('error', () => {
      // EventSource auto-reconnects, but if it closes permanently, retry
      if (source.readyState === EventSource.CLOSED && !closed) {
        setTimeout(connect, 3000);
      }
    });
  }

  connect();

  return () => {
    closed = true;
    if (source) source.close();
  };
}
