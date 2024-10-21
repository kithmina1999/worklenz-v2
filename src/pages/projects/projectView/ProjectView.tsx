import { PushpinFilled, PushpinOutlined } from '@ant-design/icons'

import { Button, ConfigProvider, Flex, Tabs, TabsProps } from 'antd'
import React from 'react'

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

const ProjectView = () => {
    // useSelectedProject custom hook returns currently selected project
    const selectedProject = useSelectedProject()

    // document title with useDocument title custom hook
    useDocumentTitle(`${selectedProject?.projectName}`)

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

    return (
        <div style={{ marginBlock: 76, minHeight: '80vh' }}>
            {/* page header for the project view  */}
            <ProjectViewHeader />

            {/* tabs  */}
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
