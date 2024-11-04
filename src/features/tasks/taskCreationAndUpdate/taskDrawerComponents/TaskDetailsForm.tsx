// TaskDetailsForm.tsx
import React, { useEffect, useState } from 'react';
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Tag,
  Switch,
  Typography,
  Flex,
  Avatar,
  Button,
} from 'antd';
import CustomAvatar from '../../../../components/CustomAvatar';
import LabelDropdown from '../../../../components/taskListCommon/labelsSelector/LabelsSelector';
import { SettingOutlined } from '@ant-design/icons';
import { colors } from '../../../../styles/colors';
import { TaskType } from '../../../../types/task.types';
import AssigneeSelector from '../../../../components/taskListCommon/assigneeSelector/AssigneeSelector';

const TaskDetailsForm = ({
  selectedTask,
}: {
  selectedTask: TaskType | null;
}) => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [form] = Form.useForm();

  // function to handle recurring
  const handleRecurring = () => {
    setIsRecurring((prev) => !prev);
  };

  // Load task details into state when selectedTask changes
  // Update form fields when selectedTask changes
  useEffect(() => {
    form.setFieldsValue({
      taskId: selectedTask?.taskId,
      phase: selectedTask?.phase,
      // dueDate: selectedTask.dueDate ? selectedTask.dueDate : null,
      timeEstimation: selectedTask?.estimation,
      priority: selectedTask?.priority,
    });
  }, [
    form,
    selectedTask?.estimation,
    selectedTask?.phase,
    selectedTask?.priority,
    selectedTask?.taskId,
  ]);

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item name="taskId" label="Task Key">
        <Tag>{selectedTask?.taskId}</Tag>
      </Form.Item>

      <Form.Item name="phase" label="Phase">
        <Select placeholder="Select Phase" style={{ maxWidth: 180 }} />
      </Form.Item>

      <Form.Item name="assignees" label="Assignees">
        <Flex gap={4} align="center">
          <Avatar.Group>
            {selectedTask?.members?.map((member) => (
              <CustomAvatar avatarName={member.memberName} size={26} />
            ))}
          </Avatar.Group>

          <AssigneeSelector taskId={selectedTask?.taskId || '0'} />
        </Flex>
      </Form.Item>

      <Form.Item name="dueDate" label="Due Date">
        <DatePicker placeholder="End date" width={100} />
      </Form.Item>

      <Form.Item name="timeEstimation" label="Time Estimation" initialValue={0}>
        <Flex gap={8}>
          <Form.Item
            name={'hours'}
            label={
              <Typography.Text style={{ fontSize: 12 }}>Hours</Typography.Text>
            }
            layout="vertical"
            initialValue={0}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name={'minutes'}
            label={
              <Typography.Text style={{ fontSize: 12 }}>
                Minutes
              </Typography.Text>
            }
            layout="vertical"
            initialValue={0}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Flex>
      </Form.Item>

      <Form.Item name="priority" label="Priority">
        <Select style={{ maxWidth: 180 }} />
      </Form.Item>

      <Form.Item name="labels" label="Labels">
        <Flex gap={4}>
          {selectedTask?.labels?.map((label) => (
            <Tag key={label.labelId} color={label.labelColor}>
              {label.labelName}
            </Tag>
          ))}
          <LabelDropdown taskId={selectedTask?.taskId || ''} />
        </Flex>
      </Form.Item>

      <Form.Item name="billable" label="Billable">
        <Switch defaultChecked />
      </Form.Item>

      <Form.Item name="notify" label="When done, notify">
        <AssigneeSelector taskId={selectedTask?.taskId || '0'} />
      </Form.Item>

      <Form.Item name="recurring" label="Recurring">
        <Flex gap={8} align="center">
          <Switch defaultChecked={isRecurring} onChange={handleRecurring} />
          {isRecurring && (
            <Flex>
              <Button
                icon={<SettingOutlined />}
                type="text"
                iconPosition="end"
                style={{
                  color: colors.skyBlue,
                  border: 'none',
                  backgroundColor: colors.transparent,
                }}
              >
                Daily
              </Button>
            </Flex>
          )}
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default TaskDetailsForm;
