import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, loginUser } from '../../stores/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);
      
      if (result) {
        login(result.user, result.token);
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-error-50 p-4">
          <div className="flex">
            <div>
              <p className="text-sm text-error-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <Input
          label="Endereço de Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          icon={<Mail className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div>
        <Input
          label="Senha"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          icon={<Lock className="h-5 w-5 text-gray-400" />}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-base text-gray-900">
            Lembrar-me
          </label>
        </div>

        <div className="text-base">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full py-4 text-lg"
          isLoading={isLoading}
        >
          Entrar
        </Button>
      </div>

      <div className="text-base text-center text-gray-600">
        <p>Credenciais de Demonstração:</p>
        <p className="mt-2">Admin: admin@example.com / password</p>
        <p className="mt-1">Médico: doctor@example.com / password</p>
      </div>
    </form>
  );
};

export default LoginPage;