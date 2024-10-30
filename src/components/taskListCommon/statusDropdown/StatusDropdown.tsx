import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TaskStatusType } from '../../../types/task.types';
// custom css file
import './statusDropdown.css';
import { colors } from '../../../styles/colors';

type StatusDropdownProps = {
  currentStatus: TaskStatusType;
  size: 'small' | 'default'
};

const StatusDropdown = ({ currentStatus, size }: StatusDropdownProps) => {
  const [status, setStatus] = useState<TaskStatusType>(currentStatus);

  // fuction for get a color regariding the status
  const getStatuColor = (status: TaskStatusType) => {
    if (status === 'todo') return colors.deepLightGray;
    else if (status === 'doing') return colors.midBlue;
    else return colors.lightGreen;
  };

  // menu type
  type MenuItem = Required<MenuProps>['items'][number];
  // status menu item
  const statusMenuItems: MenuItem[] = [
    {
      key: 'todo',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('todo')} /> Todo
        </Flex>
      ),
    },
    {
      key: 'doing',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('doing')} /> Doing
        </Flex>
      ),
    },
    {
      key: 'done',
      label: (
        <Flex gap={4}>
          <Badge color={getStatuColor('done')} /> Done
        </Flex>
      ),
    },
  ];

  // handle status select
  const onClick: MenuProps['onClick'] = (e) => {
    e.key === 'todo'
      ? setStatus('todo')
      : e.key === 'doing'
        ? setStatus('doing')
        : setStatus('done');
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
            defaultValue={'todo'}
            onClick={onClick}
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
          padding: size === 'small' ? '2px 6px' : '2px 12px',
          fontSize: size === 'small' ? '10px' : '13px',
          backgroundColor: getStatuColor(status),
          whiteSpace: 'nowrap'
        }}
      >
        <Typography.Text style={{ textTransform: 'capitalize', fontSize: size === 'small' ? '10px' : '13px'}}>
          {status}
        </Typography.Text>
        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default StatusDropdown;
