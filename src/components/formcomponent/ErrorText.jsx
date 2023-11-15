import React from 'react'

const ErrorText = ({children}) => {
  return (
    <p className='text-red-400 text-sm py-2'>{children}</p>
  )
}

export default ErrorText