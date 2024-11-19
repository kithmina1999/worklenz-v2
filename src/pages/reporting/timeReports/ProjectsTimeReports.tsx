import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import CustomPageHeader from '../pageHeader/CustomPageHeader';
import { DownOutlined } from '@ant-design/icons';
import TimeReportPageHeader from './pageHeader/TimeReportPageHeader';
import ProjectTimeSheetChart from './projectTimeSheet/ProjectTimeSheetChart';

const ProjectsTimeReports = () => {
  return (
    <Flex vertical>
      <CustomPageHeader
        title="Projects Time Sheet"
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

      <Card
        style={{ borderRadius: '4px' }}
        title={
          <div style={{ padding: '16px 0' }}>
            <TimeReportPageHeader />
          </div>
        }
      >
        <ProjectTimeSheetChart />
      </Card>
    </Flex>
  );
};

export default ProjectsTimeReports;
