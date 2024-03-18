import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    contactInfo: '',
  });
 
  const navigate = useNavigate(); // Use useNavigate
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3000/api/users/signup', formData);
    if (response.status === 201) {
      console.log(response.data);
      navigate('/signup-success'); // Redirect using navigate
    }
  } catch (error) {
    if (!error.response) {
      console.error('Network error or no response from server');
      window.alert('Network error or no response from server');
      return;
    }
    // Check the status code of the response
    switch (error.response.status) {
      case 400:
        // Duplicate email error
        console.error('Duplicate email:', error.response.data.message);
        window.alert('This email is already in use. Please use a different email.');
        break;
      case 500:
        // Form not fully filled error
        console.error('Form error:', error.response.data.message);
        window.alert('Please fill out all required fields.');
        break;
      default:
        // Handle other errors
        console.error('Error signing up:', error.response.data.message);
        window.alert('An unexpected error occurred. Please try again.');
    }
  }
};
 

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
      <input type="text" name="contactInfo" placeholder="Contact Info" value={formData.contactInfo} onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};
 
export default SignUpForm;