import { Flex, Typography } from 'antd';
import React from 'react';
import CustomAvatar from '../../../../../../components/CustomAvatar';

type ProjectMangerCellProps = {
  member: { avatar_url: string; name: string } | null;
};

const MemberCell = ({ member }: ProjectMangerCellProps) => {
  return (
    <div>
      {member ? (
        <Flex gap={8} align="center">
          {member?.avatar_url ? (
            <img
              src={member.avatar_url}
              alt={member.name}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <CustomAvatar avatarName={member.name} />
          )}

          <Typography.Text className="group-hover:text-[#1890ff]">
            {member.name}
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

export default MemberCell;
