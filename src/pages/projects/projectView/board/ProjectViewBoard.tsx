import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Empty, Flex, Skeleton } from 'antd';
import BoardSectionCardContainer from './board-section/board-section-container';
import { fetchTaskData, fetchTaskGroups } from '@features/board/board-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setProjectView } from '@/features/project/project.slice';

const ProjectViewBoard = () => {
  const { projectId } = useAppSelector(state => state.projectReducer);
  const { taskGroups, group, loadingGroups, error } = useAppSelector(state => state.boardReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProjectView('kanban'));
    if (projectId) {
      if (!loadingGroups) dispatch(fetchTaskGroups(projectId));
    }
  }, [dispatch, projectId]);

  return (
    <Flex vertical gap={16}>
      <TaskListFilters position={'board'} />

      {loadingGroups ? (
        <Skeleton />
      ) : error ? (
        <Empty />
      ) : (
        <BoardSectionCardContainer
          datasource={taskGroups}
          group={group as 'status' | 'priority' | 'phases' | 'members'}
        />
      )}
    </Flex>
  );
};

export default ProjectViewBoard;
