import { ColumnsType } from 'antd/es/table';
import { Avatar, Badge, Button, Progress, Rate, Tag, Tooltip } from 'antd';
import { CalendarOutlined, InboxOutlined, SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './TableColumns.css';
import { useNavigate } from 'react-router-dom';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { formatDate } from '@/utils/timeUtils';

const avatarColors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#87d068'];

const TableColumns = (): ColumnsType<IProjectViewModel> => {
  const { t } = useTranslation('allProjectList');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTaskProgressTitle = (data: IProjectViewModel) => {
    if (!data.all_tasks_count) return 'No tasks available.';
    if (data.all_tasks_count == data.completed_tasks_count) return 'All tasks completed.';
    return `${data.completed_tasks_count || 0}/${data.all_tasks_count || 0} tasks completed.`;
  };

  const markAsFavorite = async (id: string) => {
    // await dispatch(markAsFavorite(id));
  };

  return [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      showSorterTooltip: false,
      sorter: true,
      render: (text, record) => {
        // Format the start and end dates
        const formattedStartDate = record.start_date
          ? new Date(record.start_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'N/A';

        const formattedEndDate = record.end_date
          ? new Date(record.end_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'N/A';

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Rate
              value={record.favorite ? 1 : 0}
              onChange={() => record.id && markAsFavorite(record.id)}
              count={1}
              style={{ marginRight: '0.5rem' }}
              tooltips={['Add to favourites']}
            />
            <Badge color="geekblue" style={{ marginRight: '0.5rem' }} />
            <span
              onClick={() => navigate(`/worklenz/projects/${record.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {text}
              {(record.start_date || record.end_date) && (
                <Tooltip
                  title={`Start date: ${formattedStartDate}\nEnd date: ${formattedEndDate}`}
                  overlayStyle={{ width: '200px' }}
                >
                  <CalendarOutlined style={{ marginLeft: '0.5rem' }} />
                </Tooltip>
              )}
            </span>
          </div>
        );
      },
    },
    {
      title: t('client'),
      dataIndex: 'client_name',
      key: 'client_name',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t('category'),
      dataIndex: 'category',
      key: 'category_id',
      render: (category, record) =>
        record.category_name === '-' ? (
          <>{record.category_name}</>
        ) : (
          <Tooltip title={`Click to filter by "${record.category_name}"`}>
            <Tag color="#ff9c3c" style={{ borderRadius: '50rem' }} className="table-tag">
              {record.category_name}
            </Tag>
          </Tooltip>
        ),
      sorter: true,
      showSorterTooltip: false,
      filters: [
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
      onFilter: (value, record) => record.category_name?.startsWith(value as string) || false,
    },
    {
      title: t('status'),
      key: 'status_id',
      dataIndex: 'status',
      sorter: true,
      showSorterTooltip: false,
      filters: [
        {
          text: 'Cancelled',
          value: 'Cancelled',
        },
        {
          text: 'Blocked',
          value: 'Blocked',
        },
        {
          text: 'On Hold',
          value: 'On Hold',
        },
        {
          text: 'Proposed',
          value: 'Proposed',
        },
        {
          text: 'In Planning',
          value: 'In Planning',
        },
        {
          text: 'In Progress',
          value: 'In Progress',
        },
        {
          text: 'Completed',
          value: 'Completed',
        },
        {
          text: 'Continous',
          value: 'Continous',
        },
      ],
      onFilter: (value, record) => record.status?.startsWith(value as string) || false,
    },
    {
      title: t('tasksProgress'),
      key: 'tasksProgress',
      dataIndex: 'tasksProgress',
      render: (text, record) => {
        return (
          <Tooltip title={getTaskProgressTitle(record)}>
            <Progress percent={record.progress} className="project-progress" />
          </Tooltip>
        );
      },
    },
    {
      title: t('updated_at'),
      key: 'updated_at',
      dataIndex: 'updated_at',
      showSorterTooltip: false,
      sorter: true,
      render: (date: Date, record) => {
        return (
          <Tooltip title={formatDate(date)} placement="topLeft" mouseEnterDelay={0.5}>
            {record.updated_at_string}
          </Tooltip>
        );
      },
    },
    {
      title: t('members'),
      key: 'members',
      dataIndex: 'members',
      render: (members: string[]) => (
        <Avatar.Group>
          {members?.map((member, index) => (
            <Tooltip key={index} title={member}>
              <Avatar
                style={{
                  backgroundColor: avatarColors[index % avatarColors.length],
                  width: '28px',
                  height: '28px',
                  border: 'none',
                }}
              >
                {member.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: '',
      key: 'button',
      dataIndex: '',
      render: () => (
        <div>
          <Tooltip title={t('setting')}>
            <Button style={{ marginRight: '8px' }} size="small">
              <SettingOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={t('archive')}>
            <Button size="small">
              <InboxOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
};

export default TableColumns;
