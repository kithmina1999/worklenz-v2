import { SyncOutlined } from '@ant-design/icons'
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
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from '../../../features/navbar/addMember/addMemberSlice'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { MemberType } from '../../../types/member'
import { colors } from '../../../styles/colors'

const TeamMembersSettings = () => {
    const dispatch = useAppDispatch()
    // get team member list from redux - add member reducer
    const membersList = useAppSelector(
        (state) => state.addMemberReducer.membersList
    )

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            key: 'projects',
            title: 'Projects',
            dataIndex: 'projects',
            sorter: (a, b) => a.projects.length - b.projects.length,
        },
        {
            key: 'memberEmail',
            title: 'Email',
            sorter: (a, b) => a.memberEmail.localeCompare(b.memberEmail),
            render: (record: MemberType) => (
                <Typography.Text>{record.memberEmail}</Typography.Text>
            ),
        },
        {
            key: 'memberRole',
            title: 'Team Access',
            sorter: (a, b) => a.memberRole.localeCompare(b.memberRole),
            render: (record: MemberType) => (
                <Typography.Text
                    style={{
                        color: colors.skyBlue,
                        textTransform: 'capitalize',
                    }}
                >
                    {record.memberRole}
                </Typography.Text>
            ),
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
                    {membersList.length} Member{membersList.length !== 1 && 's'}
                </Typography.Title>

                <Flex
                    gap={8}
                    align="center"
                    justify="flex-end"
                    style={{ width: '100%', maxWidth: 400 }}
                >
                    <Tooltip
                        title={'Click to pin this into the main menu'}
                        trigger={'hover'}
                    >
                        <Button
                            shape="circle"
                            icon={<SyncOutlined />}
                            // onClick={() => handleRefresh()}
                        />
                    </Tooltip>
                    <Input.Search
                        placeholder="Search by name"
                        style={{ maxWidth: 200 }}
                    />
                    <Button
                        type="primary"
                        onClick={() => dispatch(toggleDrawer())}
                    >
                        Add Member
                    </Button>
                </Flex>
            </Flex>

            <Card style={{ width: '100%' }}>
                <Table
                    className="homepage-table"
                    columns={columns}
                    dataSource={membersList}
                    rowKey={(record) => record.memberId}
                />
            </Card>
        </div>
    )
}

export default TeamMembersSettings
