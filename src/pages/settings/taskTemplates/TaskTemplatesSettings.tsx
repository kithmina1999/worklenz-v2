import { Card, Table, TableProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TaskTemplatesSettings = () => {
    // localization
    const { t } = useTranslation('taskTemplatesSettings')

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: t('nameColumn'),
            dataIndex: 'name',
        },
        {
            key: 'created',
            title: t('createdColumn'),
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
