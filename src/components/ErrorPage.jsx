import React from 'react'
import ButtonComponent from './ButtonComponent'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div>ErrorPage <ButtonComponent onClick={()=>navigate("/")}>Go To Home Page</ButtonComponent></div>
  )
}

export default ErrorPage