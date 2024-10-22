import { DeleteOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-components'
import {
    Button,
    Card,
    Flex,
    Input,
    Popconfirm,
    Table,
    TableProps,
    Tooltip,
    Typography,
} from 'antd'
import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../app/store'
import { ProjectType } from '../../../types/project.types'
import { useMediaQuery } from 'react-responsive'
import './Projects.css'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { deleteProject } from '../../../features/projects/projectSlice'

const Projects: React.FC = () => {
    const themeMode = useAppSelector(
        (state: RootState) => state.themeReducer.mode
    )
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const isTablet = useMediaQuery({ query: '(min-width: 1000px)' })
    const projectList = useAppSelector(
        (state: RootState) => state.projectReducer.projectsList
    )
    const dispatch = useAppDispatch()

    const { t } = useTranslation('teams')

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    const filteredTeamsData = useMemo(() => {
        return projectList.filter((item) =>
            item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [projectList, searchTerm])

    const columns: TableProps['columns'] = [
        {
            title: 'Project name',
            key: 'projectName',
            render: (record: ProjectType) => (
                <Typography.Text
                    className="project-name"
                    style={{ fontSize: `${isTablet ? '14px' : '10px'}` }}
                >
                    {record.projectName}
                </Typography.Text>
            ),
        },
        {
            title: 'Team',
            key: 'team',
            render: (record: ProjectType) => (
                <Typography.Text
                    className="project-team"
                    style={{ fontSize: `${isTablet ? '14px' : '10px'}` }}
                >
                    {record.projectTeam}
                </Typography.Text>
            ),
        },
        {
            title: (
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    {t('membersCount')}
                </span>
            ),
            key: 'membersCount',
            render: (record: ProjectType) => (
                <Typography.Text
                    className="project-member-count"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: `${isTablet ? '14px' : '10px'}`,
                    }}
                >
                    {record.projectMemberCount}
                </Typography.Text>
            ),
        },
        {
            title: (
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    Created at
                </span>
            ),
            key: 'createdAt',
            render: (record: ProjectType) => (
                <Typography.Text
                    className="project-created-at"
                    style={{
                        display: 'flex',
                        justifyContent: 'right',
                        fontSize: `${isTablet ? '14px' : '10px'}`,
                    }}
                >
                    {new Date(record.projectCreated).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                    })}
                </Typography.Text>
            ),
        },
        {
            title: '',
            key: 'button',
            render: (record: ProjectType) => (
                <div className="row-buttons">
                    <Tooltip title={t('delete')}>
                        <Popconfirm
                            title={t('popTitle')}
                            onConfirm={() =>
                                dispatch(deleteProject(record.projectId))
                            }
                        >
                            <Button size="small">
                                <DeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
    ]

    return (
        <div style={{ width: '100%' }}>
            <PageHeader
                title={<span>Projects</span>}
                style={{ padding: '16px 0' }}
            />
            <PageHeader
                style={{
                    paddingLeft: 0,
                    paddingTop: 0,
                    paddingRight: '24px',
                    paddingBottom: '16px',
                }}
                subTitle={
                    <span
                        style={{
                            color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
                            fontWeight: 500,
                            fontSize: '16px',
                        }}
                    >
                        {filteredTeamsData.length} projects
                    </span>
                }
                extra={
                    <Flex gap={8} align="center">
                        <Tooltip title="Refresh projects">
                            <Button
                                shape="circle"
                                icon={<SyncOutlined spin={isLoading} />}
                                onClick={() => handleRefresh()}
                            />
                        </Tooltip>
                        <Input
                            placeholder="Search by project name"
                            suffix={<SearchOutlined />}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                }
            />

            <Card>
                <Table
                    rowClassName="project-table-row"
                    className="project-table"
                    columns={columns}
                    dataSource={filteredTeamsData}
                    rowKey={(record) => record.projectId}
                    pagination={{
                        showSizeChanger: true,
                        defaultPageSize: 20,
                        pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
                        size: 'small',
                    }}
                />
            </Card>
        </div>
    )
}

export default Projects
