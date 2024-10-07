import { Col, Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../features/navbar/Navbar'
import { useAppSelector } from '../hooks/useAppSelector'
import { useMediaQuery } from 'react-responsive'

const MainLayout = () => {
    const themeMode = useAppSelector((state) => state.themeReducer.mode)
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    return (
        <Layout>
            <Layout.Header
                className={`shadow-md ${themeMode === 'dark' ? 'shadow-[#5f5f5f1f]' : 'shadow-[#18181811]'}`}
                style={{
                    zIndex: 999,
                    position: 'fixed',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                }}
            >
                <Navbar />
            </Layout.Header>

            <Layout.Content>
                <Col
                    xxl={{ span: 18, offset: 3, flex: '100%' }}
                    style={{ paddingInline: isDesktop ? 48 : 24 }}
                >
                    <Outlet />
                </Col>
            </Layout.Content>
        </Layout>
    )
}

export default MainLayout
