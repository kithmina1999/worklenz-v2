import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const MembersReportsStatCard = () => {
  // localization
  const { t } = useTranslation('reportingMembersDrawer');

  type StatItemsType = {
    name: string;
    icon: ReactNode;
    value: string;
  };

  // stat items array
  const statItems: StatItemsType[] = [
    {
      name: 'projects',
      icon: <FileExcelOutlined style={{ fontSize: 24, color: '#f6ce69' }} />,
      value: '4',
    },
    {
      name: 'totalTasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#70eded' }} />
      ),
      value: '20',
    },
    {
      name: 'assignedTasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#7590c9' }} />
      ),
      value: '0',
    },
    {
      name: 'completedTasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#75c997' }} />
      ),
      value: '0',
    },
    {
      name: 'ongoingTasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#7cb5ec' }} />
      ),
      value: '0',
    },
    {
      name: 'overdueTasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#eb6363' }} />
      ),
      value: '4',
    },
    {
      name: 'loggedHours',
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: '#75c997' }} />,
      value: '0h 0m',
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <Flex vertical gap={16} style={{ padding: '12px 24px' }}>
        {statItems.map((item) => (
          <Flex gap={12} align="center">
            {item.icon}
            <Typography.Text>
              {item.value} {t(`${item.name}Text`)}
            </Typography.Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default MembersReportsStatCard;
