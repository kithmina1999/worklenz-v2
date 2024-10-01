import React, { useState } from 'react'
import { Button, Drawer, Form, Input, Typography } from 'antd'
import '../../styles/accountSetup/CreateFirstProjectForm.css'
import TemplateDrawer from './TemplateDrawer'

const { Title } = Typography

interface CreateFirstProjectProps {
    onContinue: () => void
    onGoBack: () => void
}

const CreateFirstProjectForm: React.FC<CreateFirstProjectProps> = ({
    onContinue,
    onGoBack,
}) => {
    const [inputValue, setInputValue] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [open, setOpen] = useState(false)

    const openTemplateSelector = () => {
        setOpen(true)
    }

    const closeTemplateSelector = () => {
        setOpen(false)
    }

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
                    Create your first project.
                </Title>
            </Form.Item>

            <Form.Item
                layout="vertical"
                rules={[{ required: true }]}
                label={
                    <span style={{ color: '#00000073', fontWeight: 500 }}>
                        What project are you working on right now?
                    </span>
                }
            >
                <Input
                    placeholder="e.g. Worklenz marketing plan"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </Form.Item>

            <div style={{ position: 'relative' }}>
                <Title level={4} className="vert-text">
                    or
                </Title>
                <div className="vert-line"></div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            >
                <Button
                    onClick={openTemplateSelector}
                    type="primary"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Import from template
                </Button>
                <Drawer
                    title="Select from templates"
                    width={1000}
                    onClose={closeTemplateSelector}
                    open={open}
                    footer={
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <Button style={{marginRight: '8px'}}>Cancel</Button>
                            <Button type="primary">Create</Button>
                        </div>
                    }
                >
                    <TemplateDrawer />
                </Drawer>
            </div>

            <Form.Item style={{ display: 'flex', marginTop: '5rem' }}>
                <Button style={{ padding: 0 }} type="link" onClick={onGoBack}>
                    Go back
                </Button>
                <Button
                    style={{ marginLeft: '450px' }}
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

export default CreateFirstProjectForm
