import { useState } from 'react';
import { signIn, AuthError } from '../utils/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(email, password);
      if ('user' in result) {
        // Success - you can add user state management here
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

  return { handleSignIn, isLoading, error };
}