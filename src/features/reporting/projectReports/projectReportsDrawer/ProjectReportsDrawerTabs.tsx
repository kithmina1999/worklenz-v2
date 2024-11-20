import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React from 'react';
import ProjectReportsOverviewTab from './overviewTab/ProjectReportsOverviewTab';
import ProjectReportsMembersTab from './membersTab/ProjectReportsMembersTab';
import ProjectReportsTasksTab from './tasksTab/ProjectReportsTasksTab';
import { useTranslation } from 'react-i18next';

type ProjectReportsDrawerProps = {
  projectId?: string | null;
};

const ProjectReportsDrawerTabs = ({
  projectId = null,
}: ProjectReportsDrawerProps) => {
  // localization
  const { t } = useTranslation('reportingProjectsDrawer');

  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: t('overviewTab'),
      children: <ProjectReportsOverviewTab projectId={projectId} />,
    },
    {
      key: 'members',
      label: t('membersTab'),
      children: <ProjectReportsMembersTab projectId={projectId} />,
    },
    {
      key: 'tasks',
      label: t('tasksTab'),
      children: <ProjectReportsTasksTab projectId={projectId} />,
    },
  ];

  return <Tabs type="card" items={tabItems} />;
};

export default ProjectReportsDrawerTabs;
