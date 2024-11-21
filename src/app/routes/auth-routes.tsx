import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/login-page';
import SignupPage from '@/pages/auth/signup-page';
import ForgotPasswordPage from '@/pages/auth/forgot-password-page';
import LoggingOutPage from '@/pages/auth/logging-out';
import AuthenticatingPage from '@/pages/auth/authenticating';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'logging-out', element: <LoggingOutPage /> },
      { path: 'authenticating', element: <AuthenticatingPage /> },
    ],
  },
];

export default authRoutes;