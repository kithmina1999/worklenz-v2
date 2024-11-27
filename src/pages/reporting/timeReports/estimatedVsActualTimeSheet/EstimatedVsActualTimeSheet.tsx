import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsonData from './EstimatedVsActualTimeSheet.json';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
const EstimatedVsActualTimeSheet = () => {
  const labels = jsonData.map((item) => item.name);
  const actualDays = jsonData.map((item) => item.value); // Convert seconds to hours
  const estimatedDays = jsonData.map((item) => item.estimated_value);

  const themeMode = useAppSelector((state) => state.themeReducer.mode);
  const {t} = useTranslation('timeReport')

  // Chart data
  const data = {
    labels,
    datasets: [
      {
        label: t('estimatedDays'),
        data: estimatedDays,
        backgroundColor: '#A5AAD9',
        barThickness: 50,
      },
      {
        label: t('actualDays'),
        data: actualDays,
        backgroundColor: '#c191cc',
        barThickness: 50,
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
        align: 'start' as const,
        offset: -30,
        borderColor: '#000',
        textStrokeColor: 'black',
        textStrokeWidth: 4,
      },
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    backgroundColor: 'black',
    indexAxis: 'x' as const,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: t('projects'),
          align: 'end' as const,
          font: {
            family: 'Helvetica',
          },
        },
        grid: {
          color: themeMode === 'dark' ? '#2c2f38' : '#e5e5e5',
          lineWidth: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: t('days'),
          align: 'end' as const,
          font: {
            family: 'Helvetica',
          },
        },
        grid: {
          color: themeMode === 'dark' ? '#2c2f38' : '#e5e5e5',
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          minWidth: 'calc(100vw - 260px)',
          height: 'calc(100vh - 300px)',
          width: `${120 * data.labels.length}px`,
        }}
      >
        <Bar data={data} options={options}/>
      </div>
    </div>
  );
};

export default EstimatedVsActualTimeSheet;
