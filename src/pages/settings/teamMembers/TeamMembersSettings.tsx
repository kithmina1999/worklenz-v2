import { SyncOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Flex,
    Input,
    Table,
    TableProps,
    Tooltip,
    Typography,
} from 'antd'
import React from 'react'

const TeamMembersSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            key: 'projects',
            title: 'Projects',
            dataIndex: 'projects',
            sorter: (a, b) => a.projects.length - b.projects.length,
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            key: 'teamAccess',
            title: 'Team Access',
            dataIndex: 'teamAccess',
            sorter: (a, b) => a.teamAccess.length - b.teamAccess.length,
        },
    ]

    return (
        <div style={{ width: '100%' }}>
            <Flex
                align="center"
                justify="space-between"
                style={{ marginBlockEnd: 24 }}
            >
                <Typography.Title level={4} style={{ marginBlockEnd: 0 }}>
                    0 Members
                </Typography.Title>

                <Flex
                    gap={8}
                    align="center"
                    justify="flex-end"
                    style={{ width: '100%', maxWidth: 400 }}
                >
                    <Tooltip
                        title={'Click to pin this into the main menu'}
                        trigger={'hover'}
                    >
                        <Button
                            shape="circle"
                            icon={<SyncOutlined />}
                            // onClick={() => handleRefresh()}
                        />
                    </Tooltip>
                    <Input.Search
                        placeholder="Search by name"
                        style={{ maxWidth: 200 }}
                    />
                    <Button type="primary">Create Client</Button>
                </Flex>
            </Flex>

            <Card style={{ width: '100%' }}>
                <Table columns={columns} />
            </Card>
        </div>
    )
}

export default TeamMembersSettings
