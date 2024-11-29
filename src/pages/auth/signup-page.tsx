import { useEffect, useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Space, Typography, message } from 'antd';
import googleIcon from '../../assets/images/google-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/AuthPageHeader';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { authApiService } from '@/api/auth/auth.api.service';
import { IUserSignUpRequest } from '@/types/auth/signup.types';

const SignupPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('signupPage');
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [urlParams, setUrlParams] = useState({
    email: '',
    name: '', 
    teamId: '',
    teamMemberId: '',
    projectId: ''
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setUrlParams({
      email: searchParams.get('email') || '',
      name: searchParams.get('name') || '',
      teamId: searchParams.get('team') || '',
      teamMemberId: searchParams.get('user') || '',
      projectId: searchParams.get('project') || ''
    });
  }, []);

  const getInvitationQueryParams = () => {
    const { teamId, teamMemberId, projectId } = urlParams;
    const params = [];
    if (teamId) params.push(`team=${teamId}`);
    if (teamMemberId) params.push(`teamMember=${teamMemberId}`);
    if (projectId) params.push(`project=${projectId}`);
    return params.length ? `?${params.join('&')}` : '';
  };

  const onFinish = async (values: IUserSignUpRequest) => {
    try {
      setValidating(true);
      const body: IUserSignUpRequest = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await authApiService.signUpCheck(body);
      if (res.done) {
        await signUpWithEmail(body);
        const response = await authApiService.verify();
        if (response.authenticated) {
          message.success('Successfully signed up!');
          navigate('/worklenz/setup');
        }
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Failed to validate signup details');
    } finally {
      setValidating(false);
    }
  };

  const signUpWithEmail = async (body: IUserSignUpRequest) => {
    try {
      setLoading(true);
      const response = await authApiService.signUp({
        ...body,
        team_id: urlParams.teamId,
        team_member_id: urlParams.teamMemberId,
        project_id: urlParams.projectId
      });
      
      if (response.done) {
        message.success('Successfully signed up!');
        navigate('/auth/login');
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignUpClick = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/secure/google${getInvitationQueryParams()}`;
    } catch (error) {
      message.error('Failed to redirect to Google sign up');
    }
  };

  return (
    <Card
      style={{
        width: '100%',
        boxShadow: 'none',
      }}
      styles={{
        body: {
          paddingInline: isMobile ? 24 : 48,
        },
      }}
      bordered={false}
    >
      <PageHeader description={t('headerDescription')} />
      <Form
        name="signup"
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
        <Form.Item
          name="name"
          label={t('nameLabel')}
          rules={[
            {
              required: true,
              message: t('nameRequired'),
              whitespace: true,
            },
            {
              min: 4,
              message: t('nameMinCharacterRequired'),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('namePlaceholder')}
            size="large"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('emailLabel')}
          rules={[
            {
              required: true,
              type: 'email',
              message: t('emailRequired'),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder={t('emailPlaceholder')}
            size="large"
            style={{ borderRadius: 4 }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={t('passwordLabel')}
          rules={[
            {
              required: true,
              message: t('passwordRequired'),
            },
            {
              min: 8,
              message: t('passwordMinCharacterRequired'),
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
              message: t('passwordPatternRequired'),
            },
          ]}
        >
          <div>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('strongPasswordPlaceholder')}
              size="large"
              style={{ borderRadius: 4 }}
            />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {t('passwordValidationAltText')}
            </Typography.Text>
          </div>
        </Form.Item>

        <Form.Item>
          <Typography.Paragraph style={{ fontSize: 14 }}>
            {t('bySigningUpText')}
            <Link to="/privacy-policy"> {t('privacyPolicyLink')}</Link> {t('andText')}
            <Link to="/terms-of-use"> {t('termsOfUseLink')}</Link>.
          </Typography.Paragraph>
        </Form.Item>

        <Form.Item>
          <Flex vertical gap={8}>
            <Button
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading || validating}
              style={{ borderRadius: 4 }}
            >
              {t('signupButton')}
            </Button>

            <Typography.Text style={{ textAlign: 'center' }}>{t('orText')}</Typography.Text>

            <Button
              block
              type="default"
              size="large"
              onClick={onGoogleSignUpClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <img src={googleIcon} alt="google icon" style={{ maxWidth: 20, width: '100%' }} />
              {t('signInWithGoogleButton')}
            </Button>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Space>
            <Typography.Text style={{ fontSize: 14 }}>
              {t('alreadyHaveAccountText')}
            </Typography.Text>

            <Link
              to="/auth/login"
              className="ant-typography ant-typography-link blue-link"
              style={{ fontSize: 14 }}
            >
              {t('loginButton')}
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignupPage;
