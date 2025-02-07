import { useEffect } from 'react';
import Flex from 'antd/es/flex';
import Skeleton from 'antd/es/skeleton';

import TaskListFilters from './taskListFilters/TaskListFilters';
import TaskGroupWrapper from './groupTables/task-group-wrapper/task-group-wrapper';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups, fetTaskListColumns } from '@/features/tasks/tasks.slice';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';

const ProjectViewTaskList = () => {
  const dispatch = useAppDispatch();

  const { projectId } = useAppSelector(state => state.projectReducer);
  const {
    taskGroups,
    loadingGroups,
    group: groupBy,
    archived,
    labels,
    fields,
    search,
    priorities,
    members,
  } = useAppSelector(state => state.taskReducer);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);


  useEffect(() => {
    if (projectId) {
      dispatch(fetchTaskGroups(projectId));
      dispatch(fetTaskListColumns(projectId));
    }
    if (!statusCategories.length) {
      dispatch(fetchStatusesCategories());
    }
  }, [dispatch, projectId, archived, groupBy, labels, fields, search, priorities, members]);

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
