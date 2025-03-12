import { TabsProps, Tabs } from 'antd';
import Drawer from 'antd/es/drawer';
import { InputRef } from 'antd/es/input';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  setSelectedTaskId,
  setShowTaskDrawer,
  setTaskFormViewModel,
  setTaskSubscribers,
} from '@/features/task-drawer/task-drawer.slice';

import './task-drawer.css';
import TaskDrawerHeader from './task-drawer-header/task-drawer-header';
import TaskDrawerActivityLog from './shared/activity-log/task-drawer-activity-log';
import TaskDrawerInfoTab from './shared/infoTab/TaskDrawerInfoTab';
import TaskDrawerTimeLog from './shared/timeLog/task-drawer-time-log';
import { DEFAULT_TASK_NAME } from '@/shared/constants';
import useTaskDrawerUrlSync from '@/hooks/useTaskDrawerUrlSync';
import InfoTabFooter from './shared/infoTab/InfoTabFooter';
import { Flex } from 'antd';

const TaskDrawer = () => {
  const { t } = useTranslation('task-drawer/task-drawer');
  const [activeTab, setActiveTab] = useState<string>('info');

  const { showTaskDrawer } = useAppSelector(state => state.taskDrawerReducer);

  const taskNameInputRef = useRef<InputRef>(null);
  const isClosingManually = useRef(false);

  // Use the custom hook to sync the task drawer state with the URL
  const { clearTaskFromUrl } = useTaskDrawerUrlSync();

  useEffect(() => {
    if (taskNameInputRef.current?.input?.value === DEFAULT_TASK_NAME) {
      taskNameInputRef.current.focus();
    }
  }, [showTaskDrawer]);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    // Set flag to indicate we're manually closing the drawer
    isClosingManually.current = true;

    // Explicitly clear the task parameter from URL
    clearTaskFromUrl();

    // Update the Redux state
    dispatch(setShowTaskDrawer(false));
    dispatch(setSelectedTaskId(null));
    dispatch(setTaskFormViewModel({}));
    dispatch(setTaskSubscribers([]));

    // Reset the flag after a short delay
    setTimeout(() => {
      isClosingManually.current = false;
    }, 100);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'info',
      label: t('taskInfoTab.title'),
      children: <TaskDrawerInfoTab t={t} />,
    },
    {
      key: 'timeLog',
      label: t('taskTimeLogTab.title'),
      children: <TaskDrawerTimeLog t={t} />,
    },
    {
      key: 'activityLog',
      label: t('taskActivityLogTab.title'),
      children: <TaskDrawerActivityLog />,
    },
  ];

  const drawerProps = {
    open: showTaskDrawer,
    onClose: handleOnClose,
    width: 720,
    style: { justifyContent: 'space-between' },
    destroyOnClose: true,
    title: <TaskDrawerHeader inputRef={taskNameInputRef} t={t} />,
    footer: activeTab === 'info' ? <InfoTabFooter /> : null,
    bodyStyle: { padding: '24px', overflow: 'auto', height: 'calc(100% - 180px)' },
    footerStyle: {
      padding: '0 24px 16px',
      overflow: 'hidden',
      width: '100%',
      height: 'auto',
    },
  };

  return (
    <Drawer {...drawerProps}>
      <Tabs
        type="card"
        items={tabItems}
        destroyInactiveTabPane
        onChange={handleTabChange}
        activeKey={activeTab}
      />
    </Drawer>
  );
};

export default TaskDrawer;
