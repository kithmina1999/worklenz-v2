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
import React from 'react'
import { useTranslation } from 'react-i18next'
// profile dropdown custom css
import './profileDropdown.css'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { avatarNamesMap } from '../../../shared/constants'
import { Link } from 'react-router-dom'

const ProfileButton = () => {
    // get user data from redux - user reducer
    const userDetails = useAppSelector((state) => state.userReducer)
    // localization
    const { t } = useTranslation('navbar')

    // get avatar character
    const avatarCharacter = userDetails.name[0].toLocaleUpperCase()

    const profile: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Card
                    className="profile-card"
                    title={
                        <div style={{ paddingBlock: '16px' }}>
                            <Typography.Text>Account</Typography.Text>
                            <Flex gap={8} align="center" justify="flex-start">
                                <div>
                                    <Avatar
                                        style={{
                                            backgroundColor:
                                                avatarNamesMap[avatarCharacter],
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        {avatarCharacter}
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
                    <Link to="/worklenz/admin-center/overview">
                        Admin Center
                    </Link>
                    <Link to="/worklenz/settings/profile">Settings</Link>
                    <Link to="/auth/login">Log Out</Link>
                </Card>
            ),
        },
    ]

    return (
        <Tooltip title={t('profileTooltip')}>
            <Dropdown
                overlayClassName="profile-dropdown"
                menu={{ items: profile }}
                placement="bottomRight"
                trigger={['click']}
            >
                <Button
                    className="profile-button"
                    style={{ height: '62px', width: '60px' }}
                    type="text"
                    icon={<UserOutlined style={{ fontSize: 20 }} />}
                />
            </Dropdown>
        </Tooltip>
    )
}

export default ProfileButton
