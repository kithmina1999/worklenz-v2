import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Flex, Input, InputRef, Space } from 'antd';
import React, { useRef } from 'react';

const SearchDropdown = () => {
  const searchInputRef = useRef<InputRef>(null);

  // custom dropdown content
  const searchDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8, width: 360 } }}>
      <Flex vertical gap={8}>
        <Input ref={searchInputRef} placeholder="Search by name" />
        <Space>
          <Button type="primary">Search</Button>
          <Button>Reset</Button>
        </Space>
      </Flex>
    </Card>
  );

  // function to focus search input
  const handleSearchDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => searchDropdownContent}
      onOpenChange={handleSearchDropdownOpen}
    >
      <Button icon={<SearchOutlined />} />
    </Dropdown>
  );
};

export default SearchDropdown;
