import { useEffect } from 'react';
import Flex from 'antd/es/flex';
import Skeleton from 'antd/es/skeleton';

import TaskListFilters from './taskListFilters/TaskListFilters';
import TaskGroupWrapper from './groupTables/task-group-wrapper/task-group-wrapper';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups, fetTaskListColumns } from '@/features/tasks/tasks.slice';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';
import { fetchPhasesByProjectId } from '@/features/projects/singleProject/phase/phases.slice';

const ProjectViewTaskList = () => {
  const dispatch = useAppDispatch();

  const { projectId } = useAppSelector(state => state.projectReducer);
  const {
    taskGroups,
    loadingGroups,
    groupBy,
    archived,
    fields,
    search,
  } = useAppSelector(state => state.taskReducer);
  const { statusCategories, loading: loadingStatusCategories } = useAppSelector(state => state.taskStatusReducer);
  const { loadingPhases } = useAppSelector(state => state.phaseReducer);
  const { loadingColumns } = useAppSelector(state => state.taskReducer);

  useEffect(() => {
    if (projectId) {
      if (!loadingGroups) dispatch(fetchTaskGroups(projectId));
      if (!loadingColumns) dispatch(fetTaskListColumns(projectId));
      if (!loadingPhases) dispatch(fetchPhasesByProjectId(projectId));
    }
    if (!statusCategories.length) {
      dispatch(fetchStatusesCategories());
    }
  }, [dispatch, projectId, groupBy, fields, search, archived]);

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
