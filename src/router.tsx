import { createBrowserRouter } from 'react-router'
import { RootLayout } from './components/layout/RootLayout'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: '/', Component: HomePage },
      { path: '/login', Component: LoginPage },
      { path: '/register', Component: RegisterPage },
      { path: '/checkout', Component: CheckoutPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
