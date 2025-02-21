import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { SOCKET_CONFIG } from './config';
import logger from '@/utils/errorLogger';
import { Modal, message } from 'antd';
import { SocketEvents } from '@/shared/socket-events';
import { getUserSession } from '@/utils/session-helper';

// Add these constants at the top
const INITIAL_RECONNECTION_DELAY = 1000;
const MAX_RECONNECTION_DELAY = 30000;
const RECONNECTION_ATTEMPTS = Infinity; // Allow infinite reconnection attempts

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
  const hasShownConnectedMessage = useRef(false); // Add ref to track if message was shown

  // Initialize socket connection
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_CONFIG.url, {
        ...SOCKET_CONFIG.options,
        reconnection: true,
        reconnectionAttempts: RECONNECTION_ATTEMPTS,
        reconnectionDelay: INITIAL_RECONNECTION_DELAY,
        reconnectionDelayMax: MAX_RECONNECTION_DELAY,
        randomizationFactor: 0.5,
        timeout: 20000, // Increase timeout to 20 seconds
      });
    }

    const socket = socketRef.current;

    // Add reconnect attempt handler
    socket.on('reconnect_attempt', (attemptNumber) => {
      logger.info(`Reconnection attempt ${attemptNumber}`);
      messageApi.loading({
        content: `${t('reconnecting')} (${t('attempt')} ${attemptNumber})`,
        duration: 0, // Keep showing until next state change
        key: 'reconnection-status'
      });
    });

    // Add reconnect failed handler
    socket.on('reconnect_failed', () => {
      logger.error('Reconnection failed after all attempts');
      messageApi.error({
        content: t('connection-failed'),
        key: 'reconnection-status'
      });
    });

    // Update connect handler
    socket.on('connect', () => {
      logger.info('Socket connected');
      setConnected(true);
      
      if (!hasShownConnectedMessage.current) {
        messageApi.success({
          content: t('connection-restored'),
          key: 'reconnection-status'
        });
        hasShownConnectedMessage.current = true;
      }

      // Resubscribe to necessary events/channels here if needed
      if (profile && profile.id) {
        socket.emit(SocketEvents.LOGIN.toString(), profile.id);
      }
    });

    // Update connect_error handler
    socket.on('connect_error', error => {
      logger.error('Connection error', { error });
      setConnected(false);
      messageApi.error({
        content: `${t('connection-lost')}: ${error.message}`,
        key: 'reconnection-status'
      });
      hasShownConnectedMessage.current = false;

      // Implement custom reconnection logic if needed
      setTimeout(() => {
        socket.connect();
      }, INITIAL_RECONNECTION_DELAY);
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

    // Add ping/pong monitoring
    socket.on('ping', () => {
      logger.debug('Socket ping sent');
    });

    socket.on('pong', (latency) => {
      logger.debug('Socket pong received', { latency });
    });

    // Connect after setting up listeners
    socket.connect();

    // Cleanup function
    return () => {
      if (socket) {
        socket.off('reconnect_attempt');
        socket.off('reconnect_failed');
        socket.off('ping');
        socket.off('pong');
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
        hasShownConnectedMessage.current = false; // Reset on unmount
      }
    };
  }, [messageApi, t, profile]); // Add profile to dependencies

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
