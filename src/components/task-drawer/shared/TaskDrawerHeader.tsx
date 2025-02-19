import { Button, Dropdown, Flex, Input, InputRef, MenuProps } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAuthService } from '@/hooks/useAuth';
import TaskDrawerStatusDropdown from '../task-drawer-status-dropdown/task-drawer-status-dropdown';
import { tasksApiService } from '@/api/tasks/tasks.api.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedTaskId, setShowTaskDrawer } from '@/features/task-drawer/task-drawer.slice';

type TaskDrawerHeaderProps = {
  name: string;
  inputRef: React.RefObject<InputRef | null>;
};

const TaskDrawerHeader = ({ name, inputRef }: TaskDrawerHeaderProps) => {
  const dispatch = useAppDispatch();
  const [characterLength, setCharacterLength] = useState<number>(name.length);
  const [isTaskNameFocused, setTaskNameFocused] = useState<boolean>(false);
  const { taskFormViewModel, selectedTaskId } = useAppSelector(state => state.taskDrawerReducer);
  const currentSession = useAuthService().getCurrentSession();

  const onTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacterLength(e.currentTarget.value.length);
  };

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;
    const res = await tasksApiService.deleteTask(selectedTaskId);
    if (res.done) {
      dispatch(setShowTaskDrawer(false));
      dispatch(setSelectedTaskId(null));
    }
  };

  const deletTaskDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Flex gap={8} align="center">
          <Button type="text" danger onClick={handleDeleteTask}>
            Delete Task
          </Button>
        </Flex>
      ),
    },
  ];

  const handleInputFocus = () => {
    setTaskNameFocused(true);
  };

  const handleInputBlur = () => {
    setTaskNameFocused(false);
  };

  return (
    <Flex gap={12} align="center" style={{ marginBlockEnd: 6 }}>
      <Flex style={{ position: 'relative', width: '100%' }}>
        <Input
          ref={inputRef}
          size="large"
          value={name}
          onChange={e => onTaskNameChange(e)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Type your Task"
          style={{ width: '100%', border: 'none' }}
          showCount={false}
          maxLength={250}
        />
      </Flex>

      <TaskDrawerStatusDropdown
        statuses={taskFormViewModel?.statuses ?? []}
        task={taskFormViewModel?.task ?? {}}
        teamId={currentSession?.team_id ?? ''}
      />

      <Dropdown overlayClassName={'delete-task-dropdown'} menu={{ items: deletTaskDropdownItems }}>
        <Button type="text" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Flex>
  );
};

export default TaskDrawerHeader;
