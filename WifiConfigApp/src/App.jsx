import React from 'react';
import SignUpPage from './SignUpPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- Ensure these are imported
import DeviceConfigPage from './DeviceConfigPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/device-config" element={<DeviceConfigPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
