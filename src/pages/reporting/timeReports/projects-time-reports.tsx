import { Button, Card, Checkbox, Dropdown, Flex, Space, Typography } from 'antd';
import React from 'react';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { DownOutlined } from '@ant-design/icons';
import TimeReportPageHeader from '@/pages/reporting/timeReports/page-header/time-report-page-header';
import ProjectTimeSheetChart from '@/pages/reporting/timeReports/project-time-sheet/project-time-sheet-chart';

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

      <Card style={{borderRadius: '4px'}} title={<div style={{padding: '16px 0'}}><TimeReportPageHeader /></div>}>
        <ProjectTimeSheetChart />
      </Card>
    </Flex>
  );
};

export default ProjectsTimeReports;
