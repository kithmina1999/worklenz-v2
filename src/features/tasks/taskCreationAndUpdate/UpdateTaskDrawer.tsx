import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  ConfigProvider,
  Drawer,
  Input,
  Progress,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '../taskSlice';
import StatusDropdown from '../../../components/taskListCommon/statusDropdown/StatusDropdown';
import { colors } from '../../../styles/colors';
import DescriptionEditor from './taskDrawerComponents/DescriptionEditor';
import TaskDetailsForm from './taskDrawerComponents/TaskDetailsForm';

type UpdateTaskDrawerProps = {
  taskId: string | null;
};

const UpdateTaskDrawer = ({ taskId }: UpdateTaskDrawerProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState<string>('');

  // Selectors for drawer state and current task details
  const isDrawerOpen = useAppSelector(
    (state) => state.taskReducer.isUpdateTaskDrawerOpen
  );

  // get currently selected task
  const selectedTask = useAppSelector((state) => state.taskReducer.tasks).find(
    (task) => task.taskId === taskId
  );

  // Load task details into state when selectedTask changes
  // Update form fields when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.task);
    }
  }, [selectedTask]);

  const panelStyle: React.CSSProperties = {
    border: 'none',
  };

  // Info items (updated with pre-filled values)
  const infoItems = [
    {
      key: 'details',
      label: <Typography.Text strong>Details</Typography.Text>,
      children: <TaskDetailsForm selectedTask={selectedTask || null} />,
      style: panelStyle,
    },
    {
      key: 'description',
      label: <Typography.Text strong>Description</Typography.Text>,
      children: <DescriptionEditor selectedTask={selectedTask || null} />,
      style: panelStyle,
    },
    {
      key: 'subTasks',
      label: <Typography.Text strong>Sub Tasks</Typography.Text>,
      children: <Progress percent={selectedTask?.progress || 0} />,
      style: panelStyle,
    },
    {
      key: 'dependencies',
      label: <Typography.Text strong>Dependencies</Typography.Text>,
      children: (
        <Button
          type="text"
          style={{
            backgroundColor: colors.transparent,
            color: colors.skyBlue,
          }}
        >
          + Add new dependencies
        </Button>
      ),
      style: panelStyle,
    },
    {
      key: 'attachments',
      label: <Typography.Text strong>Attachments (0)</Typography.Text>,
      children: (
        <Upload
          name="attachments"
          listType="picture-card"
          showUploadList={false}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <Typography.Text style={{ fontSize: 12 }}>
                Choose or drop file to upload
              </Typography.Text>
            </div>
          </button>
        </Upload>
      ),
      style: panelStyle,
    },
  ];

  const tabItems = [
    {
      key: 'info',
      label: 'Info',
      children: (
        <Collapse
          items={infoItems}
          bordered={false}
          defaultActiveKey={['details', 'description']}
        />
      ),
    },
    { key: 'timeLog', label: 'Time Log' },
    { key: 'activityLog', label: 'Activity Log' },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            verticalLabelPadding: '0 0 4px',
          },
          Collapse: {
            headerPadding: 8,
          },
        },
      }}
    >
      <Drawer
        open={isDrawerOpen}
        onClose={() => dispatch(toggleUpdateTaskDrawer())}
        width={720}
        title={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Input
              size="large"
              value={taskName}
              onChange={(e) => setTaskName(e.currentTarget.value)}
              placeholder="Type your Task"
              style={{ maxWidth: 500 }}
            />
            <StatusDropdown currentStatus={selectedTask?.status || 'todo'} />
          </div>
        }
        footer={
          <Input.TextArea
            placeholder="Add a comment"
            style={{ marginBlock: 12 }}
          />
        }
      >
        <Tabs type="card" items={tabItems} />
      </Drawer>
    </ConfigProvider>
  );
};

export default UpdateTaskDrawer;
