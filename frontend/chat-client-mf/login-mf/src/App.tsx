import ReactDOM from "react-dom/client";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import Chat from './components/Chat';
import "./index.css";


const App = () => (
  <Router>
  <Suspense fallback={<div>Loading Chat...</div>}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </Suspense>
</Router>
  
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/chat" element={<Chat />} />

    //   </Routes>
    // </Router>
  
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);