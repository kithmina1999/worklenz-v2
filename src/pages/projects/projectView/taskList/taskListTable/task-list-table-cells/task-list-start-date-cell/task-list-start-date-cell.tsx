import { DatePicker } from 'antd';
import { colors } from '@/styles/colors';
import dayjs, { Dayjs } from 'dayjs';
import { updateTaskEndDate, updateTaskStartDate } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { SocketEvents } from '@/shared/socket-events';
import { useSocket } from '@/socket/socketContext';
import { getUserSession } from '@/utils/session-helper';
import { useEffect } from 'react';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';

const TaskListStartDateCell = ({ task }: { task: IProjectTask }) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const startDayjs = task.start_date ? dayjs(task.start_date) : null;


  const handleResponse = (task: { id: string; parent_task: string | null; start_date: string }) => {
    dispatch(updateTaskStartDate({task}));
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    socket?.emit(
      SocketEvents.TASK_START_DATE_CHANGE.toString(),
      JSON.stringify({
        task_id: task.id,
        start_date: date?.format(),
        parent_task: task.parent_task_id,
        time_zone: getUserSession()?.timezone_name
          ? getUserSession()?.timezone_name
          : Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    );
  };

  useEffect(() => {
    socket?.on(SocketEvents.TASK_START_DATE_CHANGE.toString(), handleResponse);

    return () => {
      socket?.removeListener(SocketEvents.TASK_START_DATE_CHANGE.toString(), handleResponse);
    };

  }, []);  
  
  return (
    <DatePicker
      placeholder="Set  Date"
      value={startDayjs}
      onChange={handleStartDateChange}
      format={'MMM DD, YYYY'}
      suffixIcon={null}
      style={{
        backgroundColor: colors.transparent,
        border: 'none',
        boxShadow: 'none',
      }}
    />
  );
};

export default TaskListStartDateCell;
