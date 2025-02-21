export const SOCKET_CONFIG = {
  url: process.env.SOCKET_URL || 'your_socket_url',
  options: {
    transports: ['websocket', 'polling'],
    upgrade: true,
    rememberUpgrade: true,
    secure: true,
    rejectUnauthorized: process.env.NODE_ENV === 'production',
    autoConnect: false,
  },
};
