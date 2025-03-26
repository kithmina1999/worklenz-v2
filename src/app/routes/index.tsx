import { createBrowserRouter, Navigate, RouteObject, useLocation } from 'react-router-dom';
import rootRoutes from './root-routes';
import authRoutes from './auth-routes';
import mainRoutes from './main-routes';
import notFoundRoute from './not-found-route';
import accountSetupRoute from './account-setup-routes';
import reportingRoutes from './reporting-routes';
import { useAuthService } from '@/hooks/useAuth';
import { AuthenticatedLayout } from '@/layouts/AuthenticatedLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFoundPage from '@/pages/404-page/404-page';

interface GuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: GuardProps) => {
  const isAuthenticated = useAuthService().isAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const AdminGuard = ({ children }: GuardProps) => {
  const isAuthenticated = useAuthService().isAuthenticated();
  const isOwnerOrAdmin = useAuthService().isOwnerOrAdmin();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isOwnerOrAdmin) {
    return <Navigate to="/worklenz/unauthorized" replace />;
  }

  return <>{children}</>;
};

export const SetupGuard = ({ children }: GuardProps) => {
  const isAuthenticated = useAuthService().isAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Helper to wrap routes with guards
const wrapRoutes = (
  routes: RouteObject[],
  Guard: React.ComponentType<{ children: React.ReactNode }>
): RouteObject[] => {
  return routes.map(route => {
    const wrappedRoute = {
      ...route,
      element: <Guard>{route.element}</Guard>,
    };

    if (route.children) {
      wrappedRoute.children = wrapRoutes(route.children, Guard);
    }

    if (route.index) {
      delete wrappedRoute.children;
    }

    return wrappedRoute;
  });
};

const publicRoutes = [...rootRoutes, ...authRoutes, notFoundRoute];
const protectedMainRoutes = wrapRoutes(mainRoutes, AuthGuard);
const adminRoutes = wrapRoutes(reportingRoutes, AdminGuard);
const setupRoutes = wrapRoutes([accountSetupRoute], SetupGuard);

const router = createBrowserRouter([
  {
    element: <ErrorBoundary><AuthenticatedLayout /></ErrorBoundary>,
    errorElement: <ErrorBoundary><NotFoundPage /></ErrorBoundary>,
    children: [
      ...protectedMainRoutes,
      ...adminRoutes,
      ...setupRoutes,
    ],
  },
  ...publicRoutes,
]);

export default router;
