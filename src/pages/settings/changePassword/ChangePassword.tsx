import {
    EyeInvisibleOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import { Card, Form, Input, Row } from 'antd'
import React from 'react'

const ChangePassword: React.FC = () => {
    return (
        <Card style={{ width: '100%' }}>
            <Form>
                <Row style={{ display: 'flex'}}>
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ 
                          required: true,
                          message: 'Please input your old password'
                        }]}
                        style={{ marginBottom: '24px'}}
                        layout="vertical"
                    >
                        <Input.Password
                        type='password'
                            style={{ width: '350px' }}
                            placeholder="Enter your current password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeInvisibleOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                ) : (
                                    <EyeOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                )
                            }
                        />
                    </Form.Item>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true }]}
                        layout="vertical"
                    >
                        <Input.Password
                        type='password'
                            style={{ width: '350px' }}
                            placeholder="New Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeInvisibleOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                ) : (
                                    <EyeOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                )
                            }
                        />
                    </Form.Item>
                </Row>
                <Row style={{ marginBottom: '24px' }}>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[{ required: true }]}
                        layout="vertical"
                    >
                        <Input.Password
                        type='password'
                            style={{ width: '350px' }}
                            placeholder="Confirm Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeInvisibleOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                ) : (
                                    <EyeOutlined
                                        style={{ color: '#000000d9' }}
                                    />
                                )
                            }
                        />
                    </Form.Item>
                </Row>
            </Form>
        </Card>
    )
}

export default ChangePassword
