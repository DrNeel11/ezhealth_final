import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      const response = await fetch('http://127.0.0.1:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }

      alert('Signup successful!');
      navigate('/signin');
    } catch (error) {
      setError(error.message || 'An error occurred during signup');
    }
  };


  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    
      Create account
      Join us and start exploring
      {error && {error}}
      
        
        
        
        
        
           I agree to the Terms of Service and Privacy Policy
        
        Create account
      
      Already have an account? Sign in
    
  );
};

export default Signup;
