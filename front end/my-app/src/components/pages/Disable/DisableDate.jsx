import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DateRangePicker from "tw-daterange";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from 'axios';
import { useFormik } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/system/Unstable_Grid/Grid';
import DisableDateList from './DisableDateList';


const DisableDate = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      date: null,
      description: '',
    },
    onSubmit: async (values) => {
      const data = {
        date: values.date,
        description: values.description,
      };

      try {
        const response = await axios.post('/calendar/disableDate', data);

        if (response.status === 200) {
          // API call was successful
          // Perform any additional actions or show success message
        } else {
          // API call failed
          // Handle the error, show error message, or perform necessary actions
        }
      } catch (error) {
        // Handle any error that occurred during the API call
        console.error('API Error:', error);
        // Show error message or perform necessary actions
      }
    },
  });

  return (
    <>
      <DashboardLayout />
      <Grid container>
        <Grid item xs={12} md={6}>
          <DisableDateList/>
        </Grid>

      </Grid>
      
      <Button variant="contained" onClick={handleOpen}>Disable Date</Button>
      <Dialog align={"center"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Disable Date</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
        
            <Grid my={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="date"
                  value={formik.values.date}
                  onChange={(date) => formik.setFieldValue('date', date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid my={2}>
              <TextField
                type="text"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid my={2}>
              <Button
                type="submit"
                variant="contained"
                

                sx={{ mx:6,px : 5, borderRadius : '17px'}}
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </Button>
            </Grid>
            </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      
    </>
  );
};

export default DisableDate;
