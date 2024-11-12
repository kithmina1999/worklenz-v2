import { InlineMember } from '@/types/teamMembers/inlineMember.types';
import { Avatar, Tooltip } from 'antd';

interface AvatarsProps {
  members: InlineMember[];
  maxCount?: number;
}

const Avatars: React.FC<AvatarsProps> = ({ members }) => {
  return (
    <Avatar.Group>
      {members.map((member, index) => (
        <Tooltip key={member.team_member_id || index} title={member.end && member.names ? member.names.join(', ') : member.name}>
          {member.avatar_url ? (
            <Avatar src={member.avatar_url} size={28} />
          ) : (
            <Avatar
              size={28}
              style={{
                backgroundColor: member.color_code || '#ececec',
                fontSize: '14px',
              }}
            >
              {member.end && member.names ? member.name : member.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Tooltip>
      ))}
    </Avatar.Group>
  );
};

export default Avatars;
