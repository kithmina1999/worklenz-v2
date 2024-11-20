import { createBrowserRouter } from 'react-router-dom';
import rootRoutes from './root-routes';
import authRoutes from './auth-routes';
import mainRoutes from './main-routes';
import notFoundRoute from './not-found-route';
import accountSetupRoute from './account-setup-routes';
import reportingRoutes from './reporting-routes';

const router = createBrowserRouter([
  ...rootRoutes,
  ...authRoutes,
  ...mainRoutes,
  ...reportingRoutes,
  notFoundRoute,
  accountSetupRoute,
]);

export default router;
