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
  const [localStarted, setLocalStarted] = useState(false);
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

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimerInterval();
    setTimeString(DEFAULT_TIME_LEFT);
    setLocalStarted(false);
  }, [clearTimerInterval]);

  // Handle timer tick and initial state - with additional checks
  useEffect(() => {
    // Only run interval if we have both redux state and local state agreement
    if (reduxStartTime && started && localStarted) {
      timerTick(); // Initial tick
      clearTimerInterval(); // Clear any existing interval first
      intervalRef.current = setInterval(timerTick, 1000);
    } else if (!reduxStartTime || !started) {
      clearTimerInterval();
      setTimeString(DEFAULT_TIME_LEFT);
      setLocalStarted(false);
    }

    return () => {
      clearTimerInterval();
    };
  }, [reduxStartTime, started, localStarted, timerTick, clearTimerInterval]);

  // Initialize timer state on mount and when initialStartTime changes
  useEffect(() => {
    if (initialStartTime && !reduxStartTime) {
      dispatch(updateTaskTimeTracking({ taskId, timeTracking: initialStartTime }));
      setLocalStarted(true);
    }
  }, [initialStartTime, reduxStartTime, taskId, dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalStarted(started);
  }, [started]);

  const handleStartTimer = useCallback(() => {
    if (started || !taskId) return;
    try {
      const now = Date.now();
      dispatch(updateTaskTimeTracking({ taskId, timeTracking: now }));
      setLocalStarted(true);
      socket?.emit(SocketEvents.TASK_TIMER_START.toString(), JSON.stringify({ task_id: taskId }));
    } catch (error) {
      logger.error('Error starting timer:', error);
    }
  }, [taskId, started, socket, dispatch]);

  const handleStopTimer = useCallback(() => {
    if (!taskId) return;

    resetTimer();
    socket?.emit(SocketEvents.TASK_TIMER_STOP.toString(), JSON.stringify({ task_id: taskId }));
    dispatch(updateTaskTimeTracking({ taskId, timeTracking: null }));
  }, [taskId, socket, dispatch, resetTimer]);

  // Listen for socket events
  useEffect(() => {
    if (!socket) return;

    const handleTimerStop = (data: string) => {
      try {
        const { task_id } = typeof data === 'string' ? JSON.parse(data) : data;
        if (task_id === taskId) {
          resetTimer();
          dispatch(updateTaskTimeTracking({ taskId, timeTracking: null }));
        }
      } catch (error) {
        console.log('error', error);
        logger.error('Error parsing timer stop event:', error);
      }
    };

    const handleTimerStart = (data: string) => {
      try {
        const { task_id, start_time } = typeof data === 'string' ? JSON.parse(data) : data;
        if (task_id === taskId && start_time) {
          dispatch(
            updateTaskTimeTracking({
              taskId,
              timeTracking: typeof start_time === 'number' ? start_time : parseInt(start_time),
            })
          );
          setLocalStarted(true);
        }
      } catch (error) {
        logger.error('Error parsing timer start event:', error);
      }
    };

    socket.on(SocketEvents.TASK_TIMER_STOP.toString(), handleTimerStop);
    socket.on(SocketEvents.TASK_TIMER_START.toString(), handleTimerStart);

    return () => {
      socket.off(SocketEvents.TASK_TIMER_STOP.toString(), handleTimerStop);
      socket.off(SocketEvents.TASK_TIMER_START.toString(), handleTimerStart);
    };
  }, [socket, taskId, dispatch, resetTimer]);

  return {
    started,
    timeString,
    handleStartTimer,
    handleStopTimer,
  };
};
