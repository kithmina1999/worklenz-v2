import { ExpandAltOutlined } from '@ant-design/icons';
import { Badge, Button, Flex, Space, Typography } from 'antd';
import React from 'react';
import { colors } from '../../../../../../styles/colors';

type ProjectCellProps = {
  projectId: string;
  project: string;
  projectColor: string;
  hoverRow: string;
};

const ProjectCell = ({
  projectId,
  project,
  projectColor,
  hoverRow,
}: ProjectCellProps) => {
  return (
    <Flex gap={16} align="center" justify="space-between">
      <Space>
        <Badge color={projectColor} />
        <Typography.Text style={{ width: 160 }} ellipsis={{ expanded: false }}>
          {project}
        </Typography.Text>
      </Space>

      {hoverRow === projectId && (
        <Button
          type="text"
          icon={<ExpandAltOutlined />}
          onClick={() => {
            // setSelectedTaskId(projectId);
          }}
          style={{
            backgroundColor: colors.transparent,
            padding: 0,
            height: 22,
          }}
        >
          Open
        </Button>
      )}
    </Flex>
  );
};

export default ProjectCell;
