import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDownFilled } from '@ant-design/icons';
import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Checkbox from 'antd/es/checkbox';
import Dropdown from 'antd/es/dropdown';
import Empty from 'antd/es/empty';
import Flex from 'antd/es/flex';
import Input, { InputRef } from 'antd/es/input';
import List from 'antd/es/list';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import SingleAvatar from '@components/common/single-avatar/single-avatar';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups, setMembers } from '@/features/tasks/tasks.slice';

const MembersFilterDropdown = () => {
  const membersInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const { t } = useTranslation('task-list-filters');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { taskAssignees } = useAppSelector(state => state.taskReducer);
  const { projectId } = useAppSelector(state => state.projectReducer);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMembersData = useMemo(() => {
    return taskAssignees.filter(member =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [taskAssignees, searchQuery]);

  const handleSelectedFiltersCount = async (memberId: string | undefined, checked: boolean) => {
    setSelectedCount(checked ? selectedCount + 1 : selectedCount - 1);
    if (!memberId) return;
    const newTaskAssignees = taskAssignees.map(member =>
      member.id === memberId ? { ...member, selected: checked } : member
    );
    await dispatch(setMembers(newTaskAssignees));
    if (projectId) dispatch(fetchTaskGroups(projectId));
  };

  const membersDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical gap={8}>
        <Input
          ref={membersInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
          placeholder={t('searchInputPlaceholder')}
        />

        <List style={{ padding: 0, maxHeight: 250, overflow: 'auto' }}>
          {filteredMembersData.length ? (
            filteredMembersData.map(member => (
              <List.Item
                className={`custom-list-item ${themeMode === 'dark' ? 'dark' : ''}`}
                key={member.id}
                style={{
                  display: 'flex',
                  gap: 8,
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={member.id}
                  checked={member.selected}
                  onChange={e => handleSelectedFiltersCount(member.id, e.target.checked)}
                >
                  <div style={{ display: 'flex', gap: 8 }}>
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
                  </div>
                </Checkbox>
              </List.Item>
            ))
          ) : (
            <Empty />
          )}
        </List>
      </Flex>
    </Card>
  );

  // function to focus members input
  const handleMembersDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        membersInputRef.current?.focus();
      }, 0);
    }
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
        style={{
          backgroundColor:
            selectedCount > 0
              ? themeMode === 'dark'
                ? '#003a5c'
                : colors.paleBlue
              : colors.transparent,

          color: selectedCount > 0 ? (themeMode === 'dark' ? 'white' : colors.darkGray) : 'inherit',
        }}
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
