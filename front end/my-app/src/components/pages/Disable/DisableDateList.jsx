import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const DisableDateList = () => {
  const [calendarDates, setCalendarDates] = useState([]);

  useEffect(() => {
    fetchCalendarDates();
  }, []);

  const fetchCalendarDates = async () => {
    try {
      const response = await axios.post("/calendar/getAllCalendarDates", {
        "pageNo": 1, // Adjust the page number and limit as needed
        "limit": 100,
      });
      setCalendarDates(response.data.data.calendarDates);
      console.log(setCalendarDates);
    } catch (error) {
      console.error("Error fetching calendar dates:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Calendar Dates</Typography>
      {calendarDates?.map((date) => (
        <div key={date._id}>
          <Typography>{date.date}</Typography>
          <Typography>{date.description}</Typography>
          <Typography>{date.createdAt}</Typography>
          <Typography>{date.updatedAt}</Typography>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DisableDateList;
