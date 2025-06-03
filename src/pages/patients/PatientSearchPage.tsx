import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { Search, User, Calendar, Phone, MapPin } from 'lucide-react';

// Mock patient data for demonstration
const mockPatients = [
  {
    id: '1',
    fullName: 'João da Silva',
    nid: '1234567890',
    birthDate: '1980-05-15',
    gender: 'M',
    phone: '+258 84 123 4567',
    address: 'Av. Eduardo Mondlane, Maputo',
  },
  {
    id: '2',
    fullName: 'Maria Francisca',
    nid: '0987654321',
    birthDate: '1992-09-23',
    gender: 'F',
    phone: '+258 82 765 4321',
    address: 'Rua da Paz, Beira',
  },
  {
    id: '3',
    fullName: 'Pedro Manuel',
    nid: '5678901234',
    birthDate: '1975-12-10',
    gender: 'M',
    phone: '+258 86 890 1234',
    address: 'Av. das Indústrias, Matola',
  },
];

const PatientSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Filter mock patients based on NID or name
    const results = mockPatients.filter(
      (patient) =>
        patient.nid.includes(searchQuery) ||
        patient.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="animate-fade-in">
      <Card>
        <h2 className="text-xl font-medium text-gray-900 mb-6">Busca de Pacientes</h2>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex-grow">
              <Input
                placeholder="Pesquisar por NID ou nome do paciente"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-lg"
              />
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto text-lg py-4 px-8"
                icon={<Search className="h-5 w-5" />}
              >
                Buscar
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {hasSearched && (
        <div className="mt-8">
          {searchResults.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-gray-900">
                Resultados da Busca ({searchResults.length})
              </h2>
              
              {searchResults.map((patient) => (
                <Card key={patient.id} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-medium text-gray-900">{patient.fullName}</h3>
                          <Badge 
                            variant={patient.gender === 'M' ? 'primary' : 'secondary'} 
                            className="mt-1"
                          >
                            {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-base text-gray-500">
                        <span className="font-medium mr-2">NID:</span>
                        {patient.nid}
                      </div>
                      
                      <div className="flex items-center text-base text-gray-500">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Data de Nascimento: {formatDate(patient.birthDate)}</span>
                      </div>
                      
                      <div className="flex items-center text-base text-gray-500">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{patient.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-base text-gray-500">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{patient.address}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex flex-col space-y-3">
                      <Button 
                        variant="primary"
                        size="lg"
                        className="w-full text-base"
                        onClick={() => navigate(`/patients/${patient.id}`)}
                      >
                        Ver Perfil
                      </Button>
                      <Button 
                        variant="secondary"
                        size="lg"
                        className="w-full text-base"
                        onClick={() => navigate(`/patients/${patient.id}/records`)}
                      >
                        Ver Prontuário
                      </Button>
                      <Button 
                        variant="accent"
                        size="lg"
                        className="w-full text-base"
                        onClick={() => navigate(`/access-request/${patient.id}`)}
                      >
                        Solicitar Acesso
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-6 text-center py-12">
              <div className="flex flex-col items-center">
                <Search className="h-16 w-16 text-gray-400 mb-6" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
                <p className="text-lg text-gray-500">
                  Tente pesquisar com um NID ou nome diferente
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientSearchPage;