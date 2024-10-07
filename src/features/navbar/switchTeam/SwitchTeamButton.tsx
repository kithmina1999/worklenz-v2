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

const SwitchTeamButton = () => {
    // localization
    const { t } = useTranslation('navbar')

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
                        <Flex gap={12} align="center" style={{ padding: 12 }}>
                            <Avatar
                                style={{
                                    backgroundColor: colors.vibrantOrange,
                                }}
                            >
                                S
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
                                    Sachintha Prasad
                                </Typography.Text>
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
                    gap={4}
                    align="center"
                    justify="center"
                    style={{
                        color: colors.skyBlue,
                        backgroundColor: colors.paleBlue,
                        fontWeight: 500,
                        borderRadius: '50rem',
                        padding: '10px 16px',
                    }}
                >
                    <BankOutlined />
                    <Typography.Text strong style={{ color: colors.skyBlue }}>
                        Sachintha Prasad
                    </Typography.Text>
                    <CaretDownFilled />
                </Flex>
            </Dropdown>
        </Tooltip>
    )
}

export default SwitchTeamButton
