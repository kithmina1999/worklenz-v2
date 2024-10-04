import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import AuthLayout from './layouts/AuthLayout'
import ThemeWrapper from './features/theme/ThemeWrapper'
import PreferenceSelector from './components/PreferenceSelector'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/home/Homepage'
import AccountSetup from './pages/accountSetup/AccountSetup'

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                {/* Default redirect to login page */}
                <Route index element={<Navigate to="/auth/login" replace />} />

                {/* auth routes */}
                <Route path={'/auth'} element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/signup" element={<SignupPage />} />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPasswordPage />}
                    />
                </Route>

                <Route path='worklenz/setup' element={<AccountSetup />}/>

                {/* main pages routes */}
                <Route path="/worklenz" element={<MainLayout />}>
                    <Route path="/worklenz/home" element={<Homepage />} />
                </Route>

                {/* not found pages */}
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    )
    return (
        <ThemeWrapper>
            <RouterProvider router={router} />
            <PreferenceSelector />
        </ThemeWrapper>
    )
}

export default App
