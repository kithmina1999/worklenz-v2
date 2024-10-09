import { Card, Table, TableProps } from 'antd'
import React from 'react'

const ProjectTemplatesSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
        },
    ]

    return (
        <Card style={{ width: '100%' }}>
            <Table columns={columns} />
        </Card>
    )
}

export default ProjectTemplatesSettings
