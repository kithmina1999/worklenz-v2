import { Avatar, Tooltip } from 'antd';
import { AvatarNamesMap } from '../shared/constants';

const CustomAvatar = ({ avatarName }: { avatarName: string | null }) => {
  const avatarCharacter = avatarName?.[0].toUpperCase() || '';

  return (
    <Tooltip title={avatarName}>
      <Avatar
        style={{
          backgroundColor: AvatarNamesMap[avatarCharacter],
          verticalAlign: 'middle',
        }}
      >
        {avatarCharacter}
      </Avatar>
    </Tooltip>
  );
};

export default CustomAvatar;
