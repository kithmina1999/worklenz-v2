import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TaskStatusType } from '../../../types/task.types';
import './statusDropdown.css';
import { colors } from '../../../styles/colors';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useSelectedProject } from '../../../hooks/useSelectedProject';

type StatusDropdownProps = {
  currentStatus: TaskStatusType;
};

const StatusDropdown = ({ currentStatus }: StatusDropdownProps) => {
  const [status, setStatus] = useState<TaskStatusType>(currentStatus);
  const [statusName, setStatusName] = useState<string>('');

  const selectedProject = useSelectedProject();

  const statusList = useAppSelector(
    (state) => state.statusReducer.projectWiseStatusList
  ).find((statusList) => statusList.projectId === selectedProject?.projectId);

  // this is trigger only on status list update
  useEffect(() => {
    const selectedStatus = statusList?.statusList.find(
      (el) => el.statusCategory === status
    );
    setStatusName(selectedStatus?.statusName || '');
  }, [statusList?.statusList]);

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

  type MenuItem = Required<MenuProps>['items'][number];

  const statusMenuItems: MenuItem[] = statusList
    ? statusList?.statusList.map((status) => ({
        key: status.statusId,
        label: (
          <Flex gap={4}>
            <Badge color={getStatusColor(status.statusCategory)} />
            {status.statusName}
          </Flex>
        ),
      }))
    : [];

  const handleStatusOptionSelect: MenuProps['onClick'] = (e) => {
    const selectedOption = statusList?.statusList.find(
      (el) => el.statusId === e.key
    );
    if (selectedOption) {
      setStatusName(selectedOption.statusName);
      setStatus(selectedOption.statusCategory);
    }
  };

  const statusDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Card className="status-dropdown-card" bordered={false}>
          <Menu
            className="status-menu"
            items={statusMenuItems}
            onClick={handleStatusOptionSelect}
          />
        </Card>
      ),
    },
  ];

  return (
    <Dropdown
      overlayClassName="status-dropdown"
      menu={{ items: statusDropdownItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        gap={4}
        style={{
          width: 'fit-content',
          borderRadius: 24,
          paddingInline: 6,
          backgroundColor: getStatusColor(status),
          color: colors.darkGray,
          cursor: 'pointer',
        }}
      >
        <Typography.Text
          ellipsis={{ expanded: false }}
          style={{ color: colors.darkGray, fontSize: 13 }}
        >
          {statusName}
        </Typography.Text>
        <DownOutlined style={{ fontSize: 12 }} />
      </Flex>
    </Dropdown>
  );
};

export default StatusDropdown;
