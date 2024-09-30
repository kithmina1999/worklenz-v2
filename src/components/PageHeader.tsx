import { Flex, Typography } from 'antd'
import React from 'react'
import logo from '../assets/images/logo.png'

type PageHeaderProp = {
    description: string
}

const PageHeader = ({ description }: PageHeaderProp) => {
    return (
        <Flex vertical align="center" gap={8} style={{ marginBottom: 24 }}>
            <img
                src={logo}
                alt="worklenz logo"
                style={{ width: '100%', maxWidth: 220 }}
            />
            <Typography.Text
                style={{ color: '#8c8c8c', maxWidth: 400, textAlign: 'center' }}
            >
                {description}
            </Typography.Text>
        </Flex>
    )
}

export default PageHeader
