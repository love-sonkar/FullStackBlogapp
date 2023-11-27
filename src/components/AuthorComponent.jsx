import React from 'react'

const AuthorComponent = ({name="dummy"}) => {
  return (
    <div className="py-3 px-2 flex gap-2 items-center">
    <img
      className="w-10 object-cover h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src="https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="avatar"
    />
    <div className='flex flex-col'>

    <h2 className="capitalize text-xl leading-none dark:text-white">{name}</h2>
    <p className='text-xs dark:text-white'>@{name}</p>
    </div>
  </div>
  )
}

export default AuthorComponent