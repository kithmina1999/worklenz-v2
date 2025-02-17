import { ConfigProvider, Select, Typography } from 'antd';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getStatusIcon } from '@/utils/projectUtils';
import { useEffect } from 'react';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import { useAppDispatch } from '@/hooks/useAppDispatch';

interface ProjectStatusCellProps {
  currentStatus: string;
  projectId: string;
}

const ProjectStatusCell = ({ currentStatus, projectId }: ProjectStatusCellProps) => {
  const { t } = useTranslation('reporting-projects');
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const { projectStatuses } = useAppSelector(state => state.projectStatusesReducer);

  const statusOptions = [
    ...projectStatuses.map((status, index) => ({
      key: index,
      value: status.id,
      label: (
        <Typography.Text
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          className="group-hover:text-[#1890ff]"
        >
          {getStatusIcon(status.icon || '', status.color_code || '')}
          {t(`${status.name}`)}
        </Typography.Text>
      ),
    })),
  ];

  const handleStatusChange = (value: string) => {
    socket?.emit(SocketEvents.PROJECT_STATUS_CHANGE.toString(), {
      project_id: projectId,
      status_id: value,
    });
  };

  const handleStatusChangeResponse = (data: any) => {
    console.log('projectStatusUpdated', data);
  };

  useEffect(() => {
    socket?.on(SocketEvents.PROJECT_STATUS_CHANGE.toString(), handleStatusChangeResponse);

    return () => {
      socket?.removeListener(
        SocketEvents.PROJECT_STATUS_CHANGE.toString(),
        handleStatusChangeResponse
      );
    };
  }, [socket]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: colors.transparent,
          },
        },
      }}
    >
      <Select
        variant="borderless"
        options={statusOptions}
        defaultValue={currentStatus}
        onChange={handleStatusChange}
      />
    </ConfigProvider>
  );
};

export default ProjectStatusCell;
