import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeTogglerFunction } from '../reduxstore/authSlice'

const ThemeToggler = () => {
    const theme = useSelector(state=>state.theme)
    const dispatch = useDispatch()
    useEffect(() => {
        document.querySelector("html").classList.remove('light',"dark")
        document.querySelector("html").classList.add(theme)
    }, [theme])
    
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox"onChange={()=>dispatch(ThemeTogglerFunction())} value="" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  )
}

export default ThemeToggler