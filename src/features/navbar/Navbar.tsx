import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import {
    Button,
    Card,
    Col,
    ConfigProvider,
    Drawer,
    Flex,
    Menu,
    MenuProps,
    Tooltip,
    Typography,
} from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    ClockCircleOutlined,
    HomeOutlined,
    MenuOutlined,
    ProjectOutlined,
    QuestionCircleOutlined,
    ReadOutlined,
} from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import { colors } from '../../styles/colors'
import { useTranslation } from 'react-i18next'
import InviteButton from './addMember/InviteButton'
import SwitchTeamButton from './switchTeam/SwitchTeamButton'
import NotificationButton from './notification/NotificationButton'
import ProfileButton from './userProfile/ProfileButton'
import AddMemberDrawer from './addMember/AddMemberDrawer'
import NotficationDrawer from './notification/NotficationDrawer'
import HelpButton from './help/HelpButton'
import UpgradePlanButton from './upgradePlan/UpgradePlanButton'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [current, setCurrent] = useState('home')
    const navigate = useNavigate()

    // localization
    const { t } = useTranslation('navbar')

    // menu type
    type MenuItem = Required<MenuProps>['items'][number]
    // nav links menu
    const navlinkItems: MenuItem[] = [
        {
            key: 'home',
            label: <Typography.Link strong>{t('home')}</Typography.Link>,
        },
        {
            key: 'projects',
            label: <Typography.Link strong>{t('projects')}</Typography.Link>,
        },
        {
            key: 'schedules',
            label: <Typography.Link strong>{t('schedules')}</Typography.Link>,
        },
        {
            key: 'reporting',
            label: <Typography.Link strong>{t('reporting')}</Typography.Link>,
        },
    ]

    //handle navlink menu click
    const navlinkClick: MenuProps['onClick'] = (e) => {
        navigate(`/worklenz/${e.key}`)
        setCurrent(e.key)
    }

    // mobile nav menu
    const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState)

    // media queries from react-responsive package
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 576px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    return (
        <Col
            style={{
                width: '100%',
                display: 'flex',
                paddingInline: isDesktop ? 48 : 24,
                gap: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {/* logo */}
            <img
                src={logo}
                alt={t('logoAlt')}
                style={{ width: '100%', maxWidth: 140 }}
            />
            <Flex
                align="center"
                justify="space-between"
                style={{ width: '100%' }}
            >
                {/* navlinks menu  */}
                <Menu
                    onClick={navlinkClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    style={{
                        flex: 10,
                        maxWidth: 400,
                        minWidth: 0,
                        border: 'none',
                    }}
                    items={navlinkItems}
                />

                <Flex gap={16} align="center">
                    <ConfigProvider wave={{ disabled: true }}>
                        <UpgradePlanButton />
                        <InviteButton />
                        <SwitchTeamButton />
                        <NotificationButton />
                        <HelpButton />
                        <ProfileButton />
                    </ConfigProvider>
                </Flex>
            </Flex>

            {isMenuOpen && (
                <Card style={{ position: 'absolute', top: 0, padding: 0 }}>
                    <Menu
                        style={{
                            flex: 10,
                            maxWidth: 400,
                            minWidth: 0,
                            border: 'none',
                        }}
                        onClick={navlinkClick}
                        items={navlinkItems}
                    />
                </Card>
            )}
            {/* drawers  */}
            {/* add member drawer  */}
            <AddMemberDrawer />
            {/* notification drawer */}
            <NotficationDrawer />
        </Col>
    )
}

export default Navbar
