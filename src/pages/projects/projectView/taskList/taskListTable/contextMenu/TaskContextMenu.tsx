import {
  DeleteOutlined,
  InboxOutlined,
  RetweetOutlined,
  RightOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Flex, Typography } from 'antd';
import { MenuProps } from 'antd/lib';
import React from 'react';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { useSelectedProject } from '../../../../../../hooks/useSelectedProject';
import { TaskStatusType } from '../../../../../../types/task.types';

type TaskContextMenuProps = {
  visible: boolean;
  position: { x: number; y: number };
  selectedTask: string;
  onClose: () => void;
};

const TaskContextMenu = ({
  visible,
  position,
  selectedTask,
  onClose,
}: TaskContextMenuProps) => {
  // get selected project
  const selectedProject = useSelectedProject();

  // find the available status for the currently active project
  const statusList = useAppSelector(
    (state) => state.statusReducer.projectWiseStatusList
  ).find(
    (statusList) => statusList.projectId === selectedProject?.projectId
  )?.statusList;

  console.log(statusList);

  const getStatusColor = (status: TaskStatusType) => {
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserAddOutlined />,
      label: ' Assign to me',
    },
    {
      key: '2',
      icon: <RetweetOutlined />,
      label: 'Move to',
      children: statusList?.map((status) => ({
        key: status.statusId,
        label: (
          <Flex gap={4}>
            <Badge color={getStatusColor(status.statusCategory)} />
            {status.statusName}
          </Flex>
        ),
      })),
    },
    {
      key: '3',
      icon: <InboxOutlined />,
      label: 'Archive',
    },
    {
      key: '4',
      icon: <DeleteOutlined />,
      label: ' Delete',
    },
  ];

  return visible ? (
    <Dropdown
      menu={{ items }}
      trigger={['contextMenu']}
      open={visible}
      onOpenChange={onClose}
    >
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
