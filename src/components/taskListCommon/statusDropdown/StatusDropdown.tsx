import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './statusDropdown.css';
import { colors } from '../../../styles/colors';
import { useAppSelector } from '../../../hooks/useAppSelector';

type StatusDropdownProps = {
  currentStatus: string;
};

const StatusDropdown = ({ currentStatus }: StatusDropdownProps) => {
  const [status, setStatus] = useState<string>(currentStatus);
  const [statusName, setStatusName] = useState<string>('');

  const statusList = useAppSelector((state) => state.statusReducer.status);

  // this is trigger only on status list update
  useEffect(() => {
    const selectedStatus = statusList.find((el) => el.category === status);
    setStatusName(selectedStatus?.name || '');
  }, [statusList]);

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

  type MenuItem = Required<MenuProps>['items'][number];

  const statusMenuItems: MenuItem[] = statusList
    ? statusList.map((status) => ({
        key: status.id,
        label: (
          <Flex gap={8} align="center">
            <Badge color={getStatusColor(status.category)} />
            <Typography.Text style={{ textTransform: 'capitalize' }}>
              {status.name}
            </Typography.Text>
          </Flex>
        ),
      }))
    : [];

  const handleStatusOptionSelect: MenuProps['onClick'] = (e) => {
    const selectedOption = statusList.find((el) => el.id === e.key);
    if (selectedOption) {
      setStatusName(selectedOption.name);
      setStatus(selectedOption.category);
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
          style={{
            color: colors.darkGray,
            fontSize: 13,
          }}
        >
          {statusName}
        </Typography.Text>
        <DownOutlined style={{ fontSize: 12 }} />
      </Flex>
    </Dropdown>
  );
};

export default StatusDropdown;
