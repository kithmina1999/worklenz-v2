import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Drawer,
  Flex,
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
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleCreateTaskDrawer } from '../taskSlice';
import StatusDropdown from '../../../components/taskListCommon/statusDropdown/StatusDropdown';
import { TabsProps } from 'antd/lib';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelectedProject } from '../../../hooks/useSelectedProject';
import { colors } from '../../../styles/colors';

const CreateTaskDrawer = () => {
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState<string>('Untitled Task');

  // get create task drawer state from task slice
  const isDrawerOpen = useAppSelector(
    (state) => state.taskReducer.isCreateTaskDrawerOpen
  );

  // get selected project from custom hook
  const selectedProject = useSelectedProject();

  const dispatch = useAppDispatch();

  // collapase panel styles
  const panelStyle: React.CSSProperties = {
    border: 'none',
  };

  const infoItems: CollapseProps['items'] = [
    {
      key: 'details',
      label: <Typography.Text strong>Details</Typography.Text>,
      children: (
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item name="taskId" label="Task Key" style={{ margin: 0 }}>
            <Tag style={{ fontSize: 12 }}>
              {selectedProject?.projectName.toUpperCase()}
            </Tag>
          </Form.Item>
          <Form.Item name="phase" label="Phase" style={{ margin: 0 }}>
            <Select placeholder="Select Phase" style={{ maxWidth: 180 }} />
          </Form.Item>
          <Form.Item name="assignees" label="Assignees" style={{ margin: 0 }}>
            <Button
              type="dashed"
              shape="circle"
              icon={<PlusOutlined style={{ fontSize: 12 }} />}
            />
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date" style={{ margin: 0 }}>
            <Flex>
              <DatePicker placeholder="End date" width={100} />
              <Button
                type="text"
                style={{
                  backgroundColor: colors.transparent,
                  color: colors.skyBlue,
                }}
              >
                Show Start Date
              </Button>
            </Flex>
          </Form.Item>
          <Form.Item
            name="timeEstimation"
            label="Time Estimation"
            style={{ margin: 0 }}
          >
            <Flex gap={8}>
              <Flex vertical>
                <Typography.Text
                  style={{
                    fontSize: 12,
                    color: colors.lightGray,
                  }}
                >
                  Hours
                </Typography.Text>
                <InputNumber defaultValue={0} min={0} />
              </Flex>
              <Flex vertical>
                <Typography.Text
                  style={{
                    fontSize: 12,
                    color: colors.lightGray,
                  }}
                >
                  Minutes
                </Typography.Text>
                <InputNumber defaultValue={0} min={0} />
              </Flex>
            </Flex>
          </Form.Item>
          <Form.Item name="priority" label="Priority" style={{ margin: 0 }}>
            <Select
              style={{ maxWidth: 180 }}
              defaultValue={'Medium'}
              options={[{ key: 'medium', label: <Flex>Medium</Flex> }]}
            />
          </Form.Item>
        </Form>
      ),
      style: panelStyle,
    },
    {
      key: 'description',
      label: <Typography.Text strong>Description</Typography.Text>,
      children: <p>Add a more detailed description...</p>,
      style: panelStyle,
    },
    {
      key: 'subTasks',
      label: <Typography.Text strong>Sub Tasks</Typography.Text>,
      children: <Progress percent={0} />,
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
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <Flex vertical align="center" gap={4}>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <Typography.Text style={{ fontSize: 12 }}>
                Choose or drop file to upload
              </Typography.Text>
            </Flex>
          </button>
        </Upload>
      ),
      style: panelStyle,
    },
    {
      key: 'comments',
      label: <Typography.Text strong>Comments</Typography.Text>,
      style: panelStyle,
    },
  ];

  const tabItems: TabsProps['items'] = [
    {
      key: 'info',
      label: 'Info',
      children: (
        <Collapse
          items={infoItems}
          bordered={false}
          defaultActiveKey={[
            'details',
            'description',
            'subTasks',
            'dependencies',
            'attachments',
            'comments',
          ]}
        />
      ),
    },
    { key: 'timeLog', label: 'Time Log' },
    { key: 'activityLog', label: 'Activity Log' },
  ];

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleCreateTaskDrawer())}
      width={720}
      styles={{
        footer: {
          height: 120,
        },
      }}
      title={
        <Flex gap={8} align="center">
          <Input
            size="large"
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
            placeholder="Type your Task"
            style={{ maxWidth: 500 }}
          />
          <StatusDropdown currentStatus="todo" size='default'/>
        </Flex>
      }
      footer={
        <Flex gap={8} vertical align="center" justify="center">
          <Input.TextArea
            placeholder="Add a comment"
            style={{ marginBlockStart: 12 }}
          />

          <Flex
            align="center"
            justify="space-between"
            style={{ width: '100%' }}
          >
            <Typography.Text style={{ fontSize: 12, color: colors.lightGray }}>
              Created in a few seconds by Dev prasad
            </Typography.Text>
            <Typography.Text style={{ fontSize: 12, color: colors.lightGray }}>
              Updated in a few seconds
            </Typography.Text>
          </Flex>
        </Flex>
      }
    >
      <Tabs type="card" items={tabItems} />
    </Drawer>
  );
};

export default CreateTaskDrawer;
