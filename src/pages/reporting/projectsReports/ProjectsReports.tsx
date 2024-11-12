import { Button, Checkbox, Dropdown, Flex, Space, Typography } from 'antd';
import React from 'react';
import CustomPageHeader from '../pageHeader/CustomPageHeader';
import { DownOutlined } from '@ant-design/icons';

const ProjectsReports = () => {
  return (
    <Flex vertical gap={24}>
      <CustomPageHeader
        title="3 Projects"
        children={
          <Space>
            <Button>
              <Checkbox />
              <Typography.Text>Include Archived Projects</Typography.Text>
            </Button>

            <Dropdown menu={{ items: [{ key: '1', label: 'Excel' }] }}>
              <Button type="primary" icon={<DownOutlined />} iconPosition="end">
                Export
              </Button>
            </Dropdown>
          </Space>
        }
      />
    </Flex>
  );
};

export default ProjectsReports;
