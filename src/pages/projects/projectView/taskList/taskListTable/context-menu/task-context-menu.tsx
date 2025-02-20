import {
  DeleteOutlined,
  DoubleRightOutlined,
  InboxOutlined,
  RetweetOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Flex, Typography, Modal } from 'antd';
import { MenuProps } from 'antd/lib';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { taskListBulkActionsApiService } from '@/api/tasks/task-list-bulk-actions.api.service';
import { IBulkAssignRequest } from '@/types/tasks/bulk-action-bar.types';
import {
  evt_project_task_list_context_menu_archive,
  evt_project_task_list_context_menu_assign_me,
  evt_project_task_list_context_menu_delete,
} from '@/shared/worklenz-analytics-events';
import { colors } from '@/styles/colors';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { deleteTask } from '@/features/tasks/tasks.slice';
import { deselectAll } from '@/features/projects/bulkActions/bulkActionSlice';

type TaskContextMenuProps = {
  visible: boolean;
  position: { x: number; y: number };
  selectedTask: string;
  onClose: () => void;
};

const TaskContextMenu = ({ visible, position, selectedTask, onClose }: TaskContextMenuProps) => {
  const statusList = useAppSelector(state => state.statusReducer.status);
  const dispatch = useAppDispatch();
  const { trackMixpanelEvent } = useMixpanelTracking();
  const projectId = useAppSelector(state => state.projectReducer.projectId);
  const [updatingAssignToMe, setUpdatingAssignToMe] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return '#d8d7d8';
      case 'doing':
        return '#c0d5f6';
      case 'done':
        return '#c2e4d0';
      default:
        return '#d8d7d8';
    }
  };

  const handleAssignToMe = async () => {
    if (!projectId || !selectedTask) return;

    try {
      setUpdatingAssignToMe(true);
      const body: IBulkAssignRequest = {
        tasks: [selectedTask],
        project_id: projectId,
      };
      const res = await taskListBulkActionsApiService.assignToMe(body);
      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_context_menu_assign_me);
        // Note: You may need to implement a way to update the task assignee in your state management
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingAssignToMe(false);
    }
  };

  const handleArchive = async () => {
    if (!projectId || !selectedTask) return;

    try {
      const res = await taskListBulkActionsApiService.archiveTasks(
        {
          tasks: [selectedTask],
          project_id: projectId,
        },
        false
      );

      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_context_menu_archive);
        // Note: You may need to implement a way to remove the task from your state management
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!projectId || !selectedTask) return;

    try {
      const res = await taskListBulkActionsApiService.deleteTasks({ tasks: [selectedTask] }, projectId);

      if (res.done) {
        trackMixpanelEvent(evt_project_task_list_context_menu_delete);
        dispatch(deleteTask({taskId: selectedTask}));
        dispatch(deselectAll());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserAddOutlined />,
      label: 'Assign to me',
      onClick: handleAssignToMe,
    },
    {
      key: '2',
      icon: <RetweetOutlined />,
      label: 'Move to',
      children: statusList?.map(status => ({
        key: status.id,
        label: (
          <Flex gap={8}>
            <Badge color={getStatusColor(status.category)} />
            {status.name}
          </Flex>
        ),
      })),
    },
    {
      key: '3',
      icon: <InboxOutlined />,
      label: 'Archive',
      onClick: handleArchive,
    },
    {
      key: '4',
      icon: <DoubleRightOutlined />,
      label: 'Convert to Sub task',
    },
    {
      key: '5',
      icon: <DeleteOutlined />,
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  return visible ? (
    <Dropdown menu={{ items }} trigger={['contextMenu']} open={visible} onOpenChange={onClose}>
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          zIndex: 1000,
          width: 1,
          height: 1,
        }}
      ></div>
    </Dropdown>
  ) : null;
};

export default TaskContextMenu;
