import { Flex, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colors';
import { TableProps } from 'antd/lib';
import { simpleDateFormat } from '@/utils/simpleDateFormat';
import { durationDateFormat } from '@/utils/durationDateFormat';
import { getStatusColor } from '@/utils/getStatusColor';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IInsightTasks } from '@/types/project/projectInsights.types';
import { projectInsightsApiService } from '@/api/projects/insights/project-insights.api.service';
import logger from '@/utils/errorLogger';
import { mockTaskData } from '../../mockData/mockTaskData';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';

const LastUpdatedTasks = ({ includeArchivedTasks, projectId }: { includeArchivedTasks: boolean, projectId: string  }) => {
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  const [data, setData] = useState<IInsightTasks[]>([]);
  const [loading, setLoading] = useState(false);

  const getLastUpdatedTasks = async () => {
    setLoading(true);
    try {
      const res = await projectInsightsApiService.getLastUpdatedTasks(projectId, includeArchivedTasks);
      if (res.done ) {
        setData(res.body);
      }
    } catch (error) {
      logger.error('getLastUpdatedTasks', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLastUpdatedTasks();
  }, [projectId, includeArchivedTasks]);

  // table columns
  const columns: TableProps['columns'] = [
    {
      key: 'name',
      title: 'Name',
      render: (record: IInsightTasks) => (
        <Typography.Text ellipsis={{ expanded: false }}>
          {record.name}
        </Typography.Text>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (record: IInsightTasks) => (
        <Flex
          gap={4}
          style={{
            width: 'fit-content',
            borderRadius: 24,
            paddingInline: 6,
            backgroundColor: record.status_color,
            color: colors.darkGray,
            cursor: 'pointer',
          }}
        >
          <Typography.Text
            ellipsis={{ expanded: false }}
            style={{
              color: colors.darkGray,
              fontSize: 13,
            }}
          >
            {record.status}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'dueDate',
      title: 'Due Date',
      render: (record: IInsightTasks) => (
        <Typography.Text>
          {record.end_date ? simpleDateFormat(record.end_date) : 'N/A'}
        </Typography.Text>
      ),
    },
    {
      key: 'lastUpdated',
      title: 'Last Updated',
      render: (record: IInsightTasks) => (
        <Typography.Text>
          {record.updated_at ? calculateTimeAgo(record.updated_at) : 'N/A'}
        </Typography.Text>
      ),
    },
  ];

  const dataSource = data.map((record) => ({
    ...record,
    key: record.id,
  }));

  return (
    <Table
      className="custom-two-colors-row-table"
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: 20,
      }}
      onRow={() => {
        return {
          style: {
            cursor: 'pointer',
            height: 36,
          },
        };
      }}
    />
  );
};

export default LastUpdatedTasks;
