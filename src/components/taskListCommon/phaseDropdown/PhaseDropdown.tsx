import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
// custom css file
import './phaseDropdown.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { PhaseOption } from '../../../types/phase.types';
import { colors } from '../../../styles/colors';

const PhaseDropdown = ({ projectId }: { projectId: string }) => {
  const [currentPhaseOption, setCurrentPhaseOption] =
    useState<PhaseOption | null>(null);

  // get phase data from redux
  const phaseList = useAppSelector((state) => state.phaseReducer.phaseList);

  //get phases details from phases slice
  const phase = phaseList.find((el) => el.projectId === projectId);

  // menu type
  type MenuItem = Required<MenuProps>['items'][number];
  // phase menu item
  const phaseMenuItems: MenuItem[] = phase
    ? phase.phaseOptions.map((option) => ({
        key: option.optionId,
        label: (
          <Flex gap={4}>
            <Badge color={option.optionColor} /> {option.optionName}
          </Flex>
        ),
      }))
    : [];

  // Handle phase select
  const handlePhaseOptionSelect: MenuProps['onClick'] = (e) => {
    const selectedOption = phase?.phaseOptions.find(
      (option) => option.optionId === e.key
    );
    if (selectedOption) {
      setCurrentPhaseOption(selectedOption);
    }
  };

  //dropdown items
  const phaseDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Card className="phase-dropdown-card" bordered={false}>
          <Menu
            className="phase-menu"
            items={phaseMenuItems}
            defaultValue={'todo'}
            onClick={handlePhaseOptionSelect}
          />
        </Card>
      ),
    },
  ];

  return (
    <Dropdown
      overlayClassName="phase-dropdown"
      menu={{ items: phaseDropdownItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        gap={4}
        justify="space-between"
        style={{
          width: 'fit-content',
          borderRadius: 24,
          padding: '2px 12px',
          fontSize: 13,
          backgroundColor: currentPhaseOption?.optionColor,
          color: colors.darkGray,
        }}
      >
        {currentPhaseOption ? (
          <Typography.Text
            ellipsis={{ expanded: false }}
            style={{ textTransform: 'capitalize', color: colors.darkGray }}
          >
            {currentPhaseOption?.optionName}
          </Typography.Text>
        ) : (
          <Typography.Text style={{ color: colors.lightGray }}>
            Select
          </Typography.Text>
        )}

        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default PhaseDropdown;
