import { DownloadOutlined, PlayCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { colors } from '@/styles/colors';
import EmptyListPlaceholder from '@/components/EmptyListPlaceholder';
import { themeWiseColor } from '@/utils/themeWiseColor';
import { useAppSelector } from '@/hooks/useAppSelector';
import TimeLogForm from './TimeLogForm';
import TimeLogList from './TimeLogList';
import { taskTimeLogsApiService } from '@/api/tasks/task-time-logs.api.service';
import { ITaskLogViewModel } from '@/types/tasks/task-log-view.types';
import { formatDuration, intervalToDuration } from 'date-fns';
import TaskTimer from '@/components/taskListCommon/task-timer/task-timer';
import { useTaskTimer } from '@/hooks/useTaskTimer';

const TaskDrawerTimeLog = () => {
  const [timeLoggedList, setTimeLoggedList] = useState<ITaskLogViewModel[]>([]);
  const [totalTimeText, setTotalTimeText] = useState<string>('0m 0s');
  const [loading, setLoading] = useState<boolean>(false);
  const [isAddTimelogFormShow, setIsTimeLogFormShow] = useState<boolean>(false);

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { selectedTaskId, taskFormViewModel } = useAppSelector(state => state.taskDrawerReducer);

  const { started, timeString, handleStartTimer, handleStopTimer } = useTaskTimer(
    selectedTaskId || '',
    taskFormViewModel?.task?.timer_start_time || null
  );

  const buildTotalTimeText = (timeLoggedList: ITaskLogViewModel[]) => {
    let totalLogged = 0;
    for (const element of timeLoggedList) {
      const duration = intervalToDuration({ start: 0, end: (element.time_spent || 0) * 1000 });
      element.time_spent_text = formatDuration(duration);
      totalLogged += parseFloat((element.time_spent || 0).toString());
    }
    const totalDuration = intervalToDuration({ start: 0, end: totalLogged * 1000 });
    setTotalTimeText(`${totalDuration.minutes || 0}m ${totalDuration.seconds || 0}s`);
  };

  const fetchTimeLoggedList = async () => {
    if (!selectedTaskId) return;
    try {
      setLoading(true);
      const res = await taskTimeLogsApiService.getByTask(selectedTaskId);
      if (res.done) {
        buildTotalTimeText(res.body);
        setTimeLoggedList(res.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimerStop = async () => {
    handleStopTimer();
    await fetchTimeLoggedList();
  };

  useEffect(() => {
    fetchTimeLoggedList();
  }, [selectedTaskId]);

  return (
    <Flex vertical justify="space-between" style={{ width: '100%', height: '78vh' }}>
      <Flex vertical>
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Total Logged: {totalTimeText}</Typography.Text>
          <Flex gap={8} align="center">
            <TaskTimer
              started={started}
              handleStartTimer={handleStartTimer}
              handleStopTimer={handleTimerStop}
              timeString={timeString}
              timeTrackingLogCard={<div>Time Tracking Log</div>}
            />
            <Button size="small" icon={<DownloadOutlined />}>
              Export to Excel
            </Button>
          </Flex>
        </Flex>
        <Divider style={{ marginBlock: 8 }} />
        {timeLoggedList.length > 0 ? (
          <TimeLogList timeLoggedList={timeLoggedList} />
        ) : (
          <Flex vertical gap={8} align="center">
            <EmptyListPlaceholder text="No time logs found in the task." imageHeight={120} />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ width: 'fit-content' }}
              onClick={() => setIsTimeLogFormShow(true)}
            >
              Add Timelog
            </Button>
          </Flex>
        )}
      </Flex>

      {!isAddTimelogFormShow && timeLoggedList.length > 0 && (
        <Flex
          gap={8}
          vertical
          align="center"
          justify="center"
          style={{
            width: '100%',
            position: 'relative',
            height: 'fit-content',
            justifySelf: 'flex-end',
            paddingBlockStart: 24,
          }}
        >
          <div
            style={{
              marginBlockEnd: 0,
              height: 1,
              position: 'absolute',
              top: 0,
              width: '120%',
              backgroundColor: themeWiseColor('#ebebeb', '#3a3a3a', themeMode),
            }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ width: '100%' }}
            onClick={() => setIsTimeLogFormShow(true)}
          >
            Add Timelog
          </Button>
        </Flex>
      )}

      {isAddTimelogFormShow && <TimeLogForm onCancel={() => setIsTimeLogFormShow(false)} />}
    </Flex>
  );
};

export default TaskDrawerTimeLog;
