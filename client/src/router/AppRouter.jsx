import { Route, Routes, Navigate } from 'react-router-dom'

import Auth from '../pages/auth/Auth'
import Dashboard from '../pages/dashboard/Dashboard'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
