import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Dropdown, List, Space } from 'antd';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleColumnHidden } from '../../../../features/reporting/projectReports/projectReportsTableColumns/projectReportsTableColumnSlice';
import { useTranslation } from 'react-i18next';
import { colors } from '../../../../styles/colors';

const ProjectTableShowFieldsDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // localization
  const { t } = useTranslation('reportingProjectsFilters');

  const columnsVisibility = useAppSelector(
    (state) => state.projectReportsTableColumnsReducer
  );
  const dispatch = useAppDispatch();

  const columnKeys = Object.keys(columnsVisibility).filter(
    (key) => key !== 'project' && key !== 'projectManager'
  );

  // custom dropdown content
  const showFieldsDropdownContent = (
    <Card
      className="custom-card"
      style={{ height: 300, overflowY: 'scroll' }}
      styles={{ body: { padding: 0 } }}
    >
      <List style={{ padding: 0 }}>
        {columnKeys.map((key) => (
          <List.Item
            key={key}
            className="custom-list-item"
            style={{
              display: 'flex',
              gap: 8,
              padding: '4px 8px',
              border: 'none',
            }}
          >
            <Space>
              <Checkbox
                checked={columnsVisibility[key]}
                onClick={() => dispatch(toggleColumnHidden(key))}
              />
              {t(`${key}Text`)}
            </Space>
          </List.Item>
        ))}
      </List>
    </Card>
  );

  return (
    <Dropdown
      overlay={showFieldsDropdownContent}
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => showFieldsDropdownContent}
      onOpenChange={(open) => setIsDropdownOpen(open)}
    >
      <Button
        icon={<MoreOutlined />}
        style={{
          color: isDropdownOpen ? colors.skyBlue : 'inherit',
          borderColor: isDropdownOpen ? colors.skyBlue : 'inherit',
        }}
      >
        {t('showFieldsText')}
      </Button>
    </Dropdown>
  );
};

export default ProjectTableShowFieldsDropdown;
