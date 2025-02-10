import Drawer from 'antd/es/drawer';
import { InputRef } from 'antd/es/input';

import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedTaskId, setShowTaskDrawer } from '@/features/tasks/tasks.slice';

import './task-drawer.css';
import TaskDrawerHeader from './shared/TaskDrawerHeader';
import TaskDrawerTabs from './shared/TaskDrawerTabs';

const TaskDrawer = () => {
  const { showTaskDrawer, taskFormViewModel } = useAppSelector(state => state.taskReducer);

  // auto focused when open the drawer
  const taskNameInputRef = useRef<InputRef>(null);

  useEffect(() => {
    taskNameInputRef.current?.focus();
  }, [showTaskDrawer]);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(setShowTaskDrawer(false));
    dispatch(setSelectedTaskId(null));
  };

  return (
    <Drawer
      open={showTaskDrawer}
      onClose={handleOnClose}
      width={720}
      style={{ justifyContent: 'space-between' }}
      title={
        <TaskDrawerHeader
          name={taskFormViewModel?.task?.name || 'Untitled Task'}
          inputRef={taskNameInputRef}
        />
      }
    >
      <TaskDrawerTabs />
    </Drawer>
  );
};

export default TaskDrawer;
