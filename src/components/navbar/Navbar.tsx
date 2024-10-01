import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Button, Col, Drawer, Flex, Menu, Tooltip, Typography } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
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
// import NotificationButton from '../../features/navbar/notification/NotificationButton'
// import NotficationDrawer from '../../features/navbar/notification/NotficationDrawer'
// import SwitchTeamButton from '../../features/navbar/switchTeam/SwitchTeamButton'
// import ProfileButton from '../../features/navbar/userProfile/ProfileButton'
// import InviteButton from '../../features/navbar/addMember/InviteButton'
// import AddMemberDrawer from '../../features/navbar/addMember/AddMemberDrawer'

const Navbar = () => {
    const location = useLocation()

    // Localization
    const { t } = useTranslation('navbar')

    // Mobile nav menu
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState)

    // Media queries from react-responsive package
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const isTablet = useMediaQuery({ query: '(min-width: 576px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    // Function for setting the key of the current active nav link
    const currentActiveKey = () => {
        if (location.pathname.includes('/home')) return 'home'
        if (location.pathname.includes('/projects')) return 'projects'
        if (location.pathname.includes('/schedules')) return 'schedules'
        if (location.pathname.includes('/reporting')) return 'reporting'
        return 'path not matched'
    }

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
            {/* Logo */}
            <img
                src={logo}
                alt={t('logoAlt')}
                style={{ width: '100%', maxWidth: 140 }}
            />
            {isDesktop && (
                <Flex
                    align="center"
                    justify="space-between"
                    style={{ width: '100%' }}
                >
                    <Menu
                        mode="horizontal"
                        style={{
                            flex: 10,
                            maxWidth: 400,
                            minWidth: 0,
                            border: 'none',
                        }}
                        defaultSelectedKeys={[currentActiveKey()]}
                        items={[
                            {
                                key: 'home',
                                label: (
                                    <NavLink to="/worklenz/home">
                                        <Typography.Text strong>
                                            {t('home')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'projects',
                                label: (
                                    <NavLink to="/worklenz/projects">
                                        <Typography.Text strong>
                                            {t('projects')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'schedules',
                                label: (
                                    <NavLink to="/worklenz/schedules">
                                        <Typography.Text strong>
                                            {t('schedules')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                            },
                            {
                                key: 'reporting',
                                label: (
                                    <NavLink to="/worklenz/reporting">
                                        <Typography.Text strong>
                                            {t('reporting')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                            },
                        ]}
                    />
                    <Flex gap={16} align="center">
                        <Button
                            style={{
                                backgroundColor: colors.lightBeige,
                                color: 'black',
                            }}
                        >
                            {t('upgradePlan')}
                        </Button>
                        {/* <InviteButton />
                        <SwitchTeamButton />
                        <NotificationButton /> */}
                        <Tooltip title={t('help')}>
                            <Button
                                shape="circle"
                                size="large"
                                style={{
                                    border: 'none',
                                    boxShadow: 'none',
                                }}
                                children={
                                    <QuestionCircleOutlined
                                        style={{ fontSize: 20 }}
                                    />
                                }
                            />
                        </Tooltip>
                        {/* <ProfileButton /> */}
                    </Flex>
                </Flex>
            )}

            {isTablet && !isDesktop && (
                <Flex gap={8} align="center">
                    {/* <SwitchTeamButton />
                    <NotificationButton />
                    <ProfileButton /> */}

                    <Button
                        shape="circle"
                        size="large"
                        style={{ border: 'none', boxShadow: 'none' }}
                        onClick={handleMenuToggle}
                        children={<MenuOutlined style={{ fontSize: 20 }} />}
                    />
                </Flex>
            )}

            {isMobile && (
                <Flex align="center">
                    {/* <NotificationButton />
                    <ProfileButton /> */}

                    <Button
                        shape="circle"
                        size="large"
                        style={{ border: 'none', boxShadow: 'none' }}
                        onClick={handleMenuToggle}
                        children={<MenuOutlined style={{ fontSize: 20 }} />}
                    />
                </Flex>
            )}

            {/* add member drawer  */}
            {/* <AddMemberDrawer /> */}
            {/* notification drawer */}
            {/* <NotficationDrawer /> */}
            {/* mobile menu drawer  */}
            <Drawer open={isMenuOpen} onClose={handleMenuToggle}>
                <Flex>
                    <Menu
                        style={{
                            flex: 10,
                            maxWidth: 400,
                            minWidth: 0,
                            border: 'none',
                        }}
                        onClick={handleMenuToggle}
                        defaultSelectedKeys={[currentActiveKey()]}
                        items={[
                            {
                                key: 'home',
                                label: (
                                    <NavLink to="/worklenz/home">
                                        <Typography.Text strong>
                                            {t('home')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                                icon: <HomeOutlined />,
                            },
                            {
                                key: 'projects',
                                label: (
                                    <NavLink to="/worklenz/projects">
                                        <Typography.Text strong>
                                            {t('projects')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                                icon: <ProjectOutlined />,
                            },
                            {
                                key: 'schedules',
                                label: (
                                    <NavLink to="/worklenz/schedules">
                                        <Typography.Text strong>
                                            {t('schedules')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                                icon: <ClockCircleOutlined />,
                            },
                            {
                                key: 'reporting',
                                label: (
                                    <NavLink to="/worklenz/reporting">
                                        <Typography.Text strong>
                                            {t('reporting')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                                icon: <ReadOutlined />,
                            },
                            {
                                key: 'help',
                                label: (
                                    <NavLink to="/worklenz/help">
                                        <Typography.Text strong>
                                            {t('help')}
                                        </Typography.Text>
                                    </NavLink>
                                ),
                                icon: <QuestionCircleOutlined />,
                            },
                            {
                                key: 'plans',
                                style: {
                                    padding: 0,
                                    backgroundColor: 'transparent',
                                },
                                label: (
                                    <Button
                                        style={{
                                            backgroundColor: colors.lightBeige,
                                            color: 'black',
                                            width: '100%',
                                        }}
                                    >
                                        {t('upgradePlan')}
                                    </Button>
                                ),
                            },
                        ]}
                    />
                </Flex>
            </Drawer>
        </Col>
    )
}

export default Navbar
