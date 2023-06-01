import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const OtherList = ({startDate,endDate}) => {
  const [data, setData] = useState([]);

  console.table(startDate,endDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4000/meal/getBookingForOthers', {
          startDate: startDate, // Replace with your desired start date
          endDate: endDate, // Replace with your desired end date
        //   startDate: '2023-01-01', // Replace with your desired start date
        //   endDate: '2023-12-31', // Replace with your desired end date
        });
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const formattedData = data.flatMap((item) =>
    item.meals.flatMap((meal) =>
      meal.map((m) => ({
        id: `${item._id}-${m.type}`, // Unique identifier for the row
        date: item._id,
        mealType: m.type,
        count: m.count,
        notes: m.notes,
      }))
    )
  );

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'mealType', headerName: 'Meal Type', width: 150 },
    { field: 'count', headerName: 'Count', width: 100 },
    { field: 'notes', headerName: 'Notes', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%', margin : "100px",marginTop:58 }}>
      <DataGrid rows={formattedData} columns={columns} />
    </div>
  );
};

export default OtherList;
