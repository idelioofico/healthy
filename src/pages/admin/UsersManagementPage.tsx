import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { Search, UserPlus, Edit, Trash2, User, Mail, Building } from 'lucide-react';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Ana Sousa',
    email: 'ana.sousa@example.com',
    role: 'health_professional',
    profession: 'Doctor',
    healthUnit: 'Central Hospital',
    status: 'active',
  },
  {
    id: '2',
    name: 'Carlos Domingos',
    email: 'carlos.domingos@example.com',
    role: 'health_professional',
    profession: 'Doctor',
    healthUnit: 'Health Center #5',
    status: 'active',
  },
  {
    id: '3',
    name: 'Maria Inês',
    email: 'maria.ines@example.com',
    role: 'health_professional',
    profession: 'Nurse',
    healthUnit: 'Central Hospital',
    status: 'active',
  },
  {
    id: '4',
    name: 'Paulo Costa',
    email: 'paulo.costa@example.com',
    role: 'health_professional',
    profession: 'Nurse',
    healthUnit: 'Health Center #5',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    profession: 'Administrator',
    healthUnit: 'System',
    status: 'active',
  },
];

const UsersManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filteredUsers = mockUsers;
    
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.healthUnit.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (roleFilter !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
    }
    
    if (statusFilter !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.status === statusFilter);
    }
    
    setUsers(filteredUsers);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setRoleFilter('all');
    setStatusFilter('all');
    setUsers(mockUsers);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciamento de Usuários</h2>
        <Button
          variant="primary"
          icon={<UserPlus className="h-4 w-4" />}
          onClick={() => setShowAddUserModal(true)}
        >
          Adicionar Usuário
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                placeholder="Pesquisar por nome, email ou unidade"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="col-span-1">
              <label className="form-label">Papel</label>
              <select
                className="input"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Todos os Papéis</option>
                <option value="admin">Administrador</option>
                <option value="health_professional">Profissional de Saúde</option>
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="form-label">Status</label>
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Search className="h-4 w-4" />}
            >
              Pesquisar
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={resetFilters}
            >
              Limpar Filtros
            </Button>
          </div>
        </form>
      </Card>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidade de Saúde
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.profession}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={user.role === 'admin' ? 'primary' : 'secondary'}
                      >
                        {user.role === 'admin' ? 'Administrador' : 'Profissional de Saúde'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        {user.healthUnit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={user.status === 'active' ? 'success' : 'error'}
                      >
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Edit className="h-4 w-4" />}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-error-600 hover:text-error-900 border-error-200 hover:bg-error-50"
                          icon={<Trash2 className="h-4 w-4" />}
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum usuário encontrado correspondente aos seus critérios de pesquisa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              A mostrar <span className="font-medium">{users.length}</span> de{' '}
              <span className="font-medium">{mockUsers.length}</span> usuários
            </div>
            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Anterior
                </Button>
                <span className="px-2 py-1 rounded-md bg-primary-50 text-primary-600 text-sm font-medium">
                  1
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal (simplified) */}
      {showAddUserModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddUserModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Adicionar Novo Usuário</h3>
                    <div className="mt-4 space-y-4">
                      <Input label="Nome Completo" placeholder="Inserir nome completo" />
                      <Input label="Email" type="email" placeholder="Inserir endereço de email" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Papel</label>
                          <select className="input">
                            <option value="">Selecionar Papel</option>
                            <option value="admin">Administrador</option>
                            <option value="health_professional">Profissional de Saúde</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Profissão</label>
                          <select className="input">
                            <option value="">Selecionar Profissão</option>
                            <option value="doctor">Médico</option>
                            <option value="nurse">Enfermeiro</option>
                            <option value="technician">Técnico</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Unidade de Saúde</label>
                        <select className="input">
                          <option value="">Selecionar Unidade de Saúde</option>
                          <option value="1">Central Hospital</option>
                          <option value="2">Health Center #5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto sm:ml-3"
                >
                  Salvar Usuário
                </Button>
                <Button
                  variant="outline"
                  className="mt-3 w-full sm:mt-0 sm:w-auto"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagementPage;