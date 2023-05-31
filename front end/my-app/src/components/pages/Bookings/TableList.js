import { DataGrid } from "@mui/x-data-grid";
import * as React from 'react';
import { format } from 'date-fns';



const TableList = ({ data }) => {
    const formatDate = (date) => {
      return format(new Date(date), 'dd');
    };
    // const dataArray = Array.isArray(data) ? data : [];

    if (data.data === null || typeof data.data === "undefined") {
      return null; // Or handle the null/undefined case as needed
    }
  
    // Convert the object into an array
    const dataArray = Array.isArray(data.data) ? data.data : [data.data];

    // const dataArray = Object.values(data.data);
    console.table(dataArray);
  
    const rows = dataArray.map((item) => ({
      id: item._id,
      _id: item._id,
      userName: item.userName,
      department: item.department ,
      total: item.total,
      date: item.date.map((date) => formatDate(date)).join(', '),
    }));

    console.table(rows);
  
    const columns = [
      { field: '_id', headerName: 'ID', width: 150 },
      { field: 'userName', headerName: 'Username', width: 150 },
      { field: 'department', headerName: 'Department', width: 150 },
      { field: 'total', headerName: 'Total', width: 100 },
      { field: 'date', headerName: 'Date', width: 400 },
    ];
  
    return (
      <div style={{ height: 400, width: '100%', margin : "100px",marginTop:5 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    );
  };
  

  export default TableList;