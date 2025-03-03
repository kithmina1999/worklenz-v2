import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSocket } from '@/socket/socketContext';
import { useAuthService } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Flex from 'antd/es/flex';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';

import { SocketEvents } from '@/shared/socket-events';
import logger from '@/utils/errorLogger';

import { ITaskListGroup } from '@/types/tasks/taskList.types';
import { ITaskAssigneesUpdateResponse } from '@/types/tasks/task-assignee-update-response';
import { ILabelsChangeResponse } from '@/types/tasks/taskList.types';
import { ITaskListStatusChangeResponse } from '@/types/tasks/task-list-status.types';
import { ITaskListPriorityChangeResponse } from '@/types/tasks/task-list-priority.types';

import {
  fetchTaskAssignees,
  updateTaskAssignees,
  fetchLabelsByProject,
  updateTaskLabel,
  updateTaskStatus,
  updateTaskPriority,
  updateTaskEndDate,
  updateTaskName,
  updateTaskPhase,
  updateTaskStartDate,
} from '@/features/tasks/tasks.slice';
import { fetchLabels } from '@/features/taskAttributes/taskLabelSlice';

import TaskListTableWrapper from '@/pages/projects/projectView/taskList/taskListTable/TaskListTableWrapper';
import TaskListBulkActionsBar from '@/components/taskListCommon/task-list-bulk-actions-bar/task-list-bulk-actions-bar';
import TaskTemplateDrawer from '@/components/task-templates/task-template-drawer';
import { ITaskPhaseChangeResponse } from '@/types/tasks/task-phase-change-response';
import {
  setStartDate,
  setTaskAssignee,
  setTaskEndDate,
  setTaskLabels,
  setTaskPriority,
  setTaskStatus,
} from '@/features/task-drawer/task-drawer.slice';
import { deselectAll } from '@/features/projects/bulkActions/bulkActionSlice';

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
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const loadingAssignees = useAppSelector(state => state.taskReducer.loadingAssignees);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    setGroups(taskGroups);
  }, [taskGroups]);

  // Socket handlers for assignee updates
  useEffect(() => {
    if (!socket) return;

    const handleAssigneesUpdate = (data: ITaskAssigneesUpdateResponse) => {
      if (!data) return;

      const updatedAssignees = data.assignees.map(assignee => ({
        ...assignee,
        selected: true,
      }));

      const groupId = groups.find(group => group.tasks.some(task => task.id === data.id))?.id;

      if (groupId) {
        dispatch(
          updateTaskAssignees({
            groupId,
            taskId: data.id,
            assignees: updatedAssignees,
          })
        );

        dispatch(setTaskAssignee(data));

        if (currentSession?.team_id && !loadingAssignees) {
          dispatch(fetchTaskAssignees(currentSession.team_id));
        }
      }
    };

    socket.on(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(), handleAssigneesUpdate);
    return () => {
      socket.off(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(), handleAssigneesUpdate);
    };
  }, [socket, currentSession?.team_id, loadingAssignees, groups, dispatch]);

  // Socket handlers for label updates
  useEffect(() => {
    if (!socket) return;

    const handleLabelsChange = async (labels: ILabelsChangeResponse) => {
      await Promise.all([
        dispatch(updateTaskLabel(labels)),
        dispatch(setTaskLabels(labels)),
        dispatch(fetchLabels()),
        projectId && dispatch(fetchLabelsByProject(projectId)),
      ]);
    };

    socket.on(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
    socket.on(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);

    return () => {
      socket.off(SocketEvents.TASK_LABELS_CHANGE.toString(), handleLabelsChange);
      socket.off(SocketEvents.CREATE_LABEL.toString(), handleLabelsChange);
    };
  }, [socket, dispatch, projectId]);

  // Socket handlers for status updates
  useEffect(() => {
    if (!socket) return;

    const handleTaskStatusChange = (response: ITaskListStatusChangeResponse) => {
      dispatch(updateTaskStatus(response));
      dispatch(setTaskStatus(response));
      dispatch(deselectAll());
    };

    const handleTaskProgress = (data: unknown) => {
      logger.info('Task progress update:', data);
    };

    socket.on(SocketEvents.TASK_STATUS_CHANGE.toString(), handleTaskStatusChange);
    socket.on(SocketEvents.GET_TASK_PROGRESS.toString(), handleTaskProgress);

    return () => {
      socket.off(SocketEvents.TASK_STATUS_CHANGE.toString(), handleTaskStatusChange);
      socket.off(SocketEvents.GET_TASK_PROGRESS.toString(), handleTaskProgress);
    };
  }, [socket, dispatch]);

  // Add socket handlers for priority updates
  useEffect(() => {
    if (!socket) return;

    const handlePriorityChange = (response: ITaskListPriorityChangeResponse) => {
      dispatch(updateTaskPriority(response));
      dispatch(setTaskPriority(response));
      dispatch(deselectAll());
    };

    socket.on(SocketEvents.TASK_PRIORITY_CHANGE.toString(), handlePriorityChange);

    return () => {
      socket.off(SocketEvents.TASK_PRIORITY_CHANGE.toString(), handlePriorityChange);
    };
  }, [socket, dispatch]);

  // Add socket handlers for due date updates
  useEffect(() => {
    if (!socket) return;

    const handleEndDateChange = (task: {
      id: string;
      parent_task: string | null;
      end_date: string;
    }) => {
      dispatch(updateTaskEndDate({ task }));
      dispatch(setTaskEndDate(task));
    };

    socket.on(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleEndDateChange);

    return () => {
      socket.off(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleEndDateChange);
    };
  }, [socket, dispatch]);

  // Socket handlers for task name updates
  useEffect(() => {
    if (!socket) return;

    const handleTaskNameChange = (data: { id: string; parent_task: string; name: string }) => {
      dispatch(updateTaskName(data));
    };

    socket.on(SocketEvents.TASK_NAME_CHANGE.toString(), handleTaskNameChange);

    return () => {
      socket.off(SocketEvents.TASK_NAME_CHANGE.toString(), handleTaskNameChange);
    };
  }, [socket, dispatch]);

  // Socket handlers for phase updates
  useEffect(() => {
    if (!socket) return;

    const handlePhaseChange = (data: ITaskPhaseChangeResponse) => {
      dispatch(updateTaskPhase(data));
      dispatch(deselectAll());
    };

    socket.on(SocketEvents.TASK_PHASE_CHANGE.toString(), handlePhaseChange);

    return () => {
      socket.off(SocketEvents.TASK_PHASE_CHANGE.toString(), handlePhaseChange);
    };
  }, [socket, dispatch]);

  // Add socket handler for start date updates
  useEffect(() => {
    if (!socket) return;

    const handleStartDateChange = (task: {
      id: string;
      parent_task: string | null;
      start_date: string;
    }) => {
      dispatch(updateTaskStartDate({ task }));
      dispatch(setStartDate(task));
    };

    socket.on(SocketEvents.TASK_START_DATE_CHANGE.toString(), handleStartDateChange);

    return () => {
      socket.off(SocketEvents.TASK_START_DATE_CHANGE.toString(), handleStartDateChange);
    };
  }, [socket, dispatch]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const activeGroupId = active.data.current?.groupId;
    const overGroupId = over.data.current?.groupId;
    const activeTaskId = active.id;
    const overTaskId = over.id;

    const sourceGroup = groups.find(g => g.id === activeGroupId);
    const targetGroup = groups.find(g => g.id === overGroupId);

    if (!sourceGroup || !targetGroup) return;

    const fromIndex = sourceGroup.tasks.findIndex(t => t.id === activeTaskId);
    const toIndex = targetGroup.tasks.findIndex(t => t.id === overTaskId);

    if (fromIndex === -1) return;

    const task = sourceGroup.tasks[fromIndex];
    const toPos = targetGroup.tasks[toIndex]?.sort_order;

    // Emit reordering event
    socket?.emit(SocketEvents.TASK_SORT_ORDER_CHANGE.toString(), {
      project_id: projectId,
      from_index: sourceGroup.tasks[fromIndex].sort_order,
      to_index: toPos || targetGroup.tasks[targetGroup.tasks.length - 1]?.sort_order || -1,
      to_last_index: !toPos,
      from_group: sourceGroup.id,
      to_group: targetGroup.id,
      group_by: groupBy,
      task,
      team_id: currentSession?.team_id,
    });

    // Request progress update after reordering
    socket?.once(SocketEvents.TASK_SORT_ORDER_CHANGE.toString(), () => {
      socket.emit(SocketEvents.GET_TASK_PROGRESS.toString(), task.id);
    });

    // Update local state
    setGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === activeGroupId) {
          const newTasks = [...group.tasks];
          newTasks.splice(fromIndex, 1);
          return { ...group, tasks: newTasks };
        }

        if (group.id === overGroupId) {
          const newTasks = [...group.tasks];
          if (activeGroupId === overGroupId) {
            const [movedTask] = newTasks.splice(fromIndex, 1);
            newTasks.splice(toIndex, 0, movedTask);
          } else {
            newTasks.splice(toIndex, 0, task);
          }
          return { ...group, tasks: newTasks };
        }

        return group;
      });
    });
  };

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
          <TaskTemplateDrawer showDrawer={false} selectedTemplateId="" onClose={() => {}} />,
          document.body,
          'task-template-drawer'
        )}
      </Flex>
    </DndContext>
  );
};

export default TaskGroupWrapper;
