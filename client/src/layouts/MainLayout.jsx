import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout