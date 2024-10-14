import {
    BankOutlined,
    FileZipOutlined,
    GlobalOutlined,
    GroupOutlined,
    IdcardOutlined,
    NotificationOutlined,
    ProfileOutlined,
    TagsOutlined,
    TeamOutlined,
    UserOutlined,
    UserSwitchOutlined,
} from '@ant-design/icons'
import React, { ReactNode } from 'react'
import ProfileSettings from './profile/ProfileSettings'
import NotificationsSettings from './notifications/NotificationsSettings'
import ClientsSettings from './clients/ClientsSettings'
import JobTitlesSettings from './jobTitles/JobTitlesSettings'
import LabelsSettings from './labels/LabelsSettings'
import CategoriesSettings from './categories/CategoriesSettings'
import ProjectTemplatesSettings from './projectTemplates/ProjectTemplatesSettings'
import TaskTemplatesSettings from './taskTemplates/TaskTemplatesSettings'
import TeamMembersSettings from './teamMembers/TeamMembersSettings'
import TeamsSettings from './teams/TeamsSettings'
import LanguageAndRegionSettings from './languageAndRegion/LanguageAndRegionSettings'

// type of a menu item in settings sidebar
type SettingMenuItems = {
    key: string
    name: string
    endpoint: string
    icon: ReactNode
    element: ReactNode
}
// settings all element items use for sidebar and routes
export const settingsItems: SettingMenuItems[] = [
    {
        key: 'profile',
        name: 'profile',
        endpoint: 'profile',
        icon: React.createElement(UserOutlined),
        element: React.createElement(ProfileSettings),
    },
    {
        key: 'notifications',
        name: 'notifications',
        endpoint: 'notifications',
        icon: React.createElement(NotificationOutlined),
        element: React.createElement(NotificationsSettings),
    },
    {
        key: 'clients',
        name: 'clients',
        endpoint: 'clients',
        icon: React.createElement(UserSwitchOutlined),
        element: React.createElement(ClientsSettings),
    },
    {
        key: 'job-titles',
        name: 'jobTitles',
        endpoint: 'job-titles',
        icon: React.createElement(IdcardOutlined),
        element: React.createElement(JobTitlesSettings),
    },
    {
        key: 'labels',
        name: 'labels',
        endpoint: 'labels',
        icon: React.createElement(TagsOutlined),
        element: React.createElement(LabelsSettings),
    },
    {
        key: 'categories',
        name: 'categories',
        endpoint: 'categories',
        icon: React.createElement(GroupOutlined),
        element: React.createElement(CategoriesSettings),
    },
    {
        key: 'project-templates',
        name: 'projectTemplates',
        endpoint: 'project-templates',
        icon: React.createElement(FileZipOutlined),
        element: React.createElement(ProjectTemplatesSettings),
    },
    {
        key: 'task-templates',
        name: 'taskTemplates',
        endpoint: 'task-templates',
        icon: React.createElement(ProfileOutlined),
        element: React.createElement(TaskTemplatesSettings),
    },
    {
        key: 'team-members',
        name: 'teamMembers',
        endpoint: 'team-members',
        icon: React.createElement(TeamOutlined),
        element: React.createElement(TeamMembersSettings),
    },
    {
        key: 'teams',
        name: 'teams',
        endpoint: 'teams',
        icon: React.createElement(BankOutlined),
        element: React.createElement(TeamsSettings),
    },
    {
        key: 'language-and-region',
        name: 'languageAndRegion',
        endpoint: 'language-and-region',
        icon: React.createElement(GlobalOutlined),
        element: React.createElement(LanguageAndRegionSettings),
    },
]
