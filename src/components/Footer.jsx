import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='mt-auto p-4 text-center text-base md:text-2xl bg-white w-full dark:bg-gray-900 dark:text-white border-gray-200 dark:border-gray-600 border-t'>All Rights Reserved &copy; lovesonkar <span>{year}</span></footer>
  )
}

export default Footer