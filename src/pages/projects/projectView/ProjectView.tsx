import {
    ArrowLeftOutlined,
    BellOutlined,
    ClockCircleOutlined,
    DownOutlined,
    EditOutlined,
    PushpinFilled,
    PushpinOutlined,
    SaveOutlined,
    SettingOutlined,
    SyncOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@ant-design/pro-components'
import {
    Button,
    ConfigProvider,
    Dropdown,
    Flex,
    Tabs,
    TabsProps,
    Tooltip,
    Typography,
} from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../../styles/colors'
import { tabItems } from './projectViewConstants'
import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '../../../utils/localStorageFunctions'
import { useSelectedProject } from '../../../hooks/useSelectedProject'
import ProjectMemberInviteButton from '../../../features/projects/singleProject/members/ProjectMemberInviteButton'
import ProjectMemberDrawer from '../../../features/projects/singleProject/members/ProjectMemberDrawer'
import { useDocumentTitle } from '../../../hooks/useDoumentTItle'

const ProjectView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // useSelectedProject custom hook returns currently selected project
    const selectedProject = useSelectedProject()

    // document title with useDocument title custom hook
    useDocumentTitle(`${selectedProject?.projectName}`)

    const navigate = useNavigate()

    // function for handle refresh
    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    const pinToDefaultTab = (itemKey: string) => {
        const currentlyPinnedTab = getFromLocalStorage('pinnedTab')

        if (currentlyPinnedTab !== itemKey) {
            saveToLocalStorage('pinnedTab', itemKey)
        } else {
            saveToLocalStorage('pinnedTab', currentlyPinnedTab)
        }
    }

    type TabItem = Required<TabsProps>['items'][number]

    const tabMenuItems: TabItem[] = [
        ...tabItems.map((item) => ({
            key: item.key,
            label: (
                <Flex align="center" style={{ color: colors.skyBlue }}>
                    {item.name}{' '}
                    {item.isPinShow && (
                        <ConfigProvider wave={{ disabled: true }}>
                            <Button
                                className="borderless-icon-btn"
                                icon={
                                    getFromLocalStorage('pinnedTab') ===
                                    item.key ? (
                                        <PushpinFilled
                                            style={{
                                                color: colors.skyBlue,
                                                rotate: '-45deg',
                                                transition:
                                                    'transform ease-in 300ms',
                                            }}
                                        />
                                    ) : (
                                        <PushpinOutlined
                                            style={{
                                                color: colors.skyBlue,
                                            }}
                                        />
                                    )
                                }
                                onClick={() => pinToDefaultTab(item.key)}
                            />
                        </ConfigProvider>
                    )}
                </Flex>
            ),
            children: item.element,
        })),
    ]

    // create task button items
    const items = [
        {
            key: '1',
            label: (
                <div style={{ width: '100%', margin: 0, padding: 0 }}>l</div>
            ),
        },
    ]

    return (
        <div style={{ marginBlock: 76, minHeight: '90vh' }}>
            <PageHeader
                className="site-page-header"
                title={
                    <Flex gap={8} align="center">
                        <ArrowLeftOutlined
                            style={{ fontSize: 16 }}
                            onClick={() => navigate(-1)}
                        />
                        <Typography.Title
                            level={4}
                            style={{ marginBlockEnd: 0, marginInlineStart: 12 }}
                        >
                            {selectedProject?.projectName}
                        </Typography.Title>
                        {/* status  */}
                        <ClockCircleOutlined
                            style={{ fontSize: 14, color: colors.lightGray }}
                        />
                    </Flex>
                }
                style={{ padding: 0, marginBlockEnd: 24 }}
                extra={
                    <Flex gap={8} align="center">
                        <Tooltip title={'Refresh project'} trigger={'hover'}>
                            <Button
                                shape="circle"
                                icon={<SyncOutlined spin={isLoading} />}
                                onClick={() => handleRefresh()}
                            />
                        </Tooltip>

                        <Tooltip title={'Save as template'} trigger={'hover'}>
                            <Button shape="circle" icon={<SaveOutlined />} />
                        </Tooltip>

                        <Tooltip title={'Project settings'} trigger={'hover'}>
                            <Button shape="circle" icon={<SettingOutlined />} />
                        </Tooltip>

                        <Tooltip
                            title={'Receive a project summary every evening.'}
                            trigger={'hover'}
                        >
                            <Button shape="round" icon={<BellOutlined />}>
                                Subscribe
                            </Button>
                        </Tooltip>

                        <ProjectMemberInviteButton />

                        <Dropdown.Button
                            type="primary"
                            icon={<DownOutlined />}
                            menu={{ items }}
                        >
                            <EditOutlined /> Create Task
                        </Dropdown.Button>
                    </Flex>
                }
            />
            <Tabs
                defaultActiveKey={getFromLocalStorage('pinnedTab')}
                items={tabMenuItems}
            />
            {/* drawers  */}
            {/* add project members drawer */}
            <ProjectMemberDrawer />
        </div>
    )
}

export default ProjectView
