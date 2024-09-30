import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Button, Form, Input, Space, Steps, Typography } from 'antd'

const { Title } = Typography

const CreateFirstProject: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)

        if (value.trim() === '') {
            setIsButtonDisabled(true)
        } else {
            setIsButtonDisabled(false)
        }
    }

    const steps = [
        {
            title: '',
            content: (
                <Form
                    style={{
                        width: '600px',
                        paddingBottom: '1rem',
                        marginBottom: '3rem',
                        marginTop: '3rem',
                    }}
                >
                    <Form.Item>
                        <Title level={2} style={{ marginBottom: '1rem' }}>
                            Name your organization.
                        </Title>
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        rules={[{ required: true }]}
                        label={
                            <span
                                style={{ color: '#00000073', fontWeight: 500 }}
                            >
                                Pick a name for your Worklenz account.
                            </span>
                        }
                    >
                        <Input
                            placeholder="e.g., test01's Team"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <div style={{ display: 'flex', marginTop: '5rem' }}></div>
                    <Form.Item
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isButtonDisabled}
                            onClick={() => setCurrent(current + 1)}
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: '',
            content: 'Second-content',
        },
        {
            title: '',
            content: 'Last-content',
        },
        {
            title: '',
            content: 'Last-content',
        },
    ]

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '3rem',
                paddingBottom: '3rem',
                backgroundColor: '#FAFAFA',
            }}
        >
            <div>
                <img src={logo} alt="Logo" width={235} height={50} />
            </div>
            <Title
                level={5}
                style={{
                    textAlign: 'center',
                    marginTop: '4px',
                    marginBottom: '24px',
                }}
            >
                Setup your account.
            </Title>
            <div
                style={{
                    backgroundColor: 'white',
                    marginTop: '1.5rem',
                    paddingTop: '3rem',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '100%',
                    maxWidth: '66.66667%',
                }}
            >
                <Space
                    direction="vertical"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0',
                    }}
                >
                    <Steps
                        current={current}
                        items={steps}
                        style={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            width: '600px',
                        }}
                    />
                    <div>{steps[current].content}</div>
                </Space>
            </div>
        </div>
    )
}

export default CreateFirstProject
