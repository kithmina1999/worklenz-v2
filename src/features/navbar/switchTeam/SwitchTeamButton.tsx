import {
    BankOutlined,
    CheckCircleTwoTone,
    DownOutlined,
} from '@ant-design/icons'
import {
    Avatar,
    Button,
    Dropdown,
    Flex,
    Space,
    Tooltip,
    Typography,
} from 'antd'
import React from 'react'
import { colors } from '../../../styles/colors'
import { useTranslation } from 'react-i18next'

const SwitchTeamButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    // switch teams dropdown items
    const items = [
        {
            key: '0',
            label: (
                <Space>
                    <Avatar
                        size="small"
                        style={{ backgroundColor: colors.vibrantOrange }}
                    >
                        S
                    </Avatar>
                    <Flex vertical>
                        <Typography.Text
                            style={{ fontSize: 12, fontWeight: 300 }}
                        >
                            owned by you
                        </Typography.Text>
                        <Typography.Text>Sachintha Prasad</Typography.Text>
                    </Flex>
                    <CheckCircleTwoTone twoToneColor={colors.limeGreen} />
                </Space>
            ),
        },
    ]

    return (
        <Tooltip title={t('switchTeamTooltip')}>
            <Dropdown menu={{ items }} trigger={['click']}>
                <Button
                    type="text"
                    shape="round"
                    size="large"
                    icon={<BankOutlined />}
                    style={{
                        color: colors.skyBlue,
                        backgroundColor: colors.paleBlue,
                        border: 'none',
                        fontWeight: 500,
                    }}
                >
                    Sachintha Prasad
                    <DownOutlined />
                </Button>
            </Dropdown>
        </Tooltip>
    )
}

export default SwitchTeamButton
