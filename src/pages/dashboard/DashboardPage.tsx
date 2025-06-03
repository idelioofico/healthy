import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Users, Search, ClipboardCheck, Activity } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const isProfessional = user?.role === 'health_professional';

  // Mock data for charts
  const doughnutData = {
    labels: ['Hipertensão', 'Diabetes', 'Respiratório', 'Cardíaco', 'Outros'],
    datasets: [
      {
        data: [35, 25, 15, 10, 15],
        backgroundColor: [
          'rgba(13, 110, 253, 0.7)',  // Primary
          'rgba(32, 201, 151, 0.7)',  // Secondary
          'rgba(25, 135, 84, 0.7)',   // Accent
          'rgba(255, 193, 7, 0.7)',   // Warning
          'rgba(220, 53, 69, 0.7)',   // Error
        ],
        borderColor: [
          'rgba(13, 110, 253, 1)',
          'rgba(32, 201, 151, 1)',
          'rgba(25, 135, 84, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(220, 53, 69, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Prontuários Acessados',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
      },
      {
        label: 'Novos Pacientes',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(32, 201, 151, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg px-6 py-8">
        <h1 className="text-3xl font-semibold text-gray-900">Bem-vindo, {user?.name}</h1>
        <p className="mt-2 text-lg text-gray-500">
          {isProfessional && user?.healthUnitName && `${user.healthUnitName} • `}
          {user?.role === 'admin' ? 'Administrador' : 
           user?.role === 'health_professional' ? 'Profissional de Saúde' : 'Paciente'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-lg bg-primary-100 p-4">
              <Search className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-6 w-0 flex-1">
              <dl>
                <dt className="text-lg font-medium text-gray-500">Busca de Pacientes</dt>
                <dd>
                  <div className="text-xl font-medium text-gray-900">Localizar Prontuários</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => navigate('/patients/search')}
              size="lg"
              variant="primary"
              className="w-full text-lg"
            >
              Buscar Pacientes
            </Button>
          </div>
        </Card>

        {isAdmin && (
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-lg bg-secondary-100 p-4">
                <Users className="h-8 w-8 text-secondary-600" />
              </div>
              <div className="ml-6 w-0 flex-1">
                <dl>
                  <dt className="text-lg font-medium text-gray-500">Gestão de Usuários</dt>
                  <dd>
                    <div className="text-xl font-medium text-gray-900">Gerenciar Usuários</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => navigate('/admin/users')}
                size="lg"
                variant="secondary"
                className="w-full text-lg"
              >
                Ver Usuários
              </Button>
            </div>
          </Card>
        )}

        {isAdmin && (
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-lg bg-accent-100 p-4">
                <ClipboardCheck className="h-8 w-8 text-accent-600" />
              </div>
              <div className="ml-6 w-0 flex-1">
                <dl>
                  <dt className="text-lg font-medium text-gray-500">Registros de Acesso</dt>
                  <dd>
                    <div className="text-xl font-medium text-gray-900">Ver Atividade</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => navigate('/admin/access-logs')}
                size="lg"
                variant="accent"
                className="w-full text-lg"
              >
                Ver Registros
              </Button>
            </div>
          </Card>
        )}

        {isProfessional && (
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-lg bg-warning-100 p-4">
                <Activity className="h-8 w-8 text-warning-600" />
              </div>
              <div className="ml-6 w-0 flex-1">
                <dl>
                  <dt className="text-lg font-medium text-gray-500">Atividade Recente</dt>
                  <dd>
                    <div className="text-xl font-medium text-gray-900">Seus Registros</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => {}}
                size="lg"
                variant="warning"
                className="w-full text-lg"
              >
                Ver Atividade
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card title="Distribuição de Condições Médicas">
          <div className="h-80">
            <Doughnut 
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card title="Atividade Mensal">
          <div className="h-80">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      font: {
                        size: 14
                      }
                    }
                  },
                  x: {
                    ticks: {
                      font: {
                        size: 14
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;