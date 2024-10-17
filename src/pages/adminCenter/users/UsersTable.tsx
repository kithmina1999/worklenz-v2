import { Avatar, Table, TableProps } from 'antd'
import React from 'react'
import './UsersTable.css'
import { useMediaQuery } from 'react-responsive'
import { useTranslation } from 'react-i18next'

interface DataType {
    key: string;
    user: string;
    email: string;
    lastActivity: string
}

const UsersTable: React.FC = () => {

    const isTablet = useMediaQuery({ query: '(min-width: 1000px)' })
    const { t } = useTranslation('users')

    const columns: TableProps<DataType>['columns'] = [
        {
            title: t('user'),
            dataIndex: 'user',
            key: 'user',
            render: (text) => <span><Avatar style={{
                width: `${isTablet ? '28px' : '20px'}`,
                backgroundColor: '#bf4949',
                height: `${isTablet ? '28px' : '20px'}`,
                marginRight: '8px',
            }}>{text.charAt(0).toUpperCase()}</Avatar>{text}</span>,
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span className="email-hover">{text}</span>,
        },
        {
            title: t('lastActivity'),
            dataIndex: 'lastActivity',
            key: 'lastActivity',
            render: (text) => <span>{text}</span>,
        },
    ]

    const data: DataType[] = [
        {
            key: '1',
            user: 'Raveesha Dilanka',
            email: 'raveeshadilanka1999@gmail.com',
            lastActivity: '-',
        },
    ]

    return (
        <Table rowClassName="users-table-row" columns={columns} dataSource={data}
               pagination={{
                   showSizeChanger: true,
                   defaultPageSize: 20,
                   pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
               }}
        />
    )
}

export default UsersTable
