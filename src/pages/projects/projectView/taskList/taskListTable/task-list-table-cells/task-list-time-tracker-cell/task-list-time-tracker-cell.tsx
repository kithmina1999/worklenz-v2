import React, { useEffect, useState } from 'react';
import { Divider, Flex, Popover, Typography } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { ITaskLogViewModel } from '@/types/tasks/task-log-view.types';
import { buildTimeString, formatDate } from '@/utils/timeUtils';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { useSocket } from '@/socket/socketContext';

type TaskListTimeTrackerCellProps = {
  task: IProjectTask;
};

const TaskListTimeTrackerCell = ({ task }: TaskListTimeTrackerCellProps) => {
  const { socket, connected } = useSocket();
  const [timeLogs, setTimeLogs] = useState<ITaskLogViewModel[]>([]);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState<number | null>(null);


  const [timeString, setTimeString] = useState<string>(buildTimeString(0, 0, 0));

  const handleStartTimer = () => {
    console.log('start timer');
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

  const startTimer = () => {
    setStartTime(Date.now());
    setTimer(setInterval(() => {
      setTimeString(buildTimeString(0, 0, Date.now() - startTime));
    }, 1000));
  };

  useEffect(() => {
    setStartTime(0);

    setTimer(null);
    if (task.timer_start_time) {

    }
  }, []);

  return (
    <Flex gap={4} align="center">

      <PlayCircleFilled style={{ color: colors.skyBlue, fontSize: 16 }} onClick={handleStartTimer} />
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
