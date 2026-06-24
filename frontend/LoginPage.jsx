// src/pages/LoginPage.js
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      await login(email, password);
    } catch {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{
          marginBottom: '2rem',
          color: '#2563eb',
          fontSize: '2rem',
          fontWeight: '600'
        }}>Welcome Back</h2>
        
        {error && <div style={{
          color: '#dc2626',
          margin: '1rem 0',
          padding: '0.75rem',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: '#4b5563'
        }}>
          Don't have an account? <Link 
            to="/register" 
            style={{
              color: '#2563eb',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;