import { Avatar } from 'antd';
import React from 'react';
import { avatarNamesMap } from '../shared/constants';

const CustomAvatar = ({ avatarCharacter }: { avatarCharacter: string }) => {
  return (
    <Avatar
      style={{
        backgroundColor: avatarNamesMap[avatarCharacter.toUpperCase()],
        verticalAlign: 'middle',
      }}
    >
      {avatarCharacter.toUpperCase()}
    </Avatar>
  );
};

export default CustomAvatar;
