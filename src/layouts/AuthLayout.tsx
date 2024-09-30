import { Col, Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Col
                style={{ marginTop: 120 }}
                xs={{ span: 20, offset: 2, flex: '100%' }}
                sm={{ span: 12, offset: 6, flex: '100%' }}
            >
                <Outlet />
            </Col>
        </Layout>
    )
}

export default AuthLayout
