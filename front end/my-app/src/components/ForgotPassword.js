import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const userValid = async () => {
    try {
      const { status } = await axios.get(`/forgotPassword/forgotPassword/${id}/${token}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (status === 200) {
        console.log('User valid');
        setLoading(false);
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error(error);
    } 
    // finally {
      
    // }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === '') {
      alert('Please enter a password');
      return;
    }

    try {
      const response = await axios.post(`/forgotPassword/resetPassword/${id}/${token}`, { password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setPassword('');
        setMessage('Password has been successfully updated.');
      } else {
        alert('Failed to update password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    userValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ textAlign: 'center', maxWidth: '400px' }}>
          {message ? (
            <>
              <Typography variant="h6" gutterBottom>
                {message}
              </Typography>
              <Button variant="contained" onClick={() => navigate("/login")}>Back to Home</Button>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Enter Your New Password
              </Typography>
              <form >
                <TextField
                  type="password"
                  label="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                />
                <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth>
                  Update Password
                </Button>
              </form>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword;
