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
            <img
              src={manager.avatar_url}
              alt={manager.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <CustomAvatar avatarName={manager.name} />
          )}

          <Typography.Text className="group-hover:text-[#1890ff]">
            {manager.name}
          </Typography.Text>
        </Flex>
      ) : (
        <Typography.Text className="group-hover:text-[#1890ff]">
          -
        </Typography.Text>
      )}
    </div>
  );
};

export default ProjectManagerCell;
