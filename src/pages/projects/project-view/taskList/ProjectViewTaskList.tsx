import { useEffect } from 'react';
import { Flex } from 'antd';
import TaskListFilters from './taskListFilters/TaskListFilters';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';
import { fetchTaskGroups } from '@/features/tasks/taskSlice';
import { ITaskListConfigV2 } from '@/types/tasks/taskList.types';
import TanStackTable from '../task-list/task-list-custom';
import TaskListCustom from '../task-list/task-list-custom';
import TaskListTableWrapper from '../task-list/task-list-table-wrapper/task-list-table-wrapper';

const ProjectViewTaskList = () => {
  // sample data from task reducer
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

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
  ];
  return (
    <Flex vertical gap={16} style={{ overflowX: 'hidden' }}>
      <TaskListFilters position="list" />

      {taskGroups.map(group => (
        <TaskListTableWrapper
          key={group.id}
          taskList={group}
          name={group.name || ''}
          color={group.color_code || ''}
          groupId={group.id || ''}
        />
      ))}
    </Flex>
  );
};

export default ProjectViewTaskList;
