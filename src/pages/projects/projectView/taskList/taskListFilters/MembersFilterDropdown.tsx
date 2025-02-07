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
import { ITaskListMemberFilter } from '@/types/tasks/taskList.types';
import SingleAvatar from '@components/common/single-avatar/single-avatar';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setMembers } from '@/features/tasks/tasks.slice';

const MembersFilterDropdown = (props: { members: ITaskListMemberFilter[] }) => {
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const membersInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();

  const { t } = useTranslation('task-list-filters');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { taskAssignees, members } = useAppSelector(state => state.taskReducer);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMembersData = useMemo(() => {
    return props.members.filter(member =>
      member.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [props.members, searchQuery]);

  // handle selected filters count
  const handleSelectedFiltersCount = (memberId: string | undefined, checked: boolean) => {
    if (!memberId) return;
    let newMembers = [...members];
    if (checked) {
      newMembers.push(memberId);
      dispatch(setMembers(newMembers));
    } else {
      newMembers.splice(newMembers.indexOf(memberId), 1);
      dispatch(setMembers(newMembers));
    }
  };

  // custom dropdown content
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
                  checked={members.includes(member.id ?? '')}
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
            members.length > 0
              ? themeMode === 'dark'
                ? '#003a5c'
                : colors.paleBlue

              : colors.transparent,

          color: members.length > 0 ? (themeMode === 'dark' ? 'white' : colors.darkGray) : 'inherit',
        }}
      >
        <Space>

          {t('membersText')}
          {members.length > 0 && <Badge size="small" count={members.length} color={colors.skyBlue} />}
        </Space>
      </Button>

    </Dropdown>
  );
};

export default MembersFilterDropdown;
