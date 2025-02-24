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
import { useState, useEffect } from 'react';
import { ITaskAssigneesUpdateResponse } from '@/types/tasks/task-assignee-update-response';
import { SocketEvents } from '@/shared/socket-events';
import logger from '@/utils/errorLogger';
import { useSocket } from '@/socket/socketContext';
import { useAuthService } from '@/hooks/useAuth';
import { fetchTaskAssignees, updateTaskAssignees } from '@/features/tasks/tasks.slice';
import { ILabelsChangeResponse } from '@/types/tasks/taskList.types';
import { fetchLabels } from '@/features/taskAttributes/taskLabelSlice';
import { fetchLabelsByProject, updateTaskLabel } from '@/features/tasks/tasks.slice';

interface TaskGroupWrapperProps {
  taskGroups: ITaskListGroup[];
  groupBy: string;
}

const TaskGroupWrapper = ({ taskGroups, groupBy }: TaskGroupWrapperProps) => {
  const [groups, setGroups] = useState(taskGroups);
  const [activeId, setActiveId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const currentSession = useAuthService().getCurrentSession();
  const loadingAssignees = useAppSelector(state => state.taskReducer.loadingAssignees);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Update local groups state when taskGroups prop changes
  useEffect(() => {
    setGroups(taskGroups);
  }, [taskGroups]);

  useEffect(() => {
    if (!socket) return;

    const handleAssigneesUpdate = (data: ITaskAssigneesUpdateResponse) => {
      logger.info('change assignees response:- ', data);
      if (data) {
        const updatedAssignees = data.assignees.map(assignee => ({
          ...assignee,
          selected: true,
        }));

        // Find which group contains this task
        const groupId = groups.find(group => group.tasks.some(task => task.id === data.id))?.id;

        if (groupId) {
          dispatch(
            updateTaskAssignees({
              groupId,
              taskId: data.id,
              assignees: updatedAssignees,
            })
          );

          if (currentSession?.team_id && !loadingAssignees) {
            dispatch(fetchTaskAssignees(currentSession.team_id));
          }
        }
      }
    };

    socket.on(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(), handleAssigneesUpdate);

    return () => {
      socket.off(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(), handleAssigneesUpdate);
    };
  }, [socket, currentSession?.team_id, loadingAssignees, groups]);

  // Add label socket handlers
  useEffect(() => {
    if (!socket) return;

    const handleLabelsChange = async (labels: ILabelsChangeResponse) => {
      await dispatch(updateTaskLabel(labels));
      await dispatch(fetchLabels());
      if (projectId) await dispatch(fetchLabelsByProject(projectId));
    };

    socket.on(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
    socket.on(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);

    return () => {
      socket.off(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
      socket.off(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);
    };
  }, [socket, dispatch, projectId]);

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

    // Find source and target groups
    const sourceGroup = groups.find(g => g.id === activeGroupId);
    const targetGroup = groups.find(g => g.id === overGroupId);
    
    if (!sourceGroup || !targetGroup) return;

    // Find task indices
    const fromIndex = sourceGroup.tasks.findIndex(t => t.id === activeTaskId);
    const toIndex = targetGroup.tasks.findIndex(t => t.id === overTaskId);
    
    if (fromIndex === -1) return;

    const task = sourceGroup.tasks[fromIndex];
    const toPos = targetGroup.tasks[toIndex]?.sort_order;

    // Emit socket event for task reordering
    socket?.emit(SocketEvents.TASK_SORT_ORDER_CHANGE.toString(), {
      project_id: projectId,
      from_index: sourceGroup.tasks[fromIndex].sort_order,
      to_index: toPos || targetGroup.tasks[targetGroup.tasks.length - 1]?.sort_order || -1,
      to_last_index: !toPos,
      from_group: sourceGroup.id,
      to_group: targetGroup.id,
      group_by: groupBy,
      task,
      team_id: currentSession?.team_id
    });

    // Listen for completion and request task progress update
    socket?.once(SocketEvents.TASK_SORT_ORDER_CHANGE.toString(), () => {
      socket.emit(SocketEvents.GET_TASK_PROGRESS.toString(), task.id);
    });

    // Update local state
    setGroups(prevGroups => {
      const newGroups = prevGroups.map(group => {
        if (group.id === activeGroupId) {
          // Handle source group
          const newTasks = [...group.tasks];
          newTasks.splice(fromIndex, 1);
          return { ...group, tasks: newTasks };
        }
        if (group.id === overGroupId) {
          // Handle target group
          const newTasks = [...group.tasks];
          if (activeGroupId === overGroupId) {
            // Same group - move task within array
            const [movedTask] = newTasks.splice(fromIndex, 1);
            newTasks.splice(toIndex, 0, movedTask);
          } else {
            // Different group - insert task at new position
            newTasks.splice(toIndex, 0, task);
          }
          return { ...group, tasks: newTasks };
        }
        return group;
      });

      return newGroups;
    });
  };

  // Add socket event listeners for task updates
  useEffect(() => {
    if (!socket) return;

    const handleTaskProgress = (data: any) => {
      // Handle task progress updates
      console.log('Task progress update:', data);
    };

    socket.on(SocketEvents.GET_TASK_PROGRESS.toString(), handleTaskProgress);

    return () => {
      socket.off(SocketEvents.GET_TASK_PROGRESS.toString(), handleTaskProgress);
    };
  }, [socket]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Flex gap={24} vertical>
        {groups?.map(taskGroup => (
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

        {createPortal(<TaskListBulkActionsBar />, document.body, 'bulk-action-container')}

        {createPortal(
          <TaskTemplateDrawer showDrawer={false} selectedTemplateId={''} onClose={() => {}} />,
          document.body,
          'task-template-drawer'
        )}
      </Flex>
    </DndContext>
  );
};

export default TaskGroupWrapper;
