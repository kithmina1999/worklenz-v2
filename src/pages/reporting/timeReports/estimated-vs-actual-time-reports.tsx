import { Button, Card, Checkbox, Dropdown, Flex, Space, Typography } from 'antd';
import React from 'react';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { DownOutlined } from '@ant-design/icons';
import TimeReportPageHeader from '@/pages/reporting/timeReports/page-header/time-report-page-header';
import EstimatedVsActualTimeSheet from '@/pages/reporting/timeReports/estimated-vs-actual-time-sheet/estimated-vs-actual-time-sheet';

const EstimatedVsActualTimeReports = () => {
  return (
    <Flex vertical>
      <CustomPageHeader
        title="Estimated vs Actual"
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
        <EstimatedVsActualTimeSheet />
      </Card>
    </Flex>
  );
};

export default EstimatedVsActualTimeReports;
