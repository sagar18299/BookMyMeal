import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/auth/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { isLoggedIn, getAccessToken } from "./helpers/authHelper";
import axios from "axios";
import CreateEmployee from "./components/pages/employees/CreateEmployee";
import Dashboard from "./components/pages/dashboard/Dashboard";
import BookingList from "./components/pages/Bookings/BookingList";
import Addbooking from "./components/pages/Bookings/Addbooking";

function App() {
  useEffect(() => {
    /** If user is loggged in, set default headers */
    if (isLoggedIn()) {
      axios.defaults.headers.common["Authorization"] = getAccessToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
       

        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/employees/create"
          element={
            <PrivateRoute>
              <CreateEmployee />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/employees/Booking"
          element={
            <PrivateRoute>
              <Addbooking/>
            </PrivateRoute>
          }
        ></Route>

        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
