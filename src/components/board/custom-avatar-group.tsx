import { Button, Flex } from 'antd';
import AddMembersDropdown from '@/components/add-members-dropdown/add-members-dropdown';
import Avatars from '../avatars/avatars';
import { IProjectTask } from '@/types/project/projectTasksViewModel.types';
import AssigneeSelector from '../taskListCommon/assigneeSelector/AssigneeSelector';

type CustomAvatarGroupProps = {
  task: IProjectTask;
  sectionId: string;
};

const CustomAvatarGroup = ({ task, sectionId }: CustomAvatarGroupProps) => {
  return task.assignees ? (
    <Flex
      gap={4}
      align="center"
      style={{
        borderRadius: 4,
        cursor: 'pointer',
      }}
    >
      <Avatars members={task.names || []} />
      <Button
        shape="circle"
        type="dashed"
        size="small"
        style={{
          background: 'transparent',
          boxShadow: 'none',
          width: 26,
          height: 26,
        }}
        onClick={e => e.stopPropagation()}
      >
        <AssigneeSelector showDropdown={false} task={task} groupId={sectionId} />
      </Button>
    </Flex>
  ) : (
    <Button
      shape="circle"
      type="dashed"
      size="small"
      style={{
        background: 'transparent',
        boxShadow: 'none',
        width: 26,
        height: 26,
      }}
      onClick={e => e.stopPropagation()}
    >
      <AddMembersDropdown />
    </Button>
  );
};

export default CustomAvatarGroup;
