import React from 'react';
import { Flex } from 'antd';
import TaskListFilters from './taskListFilters/TaskListFilters';
import { TaskType } from '../../../../types/task.types';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import TaskListTableWrapper from './taskListTable/TaskListTableWrapper';

const ProjectViewTaskList = () => {
  // sample data from task reducer
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );

  return (
    <Flex vertical gap={16}>
      <TaskListFilters />
      <TaskListTableWrapper taskList={dataSource} />
    </Flex>
  );
};

export default ProjectViewTaskList;
