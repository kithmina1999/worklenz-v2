import { Flex } from 'antd';
import TaskListFilters from './taskListFilters/TaskListFilters';
import { TaskType } from '../../../../types/task.types';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import StatusGroupTables from './statusTables/StatusGroupTables';
import { ITaskListGroup } from '@/types/tasks/taskList.types';

const ProjectViewTaskList = () => {
  // sample data from task reducer
  const dataSource: TaskType[] = useAppSelector(state => state.taskReducer.tasks);

  return (
    <Flex vertical gap={16} style={{overflowX: 'hidden'}}>
      <TaskListFilters position="list" />

      <StatusGroupTables datasource={dataSource} />
    </Flex>
  );
};

export default ProjectViewTaskList;
