import React from 'react'
import MuiCalendar from 'react-mui-calendar';

export default function Calendar({data, onChange}) {
    const handleClick = ({ day, month, year }) => {
        onChange(new Date(year, month - 1, day));
    }

    return (
        <MuiCalendar 
            primaryColor="#0a0a0a"
            secondaryColor="#FFFFFF"
            
            data={data} 
            dataDisplay="list"
            handleClickDay={handleClick}
        />
    );
}
