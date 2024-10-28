import React, { useEffect, useState } from 'react';
import {
  Button,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Progress,
  Select,
  Tabs,
  Tag,
  Typography,
  Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '../taskSlice';
import StatusDropdown from '../../../components/taskListCommon/statusDropdown/StatusDropdown';
import { colors } from '../../../styles/colors';

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
  const taskList = useAppSelector((state) => state.taskReducer.tasks);
  const selectedTask = taskList.find((task) => task.taskId === taskId);

  // Load task details into state when selectedTask changes
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
      children: (
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            phase: selectedTask?.phase,
            // assignees: selectedTask?.assignees,
            dueDate: selectedTask?.dueDate,
            // timeEstimation: selectedTask?.timeEstimation,
            priority: selectedTask?.priority,
          }}
        >
          <Form.Item name="taskId" label="Task Key">
            <Tag>{selectedTask?.taskId}</Tag>
          </Form.Item>
          <Form.Item name="phase" label="Phase">
            <Select placeholder="Select Phase" style={{ maxWidth: 180 }} />
          </Form.Item>
          <Form.Item name="assignees" label="Assignees">
            <Button
              type="dashed"
              shape="circle"
              icon={<PlusOutlined style={{ fontSize: 12 }} />}
            />
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <DatePicker placeholder="End date" width={100} />
          </Form.Item>
          <Form.Item name="timeEstimation" label="Time Estimation">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="priority" label="Priority">
            <Select style={{ maxWidth: 180 }} />
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
    {
      key: 'description',
      label: <Typography.Text strong>Description</Typography.Text>,
      children: (
        <Input.TextArea
          defaultValue={selectedTask?.description}
          placeholder="Add a more detailed description..."
        />
      ),
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

  // Handle update
  const handleUpdate = () => {
    // dispatch(updateTask({ id: selectedTask?.id, name: taskName }))
    dispatch(toggleUpdateTaskDrawer());
  };

  return (
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
        <div>
          <Input.TextArea
            placeholder="Add a comment"
            style={{ marginTop: 12 }}
          />
          <Button type="primary" onClick={handleUpdate}>
            Update Task
          </Button>
        </div>
      }
    >
      <Tabs type="card" items={tabItems} />
    </Drawer>
  );
};

export default UpdateTaskDrawer;
