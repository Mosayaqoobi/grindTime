//Handles user authentication with Supabase
import supabase from '/supabase.js';

//function to sign up a new user
export function SignUp(email, password, username) {
    return supabase.auth.signUp({   //creates a new user
        email: email, 
        password: password
    }).then(function(result) {  //plug the result into the function
        if (result.error) { 
            return { error: result.error };   //return error message if sign up failed
        }
        var user = result.data.user;    //if sign up was successful, get the user
        if (user) { 
            return supabase
            .from('profiles')
            .insert([{id: user.id, username: username }])
            .then(function(profileResult) {
                return { data: user, error: profileResult.error };
            });
        }
        else {
            return { error: {message: "no User returned from signup"}};
        }
    });
}

//function to sign in an existing user
export function login(email, password) {
    return supabase.auth.signInWithPassword({
        email: email, 
        password: password});
}

export function logOut() {
    return supabase.auth.signOut();
}


