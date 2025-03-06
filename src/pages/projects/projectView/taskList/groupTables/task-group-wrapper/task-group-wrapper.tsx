import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSocket } from '@/socket/socketContext';
import { useAuthService } from '@/hooks/useAuth';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Flex from 'antd/es/flex';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

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
import { ITaskPhaseChangeResponse } from '@/types/tasks/task-phase-change-response';
import { InlineMember } from '@/types/teamMembers/inlineMember.types';

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
  IGroupBy,
} from '@/features/tasks/tasks.slice';
import { fetchLabels } from '@/features/taskAttributes/taskLabelSlice';

import TaskListTableWrapper from '@/pages/projects/projectView/taskList/taskListTable/TaskListTableWrapper';
import TaskListBulkActionsBar from '@/components/taskListCommon/task-list-bulk-actions-bar/task-list-bulk-actions-bar';
import TaskTemplateDrawer from '@/components/task-templates/task-template-drawer';
import {
  setStartDate,
  setTaskAssignee,
  setTaskEndDate,
  setTaskLabels,
  setTaskPriority,
  setTaskStatus,
  setTaskSubscribers,
} from '@/features/task-drawer/task-drawer.slice';
import { deselectAll } from '@/features/projects/bulkActions/bulkActionSlice';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { evt_project_task_list_drag_and_move } from '@/shared/worklenz-analytics-events';

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
  const { trackMixpanelEvent } = useMixpanelTracking(); 

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

  // Socket handler for assignee updates
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

  // Socket handler for label updates
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

  // Socket handler for status updates
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

  // Socket handler for priority updates
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

  // Socket handler for due date updates
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

  // Socket handler for task name updates
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

  // Socket handler for phase updates
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

  // Socket handler for start date updates
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

  // Socket handler for task subscribers updates
  useEffect(() => {
    if (!socket) return;

    const handleTaskSubscribersChange = (data: InlineMember[]) => {
      dispatch(setTaskSubscribers(data));
    };

    socket.on(SocketEvents.TASK_SUBSCRIBERS_CHANGE.toString(), handleTaskSubscribersChange);

    return () => {
      socket.off(SocketEvents.TASK_SUBSCRIBERS_CHANGE.toString(), handleTaskSubscribersChange);
    };
  }, [socket, dispatch]);

  const resetTaskRowStyles = useCallback(() => {
    document.querySelectorAll<HTMLElement>('.task-row').forEach(row => {
      row.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
      row.style.cssText = 'opacity: 1 !important; position: relative !important; z-index: auto !important; transform: none !important;';
      row.setAttribute('data-is-dragging', 'false');
    });
  }, []);

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
    
    // Add smooth transition to the dragged item
    const draggedElement = document.querySelector(`[data-id="${active.id}"]`);
    if (draggedElement) {
      (draggedElement as HTMLElement).style.transition = 'transform 0.2s ease';
    }
  }, []);

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const activeGroupId = active.data.current?.groupId;
    const overGroupId = over.data.current?.groupId;
    const activeTaskId = active.id;
    const overTaskId = over.id;

    const sourceGroup = taskGroups.find(g => g.id === activeGroupId);
    const targetGroup = taskGroups.find(g => g.id === overGroupId);

    if (!sourceGroup || !targetGroup) return;

    const fromIndex = sourceGroup.tasks.findIndex(t => t.id === activeTaskId);
    if (fromIndex === -1) return;

    // Create a deep clone of the task to avoid reference issues
    const task = JSON.parse(JSON.stringify(sourceGroup.tasks[fromIndex]));
    
    // Update task properties based on target group
    if (activeGroupId !== overGroupId) {
      switch (groupBy) {
        case IGroupBy.STATUS:
          task.status = overGroupId;
          task.status_color = targetGroup.color_code;
          task.status_color_dark = targetGroup.color_code_dark;
          break;
        case IGroupBy.PRIORITY:
          task.priority = overGroupId;
          task.priority_color = targetGroup.color_code;
          task.priority_color_dark = targetGroup.color_code_dark;
          break;
        case IGroupBy.PHASE:
          task.phase_id = overGroupId;
          task.phase_color = targetGroup.color_code;
          task.phase_color_dark = targetGroup.color_code_dark;
          break;
      }
    }
    
    const isTargetGroupEmpty = targetGroup.tasks.length === 0;
    
    // Calculate toIndex - for empty groups, always add at index 0
    const toIndex = isTargetGroupEmpty ? 0 : 
      (overTaskId ? targetGroup.tasks.findIndex(t => t.id === overTaskId) : targetGroup.tasks.length);
    
    // Calculate toPos similar to Angular implementation
    const toPos = isTargetGroupEmpty ? -1 : 
      (targetGroup.tasks[toIndex]?.sort_order || targetGroup.tasks[targetGroup.tasks.length - 1]?.sort_order || -1);

    // Update Redux state
    if (activeGroupId === overGroupId) {
      // Same group - move within array
      const updatedTasks = [...sourceGroup.tasks];
      updatedTasks.splice(fromIndex, 1);
      updatedTasks.splice(toIndex, 0, task);
      
      dispatch({
        type: 'taskReducer/reorderTasks',
        payload: {
          activeGroupId,
          overGroupId,
          fromIndex,
          toIndex,
          task,
          updatedSourceTasks: updatedTasks,
          updatedTargetTasks: updatedTasks
        }
      });
    } else {
      // Different groups - transfer between arrays
      const updatedSourceTasks = sourceGroup.tasks.filter((_, i) => i !== fromIndex);
      const updatedTargetTasks = [...targetGroup.tasks];
      
      if (isTargetGroupEmpty) {
        updatedTargetTasks.push(task);
      } else if (toIndex >= 0 && toIndex <= updatedTargetTasks.length) {
        updatedTargetTasks.splice(toIndex, 0, task);
      } else {
        updatedTargetTasks.push(task);
      }
      
      dispatch({
        type: 'taskReducer/reorderTasks',
        payload: {
          activeGroupId,
          overGroupId,
          fromIndex,
          toIndex,
          task,
          updatedSourceTasks,
          updatedTargetTasks
        }
      });
    }

    // Emit socket event
    socket?.emit(SocketEvents.TASK_SORT_ORDER_CHANGE.toString(), {
      project_id: projectId,
      from_index: sourceGroup.tasks[fromIndex].sort_order,
      to_index: toPos,
      to_last_index: isTargetGroupEmpty,
      from_group: sourceGroup.id,
      to_group: targetGroup.id,
      group_by: groupBy,
      task: sourceGroup.tasks[fromIndex], // Send original task to maintain references
      team_id: currentSession?.team_id,
    });

    // Reset styles
    setTimeout(resetTaskRowStyles, 0);

    trackMixpanelEvent(evt_project_task_list_drag_and_move);
  }, [taskGroups, groupBy, projectId, currentSession?.team_id, dispatch, socket, resetTaskRowStyles, trackMixpanelEvent]);

  // Add CSS styles for drag and drop animations
  useIsomorphicLayoutEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .task-row {
        opacity: 1 !important;
        position: relative !important;
        z-index: auto !important;
        transform: none !important;
        transition: transform 0.2s ease, opacity 0.2s ease !important;
        will-change: transform, opacity;
      }
      
      .task-row[data-is-dragging="true"] {
        z-index: 100 !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle animation cleanup after drag ends
  useIsomorphicLayoutEffect(() => {
    if (activeId === null) {
      // Final cleanup after React updates DOM
      const timeoutId = setTimeout(resetTaskRowStyles, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [activeId, resetTaskRowStyles]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Flex gap={24} vertical>
        {taskGroups?.map(taskGroup => (
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
