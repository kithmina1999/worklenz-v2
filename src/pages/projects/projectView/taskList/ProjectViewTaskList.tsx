import React, { useEffect } from 'react';
import { Flex, Skeleton } from 'antd';
import TaskListFilters from './taskListFilters/TaskListFilters';
import { TaskType } from '../../../../types/task.types';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import TaskGroupWrapper from './groupTables/task-group-wrapper/task-group-wrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ITaskListConfigV2 } from '@/types/tasks/taskList.types';
import { fetchTaskGroups } from '@/features/tasks/tasks.slice';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';

const ProjectViewTaskList = () => {
  const dispatch = useAppDispatch();

  const { projectId } = useAppSelector(state => state.projectReducer);
  const { taskGroups, loadingGroups, group: groupBy, archived, labels, fields, search } = useAppSelector(state => state.taskReducer);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTaskGroups(projectId));
    }
    if (!statusCategories.length) {
      dispatch(fetchStatusesCategories());
    }
  }, [dispatch, projectId, archived, groupBy, labels, fields, search]);

  return (
    <Flex vertical gap={16} style={{ overflowX: 'hidden' }}>
      <TaskListFilters position="list" />

      {loadingGroups ? (
        <Skeleton />
      ) : (
        <TaskGroupWrapper taskGroups={taskGroups} groupBy={groupBy} />
      )}
    </Flex>
  );
};

export default ProjectViewTaskList;
