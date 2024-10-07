import {
    ClockCircleOutlined,
    HomeOutlined,
    MenuOutlined,
    ProjectOutlined,
    QuestionCircleOutlined,
    ReadOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, MenuProps, Space, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../../styles/colors'
import { NavLink } from 'react-router-dom'

const MobileMenuButton = () => {
    // localization
    const { t } = useTranslation('navbar')

    const navLinks = [
        {
            name: 'home',
            icon: React.createElement(HomeOutlined),
        },
        {
            name: 'projects',
            icon: React.createElement(ProjectOutlined),
        },
        {
            name: 'schedules',
            icon: React.createElement(ClockCircleOutlined),
        },
        {
            name: 'reporting',
            icon: React.createElement(ReadOutlined),
        },
        {
            name: 'help',
            icon: React.createElement(QuestionCircleOutlined),
        },
    ]

    const mobileMenu: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Card
                    className="custom-card"
                    bordered={false}
                    style={{ width: 230 }}
                >
                    {navLinks.map((navEl, index) => (
                        <NavLink to={`/worklenz/${navEl.name}`}>
                            <Typography.Text key={index} strong>
                                <Space>
                                    {navEl.icon}
                                    {t(navEl.name)}
                                </Space>
                            </Typography.Text>
                        </NavLink>
                    ))}

                    <Button
                        style={{
                            backgroundColor: colors.lightBeige,
                            color: 'black',
                            width: '90%',
                            marginInlineStart: 12,
                            marginBlock: 6,
                        }}
                    >
                        {t('upgradePlan')}
                    </Button>
                </Card>
            ),
        },
    ]

    return (
        <Dropdown
            overlayClassName="custom-dropdown"
            menu={{ items: mobileMenu }}
            placement="bottomRight"
            trigger={['click']}
        >
            <Button
                className="borderless-icon-btn"
                icon={<MenuOutlined style={{ fontSize: 20 }} />}
            />
        </Dropdown>
    )
}

export default MobileMenuButton
