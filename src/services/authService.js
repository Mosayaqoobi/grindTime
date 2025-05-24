// Handles user authentication with Supabase
import supabase from './supabase';

//sign up a new user
export async function SignUp(email, password) {
    return await supabase.auth.signUp({
        email, password
    });
}

// sign in a current user
export async function Login(email, password) {
  const {data, error } = await supabase.auth.signInWithPassword({
    email, 
    password
  });
  return {data, error};
}

//log out the current user
export async function logOut() {
  return await supabase.auth.signOut();
}
//set username 

export async function setUsername(username) {
    // checks if the username already exists
    const {data: existingUser} = await supabase 
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle(); //a single row or null if none exists

    if (existingUser) {
        return {error: {message: "username already exists"} };
    }
    //calls upsert which updates or inserts a new profile if it exists or not
    const {error} = await supabase  
    .from("profiles")
    .upsert([{id: useRevalidator, username}]);

    return {error};
}