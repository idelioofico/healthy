import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PatientSearchPage from './pages/patients/PatientSearchPage';
import PatientProfilePage from './pages/patients/PatientProfilePage';
import PatientRecordsPage from './pages/patients/PatientRecordsPage';
import AccessRequestPage from './pages/access/AccessRequestPage';
import AccessLogPage from './pages/admin/AccessLogPage';
import UsersManagementPage from './pages/admin/UsersManagementPage';
import HealthUnitsPage from './pages/admin/HealthUnitsPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRoles = [] }: { children: React.ReactNode, requiredRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRoles.length > 0 && (!user?.role || !requiredRoles.includes(user.role))) {
    return <Navigate to="/dashboard\" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login\" replace />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Patient Routes */}
          <Route path="/patients/search" element={<PatientSearchPage />} />
          <Route path="/patients/:id" element={<PatientProfilePage />} />
          <Route path="/patients/:id/records" element={<PatientRecordsPage />} />
          <Route path="/access-request/:patientId" element={<AccessRequestPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/access-logs" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AccessLogPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <UsersManagementPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/health-units" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <HealthUnitsPage />
            </ProtectedRoute>
          } />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;