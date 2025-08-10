import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store the access token
      localStorage.setItem('token', data.access_token);

      navigate('/home', { replace: true });
      
    } catch (error) {
      console.error('Error during sign in:', error);
      setError(error.message || 'An error occurred during sign in');
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    
      Welcome back
      Sign in to continue your journey
      {error && {error}}
      
        
        
        
          
             Remember me
          
          Forgot password?
        
        Sign In
      
      Don't have an account?  navigate('/signup')}>Sign up
    
  );
};

export default SignIn;
