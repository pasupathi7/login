import { supabase } from './supabase';
import type { User } from '../types';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      message: error.message,
      field: error.message.toLowerCase().includes('password') ? 'password' : 'email',
    };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  return {
    user: {
      id: data.user.id,
      email: data.user.email!,
      name: profile?.name || '',
    },
  };
}

export async function signUp(name: string, email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return {
      message: authError.message,
      field: authError.message.toLowerCase().includes('password') ? 'password' : 'email',
    };
  }

  if (!authData.user) {
    return {
      message: 'An unexpected error occurred',
    };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: authData.user.id, name }]);

  if (profileError) {
    return {
      message: 'Failed to create profile',
    };
  }

  return {
    user: {
      id: authData.user.id,
      email: authData.user.email!,
      name,
    },
  };
}