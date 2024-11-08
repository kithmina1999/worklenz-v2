import { Button, Card, Flex, Tooltip, Typography } from 'antd';
import React from 'react';
import InsightStatCard from '../InsightStatCard';
import checkIcon from '../../../../../assets/icons/insightsIcons/insights-check.png';
import clipboardIcon from '../../../../../assets/icons/insightsIcons/clipboard.png';
import warningIcon from '../../../../../assets/icons/insightsIcons/warning.png';
import clockIcon from '../../../../../assets/icons/insightsIcons/clock-green.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { colors } from '../../../../../styles/colors';
import OverdueTasksTable from './tables/OverdueTasksTable';
import OverLoggedTasksTable from './tables/OverLoggedTasksTable';
import TaskCompletedEarlyTable from './tables/TaskCompletedEarlyTable';
import TaskCompletedLateTable from './tables/TaskCompletedLateTable';

const TasksInsights = () => {
  return (
    <Flex vertical gap={24}>
      <Flex
        gap={24}
        className="grid sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1"
      >
        <InsightStatCard
          icon={checkIcon}
          title="Completed tasks"
          children={6}
        />
        <InsightStatCard
          icon={clipboardIcon}
          title="Incomplete tasks"
          children={14}
        />
        <InsightStatCard
          icon={warningIcon}
          title="Overdue tasks"
          tooltip={'Tasks that are past their due date'}
          children={5}
        />
        <InsightStatCard
          icon={clockIcon}
          title="Under logged hours"
          tooltip={
            'Difference between task estimation and logged time for tasks.'
          }
          children={
            <Tooltip
              title={
                <table>
                  <tr style={{ display: 'flex', gap: 12 }}>
                    <td style={{ width: 120 }}>Total estimation</td>
                    <td>20h 30m</td>
                  </tr>
                  <tr style={{ display: 'flex', gap: 12 }}>
                    <td style={{ width: 120 }}>Total logged</td>
                    <td>4h 30m</td>
                  </tr>
                  <tr style={{ display: 'flex', gap: 12 }}>
                    <td style={{ width: 120 }}>Hours</td>
                    <td>16h</td>
                  </tr>
                </table>
              }
              trigger={'click'}
            >
              4h 30m
            </Tooltip>
          }
        />
      </Flex>

      <Flex gap={24} className="grid lg:grid-cols-2">
        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Overdue Tasks
              <Tooltip title={'Tasks that are past their due date'}>
                <ExclamationCircleOutlined
                  style={{
                    color: colors.skyBlue,
                    fontSize: 13,
                    marginInlineStart: 4,
                  }}
                />
              </Tooltip>
            </Typography.Text>
          }
          extra={<Button type="link">See all</Button>}
          style={{ width: '100%' }}
        >
          <OverdueTasksTable />
        </Card>

        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Over logged Tasks
              <Tooltip
                title={'Tasks that has time logged past their estimated time'}
              >
                <ExclamationCircleOutlined
                  style={{
                    color: colors.skyBlue,
                    fontSize: 13,
                    marginInlineStart: 4,
                  }}
                />
              </Tooltip>
            </Typography.Text>
          }
          extra={<Button type="link">See all</Button>}
          style={{ width: '100%' }}
        >
          <OverLoggedTasksTable />
        </Card>

        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Tasks completed early
            </Typography.Text>
          }
          extra={<Button type="link">See all</Button>}
          style={{ width: '100%' }}
        >
          <TaskCompletedEarlyTable />
        </Card>

        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Tasks completed late
            </Typography.Text>
          }
          extra={<Button type="link">See all</Button>}
          style={{ width: '100%' }}
        >
          <TaskCompletedLateTable />
        </Card>
      </Flex>
    </Flex>
  );
};

export default TasksInsights;
