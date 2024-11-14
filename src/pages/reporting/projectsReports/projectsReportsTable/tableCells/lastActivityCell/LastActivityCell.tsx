import { Tooltip, Typography } from 'antd';
import React from 'react';

const LastActivityCell = ({ activity }: { activity: string }) => {
  return (
    <Tooltip title={activity?.length > 0 && activity}>
      <Typography.Text
        style={{ cursor: 'pointer' }}
        ellipsis={{ expanded: false }}
      >
        {activity ? activity : '-'}
      </Typography.Text>
    </Tooltip>
  );
};

export default LastActivityCell;
