import { Typography } from 'antd';
import React from 'react';

const ProjectClientCell = ({ client }: { client: string }) => {
  return (
    <Typography.Text
      style={{ cursor: 'pointer' }}
      ellipsis={{ expanded: false }}
    >
      {client ? client : '-'}
    </Typography.Text>
  );
};

export default ProjectClientCell;
