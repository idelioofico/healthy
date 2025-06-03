import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  ClipboardList, 
  Clock, 
  ChevronRight,
  Activity,
  Heart
} from 'lucide-react';

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
    conditions: ['Hipertensão', 'Diabetes Tipo 2'],
    lastVisit: '2023-04-10',
    bloodType: 'O+',
  },
  {
    id: '2',
    fullName: 'Maria Francisca',
    nid: '0987654321',
    birthDate: '1992-09-23',
    gender: 'F',
    phone: '+258 82 765 4321',
    address: 'Rua da Paz, Beira',
    conditions: ['Asma'],
    lastVisit: '2023-05-22',
    bloodType: 'A-',
  },
  {
    id: '3',
    fullName: 'Pedro Manuel',
    nid: '5678901234',
    birthDate: '1975-12-10',
    gender: 'M',
    phone: '+258 86 890 1234',
    address: 'Av. das Indústrias, Matola',
    conditions: ['Artrite', 'Colesterol Alto'],
    lastVisit: '2023-03-15',
    bloodType: 'B+',
  },
];

// Mock access history
const mockAccessHistory = [
  { 
    id: '1', 
    professionalName: 'Dra. Ana Sousa', 
    facility: 'Hospital Central', 
    date: '2023-06-15', 
    accessType: 'view' 
  },
  { 
    id: '2', 
    professionalName: 'Dr. Carlos Domingos', 
    facility: 'Centro de Saúde #5', 
    date: '2023-05-20', 
    accessType: 'edit' 
  },
  { 
    id: '3', 
    professionalName: 'Enf. Maria Inês', 
    facility: 'Hospital Central', 
    date: '2023-04-10', 
    accessType: 'view' 
  },
];

const PatientProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<typeof mockPatients[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessHistory, setAccessHistory] = useState(mockAccessHistory);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundPatient = mockPatients.find((p) => p.id === id);
      setPatient(foundPatient || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <Card className="text-center py-12">
        <div className="flex flex-col items-center">
          <User className="h-16 w-16 text-gray-400 mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Paciente não encontrado</h3>
          <p className="text-lg text-gray-500 mb-6">
            O paciente que você está procurando não existe ou você não tem acesso.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="text-lg"
            onClick={() => navigate('/patients/search')}
          >
            Voltar à Pesquisa
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{patient.fullName}</h1>
          <p className="text-lg text-gray-500">Perfil do Paciente</p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/patients/${patient.id}/records`)}
            icon={<ClipboardList className="h-5 w-5" />}
          >
            Ver Prontuário
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(`/access-request/${patient.id}`)}
          >
            Solicitar Acesso
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Informações Pessoais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-gray-500">Nome Completo</p>
                <p className="mt-2 flex items-center text-lg">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  {patient.fullName}
                </p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">NID</p>
                <p className="mt-2 text-lg">{patient.nid}</p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">Data de Nascimento</p>
                <p className="mt-2 flex items-center text-lg">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  {formatDate(patient.birthDate)}
                </p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">Gênero</p>
                <p className="mt-2">
                  <Badge variant={patient.gender === 'M' ? 'primary' : 'secondary'}>
                    {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                  </Badge>
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-gray-500">Telefone</p>
                <p className="mt-2 flex items-center text-lg">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  {patient.phone}
                </p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">Endereço</p>
                <p className="mt-2 flex items-center text-lg">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  {patient.address}
                </p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">Última Consulta</p>
                <p className="mt-2 flex items-center text-lg">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  {formatDate(patient.lastVisit)}
                </p>
              </div>
              
              <div>
                <p className="text-base font-medium text-gray-500">Tipo Sanguíneo</p>
                <p className="mt-2 flex items-center text-lg">
                  <Heart className="h-5 w-5 text-error-500 mr-2" />
                  {patient.bloodType}
                </p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-medium text-gray-900 mb-6">Condições Médicas</h2>
          <div className="space-y-3">
            {patient.conditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Activity className="h-5 w-5 text-primary-500 mr-3" />
                <span className="text-lg">{condition}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-medium text-gray-900 mb-6">Histórico de Acesso</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Profissional
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Unidade de Saúde
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Acesso
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {entry.professionalName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {entry.facility}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base">
                    <Badge 
                      variant={entry.accessType === 'view' ? 'info' : 'warning'}
                    >
                      {entry.accessType === 'view' ? 'Visualização' : 'Edição'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PatientProfilePage;