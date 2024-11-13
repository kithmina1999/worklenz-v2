import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/AuthPageHeader';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Localization
  const { t } = useTranslation('forgotPasswordPage');

  // media queries from react-responsive package
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    setIsLoading(true);

    setTimeout(() => {
      message.success(t('passwordResetSuccessMessage'));
      setIsLoading(false);
      form.resetFields();

      setTimeout(() => {
        navigate('/auth/login');
      }, 500);
    }, 1500);
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
        name="forgot-password"
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark="optional"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: t('emailRequired'),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('emailPlaceholder')}
            size="large"
            style={{ borderRadius: 4 }}
          />
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
              {t('resetPasswordButton')}
            </Button>
            <Typography.Text style={{ textAlign: 'center' }}>
              {t('orText')}
            </Typography.Text>
            <Link to="/auth/login">
              <Button
                block
                type="default"
                size="large"
                style={{
                  borderRadius: 4,
                }}
              >
                {t('returnToLoginButton')}
              </Button>
            </Link>
          </Flex>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ForgotPasswordPage;
