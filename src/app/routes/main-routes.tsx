import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Homepage from '@/pages/home/Homepage';
import ProjectList from '@/pages/projects/ProjectList';
import ProjectView from '@/pages/projects/projectView/ProjectView';
import settingsRoutes from './settings-routes';
import adminCenterRoutes from './admin-center-routes';
import Schedule from '@/pages/schedule/Schedule';

const mainRoutes: RouteObject[] = [
  {
    path: '/worklenz',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Homepage /> },
      { path: 'projects', element: <ProjectList /> },
      { path: 'schedule', element: <Schedule /> },
      { path: `projects/:projectId`, element: <ProjectView /> },
      ...settingsRoutes,
      ...adminCenterRoutes,
    ],
  },
];

export default mainRoutes;
