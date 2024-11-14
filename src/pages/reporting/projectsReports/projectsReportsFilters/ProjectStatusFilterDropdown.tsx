import { CaretDownFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, List, Space } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../styles/colors';

const ProjectStatusFilterDropdown = () => {
  // state to track dropdown open status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // localization
  const { t } = useTranslation('reportingProjectsFilters');

  // projectStatus dropdown items
  type ProjectStatusFieldsType = {
    key: string;
    label: string;
  };

  const projectStatusFieldsList: ProjectStatusFieldsType[] = [
    { key: 'cancelled', label: t('cancelledText') },
    { key: 'blocked', label: t('blockedText') },
    { key: 'onHold', label: t('onHoldText') },
    { key: 'proposed', label: t('proposedText') },
    { key: 'inPlanning', label: t('inPlanningText') },
    { key: 'inProgress', label: t('inProgressText') },
    { key: 'completed', label: t('completedText') },
    { key: 'continuous', label: t('continuousText') },
  ];

  // custom dropdown content
  const projectStatusDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 0 } }}>
      <List style={{ padding: 0 }}>
        {projectStatusFieldsList.map((item) => (
          <List.Item
            className="custom-list-item"
            key={item.key}
            style={{
              display: 'flex',
              gap: 8,
              padding: '4px 8px',
              border: 'none',
            }}
          >
            <Space>
              <Checkbox id={item.key} />
              {item.label}
            </Space>
          </List.Item>
        ))}
      </List>
    </Card>
  );

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => projectStatusDropdownContent}
      onOpenChange={(open) => setIsDropdownOpen(open)}
    >
      <Button
        icon={<CaretDownFilled />}
        iconPosition="end"
        style={{
          color: isDropdownOpen ? colors.skyBlue : 'inherit',
          borderColor: isDropdownOpen ? colors.skyBlue : 'inherit',
        }}
      >
        {t('statusText')}
      </Button>
    </Dropdown>
  );
};

export default ProjectStatusFilterDropdown;
