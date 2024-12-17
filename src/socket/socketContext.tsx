import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_CONFIG } from './config';
import logger from '@/utils/errorLogger';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const newSocket = io(SOCKET_CONFIG.url, {
      ...SOCKET_CONFIG.options,
    });

    newSocket.on('connect', () => {
      logger.info('Socket connected');
      setConnected(true);
    });

    newSocket.on('connect_error', (error) => {
      logger.error('Connection error', { error });
      setConnected(false);
    });

    newSocket.on('disconnect', () => {
      logger.info('Socket disconnected');
      setConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
