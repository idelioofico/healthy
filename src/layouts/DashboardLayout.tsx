import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  Stethoscope, 
  Home, 
  Search, 
  Users, 
  Building2, 
  ClipboardList, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navigation = [
    { name: 'Início', href: '/dashboard', icon: Home, show: true },
    { name: 'Buscar Paciente', href: '/patients/search', icon: Search, show: true },
    { name: 'Registros de Acesso', href: '/admin/access-logs', icon: ClipboardList, show: user?.role === 'admin' },
    { name: 'Usuários', href: '/admin/users', icon: Users, show: user?.role === 'admin' },
    { name: 'Unidades de Saúde', href: '/admin/health-units', icon: Building2, show: user?.role === 'admin' },
  ].filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-700 transform transition ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar menu</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <Stethoscope className="h-8 w-8 text-white" />
            <span className="ml-3 text-white font-bold text-xl">MedRecord</span>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary-800 text-white'
                      : 'text-white hover:bg-primary-600'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6 text-primary-300" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-primary-700 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Stethoscope className="h-8 w-8 text-white" />
            <span className="ml-3 text-white font-bold text-xl">MedRecord</span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-3 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-primary-800 text-white'
                      : 'text-white hover:bg-primary-600'
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6 text-primary-300" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-lg">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-medium text-gray-900">
                {navigation.find(item => isActive(item.href))?.name || 'Início'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">Ver notificações</span>
                <Bell className="h-6 w-6" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-500 mt-1">
                      {user?.role === 'health_professional' ? 'Profissional de Saúde' : user?.role === 'admin' ? 'Administrador' : 'Paciente'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <span className="sr-only">Sair</span>
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;