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
import TableList from './TableList';
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
import  { useState, useEffect } from "react";
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
  
  const [tableData, setTableData] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('/meal2/getBookingForAllEmployees',{
            "startDate" : "2023-05-01",
            "endDate" : "2023-05-30"
          });
          const data = response.data;
          setTableData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      setTimeout(() => {  fetchData();}
      , 500);
    }, []);
  
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
  console.log(tableData);

  return (
    <DashboardLayout>
    <Grid container>
    <Grid 
     item
     xs={8}
    
     >
    <TableList data={tableData}  />
    </Grid >"
     
        <Grid item xs={2}  sx={{ py:10,px:2,mx :16,my : 5}}  >
    <Grid xs={2} >
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
    </Grid>
    </Grid>
    </Grid>
    
    </DashboardLayout>
  );
}