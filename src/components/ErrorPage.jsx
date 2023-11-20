import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ButtonComponent} from "./index"

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div>ErrorPage <ButtonComponent onClick={()=>navigate("/")}>Go To Home Page</ButtonComponent></div>
  )
}

export default ErrorPage