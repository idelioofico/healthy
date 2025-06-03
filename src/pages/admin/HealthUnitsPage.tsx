import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { Search, PlusCircle, Edit, Trash2, MapPin, Building, Users } from 'lucide-react';

// Mock health units data
const mockHealthUnits = [
  {
    id: '1',
    name: 'Central Hospital',
    province: 'Maputo',
    type: 'Hospital',
    staffCount: 120,
    status: 'active',
  },
  {
    id: '2',
    name: 'Health Center #5',
    province: 'Maputo',
    type: 'Health Center',
    staffCount: 45,
    status: 'active',
  },
  {
    id: '3',
    name: 'Rural Clinic Boane',
    province: 'Maputo',
    type: 'Clinic',
    staffCount: 15,
    status: 'active',
  },
  {
    id: '4',
    name: 'Beira Provincial Hospital',
    province: 'Sofala',
    type: 'Hospital',
    staffCount: 95,
    status: 'active',
  },
  {
    id: '5',
    name: 'Matola Health Post',
    province: 'Maputo',
    type: 'Health Post',
    staffCount: 8,
    status: 'inactive',
  },
];

const HealthUnitsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [healthUnits, setHealthUnits] = useState(mockHealthUnits);
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    let filteredUnits = mockHealthUnits;
    
    if (searchQuery) {
      filteredUnits = filteredUnits.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (provinceFilter !== 'all') {
      filteredUnits = filteredUnits.filter((unit) => unit.province === provinceFilter);
    }
    
    if (typeFilter !== 'all') {
      filteredUnits = filteredUnits.filter((unit) => unit.type === typeFilter);
    }
    
    setHealthUnits(filteredUnits);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setProvinceFilter('all');
    setTypeFilter('all');
    setHealthUnits(mockHealthUnits);
  };

  const provinces = [...new Set(mockHealthUnits.map((unit) => unit.province))];
  const types = [...new Set(mockHealthUnits.map((unit) => unit.type))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Unidades de Saúde</h2>
        <Button
          variant="primary"
          icon={<PlusCircle className="h-4 w-4" />}
          onClick={() => setShowAddUnitModal(true)}
        >
          Adicionar Unidade de Saúde
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Input
                placeholder="Pesquisar por nome da unidade de saúde"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="col-span-1">
              <label className="form-label">Província</label>
              <select
                className="input"
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
              >
                <option value="all">Todas as Províncias</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="form-label">Tipo</label>
              <select
                className="input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Todos os Tipos</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
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
                  Unidade de Saúde
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Província
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pessoal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {healthUnits.length > 0 ? (
                healthUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Building className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{unit.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        {unit.province}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          unit.type === 'Hospital' ? 'primary' :
                          unit.type === 'Health Center' ? 'secondary' :
                          unit.type === 'Clinic' ? 'accent' : 'gray'
                        }
                      >
                        {unit.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        {unit.staffCount} pessoal
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={unit.status === 'active' ? 'success' : 'error'}
                      >
                        {unit.status === 'active' ? 'Ativo' : 'Inativo'}
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
                    Nenhuma unidade de saúde encontrada correspondente aos seus critérios de pesquisa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              A mostrar <span className="font-medium">{healthUnits.length}</span> de{' '}
              <span className="font-medium">{mockHealthUnits.length}</span> unidades de saúde
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

      {/* Adicionar Modal de Unidade de Saúde (simplificado) */}
      {showAddUnitModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddUnitModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Adicionar Unidade de Saúde</h3>
                    <div className="mt-4 space-y-4">
                      <Input label="Nome" placeholder="Inserir nome da unidade de saúde" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Província</label>
                          <select className="input">
                            <option value="">Selecionar Província</option>
                            {provinces.map((province) => (
                              <option key={province} value={province}>
                                {province}
                              </option>
                            ))}
                            <option value="new">Outra Província</option>
                          </select>
                        </div>
                        <div>
                          <label className="form-label">Tipo</label>
                          <select className="input">
                            <option value="">Selecionar Tipo</option>
                            {types.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <Input label="Endereço" placeholder="Inserir endereço" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto sm:ml-3"
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  className="mt-3 w-full sm:mt-0 sm:w-auto"
                  onClick={() => setShowAddUnitModal(false)}
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

export default HealthUnitsPage;