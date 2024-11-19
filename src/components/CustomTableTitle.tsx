import { Typography } from 'antd';
import React from 'react';

// this custom table title used when the typography font weigh 500 needed
const CustomTableTitle = ({ title }: { title: string }) => {
  return <Typography.Text style={{ fontWeight: 500 }}>{title}</Typography.Text>;
};

export default CustomTableTitle;
