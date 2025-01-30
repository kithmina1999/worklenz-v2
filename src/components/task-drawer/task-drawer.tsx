import Drawer from 'antd/es/drawer';
import { InputRef } from 'antd/es/input';

import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setShowTaskDrawer } from '@/features/tasks/tasks.slice';

import './task-drawer.css';
import TaskDrawerHeader from './shared/TaskDrawerHeader';
import TaskDrawerTabs from './shared/TaskDrawerTabs';

const TaskDrawer = () => {
  const [taskName, setTaskName] = useState<string>('Untitled Task');

  const { showTaskDrawer } = useAppSelector(state => state.taskReducer);

  // auto focused when open the drawer
  const taskNameInputRef = useRef<InputRef>(null);

  useEffect(() => {
    taskNameInputRef.current?.focus();
  }, [showTaskDrawer]);

  const dispatch = useAppDispatch();

  return (
    <Drawer
      open={showTaskDrawer}
      onClose={() => dispatch(setShowTaskDrawer(false))}
      width={720}
      style={{ justifyContent: 'space-between' }}
      title={
        <TaskDrawerHeader
          taskName={taskName}
          setTaskName={setTaskName}
          inputRef={taskNameInputRef}
        />
      }
    >
      <TaskDrawerTabs drawerType={'create'} taskId={null} />
    </Drawer>
  );
};

export default TaskDrawer;
