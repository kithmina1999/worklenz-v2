import { Tabs, Typography } from "antd";
import React from "react";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import '../../styles/accountSetup/TemplateDrawer.css'

const { Title, Text } = Typography

const TemplateDrawer: React.FC = () => {

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    { key: '1', label: 'Bug Tracking'},
    { key: '2', label: 'Construction' },
    { key: '3', label: 'Design & Creative' },
    { key: '4', label: 'Education' },
    { key: '5', label: 'Finance' },
    { key: '6', label: 'HR & Recruiting' },
    { key: '7', label: 'Information Technology' },
    { key: '8', label: 'Legal' },
    { key: '9', label: 'Manufacturing' },
    { key: '10', label: 'Marketing' },
    { key: '11', label: 'Nonprofit' },
    { key: '12', label: 'Personal use' },
    { key: '13', label: 'Sales & CRM' },
    { key: '14', label: 'Service & Consulting' },
    { key: '15', label: 'Software Development' },
  ];

  const onClick = () => {};

  const tabs = [
    {
      key: '1',
      label: 'Template 1',
      children: (
        <div style={{ display: 'flex', height: 'calc(100vh - 200px)' }}>
          {/* Menu Area */}
          <div style={{ minWidth: '250px', overflowY: 'auto', height: '100%'}}>
            <Menu
            className="template-menu"
              onClick={onClick}
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
            />
          </div>
          {/* Content Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
            {/* Placeholder for content */}
            <Title level={4}>Details</Title>
            <img src="https://worklenz.s3.amazonaws.com/project-template-gifs/bug-tracking.gif" alt="preview" />
            <div style={{display: 'flex', marginBottom: '1rem'}}>
              <div>
              <Text style={{fontWeight: 500}}>Description</Text>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sticky Tabs Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#fff', overflow: 'hidden'}}>
        <Tabs type="card" items={tabs} />
      </div>
    </div>
  );
};

export default TemplateDrawer;
