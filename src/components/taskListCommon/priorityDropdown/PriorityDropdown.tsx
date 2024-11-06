import { Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useState } from 'react';
import {
  DoubleLeftOutlined,
  DownOutlined,
  MinusOutlined,
  PauseOutlined,
} from '@ant-design/icons';
// custom css file
import './priorityDropdown.css';
import { colors } from '../../../styles/colors';
import { TaskPriorityType } from '../../../types/task.types';

type PriorityDropdownProps = {
  currentPriority: TaskPriorityType;
};

const PriorityDropdown = ({ currentPriority }: PriorityDropdownProps) => {
  const [priority, setPriority] = useState<TaskPriorityType>(currentPriority);

  // fuction for get a color regariding the priority
  const getPriorityColor = (priority: TaskPriorityType) => {
    switch (priority) {
      case 'low':
        return '#c2e4d0';
      case 'medium':
        return '#f9e3b1';
      case 'high':
        return '#f6bfc0';
      default:
        return '#f9e3b1';
    }
  };

  // menu type
  type MenuItem = Required<MenuProps>['items'][number];
  // priority menu item
  const priorityMenuItems: MenuItem[] = [
    {
      key: 'low',
      label: (
        <Flex gap={4}>
          Low
          <MinusOutlined style={{ color: getPriorityColor('low') }} />
        </Flex>
      ),
    },
    {
      key: 'medium',
      label: (
        <Flex gap={4}>
          Medium
          <PauseOutlined
            style={{
              color: getPriorityColor('medium'),
              rotate: '90deg',
            }}
          />
        </Flex>
      ),
    },
    {
      key: 'high',
      label: (
        <Flex gap={4}>
          High
          <DoubleLeftOutlined
            style={{
              color: getPriorityColor('high'),
              rotate: '90deg',
            }}
          />
        </Flex>
      ),
    },
  ];

  // handle priority select
  const onClick: MenuProps['onClick'] = (e) => {
    e.key === 'low'
      ? setPriority('low')
      : e.key === 'medium'
        ? setPriority('medium')
        : setPriority('high');
  };

  //dropdown items
  const priorityDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Card className="priority-dropdown-card" bordered={false}>
          <Menu
            className="priority-menu"
            items={priorityMenuItems}
            defaultValue={currentPriority}
            onClick={onClick}
          />
        </Card>
      ),
    },
  ];

  return (
    <Dropdown
      overlayClassName="priority-dropdown"
      menu={{ items: priorityDropdownItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        gap={4}
        style={{
          width: 'fit-content',
          borderRadius: 24,
          paddingInline: 6,
          backgroundColor: getPriorityColor(priority),
          color: colors.darkGray,
          cursor: 'pointer',
        }}
      >
        <Typography.Text
          style={{
            textTransform: 'capitalize',
            color: colors.darkGray,
            fontSize: 13,
          }}
        >
          {priority}
        </Typography.Text>

        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default PriorityDropdown;
