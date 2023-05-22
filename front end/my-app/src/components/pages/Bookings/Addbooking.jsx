import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BookingList from './BookingList';
import DashboardLayout from "../../layouts/DashboardLayout";
import Grid from '@mui/system/Unstable_Grid/Grid';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
 
  Radio,
  RadioGroup,
  
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
 
  Checkbox,
  Typography,
} from "@mui/material";
import axios from "axios";
import DateRangePicker from "tw-daterange";
import Datepicker from "react-tailwindcss-datepicker"; 
import  { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Addbooking() {


  
  
  
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <Grid container >
      <Grid item xs={10}>
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
        <Grid item xs={2}  sx={{ py:10,px:2}}>
    <div >
      <Button variant="contained" sx={{ px : 5, borderRadius : '17px',backgroundColor : '#E23E3F' }}  size="large" onClick={handleClickOpen}>
        Book Meal
      </Button>
      <Dialog maxWidth="md"  open={open} onClose={handleClose}>
        <DialogTitle>Meal Book</DialogTitle>
        <DialogContent>
         <BookingList/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
    </div>
    </Grid>
    </Grid>
    </DashboardLayout>
  );
}