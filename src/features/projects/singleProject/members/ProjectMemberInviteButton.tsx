import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleProjectMemberDrawer } from './projectMembersSlice';

const ProjectMemberInviteButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      type="primary"
      icon={<UsergroupAddOutlined />}
      onClick={() => dispatch(toggleProjectMemberDrawer())}
    >
      Invite
    </Button>
  );
};

export default ProjectMemberInviteButton;
