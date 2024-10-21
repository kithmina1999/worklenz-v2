import React from 'react'
import { RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Homepage from '../pages/home/Homepage'
import ProjectList from '../pages/projects/ProjectList'
import ProjectView from '../pages/projects/projectView/ProjectView'
import settingsRoutes from './settingsRoutes'
import adminCenterRoutes from './adminCenterRoutes'

const mainRoutes: RouteObject[] = [
    {
        path: '/worklenz',
        element: <MainLayout />,
        children: [
            { path: 'home', element: <Homepage /> },
            { path: 'projects', element: <ProjectList /> },
            { path: 'projects/project-view', element: <ProjectView /> },
            ...settingsRoutes,
            ...adminCenterRoutes,
        ],
    },
]

export default mainRoutes
