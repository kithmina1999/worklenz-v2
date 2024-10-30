import { CaretDownFilled } from '@ant-design/icons';
import { ConfigProvider, Flex, Select } from 'antd';
import React, { useState } from 'react';
import { colors } from '../../../../../styles/colors';
import ConfigPhaseButton from '../../../../../features/projects/singleProject/phase/ConfigPhaseButton';
import { useSelectedProject } from '../../../../../hooks/useSelectedProject';
import { useAppSelector } from '../../../../../hooks/useAppSelector';

const GroupByDropdown = () => {
  type GroupTypes = 'status' | 'priority' | 'phase';

  const [activeGroup, setActiveGroup] = useState<GroupTypes>('status');

  const handleChange = (value: string) => {
    setActiveGroup(value as GroupTypes);
  };

  // get selected project from useSelectedPro
  const selectedProject = useSelectedProject();

  //get phases details from phases slice
  const phase =
    useAppSelector((state) => state.phaseReducer.phaseList).find(
      (phase) => phase.projectId === selectedProject?.projectId
    ) || null;

  const groupDropdownMenuItems = [
    { key: 'status', value: 'status', label: 'Status' },
    { key: 'priority', value: 'priority', label: 'Priority' },
    { key: 'phase', value: 'phase', label: phase ? phase?.phase : 'Phase' },
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
      {(activeGroup === 'status' || activeGroup === 'phase') && (
        <ConfigProvider wave={{ disabled: true }}>
          {activeGroup === 'phase' && (
            <ConfigPhaseButton color={colors.skyBlue} />
          )}
        </ConfigProvider>
      )}
    </Flex>
  );
};

export default GroupByDropdown;
