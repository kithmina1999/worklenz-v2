import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { TaskType } from '../../../../types/task.types';
import TaskListFilters from '../taskList/taskListFilters/TaskListFilters';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import CommonStatusSection from '../../../../components/board/commonStatusSection/CommonStatusSection';
import { toggleDrawer } from '../../../../features/projects/singleProject/status/statusSlice';
import { useSelectedProject } from '../../../../hooks/useSelectedProject';

const ProjectViewBoard: React.FC = () => {
  const dataSource: TaskType[] = useAppSelector(
    (state) => state.taskReducer.tasks
  );

  // get selected project details
  const selectedProject = useSelectedProject();

  const projectStatusList = useAppSelector(
    (state) => state.statusReducer.projectWiseStatusList
  ).find(
    (project) => project.projectId === selectedProject?.projectId
  )?.statusList;

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
          {projectStatusList?.map((status) => {
            // Filter tasks based on the current status
            const filteredTasks = dataSource.filter(
              (task) => task.status === status.statusName
            );
            return (
              <CommonStatusSection
                key={status.statusId}
                statusId={status.statusId}
                status={status.statusName}
                dataSource={filteredTasks}
              />
            );
          })}
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
