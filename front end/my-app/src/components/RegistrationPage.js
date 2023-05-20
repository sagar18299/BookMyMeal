import axios from 'axios';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    mobile: '',
    department: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // let token = localStorage.getItem("usercookie");
    let token = localStorage.getItem("usersdatatoken");
    
    // let token = req.cookies.token;

    // Send registration request to the backend

    axios.post("/users/createNewUser", formData)
  };

  return (
    <>
    <form >
     <div>
       <input
         type="text"
         name="firstName"
         placeholder="First Name"
         value={formData.firstName}
         onChange={handleInputChange}
       />
     </div>
     <div>
       <input
         type="text"
         name="lastName"
         placeholder="Last Name"
         value={formData.lastName}
         onChange={handleInputChange}
       />
     </div>
    <div>
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleInputChange}
        />
    </div>
     <div>
       <input
         type="email"
         name="email"
         placeholder="Email"
         value={formData.email}
         onChange={handleInputChange}
       />
     </div>
    <div>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
    </div>
    <div>
        <input
          type="text"
          name="department"
          placeholder="department"
          value={formData.department}
          onChange={handleInputChange}
        />
    </div>
     <div>
       <button type="submit" onClick={handleSubmit}>Register</button>
     </div>
    </form>
    </>
  );
};

export default RegistrationForm;
