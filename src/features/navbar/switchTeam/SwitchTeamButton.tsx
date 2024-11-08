import { BankOutlined, CaretDownFilled, CheckCircleFilled } from '@ant-design/icons';
import { Card, Divider, Dropdown, Flex, Tooltip, Typography } from 'antd';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';
// custom css
import './switchTeam.css';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import CustomAvatar from '@/components/CustomAvatar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { fetchTeams, setActiveTeam } from '@/features/teams/teamSlice';
import { ITeamGetResponse } from '@/types/teams/team.type';

const SwitchTeamButton = () => {
  const { t } = useTranslation('navbar');
  const dispatch = useAppDispatch();
  const [teamsDetails, setTeamsDetails] = useState<ITeamGetResponse[]>([]);

  const session = useAuth().getCurrentSession();

  // get the active team
  const isActiveTeam = (teamId: string | undefined) => {
    if (!teamId) return false;
    return (teamId == session?.team_id);
  };

  const selectTeam = async (id: string | undefined) => {
    if (!id) return;
    await dispatch(setActiveTeam(id));
    window.location.reload();
  };

  const getTeams = async () => {
    const teams = await dispatch(fetchTeams()).unwrap();
    setTeamsDetails(teams);
  };

  useEffect(() => {
    getTeams();
  }, [dispatch]);
  
  // switch teams dropdown items
  const items = [
    ...teamsDetails?.map((team, index) => ({
      key: team.id,
      label: (
        <Card
          className="switch-team-card"
          onClick={() => selectTeam(team.id)}
          bordered={false}
          style={{
            width: 230,
          }}
        >
          <Flex vertical>
            <Flex gap={12} align="center" justify="space-between" style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 4, paddingBottom: 4 }}>
              <Flex gap={8} align="center">
                <CustomAvatar avatarName={team.name} />
                <Flex vertical>
                  <Typography.Text
                    style={{
                      fontSize: 11,
                      fontWeight: 300,
                    }}
                  >
                    Owned by {team.owns_by}
                  </Typography.Text>
                  <Typography.Text>{team.name}</Typography.Text>
                </Flex>
              </Flex>
              <CheckCircleFilled
                style={{
                  fontSize: 16,
                  color: isActiveTeam(team.id) ? colors.limeGreen : colors.lightGray,
                }}
              />
            </Flex>
            {index < teamsDetails.length - 1 && <Divider style={{ margin: 0 }} />}
          </Flex>
        </Card>
      ),
    })),
  ];

  return (
    <Tooltip title={t('switchTeamTooltip')} trigger={'hover'}>
      <Dropdown overlayClassName="switch-team-dropdown" menu={{ items }} trigger={['click']} placement="bottomRight" style={{ cursor: 'pointer' }}>
        <Flex
          gap={12}
          align="center"
          justify="center"
          style={{
            color: colors.skyBlue,
            backgroundColor: colors.paleBlue,
            fontWeight: 500,
            borderRadius: '50rem',
            padding: '10px 16px',
            height: '39px',
          }}
        >
          <BankOutlined />
          <Typography.Text strong style={{ color: colors.skyBlue, cursor: 'pointer' }}>
            {session?.team_name}
          </Typography.Text>
          <CaretDownFilled />
        </Flex>
      </Dropdown>
    </Tooltip>
  );
};

export default SwitchTeamButton;
