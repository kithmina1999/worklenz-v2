import { DownloadOutlined } from '@ant-design/icons';
import { Badge, Button, Checkbox, Flex, Segmented } from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../styles/colors';
import OverviewInsights from './overviewInsights/OverviewInsights';
import MembersInsights from './membersInsights/MembersInsights';
import TasksInsights from './tasksInsights/TasksInsights';
import { useAppSelector } from '../../../../hooks/useAppSelector';

const ProjectViewInsights = () => {
  const [activeSegment, setActiveSegment] = useState<
    'Overview' | 'Members' | 'Tasks'
  >('Overview');
  const [isIncludeArchivedTasks, setIsIncludeArchivedTasks] =
    useState<boolean>(false);

  // get theme data from theme reducer
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

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
              onClick={() => setIsIncludeArchivedTasks((prev) => !prev)}
            />
            <Badge
              color={
                isIncludeArchivedTasks ? colors.limeGreen : colors.vibrantOrange
              }
              dot
            >
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
        <OverviewInsights />
      ) : activeSegment === 'Members' ? (
        <MembersInsights />
      ) : (
        <TasksInsights />
      )}
    </Flex>
  );
};

export default ProjectViewInsights;
