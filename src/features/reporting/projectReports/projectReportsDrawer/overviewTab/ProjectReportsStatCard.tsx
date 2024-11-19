import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';
import { Card, Flex, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { colors } from '../../../../../styles/colors';

const ProjectReportsStatCard = () => {
  type StatItemsType = {
    name: string;
    icon: ReactNode;
    value: string;
  };

  // stat items array
  const statItems: StatItemsType[] = [
    {
      name: 'completed tasks',
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#75c997' }} />,
      value: '0',
    },
    {
      name: 'incomplete tasks',
      icon: <FileExcelOutlined style={{ fontSize: 24, color: '#f6ce69' }} />,
      value: '0',
    },
    {
      name: 'overdue tasks',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: 24, color: '#eb6363' }} />
      ),
      value: '0',
    },
    {
      name: 'allocated hours',
      icon: (
        <ClockCircleOutlined style={{ fontSize: 24, color: colors.skyBlue }} />
      ),
      value: '0',
    },
    {
      name: 'logged hours',
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: '#75c997' }} />,
      value: '0',
    },
  ];

  return (
    <Card style={{ width: '100%' }}>
      <Flex vertical gap={16}>
        {statItems.map((item) => (
          <Flex gap={12} align="center">
            {item.icon}
            <Typography>
              {item.value}{' '}
              <Typography.Text style={{ textTransform: 'capitalize' }}>
                {item.name}
              </Typography.Text>
            </Typography>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};

export default ProjectReportsStatCard;
