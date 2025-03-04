import { useMemo, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDownFilled } from '@ant-design/icons';
import { 
  Badge, 
  Button, 
  Card, 
  Checkbox, 
  Dropdown, 
  Empty, 
  Flex, 
  Input, 
  List, 
  Space, 
  Typography 
} from 'antd';
import type { InputRef } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { colors } from '@/styles/colors';
import SingleAvatar from '@components/common/single-avatar/single-avatar';
import { fetchTaskGroups, setMembers } from '@/features/tasks/tasks.slice';
import { fetchBoardTaskGroups, setBoardMembers } from '@/features/board/board-slice';

interface Member {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  selected: boolean;
}

const MembersFilterDropdown = () => {
  const membersInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [selectedCount, setSelectedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation('task-list-filters');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { taskAssignees } = useAppSelector(state => state.taskReducer);
  const { taskAssignees: boardTaskAssignees } = useAppSelector(state => state.boardReducer);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const tab = searchParams.get('tab');
  const projectView = tab === 'list' ? 'list' : 'kanban';

  const filteredMembersData = useMemo(() => {
    const members = projectView === 'list' ? taskAssignees : boardTaskAssignees;
    return members.filter(member => 
      member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [taskAssignees, boardTaskAssignees, searchQuery, projectView]);

  const handleSelectedFiltersCount = useCallback(async (memberId: string | undefined, checked: boolean) => {
    setSelectedCount(prev => checked ? prev + 1 : prev - 1);
    
    if (!memberId || !projectId) return;

    const updateMembers = async (members: Member[], setAction: any, fetchAction: any) => {
      const updatedMembers = members.map(member => 
        member.id === memberId ? { ...member, selected: checked } : member
      );
      await dispatch(setAction(updatedMembers));
      dispatch(fetchAction(projectId));
    };
    if (projectView === 'list') {
      await updateMembers(taskAssignees as Member[], setMembers, fetchTaskGroups);
    } else {
      await updateMembers(boardTaskAssignees as Member[], setBoardMembers, fetchBoardTaskGroups);
    }
  }, [projectId, projectView, taskAssignees, boardTaskAssignees, dispatch]);

  const renderMemberItem = (member: Member) => (
    <List.Item
      className={`custom-list-item ${themeMode === 'dark' ? 'dark' : ''}`}
      key={member.id}
      style={{ display: 'flex', gap: 8, padding: '4px 8px', border: 'none' }}
    >
      <Checkbox
        id={member.id}
        checked={member.selected}
        onChange={e => handleSelectedFiltersCount(member.id, e.target.checked)}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <SingleAvatar
            avatarUrl={member.avatar_url}
            name={member.name}
            email={member.email}
          />
          <Flex vertical>
            {member.name}
            <Typography.Text style={{ fontSize: 12, color: colors.lightGray }}>
              {member.email}
            </Typography.Text>
          </Flex>
        </div>
      </Checkbox>
    </List.Item>
  );

  const membersDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical gap={8}>
        <Input
          ref={membersInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('searchInputPlaceholder')}
        />
        <List style={{ padding: 0, maxHeight: 250, overflow: 'auto' }}>
          {filteredMembersData.length ? 
            filteredMembersData.map((member, index) => renderMemberItem(member as Member)) : 
            <Empty />
          }
        </List>
      </Flex>
    </Card>
  );

  const handleMembersDropdownOpen = useCallback((open: boolean) => {
    if (open) {
      setTimeout(() => membersInputRef.current?.focus(), 0);
      if (taskAssignees.length) {
        dispatch(setBoardMembers(taskAssignees));
      }
    }
  }, [dispatch, taskAssignees]);

  const buttonStyle = {
    backgroundColor: selectedCount > 0
      ? themeMode === 'dark' ? '#003a5c' : colors.paleBlue
      : colors.transparent,
    color: selectedCount > 0 ? (themeMode === 'dark' ? 'white' : colors.darkGray) : 'inherit',
  };

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => membersDropdownContent}
      onOpenChange={handleMembersDropdownOpen}
    >
      <Button
        icon={<CaretDownFilled />}
        iconPosition="end"
        style={buttonStyle}
      >
        <Space>
          {t('membersText')}
          {selectedCount > 0 && <Badge size="small" count={selectedCount} color={colors.skyBlue} />}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default MembersFilterDropdown;
