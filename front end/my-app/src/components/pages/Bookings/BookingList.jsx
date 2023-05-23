import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";

import axios from "axios";
import DateRangePicker from "tw-daterange";
// import Datepicker from "react-tailwindcss-datepicker"; 



const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  mealType: Yup.string().required("Meal type is required"),
  notes: Yup.string().when("category", {
    is: "Non-Employee",
    then: Yup.string().required("Notes is required"),
  }),
  bookingCount: Yup.number().when("category", {
    is: "Non-Employee",
    then: Yup.number().required("Booking count is required").positive(),
  }),
});

const Form = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const response = await axios.get("/employees/getemployee"); 
      setEmployeeList(response.data.data.employees);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      mealType: "",
      notes: "",
      count: "",
      startDate: null,
      endDate: null
    },
    onSubmit: async (values) => {
      const payload = {
        startDate: values.startDate,
        endDate: values.endDate,
        type: values.category.toLowerCase(),
        mealType: values.mealType.toLowerCase(),
        employeeIds: selectedEmployees,
        count: values.count,
        notes: values.notes
      };
      try {
        const response = await axios.post(
          "/meal2/createMeal2Bookings",
          payload
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error creating meal bookings:", error);
      }

      }
    });


  

  const { category, mealType, notes, count,startDate, endDate } = formik.values;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
              row
              name="category"
              value={category}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="Employee"
                control={<Radio />}
                label="Employees"
              />
              <FormControlLabel
                value="Non-Employee"
                control={<Radio />}
                label="Non-Employees"
              />
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label="Custom Booking"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Meal Type</FormLabel>
            <RadioGroup
              row
              name="mealType"
              value={mealType}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="Lunch"
                control={<Radio />}
                label="Lunch"
              />
              <FormControlLabel
                value="Dinner"
                control={<Radio />}
                label="Dinner"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        <Grid item >
          <FormControl component="fieldset">
            <FormLabel component="legend">Date</FormLabel>
            <DateRangePicker
        initialRange={formik.values}
        onUpdate={(dateRange) => {
          formik.setFieldValue("startDate", dateRange.startDate);
          formik.setFieldValue("endDate", dateRange.endDate);
        }}
      /> 
          </FormControl>
        </Grid>

        {(category === "Non-Employee" || category === "Custom") && (
          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notes"
              multiline
              rows={4}
              value={notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
            />
          </Grid>
        )}

        {(category === "Non-Employee" || category === "Custom") && (
          <Grid item xs={12}>
            <TextField
              name="count"
              label="Booking Count"
              type="number"
              value={count}
              onChange={formik.handleChange}
              error={
                formik.touched.count &&
                Boolean(formik.errors.count)
              }
              helperText={
                formik.touched.count && formik.errors.count
              }
            />
          </Grid>
        )}

        {category === "Employee" && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(employeeList || []).map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell>
                        <Checkbox
                          checked={selectedEmployees.includes(
                            employee.employeeId
                          )}
                          onChange={() =>
                            handleEmployeeSelect(employee.employeeId)
                          }
                        />
                      </TableCell>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;


// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   Radio,
//   RadioGroup,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Checkbox,
//   Typography,
// } from "@mui/material";

// import axios from "axios";
// import DateRangePicker from "tw-daterange";
// import Datepicker from "react-tailwindcss-datepicker";

// const validationSchema = Yup.object().shape({
//   category: Yup.string().required("Category is required"),
//   mealType: Yup.string().required("Meal type is required"),
//   notes: Yup.string().when("category", {
//     is: "Non-Employee",
//     then: Yup.string().required("Notes is required"),
//     otherwise: Yup.string()
//   }),
//   bookingCount: Yup.number().when("category", {
//     is: "Non-Employee",
//     then: Yup.number().required("Booking count is required").positive(),
//     otherwise: Yup.number()
//   }),
//   startDate: Yup.date().nullable().required("Start date is required"),
//   endDate: Yup.date().nullable().required("End date is required"),
//   employeeIds: Yup.array().when("category", {
//     is: "Employees",
//     then: Yup.array().required("Please select at least one employee"),
//     otherwise: Yup.array()
//   })
// });


// const Form = () => {
//   const [employeeList, setEmployeeList] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);

//   useEffect(() => {
//     fetchEmployeeList();
//   }, []);

//   const fetchEmployeeList = async () => {
//     try {
//       const response = await axios.get("/employees/getemployee");
//       setEmployeeList(response.data.data.employees);
//     } catch (error) {
//       console.error("Error fetching employee list:", error);
//     }
//   };

//   const handleEmployeeSelect = (employeeId) => {
//     if (selectedEmployees.includes(employeeId)) {
//       setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
//     } else {
//       setSelectedEmployees([...selectedEmployees, employeeId]);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       category: "",
//       mealType: "",
//       notes: "",
//       bookingCount: "",
//       startDate: null,
//       endDate: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const payload = {
//         startDate: values.startDate,
//         endDate: values.endDate,
//         type: values.category.toLowerCase(),
//         mealType: values.mealType.toLowerCase(),
//         employeeIds: selectedEmployees,
//       };

//       console.log("Payload:", JSON.stringify(payload, null, 2));
//     },
//   });

//   const {
//     category,
//     mealType,
//     notes,
//     bookingCount,
//     startDate,
//     endDate,
//   } = formik.values;

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Category</FormLabel>
//             <RadioGroup
//               row
//               name="category"
//               value={category}
//               onChange={formik.handleChange}
//             >
//               <FormControlLabel
//                 value="Employees"
//                 control={<Radio />}
//                 label="Employees"
//               />
//               <FormControlLabel
//                 value="Non-Employee"
//                 control={<Radio />}
//                 label="Non-Employees"
//               />
//               <FormControlLabel
//                 value="Custom Booking"
//                 control={<Radio />}
//                 label="Custom Booking"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12}>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Meal Type</FormLabel>
//             <RadioGroup
//               row
//               name="mealType"
//               value={mealType}
//               onChange={formik.handleChange}
//             >
//               <FormControlLabel
//                 value="Lunch"
//                 control={<Radio />}
//                 label="Lunch"
//               />
//               <FormControlLabel
//                 value="Dinner"
//                 control={<Radio />}
//                 label="Dinner"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>

//         <Grid item>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Date</FormLabel>
//             <DateRangePicker
//               initialRange={formik.values}
//               onUpdate={(dateRange) => {
//                 formik.setFieldValue("startDate", dateRange.startDate);
//                 formik.setFieldValue("endDate", dateRange.endDate);
//               }}
//             />
//           </FormControl>
//         </Grid>

//         {(category === "Non-Employee" || category === "Custom Booking") && (
//           <Grid item xs={12}>
//             <TextField
//               name="notes"
//               label="Notes"
//               multiline
//               rows={4}
//               value={notes}
//               onChange={formik.handleChange}
//               error={formik.touched.notes && Boolean(formik.errors.notes)}
//               helperText={formik.touched.notes && formik.errors.notes}
//             />
//           </Grid>
//         )}

//         {(category === "Non-Employee" || category === "Custom Booking") && (
//           <Grid item xs={12}>
//             <TextField
//               name="bookingCount"
//               label="Booking Count"
//               type="number"
//               value={bookingCount}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.bookingCount &&
//                 Boolean(formik.errors.bookingCount)
//               }
//               helperText={
//                 formik.touched.bookingCount && formik.errors.bookingCount
//               }
//             />
//           </Grid>
//         )}

//         {category === "Employees" && (
//           <Grid item xs={12}>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Select</TableCell>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Email</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {(employeeList || []).map((employee) => (
//                     <TableRow key={employee.employeeId}>
//                       <TableCell>
//                         <Checkbox
//                           checked={selectedEmployees.includes(
//                             employee.employeeId
//                           )}
//                           onChange={() =>
//                             handleEmployeeSelect(employee.employeeId)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>{employee.employeeId}</TableCell>
//                       <TableCell>{employee.firstName}</TableCell>
//                       <TableCell>{employee.email}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>
//         )}

//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" type="submit">
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default Form;











