import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Space, Steps, Typography } from 'antd'
import OrganizationNameForm from '../../components/accountSetup/OrgnizationNameForm'
import CreateFirstProjectForm from '../../components/accountSetup/CreateFirstProjectForm'

const { Title } = Typography

const CreateFirstProject: React.FC = () => {
    const [current, setCurrent] = useState(1)

    const steps = [
        {
            title: '',
            content: (
                <OrganizationNameForm 
                onContinue={() => setCurrent(current + 1)}
                />
            ),
        },
        {
            title: '',
            content: (
                <CreateFirstProjectForm 
                onContinue={() => setCurrent(current + 1)}
                onGoBack={() => setCurrent(current - 1)}
                />
            ),
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
