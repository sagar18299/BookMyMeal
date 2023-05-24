// // // import React from 'react'
// // import DashboardLayout from '../../layouts/DashboardLayout'
// // import React, { useState } from 'react';
// // import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// // import axios from 'axios';
// // import { AUTH_TOKEN } from "../../../helpers/constants";



// // export default function CreateEmployee() {



// //     const [formData, setFormData] = useState({
// //       firstName: '',
// //       lastName: '',
// //       employeeId: '',
// //       email: '',
// //       mobile: '',
// //       department: '',
// //       role: '',
// //     });


// //     const handleInputChange = (event) => {
// //       const { name, value } = event.target;
// //       setFormData({ ...formData, [name]: value });
// //     };
  
// //     const handleRoleChange = (event) => {
// //       setFormData({ ...formData, role: event.target.value });
// //     };
  
// //     const handleSubmit = (event) => {
// //       event.preventDefault();
  
// //       let token = localStorage.getItem(AUTH_TOKEN);
  
// //       axios.post('/users/createNewUser', formData)
// //         .then((response) => {
// //           // Handle successful registration
// //           console.log(response);
// //         })
// //         .catch((error) => {
// //           // Handle registration error
// //           console.error(error);
// //         });
// //     };


// //   return (
// //     <>
// //     <DashboardLayout/>
// //     <form onSubmit={handleSubmit}>
// //     <Grid>
// //       <TextField
// //         type="text"
// //         name="firstName"
// //         label="First Name"
// //         value={formData.firstName}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <TextField
// //         type="text"
// //         name="lastName"
// //         label="Last Name"
// //         value={formData.lastName}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <TextField
// //         type="text"
// //         name="employeeId"
// //         label="Employee ID"
// //         value={formData.employeeId}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <TextField
// //         type="email"
// //         name="email"
// //         label="Email"
// //         value={formData.email}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <TextField
// //         type="text"
// //         name="mobile"
// //         label="Mobile"
// //         value={formData.mobile}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <TextField
// //         type="text"
// //         name="department"
// //         label="Department"
// //         value={formData.department}
// //         onChange={handleInputChange}
// //         required
// //       />
// //     </Grid>
// //     <Grid>
// //       <RadioGroup name="role" value={formData.role} onChange={handleRoleChange} required>
// //         <FormControlLabel value="admin" control={<Radio />} label="Admin" />
// //         <FormControlLabel value="employee" control={<Radio />} label="Employee" />
// //       </RadioGroup>
// //     </Grid>
// //     <Grid>
// //       <Button type="submit" variant="contained">Register</Button>
// //     </Grid>
// //   </form>
// //   </>
// //   )
// // }


// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import {  RadioGroup,FormControlLabel, Radio, Button } from "@mui/material";
// import DashboardLayout from '../../layouts/DashboardLayout';
// import axios from 'axios';

// const CreateEmployee = () => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     employeeId: '',
//     email: '',
//     mobile: '',
//     department: '',
//     role: 'admin', // Default role set to "admin"
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add your form submission logic here
//     //let token = localStorage.getItem(AUTH_TOKEN);
  
//     axios.post('/users/createNewUser', formData)
//       .then((response) => {
//         // Handle successful registration
//         console.log(response);
//       })
//       .catch((error) => {
//         // Handle registration error
//         console.error(error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleRoleChange = (event) => {
//     const { value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       role: value,
//     }));
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <DashboardLayout />
//       <Button variant="contained" onClick={handleOpen}>Open Dialog</Button>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Register</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <Grid>
//               <TextField
//                 type="text"
//                 name="firstName"
//                 label="First Name"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <TextField
//                 type="text"
//                 name="lastName"
//                 label="Last Name"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <TextField
//                 type="text"
//                 name="employeeId"
//                 label="Employee ID"
//                 value={formData.employeeId}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <TextField
//                 type="email"
//                 name="email"
//                 label="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <TextField
//                 type="text"
//                 name="mobile"
//                 label="Mobile"
//                 value={formData.mobile}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <TextField
//                 type="text"
//                 name="department"
//                 label="Department"
//                 value={formData.department}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//             <Grid>
//               <RadioGroup name="role" value={formData.role} onChange={handleRoleChange} required>
//                 <FormControlLabel value="admin" control={<Radio />} label="Admin" />
//                 <FormControlLabel value="employee" control={<Radio />} label="Employee" />
//               </RadioGroup>
//             </Grid>
//             <Grid>
//               <Button type="submit" variant="contained">Register</Button>
//             </Grid>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default CreateEmployee ;


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {  RadioGroup,FormControlLabel, Radio, Button, Grid} from "@mui/material";
import DashboardLayout from '../../layouts/DashboardLayout';
import axios from 'axios';

const CreateEmployee = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    mobile: '',
    department: '',
    role: 'admin', // Default role set to "admin"
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    //let token = localStorage.getItem(AUTH_TOKEN);
  
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: value,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DashboardLayout />
     
      
      <Button variant="contained" onClick={handleOpen}>Create User</Button>
      
      <Dialog  fullWidth={"100%"}
        maxWidth={'md'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2} >
      <Grid item xs={12} marginY={"25px"} py={"30px"} >
            <Grid>
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                name="employeeId"
                label="Employee ID"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                name="mobile"
                label="Mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                name="department"
                label="Department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid>
              <RadioGroup name="role" value={formData.role} onChange={handleRoleChange} required>
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                <FormControlLabel value="employee" control={<Radio />} label="Employee" />
              </RadioGroup>
            </Grid>
            <Grid>
              <Button type="submit" variant="contained">Register</Button>
            </Grid>
            </Grid  >
      </Grid >
          </form>
        </DialogContent>
      </Dialog>
      
      
    </>
  );
};

export default CreateEmployee ;