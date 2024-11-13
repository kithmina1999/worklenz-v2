import { createBrowserRouter } from 'react-router-dom';
import rootRoutes from './rootRoutes';
import authRoutes from './authRoutes';
import mainRoutes from './mainRoutes';
import notFoundRoute from './notFoundRoute';
import accountSetupRoute from './accountSetupRoutes';
import reportingRoutes from './reportingRoutes';

const router = createBrowserRouter([
  ...rootRoutes,
  ...authRoutes,
  ...mainRoutes,
  ...reportingRoutes,
  notFoundRoute,
  accountSetupRoute,
]);

export default router;
