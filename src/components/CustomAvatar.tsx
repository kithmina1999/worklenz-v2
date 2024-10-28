import { Avatar } from 'antd';
import React from 'react';
import { avatarNamesMap } from '../shared/constants';

const CustomAvatar = ({ avatarCharacter }: { avatarCharacter: string }) => {
  return (
    <Avatar
      style={{
        backgroundColor: avatarNamesMap[avatarCharacter],
        verticalAlign: 'middle',
      }}
    >
      {avatarCharacter}
    </Avatar>
  );
};

export default CustomAvatar;
