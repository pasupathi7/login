import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { LogIn, UserPlus } from 'lucide-react';
import { User } from './utils/auth';

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSuccess = (user: User) => {
    console.log('Authentication successful:', user);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            {isSignUp ? (
              <UserPlus className="h-8 w-8 text-blue-600" />
            ) : (
              <LogIn className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Sign up to get started' : 'Please sign in to your account'}
          </p>
        </div>

        {isSignUp ? (
          <SignUpForm 
            onSuccess={handleSuccess}
            onSignInClick={() => setIsSignUp(false)}
          />
        ) : (
          <LoginForm 
            onSuccess={handleSuccess}
            onSignUpClick={() => setIsSignUp(true)}
          />
        )}
      </div>
    </div>
  );
}