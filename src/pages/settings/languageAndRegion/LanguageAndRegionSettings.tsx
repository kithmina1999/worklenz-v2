import { Button, Card, Form, Select } from 'antd'
import React from 'react'

const LanguageAndRegionSettings = () => {
    // language selection options
    const languageOptions = [
        {
            key: 'english',
            value: 'English',
        },
    ]

    return (
        <Card style={{ width: '100%' }}>
            <Form
                layout="vertical"
                style={{ width: '100%', maxWidth: 350 }}
                initialValues={{
                    language: 'English',
                    timeZone: 'Asia/Colombo',
                }}
            >
                <Form.Item
                    name="language"
                    label="Language"
                    rules={[
                        {
                            required: true,
                            message: 'Language is required',
                        },
                    ]}
                >
                    <Select options={languageOptions} />
                </Form.Item>
                <Form.Item
                    name="timeZone"
                    label="Time zone"
                    rules={[
                        {
                            required: true,
                            message: 'Time zone is required',
                        },
                    ]}
                >
                    <Select showSearch />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Save Changes</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default LanguageAndRegionSettings
