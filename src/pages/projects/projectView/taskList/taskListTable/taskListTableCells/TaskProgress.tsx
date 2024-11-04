import { Progress, Tooltip } from 'antd';
import React from 'react';

type TaskProgressProps = {
  progress: number;
  numberOfSubTasks: number;
};

const TaskProgress = ({
  progress = 0,
  numberOfSubTasks = 0,
}: TaskProgressProps) => {
  const totalTasks = numberOfSubTasks + 1;
  const completedTasks = 0;

  return (
    <Tooltip title={`${completedTasks} / ${totalTasks}`}>
      <Progress
        percent={progress}
        type="circle"
        size={26}
        style={{ cursor: 'default' }}
      />
    </Tooltip>
  );
};

export default TaskProgress;
