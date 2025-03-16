import { Drawer, Empty, Segmented, Typography, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  fetchInvitations,
  fetchNotifications,
  setNotificationType,
  toggleDrawer,
} from '../../../../../features/navbar/notificationSlice';
import { NOTIFICATION_OPTION_READ, NOTIFICATION_OPTION_UNREAD } from '@/shared/constants';
import { useTranslation } from 'react-i18next';
import { SocketEvents } from '@/shared/socket-events';
import { IWorklenzNotification } from '@/types/notifications/notifications.types';
import { useSocket } from '@/socket/socketContext';
import { ITeamInvitationViewModel } from '@/types/notifications/notifications.types';
import logger from '@/utils/errorLogger';
import NotificationItem from './notification-item';
import InvitationItem from './invitation-item';
import { notificationsApiService } from '@/api/notifications/notifications.api.service';

const NotificationDrawer = () => {
  const { isDrawerOpen, notificationType, notifications, invitations } = useAppSelector(
    state => state.notificationReducer
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation('navbar');
  const { socket, connected } = useSocket();

  const notificationCount = notifications?.length || 0;

  const [isLoading, setIsLoading] = useState(false);

  const handleInvitationsUpdate = (data: ITeamInvitationViewModel[]) => {
    logger.info('Invitations updated', data);
    dispatch(fetchInvitations());
  };

  const handleNotificationsUpdate = (data: IWorklenzNotification[]) => {
    logger.info('Notifications updated', data);
    dispatch(fetchNotifications(notificationType));
  };

  const handleTeamInvitationsUpdate = (data: ITeamInvitationViewModel[]) => {
    logger.info('Team invitations updated', data);
  };

  const askPushPermission = () => {
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            logger.info('Permission granted');
          }
        });
      }
    } else {
      logger.error('This browser does not support notification permission.');
      return;
    }
  };

  const markNotificationAsRead = async (id: string) => {
    if (!id) return;

    const res = await notificationsApiService.updateNotification(id);
    if (res.done) {
      dispatch(fetchNotifications(notificationType));
      dispatch(fetchInvitations());
    }
  };

  useEffect(() => {
    socket?.on(SocketEvents.INVITATIONS_UPDATE.toString(), handleInvitationsUpdate);
    socket?.on(SocketEvents.NOTIFICATIONS_UPDATE.toString(), handleNotificationsUpdate);
    socket?.on(SocketEvents.TEAM_MEMBER_REMOVED.toString(), handleTeamInvitationsUpdate);

    return () => {
      socket?.removeListener(SocketEvents.INVITATIONS_UPDATE.toString(), handleInvitationsUpdate);
      socket?.removeListener(
        SocketEvents.NOTIFICATIONS_UPDATE.toString(),
        handleNotificationsUpdate
      );
      socket?.removeListener(
        SocketEvents.TEAM_MEMBER_REMOVED.toString(),
        handleTeamInvitationsUpdate
      );
    };
  }, [socket]);

  useEffect(() => {
    setIsLoading(true);
    askPushPermission();
    dispatch(fetchInvitations());
    if (notificationType) {
      dispatch(fetchNotifications(notificationType)).finally(() => setIsLoading(false));
    }
  }, [notificationType, dispatch]);

  return (
    <Drawer
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          {notificationType === NOTIFICATION_OPTION_READ
            ? t('notificationsDrawer.read')
            : t('notificationsDrawer.unread')}{' '}
          ({notificationCount})
        </Typography.Text>
      }
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      width={400}
    >
      <Segmented<string>
        options={['Unread', 'Read']}
        defaultValue={NOTIFICATION_OPTION_UNREAD}
        onChange={(value: string) => {
          if (value === NOTIFICATION_OPTION_UNREAD)
            dispatch(setNotificationType(NOTIFICATION_OPTION_UNREAD));
          if (value === NOTIFICATION_OPTION_READ)
            dispatch(setNotificationType(NOTIFICATION_OPTION_READ));
        }}
      />

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Spin />
        </div>
      )}
      {invitations && invitations.length > 0 && notificationType === NOTIFICATION_OPTION_UNREAD ? (
        <div className="notification-list mt-3">
          {invitations.map(invitation => (
            <InvitationItem
              key={invitation.id}
              item={invitation}
              isUnreadNotifications={notificationType === NOTIFICATION_OPTION_UNREAD}
              t={t}
            />
          ))}
        </div>
      ) : null}
      {notifications && notifications.length > 0 ? (
        <div className="notification-list mt-3">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              isUnreadNotifications={notificationType === NOTIFICATION_OPTION_UNREAD}
              markNotificationAsRead={(id) => Promise.resolve(markNotificationAsRead(id))}
            />
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('notificationsDrawer.noNotifications')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBlockStart: 32,
          }}
        />
      )}
    </Drawer>
  );
};

export default NotificationDrawer;
