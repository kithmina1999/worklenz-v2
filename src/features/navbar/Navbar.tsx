import React, { useEffect, useState } from 'react'
import { Col, ConfigProvider, Flex, Menu, MenuProps, Typography } from 'antd'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'
import InviteButton from './addMember/InviteButton'
import SwitchTeamButton from './switchTeam/SwitchTeamButton'
import NotificationButton from './notification/NotificationButton'
import ProfileButton from './userProfile/ProfileButton'
import AddMemberDrawer from './addMember/AddMemberDrawer'
import NotficationDrawer from './notification/NotficationDrawer'
import HelpButton from './help/HelpButton'
import UpgradePlanButton from './upgradePlan/UpgradePlanButton'
import MobileMenuButton from './mobileMenu/MobileMenuButton'
import NavbarLogo from './NavbarLogo'

const Navbar = () => {
    const [current, setCurrent] = useState<string>('home')
    const navigate = useNavigate()
    const location = useLocation();

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

    // media queries from react-responsive package
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 576px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    useEffect(() => {
        const pathKey = location.pathname.split('/').pop();
        setCurrent(pathKey ?? 'home');
    }, [location]);

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
            <NavbarLogo />

            <Flex
                align="center"
                justify={isDesktop ? 'space-between' : 'flex-end'}
                style={{ width: '100%' }}
            >
                {/* navlinks menu  */}
                {isDesktop && (
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
                )}

                <Flex gap={16} align="center">
                    <ConfigProvider wave={{ disabled: true }}>
                        {isDesktop && (
                            <Flex gap={12} align="center">
                                <UpgradePlanButton />
                                <InviteButton />
                                <SwitchTeamButton />
                                <NotificationButton />
                                <HelpButton />
                                <ProfileButton />
                            </Flex>
                        )}
                        {isTablet && !isDesktop && (
                            <Flex gap={12} align="center">
                                <SwitchTeamButton />
                                <NotificationButton />
                                <ProfileButton />
                                <MobileMenuButton />
                            </Flex>
                        )}
                        {isMobile && (
                            <Flex gap={12} align="center">
                                <NotificationButton />
                                <ProfileButton />
                                <MobileMenuButton />
                            </Flex>
                        )}
                    </ConfigProvider>
                </Flex>
            </Flex>

            {/* drawers  */}
            {/* add member drawer  */}
            <AddMemberDrawer />
            {/* notification drawer */}
            <NotficationDrawer />
        </Col>
    )
}

export default Navbar
