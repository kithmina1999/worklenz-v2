import React from 'react';
import CustomPageHeader from '../pageHeader/CustomPageHeader';
import { Button, Checkbox, Typography } from 'antd';

const OverviewReports = () => {
  return (
    <div>
      <CustomPageHeader
        title="Overview"
        children={
          <Button>
            <Checkbox />
            <Typography.Text>Include Archived Projects</Typography.Text>
          </Button>
        }
      />
    </div>
  );
};

export default OverviewReports;
