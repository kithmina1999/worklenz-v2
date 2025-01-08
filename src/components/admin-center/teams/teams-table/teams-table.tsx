import Avatars from '@/components/avatars/avatars';
import SettingTeamDrawer from '@/features/adminCenter/teams/SettingTeamDrawer';
import { toggleSettingDrawer, deleteTeam } from '@/features/teams/teamSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IOrganizationTeam } from '@/types/admin-center/admin-center.types';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Popconfirm, Table, TableProps, Tooltip, Typography } from 'antd';
import { TFunction } from 'i18next';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface TeamsTableProps {
  teams: IOrganizationTeam[];
  currentTeam: IOrganizationTeam | null;
  t: TFunction;
  loading: boolean;
}

const TeamsTable: React.FC<TeamsTableProps> = ({ teams, currentTeam = null, t, loading }) => {
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery({ query: '(min-width: 1000px)' });

  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const columns: TableProps['columns'] = [
    {
      title: t('team'),
      key: 'teamName',
      render: (record: IOrganizationTeam) => (
        <Typography.Text style={{ fontSize: `${isTablet ? '14px' : '10px'}` }}>
          <Badge status={currentTeam?.id === record.id ? 'success' : 'default'} style={{ marginRight: '8px' }} />
          {record.name}
        </Typography.Text>
      ),
    },
    {
      title: <span style={{ display: 'flex', justifyContent: 'center' }}>{t('membersCount')}</span>,
      key: 'membersCount',
      render: (record: IOrganizationTeam) => (
        <Typography.Text
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: `${isTablet ? '14px' : '10px'}`,
          }}
        >
          {record.members_count}
        </Typography.Text>
      ),
    },
    {
      title: t('members'),
      key: 'members',
      render: (record: IOrganizationTeam) => (
        <span>
          <Avatars members={record.names} />
        </span>
      ),
    },
    {
      title: '',
      key: 'button',
      render: (record: IOrganizationTeam) => (
        <div className="row-buttons">
          <Tooltip title={t('settings')}>
            <Button
              style={{ marginRight: '8px' }}
              size="small"
              onClick={() => {
                setSelectedTeam(record.id || '');
                dispatch(toggleSettingDrawer());
              }}
            >
              <SettingOutlined />
            </Button>
          </Tooltip>
          <SettingTeamDrawer teamId={selectedTeam} />

          <Tooltip title={t('delete')}>
            <Popconfirm title={t('popTitle')} onConfirm={() => dispatch(deleteTeam(record.id || ''))}>
              <Button size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <Table
        rowClassName="team-table-row"
        className="team-table"
        columns={columns}
        dataSource={teams}
        rowKey={record => record.id}
        loading={loading}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 20,
          pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
          size: 'small',
        }}
      />
    </Card>
  );
};

export default TeamsTable;
