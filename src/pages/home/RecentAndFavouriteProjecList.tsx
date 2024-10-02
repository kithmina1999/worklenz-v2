import { StarFilled, SyncOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Empty,
    Flex,
    Segmented,
    Skeleton,
    Table,
    TableProps,
    Tooltip,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { ProjectType } from '../../types/project'

const RecentAndFavouriteProjecList = () => {
    const projectsList = useAppSelector(
        (state) => state.createProjectReducer.projects
    )
    const [projectSegment, setProjectSegment] = useState<
        'Recent' | 'Favourites'
    >('Recent')
    const [isLoading, setIsLoading] = useState(false)

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    // function for handle segmaent change and render the calender
    const handleSegmentChange = (value: 'Recent' | 'Favourites') => {
        if (value === 'Recent') {
            setProjectSegment('Recent')
            handleRefresh()
        } else {
            setProjectSegment('Favourites')
            handleRefresh()
        }
    }

    // table columns
    const columns: TableProps<ProjectType>['columns'] = [
        {
            key: 'completeBtn',
            width: 24,
            render: (record: ProjectType) => <StarFilled />,
        },
        {
            key: 'name',
            render: (record: ProjectType) => (
                <Typography.Paragraph
                    style={{ margin: 0, paddingInlineEnd: 6 }}
                >
                    {record.name}
                </Typography.Paragraph>
            ),
        },
    ]

    return (
        <Card
            title={
                <Typography.Title level={5} style={{ marginBlockEnd: 0 }}>
                    Projects ({projectsList.length})
                </Typography.Title>
            }
            extra={
                <Flex gap={8} align="center">
                    <Button
                        shape="circle"
                        icon={<SyncOutlined spin={isLoading} />}
                        onClick={() => handleRefresh()}
                    />
                    <Segmented<'Recent' | 'Favourites'>
                        options={['Recent', 'Favourites']}
                        defaultValue="Recent"
                        onChange={(value: 'Recent' | 'Favourites') =>
                            handleSegmentChange(value)
                        }
                    />
                </Flex>
            }
            style={{ width: '100%' }}
        >
            {isLoading ? (
                <Skeleton />
            ) : (
                <div>
                    {projectsList.length === 0 ? (
                        <Empty
                            image="https://app.worklenz.com/assets/images/empty-box.webp"
                            imageStyle={{ height: 60 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            description={
                                <Typography.Text>
                                    You have not assigned to any project yet.
                                </Typography.Text>
                            }
                        />
                    ) : (
                        <Table
                            className="homepage-table"
                            dataSource={projectsList}
                            columns={columns}
                            showHeader={false}
                            pagination={false}
                        />
                    )}
                </div>
            )}
        </Card>
    )
}

export default RecentAndFavouriteProjecList
