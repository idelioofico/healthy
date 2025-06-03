import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  User, 
  Lock, 
  MessageSquare, 
  ClipboardCheck, 
  CheckCircle, 
  ChevronLeft, 
  Eye, 
  Edit 
} from 'lucide-react';

// Mock patient data for demonstration
const mockPatients = [
  {
    id: '1',
    fullName: 'João da Silva',
    nid: '1234567890',
    phone: '+258 84 123 4567',
  },
  {
    id: '2',
    fullName: 'Maria Francisca',
    nid: '0987654321',
    phone: '+258 82 765 4321',
  },
  {
    id: '3',
    fullName: 'Pedro Manuel',
    nid: '5678901234',
    phone: '+258 86 890 1234',
  },
];

const AccessRequestPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<typeof mockPatients[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [accessType, setAccessType] = useState<'view' | 'edit'>('view');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundPatient = mockPatients.find((p) => p.id === patientId);
      setPatient(foundPatient || null);
      setLoading(false);
    }, 500);
  }, [patientId]);

  const handleRequestAccess = () => {
    setError('');
    // Simulate sending SMS
    setTimeout(() => {
      setRequestSent(true);
    }, 1000);
  };

  const handleVerifyCode = () => {
    setError('');
    // In a real app, this would send the code to the server for verification
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    // Mock verification - in real world this would check against the server
    if (verificationCode === '123456') {
      setVerificationSuccess(true);
      // Simulate updating the patient's access status on the server
    } else {
      setError('Invalid verification code');
    }
  };

  const handleViewRecords = () => {
    navigate(`/patients/${patientId}/records`);
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
      <Card className="text-center py-8">
        <div className="flex flex-col items-center">
          <User className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Paciente não encontrado</h3>
          <p className="text-gray-500 mb-4">
            O paciente que você está procurando não existe.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate('/patients/search')}
          >
            Back to Search
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in">
      <Button
        variant="outline"
        size="sm"
        className="mb-6"
        onClick={() => navigate(`/patients/${patientId}`)}
        icon={<ChevronLeft className="h-4 w-4" />}
      >
        Voltar ao Paciente
      </Button>

      <Card>
        <div className="text-center max-w-md mx-auto">
          {!requestSent ? (
            <>
              <Lock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Solicitar Acesso</h2>
              <p className="text-gray-500 mb-6">
                Você precisa de permissão para acessar os registos de {patient.fullName}. Enviaremos um código de verificação para o telefone deles.
              </p>

              <div className="mb-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <input
                      id="access-view"
                      name="access-type"
                      type="radio"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      checked={accessType === 'view'}
                      onChange={() => setAccessType('view')}
                    />
                    <label htmlFor="access-view" className="ml-3 flex items-center cursor-pointer">
                      <Eye className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Apenas Visualizar</p>
                        <p className="text-xs text-gray-500">Pode ver os registos do paciente mas não pode modificá-los</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="access-edit"
                      name="access-type"
                      type="radio"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      checked={accessType === 'edit'}
                      onChange={() => setAccessType('edit')}
                    />
                    <label htmlFor="access-edit" className="ml-3 flex items-center cursor-pointer">
                      <Edit className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Visualizar e Editar</p>
                        <p className="text-xs text-gray-500">Pode visualizar e modificar os registos do paciente</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <p className="text-sm text-gray-500">
                  Um código de verificação será enviado para:
                </p>
                <div className="flex items-center justify-center mt-2">
                  <MessageSquare className="h-5 w-5 text-primary-500 mr-2" />
                  <p className="font-medium">{patient.phone}</p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleRequestAccess}
              >
                Enviar Código de Verificação
              </Button>
            </>
          ) : verificationSuccess ? (
            <>
              <CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Acesso Concedido!</h2>
              <p className="text-gray-500 mb-6">
                Agora você tem acesso de {accessType === 'view' ? 'apenas visualização' : 'visualização e edição'} aos registos de {patient.fullName}.
              </p>
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleViewRecords}
              >
                Visualizar Registos do Paciente
              </Button>
            </>
          ) : (
            <>
              <ClipboardCheck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Inserir Código de Verificação</h2>
              <p className="text-gray-500 mb-6">
                Um código de verificação de 6 dígitos foi enviado para {patient.phone}. Peça ao paciente para partilhar este código consigo.
              </p>

              {error && (
                <div className="rounded-md bg-error-50 p-4 mb-4">
                  <div className="flex">
                    <div>
                      <p className="text-sm text-error-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Input
                  label="Código de Verificação"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Inserir código de 6 dígitos"
                  className="text-center tracking-widest text-lg"
                  maxLength={6}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Para demonstração, use o código: 123456
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleVerifyCode}
                >
                  Verificar Código
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setRequestSent(false)}
                >
                  Cancelar
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AccessRequestPage;