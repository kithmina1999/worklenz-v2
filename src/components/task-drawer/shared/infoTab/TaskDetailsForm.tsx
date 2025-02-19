import { useEffect, useState } from 'react';
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Typography,
  Button,
  ConfigProvider,
  Flex,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { colors } from '@/styles/colors';
import { ITaskFormViewModel } from '@/types/tasks/task.types';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { simpleDateFormat } from '@/utils/simpleDateFormat';

import NotifyMemberSelector from './NotifyMemberSelector';
import TaskDrawerPhaseSelector from './details/task-drawer-phase-selector/task-drawer-phase-selector';
import TaskDrawerKey from './details/task-drawer-key/task-drawer-key';
import TaskDrawerLabels from './details/task-drawer-labels/task-drawer-labels';
import AssigneeSelector from '@/components/taskListCommon/assigneeSelector/AssigneeSelector';
import Avatars from '@/components/avatars/avatars';
import TaskDrawerDueDate from './details/task-drawer-due-date/task-drawer-due-date';

interface TaskDetailsFormProps {
  taskFormViewModel?: ITaskFormViewModel | null;
}

const TaskDetailsForm = ({ taskFormViewModel = null }: TaskDetailsFormProps) => {
  const { t } = useTranslation('task-drawer/task-drawer-info-tab');
  const [form] = Form.useForm();

  useEffect(() => {
    if (!taskFormViewModel) {
      form.resetFields();
      return;
    }

    const { task } = taskFormViewModel;
    form.setFieldsValue({
      taskId: task?.id,
      phase: task?.phase_id,
      assignees: task?.assignees,
      // dueDate: task?.end_date ? simpleDateFormat(task.end_date) : null,
      hours: task?.total_hours || 0,
      minutes: task?.total_minutes || 0,
      priority: task?.priority || 'medium',
      labels: task?.labels || [],
      billable: task?.billable || false,
      notify: [],
    });
  }, [taskFormViewModel, form]);

  const priorityMenuItems = taskFormViewModel?.priorities?.map(priority => ({
    key: priority.id,
    value: priority.id,
    label: priority.name,
  }));

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('task details form values', values);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const renderTimeEstimationInput = (name: string, label: string, max?: number) => (
    <Form.Item
      name={name}
      label={
        <Typography.Text style={{ color: colors.lightGray, fontSize: 12 }}>
          {t(`details.${label}`)}
        </Typography.Text>
      }
      style={{ marginBottom: 36 }}
      labelCol={{ style: { paddingBlock: 0 } }}
      layout="vertical"
    >
      <InputNumber min={0} max={max} placeholder={label} />
    </Form.Item>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: { itemMarginBottom: 8 },
        },
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          priority: 'medium',
          hours: 0,
          minutes: 0,
          billable: false,
        }}
        onFinish={handleSubmit}
      >
        <TaskDrawerKey
          taskKey={taskFormViewModel?.task?.task_key || 'NEW-TASK'}
          label={t('details.task-key')}
        />
        <TaskDrawerPhaseSelector phases={taskFormViewModel?.phases || []} />

        <Form.Item name="assignees" label="Assignees">
          <Flex gap={4} align="center">
            <Avatars members={taskFormViewModel?.task?.names || []} />
            <AssigneeSelector
              task={(taskFormViewModel?.task as IProjectTask) || null}
              groupId={null}
            />
          </Flex>
        </Form.Item>

        <TaskDrawerDueDate
          task={taskFormViewModel?.task as IProjectTask}
          t={t}
          form={form}
        />

        <Form.Item name="timeEstimation" label={t('details.time-estimation')}>
          <Flex gap={8}>
            {renderTimeEstimationInput('hours', 'hours')}
            {renderTimeEstimationInput('minutes', 'minutes', 60)}
          </Flex>
        </Form.Item>

        <Form.Item name="priority" label={t('details.priority')}>
          <Select options={priorityMenuItems} style={{ width: 'fit-content' }} />
        </Form.Item>

        <TaskDrawerLabels
          labels={taskFormViewModel?.task?.labels || []}
          taskId={taskFormViewModel?.task?.id || null}
        />

        <Form.Item name="billable" label={t('details.billable')}>
          <Switch defaultChecked={false} />
        </Form.Item>

        <Form.Item name="notify" label={t('details.notify')}>
          <NotifyMemberSelector />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default TaskDetailsForm;
