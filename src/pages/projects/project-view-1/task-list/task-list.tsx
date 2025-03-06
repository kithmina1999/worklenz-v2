import { useEffect } from 'react';
import { Flex, Skeleton } from 'antd';
import TaskListFilters from '@/pages/projects/project-view-1/taskList/taskListFilters/TaskListFilters';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ITaskListConfigV2, ITaskListGroup } from '@/types/tasks/taskList.types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups } from '@/features/tasks/taskSlice';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';

import { columnList } from '@/pages/projects/project-view-1/taskList/taskListTable/columns/columnList';
import StatusGroupTables from '../taskList/statusTables/StatusGroupTables';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { taskGroups, loadingGroups } = useAppSelector(state => state.taskReducer);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);
  const projectId = useAppSelector(state => state.projectReducer.projectId);

  const columnsVisibility = useAppSelector(
    state => state.projectViewTaskListColumnsReducer.columnsVisibility
  );

  const visibleColumns = columnList.filter(
    column => columnsVisibility[column.key as keyof typeof columnsVisibility]
  );

  const onTaskSelect = (taskId: string) => {
    console.log('taskId:', taskId);
  };

  const onTaskExpand = (taskId: string) => {
    console.log('taskId:', taskId);
  };
  useEffect(() => {
    if (projectId) {
      const config: ITaskListConfigV2 = {
        id: projectId,
        field: 'id',
        order: 'desc',
        search: '',
        statuses: '',
        members: '',
        projects: '',
        isSubtasksInclude: true,
      };
      dispatch(fetchTaskGroups(config));
    }
    if (!statusCategories.length) {
      dispatch(fetchStatusesCategories());
    }
  }, [dispatch, projectId]);

  return (
    <Flex vertical gap={16}>
      <TaskListFilters position="list" />
      <Skeleton active loading={loadingGroups}>
        {/* {taskGroups.map((group: ITaskListGroup) => (
          
        ))} */}
      </Skeleton>
    </Flex>
  );
};

export default TaskList;
