/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Empty,
  Flex,
  Input,
  InputRef,
  List,
  Typography,
} from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { toggleMember } from '../../../../../../features/tasks/taskSlice';
import CustomAvatar from '../../../../../../components/CustomAvatar';
import { colors } from '../../../../../../styles/colors';
import { PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { toggleDrawer } from '../../../../../../features/projects/singleProject/members/projectMembersSlice';

const AssigneeSelector = ({ taskId }: { taskId: string }) => {
  // statefor trrack overlay open or close
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const membersInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();

  // get members list from members reducer
  const membersList = [
    ...useAppSelector((state) => state.memberReducer.membersList),
    useAppSelector((state) => state.memberReducer.owner),
  ];

  // this is for get the current string that type on search bar
  const [searchQuery, setSearchQuery] = useState<string>('');

  // used useMemo hook for re render the list when searching
  const filteredMembersData = useMemo(() => {
    return membersList.filter((member) =>
      member.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [membersList, searchQuery]);

  // funcion to toggle drawer open
  const handleOverlayToggle = () => {
    setIsOverlayOpen((prev) => !prev);
  };

  // function to handle add project member drawer open
  const handleProjectMemberDrawerOpen = () => {
    setIsOverlayOpen(false);
    dispatch(toggleDrawer());
  };

  // function to focus members input
  const handleMembersDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        membersInputRef.current?.focus();
      }, 0);
    }
  };

  // custom dropdown content
  const membersDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical gap={8}>
        <Input
          ref={membersInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          placeholder="Search by name"
        />

        <List style={{ padding: 0 }}>
          {filteredMembersData.length ? (
            filteredMembersData.map((member) => (
              <List.Item
                className="custom-list-item"
                key={member.memberId}
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'flex-start',
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={member.memberId}
                  onChange={() => dispatch(toggleMember({ taskId, member }))}
                />
                <div>
                  <CustomAvatar
                    avatarCharacter={member.memberName[0].toUpperCase()}
                  />
                </div>
                <Flex vertical>
                  {member.memberName}

                  <Typography.Text
                    style={{
                      fontSize: 12,
                      color: colors.lightGray,
                    }}
                  >
                    {member.memberEmail}
                  </Typography.Text>
                </Flex>
              </List.Item>
            ))
          ) : (
            <Empty />
          )}
        </List>

        <Divider style={{ margin: 0 }} />

        <Button
          icon={<UsergroupAddOutlined />}
          style={{ border: 'none', color: colors.skyBlue }}
          onClick={handleProjectMemberDrawerOpen}
        >
          Invite new member by email
        </Button>

        <Divider style={{ margin: 0 }} />

        <Button
          type="primary"
          style={{ alignSelf: 'flex-end' }}
          onClick={handleOverlayToggle}
        >
          OK
        </Button>
      </Flex>
    </Card>
  );

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => membersDropdownContent}
      onOpenChange={handleMembersDropdownOpen}
      open={isOverlayOpen}
    >
      <Flex gap={4} align="center">
        <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined style={{ fontSize: 12 }} />}
          onClick={handleOverlayToggle}
        />
      </Flex>
    </Dropdown>
  );
};

export default AssigneeSelector;
