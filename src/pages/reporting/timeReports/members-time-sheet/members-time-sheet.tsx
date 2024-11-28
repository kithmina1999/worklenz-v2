import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsonData from './members-time-sheet.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
const MembersTimeSheet: React.FC = () => {
  const labels = jsonData.map((item) => item.name);
  const dataValues = jsonData.map((item) => (item.logged_time / 3600).toFixed(2)); // Convert seconds to hours
  const colors = jsonData.map((item) => item.color_code);

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: 'Logged Time (hours)',
        data: dataValues,
        backgroundColor: colors,
        barThickness: 40,
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: 'white',
        anchor: 'start' as const,
        align: 'right' as const,
        offset: 20,
        textStrokeColor: 'black',
        textStrokeWidth: 4,
      },
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    backgroundColor: 'black',
    indexAxis: 'y' as const,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Logged Time(hours)',
          align: 'end' as const,
          font: {
            family: 'Helvetica',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Member',
          align: 'end' as const,
          font: {
            family: 'Helvetica',
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          maxWidth: 'calc(100vw - 220px)',
          minWidth: 'calc(100vw - 260px)',
          height: 'calc(100vh - 300px)',
          overflow: 'auto',
        }}
      >
        <Bar data={data} options={options} width={1597} height={505} />
      </div>
    </div>
  );
};

export default MembersTimeSheet;
