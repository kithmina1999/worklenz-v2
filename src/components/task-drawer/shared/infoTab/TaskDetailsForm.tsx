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
import { ITaskFormViewModel, ITaskViewModel } from '@/types/tasks/task.types';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { simpleDateFormat } from '@/utils/simpleDateFormat';

import NotifyMemberSelector from './NotifyMemberSelector';
import TaskDrawerPhaseSelector from './details/task-drawer-phase-selector/task-drawer-phase-selector';
import TaskDrawerKey from './details/task-drawer-key/task-drawer-key';
import TaskDrawerLabels from './details/task-drawer-labels/task-drawer-labels';
import TaskDrawerAssigneeSelector from './details/task-drawer-assignee-selector/task-drawer-assignee-selector';
import Avatars from '@/components/avatars/avatars';
import TaskDrawerDueDate from './details/task-drawer-due-date/task-drawer-due-date';
import TaskDrawerEstimation from './details/task-drawer-estimation/task-drawer-estimation';
import TaskDrawerPrioritySelector from './details/task-drawer-priority-selector/task-drawer-priority-selector';
import TaskDrawerBillable from './details/task-drawer-billable/task-drawer-billable';

interface TaskDetailsFormProps {
  taskFormViewModel?: ITaskFormViewModel | null;
}

const TaskDetailsForm = ({ taskFormViewModel = null }: TaskDetailsFormProps) => {
  const { t } = useTranslation('task-drawer/task-drawer');
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
      dueDate: task?.end_date ?? null,
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
          label={t('taskInfoTab.details.task-key')}
        />
        <TaskDrawerPhaseSelector
          phases={taskFormViewModel?.phases || []}
          task={taskFormViewModel?.task as ITaskViewModel}
        />

        <Form.Item name="assignees" label={t('taskInfoTab.details.assignees')}>
          <Flex gap={4} align="center">
            <Avatars members={taskFormViewModel?.task?.names || []} />
            <TaskDrawerAssigneeSelector
              task={(taskFormViewModel?.task as ITaskViewModel) || null}
            />
          </Flex>
        </Form.Item>

        <TaskDrawerDueDate task={taskFormViewModel?.task as ITaskViewModel} t={t} form={form} />

        <TaskDrawerEstimation t={t} task={taskFormViewModel?.task as ITaskViewModel} form={form} />

        <Form.Item name="priority" label={t('taskInfoTab.details.priority')}>
          <TaskDrawerPrioritySelector task={taskFormViewModel?.task as ITaskViewModel} />
        </Form.Item>

        <TaskDrawerLabels task={taskFormViewModel?.task as ITaskViewModel} t={t} />

        <Form.Item name="billable" label={t('taskInfoTab.details.billable')}>
          <TaskDrawerBillable task={taskFormViewModel?.task as ITaskViewModel} />
        </Form.Item>

        <Form.Item name="notify" label={t('taskInfoTab.details.notify')}>
          <NotifyMemberSelector task={taskFormViewModel?.task as ITaskViewModel} t={t} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default TaskDetailsForm;
