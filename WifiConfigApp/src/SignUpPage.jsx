import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WifiConfigPage() {
  const [formData, setFormData] = useState({ ssid: '', password: '', username: '' });
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnterpriseChange = (e) => {
    const checked = e.target.checked;
    setIsEnterprise(checked);
    if (checked) {
      // Clear the password field when enterprise network is selected
      setFormData(prev => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ssid || (!isEnterprise && !formData.password)) {
      setMessage('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await fetch('/wifi-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ssid: formData.ssid,
          password: formData.password,
          enterprise: isEnterprise ? 1 : 0,
          username: isEnterprise ? formData.username : ""
        }),
      });
  
      const data = await response.json(); // Parse the JSON response
  
      if (data.status === "success") {
        setMessage('WiFi setup successful! Redirecting...');
        setTimeout(() => {
          navigate('/device-config');
        }, 1500);
      } else {
        setMessage('WiFi setup failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error. Please try again. It is possible the configuration did not constitute a valid WiFi network.');
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
          Enter WiFi Credentials
        </Typography>

        <Typography variant="h6" mb={2}>
          For Enterprise Networks, check the box and enter the WiFi username.
        </Typography>

        <TextField
          label="WiFi SSID"
          name="ssid"
          variant="outlined"
          value={formData.ssid}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />

        <TextField
          label="WiFi Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />

        {isEnterprise && <TextField
          label="WiFi Username"
          name="username"
          type="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          sx={{ '& .MuiInputBase-input': { color: 'black' } }}
        />}

        <FormControlLabel
          control={<Checkbox checked={isEnterprise} onChange={handleEnterpriseChange} />}
          label="Enterprise Network"
          sx={{ mt: 1 }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Send Credentials
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

export default WifiConfigPage;
