import { useEffect, useState } from 'react';
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  Tag,
  Switch,
  Typography,
  Button,
  ConfigProvider,
  Flex,
} from 'antd';
import { useTranslation } from 'react-i18next';
import LabelsSelector from '@components/task-list-common/labelsSelector/labels-selector';
import { colors } from '@/styles/colors';

import NotifyMemberSelector from './NotifyMemberSelector';
import { simpleDateFormat } from '@/utils/simpleDateFormat';
import { ITaskFormViewModel } from '@/types/tasks/task.types';
// import AssigneeSelector from '@/components/task-list-common/assigneeSelector/AssigneeSelector';
import TaskDrawerPhaseSelector from './details/task-drawer-phase-selector/task-drawer-phase-selector';
import TaskDrawerKey from './details/task-drawer-key/task-drawer-key';
import TaskDrawerLabels from './details/task-drawer-labels/task-drawer-labels';
import AssigneeSelector from '@/components/taskListCommon/assigneeSelector/AssigneeSelector';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import Avatars from '@/components/avatars/avatars';

type TaskDetailsFormProps = {
  taskFormViewModel?: ITaskFormViewModel | null;
};

const TaskDetailsForm = ({ taskFormViewModel = null }: TaskDetailsFormProps) => {
  const { t } = useTranslation('task-drawer/task-drawer-info-tab');
  const [isShowStartDate, setIsShowStartDate] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Initialize form values
  useEffect(() => {
    if (taskFormViewModel) {
      form.setFieldsValue({
        taskId: taskFormViewModel.task?.id,
        phase: taskFormViewModel.task?.phase_id,
        assignees: taskFormViewModel.task?.assignees,
        dueDate: taskFormViewModel.task?.end_date
          ? simpleDateFormat(taskFormViewModel.task.end_date)
          : null,
        hours: taskFormViewModel.task?.total_hours || 0,
        minutes: taskFormViewModel.task?.total_minutes || 0,
        priority: taskFormViewModel.task?.priority || 'medium',
        labels: taskFormViewModel.task?.labels || [],
        billable: taskFormViewModel.task?.billable || false,
        notify: [],
      });
    } else {
      form.resetFields();
    }
  }, [taskFormViewModel, form]);

  // Priority options with icons
  const priorityMenuItems = taskFormViewModel?.priorities?.map(priority => ({
    key: priority.id,
    value: priority.id,
    label: priority.name,
  }));

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log('task details form values', values);
    });
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

        <Form.Item name="dueDate" label="Due Date">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isShowStartDate && (
              <>
                <DatePicker placeholder={t('details.start-date')} />
                <Typography.Text>-</Typography.Text>
              </>
            )}
            <DatePicker placeholder={t('details.end-date')} />
            <Button
              type="text"
              onClick={() => setIsShowStartDate(prev => !prev)}
              style={{ color: isShowStartDate ? 'red' : colors.skyBlue }}
            >
              {isShowStartDate ? t('details.hide-start-date') : t('details.show-start-date')}
            </Button>
          </div>
        </Form.Item>

        <Form.Item name="timeEstimation" label={t('details.time-estimation')}>
          <Flex gap={8}>
            <Form.Item
              name="hours"
              label={
                <Typography.Text style={{ color: colors.lightGray, fontSize: 12 }}>
                  {t('details.hours')}
                </Typography.Text>
              }
              style={{ marginBottom: 36 }}
              labelCol={{ style: { paddingBlock: 0 } }}
              layout="vertical"
            >
              <InputNumber min={0} placeholder="Hours" />
            </Form.Item>
            <Form.Item
              name="minutes"
              label={
                <Typography.Text style={{ color: colors.lightGray, fontSize: 12 }}>
                  {t('details.minutes')}
                </Typography.Text>
              }
              style={{ marginBottom: 36 }}
              labelCol={{ style: { paddingBlock: 0 } }}
              layout="vertical"
            >
              <InputNumber min={0} max={60} placeholder="Minutes" />
            </Form.Item>
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

        {/* <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {taskFormViewModel ? 'Update Task' : 'Create Task'}
          </Button>
        </Form.Item> */}
      </Form>
    </ConfigProvider>
  );
};

export default TaskDetailsForm;
