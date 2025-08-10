import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScanDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scan } = location.state || {}; // Get scan data passed via navigation

  if (!scan) {
    return No scan data found.;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scan? This action is irreversible."
    );
    if (confirmDelete) {
      try {
        // SECURITY: Sensitive data operations should be handled by a secure backend.
        // This simulates an API call to delete the scan data from a secure database.
        // Storing and manipulating Protected Health Information (PHI) in localStorage is a major security risk.
        const response = await fetch(`/api/scans/${scan.id}`, {
          method: 'DELETE',
          headers: {
            // Include authorization headers as needed, e.g., 'Authorization': `Bearer ${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        alert('Scan successfully deleted.');
        // On success, navigate back. The list component should re-fetch its data to reflect the deletion.
        navigate('/medical-scans');

      } catch (error) {
        console.error('Failed to delete scan:', error);
        alert('There was an error deleting the scan. Please try again.');
      }
    }
  };

  return (
    
      Scan Details
      
        {scan.name}
        Type of Cancer: {scan.type}
        Patient Name: {scan.patientName}
        Severity: {scan.severity}
        Date: {scan.date}
        Doctor: {scan.doctor}
      

      
         navigate(-1)} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white' }}>
          Go Back
        
        
          Delete Scan
        
      
    
  );
};

export default ScanDetails;
