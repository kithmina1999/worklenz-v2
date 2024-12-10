import { Card, Flex, Typography } from 'antd';
import TaskByMembersTable from './tables/TaskByMembersTable';
import ProjectStats from '../project-stats/project-stats';

const InsightsMembers = ({ includeArchivedTasks = false, projectId = '' }: { includeArchivedTasks: boolean, projectId: string }) => {
  return (
    <Flex vertical gap={24}>
      <ProjectStats includeArchivedTasks={includeArchivedTasks} projectId={projectId} />

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

export default InsightsMembers;
