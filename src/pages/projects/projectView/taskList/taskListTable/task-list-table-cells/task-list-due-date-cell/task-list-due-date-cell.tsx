import { useEffect } from 'react';
import { DatePicker } from 'antd';
import { colors } from '@/styles/colors';
import dayjs, { Dayjs } from 'dayjs';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { getUserSession } from '@/utils/session-helper';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateTaskEndDate } from '@/features/tasks/tasks.slice';

const TaskListDueDateCell = ({ task }: { task: IProjectTask }) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const dueDayjs = task.end_date ? dayjs(task.end_date) : null;

  const handleResponse = (task: { id: string; parent_task: string | null; end_date: string }) => {
    dispatch(updateTaskEndDate({task}));
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    socket?.emit(
      SocketEvents.TASK_END_DATE_CHANGE.toString(),
      JSON.stringify({
        task_id: task.id,
        end_date: date?.format(),
        parent_task: task.parent_task_id,
        time_zone: getUserSession()?.timezone_name
          ? getUserSession()?.timezone_name
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    );
  };

  useEffect(() => {
    socket?.on(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleResponse);

    return () => {
      socket?.removeListener(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleResponse);
    };
  }, []);

  return (
    <DatePicker
      placeholder="Set  Date"
      value={dueDayjs}
      format={'MMM DD, YYYY'}
      suffixIcon={null}
      onChange={handleEndDateChange}
      style={{
        backgroundColor: colors.transparent,
        border: 'none',
        boxShadow: 'none',
      }}
    />
  );
};

export default TaskListDueDateCell;
