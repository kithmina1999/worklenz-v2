import React, { ReactNode } from 'react';
import { colors } from '../../styles/colors';
import {
  CheckCircleTwoTone,
  ClockCircleOutlined,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
  StopOutlined,
} from '@ant-design/icons';
import { ProjectHealthStatus, ProjectStatus } from '../../types/project.types';

// color for project
export const projectColors: string[] = [
  '#164c9b',
  '#3b7ad4',
  '#70a6f3',
  '#7781ca',
  '#9877ca',
  '#c178c9',
  '#ee87c5',
  '#ca7881',
  '#75c9c0',
  '#75c997',
  '#80ca79',
  '#aacb78',
  '#cbbc78',
  '#cb9878',
  '#bb774c',
  '#905b39',
  '#903737',
  '#bf4949',
  '#f37070',
  '#ff9c3c',
  '#fbc84c',
  '#cbc8a1',
  '#a9a9a9',
  '#767676',
];

// data type for status data
type StatusDataType = {
  value: ProjectStatus;
  label: ReactNode;
  icon: ReactNode;
};
// status data for project
export const statusData: StatusDataType[] = [
  {
    value: 'cancelled',
    label: 'Cancelled',
    icon: React.createElement(CloseCircleTwoTone, {
      twoToneColor: colors.vibrantOrange,
      style: { fontSize: 16 },
    }),
  },
  {
    value: 'blocked',
    label: 'Blocked',
    icon: React.createElement(StopOutlined, { style: { fontSize: 16 } }),
  },
  {
    value: 'onHold',
    label: 'On Hold',
    icon: React.createElement(StopOutlined, { style: { fontSize: 16 } }),
  },
  {
    value: 'proposed',
    label: 'Proposed',
    icon: React.createElement(ClockCircleOutlined, {
      style: { fontSize: 16 },
    }),
  },
  {
    value: 'inPlanning',
    label: 'In Planning',
    icon: React.createElement(ClockCircleOutlined, {
      style: { fontSize: 16 },
    }),
  },
  {
    value: 'inProgress',
    label: 'In Progress',
    icon: React.createElement(ClockCircleTwoTone, {
      twoToneColor: colors.limeGreen,
      style: { fontSize: 16 },
    }),
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: React.createElement(CheckCircleTwoTone, {
      twoToneColor: colors.limeGreen,
      style: { fontSize: 16 },
    }),
  },
  {
    value: 'continuous',
    label: 'Continuous',
    icon: React.createElement(ClockCircleTwoTone, {
      twoToneColor: colors.limeGreen,
      style: { fontSize: 16 },
    }),
  },
];

// data type for health status data
type HealthStatusDataType = {
  value: ProjectHealthStatus;
  label: ReactNode;
  color: string;
};
// health status data for project
export const healthStatusData: HealthStatusDataType[] = [
  { value: 'notSet', label: 'Not Set', color: '#d1d0d3' },
  {
    value: 'needsAttention',
    label: 'Needs Attention',
    color: '#eed9a9',
  },
  { value: 'atRisk', label: 'At Risk', color: '#efb8bb' },
  { value: 'good', label: 'Good', color: '#bbddcb' },
];
