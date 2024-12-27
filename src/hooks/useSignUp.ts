import { useState } from 'react';
import { signUp, AuthError, User } from '../utils/auth';

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const handleSignUp = async (name: string, email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp(name, email, password);
      if ('user' in result) {
        return result.user;
      } else {
        setError(result);
        return null;
      }
    } catch (err) {
      setError({ message: 'An unexpected error occurred' });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, isLoading, error };
}