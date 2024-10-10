import { RightOutlined } from '@ant-design/icons'
import { ConfigProvider, Flex, Menu, MenuProps } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { colors } from '../../../styles/colors'
import { settingsItems } from '../settingsConstants'
import { useTranslation } from 'react-i18next'

const SettingSidebar = () => {
    const location = useLocation()
    // localization
    const { t } = useTranslation('settingsSidebar')

    type MenuItem = Required<MenuProps>['items'][number]
    // import menu items from settings sidebar constants
    const menuItems = settingsItems

    // menu items
    const items: MenuItem[] = [
        ...menuItems.map((item) => ({
            key: item.key,
            label: (
                <Flex gap={8} justify="space-between">
                    <Flex gap={8}>
                        {item.icon}
                        <Link to={`/worklenz/settings/${item.endpoint}`}>
                            {t(item.name)}
                        </Link>
                    </Flex>
                    <RightOutlined style={{ fontSize: 12 }} />
                </Flex>
            ),
        })),
    ]

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemHoverBg: colors.transparent,
                        itemHoverColor: colors.skyBlue,
                        borderRadius: 12,
                        itemMarginBlock: 4,
                    },
                },
            }}
        >
            <Menu
                items={items}
                selectedKeys={[
                    // this code extract the key from relative path
                    location.pathname.split('/worklenz/settings/')[1] || '',
                ]}
                mode="vertical"
                style={{ border: 'none', width: '100%' }}
            />
        </ConfigProvider>
    )
}

export default SettingSidebar
