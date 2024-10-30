import { Avatar, Tooltip } from 'antd';
import React from 'react';
import { avatarNamesMap } from '../shared/constants';

const CustomAvatar = ({ avatarName }: { avatarName: string }) => {
  const avatarCharacter = avatarName[0].toUpperCase();

  return (
    <Tooltip title={avatarName}>
      <Avatar
        style={{
          backgroundColor: avatarNamesMap[avatarCharacter],
          verticalAlign: 'middle',
        }}
      >
        {avatarCharacter}
      </Avatar>
    </Tooltip>
  );
};

export default CustomAvatar;
