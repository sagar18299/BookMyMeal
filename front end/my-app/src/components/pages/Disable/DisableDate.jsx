import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Container, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DisableDate = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDisabledList = async (paginationModel) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/calendar/getAllCalendarDates",
        {
          pageNo: paginationModel.page,
          limit: paginationModel.pageSize,
        }
      );

      setRows(
        data.data.caledarDates.map((item) => ({ ...item, id: item._id }))
      );
      setTotalRows(data.data.total);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      date: null,
      description: "",
    },
    onSubmit: async (values) => {
      const data = {
        date: values.date,
        description: values.description,
      };

      try {
        const response = await axios.post("/calendar/disableDate", data);

        if (response.status === 200) {
          // API call was successful
          // Perform any additional actions or show success message
        } else {
          // API call failed
          // Handle the error, show error message, or perform necessary actions
        }
      } catch (error) {
        // Handle any error that occurred during the API call
        console.error("API Error:", error);
        // Show error message or perform necessary actions
      }
    },
  });

  useEffect(() => {

     setTimeout(() => {getDisabledList(paginationModel);
     }, 1000);
  }, [paginationModel]);

  return (
    <>
      <DashboardLayout>
        <Container>
          <Grid container spacing={4} sx={{ py: 4 }}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6" fontWeight={600}>
                Disable Dates
              </Typography>
              <Button   sx={{  borderRadius:"17px", px:"50px", py:"10px"}} variant="contained" onClick={handleOpen}>
                Add Date
              </Button>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                pagination={true}
                autoHeight
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={totalRows}
                columns={[
                  {
                    field: "date",
                    headerName: "Date",
                    minWidth: 200,
                    valueFormatter: ({ value }) =>
                      new Date(value).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        weekday: "long",
                      }),
                  },
                  {
                    field: "description",
                    headerName: "Reason",
                    flex: 1,
                  },
                ]}
                rows={rows}
              />
            </Grid>
          </Grid>
        </Container>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Disable Date</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid my={2} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="date"
                    value={formik.values.date}
                    onChange={(date) => formik.setFieldValue("date", date)}
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
              <Grid align="center">
                <Button
                  sx={{  borderRadius:"17px", px:"50px"}}
                  type="submit"
                  variant="contained"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </>
  );
};

export default DisableDate;
