import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { IRPTOverviewProjectTasksByPriority } from '@/types/reporting/reporting.types';

Chart.register(ArcElement, Tooltip);

const ProjectReportsPriorityGraph = ({
  values,
  loading,
}: {
  values: IRPTOverviewProjectTasksByPriority;
  loading: boolean;
}) => {
  // localization
  const { t } = useTranslation('reporting-projects-drawer');

  type PriorityGraphItemType = {
    name: string;
    color: string;
    count: number;
  };

  // chart data
  const chartData = {
    labels: values.chart.map(item => t(`${item.name}`)),
    datasets: [
      {
        label: t('tasksText'),
        data: values.chart.map(item => item.y),
        backgroundColor: values.chart.map(item => item.color),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Card
      loading={loading}
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          {t('tasksByPriorityText')}
        </Typography.Text>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-6 xl:flex-nowrap">
        <Doughnut
          data={chartData}
          options={options}
          className="max-h-[200px] w-full max-w-[200px]"
        />

        <div className="flex flex-row flex-wrap gap-3 xl:flex-col">
          {/* total tasks */}
          <Flex gap={4} align="center">
            <Badge color="#000" />
            <Typography.Text ellipsis>
              {t('allText')} ({values.all})
            </Typography.Text>
          </Flex>

          {/* priority-specific tasks */}
          {values.chart.map(item => (
            <Flex key={item.name} gap={4} align="center">
              <Badge color={item.color} />
              <Typography.Text ellipsis>
                {t(`${item.name}`)} ({item.y})
              </Typography.Text>
            </Flex>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectReportsPriorityGraph;
