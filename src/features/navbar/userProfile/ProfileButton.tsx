import { CheckCircleTwoTone, UserOutlined } from '@ant-design/icons'
import {
    Avatar,
    Button,
    ConfigProvider,
    Divider,
    Dropdown,
    Flex,
    Menu,
    Space,
    Tooltip,
    Typography,
} from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../../styles/colors'
import { NavLink } from 'react-router-dom'

const ProfileButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    // user profile dropdown items
    const items = [
        {
            key: '0',
            label: (
                <Flex vertical>
                    <Flex vertical gap={8}>
                        <Typography.Text strong>Account</Typography.Text>
                        <Flex gap={8} align="center">
                            <Avatar
                                size="small"
                                style={{
                                    backgroundColor: colors.vibrantOrange,
                                }}
                            >
                                S
                            </Avatar>
                            <Flex vertical>
                                <Typography.Text>
                                    Sachintha Prasad
                                </Typography.Text>
                                <Typography.Text
                                    style={{ fontSize: 12, fontWeight: 300 }}
                                >
                                    prasadsachintha1231@gmail.com
                                </Typography.Text>
                                <Typography.Text
                                    style={{ fontSize: 12, fontWeight: 300 }}
                                >
                                    (owner)
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Menu
                        style={{
                            flex: 10,
                            maxWidth: 400,
                            minWidth: 0,
                            border: 'none',
                        }}
                        items={[
                            {
                                key: 'admin',
                                label: (
                                    <NavLink to={'worklenz/admin-center'}>
                                        Admin Center
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'setting',
                                label: (
                                    <NavLink to={'worklenz/settings'}>
                                        Settings
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'logout',
                                label: (
                                    <NavLink
                                        to={'http://localhost:3000/auth/login'}
                                    >
                                        Log Out
                                    </NavLink>
                                ),
                            },
                        ]}
                    />
                </Flex>
            ),
        },
    ]

    return (
        <Tooltip title={t('profileTooltip')}>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button
                    className="navbar-action-btn"
                    icon={<UserOutlined style={{ fontSize: 20 }} />}
                />
            </Dropdown>
        </Tooltip>
    )
}

export default ProfileButton
