import React, { useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';

import { useAppSelector } from '../../../../hooks/useAppSelector';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice';
import KanbanGroup from '@/components/board/kanban-group/kanban-group';
import { ITaskListConfigV2 } from '@/types/tasks/taskList.types';
import { fetchStatusesCategories } from '@/features/taskAttributes/taskStatusSlice';
import { fetchTaskGroups } from '@/features/tasks/taskSlice';

const ProjectViewBoard: React.FC = () => {
  const dispatch = useDispatch();

  const { taskGroups, loadingGroups } = useAppSelector(state => state.taskReducer);
  const { statusCategories } = useAppSelector(state => state.taskStatusReducer);
  const groupBy = useAppSelector(state => state.groupByFilterDropdownReducer.groupBy);
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
        isSubtasksInclude: false,
      };
      dispatch(fetchTaskGroups(config) as any);
    }
    if (!statusCategories.length) {
      dispatch(fetchStatusesCategories() as any);
    }
  }, [dispatch, projectId, groupBy]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TaskListFilters position={'board'} />

      <Skeleton active loading={loadingGroups}>
        <div
          style={{
            width: '100%',
            padding: '0 12px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '14px',
          }}
        >
          <div
            style={{
              paddingTop: '6px',
              display: 'flex',
              gap: '10px',
              overflowX: 'scroll',
              paddingBottom: '10px',
            }}
          >
            {taskGroups.map(group => (
              <KanbanGroup
                key={group.id}
                title={group.name}
                tasks={group.tasks}
                id={group.id}
                color={group.color_code}
              />
            ))}

            <Button
              icon={<PlusOutlined />}
              onClick={() => dispatch(toggleDrawer())}
              style={{ flexShrink: 0 }}
            />
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ProjectViewBoard;
