import {
  ArrowLeftOutlined,
  BellFilled,
  BellOutlined,
  CalendarOutlined,
  DownOutlined,
  EditOutlined,
  ImportOutlined,
  SaveOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-components';
import { Button, Dropdown, Flex, Tag, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import ProjectMemberInviteButton from '@features/projects/singleProject/members/ProjectMemberInviteButton';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleCreateTaskDrawer } from '@features/tasks/taskSlice';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SocketEvents } from '@/shared/socket-events';
import { useAuthService } from '@/hooks/useAuth';
import { useSocket } from '@/socket/socketContext';
import { getProject, setProject, setProjectId } from '@features/project/project.slice';
import { fetchTaskGroups } from '@features/tasks/tasks.slice';
import ProjectStatusIcon from '@/components/common/project-status-icon/project-status-icon';
import { formatDate } from '@/utils/timeUtils';
import ProjectDrawer from '@/components/projects/project-drawer/project-drawer';
import { toggleDrawer } from '@/features/projects/projectsSlice';

const ProjectViewHeader = () => {
  const navigate = useNavigate();

  const currentSession = useAuthService().getCurrentSession();
  const { socket } = useSocket();

  const { isDesktop } = useResponsive();

  const dispatch = useAppDispatch();

  const { project: selectedProject, projectId } = useAppSelector(state => state.projectReducer);
  const { loadingGroups } = useAppSelector(state => state.taskReducer);

  const handleRefresh = () => {
    if (!projectId) return;
    dispatch(fetchTaskGroups(projectId));
  };

  const handleSubscribe = () => {
    if (!selectedProject?.id) return;

    dispatch(setProject({ ...selectedProject, subscribed: !selectedProject.subscribed }));

    const body = {
      project_id: selectedProject.id,
      user_id: currentSession?.id,
      team_member_id: currentSession?.team_member_id,
      mode: selectedProject.subscribed ? 1 : 0,
    };

    socket?.emit(SocketEvents.PROJECT_SUBSCRIBERS_CHANGE.toString(), body);
  };

  const handleSettingsClick = () => {
    if (selectedProject?.id) {
      dispatch(setProjectId(selectedProject.id));
      dispatch(getProject(selectedProject.id));
      dispatch(toggleDrawer());
    }
  };

  const handleDrawerClose = () => {
    if (!selectedProject?.id) return;
    dispatch(getProject(selectedProject?.id));
  };

  // create task button items
  const items = [
    {
      key: '1',
      label: (
        <div style={{ width: '100%', margin: 0, padding: 0 }}>
          <ImportOutlined /> Import task
        </div>
      ),
    },
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={
        <Flex gap={8} align="center">
          <ArrowLeftOutlined style={{ fontSize: 16 }} onClick={() => navigate(-1)} />
          <Typography.Title level={4} style={{ marginBlockEnd: 0, marginInlineStart: 12 }}>
            {selectedProject?.name}
          </Typography.Title>

          {/* attributes thats appear only if available  */}
          {selectedProject?.category_id && (
            <Tag
              color={colors.vibrantOrange}
              style={{
                borderRadius: 24,
                paddingInline: 8,
                margin: 0,
              }}
            >
              {selectedProject?.category_name}
            </Tag>
          )}

          {selectedProject?.status && (
            <Tooltip title={selectedProject.status}>
              <ProjectStatusIcon
                iconName={selectedProject.status_icon || ''}
                color={selectedProject.status_color || ''}
              />
            </Tooltip>
          )}

          {(selectedProject?.start_date || selectedProject?.end_date) && (
            <Tooltip
              title={
                <Typography.Text style={{ color: colors.white }}>
                  {selectedProject?.start_date &&
                    `Start date: ${formatDate(new Date(selectedProject?.start_date))}`}
                  <br />
                  {selectedProject?.end_date &&
                    `End date: ${formatDate(new Date(selectedProject?.end_date))}`}
                </Typography.Text>
              }
            >
              <CalendarOutlined
                style={{
                  fontSize: 16,
                }}
              />
            </Tooltip>
          )}

          {selectedProject?.notes && (
            <Typography.Text type="secondary">{selectedProject.notes}</Typography.Text>
          )}
        </Flex>
      }
      style={{ paddingInline: 0, marginBlockEnd: 12 }}
      extra={
        <Flex gap={8} align="center">
          <Tooltip title={'Refresh project'} trigger={'hover'}>
            <Button
              shape="circle"
              icon={<SyncOutlined spin={loadingGroups} />}
              onClick={() => handleRefresh()}
            />
          </Tooltip>

          <Tooltip title={'Save as template'} trigger={'hover'}>
            <Button shape="circle" icon={<SaveOutlined />} />
          </Tooltip>

          <Tooltip title={'Project settings'} trigger={'hover'}>
            <Button shape="circle" icon={<SettingOutlined />} onClick={handleSettingsClick} />
          </Tooltip>

          <Tooltip title={'Receive a project summary every evening.'} trigger={'hover'}>
            <Button
              shape="round"
              icon={selectedProject?.subscribed ? <BellFilled /> : <BellOutlined />}
              onClick={handleSubscribe}
            >
              {selectedProject?.subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </Tooltip>

          <ProjectMemberInviteButton />

          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{ items }}
            onClick={() => dispatch(toggleCreateTaskDrawer())}
          >
            <EditOutlined /> Create Task
          </Dropdown.Button>
          <ProjectDrawer onClose={handleDrawerClose} />
        </Flex>
      }
    />
  );
};

export default ProjectViewHeader;
