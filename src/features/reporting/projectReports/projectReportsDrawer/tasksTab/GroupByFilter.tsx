import { CaretDownFilled } from '@ant-design/icons';
import { Flex, Select } from 'antd';
import React from 'react';

type GroupType = 'status' | 'priority' | 'phase';

type GroupByFilterProps = {
  setActiveGroup: (group: GroupType) => void;
};

const GroupByFilter = ({ setActiveGroup }: GroupByFilterProps) => {
  const handleChange = (value: string) => {
    setActiveGroup(value as GroupType);
  };

  const groupDropdownMenuItems = [
    { key: 'status', value: 'status', label: 'Status' },
    { key: 'priority', value: 'priority', label: 'Priority' },
    {
      key: 'phase',
      value: 'phase',
      label: 'Phase',
    },
  ];

  return (
    <Flex align="center" gap={4} style={{ marginInlineStart: 12 }}>
      Group by:
      <Select
        defaultValue={'status'}
        options={groupDropdownMenuItems}
        onChange={handleChange}
        suffixIcon={<CaretDownFilled />}
      />
    </Flex>
  );
};

export default GroupByFilter;
