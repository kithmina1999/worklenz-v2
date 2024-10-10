import { PushpinOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Flex,
    Table,
    TableProps,
    Tooltip,
    Typography,
} from 'antd'
import { colors } from '../../../styles/colors'

const TeamsSettings = () => {
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
        {
            key: 'ownsBy',
            title: 'Owns By',
            dataIndex: 'ownsBy',
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
                    0 Teams
                </Typography.Title>

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

            <Card style={{ width: '100%' }}>
                <Table columns={columns} />
            </Card>
        </div>
    )
}

export default TeamsSettings
