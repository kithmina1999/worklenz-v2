import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { TaskType } from '../../../../types/task.types';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import CommonStatusSection from '../../../../components/board/commonStatusSection/CommonStatusSection';
import { useMediaQuery } from 'react-responsive';
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice';

const ProjectViewBoard: React.FC = () => {
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );
  const setOfStatus = useAppSelector((state) => state.statusReducer.status);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ query: '(max-width: 1275px)' });
  const groupBy = useAppSelector((state) => state.groupByFilterDropdownReducer.groupBy)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TaskListFilters position={'board'} />
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
            justifyContent:
              setOfStatus.length > 3
                ? 'flex-start'
                : isTablet
                  ? 'flex-start'
                  : 'center',
            gap: '10px',
            overflowX: 'scroll',
            paddingBottom: '10px',
          }}
        > 
        {groupBy === 'status' &&
          setOfStatus?.map((status) => {
            // Filter tasks based on the current status
            const filteredTasks = dataSource.filter(
              (task) => task.status === status.name
            );
            return (
              <CommonStatusSection
                key={status.name}
                status={status.name}
                category={status.category}
                id={status.id}
                dataSource={filteredTasks}
              />
            );
          })
        }
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(toggleDrawer())}
            style={{ flexShrink: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectViewBoard;
