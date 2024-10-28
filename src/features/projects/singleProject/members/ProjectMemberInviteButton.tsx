import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleDrawer } from './projectMembersSlice';

const ProjectMemberInviteButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      type="primary"
      icon={<UsergroupAddOutlined />}
      onClick={() => dispatch(toggleDrawer())}
    >
      Invite
    </Button>
  );
};

export default ProjectMemberInviteButton;
