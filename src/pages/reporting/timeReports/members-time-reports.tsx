import { Button, Card, Checkbox, Dropdown, Flex, Space, Typography } from 'antd';
import React from 'react';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { DownOutlined } from '@ant-design/icons';
import TimeReportPageHeader from '@/pages/reporting/timeReports/page-header/time-report-page-header';
import MembersTimeSheet from '@/pages/reporting/timeReports/members-time-sheet/members-time-sheet';

const MembersTimeReports = () => {
  return (
    <Flex vertical>
      <CustomPageHeader
        title="Members Time Sheet"
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
        <MembersTimeSheet />
      </Card>
    </Flex>
  )
};

export default MembersTimeReports;
