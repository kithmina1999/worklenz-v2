import { Flex, Typography, Button, Input } from 'antd';
import type { InputRef } from 'antd';
import {
  DoubleRightOutlined,
  DownOutlined,
  RightOutlined,
  ExpandAltOutlined,
} from '@ant-design/icons';
import { colors } from '@/styles/colors';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import './task-list-task-cell.css';
import { setSelectedTaskId, setShowTaskDrawer } from '@/features/task-drawer/task-drawer.slice';
import { useState, useRef, useEffect } from 'react';

type TaskListTaskCellProps = {
  task: IProjectTask;
  isSubTask?: boolean;
  toggleTaskExpansion: (taskId: string) => void;
};

const TaskListTaskCell = ({
  task,
  isSubTask = false,
  toggleTaskExpansion,
}: TaskListTaskCellProps) => {
  const { t } = useTranslation('task-list-table');
  const [editTaskName, setEditTaskName] = useState(true);
  const inputRef = useRef<InputRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setEditTaskName(false);
      }
    };

    if (editTaskName) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editTaskName]);

  const renderToggleButtonForHasSubTasks = (taskId: string | null, hasSubtasks: boolean) => {
    if (!hasSubtasks || !taskId) return null;
    return (
      <button
        onClick={() => toggleTaskExpansion(taskId)}
        className="hover flex h-4 w-4 items-center justify-center rounded text-[12px] hover:border hover:border-[#5587f5] hover:bg-[#d0eefa54]"
      >
        {task.show_sub_tasks ? <DownOutlined /> : <RightOutlined />}
      </button>
    );
  };

  // show expand button on hover for tasks without subtasks
  const renderToggleButtonForNonSubtasks = (
    taskId: string,
    isSubTask: boolean,
    subTasksCount: number
  ) => {
    if (subTasksCount > 0) {
      return (
        <button
          onClick={() => toggleTaskExpansion(taskId)}
          className="hover flex h-4 w-4 items-center justify-center rounded text-[12px] hover:border hover:border-[#5587f5] hover:bg-[#d0eefa54]"
        >
          {task.show_sub_tasks ? <DownOutlined /> : <RightOutlined />}
        </button>
      );
    }

    return !isSubTask ? (
      <button
        onClick={() => toggleTaskExpansion(taskId)}
        className="hover flex h-4 w-4 items-center justify-center rounded text-[12px] hover:border hover:border-[#5587f5] hover:bg-[#d0eefa54] open-task-button"
      >
        {task.show_sub_tasks ? <DownOutlined /> : <RightOutlined />}
      </button>
    ) : (
      <div className="h-4 w-4"></div>
    );
  };

  // render the double arrow icon and count label for tasks with subtasks
  const renderSubtasksCountLabel = (taskId: string, isSubTask: boolean, subTasksCount: number) => {
    if (!taskId) return null;
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
          <Typography.Text style={{ fontSize: 12, lineHeight: 1 }}>{subTasksCount}</Typography.Text>
          <DoubleRightOutlined style={{ fontSize: 10 }} />
        </Button>
      )
    );
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      className={editTaskName ? 'edit-mode-cell' : ''}
      style={{
        margin: editTaskName ? '-8px' : undefined,
        border: editTaskName ? '1px solid #1677ff' : undefined,
        borderRadius: editTaskName ? '4px' : undefined,
        backgroundColor: editTaskName ? 'rgba(22, 119, 255, 0.02)' : undefined,
      }}
    >
      <Flex gap={8} align="center">
        {!!task?.sub_tasks?.length ? (
          renderToggleButtonForHasSubTasks(task.id || null, !!task?.sub_tasks?.length)
        ) : (
          <div className="h-4 w-4">
            {renderToggleButtonForNonSubtasks(task.id || '', isSubTask, task.sub_tasks_count || 0)}
          </div>
        )}

        {isSubTask && <DoubleRightOutlined style={{ fontSize: 12 }} />}

        <div ref={wrapperRef} style={{ flex: 1 }}>
          {!editTaskName && (
            <Typography.Text
              ellipsis={{ expanded: false }}
              onClick={() => setEditTaskName(true)}
              style={{ cursor: 'pointer' }}
            >
              {task.name}
            </Typography.Text>
          )}

          {editTaskName && (
            <Input
              ref={inputRef}
              variant="borderless"
              value={task.name}
              autoFocus
              onPressEnter={() => setEditTaskName(false)}
              onBlur={() => setEditTaskName(false)}
              style={{
                width: '100%',
                padding: 0,
              }}
            />
          )}
        </div>

        {!editTaskName &&
          renderSubtasksCountLabel(task.id || '', isSubTask, task.sub_tasks_count || 0)}
      </Flex>

      <div className="open-task-button">
        <Button
          type="text"
          icon={<ExpandAltOutlined />}
          onClick={() => {
            dispatch(setSelectedTaskId(task.id || ''));
            dispatch(setShowTaskDrawer(true));
          }}
          style={{
            backgroundColor: colors.transparent,
            padding: 0,
            height: 'fit-content',
          }}
        >
          {t('openButton')}
        </Button>
      </div>
    </Flex>
  );
};

export default TaskListTaskCell;
