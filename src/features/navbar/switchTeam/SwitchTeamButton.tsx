import { BankOutlined, CaretDownFilled, CheckCircleFilled } from '@ant-design/icons';
import { Card, Dropdown, Flex, Tooltip, Typography } from 'antd';
import { colors } from '../../../styles/colors';
import { useTranslation } from 'react-i18next';
// custom css
import './switchTeam.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import CustomAvatar from '../../../components/CustomAvatar';
import { useAuth } from '@/hooks/useAuth';
import { RootState } from '@/app/store';
import { useEffect } from 'react';
import { initializeTeams } from '@/features/teams/teamSlice';

const SwitchTeamButton = () => {
  const { t } = useTranslation('navbar');
  const dispatch = useAppDispatch();

  const { teamsList, loading, error, initialized } = useAppSelector(
    (state: RootState) => state.teamReducer
  );
  const teamsDetails = useAppSelector(state => state.teamReducer.teamsList);
  const session = useAuth().getCurrentSession();

  // get the active team
  const isActiveTeam = (teamId: string | undefined) => {
    if (!teamId) return false;
    return (teamId = session?.team_id);
  };

  const selectTeam = (id: string | undefined) => {
    if (!id) return;
  };

  useEffect(() => {
    dispatch(initializeTeams());
  }, [dispatch]);
  
  // switch teams dropdown items
  const items = [
    ...teamsDetails.map(team => ({
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
          <Flex vertical gap={8}>
            <Flex gap={12} align="center" justify="space-between" style={{ padding: 12 }}>
              <Flex gap={8} align="center">
                <CustomAvatar avatarName={team.name} />
                <Flex vertical>
                  <Typography.Text
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      color: colors.lightGray,
                    }}
                  >
                    {/* Owned by {team.owner.split(' ')[0]} */}
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
          </Flex>
        </Card>
      ),
    })),
  ];

  return (
    <Tooltip title={t('switchTeamTooltip')} trigger={'hover'}>
      <Dropdown overlayClassName="switch-team-dropdown" menu={{ items }} trigger={['click']}>
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
          <Typography.Text strong style={{ color: colors.skyBlue }}>
            {session?.team_name}
          </Typography.Text>
          <CaretDownFilled />
        </Flex>
      </Dropdown>
    </Tooltip>
  );
};

export default SwitchTeamButton;
