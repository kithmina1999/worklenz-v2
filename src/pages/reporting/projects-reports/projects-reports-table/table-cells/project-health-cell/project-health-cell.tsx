import { Badge, Card, Dropdown, Flex, Menu, MenuProps, Typography } from 'antd';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import './project-health-cell.css';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProjectHealth } from '@/types/project/projectHealth.types';

interface HealthStatusDataType {
  value: string;
  label: string;
  color: string;
};

const ProjectHealthCell = ({ value, label, color }: HealthStatusDataType) => {
  const { projectHealths } = useAppSelector(state => state.projectHealthReducer);

  const [projectHealth, setProjectHealth] = useState<IProjectHealth | null>(() => {
    const initialHealth = projectHealths.find(status => status.id === value);
    return initialHealth || {
      color_code: color,
      id: value,
      name: label,
    };
  });

  // localization
  const { t } = useTranslation('reporting-projects');

  // health selection options
  const healthOptions = projectHealths.map(status => ({
    key: status.id,
    value: status.id,
    label: (
      <Typography.Text style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Badge color={status.color_code} /> {t(`${status.name}`)}
      </Typography.Text>
    ),
  }));

  // handle health status select
  const onClick: MenuProps['onClick'] = e => {
    const selectedStatus = projectHealths.find(status => status.id === e.key);
    if (selectedStatus) {
      setProjectHealth(selectedStatus);
    }
  };

  // dropdown items
  const projectHealthCellItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Card className="project-health-dropdown-card" bordered={false}>
          <Menu className="project-health-menu" items={healthOptions} onClick={onClick} />
        </Card>
      ),
    },
  ];

  return (
    <Dropdown
      overlayClassName="project-health-dropdown"
      menu={{ items: projectHealthCellItems }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        gap={6}
        align="center"
        style={{
          width: 'fit-content',
          borderRadius: 24,
          paddingInline: 8,
          height: 30,
          backgroundColor: projectHealth?.color_code || colors.transparent,
          color: colors.darkGray,
          cursor: 'pointer',
        }}
      >
        <Typography.Text
          style={{
            textTransform: 'capitalize',
            color: colors.darkGray,
            fontSize: 13,
          }}
        >
          {projectHealth?.name}
        </Typography.Text>

        <DownOutlined />
      </Flex>
    </Dropdown>
  );
};

export default ProjectHealthCell;
