import React from 'react';
import Navigation from '../Navigation/Navigation';

import {Outlet} from "react-router-dom";
import './Dashboard.css'; // import the styles


const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Navigation className='navigation'/>
      <div className='outlet'>
        <Outlet /> 
      </div>
    </div>
  )
}


export default Dashboard;