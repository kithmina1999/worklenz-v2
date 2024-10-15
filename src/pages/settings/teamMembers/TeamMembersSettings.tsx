import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
    SyncOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons'
import {
    Avatar,
    Badge,
    Button,
    Card,
    Flex,
    Input,
    Popconfirm,
    Skeleton,
    Table,
    TableProps,
    Tooltip,
    Typography,
} from 'antd'
import React, { useMemo, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
    deleteMember,
    toggleCreateMemberDrawer,
    toggleMemberStatus,
    toggleUpdateMemberDrawer,
} from '../../../features/settings/member/memberSlice'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { MemberType } from '../../../types/member'
import { colors } from '../../../styles/colors'
import { avatarNamesMap } from '../../../shared/constants'
import UpdateMemberDrawer from '../../../features/settings/member/UpdateMemberDrawer'

const TeamMembersSettings = () => {
    // get currently hover row
    const [hoverRow, setHoverRow] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // get currently selected member id
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(
        null
    )

    // get all members lists from redux - add member reducer
    const owner = useAppSelector((state) => state.memberReducer.owner)
    const membersList = useAppSelector(
        (state) => state.memberReducer.membersList
    )
    const dispatch = useAppDispatch()

    // all members
    const allMembersList: MemberType[] = useMemo(
        () => [owner, ...membersList],
        [owner, membersList]
    )

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    // this is for get the current string that type on search bar
    const [searchQuery, setSearchQuery] = useState<string>('')

    // function to get name
    const getMemberName = (memberId: string) => {
        const member = allMembersList.find(
            (member) => member.memberId === memberId
        )

        if (member?.memberName) {
            return member.memberName
        } else return member?.memberEmail.split('@')[0]
    }

    // function to get colors according to the role
    const getColor = (role: 'owner' | 'member' | 'admin') => {
        switch (role) {
            case 'owner':
                return colors.skyBlue
            case 'member':
                return colors.lightGray
            case 'admin':
                return colors.yellow
            default:
                return colors.darkGray
        }
    }

    // used useMemo hook for re render the list when searching
    const filteredMembersData = useMemo(() => {
        return allMembersList.filter((item) =>
            (item.memberName || item.memberEmail)
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    }, [allMembersList, searchQuery])

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'name',
            title: 'Name',
            sorter: (a, b) => a.name.length - b.name.length,
            onCell: (record) => ({
                onClick: () => {
                    setSelectedMemberId(record.memberId)
                    dispatch(toggleUpdateMemberDrawer())
                },
            }),
            render: (record: MemberType) => {
                const name = getMemberName(record.memberId) || ''

                return (
                    <Typography.Text
                        style={{
                            textTransform: 'capitalize',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            color:
                                hoverRow === record.memberId
                                    ? colors.skyBlue
                                    : colors.darkGray,
                        }}
                    >
                        <Avatar
                            style={{
                                backgroundColor:
                                    avatarNamesMap[name[0].toLocaleUpperCase()],
                                verticalAlign: 'middle',
                            }}
                        >
                            {name[0].toLocaleUpperCase()}
                        </Avatar>
                        {name}
                        {/* shows when activate status */}
                        {record.isActivate ? (
                            <Badge color={colors.limeGreen} />
                        ) : (
                            <Typography.Text
                                style={{
                                    color: colors.yellow,
                                }}
                            >
                                (Deactivated)
                            </Typography.Text>
                        )}
                    </Typography.Text>
                )
            },
        },
        {
            key: 'projects',
            title: 'Projects',
            sorter: (a, b) => a.projects - b.projects,
            onCell: (record) => ({
                onClick: () => {
                    setSelectedMemberId(record.memberId)
                    dispatch(toggleUpdateMemberDrawer())
                },
            }),
            render: (record: MemberType) => (
                <Typography.Text
                    style={{
                        color:
                            hoverRow === record.memberId
                                ? colors.skyBlue
                                : colors.darkGray,
                    }}
                >
                    0
                </Typography.Text>
            ),
        },
        {
            key: 'memberEmail',
            title: 'Email',
            sorter: (a, b) => a.memberEmail.localeCompare(b.memberEmail),
            onCell: (record) => ({
                onClick: () => {
                    setSelectedMemberId(record.memberId)
                    dispatch(toggleUpdateMemberDrawer())
                },
            }),
            render: (record: MemberType) => (
                <div>
                    <Typography.Text
                        style={{
                            color:
                                hoverRow === record.memberId
                                    ? colors.skyBlue
                                    : colors.darkGray,
                        }}
                    >
                        {record.memberEmail}
                    </Typography.Text>
                    {/* this one shown only for the pendinge members  */}
                    {!record.isInivitationAccept && (
                        <Typography.Text
                            style={{ fontSize: 12, color: colors.lightGray }}
                        >
                            (pending invitation)
                        </Typography.Text>
                    )}
                </div>
            ),
        },
        {
            key: 'memberRole',
            title: 'Team Access',
            width: 220,
            sorter: (a, b) => a.memberRole.localeCompare(b.memberRole),
            render: (record: MemberType) => (
                <Flex gap={16} align="center">
                    <Typography.Text
                        style={{
                            color: getColor(record.memberRole),
                            textTransform: 'capitalize',
                        }}
                    >
                        {record.memberRole}
                    </Typography.Text>

                    {/* action btns only show in admin and members rows  */}
                    {record.memberRole !== 'owner' &&
                        hoverRow === record.memberId && (
                            <Flex gap={8} style={{ padding: 0 }}>
                                <Tooltip title="Edit" trigger={'hover'}>
                                    <Button
                                        size="small"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setSelectedMemberId(record.memberId)
                                            dispatch(toggleUpdateMemberDrawer())
                                        }}
                                    />
                                </Tooltip>

                                <Tooltip
                                    title={
                                        record.isActivate
                                            ? 'Deactivate'
                                            : 'Activate'
                                    }
                                    trigger={'hover'}
                                >
                                    <Popconfirm
                                        title="Are you sure?"
                                        icon={
                                            <ExclamationCircleFilled
                                                style={{
                                                    color: colors.vibrantOrange,
                                                }}
                                            />
                                        }
                                        okText="Yes"
                                        cancelText="Cancel"
                                        onConfirm={() =>
                                            dispatch(toggleMemberStatus(record))
                                        }
                                    >
                                        <Button
                                            shape="default"
                                            icon={<UserSwitchOutlined />}
                                            size="small"
                                        />
                                    </Popconfirm>
                                </Tooltip>

                                <Tooltip title="Delete" trigger={'hover'}>
                                    <Popconfirm
                                        title="Are you sure?"
                                        icon={
                                            <ExclamationCircleFilled
                                                style={{
                                                    color: colors.vibrantOrange,
                                                }}
                                            />
                                        }
                                        okText="Yes"
                                        cancelText="Cancel"
                                        onConfirm={() =>
                                            dispatch(
                                                deleteMember(record.memberId)
                                            )
                                        }
                                    >
                                        <Button
                                            shape="default"
                                            icon={<DeleteOutlined />}
                                            size="small"
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            </Flex>
                        )}
                </Flex>
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
                    {filteredMembersData.length} Member
                    {filteredMembersData.length !== 1 && 's'}
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
                            onClick={() => handleRefresh()}
                        />
                    </Tooltip>
                    <Input.Search
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.currentTarget.value)}
                        placeholder="Search by name"
                        style={{ maxWidth: 200 }}
                    />
                    <Button
                        type="primary"
                        onClick={() => dispatch(toggleCreateMemberDrawer())}
                    >
                        Add Member
                    </Button>
                </Flex>
            </Flex>

            <Card style={{ width: '100%' }}>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Table
                        className="homepage-table"
                        columns={columns}
                        dataSource={filteredMembersData}
                        rowKey={(record) => record.memberId}
                        pagination={{
                            showSizeChanger: true,
                            defaultPageSize: 20,
                        }}
                        onRow={(record) => {
                            return {
                                onMouseEnter: () =>
                                    setHoverRow(record.memberId),
                                onMouseLeave: () => setHoverRow(null),
                                style: {
                                    cursor: 'pointer',
                                    height: 36,
                                },
                            }
                        }}
                    />
                )}
            </Card>

            {/* update member drawer ---> the add member drawer is in navbar */}
            <UpdateMemberDrawer selectedMemberId={selectedMemberId} />
        </div>
    )
}

export default TeamMembersSettings
