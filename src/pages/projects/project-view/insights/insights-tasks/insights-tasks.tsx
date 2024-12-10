import { Button, Card, Flex, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import OverdueTasksTable from './tables/OverdueTasksTable';
import OverLoggedTasksTable from './tables/OverLoggedTasksTable';
import TaskCompletedEarlyTable from './tables/TaskCompletedEarlyTable';
import TaskCompletedLateTable from './tables/TaskCompletedLateTable';
import ProjectStats from '../project-stats/project-stats';

const InsightsTasks = ({ includeArchivedTasks = false, projectId = '' }: { includeArchivedTasks: boolean, projectId: string }) => {
  return (
    <Flex vertical gap={24}>
      <ProjectStats includeArchivedTasks={includeArchivedTasks} projectId={projectId} />

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
              <Tooltip title={'Tasks that has time logged past their estimated time'}>
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

export default InsightsTasks;
