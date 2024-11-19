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
import { login, verifyAuth } from '@/features/auth/authSlice';
import logger from '@/utils/errorLogger';
import { setUser } from '@/features/user/userSlice';
import { createAuthService } from '@/services/auth/auth.service';

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('loginPage');
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const dispatch = useAppDispatch();
  const authService = createAuthService(navigate);

  // Get loading state from Redux store instead of local state
  const { isLoading } = useAppSelector(state => state.auth);
  useEffect(() => {
    const verifyAuthStatus = async () => {
      const result = await dispatch(verifyAuth()).unwrap();
      if(result.authenticated) {
        dispatch(setUser(result.user));
        authService.setCurrentSession(result.user);
        navigate('/worklenz/home');
      }
    };
    verifyAuthStatus();
  }, [dispatch]);
  
  const onFinish = useCallback(
    async (values: LoginFormValues) => {
      try {
        const result = await dispatch(login(values)).unwrap();
        if (result.authenticated) {
          message.success(t('loginSuccess'));
          authService.setCurrentSession(result.user);
          navigate('/worklenz/home');
        }
      } catch (error) {
        logger.error('LoginPage', error);
      }
    },
    [dispatch, navigate, t]
  );

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/secure/auth/google`;
  };

  return (
    <Card
      style={{ width: '100%', boxShadow: 'none' }}
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
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: t('emailRequired') }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('emailPlaceholder')}
            size="large"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('passwordRequired'), min: 8 }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('passwordPlaceholder')}
            size="large"
            style={{ borderRadius: 4 }}
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
              style={{ fontSize: 14 }}
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
              style={{ borderRadius: 4 }}
            >
              {t('loginButton')}
            </Button>
            <Typography.Text style={{ textAlign: 'center' }}>{t('orText')}</Typography.Text>
            <Button
              block
              type="default"
              size="large"
              onClick={handleGoogleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
            >
              <img src={googleIcon} alt="google icon" style={{ maxWidth: 20, marginRight: 8 }} />
              {t('signInWithGoogleButton')}
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Space>
            <Typography.Text style={{ fontSize: 14 }}>{t('dontHaveAccountText')}</Typography.Text>
            <Link
              to="/auth/signup"
              className="ant-typography ant-typography-link blue-link"
              style={{ fontSize: 14 }}
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