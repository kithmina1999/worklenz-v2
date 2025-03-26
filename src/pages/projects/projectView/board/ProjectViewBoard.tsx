import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import TaskListFilters from '../taskList/task-list-filters/task-list-filters';
import { Empty, Flex, Skeleton } from 'antd';
import BoardSectionCardContainer from './board-section/board-section-container';
import {
  fetchBoardTaskGroups,
  reorderTaskGroups,
  moveTaskBetweenGroups,
} from '@features/board/board-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCorners,
  DragOverlay,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import BoardViewTaskCard from './board-section/board-task-card/board-view-task-card';
import { useSearchParams } from 'react-router-dom';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';
import useTabSearchParam from '@/hooks/useTabSearchParam';

const ProjectViewBoard = () => {
  const dispatch = useAppDispatch();
  const { projectView } = useTabSearchParam();

  const { projectId } = useAppSelector(state => state.projectReducer);
  const { taskGroups, groupBy, loadingGroups, error } = useAppSelector(state => state.boardReducer);
  const { statusCategories, loading: loadingStatusCategories } = useAppSelector(
    state => state.taskStatusReducer
  );
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    if (projectId && groupBy && projectView === 'kanban') {
      if (!loadingGroups) {
        dispatch(fetchBoardTaskGroups(projectId));
      }
    }
  }, [dispatch, projectId, groupBy, projectView]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(active.data.current);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';
    const isOverSection = over.data.current?.type === 'section';

    // Handle task movement between sections
    if (isActiveTask && (isOverTask || isOverSection)) {
      // If we're over a task, we want to insert at that position
      // If we're over a section, we want to append to the end
      const activeTaskId = active.data.current?.task.id;
      const sourceGroupId = active.data.current?.sectionId;
      const targetGroupId = isOverTask ? over.data.current?.sectionId : over.id;

      // Find the target index
      let targetIndex = -1;
      if (isOverTask) {
        const overTaskId = over.data.current?.task.id;
        const targetGroup = taskGroups.find(group => group.id === targetGroupId);
        if (targetGroup) {
          targetIndex = targetGroup.tasks.findIndex(task => task.id === overTaskId);
        }
      }

      // Dispatch the action to move the task
      dispatch(
        moveTaskBetweenGroups({
          taskId: activeTaskId,
          sourceGroupId,
          targetGroupId,
          targetIndex,
        })
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    setActiveItem(null);
  };

  useEffect(() => {
    if (!statusCategories.length && projectId) {
      dispatch(fetchStatusesCategories());
    }
  }, [dispatch, projectId]);

  return (
    <Flex vertical gap={16}>
      <TaskListFilters position={'board'} />

      <Skeleton active loading={loadingGroups}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <BoardSectionCardContainer
            datasource={taskGroups}
            group={groupBy as 'status' | 'priority' | 'phases'}
          />
          <DragOverlay>
            {activeItem?.type === 'task' && (
              <BoardViewTaskCard task={activeItem.task} sectionId={activeItem.sectionId} />
            )}
          </DragOverlay>
        </DndContext>
      </Skeleton>
    </Flex>
  );
};

export default ProjectViewBoard;
