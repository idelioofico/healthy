import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 text-center">
          <div className="flex justify-center">
            <AlertTriangle className="h-16 w-16 text-warning-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Página Não Encontrada
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg"
              icon={<Home className="h-5 w-5" />}
              onClick={() => navigate('/dashboard')}
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;