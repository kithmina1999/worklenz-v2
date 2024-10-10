import { Card, Flex, Input, Table, TableProps, Typography } from 'antd'
import React from 'react'

const CategoriesSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
        },
        {
            key: 'associatedTask',
            title: 'Associated Task',
            dataIndex: 'associatedTask',
        },
    ]

    return (
        <Card
            style={{ width: '100%' }}
            title={
                <Flex justify="flex-end">
                    <Flex
                        gap={8}
                        align="center"
                        justify="flex-end"
                        style={{ width: '100%', maxWidth: 400 }}
                    >
                        <Input.Search
                            placeholder="Search by name"
                            style={{ maxWidth: 200 }}
                        />
                    </Flex>
                </Flex>
            }
        >
            <Table
                locale={{
                    emptyText: (
                        <Typography.Text>
                            Categories can be created while updating or creating
                            projects.
                        </Typography.Text>
                    ),
                }}
                columns={columns}
            />
        </Card>
    )
}

export default CategoriesSettings
