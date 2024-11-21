// TaskNameCell.tsx
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import {
  DoubleRightOutlined,
  DownOutlined,
  RightOutlined,
  ExpandAltOutlined,
} from '@ant-design/icons';
import { colors } from '@/styles/colors';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleUpdateTaskDrawer } from '@features/tasks/taskSlice';
import { useTranslation } from 'react-i18next';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';

type TaskCellProps = {
  task: IProjectTask;
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
  // localization
  const { t } = useTranslation('taskListTable');

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
    isSubTask: boolean,
    subTasksCount: number
  ) => {
    return (
      !isSubTask && (
        <Button
          onClick={() => toggleTaskExpansion(taskId)}
          size="small"
          style={{
            display: 'flex',
            gap: 2,
            paddingInline: 4,
            alignItems: 'center',
            justifyItems: 'center',
            border: 'none',
          }}
        >
          <Typography.Text style={{ fontSize: 12, lineHeight: 1 }}>
            {subTasksCount}
          </Typography.Text>
          <DoubleRightOutlined style={{ fontSize: 10 }} />
        </Button>
      )
    );
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex gap={8} align="center">
        {(!!task?.sub_tasks?.length && task.id) ? (
          renderToggleButtonForHasSubTasks(
            task.id,
            !!task?.sub_tasks?.length
          )
        ) : hoverRow === task.id ? (
          renderToggleButtonForNonSubtasks(task.id, isSubTask)
        ) : (
          <div className="h-4 w-4"></div>
        )}

        {isSubTask && <DoubleRightOutlined style={{ fontSize: 12 }} />}

        <Typography.Text ellipsis={{ expanded: false }}>
          {task.name}
        </Typography.Text>

        {renderSubtasksCountLabel(
          task.id || '',
          isSubTask,
          task?.sub_tasks?.length || 0
        )}
      </Flex>

      {hoverRow === task.id && (
        <Button
          type="text"
          icon={<ExpandAltOutlined />}
          onClick={() => {
            setSelectedTaskId(task.id || '');
            dispatch(toggleUpdateTaskDrawer());
          }}
          style={{
            backgroundColor: colors.transparent,
            padding: 0,
            height: 'fit-content',
          }}
        >
          {t('openButton')}
        </Button>
      )}
    </Flex>
  );
};

export default TaskCell;
