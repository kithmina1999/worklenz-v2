export const SOCKET_CONFIG = {
  url: import.meta.env.VITE_SOCKET_URL,
  options: {
    transports: ['websocket', 'polling'],
    upgrade: true,
    rememberUpgrade: true,
    secure: true,
    rejectUnauthorized: import.meta.env.VITE_APP_ENV === 'production',
    autoConnect: false,
  },
};
