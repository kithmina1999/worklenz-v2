import React, { useState } from 'react';
import { Avatar, Button, Checkbox, Dropdown, Input, Menu, Typography } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './add-members-dropdown.css';
import { useAppSelector } from '@/hooks/useAppSelector';
import { AvatarNamesMap } from '@/shared/constants';

const AddMembersDropdown: React.FC = () => {
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);

  const handleCheck = (member: string) => {
    setCheckedMembers(prevChecked =>
      prevChecked.includes(member)
        ? prevChecked.filter(m => m !== member)
        : [...prevChecked, member]
    );
  };

  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const inviteItems = [
    {
      key: '1',
      label: (
        <Checkbox
          checked={checkedMembers.includes('Invite Member 1')}
          onClick={e => e.stopPropagation()}
          onChange={() => handleCheck('Invite Member 1')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              style={{
                backgroundColor: AvatarNamesMap['R'],
                width: '28px',
                height: '28px',
                marginRight: '0.5rem',
              }}
            >
              R
            </Avatar>
            <div
              style={{
                lineHeight: '15px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography.Text>Raveesha Dilanka</Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: '80%' }}>
                raveeshadilanka1999@gmail.com
              </Typography.Text>
            </div>
          </div>
        </Checkbox>
      ),
    },
  ];

  // Define menu items with header and footer
  const menu = (
    <div>
      {/* Header */}
      <div
        style={{
          backgroundColor: themeMode === 'dark' ? 'black' : 'white',
          padding: '8px 16px',
          fontWeight: 'bold',
        }}
      >
        <Input placeholder="Search by name" />
      </div>

      {/* Invite Items */}
      <Menu
        items={inviteItems}
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      />

      <Button
        style={{
          width: '100%',
          backgroundColor: themeMode === 'dark' ? 'black' : 'white',
        }}
        type="link"
      >
        <UsergroupAddOutlined /> Invite a new member by email
      </Button>

      {/* Footer */}
      <div
        style={{
          padding: '8px',
          textAlign: 'right',
          backgroundColor: themeMode === 'dark' ? 'black' : 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.15)',
          color: '#1890ff',
        }}
      >
        <Button
          type="primary"
          size="small"
          onClick={() => {
            console.log('Selected Members:', checkedMembers);
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      menu={{ items: inviteItems }}
      trigger={['click']}
      dropdownRender={() => menu}
      overlayClassName="custom-dropdown-menu"
      overlayStyle={{
        width: '300px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <UserAddOutlined />
    </Dropdown>
  );
};

export default AddMembersDropdown;
