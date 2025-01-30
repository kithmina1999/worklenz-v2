import Tabs, { TabsProps } from 'antd/es/tabs';

import TaskDrawerInfoTab from './infoTab/TaskDrawerInfoTab';
import TaskDrawerTimeLog from './timeLog/TaskDrawerTimeLog';
import TaskDrawerActivityLog from './activityLog/TaskDrawerActivityLog';

interface TaskDrawerTabsProps {
  drawerType: 'create' | 'update';
  taskId?: string | null;
}

const TaskDrawerTabs = ({ drawerType = 'create', taskId = null }: TaskDrawerTabsProps) => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'info',
      label: 'Info',
      children: <TaskDrawerInfoTab taskId={taskId} />,
    },
    { key: 'timeLog', label: 'Time Log', children: <TaskDrawerTimeLog /> },
    {
      key: 'activityLog',
      label: 'Activity Log',
      children: <TaskDrawerActivityLog />,
    },
  ];

  return <Tabs type="card" items={tabItems} />;
};

export default TaskDrawerTabs;
