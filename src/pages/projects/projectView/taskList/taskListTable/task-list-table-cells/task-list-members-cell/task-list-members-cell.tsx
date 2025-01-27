import { Flex } from 'antd';
import Avatars from '@/components/avatars/avatars';
import AssigneeSelector from '@/components/taskListCommon/assigneeSelector/AssigneeSelector';
import { useState } from 'react';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';

type TaskListMembersCellProps = {
  groupId: string;
  task: IProjectTask;
};

const TaskListMembersCell = ({ groupId, task }: TaskListMembersCellProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Flex gap={4} align="center" onClick={() => {}}>
      <Avatars members={task.assignees || []} />
      <AssigneeSelector
        showDropdown={showDropdown}
        task={task}
        groupId={groupId}
      />
    </Flex>
  );
};

export default TaskListMembersCell;
