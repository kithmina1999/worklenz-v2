import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, notification, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import { profileSettingsApiService } from '@/api/settings/profile/profile-settings.api.service';

const ChangePassword: React.FC = () => {
  useDocumentTitle('Change Password');
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [form] = Form.useForm();

  const handleFormSubmit = async (values: any) => {
    const body = {
      password: values.newPassword,
      confirm_password: values.confirmPassword,
      current_password: values.currentPassword,
    };

    const res = await profileSettingsApiService.changePassword(body);
    if (res.done) {
      form.resetFields();
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
        <Row>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your old password!',
              },
            ]}
            style={{ marginBottom: '24px' }}
          >
            <Input.Password
              type="password"
              style={{ width: '350px' }}
              placeholder="Enter your current password"
              iconRender={visible =>
                visible ? (
                  <EyeInvisibleOutlined style={{ color: '#000000d9' }} />
                ) : (
                  <EyeOutlined style={{ color: '#000000d9' }} />
                )
              }
            />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
          >
            <Input.Password
              type="password"
              style={{ width: '350px' }}
              placeholder="New Password"
              iconRender={visible =>
                visible ? (
                  <EyeInvisibleOutlined style={{ color: '#000000d9' }} />
                ) : (
                  <EyeOutlined style={{ color: '#000000d9' }} />
                )
              }
            />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              {
                required: true,
                message: 'Please confirm your new password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password
              type="password"
              style={{ width: '350px' }}
              placeholder="Confirm Password"
              iconRender={visible =>
                visible ? (
                  <EyeInvisibleOutlined style={{ color: '#000000d9' }} />
                ) : (
                  <EyeOutlined style={{ color: '#000000d9' }} />
                )
              }
            />
          </Form.Item>
        </Row>
        <Row style={{ width: '350px', margin: '0.5rem 0' }}>
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            New password should be a minimum of 8 characters, with an uppercase letter, a number,
            and a symbol.
          </Typography.Text>
        </Row>
        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default ChangePassword;
