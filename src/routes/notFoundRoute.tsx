import React from 'react'
import { RouteObject } from 'react-router-dom'
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'

const notFoundRoute: RouteObject = {
    path: '*',
    element: <NotFoundPage />,
}

export default notFoundRoute
