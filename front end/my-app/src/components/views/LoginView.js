import {
    Alert,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import {  Link,useNavigate } from "react-router-dom";
  import { login } from "../../api/users";
//   import ErrorAlert from "../ErrorAlert";
  import { loginUser } from "../../helpers/authHelper";
  
  
  const LoginView = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [serverError, setServerError] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = await login(formData);
      if (data.error) {
        setServerError(data.error);
      } else {
        loginUser(data);
        navigate("/");
      }
    };
  
    return (
      <Container maxWidth={"xs"} sx={{ mt: 10,borderColor:"#292f33",borderStyle:"solid",borderRadius:5,padding:10 }} >
        <Stack alignItems="center">
          <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
            <Link to="/" color="inherit" underline="none">
            Universe          </Link>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography color="text.secondary">
            Don't have an account yet? <Link to="/signup" >Sign Up</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  >
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              required
              id="email"
              name="email"
              onChange={handleChange}
              
            />
            <TextField
              label="Password"
              fullWidth
              required
              margin="normal"
              id="password  "
              name="password"
              onChange={handleChange}
              type="password"
            />
  
            {/* <ErrorAlert error={serverError} /> */}
            <Button type="submit" halfWidth  variant="contained" sx={{ my: 2,mx:17,borderRadius:16  }} size="large">
              Login
            </Button>
          </Box>
          {/* <Box sx={{ mt: 3 }}> */}
            {/* <Copyright /> */}
          {/* </Box> */}
        </Stack>
      </Container>
    );
  };
  
  export default LoginView;
  