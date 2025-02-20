import { useAppSelector } from '@/hooks/useAppSelector';
import Flex from 'antd/es/flex';
import TaskListTableWrapper from '@/pages/projects/projectView/taskList/taskListTable/TaskListTableWrapper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ITaskListGroup } from '@/types/tasks/taskList.types';
import TaskListBulkActionsBar from '@/components/taskListCommon/task-list-bulk-actions-bar/task-list-bulk-actions-bar';
import { createPortal } from 'react-dom';
import TaskTemplateDrawer from '@/components/task-templates/task-template-drawer';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';

interface TaskGroupWrapperProps {
  taskGroups: ITaskListGroup[];
  groupBy: string;
}

const TaskGroupWrapper = ({ taskGroups, groupBy }: TaskGroupWrapperProps) => {
  const dispatch = useAppDispatch();
  const [groups, setGroups] = useState(taskGroups);
  const [activeId, setActiveId] = useState<string | null>(null);

  const selectedTaskIdsList = useAppSelector(state => state.bulkActionReducer.selectedTaskIdsList);
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeGroupId = active.data.current?.groupId;
    const overGroupId = over.data.current?.groupId;
    const activeTaskId = active.id;
    const overTaskId = over.id;
    
    setGroups(prevGroups => {
      // Find the source and target groups
      const sourceGroup = prevGroups.find(g => g.id === activeGroupId);
      const targetGroup = prevGroups.find(g => g.id === overGroupId);
      
      if (!sourceGroup || !targetGroup) return prevGroups;

      // Find the task being moved
      const taskToMove = sourceGroup.tasks.find(task => task.id === activeTaskId);
      if (!taskToMove) return prevGroups;

      // If moving within the same group
      if (activeGroupId === overGroupId) {
        const taskIndex = sourceGroup.tasks.findIndex(task => task.id === activeTaskId);
        const overIndex = sourceGroup.tasks.findIndex(task => task.id === overTaskId);
        
        return prevGroups.map(group => {
          if (group.id === activeGroupId) {
            const newTasks = [...group.tasks];
            newTasks.splice(taskIndex, 1);
            newTasks.splice(overIndex, 0, taskToMove);
            return { ...group, tasks: newTasks };
          }
          return group;
        });
      }

      // If moving between groups
      return prevGroups.map(group => {
        if (group.id === activeGroupId) {
          return {
            ...group,
            tasks: group.tasks.filter(task => task.id !== activeTaskId),
          };
        }
        if (group.id === overGroupId) {
          const overIndex = group.tasks.findIndex(task => task.id === overTaskId);
          const newTasks = [...group.tasks];
          if (overIndex >= 0) {
            newTasks.splice(overIndex, 0, taskToMove);
          } else {
            newTasks.push(taskToMove);
          }
          return { ...group, tasks: newTasks };
        }
        return group;
      });
    });

    // Here you would typically dispatch an action to update the backend
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Flex gap={24} vertical>
        {groups.map(taskGroup => (
          <TaskListTableWrapper
            key={taskGroup.id}
            taskList={taskGroup.tasks}
            tableId={taskGroup.id}
            name={taskGroup.name}
            groupBy={groupBy}
            statusCategory={taskGroup.category_id}
            color={themeMode === 'dark' ? taskGroup.color_code_dark : taskGroup.color_code}
            activeId={activeId}
          />
        ))}

        {/* {selectedTaskIdsList.length > 0 && <TaskListBulkActionsBar />} */}

        {/* bulk action container ==> used tailwind to recreate the animation */}
        {createPortal(<TaskListBulkActionsBar />, document.body, 'bulk-action-container')}
        {createPortal(
          <TaskTemplateDrawer showDrawer={false} selectedTemplateId={''} onClose={() => {}} />,
          document.body,
          'task-template-drawer',
        )}
      </Flex>
    </DndContext>
  );
};

export default TaskGroupWrapper;
