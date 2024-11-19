import { TaskStatusType } from '../types/task.types';

type ThemeMode = 'default' | 'dark';

const statusColors = {
  default: {
    todo: '#d8d7d8',
    doing: '#c0d5f6',
    done: '#c2e4d0',
  },
  dark: {
    todo: '#a9a9a9',
    doing: '#70a6f3',
    done: '#75c997',
  },
};

export const getStatusColor = (
  status: string,
  themeMode: ThemeMode
): string => {
  const colors = statusColors[themeMode];
  return colors[status as TaskStatusType];
};
