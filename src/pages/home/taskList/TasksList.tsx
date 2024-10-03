import { SyncOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Flex,
    Segmented,
    Select,
    Typography,
    Tooltip,
} from 'antd'
import React, { useState } from 'react'
import ListView from './ListView'
import CalendarView from './CalendarView'

const TasksList = () => {
    const [listView, setListView] = useState<'List' | 'Calendar'>('List')
    const [isLoading, setIsLoading] = useState(false)

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    // function for handle segmaent change and render the calender
    const handleSegmentChange = (value: 'List' | 'Calendar') => {
        if (value === 'Calendar') {
            setListView('Calendar')
            handleRefresh()
        } else {
            setListView('List')
            handleRefresh()
        }
    }

    return (
        <Card
            title={
                <Flex gap={8} align="center">
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        Tasks
                    </Typography.Title>
                    <Select
                        defaultValue="assigned to me"
                        options={[
                            {
                                value: 'assigned to me',
                                label: 'assigned to me',
                            },
                            {
                                value: 'assigned by me',
                                label: 'assigned by me',
                            },
                        ]}
                    />
                </Flex>
            }
            extra={
                <Flex gap={8} align="center">
                    <Tooltip title={'Refresh'} trigger={'hover'}>
                        <Button
                            shape="circle"
                            icon={<SyncOutlined spin={isLoading} />}
                            onClick={() => handleRefresh()}
                        />
                    </Tooltip>
                    <Segmented<'List' | 'Calendar'>
                        options={['List', 'Calendar']}
                        defaultValue="List"
                        onChange={(value: 'List' | 'Calendar') =>
                            handleSegmentChange(value)
                        }
                    />
                </Flex>
            }
            style={{ width: '100%' }}
        >
            {/* toggle task view list / calendar */}
            {listView === 'List' ? <ListView /> : <CalendarView />}
        </Card>
    )
}

export default TasksList
