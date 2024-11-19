import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Badge, Card, Flex, Typography } from 'antd';
import { ChartOptions } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const ProjectReportsStatusGraph = () => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
  };

  //   mock data
  const mockStatusData = {
    labels: ['To Do', 'Doing', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [6, 6, 8],
        backgroundColor: ['#a9a9a9', '#70a6f3', '#75c997'],
      },
    ],
  };

  return (
    <Card
      title={
        <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
          Tasks By Status
        </Typography.Text>
      }
    >
      <Flex gap={24} wrap="wrap" align="center" justify="center">
        <Doughnut
          options={options}
          data={mockStatusData}
          className="max-h-[200px] w-full max-w-[200px]"
        />

        <Flex
          gap={12}
          style={{ marginBlockStart: 12 }}
          wrap={'wrap'}
          className="flex-row xl:flex-col"
        >
          <Flex gap={8} align="center">
            <Badge color={'#000'} />
            <Typography.Text>All (20) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#a9a9a9'} />
            <Typography.Text>To Do (6) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#70a6f3'} />
            <Typography.Text>Doing (6) </Typography.Text>
          </Flex>
          <Flex gap={8} align="center">
            <Badge color={'#75c997'} />
            <Typography.Text>Done (8) </Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectReportsStatusGraph;
