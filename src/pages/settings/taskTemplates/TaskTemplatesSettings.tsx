import { Card, Table, TableProps } from 'antd'
import React from 'react'

const TaskTemplatesSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: 'created',
            title: 'Created',
            dataIndex: 'created',
        },
    ]

    return (
        <Card style={{ width: '100%' }}>
            <Table columns={columns} />
        </Card>
    )
}

export default TaskTemplatesSettings
