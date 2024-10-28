import { CaretDownFilled } from '@ant-design/icons';
import { Button, Card, Dropdown, Flex, Input, InputRef } from 'antd';
import React, { useRef } from 'react';

const LabelsDropdown = () => {
  const labelsInputRef = useRef<InputRef>(null);

  // custom dropdown content
  const labelsDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8, width: 260 } }}>
      <Flex vertical gap={8}>
        <Input ref={labelsInputRef} placeholder="Search by name" />
      </Flex>
    </Card>
  );

  // function to focus labels input
  const handleLabelsDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        labelsInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => labelsDropdownContent}
      onOpenChange={handleLabelsDropdownOpen}
    >
      <Button icon={<CaretDownFilled />} iconPosition="end">
        Labels
      </Button>
    </Dropdown>
  );
};

export default LabelsDropdown;
