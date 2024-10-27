import { PushpinFilled, PushpinOutlined } from '@ant-design/icons'

import { Button, ConfigProvider, Flex, Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'

import { colors } from '../../../styles/colors'
import { tabItems } from '../../../lib/project/projectViewConstants'
import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '../../../utils/localStorageFunctions'
import { useSelectedProject } from '../../../hooks/useSelectedProject'
import ProjectMemberDrawer from '../../../features/projects/singleProject/members/ProjectMemberDrawer'
import { useDocumentTitle } from '../../../hooks/useDoumentTItle'
import ProjectViewHeader from './ProjectViewHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import CreateTaskDrawer from '../../../features/tasks/taskCreationAndUpdate/CreateTaskDrawer'
import UpdateTaskDrawer from '../../../features/tasks/taskCreationAndUpdate/UpdateTaskDrawer'

const ProjectView = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // useSelectedProject custom hook returns currently selected project
    const selectedProject = useSelectedProject()

    // document title with useDocument title custom hook
    useDocumentTitle(`${selectedProject?.projectName}`)

    // state to track the active and pinned tab
    const [activeTab, setActiveTab] = useState<string>(
        getFromLocalStorage('pinnedTab') || 'taskList'
    )

    const [pinnedTab, setPinnedTab] = useState<string>(
        getFromLocalStorage('pinnedTab') || ''
    )

    // set query params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const tabFromUrl = queryParams.get('tab')
        const pinnedTabFromUrl = queryParams.get('pinned_tab')

        if (tabFromUrl && tabFromUrl !== activeTab) {
            setActiveTab(tabFromUrl)
        }

        if (pinnedTabFromUrl && pinnedTabFromUrl !== activeTab) {
            setPinnedTab(pinnedTabFromUrl)
        }
    }, [activeTab, pinnedTab, location.search])

    // function for pin a tab and update url
    const pinToDefaultTab = (itemKey: string) => {
        setPinnedTab(itemKey)

        saveToLocalStorage('pinnedTab', itemKey)
        navigate(`${location.pathname}?tab=${activeTab}&pinned_tab=${itemKey}`)
    }

    // function to handle tab change
    const handleTabChange = (key: string) => {
        setActiveTab(key)

        navigate(`${location.pathname}?tab=${key}&pinned_tab=${pinnedTab}`)
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

    return (
        <div style={{ marginBlock: 80, minHeight: '80vh' }}>
            {/* page header for the project view  */}
            <ProjectViewHeader />

            {/* tabs  */}
            <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={tabMenuItems}
            />
            {/* drawers  */}
            {/* add project members drawer */}
            <ProjectMemberDrawer />
            {/* create task drawer  */}
            <CreateTaskDrawer />
        </div>
    )
}

export default ProjectView
