import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Space, Steps, Typography } from 'antd'
import OrganizationNameForm from '../../components/accountSetup/organizationName/OrgnizationNameForm'
import CreateFirstProjectForm from '../../components/accountSetup/createFirstProject/CreateFirstProjectForm'
import CreateFirstTasks from '../../components/accountSetup/createFirstTasks/CreateFirstTasks'
import InviteInitialTeamMembers from '../../components/accountSetup/inviteInitialTeamMembers/InviteInitialTeamMembers'

const { Title } = Typography

const CreateFirstProject: React.FC = () => {
    const [current, setCurrent] = useState(3)

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
            content: (
                <CreateFirstTasks
                    onContinue={() => setCurrent(current + 1)}
                    onGoBack={() => setCurrent(current - 1)}
                />
            ),
        },
        {
            title: '',
            content: (
                <InviteInitialTeamMembers 
                onContinue={() => setCurrent(current + 1)}
                onGoBack={() => setCurrent(current - 1)}
                />
            ),
        },
    ]

    return (
        <div
            style={{
                width: '100vw',
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
                    maxHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Space
                    direction="vertical"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0',
                        flexGrow: 1,
                        width: '100%',
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
                    <div style={{ flexGrow: 1, width: '100%' }}>
                        {steps[current].content}
                    </div>
                </Space>
            </div>
        </div>
    )
}

export default CreateFirstProject
