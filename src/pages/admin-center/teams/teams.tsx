import { DeleteOutlined, SearchOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-components';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Input,
  Popconfirm,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { deleteTeam, toggleDrawer, toggleSettingDrawer } from '@features/teams/teamSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import CreateTeamDrawer from '@features/adminCenter/teams/CreateTeamDrawer';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/app/store';
import { IOrganizationTeam } from '@/types/admin-center/admin-center.types';
import './teams.css';
import SettingTeamDrawer from '@features/adminCenter/teams/SettingTeamDrawer';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import TeamsTable from '@/components/admin-center/teams/teams-table/teams-table';
import {
  adminCenterApiService,
  IOrganizationTeamRequestParams,
} from '@/api/admin-center/admin-center.api.service';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants';
import logger from '@/utils/errorLogger';
import { useAuthService } from '@/hooks/useAuth';

const Teams: React.FC = () => {
  const themeMode = useAppSelector((state: RootState) => state.themeReducer.mode);
  const [teams, setTeams] = useState<IOrganizationTeam[]>([]);
  const [currentTeam, setCurrentTeam] = useState<IOrganizationTeam | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const [requestParams, setRequestParams] = useState({
    total: 0,
    index: 1,
    size: DEFAULT_PAGE_SIZE,
    field: 'name',
    order: 'desc',
    search: '',
  });
  const { t } = useTranslation('teams');
  const currentSession = useAuthService().getCurrentSession();

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const res = await adminCenterApiService.getOrganizationTeams(requestParams);
      if (res.done) {
        setRequestParams(prev => ({ ...prev, total: res.body.total ?? 0 }));
        const mergedTeams = [...(res.body.data ?? [])];
        if (res.body.current_team_data) {
          mergedTeams.unshift(res.body.current_team_data);
        }
        setTeams(mergedTeams);
        setCurrentTeam(res.body.current_team_data ?? null);
      }
    } catch (error) {
      logger.error('Error fetching teams', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [requestParams.search]);

  return (
    <div style={{ width: '100%' }}>
      <PageHeader title={<span>{t('title')}</span>} style={{ padding: '16px 0' }} />
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingTop: 0,
          paddingRight: '24px',
          paddingBottom: '16px',
        }}
        subTitle={
          <span
            style={{
              color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
              fontWeight: 500,
              fontSize: '16px',
            }}
          >
            {requestParams.total} {t('subtitle')}
          </span>
        }
        extra={
          <Flex gap={8} align="center">
            <Tooltip title={t('tooltip')}>
              <Button
                shape="circle"
                icon={<SyncOutlined spin={isLoading} />}
                onClick={() => fetchTeams()}
              />
            </Tooltip>
            <Input
              placeholder={t('placeholder')}
              suffix={<SearchOutlined />}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={() => dispatch(toggleDrawer())}>
              {t('addTeam')}
            </Button>
            <CreateTeamDrawer />
          </Flex>
        }
      />

      <TeamsTable teams={teams} currentTeam={currentTeam} t={t} loading={isLoading} />
    </div>
  );
};

export default Teams;
