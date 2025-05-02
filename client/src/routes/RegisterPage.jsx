import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='h-[calc(100vh-80px)] flex items-center justify-center duration-200'>
      <div className='bg-white text-black p-10 rounded-xl shadow-xl flex flex-col gap-4'>
        <p className='font-bold'>Login with the following details for testing</p>
        <p><b>Email: </b>testuser@test.com</p>
        <p><b>Username: </b>testuser</p>
        <p><b>Password: </b>testuser_12345</p>
      </div>
      <SignUp signInUrl='/login'/>
    </div>
  )
}

export default RegisterPage