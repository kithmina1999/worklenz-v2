import React, { useCallback, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input, message, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import PageHeader from '@components/AuthPageHeader';
import googleIcon from '@assets/images/google-icon.png';
import { login, verifyAuthentication } from '@/features/auth/authSlice';
import logger from '@/utils/errorLogger';
import { setUser } from '@/features/user/userSlice';
import { useAuth } from '@/hooks/useAuth';
import { Rule } from 'antd/es/form';
import { setSession } from '@/utils/session-helper';

// Types
interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation('loginPage');
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const dispatch = useAppDispatch();
  const authService = useAuth();
  const { isLoading } = useAppSelector(state => state.auth);

  // Form validation rules
  const validationRules = {
    email: [{ required: true, type: 'email', message: t('emailRequired') }],
    password: [{ required: true, message: t('passwordRequired'), min: 8 }]
  };

  // Effects
  useEffect(() => {
    const verifyAuthStatus = async () => {
      try {
        const session = await dispatch((verifyAuthentication())).unwrap();
        console.log('session', session);
        if (session && session.authenticated) {
          setSession(session.user);
          dispatch(setUser(session.user));
          navigate('/worklenz/home');
        }
      } catch (error) {
        logger.error('Verify Auth Status', error);
      }
    };
    verifyAuthStatus();
  }, [dispatch, navigate, authService]);

  // Handlers
  const onFinish = useCallback(
    async (values: LoginFormValues) => {
      try {
        const result = await dispatch(login(values)).unwrap();
        if (result.authenticated) {
          message.success(t('loginSuccess'));
          setSession(result.user);
          dispatch(setUser(result.user));
          navigate('/auth/authenticating');
        }
      } catch (error) {
        logger.error('LoginPage', error);
      }
    },
    [dispatch, navigate, t, authService]
  );

  const handleGoogleLogin = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/secure/google`;
    } catch (error) {
      message.error('Failed to redirect to Google sign up');
    }
  };

  // Styles
  const cardStyles = {
    width: '100%',
    boxShadow: 'none'
  };

  const buttonStyles = {
    borderRadius: 4
  };

  const googleButtonStyles = {
    ...buttonStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const linkStyles = {
    fontSize: 14
  };

  return (
    <Card
      style={cardStyles}
      styles={{ body: { paddingInline: isMobile ? 24 : 48 } }}
      bordered={false}
    >
      <PageHeader description={t('headerDescription')} />
      
      <Form
        name="login"
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
        <Form.Item name="email" rules={validationRules.email as Rule[]}>
          <Input
            prefix={<UserOutlined />}
            placeholder={t('emailPlaceholder')}
            size="large"
            style={buttonStyles}
          />
        </Form.Item>

        <Form.Item name="password" rules={validationRules.password}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('passwordPlaceholder')}
            size="large"
            style={buttonStyles}
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t('rememberMe')}</Checkbox>
            </Form.Item>
            <Link
              to="/auth/forgot-password"
              className="ant-typography ant-typography-link blue-link"
              style={linkStyles}
            >
              {t('forgotPasswordButton')}
            </Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Flex vertical gap={8}>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              style={buttonStyles}
            >
              {t('loginButton')}
            </Button>
            
            <Typography.Text style={{ textAlign: 'center' }}>
              {t('orText')}
            </Typography.Text>
            
            <Button
              block
              type="default"
              size="large"
              onClick={handleGoogleLogin}
              style={googleButtonStyles}
            >
              <img 
                src={googleIcon} 
                alt="google icon" 
                style={{ maxWidth: 20, marginRight: 8 }} 
              />
              {t('signInWithGoogleButton')}
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Space>
            <Typography.Text style={linkStyles}>
              {t('dontHaveAccountText')}
            </Typography.Text>
            <Link
              to="/auth/signup"
              className="ant-typography ant-typography-link blue-link"
              style={linkStyles}
            >
              {t('signupButton')}
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;