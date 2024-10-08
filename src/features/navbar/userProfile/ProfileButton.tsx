import { UserOutlined } from '@ant-design/icons'
import {
    Avatar,
    Button,
    Card,
    Dropdown,
    Flex,
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
                        <div style={{ paddingBlock: '16px' }}>
                            <Typography.Text>Account</Typography.Text>
                            <Flex gap={8} align="center" justify="flex-start">
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
                                <Flex vertical>
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
                                </Flex>
                            </Flex>
                        </div>
                    }
                    bordered={false}
                    style={{ width: 230 }}
                >
                    <Typography.Link
                        href="/worklenz/admin-center"
                        style={{ color: colors.darkGray }}
                    >
                        Admin Center
                    </Typography.Link>
                    <Typography.Link
                        href="/worklenz/settings"
                        style={{ color: colors.darkGray }}
                    >
                        Settings
                    </Typography.Link>
                    <Typography.Link
                        href="/auth/login"
                        style={{ color: colors.darkGray }}
                    >
                        Log Out
                    </Typography.Link>
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
            >
                <Button
                    className="borderless-icon-btn"
                    icon={<UserOutlined style={{ fontSize: 20 }} />}
                />
            </Dropdown>
        </Tooltip>
    )
}

export default ProfileButton
