import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ButtonComponent} from "./index"

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center flex-col h-[100dvh] dark:bg-gray-900'>
      <h2 className='text-3xl md:text-4xl pb-3 dark:text-white'>404 Not Found</h2>
      <ButtonComponent className="max-w-max"  onClick={()=>navigate("/")}>Go To Home Page</ButtonComponent></div>
  )
}

export default ErrorPage