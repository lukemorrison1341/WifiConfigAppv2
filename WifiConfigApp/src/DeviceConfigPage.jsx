import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';



function DeviceConfigPage() {
  const [formData, setFormData] = useState({ device_name: '', username: '', user_password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.device_name || !formData.username || !formData.user_password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/device-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Device configuration successful!');
        // Optionally, route to another page or perform additional actions.
      } else {
        setMessage('Device configuration failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
          width: '100%',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" mb={2}>
          Configure Device
        </Typography>
       

        <TextField
          label="Device Name"
          name="device_name"
          variant="outlined"
          value={formData.device_name}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />

        <TextField
          label="Username"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />

        <TextField
          label="User Password"
          name="user_password"
          type="password"
          variant="outlined"
          value={formData.user_password}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save Configuration
        </Button>

        {message && (
          <Typography variant="body1" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default DeviceConfigPage;
