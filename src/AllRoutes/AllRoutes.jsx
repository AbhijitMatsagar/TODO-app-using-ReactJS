import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
      </Routes>
    </>
  )
}

export default AllRoutes
