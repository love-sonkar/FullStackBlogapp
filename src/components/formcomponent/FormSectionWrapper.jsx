import React from 'react'

const FormSectionWrapper = ({children}) => {
  return (
    <section className='bg-white h-full p-4 flex items-center justify-center dark:bg-gray-600 w-full'>{children}</section>
  )
}

export default FormSectionWrapper