import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    message,
    Space,
    Typography,
} from 'antd'
import googleIcon from '../../assets/images/icons8-google.svg'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    // Localization
    const { t } = useTranslation('loginPage')

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            message.success(t('successMessage'))

            setTimeout(() => {
                navigate('/worklenz/home')
            }, 500)
        }, 1500)
    }

    return (
        <Card
            style={{
                padding: '12px 24px 0 24px',
                width: '100%',
            }}
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

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('passwordRequired'),
                            min: 8,
                        },
                    ]}
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
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>{t('rememberMe')}</Checkbox>
                        </Form.Item>

                        <Link to="/auth/forgot-password">
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
                            loading={loading}
                            style={{ borderRadius: 4 }}
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
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 4,
                            }}
                        >
                            <img
                                src={googleIcon}
                                alt="google icon"
                                style={{ maxWidth: 20, width: '100%' }}
                            />
                            {t('signInWithGoogleButton')}
                        </Button>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Typography.Text style={{ fontSize: 14 }}>
                            {t('dontHaveAccountText')}
                        </Typography.Text>

                        <Typography.Link
                            href="/auth/signup"
                            style={{ fontSize: 14 }}
                        >
                            {t('signupButton')}
                        </Typography.Link>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default LoginPage
