import React, { useEffect, useState } from 'react';
import { Button, Divider, Flex, Popover, Typography } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';

import { colors } from '@/styles/colors';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { ITaskLogViewModel } from '@/types/tasks/task-log-view.types';
import { buildTimeString, formatDate } from '@/utils/timeUtils';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import logger from '@/utils/errorLogger';
import { updateTaskTimeTracking } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

type TaskListTimeTrackerCellProps = {
  task: IProjectTask;
};

const TaskListTimeTrackerCell = ({ task }: TaskListTimeTrackerCellProps) => {
  const DEFAULT_TIME_LEFT = buildTimeString(0, 0, 0);
  const dispatch = useAppDispatch();

  const { socket } = useSocket();
  const [timeLogs, setTimeLogs] = useState<ITaskLogViewModel[]>([]);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(task.timer_start_time || null);
  const [timeString, setTimeString] = useState(DEFAULT_TIME_LEFT);

  const [timer, setTimer] = useState<number | null>(null);

  const renderStopIcon = () => {
    return (
      <span
        className="nz-icon"
        style={{ fontSize: 8, position: 'relative', top: -1, left: 0, right: 0, bottom: 0 }}
      >
        <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
          <path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"></path>
        </svg>
      </span>
    );
  };

  const timeTrackingLogCard = (
    <Flex vertical style={{ width: 400, height: 300, overflowY: 'scroll' }}>
      {timeLogs.map(log => (
        <React.Fragment key={log.id}>
          <Flex gap={8} align="center">
            <SingleAvatar avatarUrl={log.avatar_url} name={log.user_name} />

            <Flex vertical>
              <Typography>
                <Typography.Text strong>{log.user_name}</Typography.Text>
                <Typography.Text>{` logged ${log.time_spent_text} ${
                  log.logged_by_timer ? `via ${log.logged_by_timer}` : ''
                }`}</Typography.Text>
              </Typography>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {formatDate(new Date(log.created_at || ''))}
              </Typography.Text>
            </Flex>
          </Flex>
          <Divider style={{ marginBlock: 12 }} />
        </React.Fragment>
      ))}
    </Flex>
  );

  const timerTick = () => {
    if (!startTime) return;
    const now = Date.now();
    const diff = ~~((now - startTime) / 1000);
    const hours = ~~(diff / 3600);
    const minutes = ~~((diff % 3600) / 60);
    const seconds = diff % 60;
    setTimeString(buildTimeString(hours, minutes, seconds));
  };

  const handleStartTimer = () => {
    if (started || !task.id) return;
    try {
      setStarted(true);
      if (!startTime) {
        const now = Date.now();
        setStartTime(now);
        dispatch(updateTaskTimeTracking({ taskId: task.id, timeTracking: now }));
        socket?.emit(
          SocketEvents.TASK_TIMER_START.toString(),
          JSON.stringify({ task_id: task.id })
        );
      }
      timerTick();
      setTimer(setInterval(timerTick, 1000) as unknown as number);
    } catch (error) {
      logger.error('Error starting timer:', error);
    }
  };

  const handleStopTimer = () => {
    if (!task.id) return;
    if (typeof timer === 'number') {
      clearInterval(timer);
    }

    socket?.emit(SocketEvents.TASK_TIMER_STOP.toString(), JSON.stringify({ task_id: task.id }));

    setStarted(false);
    setStartTime(null);
    setTimer(null);
    setTimeString(DEFAULT_TIME_LEFT);
    dispatch(updateTaskTimeTracking({ taskId: task.id, timeTracking: null }));
  };

  useEffect(() => {
    if (task.timer_start_time) {
      handleStartTimer();
    }
  }, [task.timer_start_time]);

  useEffect(() => {
    if (!started) {
      setTimeString(DEFAULT_TIME_LEFT);
    }
  }, [started]);

  return (
    <Flex gap={4} align="center">
      {started ? (
        <Button type="text" icon={renderStopIcon()} onClick={handleStopTimer} />
      ) : (
        <Button
          type="text"
          icon={<PlayCircleFilled style={{ color: colors.skyBlue, fontSize: 16 }} />}
          onClick={handleStartTimer}
        />
      )}
      <Popover
        title={
          <Typography.Text style={{ fontWeight: 500 }}>
            Time Tracking Log
            <Divider style={{ marginBlockStart: 8, marginBlockEnd: 12 }} />
          </Typography.Text>
        }
        content={timeTrackingLogCard}
        trigger="click"
        placement="bottomRight"
      >
        <Typography.Text style={{ cursor: 'pointer' }}>{timeString}</Typography.Text>
      </Popover>
    </Flex>
  );
};

export default TaskListTimeTrackerCell;
