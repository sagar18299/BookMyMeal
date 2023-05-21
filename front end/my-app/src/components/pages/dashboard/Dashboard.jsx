import { CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Box } from "@mui/system";
import { format, getDate, getMonth, getYear } from "date-fns";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);

  
  const findById = (countData, id) => {
    console.log(countData, id);
    return countData.find(item => item._id === id);
  }


  const calendarData = useMemo(() => {
    if (!data) return null;

    const dateDetails = {
      day: getDate(date),
      month: getMonth(date) + 1,
      year: getYear(date),
    };


    return [
      {
        ...dateDetails,
        name: `Employee : ${findById(data, 'employee')?.total || 0}`,
        color: "purple",
      },
      {
        ...dateDetails,
        name: `Non Employee : ${findById(data, 'non-employee')?.count || 0}`,
        color: "red",
      },
      {
        ...dateDetails,
        name: `Custom : ${findById(data, 'custom')?.count || 0}`,
        color: "green",
      },
    ];
  }, [data, date]);

  const getMealData = async (date) => {
    try {
      const { data: response } = await axios.post(
        "/meal2/getMeal2BookingsByDateAggregation",
        {
          date: date,
        }
      );

      setData(response.data);

      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    if (date) {
        console.log("DATE", date)
        getMealData(format(date, "yyyy-MM-dd"));
    }
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!data) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log("CA", calendarData)

  return (
    <DashboardLayout>
      <Grid container>
        <Grid item xs={12} sx={{ px: 8, py: 4 }}>
          <Typography variant="h6">Calendar</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ px: 8 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Calendar data={calendarData} onChange={setDate} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
                <Typography variant="h6">Meal Plan</Typography>
                
            </CardContent>
            <CardContent>
                <Typography variant="h6">Meal Plan</Typography>
                
            </CardContent>
            <CardContent>
                <Typography variant="h6">Meal Plan</Typography>
                
            </CardContent>
            <CardContent>
                <Typography variant="h6">Meal Plan</Typography>
                
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
