import supabase from './supabase';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

// Generate a random username
function generateRandomUsername() {
  return (
    uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '',
      style: 'capital',
      length: 2,
    }) + Math.floor(1000 + Math.random() * 9000) // e.g. BraveTiger1234
  );
}

// Sign up a new user
export async function SignUp(email, password) {
  // 1. Register user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };

  // 2. If email confirmation is required, data.user may be null. Tell user to check their email.
  const user = data.user;
  if (!user)
    return {
      error: {
        message: "Check your email to confirm registration before logging in.",
      },
    };

  // Username will be added on first login (see Login)
  return { data: user, error: null };
}

// Log in user, and ensure username is set
export async function Login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { data, error };

  // Get the authenticated user
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user)
    return { data, error: { message: "Could not fetch user after login." } };

  // See if profile exists and has username
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || !profile.username) {
    // If no username, generate and set
    const randomUsername = generateRandomUsername();
    await supabase.from('profiles').upsert([{ id: user.id, username: randomUsername }]);
    // Optionally, you can return the new username here too if needed
  }

  return { data, error: null };
}

// Log out user
export async function logOut() {
  return await supabase.auth.signOut();
}

// Set or update username
export async function setUsername(username) {
  // 1. Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: { message: "Not logged in" } };
  }

  // 2. Check for duplicate username
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .maybeSingle();

  if (existingUser && existingUser.id !== user.id) {
    return { error: { message: "Username is already taken." } };
  }

  // 3. Upsert (insert or update) the profile
  const { error } = await supabase
    .from('profiles')
    .upsert([{ id: user.id, username }]);

  return { error };
}

// Get the current user's username
export async function getCurrentUsername() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: "Not logged in" };
  }
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (error) return { error: error.message || "Could not fetch username" };
  return { username: profile?.username || null };
}