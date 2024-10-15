import {
    BankOutlined,
    CaretDownFilled,
    CheckCircleFilled,
} from '@ant-design/icons'
import { Avatar, Card, Dropdown, Flex, Tooltip, Typography } from 'antd'
import React from 'react'
import { colors } from '../../../styles/colors'
import { useTranslation } from 'react-i18next'
// custom css
import './switchTeam.css'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { avatarNamesMap } from '../../../shared/constants'

const SwitchTeamButton = () => {
    // get user data from redux - user reducer
    const userDetails = useAppSelector((state) => state.userReducer)
    // localization
    const { t } = useTranslation('navbar')

    // get avatar character
    const avatarCharacter = userDetails.name[0].toLocaleUpperCase()

    // switch teams dropdown items
    const items = [
        {
            key: '0',
            label: (
                <Card
                    className="switch-team-card"
                    bordered={false}
                    style={{
                        width: 230,
                    }}
                >
                    <Flex vertical gap={8}>
                        <Flex
                            gap={12}
                            align="center"
                            justify="space-between"
                            style={{ padding: 12 }}
                        >
                            <Flex gap={8} align="center">
                                <Avatar
                                    style={{
                                        backgroundColor:
                                            avatarNamesMap[avatarCharacter],
                                    }}
                                >
                                    {avatarCharacter}
                                </Avatar>
                                <Flex vertical>
                                    <Typography.Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 300,
                                            color: colors.lightGray,
                                        }}
                                    >
                                        Owned by you
                                    </Typography.Text>
                                    <Typography.Text>
                                        {userDetails.name}
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                            <CheckCircleFilled
                                style={{
                                    fontSize: 16,
                                    color: colors.limeGreen,
                                }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            ),
        },
    ]

    return (
        <Tooltip title={t('switchTeamTooltip')} trigger={'hover'}>
            <Dropdown
                overlayClassName="switch-team-dropdown"
                menu={{ items }}
                trigger={['click']}
            >
                <Flex
                    gap={12}
                    align="center"
                    justify="center"
                    style={{
                        color: colors.skyBlue,
                        backgroundColor: colors.paleBlue,
                        fontWeight: 500,
                        borderRadius: '50rem',
                        padding: '10px 16px',
                        height: '39px'
                    }}
                >
                    <BankOutlined />
                    <Typography.Text strong style={{ color: colors.skyBlue }}>
                        {userDetails.name}
                    </Typography.Text>
                    <CaretDownFilled />
                </Flex>
            </Dropdown>
        </Tooltip>
    )
}

export default SwitchTeamButton
