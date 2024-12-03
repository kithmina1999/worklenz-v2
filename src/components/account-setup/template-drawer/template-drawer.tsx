import type { MenuProps } from 'antd';
import { Alert, Empty, List, Menu, Skeleton, Tabs, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/app/store';
import { projectTemplatesApiService } from '@/api/project-templates/project-templates.api.service';
import {
  IProjectTemplate,
  IWorklenzTemplate,
} from '@/types/project-templates/project-templates.types';
import './template-drawer.css';

const { Title, Text } = Typography;

interface TemplateDrawerProps {
  showBothTabs: boolean;
  onTemplateImport: () => void;
}

const TemplateDrawer: React.FC<TemplateDrawerProps> = ({
  showBothTabs = false,
  onTemplateImport = () => { },
}) => {
  const themeMode = useSelector((state: RootState) => state.themeReducer.mode);
  const { t } = useTranslation('template-drawer');

  const [templates, setTemplates] = useState<IWorklenzTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<IProjectTemplate | null>(null);
  const [loadingSelectedTemplate, setLoadingSelectedTemplate] = useState(false);

  const getSelectedTemplate = async (templateId: string) => {
    try {
      setLoadingSelectedTemplate(true);
      const res = await projectTemplatesApiService.getByTemplateId(templateId);
      if (res.done) {
        setSelectedTemplate(res.body);
      }
    } catch (error) {
      console.error('Error loading template:', error);
    } finally {
      setLoadingSelectedTemplate(false);
    }
  };

  const getTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const res = await projectTemplatesApiService.getWorklenzTemplates();
      if (res.done) {
        setTemplates(res.body);
        if (res.body.length > 0 && res.body[0].id) {
          await getSelectedTemplate(res.body[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const menuItems: MenuProps['items'] = templates.map(template => ({
    key: template.id || '',
    label: template.name || t('untitled'),
    type: 'item'
  }));

  const handleMenuClick = (templateId: string) => {
    getSelectedTemplate(templateId);
  };

  const renderTemplateDetails = () => {
    if (!selectedTemplate) {
      return <Empty description={t('noTemplateSelected')} />;
    }

    return (
      <div>
        {/* Description */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('description')}</Text>
          </div>
          <div>
            <Text>{selectedTemplate.description || t('noDescription')}</Text>
          </div>
        </div>

        {/* Phase */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('phase')}</Text>
          </div>
          <div>
            {selectedTemplate.phases?.length ? (
              selectedTemplate.phases.map(phase => (
                <Tag
                  key={phase.name}
                  color={phase.color_code}
                  style={{ color: 'black', marginBottom: '8px' }}
                >
                  {phase.name}
                </Tag>
              ))
            ) : (
              <Text type="secondary">{t('noPhases')}</Text>
            )}
          </div>
        </div>

        {/* Statuses */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('statuses')}</Text>
          </div>
          <div>
            {selectedTemplate.status?.length ? (
              selectedTemplate.status.map(status => (
                <Tag
                  key={status.name}
                  color={status.color_code}
                  style={{ color: 'black', marginBottom: '8px' }}
                >
                  {status.name}
                </Tag>
              ))
            ) : (
              <Text type="secondary">{t('noStatuses')}</Text>
            )}
          </div>
        </div>

        {/* Priorities */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('priorities')}</Text>
          </div>
          <div>
            {selectedTemplate.priorities?.length ? (
              selectedTemplate.priorities.map(priority => (
                <Tag
                  key={priority.name}
                  color={priority.color_code}
                  style={{ color: 'black', marginBottom: '8px' }}
                >
                  {priority.name}
                </Tag>
              ))
            ) : (
              <Text type="secondary">{t('noPriorities')}</Text>
            )}
          </div>
        </div>

        {/* Labels */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('labels')}</Text>
          </div>
          <div>
            {selectedTemplate.labels?.length ? (
              selectedTemplate.labels.map(label => (
                <Tag
                  key={label.name}
                  color={label.color_code}
                  style={{ color: 'black', marginBottom: '8px' }}
                >
                  {label.name}
                </Tag>
              ))
            ) : (
              <Text type="secondary">{t('noLabels')}</Text>
            )}
          </div>
        </div>

        {/* Tasks */}
        <div className="template-detail-row">
          <div className="template-detail-label">
            <Text strong>{t('tasks')}</Text>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            {selectedTemplate.tasks?.length ? (
              <List
                dataSource={selectedTemplate.tasks}
                renderItem={item => (
                  <List.Item key={item.name}>
                    <Text>{item.name}</Text>
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">{t('noTasks')}</Text>
            )}
          </div>
        </div>
      </div>
    );
  };

  const menuContent = (
    <div style={{ display: 'flex', height: 'calc(100vh - 200px)' }}>
      {/* Menu Area */}
      <div style={{ minWidth: '250px', overflowY: 'auto', height: '100%' }}>
        <Skeleton loading={loadingTemplates} active>
          <Menu
            className="template-menu"
            onClick={({ key }) => handleMenuClick(key)}
            style={{ width: 256 }}
            defaultSelectedKeys={[templates[0]?.id || '']}
            mode="inline"
            items={menuItems}
          />
        </Skeleton>
      </div>
      {/* Content Area */}
      <div className="temp-details" style={{ flex: 1 }}>
        <Title level={4}>Details</Title>
        <Skeleton loading={loadingSelectedTemplate} active>
          {selectedTemplate?.image_url && (
            <img src={selectedTemplate.image_url} alt="template preview" />
          )}
          {renderTemplateDetails()}
        </Skeleton>
      </div>
    </div>
  );

  const tabs = [
    {
      key: '1',
      label: 'Worklenz Templates',
      children: menuContent,
    },
  ];

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: themeMode === 'dark' ? '' : '#fff',
          overflow: 'hidden',
        }}
      >
        {showBothTabs ? (
          <Tabs type="card" items={tabs} />
        ) : (
          menuContent
        )}
      </div>
    </div>
  );
};

export default TemplateDrawer;
