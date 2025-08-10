import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic validation
    if (!email || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    try {
      // This is a placeholder for the actual API call.
      // In a real application, you would send the email and newPassword
      // to your backend server over HTTPS to handle the password reset logic securely.
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        // Handle server-side errors (e.g., user not found, invalid request)
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password.');
      }

      // On successful submission, you might show a success message
      // before redirecting.
      alert('Password has been reset successfully. Redirecting to sign in...');
      
      // Redirect back to the Sign In page after successful submission
      navigate('/signin');

    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear password fields for security, but maybe not email for user convenience
      setNewPassword('');
      setConfirmPassword('');
    }
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
        
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        
      
      
        Remember your password?  navigate('/signin')}>Sign In
      
    
  );
};

export default ForgotPassword;
