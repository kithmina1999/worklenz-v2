import { PushpinOutlined } from '@ant-design/icons'
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
import { colors } from '../../../styles/colors'

const LabelsSettings = () => {
    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'label',
            title: 'Label',
            dataIndex: 'label',
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
            <Table
                locale={{
                    emptyText: (
                        <Typography.Text>
                            Labels can be created while updating or creating
                            tasks.
                        </Typography.Text>
                    ),
                }}
                columns={columns}
            />
        </Card>
    )
}

export default LabelsSettings
