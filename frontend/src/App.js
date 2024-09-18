import React from 'react';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard'; 
import Home from './Components/Home';
import Leaderboard from './Components/Leaderboards';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} /> {/* Default Route as Home */}
            <Route path="/leaderboard" element={<Leaderboard />} /> {/* Leaderboard Route */}
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
