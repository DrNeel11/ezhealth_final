import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./updateprofile.css";
import BottomNavBar from "./BottomNavBar";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        const token = localStorage.getItem("token");
    
        if (!token) {
            navigate("/signin");
            return;
        }
    
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/update-profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
    
            if (response.status === 401) {
                localStorage.removeItem("token");  // Force logout
                navigate("/signin");
                return;
            }
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.detail || "Update failed");
            }
    
            setSuccess("Profile updated successfully!");
            setFormData({ currentPassword: "", newPassword: "" });
    
            setTimeout(() => {
                navigate("/profile");
            }, 1500);
        } catch (error) {
            setError(error.message || "An error occurred during updating");
        }
    };
    

    return (
        
            Update Profile
            {error && {error}}
            {success && {success}}
            
                Current Password:
                

                New Password:
                

                Update
            
            
        
    );
};

export default UpdateProfile;
