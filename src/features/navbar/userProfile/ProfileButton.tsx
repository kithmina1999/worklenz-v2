import { UserOutlined } from '@ant-design/icons'
import {
    Avatar,
    Button,
    Card,
    Dropdown,
    Flex,
    Menu,
    MenuProps,
    Tooltip,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../../styles/colors'
// profile dropdown custom css
import './profileDropdown.css'
import { UserType } from '../../../types/user'

const ProfileButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    const userDetails: UserType = {
        name: 'Sachintha Prasad',
        email: 'prasadsachintha1231@gmail.com',
        userRole: 'owner',
    }

    const profile: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Card
                    className="custom-card"
                    title={
                        <div style={{ paddingTop: '16px' }}>
                            <Typography.Text>Account</Typography.Text>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <Avatar
                                        style={{
                                            backgroundColor:
                                                colors.vibrantOrange,
                                            verticalAlign: 'middle',
                                        }}
                                        size={30}
                                    >
                                        S
                                    </Avatar>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography.Text>
                                        {userDetails.name}
                                    </Typography.Text>
                                    <Typography.Text style={{ fontSize: 12 }}>
                                        {userDetails.email}
                                    </Typography.Text>
                                    <Typography.Text
                                        type="secondary"
                                        style={{ fontSize: 12 }}
                                    >
                                        ({userDetails.userRole})
                                    </Typography.Text>
                                </div>
                            </div>
                        </div>
                    }
                    bordered={false}
                    style={{ width: 230 }}
                >
                    <p>Admin Center</p>
                    <p>Setting</p>
                    <p>Log Out</p>
                </Card>
            ),
        },
    ]

    return (
        <Tooltip title={t('profileTooltip')}>
            <Dropdown
                overlayClassName="custom-dropdown"
                menu={{ items: profile }}
                placement="bottomRight"
                trigger={['click']}
                overlayStyle={{ marginTop: '5px', padding: 0 }}
            >
                <Button type="text" icon={<UserOutlined />} />
            </Dropdown>
        </Tooltip>
    )
}

export default ProfileButton
