import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Handle password reset logic here
    // TODO: Implement secure API call to backend for password reset logic.

    // Clear form and error
    setEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');

    // Redirect back to the Sign In page after successful submission
    navigate('/signin');
  };

  return (
    
      Forgot Password
      Enter your email and a new password to reset your password
      {error && {error}}
      
         setEmail(e.target.value)}
          required
        />
         setNewPassword(e.target.value)}
          required
        />
         setConfirmPassword(e.target.value)}
          required
        />
        Reset Password
      
      
        Remember your password?  navigate('/signin')}>Sign In
      
    
  );
};

export default ForgotPassword;
