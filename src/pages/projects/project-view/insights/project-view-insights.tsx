import { DownloadOutlined } from '@ant-design/icons';
import { Badge, Button, Checkbox, Flex, Segmented } from 'antd';
import { useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import InsightsMembers from './insights-members/insights-members';
import InsightsOverview from './insights-overview/insights-overview';
import InsightsTasks from './insights-tasks/insights-tasks';
import { useParams } from 'react-router-dom';

const ProjectViewInsights = () => {
  const { projectId } = useParams();
    
  const [activeSegment, setActiveSegment] = useState<'Overview' | 'Members' | 'Tasks'>('Overview');
  const [isIncludeArchivedTasks, setIsIncludeArchivedTasks] = useState<boolean>(false);

  // get theme data from theme reducer
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  return (
    <Flex vertical gap={24}>
      {/* insights tab header  */}
      <Flex align="center" justify="space-between">
        <Segmented
          options={['Overview', 'Members', 'Tasks']}
          defaultValue={activeSegment}
          onChange={(value: 'Overview' | 'Members' | 'Tasks') => {
            setActiveSegment(value);
          }}
        />

        <Flex gap={8}>
          <Flex
            gap={8}
            align="center"
            style={{
              backgroundColor: themeMode === 'dark' ? '#141414' : '#f5f5f5',
              padding: '6px 15px',
              borderRadius: 4,
            }}
          >
            <Checkbox
              checked={isIncludeArchivedTasks}
              onClick={() => setIsIncludeArchivedTasks(prev => !prev)}
            />
            <Badge color={isIncludeArchivedTasks ? colors.limeGreen : colors.vibrantOrange} dot>
              Include Archived Tasks
            </Badge>
          </Flex>

          <Button type="primary" icon={<DownloadOutlined />}>
            Export
          </Button>
        </Flex>
      </Flex>

      {/* each segment content  */}
      {activeSegment === 'Overview' ? (
        projectId && <InsightsOverview includeArchivedTasks={isIncludeArchivedTasks} projectId={projectId} />
      ) : activeSegment === 'Members' ? (
        projectId && <InsightsMembers includeArchivedTasks={isIncludeArchivedTasks} projectId={projectId} />
      ) : (
        projectId && <InsightsTasks includeArchivedTasks={isIncludeArchivedTasks} projectId={projectId} />
      )}
    </Flex>
  );
};

export default ProjectViewInsights;
