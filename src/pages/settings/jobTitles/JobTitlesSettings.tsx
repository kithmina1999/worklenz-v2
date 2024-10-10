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
import React, { useMemo, useState } from 'react'
import { colors } from '../../../styles/colors'
import CreateJobTitlesDrawer from '../../../features/settings/job/CreateJobTitlesDrawer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from '../../../features/settings/job/jobSlice'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { JobType } from '../../../types/job'

const JobTitlesSettings = () => {
    // get data from job reducer
    const jobTitlesList = useAppSelector((state) => state.jobReducer.jobsList)
    const dispatch = useAppDispatch()
    // this is for get the current string that type on search bar
    const [searchQuery, setSearchQuery] = useState('')

    const filteredJobTitlesData = useMemo(() => {
        return jobTitlesList.filter((item) =>
            item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [jobTitlesList, searchQuery])

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'jobTitle',
            title: 'Name',
            sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
            render: (record: JobType) => (
                <Typography.Text>{record.jobTitle}</Typography.Text>
            ),
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
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.currentTarget.value)
                            }
                            placeholder="Search by name"
                            style={{ maxWidth: 200 }}
                        />
                        <Button
                            type="primary"
                            onClick={() => dispatch(toggleDrawer())}
                        >
                            Create Job Title
                        </Button>
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
                className="homepage-table"
                dataSource={filteredJobTitlesData}
                columns={columns}
                rowKey={(record) => record.jobId}
            />
            {/* create job title drawer  */}
            <CreateJobTitlesDrawer />
        </Card>
    )
}

export default JobTitlesSettings
