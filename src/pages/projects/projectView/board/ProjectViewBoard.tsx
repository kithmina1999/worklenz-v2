import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Empty, Flex, Skeleton } from 'antd';
import BoardSectionCardContainer from './board-section/board-section-container';
import { fetchTaskGroups, reorderTaskGroups } from '@features/board/board-slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import BoardViewTaskCard from './board-section/board-task-card/board-view-task-card';

const ProjectViewBoard = () => {
  const { projectId, projectView } = useAppSelector(state => state.projectReducer);
  const { taskGroups, groupBy, loadingGroups, error } = useAppSelector(state => state.boardReducer);
  const dispatch = useAppDispatch();
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    if (projectId && groupBy && projectView === 'kanban') {
      if (!loadingGroups) {
        dispatch(fetchTaskGroups(projectId));
      }
    }
  }, [dispatch, projectId, groupBy, projectView]);

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
      const updatedGroups = taskGroups.map(group => {
        // If dropping over a task, use its section id
        const targetSectionId = isOverTask ? over.data.current?.sectionId : over.id;

        if (group.id === targetSectionId) {
          const activeTask = active.data.current?.task;
          return {
            ...group,
            tasks: [...group.tasks, { ...activeTask, status_id: group.id }],
          };
        }

        if (group.id === active.data.current?.sectionId) {
          return {
            ...group,
            tasks: group.tasks.filter(task => task.id !== active.data.current?.task.id),
          };
        }
        return group;
      });

      dispatch(reorderTaskGroups(updatedGroups));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    setActiveItem(null);
  };

  return (
    <Flex vertical gap={16}>
      <TaskListFilters position={'board'} />

      {loadingGroups ? (
        <Skeleton />
      ) : error ? (
        <Empty />
      ) : (
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <BoardSectionCardContainer
            datasource={taskGroups}
            group={groupBy as 'status' | 'priority' | 'phases' | 'members'}
          />
          <DragOverlay>
            {activeItem?.type === 'task' && (
              <BoardViewTaskCard task={activeItem.task} sectionId={activeItem.sectionId} />
            )}
          </DragOverlay>
        </DndContext>
      )}
    </Flex>
  );
};

export default ProjectViewBoard;
