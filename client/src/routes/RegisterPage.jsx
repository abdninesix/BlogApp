import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='h-[calc(100vh-80px)] flex items-center justify-center'>
      <SignUp signInUrl='/login'/>
    </div>
  )
}

export default RegisterPage