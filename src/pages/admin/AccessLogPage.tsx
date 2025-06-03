import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Search, Calendar, Filter, Download } from 'lucide-react';

// Mock access logs data
const mockAccessLogs = [
  {
    id: '1',
    dateTime: '2023-06-15T10:23:45',
    professionalName: 'Dr. Ana Sousa',
    professionalRole: 'Doctor',
    patientName: 'João da Silva',
    patientId: '1234567890',
    accessType: 'view',
    facility: 'Central Hospital',
  },
  {
    id: '2',
    dateTime: '2023-06-14T14:15:30',
    professionalName: 'Dr. Carlos Domingos',
    professionalRole: 'Doctor',
    patientName: 'Maria Francisca',
    patientId: '0987654321',
    accessType: 'edit',
    facility: 'Health Center #5',
  },
  {
    id: '3',
    dateTime: '2023-06-14T09:05:12',
    professionalName: 'Nurse Maria Inês',
    professionalRole: 'Nurse',
    patientName: 'Pedro Manuel',
    patientId: '5678901234',
    accessType: 'view',
    facility: 'Central Hospital',
  },
  {
    id: '4',
    dateTime: '2023-06-13T16:45:22',
    professionalName: 'Dr. Ana Sousa',
    professionalRole: 'Doctor',
    patientName: 'João da Silva',
    patientId: '1234567890',
    accessType: 'edit',
    facility: 'Central Hospital',
  },
  {
    id: '5',
    dateTime: '2023-06-12T11:30:45',
    professionalName: 'Nurse Paulo Costa',
    professionalRole: 'Nurse',
    patientName: 'Maria Francisca',
    patientId: '0987654321',
    accessType: 'view',
    facility: 'Health Center #5',
  },
];

const AccessLogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState(mockAccessLogs);
  const [dateFilter, setDateFilter] = useState('');
  const [accessTypeFilter, setAccessTypeFilter] = useState('all');

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filteredLogs = mockAccessLogs;
    
    if (searchQuery) {
      filteredLogs = filteredLogs.filter(
        (log) =>
          log.professionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.patientId.includes(searchQuery)
      );
    }
    
    if (dateFilter) {
      filteredLogs = filteredLogs.filter((log) =>
        log.dateTime.startsWith(dateFilter)
      );
    }
    
    if (accessTypeFilter !== 'all') {
      filteredLogs = filteredLogs.filter(
        (log) => log.accessType === accessTypeFilter
      );
    }
    
    setLogs(filteredLogs);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setAccessTypeFilter('all');
    setLogs(mockAccessLogs);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Registos de Acesso</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                placeholder="Pesquisar por profissional, paciente ou NID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="col-span-1">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full"
                label="Filtro de Data"
              />
            </div>
            
            <div className="col-span-1">
              <label className="form-label">Tipo de Acesso</label>
              <select
                className="input"
                value={accessTypeFilter}
                onChange={(e) => setAccessTypeFilter(e.target.value)}
              >
                <option value="all">Todos os Tipos</option>
                <option value="view">Apenas Visualizar</option>
                <option value="edit">Acesso de Edição</option>
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
            
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={resetFilters}
              >
                Limpar Filtros
              </Button>
              
              <Button
                type="button"
                variant="secondary"
                size="md"
                icon={<Download className="h-4 w-4" />}
              >
                Exportar
              </Button>
            </div>
          </div>
        </form>
      </Card>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data e Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profissional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Acesso
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {formatDateTime(log.dateTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {log.professionalName}
                      </div>
                      <div className="text-sm text-gray-500">{log.professionalRole}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {log.patientName}
                      </div>
                      <div className="text-sm text-gray-500">NID: {log.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.facility}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={log.accessType === 'view' ? 'info' : 'warning'}
                      >
                        {log.accessType === 'view' ? 'Apenas Visualizar' : 'Acesso de Edição'}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Nenhum registo de acesso encontrado correspondente aos seus critérios de pesquisa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              A mostrar <span className="font-medium">{logs.length}</span> de{' '}
              <span className="font-medium">{mockAccessLogs.length}</span> registos
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
    </div>
  );
};

export default AccessLogPage;