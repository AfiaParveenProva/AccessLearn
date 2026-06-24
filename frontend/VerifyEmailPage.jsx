import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: '80px', textAlign: 'center' }}>
      <h2>Verify Your Email</h2>
      <p>Please check your email inbox for a verification link.</p>
      <button onClick={() => navigate('/')}>Return to Homepage</button>
    </div>
  );
};

export default VerifyEmailPage;