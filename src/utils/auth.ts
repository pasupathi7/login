export interface AuthError {
  message: string;
  field?: 'email' | 'password' | 'name';
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export async function signIn(email: string, password: string): Promise<{ user: User } | AuthError> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'demo@example.com' && password === 'password123') {
    return {
      user: {
        id: '1',
        email,
        name: 'Demo User'
      }
    };
  }
  
  return {
    message: 'Invalid email or password',
    field: 'email'
  };
}

export async function signUp(name: string, email: string, password: string): Promise<{ user: User } | AuthError> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Demo validation
  if (email === 'demo@example.com') {
    return {
      message: 'Email already in use',
      field: 'email'
    };
  }

  return {
    user: {
      id: Date.now().toString(),
      email,
      name
    }
  };
}