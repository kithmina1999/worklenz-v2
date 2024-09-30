import { Col, Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <Layout>
            <Layout.Content>
                <Col
                    xs={{ span: 20, offset: 2, flex: '100%' }}
                    xxl={{ span: 16, offset: 4, flex: '100%' }}
                >
                    <Outlet />
                </Col>
            </Layout.Content>
        </Layout>
    )
}

export default MainLayout
