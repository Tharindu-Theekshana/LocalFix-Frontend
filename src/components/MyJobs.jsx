import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function MyJobs() {

    const location = useLocation();
    const status = location.state?.status;

  return (
    <>
    <Navbar/>
    <div className='pt-16'>

    </div>
    </>
  )
}
