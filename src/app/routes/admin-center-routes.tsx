import { RouteObject } from 'react-router-dom';
import AdminCenterLayout from '@/layouts/AdminCenterLayout';
import { adminCenterItems } from '@/pages/adminCenter/adminCenterConstants';

const adminCenterRoutes: RouteObject[] = [
  {
    path: 'admin-center',
    element: <AdminCenterLayout />,
    children: adminCenterItems.map((item) => ({
      path: item.endpoint,
      element: item.element,
    })),
  },
];

export default adminCenterRoutes;
