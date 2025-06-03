import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  User, 
  Calendar, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  FilePlus, 
  Lock, 
  Clipboard, 
  ClipboardCheck,
  Stethoscope,
  Activity,
  Pill
} from 'lucide-react';

// Mock patient data for demonstration
const mockPatients = [
  {
    id: '1',
    fullName: 'João da Silva',
    nid: '1234567890',
    birthDate: '1980-05-15',
    gender: 'M',
    accessStatus: 'granted', // Options: none, pending, granted
  },
  {
    id: '2',
    fullName: 'Maria Francisca',
    nid: '0987654321',
    birthDate: '1992-09-23',
    gender: 'F',
    accessStatus: 'pending',
  },
  {
    id: '3',
    fullName: 'Pedro Manuel',
    nid: '5678901234',
    birthDate: '1975-12-10',
    gender: 'M',
    accessStatus: 'none',
  },
];

// Mock clinical records
const mockClinicalRecords = [
  {
    id: '1',
    patientId: '1',
    date: '2023-06-15',
    professionalName: 'Dra. Ana Sousa',
    facility: 'Hospital Central',
    notes: 'Paciente apresentou pressão arterial elevada. Ajustada dosagem da medicação e recomendadas mudanças no estilo de vida. Retorno em 30 dias.',
    conditions: ['Hipertensão', 'Diabetes Tipo 2'],
    exams: ['Exame de Sangue', 'ECG', 'Exame de Urina'],
  },
  {
    id: '2',
    patientId: '1',
    date: '2023-04-10',
    professionalName: 'Dr. Carlos Domingos',
    facility: 'Centro de Saúde #5',
    notes: 'Consulta de rotina. Níveis de glicose no sangue dentro da normalidade. Renovadas prescrições das medicações atuais.',
    conditions: ['Diabetes Tipo 2'],
    exams: ['Teste de Glicose'],
  },
  {
    id: '3',
    patientId: '1',
    date: '2023-01-25',
    professionalName: 'Enf. Maria Inês',
    facility: 'Hospital Central',
    notes: 'Vacinação contra gripe sazonal. Nenhuma reação adversa observada.',
    conditions: [],
    exams: [],
  },
];

const PatientRecordsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<typeof mockPatients[0] | null>(null);
  const [records, setRecords] = useState<typeof mockClinicalRecords>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRecords, setExpandedRecords] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundPatient = mockPatients.find((p) => p.id === id);
      setPatient(foundPatient || null);
      
      if (foundPatient && foundPatient.accessStatus === 'granted') {
        setRecords(mockClinicalRecords.filter((r) => r.patientId === id));
        // Set the first record as expanded by default
        const firstRecord = mockClinicalRecords.find((r) => r.patientId === id);
        if (firstRecord) {
          setExpandedRecords({ [firstRecord.id]: true });
        }
      } else {
        setRecords([]);
      }
      
      setLoading(false);
    }, 800);
  }, [id]);

  const toggleRecordExpansion = (recordId: string) => {
    setExpandedRecords((prev) => ({
      ...prev,
      [recordId]: !prev[recordId],
    }));
  };

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

  if (patient.accessStatus === 'none' || patient.accessStatus === 'pending') {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{patient.fullName}</h1>
            <p className="text-lg text-gray-500">Prontuário do Paciente</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button
              variant="primary"
              size="lg"
              className="text-lg"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              Ver Perfil
            </Button>
          </div>
        </div>

        <Card className="text-center py-12">
          <div className="flex flex-col items-center">
            <Lock className="h-16 w-16 text-error-500 mb-6" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {patient.accessStatus === 'none' 
                ? 'Acesso Necessário' 
                : 'Solicitação de Acesso Pendente'}
            </h3>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              {patient.accessStatus === 'none'
                ? 'Você precisa solicitar acesso para visualizar o prontuário deste paciente. O paciente receberá um SMS com um código para autorizar o acesso.'
                : 'Sua solicitação de acesso está pendente. O paciente precisa fornecer o código de verificação enviado por SMS.'}
            </p>
            <Button
              variant="primary"
              size="lg"
              className="text-lg py-4 px-8"
              onClick={() => navigate(`/access-request/${patient.id}`)}
              icon={patient.accessStatus === 'none' ? <Clipboard className="h-5 w-5" /> : <ClipboardCheck className="h-5 w-5" />}
            >
              {patient.accessStatus === 'none' ? 'Solicitar Acesso' : 'Inserir Código de Verificação'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{patient.fullName}</h1>
          <p className="text-lg text-gray-500">Prontuário do Paciente</p>
        </div>
        <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="lg"
            className="text-lg"
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            Ver Perfil
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-lg"
            icon={<FilePlus className="h-5 w-5" />}
          >
            Novo Registro
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Registros Clínicos</h2>
          <Badge variant="success">Acesso Concedido</Badge>
        </div>

        {records.length > 0 ? (
          <div className="space-y-6">
            {records.map((record) => (
              <div 
                key={record.id} 
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                <div 
                  className="flex items-center justify-between px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleRecordExpansion(record.id)}
                >
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-primary-500 mr-4" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">{formatDate(record.date)}</p>
                      <p className="text-base text-gray-500">{record.facility}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="text-base font-medium">{record.professionalName}</p>
                    </div>
                    {expandedRecords[record.id] ? (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedRecords[record.id] && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <div className="mb-6">
                      <p className="font-medium text-gray-700 mb-3 text-lg">Anotações Clínicas</p>
                      <p className="text-gray-600 text-base leading-relaxed">{record.notes}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-medium text-gray-700 mb-3 text-lg flex items-center">
                          <Activity className="h-5 w-5 text-primary-500 mr-2" />
                          Condições Médicas
                        </p>
                        {record.conditions.length > 0 ? (
                          <div className="space-y-2">
                            {record.conditions.map((condition, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mr-3"></div>
                                <span className="text-base text-gray-600">{condition}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-base text-gray-500 italic">Nenhuma condição registrada</p>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-3 text-lg flex items-center">
                          <Stethoscope className="h-5 w-5 text-secondary-500 mr-2" />
                          Exames Solicitados
                        </p>
                        {record.exams.length > 0 ? (
                          <div className="space-y-2">
                            {record.exams.map((exam, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-secondary-500 mr-3"></div>
                                <span className="text-base text-gray-600">{exam}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-base text-gray-500 italic">Nenhum exame solicitado</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center">
              <FileText className="h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
              <p className="text-lg text-gray-500 mb-6">
                Este paciente ainda não possui registros clínicos.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="text-lg"
                icon={<FilePlus className="h-5 w-5" />}
              >
                Criar Novo Registro
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PatientRecordsPage;