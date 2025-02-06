import { Progress, Tooltip } from 'antd';
import './task-progress-cell.css';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import { useSocket } from '@/socket/socketContext';

type TaskListProgressCellProps = {
  task: IProjectTask;
};

const TaskListProgressCell = ({ task }: TaskListProgressCellProps) => {
  const { socket } = useSocket();

  return (
    <Tooltip title={`${task.completed_count} / ${task.total_tasks_count}`}>
      <Progress
        percent={task.complete_ratio || 0}
        type="circle"
        size={24}
        style={{ cursor: 'default' }}
        strokeWidth={(task.complete_ratio || 0) >= 100 ? 9 : 7}
      />
    </Tooltip>
  );
};

export default TaskListProgressCell;
