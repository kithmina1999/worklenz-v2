import {
    AppstoreOutlined,
    CreditCardOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons'
import React, { ReactNode } from 'react'
import Overview from './overview/Overview'
import Users from './users/Users'
import Teams from './teams/Teams'
import Billing from './billing/Billing'

// type of a menu item in admin center sidebar
type AdminCenterMenuItems = {
    key: number
    name: string
    endpoint: string
    icon: ReactNode
    element: ReactNode
}
// settings all element items use for sidebar and routes
export const adminCenterItems: AdminCenterMenuItems[] = [
    {
        key: 1,
        name: 'overview',
        endpoint: 'overview',
        icon: React.createElement(AppstoreOutlined),
        element: React.createElement(Overview),
    },
    {
        key: 2,
        name: 'users',
        endpoint: 'users',
        icon: React.createElement(UserOutlined),
        element: React.createElement(Users),
    },
    {
        key: 3,
        name: 'teams',
        endpoint: 'teams',
        icon: React.createElement(TeamOutlined),
        element: React.createElement(Teams),
    },
    {
        key: 4,
        name: 'billing',
        endpoint: 'billing',
        icon: React.createElement(CreditCardOutlined),
        element: React.createElement(Billing),
    },
]
