import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import BookingList from './BookingList';
import DashboardLayout from "../../layouts/DashboardLayout";
import Grid from '@mui/system/Unstable_Grid/Grid';
import TableList from './TableList';
import {
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import  { useState, useEffect } from "react";
import * as Yup from "yup";
import { MenuItem, Select } from '@mui/material';
import { getMonth } from 'date-fns';
import OtherList from './OtherList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


export default function Addbooking() {

  const [value, setValue] = React.useState('1');
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1);

  const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

const handleMonthChange = (event) => {
  const selectedMonth = event.target.value;
  const year = new Date().getFullYear(); // assuming current year
  const startOfMonth = new Date(year, selectedMonth-1 , 2);
  const endOfMonth = new Date(year, selectedMonth, 1);
  setStartDate(startOfMonth.toISOString().split('T')[0]);
  setEndDate(endOfMonth.toISOString().split('T')[0]);
  setSelectedMonth(selectedMonth);
};

  
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
          const response = await axios.post('/meal/getBookingForAllEmployees', {
            startDate: startDate,
            endDate: endDate
          });
          
          // const response = await axios.post('/meal/getBookingForAllEmployees',{
          //   "startDate" : "2023-05-01",
          //   "endDate" : "2023-05-30"
          // });
          const data = response.data;
          setTableData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      setTimeout(() => {  fetchData();}
      , 500);
    }, [startDate, endDate]);

    useEffect(() => {
      const year = new Date().getFullYear(); // assuming current year
      const startOfMonth = new Date(year, selectedMonth - 1, 1);
      const endOfMonth = new Date(year, selectedMonth, 0);
      setStartDate(startOfMonth.toISOString().split('T')[0]);
      setEndDate(endOfMonth.toISOString().split('T')[0]);
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
  
    // const handleEmployeeSelect = (employeeId) => {
    //   if (selectedEmployees.includes(employeeId)) {
    //     setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    //   } else {
    //     setSelectedEmployees([...selectedEmployees, employeeId]);
    //   }
    // };

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
       <Typography sx={{mx:"13%",marginTop:"2%",marginBottom:0}} variant="h6" fontWeight={600}>
                Booking List
       </Typography>

       <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ marginLeft:16 ,borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Employee" value="1" />
            <Tab label="Others" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1">
        <FormControl  sx={{mx:"80%",marginTop:"0%",marginBottom:0}} >
  <Select
   value={selectedMonth}
    onChange={handleMonthChange}
  >
    {/* <MenuItem value={0} disabled>Select Month</MenuItem> */}
    <MenuItem value={1}>January</MenuItem>
    <MenuItem value={2}>February</MenuItem>
    <MenuItem value={3}>March</MenuItem>
    <MenuItem value={4}>April</MenuItem>
    <MenuItem value={5}>May</MenuItem>
    <MenuItem value={6}>June</MenuItem>
    <MenuItem value={7}>July</MenuItem>
    <MenuItem value={8}>August</MenuItem>
    <MenuItem value={9}>September</MenuItem>
    <MenuItem value={10}>October</MenuItem>
    <MenuItem value={11}>November</MenuItem>
    <MenuItem value={12}>December</MenuItem>
  </Select>
</FormControl>






    <TableList data={tableData}  />
        </TabPanel>
        <TabPanel value="2">
        <Grid >
      <OtherList startDate={startDate} endDate={endDate} />
    </Grid>
          </TabPanel>
      
      </TabContext>
    </Box>


</Grid>






   

     
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