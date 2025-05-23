import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../components/ThemeContext'

const MainLayout = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-40 duration-200'>
      <ThemeProvider>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </div>
  )
}

export default MainLayout