import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const userSession = data.session;
      setSession(userSession);
      setLoading(false);

      if (!userSession) {
        navigate("/"); // redirect to Sign Up if not signed in
      }
    });
  }, []);

  if (loading) {
    return <p style={{ padding: "2rem", color: "white" }}>Checking login...</p>;
  }

  return children;
}

export default ProtectedRoute;