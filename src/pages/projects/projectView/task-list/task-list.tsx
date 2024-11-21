import { useEffect } from 'react';
import { Flex, Skeleton } from 'antd';
import TaskListFilters from '@/pages/projects/projectView/taskList/taskListFilters/TaskListFilters';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ITaskListConfigV2, ITaskListGroup } from '@/types/tasks/taskList.types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups } from '@/features/tasks/taskSlice';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';
import TaskListTableWrapper from './task-list-table-wrapper/task-list-table-wrapper';

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { taskGroups, loadingGroups } = useAppSelector(state => state.taskReducer);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);
  const projectId = useAppSelector(state => state.projectReducer.projectId);

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
        {taskGroups.map(group => (
          <TaskListTableWrapper taskList={group} groupId={group.id} name={group.name} color={group.color_code} key={group.id}></TaskListTableWrapper>
        ))}
      </Skeleton>
    </Flex>
  );
};

export default TaskList;
