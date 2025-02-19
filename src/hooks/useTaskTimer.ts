import { useState, useEffect, useCallback, useRef } from 'react';
import { buildTimeString } from '@/utils/timeUtils';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import logger from '@/utils/errorLogger';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateTaskTimeTracking } from '@/features/tasks/tasks.slice';
import { useAppSelector } from '@/hooks/useAppSelector';

export const useTaskTimer = (taskId: string, initialStartTime: number | null) => {
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const DEFAULT_TIME_LEFT = buildTimeString(0, 0, 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get timer state from Redux
  const activeTimers = useAppSelector(state => state.taskReducer.activeTimers);
  const reduxStartTime = activeTimers[taskId];

  const [timeString, setTimeString] = useState(DEFAULT_TIME_LEFT);

  const started = Boolean(reduxStartTime);

  const timerTick = useCallback(() => {
    if (!reduxStartTime) return;
    const now = Date.now();
    const diff = ~~((now - reduxStartTime) / 1000);
    const hours = ~~(diff / 3600);
    const minutes = ~~((diff % 3600) / 60);
    const seconds = diff % 60;
    setTimeString(buildTimeString(hours, minutes, seconds));
  }, [reduxStartTime]);

  const clearTimerInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStartTimer = () => {
    if (started || !taskId) return;
    try {
      const now = Date.now();
      dispatch(updateTaskTimeTracking({ taskId, timeTracking: now }));
      socket?.emit(
        SocketEvents.TASK_TIMER_START.toString(),
        JSON.stringify({ task_id: taskId })
      );
    } catch (error) {
      logger.error('Error starting timer:', error);
    }
  };

  const handleStopTimer = () => {
    if (!taskId) return;
    
    clearTimerInterval();
    socket?.emit(SocketEvents.TASK_TIMER_STOP.toString(), JSON.stringify({ task_id: taskId }));
    dispatch(updateTaskTimeTracking({ taskId, timeTracking: null }));
    setTimeString(DEFAULT_TIME_LEFT);
  };

  // Initialize timer if initialStartTime is provided
  useEffect(() => {
    if (initialStartTime && !reduxStartTime) {
      dispatch(updateTaskTimeTracking({ taskId, timeTracking: initialStartTime }));
    }
  }, [initialStartTime, reduxStartTime]);

  // Handle timer tick
  useEffect(() => {
    clearTimerInterval(); // Clear existing interval first

    if (reduxStartTime) {
      timerTick(); // Initial tick
      intervalRef.current = setInterval(timerTick, 1000);
    } else {
      setTimeString(DEFAULT_TIME_LEFT);
    }

    return clearTimerInterval;
  }, [reduxStartTime, timerTick]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimerInterval;
  }, []);

  return {
    started,
    timeString,
    handleStartTimer,
    handleStopTimer
  };
}; 