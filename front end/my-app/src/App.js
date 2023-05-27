import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/auth/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";
import { isLoggedIn, getAccessToken } from "./helpers/authHelper";
import axios from "axios";
import CreateEmployee from "./components/pages/employees/CreateEmployee";
import Dashboard from "./components/pages/dashboard/Dashboard";
import BookingList from "./components/pages/Bookings/BookingList";
import Addbooking from "./components/pages/Bookings/Addbooking";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Error from "./components/Error";
import DisableDate from "./components/pages/Disable/DisableDate";
import { Box, CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /** If user is loggged in, set default headers */
    if (isLoggedIn()) {
      axios.defaults.headers.common["Authorization"] = getAccessToken();
    }

    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Toaster />
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route
            path="/forgotpassword/:id/:token"
            element={<ForgotPassword />}
          />
          <Route path="*" element={<Error />} />
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
                <Addbooking />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/employees/Disable"
            element={
              <PrivateRoute>
                <DisableDate />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}
export default App;
