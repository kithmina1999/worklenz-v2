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
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleProjectMemberDrawer } from '../../../features/projects/singleProject/members/projectMembersSlice';
import { colors } from '../../../styles/colors';
import { PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SingleAvatar from '@/components/common/single-avatar/single-avatar';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { IProjectTask, ITaskAssignee } from '@/types/project/projectTasksViewModel.types';
import { ITeamMembersViewModel } from '@/types/teamMembers/teamMembersViewModel.types';
import { sortByPending, sortBySelection } from '@/utils/sort-team-members';
import { useAuthService } from '@/hooks/useAuth';
import { useSocket } from '@/socket/socketContext';
import { SocketEvents } from '@/shared/socket-events';
import { ITaskAssigneesUpdateResponse } from '@/types/tasks/task-assignee-update-response';

interface AssigneeSelectorProps {
  task: IProjectTask;
  showDropdown: boolean;
}

const AssigneeSelector = ({ task, showDropdown }: AssigneeSelectorProps) => {
  const membersInputRef = useRef<InputRef>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [teamMembers, setTeamMembers] = useState<ITeamMembersViewModel>({ data: [], total: 0 });
  const { projectId } = useAppSelector(state => state.projectReducer);
  const currentSession = useAuthService().getCurrentSession();
  const { socket } = useSocket();

  const { t } = useTranslation('task-list-table');

  const dispatch = useAppDispatch();

  const members = useAppSelector(state => state.teamMembersReducer.teamMembers);

  const filteredMembersData = useMemo(() => {
    return teamMembers?.data?.filter(member =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamMembers, searchQuery]);

  const handleInviteProjectMemberDrawer = () => {
    dispatch(toggleProjectMemberDrawer());
  };

  const handleMembersDropdownOpen = (open: boolean) => {
    if (open) {
      const assignees = task?.assignees?.map(assignee => assignee.team_member_id);
      console.log(task, assignees)
      const membersData = (members?.data || []).map(member => ({
        ...member,
        selected: assignees?.includes(member.id),
      }));
      let sortedMembers = sortBySelection(membersData);
      setTeamMembers({ data: sortedMembers });
      // let pendingMembers = sortByPending(membersData);
      // setTeamMembers({ data: pendingMembers });

      setTimeout(() => {
        membersInputRef.current?.focus();
      }, 0);
    } else {
      setTeamMembers(members || { data: [] });
    }
  };

  const handleMemberChange = (e: CheckboxChangeEvent, memberId: string) => {
    if (!memberId || !projectId || !task?.id || !currentSession?.id) return;

    const body = {
      team_member_id: memberId,
      project_id: projectId,
      task_id: task.id,
      reporter_id: currentSession?.id,
      mode: e.target.checked ? 0 : 1,
      parent_task: task.parent_task_id,
    };

    console.log(body)

    socket?.emit(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(), JSON.stringify(body));
    const updatedMembers = teamMembers.data?.map(member =>
      member.id === memberId ? { ...member, selected: e.target.checked } : member
    );
    setTeamMembers({ data: updatedMembers });
  };

  const handleAssignMembers = () => {
    console.log(teamMembers.data);
  };

  const handleQuickAssigneesUpdate = (data: ITaskAssigneesUpdateResponse) => {
    const assigneeIds = data?.assignees?.map(assignee => assignee.team_member_id);

    const updatedMembers = teamMembers.data?.map(member => assigneeIds.includes(member.id) ? { ...member, selected: true } : member);
    console.log(updatedMembers);
    // setTeamMembers({ data: updatedMembers });
  };

  useEffect(() => {
    socket?.on(
      SocketEvents.QUICK_ASSIGNEES_UPDATE.toString(),
      (data: ITaskAssigneesUpdateResponse) => {
        if (data) handleQuickAssigneesUpdate(data);
      }
    );
    return () => {
      setTeamMembers({ data: [], total: 0 });
      socket?.off(SocketEvents.QUICK_ASSIGNEES_UPDATE.toString());
    };
  }, []);

  const membersDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical>
        <Input
          ref={membersInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
          placeholder={t('searchInputPlaceholder')}
        />

        <List style={{ padding: 0, height: 250, overflow: 'auto' }}>
          {filteredMembersData?.length ? (
            filteredMembersData.map(member => (
              <List.Item
                className="custom-list-item"
                key={member.id}
                style={{
                  display: 'flex',
                  gap: 8,
                  justifyContent: 'flex-start',
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={member.id}
                  checked={member.selected}
                  onChange={e => handleMemberChange(e, member.id || '')}
                />
                <div>
                  <SingleAvatar
                    avatarUrl={member.avatar_url}
                    name={member.name}
                    email={member.email}
                  />
                </div>
                <Flex vertical>
                  {member.name}

                  <Typography.Text
                    style={{
                      fontSize: 12,
                      color: colors.lightGray,
                    }}
                  >
                    {member.email}
                  </Typography.Text>
                </Flex>
              </List.Item>
            ))
          ) : (
            <Empty />
          )}
        </List>

        <Divider style={{ marginBlock: 0 }} />

        <Button
          icon={<UsergroupAddOutlined />}
          type="text"
          style={{
            color: colors.skyBlue,
            border: 'none',
            backgroundColor: colors.transparent,
            width: '100%',
          }}
          onClick={handleInviteProjectMemberDrawer}
        >
          {t('assigneeSelectorInviteButton')}
        </Button>

        <Divider style={{ marginBlock: 8 }} />

        <Button
          type="primary"
          style={{ alignSelf: 'flex-end' }}
          size="small"
          onClick={handleAssignMembers}
        >
          {t('okButton')}
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
    >
      <Button
        type="dashed"
        shape="circle"
        size="small"
        icon={
          <PlusOutlined
            style={{
              fontSize: 12,
              width: 22,
              height: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      />
    </Dropdown>
  );
};

export default AssigneeSelector;
