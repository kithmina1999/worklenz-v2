import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React from 'react';
import MembersReportsOverviewTab from './overviewTab/MembersReportsOverviewTab';
import MembersReportsTimeLogsTab from './timeLogTab/MembersReportsTimeLogsTab';
import MembersReportsActivityLogsTab from './activityLogTab/MembersReportsActivityLogsTab';
import MembersReportsTasksTab from './taskTab/MembersReportsTasksTab';
import { useTranslation } from 'react-i18next';

type MembersReportsDrawerProps = {
  memberId?: string | null;
};

const MembersReportsDrawerTabs = ({
  memberId = null,
}: MembersReportsDrawerProps) => {
  // localization
  const { t } = useTranslation('reportingMembersDrawer');

  const tabItems: TabsProps['items'] = [
    {
      key: 'overview',
      label: t('overviewTab'),
      children: <MembersReportsOverviewTab memberId={memberId} />,
    },
    {
      key: 'timeLogs',
      label: t('timeLogsTab'),
      children: <MembersReportsTimeLogsTab memberId={memberId} />,
    },
    {
      key: 'activityLogs',
      label: t('activityLogsTab'),
      children: <MembersReportsActivityLogsTab memberId={memberId} />,
    },
    {
      key: 'tasks',
      label: t('tasksTab'),
      children: <MembersReportsTasksTab memberId={memberId} />,
    },
  ];

  return <Tabs type="card" items={tabItems} />;
};

export default MembersReportsDrawerTabs;
