import { RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/home/home-page';
import ProjectList from '@/pages/projects/project-list';
import ProjectView from '@/pages/projects/project-view/project-view';
import settingsRoutes from './settings-routes';
import adminCenterRoutes from './admin-center-routes';
import Schedule from '@/pages/schedule/Schedule';

const mainRoutes: RouteObject[] = [
  {
    path: '/worklenz',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'projects', element: <ProjectList /> },
      { path: 'schedule', element: <Schedule /> },
      { path: `projects/:projectId`, element: <ProjectView /> },
      ...settingsRoutes,
      ...adminCenterRoutes,
    ],
  },
];

export default mainRoutes;
