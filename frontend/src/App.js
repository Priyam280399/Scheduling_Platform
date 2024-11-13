// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Schedule from './components/Schedule';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/schedule" element={<Schedule/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
