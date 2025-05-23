import supabase from './services/supabase';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Supabase connection error:', error.message);
      } else {
        console.log('Supabase connected ✅');
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>Welcome to GrindTime 📚⏱️</h1>
      <p>Your group study productivity tracker.</p>
    </div>
  );
}

export default App;