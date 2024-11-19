import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React from 'react';
import ProjectReportsOverviewTab from './overviewTab/ProjectReportsOverviewTab';
import ProjectReportsMembersTab from './membersTab/ProjectReportsMembersTab';
import ProjectReportsTasksTab from './tasksTab/ProjectReportsTasksTab';

type ProjectReportsDrawerProps = {
  projectId?: string | null;
};

const ProjectReportsDrawerTabs = ({
  projectId = null,
}: ProjectReportsDrawerProps) => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: 'Overview',
      children: <ProjectReportsOverviewTab projectId={projectId} />,
    },
    {
      key: 'members',
      label: 'Members',
      children: <ProjectReportsMembersTab projectId={projectId} />,
    },
    {
      key: 'tasks',
      label: 'Tasks',
      children: <ProjectReportsTasksTab projectId={projectId} />,
    },
  ];

  return <Tabs type="card" items={tabItems} />;
};

export default ProjectReportsDrawerTabs;
