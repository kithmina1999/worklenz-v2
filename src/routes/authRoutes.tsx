// src/routes/authRoutes.tsx
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import AuthTransitionWrapper from '@components/authTransitionWrapper.tsx/authTransitionWrapper';

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        element: <AuthTransitionWrapper />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },
];

export default authRoutes;