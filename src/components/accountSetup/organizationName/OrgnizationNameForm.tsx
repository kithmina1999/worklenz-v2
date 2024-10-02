import React, { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'

const { Title } = Typography

interface OrganizationNameProps {
    onContinue: () => void
}

const OrganizationNameForm: React.FC<OrganizationNameProps> = ({
    onContinue,
}) => {
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
    return (
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
                    <span style={{ color: '#00000073', fontWeight: 500 }}>
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
            <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isButtonDisabled}
                    onClick={onContinue}
                >
                    Continue
                </Button>
            </Form.Item>
        </Form>
    )
}

export default OrganizationNameForm
