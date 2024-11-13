import { Card, Flex, Typography } from 'antd';
import React from 'react';
import InsightStatCard from '../InsightStatCard';
import groupIcon from '../../../../../assets/icons/insightsIcons/group.png';
import warningIcon from '../../../../../assets/icons/insightsIcons/warning.png';
import unassignedIcon from '../../../../../assets/icons/insightsIcons/block-user.png';
import TaskByMembersTable from './tables/TaskByMembersTable';

const MembersInsights = () => {
  return (
    <Flex vertical gap={24}>
      <Flex
        gap={24}
        className="grid sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1"
      >
        <InsightStatCard
          icon={groupIcon}
          title="Project Members"
          children={3}
        />
        <InsightStatCard
          icon={warningIcon}
          title="Assignees with overdue tasks"
          children={2}
        />
        <InsightStatCard
          icon={unassignedIcon}
          title="Unassigned Members"
          children={0}
        />
      </Flex>

      <Card
        className="custom-insights-card"
        title={
          <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
            Tasks by members
          </Typography.Text>
        }
        style={{ width: '100%' }}
      >
        <TaskByMembersTable />
      </Card>
    </Flex>
  );
};

export default MembersInsights;
