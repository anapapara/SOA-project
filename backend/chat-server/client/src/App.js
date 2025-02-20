import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Register from './components/Register.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={
           <ProtectedRoute>
          <Chat />
          </ProtectedRoute>
        } 
          />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;