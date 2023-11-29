import React from 'react'

const FormSectionWrapper = ({children,className=""}) => {
  return (
    <section className={`bg-white flex-grow p-4 flex items-center justify-center dark:bg-gray-600 w-full ${className}`}>{children}</section>
  )
}

export default FormSectionWrapper