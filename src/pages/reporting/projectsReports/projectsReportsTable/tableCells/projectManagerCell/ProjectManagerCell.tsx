import { Flex, Typography } from 'antd';
import React from 'react';
import CustomAvatar from '../../../../../../components/CustomAvatar';

type ProjectMangerCellProps = {
  manager: { avatar_url: string; name: string } | null;
};

const ProjectManagerCell = ({ manager }: ProjectMangerCellProps) => {
  return (
    <div>
      {manager ? (
        <Flex gap={8} align="center">
          {manager?.avatar_url ? (
            <img src={manager.avatar_url} alt={manager.name} />
          ) : (
            <CustomAvatar avatarName={manager.name} />
          )}

          <Typography.Text>{manager.name}</Typography.Text>
        </Flex>
      ) : (
        <Typography.Text>-</Typography.Text>
      )}
    </div>
  );
};

export default ProjectManagerCell;
