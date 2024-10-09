import { PushpinOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input, Table, TableProps, Tooltip } from 'antd'
import React from 'react'
import { colors } from '../../../styles/colors'

const JobTitlesSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
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
                        <Button type="primary">Create Job Title</Button>
                        <Tooltip
                            title={'Click to pin this into the main menu'}
                            trigger={'hover'}
                        >
                            <Button
                                className="borderless-icon-btn"
                                icon={
                                    <PushpinOutlined
                                        style={{
                                            fontSize: 18,
                                            color: colors.skyBlue,
                                        }}
                                    />
                                }
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            }
        >
            <Table columns={columns} />
        </Card>
    )
}

export default JobTitlesSettings
