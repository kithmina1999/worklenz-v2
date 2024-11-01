// TaskNameCell.tsx
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import {
  DoubleRightOutlined,
  DownOutlined,
  RightOutlined,
  ExpandAltOutlined,
} from '@ant-design/icons';
import { TaskType } from '../../../../../../types/task.types';
import { colors } from '../../../../../../styles/colors';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '../../../../../../features/tasks/taskSlice';

type TaskCellProps = {
  task: TaskType;
  isSubTask?: boolean;
  expandedTasks: string[];
  hoverRow: string | null;
  setSelectedTaskId: (taskId: string) => void;
  toggleTaskExpansion: (taskId: string) => void;
};

const TaskCell = ({
  task,
  isSubTask = false,
  expandedTasks,
  hoverRow,
  setSelectedTaskId,
  toggleTaskExpansion,
}: TaskCellProps) => {
  const dispatch = useAppDispatch();

  // render the toggle arrow icon for tasks with subtasks
  const renderToggleButtonForHasSubTasks = (
    taskId: string,
    hasSubtasks: boolean
  ) => {
    if (!hasSubtasks) return null;
    return (
      <button
        onClick={() => toggleTaskExpansion(taskId)}
        className="hover flex h-4 w-4 items-center justify-center rounded text-[12px] hover:border hover:border-[#5587f5] hover:bg-[#d0eefa54]"
      >
        {expandedTasks.includes(taskId) ? <DownOutlined /> : <RightOutlined />}
      </button>
    );
  };

  // show expand button on hover for tasks without subtasks
  const renderToggleButtonForNonSubtasks = (
    taskId: string,
    isSubTask: boolean
  ) => {
    return !isSubTask ? (
      <button
        onClick={() => toggleTaskExpansion(taskId)}
        className="hover flex h-4 w-4 items-center justify-center rounded text-[12px] hover:border hover:border-[#5587f5] hover:bg-[#d0eefa54]"
      >
        {expandedTasks.includes(taskId) ? <DownOutlined /> : <RightOutlined />}
      </button>
    ) : (
      <div className="h-4 w-4"></div>
    );
  };

  // render the double arrow icon and count label for tasks with subtasks
  const renderSubtasksCountLabel = (
    taskId: string,
    hasSubtasks: boolean,
    subTasksCount: number
  ) => {
    if (hasSubtasks) {
      return (
        <Button
          onClick={() => toggleTaskExpansion(taskId)}
          size="small"
          style={{
            fontSize: 12,
            display: 'flex',
            gap: 2,
            paddingInline: 4,
            border: 'none',
          }}
        >
          {subTasksCount}
          <DoubleRightOutlined />
        </Button>
      );
    }
    return null;
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex gap={8} align="center">
        {!!task?.subTasks?.length ? (
          renderToggleButtonForHasSubTasks(
            task.taskId,
            !!task?.subTasks?.length
          )
        ) : hoverRow === task.taskId ? (
          renderToggleButtonForNonSubtasks(task.taskId, isSubTask)
        ) : (
          <div className="h-4 w-4"></div>
        )}

        {isSubTask && <DoubleRightOutlined style={{ fontSize: 12 }} />}

        <Typography.Text ellipsis={{ expanded: false }}>
          {task.task}
        </Typography.Text>

        {renderSubtasksCountLabel(
          task.taskId,
          !!task?.subTasks?.length,
          task?.subTasks?.length || 0
        )}
      </Flex>

      {hoverRow === task.taskId && (
        <Button
          type="text"
          icon={<ExpandAltOutlined />}
          onClick={() => {
            setSelectedTaskId(task.taskId);
            dispatch(toggleUpdateTaskDrawer());
          }}
          style={{
            backgroundColor: colors.transparent,
            padding: 0,
            height: 'fit-content',
          }}
        >
          Open
        </Button>
      )}
    </Flex>
  );
};

export default TaskCell;
