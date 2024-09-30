import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, message, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { useTranslation } from 'react-i18next'

const ForgotPasswordPage = () => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Localization
    const { t } = useTranslation('forgotPasswordPage')

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
        setIsLoading(true)

        setTimeout(() => {
            message.success(t('passwordResetSuccessMessage'))
            setIsLoading(false)
            form.resetFields()

            setTimeout(() => {
                navigate('/auth/login')
            }, 500)
        }, 1500)
    }

    return (
        <div>
            <PageHeader description={t('headerDescription')} />
            <Form
                name="forgot-password"
                form={form}
                layout="vertical"
                autoComplete="off"
                requiredMark="optional"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ marginInline: 'auto', maxWidth: 400 }}
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
        </div>
    )
}

export default ForgotPasswordPage
