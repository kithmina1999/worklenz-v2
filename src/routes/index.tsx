import { createBrowserRouter } from 'react-router-dom'
import rootRoutes from './rootRoutes'
import authRoutes from './authRoutes'
import mainRoutes from './mainRoutes'
import notFoundRoute from './notFoundRoute'
import accountSetupRoute from './accountSetupRoutes'

const router = createBrowserRouter([
    ...rootRoutes,
    ...authRoutes,
    ...mainRoutes,
    notFoundRoute,
    accountSetupRoute,
])

export default router
