import { CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Calendar from "./Calendar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Box, borderRadius } from "@mui/system";
import { format, getDate, getMonth, getYear } from "date-fns";
import Calendar2 from "./Calendar2";

const getColor = (type) => {
  switch (type) {
    case "warning":
      return "#3E68F6";
    case "success":
      return "#16CE5C";
    case "error":
      return "#DD5635";
  }

  return "#3a3a3a";
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);

  const findById = (countData, id) => {
    console.log(countData, id);
    return countData.find((item) => item._id === id);
  };

  const calendarData = useMemo(() => {
    if (!data) return null;

    return [
      {
        content: `Employee : ${findById(data, "employee")?.total || 0}`,
        type: "warning",
      },
      {
        content: `Non Employee : ${findById(data, "non-employee")?.count || 0}`,
        type: "error",
      },
      {
        content: `Custom : ${findById(data, "custom")?.count || 0}`,
        type: "success",
      },
    ];
  }, [data]);

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
              <Calendar2 data={calendarData} date={date} onChange={setDate} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Meal Plan : {format(date, "yyyy-MM-dd")}
              </Typography>
            </CardContent>
            <CardContent>
              {calendarData.map((item, index) => (
                <Typography
                  key={index}
                  style={{
                    backgroundColor: getColor(item.type),
                    margin: "5px",
                    borderRadius: "10px",
                    padding: "20px",
                    color: "white",
                  }}
                >
                  {item.content}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
