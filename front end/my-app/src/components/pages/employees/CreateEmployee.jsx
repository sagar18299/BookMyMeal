// import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import React, { useState } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import { AUTH_TOKEN } from "../../../helpers/constants";



export default function CreateEmployee() {



    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      employeeId: '',
      email: '',
      mobile: '',
      department: '',
      role: '',
    });


    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleRoleChange = (event) => {
      setFormData({ ...formData, role: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      let token = localStorage.getItem(AUTH_TOKEN);
  
      axios.post('/users/createNewUser', formData)
        .then((response) => {
          // Handle successful registration
          console.log(response);
        })
        .catch((error) => {
          // Handle registration error
          console.error(error);
        });
    };


  return (
    <>
    <DashboardLayout/>
    <form onSubmit={handleSubmit}>
    <div>
      <TextField
        type="text"
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <TextField
        type="text"
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <TextField
        type="text"
        name="employeeId"
        label="Employee ID"
        value={formData.employeeId}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <TextField
        type="email"
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <TextField
        type="text"
        name="mobile"
        label="Mobile"
        value={formData.mobile}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <TextField
        type="text"
        name="department"
        label="Department"
        value={formData.department}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <RadioGroup name="role" value={formData.role} onChange={handleRoleChange} required>
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="employee" control={<Radio />} label="Employee" />
      </RadioGroup>
    </div>
    <div>
      <Button type="submit" variant="contained">Register</Button>
    </div>
  </form>
  </>
  )
}
