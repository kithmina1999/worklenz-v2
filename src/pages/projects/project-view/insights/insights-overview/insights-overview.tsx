import { Button, Card, Flex, Typography } from 'antd';

import StatusOverview from './graphs/status-overview';
import PriorityOverview from './graphs/priority-overview';
import LastUpdatedTasks from './tables/last-updated-tasks';
import { colors } from '@/styles/colors';
import ProjectDeadline from './tables/project-deadline';
import ProjectStats from '../project-stats/project-stats';


const InsightsOverview = ({
  includeArchivedTasks = false,
  projectId = '',
}: {
  includeArchivedTasks: boolean;
  projectId: string;
}) => {
  return (
    <Flex vertical gap={24}>
      <ProjectStats includeArchivedTasks={includeArchivedTasks} projectId={projectId} />

      <Flex gap={24} className="grid md:grid-cols-2">
        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Status Overview
            </Typography.Text>
          }
          style={{ width: '100%' }}
        >
          <StatusOverview includeArchivedTasks={includeArchivedTasks} projectId={projectId} />
        </Card>
        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Priority Overview
            </Typography.Text>
          }
          style={{ width: '100%' }}
        >
          <PriorityOverview includeArchivedTasks={includeArchivedTasks} projectId={projectId} />
        </Card>
      </Flex>

      <Flex gap={24} className="grid lg:grid-cols-2">
        <Card
          className="custom-insights-card"
          title={
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              Last Updated Tasks
            </Typography.Text>
          }
          extra={<Button type="link">See all</Button>}
          style={{ width: '100%' }}
        >
          <LastUpdatedTasks includeArchivedTasks={includeArchivedTasks} projectId={projectId} />
        </Card>

        <ProjectDeadline includeArchivedTasks={includeArchivedTasks} projectId={projectId} />

      </Flex>
    </Flex>
  );
};

export default InsightsOverview;
