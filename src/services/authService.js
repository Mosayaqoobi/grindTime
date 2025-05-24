import supabase from './supabase';

// Sign up a new user and insert username into profiles table
export async function SignUp(email, password) {
  // 1. Register user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };

  // 2. If email confirmation is required, data.user may be null. Tell user to check their email.
  const user = data.user;
  if (!user) return { error: { message: "Check your email to confirm registration before logging in." } };
  return { data: user, error: null };
}

// Log in
export async function Login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Log out
export async function logOut() {
  return await supabase.auth.signOut();
}