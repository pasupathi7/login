import React, { useState } from 'react';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validation';

interface LoginFormProps {
  onSuccess: (user: any) => void;
  onSignUpClick: () => void;
}

export function LoginForm({ onSuccess, onSignUpClick }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignIn, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      return;
    }

    const user = await handleSignIn(email, password);
    if (user) {
      onSuccess(user);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input form-input-icon ${error?.field === 'email' ? 'form-error' : ''}`}
            placeholder="Email address"
            disabled={isLoading}
            required
          />
        </div>
        {error?.field === 'email' && (
          <p className="form-error-text">{error.message}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input form-input-icon ${error?.field === 'password' ? 'form-error' : ''}`}
            placeholder="Password"
            disabled={isLoading}
            required
          />
        </div>
        {error?.field === 'password' && (
          <p className="form-error-text">{error.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled={isLoading}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`btn btn-primary w-full ${isLoading ? 'btn-loading' : ''}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-blue-600 hover:text-blue-500 font-medium"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}