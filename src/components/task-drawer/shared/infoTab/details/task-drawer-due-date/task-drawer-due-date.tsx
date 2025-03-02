import { useAuthService } from '@/hooks/useAuth';
import { SocketEvents } from '@/shared/socket-events';
import { useSocket } from '@/socket/socketContext';
import { colors } from '@/styles/colors';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import logger from '@/utils/errorLogger';
import { Flex, DatePicker, Typography, Button, Form, FormInstance } from 'antd';
import { t, TFunction } from 'i18next';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface TaskDrawerDueDateProps {
  task: IProjectTask;
  t: TFunction;
  form: FormInstance;
}

const TaskDrawerDueDate = ({ task, t, form }: TaskDrawerDueDateProps) => {
  const { socket } = useSocket();
  const [isShowStartDate, setIsShowStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
  const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
  const currentSession = useAuthService().getCurrentSession();

  const handleDueDateChange = (date: Date) => {
    setEndDate(dayjs(date));
    if (!socket || !task.id || !task.parent_task_id || !currentSession?.timezone_name) {
      return;
    }

    try {
      socket?.emit(SocketEvents.TASK_END_DATE_CHANGE.toString(), {
        task_id: task.id,
        end_date: date,
        parent_id: task.parent_task_id,
        time_zone: currentSession?.timezone_name
          ? currentSession?.timezone_name
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    } catch (error) {
      logger.error('Failed to update due date:', error);
    }
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(dayjs(date));
    if (!socket || !task.id || !task.parent_task_id || !currentSession?.timezone_name) {
      return;
    }

    try {
      socket?.emit(SocketEvents.TASK_START_DATE_CHANGE.toString(), {
        task_id: task.id,
        start_date: date,
        parent_id: task.parent_task_id,
        time_zone: currentSession?.timezone_name
          ? currentSession?.timezone_name
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    } catch (error) {
      logger.error('Failed to update start date:', error);
    }
  };

  const disabledStartDate = (current: Dayjs) => {
    return current && endDate ? current > endDate : false;
  };

  const disabledEndDate = (current: Dayjs) => {
    return current && startDate ? current < startDate : false;
  };

  return (
    <Form.Item name="dueDate" label="Due Date">
      <Flex align="center" gap={8}>
        {isShowStartDate && (
          <>
            <DatePicker
              placeholder={t('details.start-date')}
              disabledDate={disabledStartDate}
              onChange={handleStartDateChange}
            />
            <Typography.Text>-</Typography.Text>
          </>
        )}
        <DatePicker
          placeholder={t('details.end-date')}
          disabledDate={disabledEndDate}
          onChange={handleDueDateChange}
        />
        <Button
          type="text"
          onClick={() => setIsShowStartDate(prev => !prev)}
          style={{ color: isShowStartDate ? 'red' : colors.skyBlue }}
        >
          {isShowStartDate ? t('details.hide-start-date') : t('details.show-start-date')}
        </Button>
      </Flex>
    </Form.Item>
  );
};

export default TaskDrawerDueDate;
