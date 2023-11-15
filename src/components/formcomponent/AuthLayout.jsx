import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({children,authentication = true}) => {
    const navigate = useNavigate()
    const status = useSelector(state=>state.status)
    useEffect(() => {
     if(authentication && status !== authentication){
        navigate('/login')
    }else if(status && authentication == status){
        navigate(".")
    }
      
    }, [status,navigate])
    
  return (
    <>{children}</>
  )
}

export default AuthLayout