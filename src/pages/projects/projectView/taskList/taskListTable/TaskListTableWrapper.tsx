import { Button, Collapse, ConfigProvider, Typography } from 'antd';
import React from 'react';
import { TaskType } from '../../../../../types/task.types';
import { RightOutlined } from '@ant-design/icons';
import { colors } from '../../../../../styles/colors';
import UpdateTaskDrawer from '../../../../../features/tasks/taskCreationAndUpdate/UpdateTaskDrawer';
import './taskListTableWrapper.css';
import TaskListTable from './TaskListTable';

const TaskListTableWrapper = ({ taskList }: { taskList: TaskType[] }) => {
  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        components: {
          Collapse: {
            headerPadding: 0,
            contentPadding: 0,
          },

          Select: {
            colorBorder: colors.transparent,
          },
        },
      }}
    >
      <Collapse
        collapsible="header"
        bordered={false}
        ghost={true}
        expandIcon={({ isActive }) => (
          <Button
            className="custom-collapse-button"
            style={{
              backgroundColor: colors.deepLightGray,
              border: 'none',
              borderBottomLeftRadius: isActive ? 0 : 4,
              borderBottomRightRadius: isActive ? 0 : 4,
            }}
            icon={<RightOutlined rotate={isActive ? 90 : 0} />}
          >
            <Typography.Text style={{ fontSize: 14 }}>
              Todo ({taskList.length})
            </Typography.Text>
          </Button>
        )}
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            className: 'custom-collapse-content-box',
            children: <TaskListTable taskList={taskList} />,
          },
        ]}
      />

      {/* update task drawer  */}
      <UpdateTaskDrawer taskId={'SP-1'} />
    </ConfigProvider>
  );
};

export default TaskListTableWrapper;
