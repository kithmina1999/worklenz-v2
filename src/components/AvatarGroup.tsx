import React from 'react';
import { Avatar, Badge, Tooltip } from 'antd';

interface INameItem {
  name: string;
  color_code: string;
  avatar_url?: string;
  end?: boolean;
  names?: string;
}

interface IAvatarGroupProps {
  names?: INameItem[];
  showDot?: boolean;
  avatarClass?: string;
}

const AvatarGroup: React.FC<IAvatarGroupProps> = ({
  names = [],
  showDot = false,
  avatarClass = '',
}) => {
  const getFirstChar = (str: string): string => {
    return str ? str.charAt(0).toUpperCase() : '';
  };

  const renderAvatar = (item: INameItem): React.ReactElement => (
    <Tooltip title={item.end && item.names ? item.names : item.name} placement="top">
      <Avatar
        size={28}
        className={avatarClass}
        style={{
          backgroundColor: item.avatar_url ? '#ececec' : item.color_code,
        }}
        src={item.avatar_url}
      >
        {item.end ? item.name : getFirstChar(item.name)}
      </Avatar>
    </Tooltip>
  );

  return (
    <Avatar.Group>
      {names.map((item, index) => (
        <React.Fragment key={index}>
          {showDot ? (
            <Badge
              dot
              offset={[-4, 24]}
              style={{
                background: '#52c41a',
                border: '4px solid #52c41a',
              }}
            >
              {renderAvatar(item)}
            </Badge>
          ) : (
            renderAvatar(item)
          )}
        </React.Fragment>
      ))}
    </Avatar.Group>
  );
};

export default AvatarGroup;
