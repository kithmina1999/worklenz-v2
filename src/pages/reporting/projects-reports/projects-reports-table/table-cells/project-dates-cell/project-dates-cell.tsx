import { DatePicker, Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { colors } from '../../../../../../styles/colors';
import dayjs, { Dayjs } from 'dayjs';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';

type ProjectDatesCellProps = {
  projectId: string;
  startDate: Date | null;
  endDate: Date | null;
};

const ProjectDatesCell = ({ projectId, startDate, endDate }: ProjectDatesCellProps) => {
  const startDayjs = startDate ? dayjs(startDate) : null;
  const endDayjs = endDate ? dayjs(endDate) : null;
  const { socket, connected } = useSocket();

  const handleStartDateChangeResponse = (data: { project_id: string; start_date: string }) => {
    console.log(data);
  };

  const handleEndDateChangeResponse = (data: { project_id: string; end_date: string }) => {
    console.log(data);
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    socket?.emit(SocketEvents.PROJECT_START_DATE_CHANGE.toString(), {
      project_id: projectId,
      start_date: date?.format('YYYY-MM-DD'),
    });
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    socket?.emit(SocketEvents.PROJECT_END_DATE_CHANGE.toString(), {
      project_id: projectId,
      end_date: date?.format('YYYY-MM-DD'),
    });
  };

  useEffect(() => {
    if (connected) {
      socket?.on(SocketEvents.PROJECT_START_DATE_CHANGE.toString(), handleStartDateChangeResponse);
      socket?.on(SocketEvents.PROJECT_END_DATE_CHANGE.toString(), handleEndDateChangeResponse);
    }

    return () => {
      if (connected) {
        socket?.removeListener(SocketEvents.PROJECT_START_DATE_CHANGE.toString(), handleStartDateChangeResponse);
          socket?.removeListener(SocketEvents.PROJECT_END_DATE_CHANGE.toString(), handleEndDateChangeResponse);
      }
    };
  }, [connected]);

  return (
    <Flex gap={4}>
      <DatePicker
        placeholder="Set Start Date"
        defaultValue={startDayjs}
        format={'MMM DD, YYYY'}
        suffixIcon={null}
        onChange={handleStartDateChange}
        style={{
          backgroundColor: colors.transparent,
          border: 'none',
          boxShadow: 'none',
        }}
      />

      <Typography.Text>-</Typography.Text>

      <DatePicker
        placeholder="Set End Date"
        defaultValue={endDayjs}
        format={'MMM DD, YYYY'}
        suffixIcon={null}
        style={{
          backgroundColor: colors.transparent,
          border: 'none',
          boxShadow: 'none',
        }}
        onChange={handleEndDateChange}
      />
    </Flex>
  );
};

export default ProjectDatesCell;
