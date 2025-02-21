import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { SOCKET_CONFIG } from './config';
import logger from '@/utils/errorLogger';
import { Modal, message } from 'antd';
import { SocketEvents } from '@/shared/socket-events';
import { getUserSession } from '@/utils/session-helper';

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  modalContextHolder: React.ReactElement<any>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation('common');
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const profile = getUserSession(); // Adjust based on your Redux structure
  const [messageApi, messageContextHolder] = message.useMessage(); // Add message API
  const messageKeyRef = useRef<string>(''); // Add ref to store message key

  // Initialize socket connection
  useEffect(() => {
    // Only create a new socket if one doesn't exist
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_CONFIG.url, {
        ...SOCKET_CONFIG.options,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 5000,
      });
    }

    const socket = socketRef.current;

    // Set up event listeners before connecting
    socket.on('connect', () => {
      logger.info('Socket connected');
      setConnected(true);
      // Destroy any existing reconnecting message
      if (messageKeyRef.current) {
        messageApi.destroy(messageKeyRef.current);
        messageKeyRef.current = '';
      }
      messageApi.success(t('connection-restored'));
    });

    // Emit login event
    if (profile && profile.id) {
      socket.emit(SocketEvents.LOGIN.toString(), profile.id);
      socket.once(SocketEvents.LOGIN.toString(), () => {
        logger.info('Socket login success');
      });
    }

    socket.on('connect_error', error => {
      logger.error('Connection error', { error });
      setConnected(false);
      // Show persistent reconnecting message if not already showing
      if (!messageKeyRef.current) {
        messageKeyRef.current = `reconnecting-${Date.now()}`;
        messageApi.loading({
          content: t('reconnecting'),
          key: messageKeyRef.current,
          duration: 0 // Make the message persistent
        });
      }
    });

    socket.on('disconnect', () => {
      logger.info('Socket disconnected');
      setConnected(false);
      // Show persistent reconnecting message if not already showing
      if (!messageKeyRef.current) {
        messageKeyRef.current = `reconnecting-${Date.now()}`;
        messageApi.loading({
          content: t('reconnecting'),
          key: messageKeyRef.current,
          duration: 0 // Make the message persistent
        });
      }

      // Emit logout event
      if (profile && profile.id) {
        socket.emit(SocketEvents.LOGOUT.toString(), profile.id);
      }
    });

    // Add team-related socket events
    socket.on(SocketEvents.INVITATIONS_UPDATE.toString(), (message: string) => {
      logger.info(message);
    });

    socket.on(
      SocketEvents.TEAM_MEMBER_REMOVED.toString(),
      (data: { teamId: string; message: string }) => {
        if (!data) return;

        if (profile && profile.team_id === data.teamId) {
          modal.confirm({
            title: 'You no longer have permissions to stay on this team!',
            content: data.message,
            closable: false,
            cancelButtonProps: { disabled: true },
            onOk: () => window.location.reload(),
          });
        }
      }
    );

    // Connect after setting up listeners
    socket.connect();

    // Cleanup function
    return () => {
      if (socket) {
        // Destroy any existing message when unmounting
        if (messageKeyRef.current) {
          messageApi.destroy(messageKeyRef.current);
          messageKeyRef.current = '';
        }
        // Remove all listeners first
        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off(SocketEvents.INVITATIONS_UPDATE.toString());
        socket.off(SocketEvents.TEAM_MEMBER_REMOVED.toString());
        socket.removeAllListeners();

        // Then close the connection
        socket.close();
        socketRef.current = null;
      }
    };
  }, [messageApi, t]); // Add t to dependencies

  const value = {
    socket: socketRef.current,
    connected,
    modalContextHolder: contextHolder,
  };

  return (
    <SocketContext.Provider value={value}>
      {messageContextHolder}
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
