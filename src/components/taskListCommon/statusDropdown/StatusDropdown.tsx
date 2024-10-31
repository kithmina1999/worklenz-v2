import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TaskStatusType } from '../../../types/task.types';
// custom css file
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

  // get currently selectedProject from the useSelectedProject hook
  const selectedProject = useSelectedProject();

  const statusList = useAppSelector(
    (state) => state.statusReducer.projectWiseStatusList
  ).find((statusList) => statusList.projectId === selectedProject?.projectId);

  // get the status name
  useEffect(() => {
    const selectedStatus = statusList?.statusList.find(
      (el) => el.statusCategory === status
    );

    setStatusName(selectedStatus?.statusName || '');
  }, [status, statusList?.statusList]);

  // fuction for get a color regariding the status
  const getStatuColor = (status: TaskStatusType) => {
    if (status === 'todo') return colors.deepLightGray;
    else if (status === 'doing') return colors.midBlue;
    else return colors.lightGreen;
  };

  // menu type
  type MenuItem = Required<MenuProps>['items'][number];
  // status menu item
  const statusMenuItems: MenuItem[] = statusList
    ? statusList?.statusList.map((status) => ({
        key: status.statusId,
        label: (
          <Flex gap={4}>
            <Badge color={getStatuColor(status.statusCategory)} />
            {status.statusName}
          </Flex>
        ),
      }))
    : [];

  // handle status select
  const handleStatusOptionSelect: MenuProps['onClick'] = (e) => {
    const selectedOption = statusList?.statusList.find(
      (el) => el.statusId === e.key
    );

    if (selectedOption) {
      setStatus(selectedOption.statusCategory);
    }
  };

  //dropdown items
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
          padding: '2px 12px',
          fontSize: 13,
          backgroundColor: getStatuColor(status),
          color: colors.darkGray,
        }}
      >
        <Typography.Text
          ellipsis={{ expanded: false }}
          style={{ color: colors.darkGray }}
        >
          {statusName}
        </Typography.Text>
        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default StatusDropdown;
