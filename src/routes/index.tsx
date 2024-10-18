import { createBrowserRouter } from 'react-router-dom'
import rootRoutes from './rootRoutes'
import authRoutes from './authRoutes'
import mainRoutes from './mainRoutes'
import notFoundRoute from './notFoundRoute'

const router = createBrowserRouter([
    ...rootRoutes,
    ...authRoutes,
    ...mainRoutes,
    notFoundRoute,
])

export default router
