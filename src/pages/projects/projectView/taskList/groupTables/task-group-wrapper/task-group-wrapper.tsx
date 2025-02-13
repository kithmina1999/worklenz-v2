import { useAppSelector } from '@/hooks/useAppSelector';
import Flex from 'antd/es/flex';
import TaskListTableWrapper from '@/pages/projects/projectView/taskList/taskListTable/TaskListTableWrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ITaskListGroup } from '@/types/tasks/taskList.types';
import TaskListBulkActionsBar from '@/components/taskListCommon/task-list-bulk-actions-bar/task-list-bulk-actions-bar';
import { createPortal } from 'react-dom';
import TaskTemplateDrawer from '@/features/settings/taskTemplates/TaskTemplateDrawer';

interface TaskGroupWrapperProps {
  taskGroups: ITaskListGroup[];
  groupBy: string;
}

const TaskGroupWrapper = ({ taskGroups, groupBy }: TaskGroupWrapperProps) => {
  const dispatch = useAppDispatch();

  const selectedTaskIdsList = useAppSelector(state => state.bulkActionReducer.selectedTaskIdsList);

  const themeMode = useAppSelector(state => state.themeReducer.mode);

  return (
    <Flex gap={24} vertical>
      {taskGroups.map(taskGroup => (
        <TaskListTableWrapper
          key={taskGroup.id}
          taskList={taskGroup.tasks}
          tableId={taskGroup.id}
          name={taskGroup.name}
          groupBy={groupBy}
          statusCategory={taskGroup.category_id}
          color={themeMode === 'dark' ? taskGroup.color_code_dark : taskGroup.color_code}
        />
      ))}

      {/* {selectedTaskIdsList.length > 0 && <TaskListBulkActionsBar />} */}

      {/* bulk action container ==> used tailwind to recreate the animation */}
      {createPortal(<TaskListBulkActionsBar />, document.body, 'bulk-action-container')}
      <TaskTemplateDrawer />
    </Flex>
  );
};

export default TaskGroupWrapper;
