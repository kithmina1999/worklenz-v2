import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { TaskType } from '../../../../types/task.types';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '../../../../features/projects/status/StatusSlice';
import StatusDrawer from '../../../../features/projects/status/StatusDrawer';
import CommonStatusSection from '../../../../components/board/commonStatusSection/CommonStatusSection';

const ProjectViewBoard: React.FC = () => {
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );
  const setOfStatus = useAppSelector((state) => state.statusReducer.status);

  const dispatch = useDispatch();

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TaskListFilters />
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
            justifyContent: 'center',
            gap: '10px',
            overflowX: 'auto',
          }}
        >
          {setOfStatus.map((status) => {
            // Filter tasks based on the current status
            const filteredTasks = dataSource.filter(
              (task) => task.status === status.name
            );
            return (
              <CommonStatusSection
                key={status.name}
                status={status.name}
                color={status.color}
                dataSource={filteredTasks}
              />
            );
          })}
          <Button
            icon={<PlusOutlined />}
            onClick={() => dispatch(toggleDrawer())}
            style={{ flexShrink: 0 }}
          />
          <StatusDrawer />
        </div>
      </div>
    </div>
  );
};

export default ProjectViewBoard;
