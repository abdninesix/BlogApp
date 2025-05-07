import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext';

const ThemeButton = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='items-center flex'>
      <div onClick={toggleTheme} className='h-5 w-5 flex-none rounded-full cursor-pointer bg-yellow-400 dark:bg-yellow-200'>
        <div className='h-0 w-0 dark:h-4 dark:w-4 rounded-full bg-slate-900'/>
      </div>
    </div>
    
  )
}

export default ThemeButton