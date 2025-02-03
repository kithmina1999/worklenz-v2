import { Progress, Tooltip } from 'antd';
import './task-progress-cell.css';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';

type TaskListProgressCellProps = {
  task: IProjectTask;
};

const TaskListProgressCell = ({ task }: TaskListProgressCellProps) => {
  const totalTasks = task.total_tasks_count;
  const completedTasks = task.completed_count;

  return (
    <Tooltip title={`${completedTasks} / ${totalTasks}`}>
      <Progress
        percent={task.progress}
        type="circle"
        size={26}
        style={{ cursor: 'default' }}

        className="task-progress"
      />
    </Tooltip>
  );
};

export default TaskListProgressCell;
