// src/pages/RegisterPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [passwordError, setPasswordError] = useState('');
  const { register, error, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');

    try {
      await register(email, password);
    } catch {
      // Error is handled in AuthContext
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
        }}>Register</h2>
        
        {error && <div style={{
          color: '#dc2626',
          margin: '1rem 0',
          padding: '0.75rem',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>{error}</div>}
        
        {passwordError && <div style={{
          color: '#dc2626',
          margin: '1rem 0',
          padding: '0.75rem',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>{passwordError}</div>}
        
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
              fontSize: '1rem',
              transition: 'all 0.2s ease'
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
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            style={{
              width: '100%',
              padding: '0.875rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
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
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: '#4b5563'
        }}>
          Already have an account? <Link 
            to="/login" 
            style={{
              color: '#2563eb',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;