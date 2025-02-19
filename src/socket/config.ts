export const SOCKET_CONFIG = {
  url: process.env.NODE_ENV === 'production' ? import.meta.env.VITE_SOCKET_URL : 'ws://localhost:3000',
  options: {
    transports: ['websocket'],
    path: '/socket',
    upgrade: true,
  },
};
